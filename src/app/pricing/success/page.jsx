import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { Link } from '@heroui/react'
import { subscription } from '@/lib/actions/payment'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    metadata,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  })

  if (status === 'open') return redirect('/')

  if (status === 'complete') {
    await subscription({...metadata,sessionId: session_id})
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -top-24 -left-24 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] -bottom-20 -right-20 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-violet-500/25 rounded-3xl p-10 text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-medium px-3 py-1 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Payment confirmed
          </div>

          <div className="w-24 h-24 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center mx-auto mb-6 animate-pulse">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <circle cx="22" cy="22" r="20" fill="rgba(139,92,246,0.2)" stroke="rgba(139,92,246,0.6)" strokeWidth="1.5" />
              <path d="M13 22l6.5 7L31 15" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="text-3xl font-semibold text-slate-100 mb-2">You&apos;re all set! 🎉</h1>
          <p className="text-slate-400 text-sm leading-relaxed mb-7">
            Your subscription is now active. Welcome to NestLoom —<br />
            start exploring premium listings right away.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent mb-5" />

          <div className="space-y-3 text-left">
            <div className="flex items-center justify-between bg-slate-800/50 border border-slate-700/40 rounded-xl px-4 py-3">
              <span className="text-xs text-slate-500">Confirmation sent to</span>
              <span className="text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
                {customerEmail}
              </span>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="mt-6 w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center"
          >
            Go to dashboard
          </Link>

          <p className="text-xs text-slate-600 mt-5 leading-relaxed">
            Need help? Email{' '}
            <Link href="mailto:orders@example.com" className="text-indigo-400 hover:underline text-xs">
              orders@example.com
            </Link>
          </p>
        </div>
      </div>
    )
  }
}