import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { inputs } = body

    if (!inputs) {
      return NextResponse.json({ error: 'No calculator inputs provided' }, { status: 400 })
    }

    // Stripe metadata values max 500 chars each — store inputs as compact JSON
    // We recalculate results on the success page so we don't need to store them
    const compactInputs = JSON.stringify({
      m: inputs.desiredMonthlyIncome,
      c: inputs.currency,
      b: inputs.monthlyBusinessExpenses,
      p: inputs.monthlyPersonalExpenses,
      h: inputs.hoursPerWeek,
      w: inputs.weeksPerYear,
      t: inputs.taxRate,
      pl: inputs.platform,
      i: inputs.industry,
    })

    // Safety check — should be well under 500 chars
    if (compactInputs.length > 490) {
      return NextResponse.json({ error: 'Input data too large' }, { status: 400 })
    }

    // Determine currency for Stripe — always use USD for payment
    const stripeCurrency = 'usd'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: stripeCurrency,
            product_data: {
              name: 'Freelance Price Calculator — Premium Pack',
              description: 'Personalised profit dashboard, expense tracker, rate benchmarking report & pre-filled invoice template',
            },
            unit_amount: 499, // $4.99
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
      metadata: {
        inputs: compactInputs,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
