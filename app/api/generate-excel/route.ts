import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { generatePremiumExcel } from '@/lib/excel-generator'
import type { CalculatorInputs } from '@/config/calculator.config'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ error: 'No session ID provided' }, { status: 400 })
  }

  // ── 1. Verify payment with Stripe ──────────────────────────────────────────
  let session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch {
    return NextResponse.json({ error: 'Invalid session ID' }, { status: 400 })
  }

  if (session.payment_status !== 'paid') {
    return NextResponse.json({ error: 'Payment not completed' }, { status: 402 })
  }

  // ── 2. Retrieve & expand calculator inputs from Stripe metadata ───────────
  const rawInputs = session.metadata?.inputs
  if (!rawInputs) {
    return NextResponse.json({ error: 'No calculator data in session' }, { status: 404 })
  }

  let inputs: CalculatorInputs
  try {
    const compact = JSON.parse(rawInputs)
    inputs = {
      desiredMonthlyIncome:    compact.m,
      currency:                compact.c,
      monthlyBusinessExpenses: compact.b,
      monthlyPersonalExpenses: compact.p,
      hoursPerWeek:            compact.h,
      weeksPerYear:            compact.w,
      taxRate:                 compact.t,
      platform:                compact.pl,
      industry:                compact.i,
    }
  } catch {
    return NextResponse.json({ error: 'Failed to parse calculator data' }, { status: 500 })
  }

  // ── 3. Generate Excel in-process (pure Node.js — no Python required) ───────
  let buffer: Uint8Array
  try {
    buffer = await generatePremiumExcel(inputs)
  } catch (err) {
    console.error('Excel generation error:', err)
    return NextResponse.json({ error: 'Failed to generate Excel file' }, { status: 500 })
  }

  const currency = (inputs.currency ?? 'USD').toLowerCase()
  const filename = `freelance-premium-pack-${currency}.xlsx`

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(buffer)
      controller.close()
    },
  })

  return new NextResponse(stream, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': buffer.byteLength.toString(),
      'Cache-Control': 'no-store',
    },
  })
}
