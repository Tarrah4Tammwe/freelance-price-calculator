'use client'

import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

type Status = 'verifying' | 'generating' | 'downloading' | 'done' | 'error'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState<Status>('verifying')
  const [errorMsg, setErrorMsg] = useState('')
  const hasRun = useRef(false)

  useEffect(() => {
    if (!sessionId || hasRun.current) return
    hasRun.current = true

    async function downloadPremium() {
      try {
        setStatus('generating')
        const res = await fetch(`/api/generate-excel?session_id=${sessionId}`)

        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: 'Unknown error' }))
          throw new Error(err.error || `Server error ${res.status}`)
        }

        setStatus('downloading')
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)

        const disposition = res.headers.get('Content-Disposition')
        const filenameMatch = disposition?.match(/filename="(.+)"/)
        const filename = filenameMatch?.[1] ?? 'freelance-premium-pack.xlsx'

        const link = document.createElement('a')
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        setTimeout(() => URL.revokeObjectURL(url), 5000)

        setStatus('done')
      } catch (err: any) {
        console.error('Download error:', err)
        setErrorMsg(err.message || 'Something went wrong generating your report.')
        setStatus('error')
      }
    }

    downloadPremium()
  }, [sessionId])

  const steps = [
    { key: 'verifying',   label: 'Verifying payment…' },
    { key: 'generating',  label: 'Building your personalised Excel pack…' },
    { key: 'downloading', label: 'Preparing download…' },
    { key: 'done',        label: 'Download started!' },
  ]

  const currentStepIndex = steps.findIndex(s => s.key === status)

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4">
      <div className="max-w-lg w-full">

        <div className="bg-ink text-paper rounded-sm p-6 mb-4 text-center">
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-2">Payment Confirmed</p>
          <h1 className="font-display text-3xl mb-1">
            {status === 'done' ? 'Your Pack is Downloading' :
             status === 'error' ? 'Something Went Wrong' :
             'Generating Your Premium Pack…'}
          </h1>
          {status !== 'error' && (
            <p className="text-sm text-[#B8B5AE] mt-2">
              Your personalised Excel pack is being built with your numbers.
            </p>
          )}
        </div>

        {status !== 'error' && (
          <div className="bg-card border border-border rounded-sm p-6 mb-4">
            <div className="space-y-3">
              {steps.map((step, i) => {
                const isPast = i < currentStepIndex
                const isCurrent = i === currentStepIndex
                return (
                  <div key={step.key} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isPast ? 'bg-success' : isCurrent ? 'bg-accent animate-pulse' : 'bg-border'
                    }`}>
                      {isPast ? (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <div className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-white' : 'bg-muted opacity-30'}`} />
                      )}
                    </div>
                    <span className={`text-sm transition-all duration-300 ${
                      isPast ? 'text-success font-medium' : isCurrent ? 'text-ink font-medium' : 'text-muted'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {status === 'done' && (
          <div className="bg-card border border-border rounded-sm p-6 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-ink mb-1">Your Excel pack is downloading now.</p>
                <p className="text-sm text-muted leading-relaxed">
                  Check your downloads folder for <strong>freelance-price-calculator-premium.xlsx</strong>. 
                  It has 4 tabs — all pre-filled with your numbers, fully editable.
                </p>
              </div>
            </div>
          </div>
        )}

        {(status === 'done' || status === 'generating' || status === 'downloading') && (
          <div className="bg-card border border-border rounded-sm p-5 mb-4">
            <p className="font-mono text-xs text-muted uppercase tracking-wider mb-3">What's in your pack</p>
            <ul className="space-y-2 text-sm text-muted">
              {[
                ['📊 Rate Dashboard', 'Your recommended rates, project pricing & annual financial breakdown'],
                ['📅 Monthly Tracker', '12-month income & expense tracker with auto-calculating profit'],
                ['🧾 Invoice Template', 'Pre-filled with your hourly rate — edit and send to clients'],
                ['📈 Rate Benchmarks', 'Global rate comparisons across all 8 industries in your currency'],
              ].map(([title, desc]) => (
                <li key={title} className="flex gap-2">
                  <span className="text-accent font-bold flex-shrink-0">→</span>
                  <span><strong className="text-ink">{title}</strong> — {desc}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-card border border-red-200 rounded-sm p-6 mb-4">
            <p className="font-medium text-red-700 mb-2">Download failed</p>
            <p className="text-sm text-muted mb-4">{errorMsg}</p>
            <p className="text-sm text-muted mb-2">
              Your payment was successful. Please contact us with your session ID and we'll send your pack manually.
            </p>
            <p className="font-mono text-xs bg-paper p-2 rounded break-all select-all">{sessionId}</p>
          </div>
        )}

        {status === 'done' && sessionId && (
          <div className="text-center mb-4">
            
              href={`/api/generate-excel?session_id=${sessionId}`}
              className="text-sm text-muted underline hover:text-ink transition-colors"
            >
              Didn't download? Click here to try again
            </a>
          </div>
        )}

        <div className="text-center">
          <a href="/" className="inline-block text-sm text-muted hover:text-ink transition-colors">
            ← Back to Calculator
          </a>
        </div>

      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <p className="text-muted font-mono text-sm">Loading…</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
