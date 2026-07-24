'use client'

import { FormEvent, useState } from 'react'

const consent = 'By submitting, I agree that Premium Account Services may contact me about internet, TV, mobile or related services at the number provided. Consent is not a condition of purchase.'

export function LeadForm({ zip = '' }: { zip?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    const form = new FormData(event.currentTarget)
    const body = {
      firstName: form.get('firstName'),
      phone: form.get('phone'),
      email: form.get('email') || undefined,
      zipCode: form.get('zipCode'),
      preferredService: form.get('preferredService'),
      consentAccepted: form.get('consentAccepted') === 'on',
      consentTimestamp: new Date().toISOString(),
      consentLanguage: consent,
      leadSource: 'website',
      landingPage: window.location.pathname + window.location.search,
    }

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!response.ok) throw new Error('Submission failed')
      setStatus('success')
      event.currentTarget.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 font-semibold text-emerald-900">Thank you. A representative will review your request.</div>
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-950">Request plan assistance</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="firstName" required placeholder="First name" className="rounded-xl border border-slate-300 px-4 py-3" />
        <input name="phone" required type="tel" placeholder="Phone number" className="rounded-xl border border-slate-300 px-4 py-3" />
        <input name="email" type="email" placeholder="Email (optional)" className="rounded-xl border border-slate-300 px-4 py-3" />
        <input name="zipCode" required defaultValue={zip} pattern="[0-9]{5}" maxLength={5} placeholder="ZIP code" className="rounded-xl border border-slate-300 px-4 py-3" />
      </div>
      <select name="preferredService" defaultValue="internet" className="w-full rounded-xl border border-slate-300 px-4 py-3">
        <option value="internet">Home internet</option>
        <option value="fiber">Fiber internet</option>
        <option value="tv">TV</option>
        <option value="mobile">Mobile</option>
        <option value="bundle">Bundle</option>
        <option value="business">Business service</option>
      </select>
      <label className="flex gap-3 text-xs leading-5 text-slate-600">
        <input name="consentAccepted" type="checkbox" required className="mt-1" />
        <span>{consent}</span>
      </label>
      <button disabled={status === 'sending'} className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white disabled:opacity-60">
        {status === 'sending' ? 'Submitting…' : 'Request assistance'}
      </button>
      {status === 'error' && <p className="text-sm text-red-700">The form could not be submitted. Please call 833-492-8778.</p>}
    </form>
  )
}
