import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, redirectTo } from '../supabase'

const strength = (p) => [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(p)).length
const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong']

export default function Auth({ mode }) {
  const signup = mode === 'signup'
  const [f, setF] = useState({ name: '', email: '', password: '' })
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState(null)
  const s = strength(f.password)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const social = async (provider) => {
    setMsg(null)
    const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo } })
    if (error) setMsg({ err: true, text: error.message })
  }
  const submit = async (e) => {
    e.preventDefault(); setMsg(null)
    if (signup && s < 3) return setMsg({ err: true, text: 'Use at least 8 characters with a capital letter and a number.' })
    setBusy(true)
    const { data, error } = signup
      ? await supabase.auth.signUp({ email: f.email, password: f.password, options: { data: { full_name: f.name }, emailRedirectTo: redirectTo } })
      : await supabase.auth.signInWithPassword({ email: f.email, password: f.password })
    setBusy(false)
    if (error) return setMsg({ err: true, text: error.message })
    if (signup && !data.session) setMsg({ text: 'Check your inbox and click the confirmation link to finish signing up.' })
  }
  const forgot = async () => {
    if (!f.email) return setMsg({ err: true, text: 'Enter your email first, then click "Forgot password".' })
    const { error } = await supabase.auth.resetPasswordForEmail(f.email, { redirectTo })
    setMsg(error ? { err: true, text: error.message } : { text: 'Password reset link sent. Check your inbox.' })
  }

  return (
    <div className="mx-auto max-w-md px-6 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-white/10 dark:bg-white/5">
        <h1 className="text-2xl font-extrabold">{signup ? 'Create your account' : 'Welcome back'}</h1>
        <div className="mt-6 grid gap-3">
          <button onClick={() => social('google')} className="btn-ghost">Continue with Google</button>
          <button onClick={() => social('github')} className="btn-ghost">Continue with GitHub</button>
        </div>
        <div className="my-6 flex items-center gap-3 text-sm text-slate-400"><hr className="flex-1 border-slate-200 dark:border-white/10" />or use email<hr className="flex-1 border-slate-200 dark:border-white/10" /></div>
        <form onSubmit={submit} className="grid gap-4">
          {signup && <input className="input" placeholder="Full name" required value={f.name} onChange={set('name')} autoComplete="name" />}
          <input className="input" type="email" placeholder="Email address" required value={f.email} onChange={set('email')} autoComplete="email" />
          <div className="relative">
            <input className="input pr-16" type={show ? 'text' : 'password'} placeholder="Password" required minLength={8} value={f.password} onChange={set('password')} autoComplete={signup ? 'new-password' : 'current-password'} />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-brand-500">{show ? 'Hide' : 'Show'}</button>
          </div>
          {signup && f.password && (
            <div aria-live="polite">
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"><div className="h-full rounded-full bg-teal-500 transition-all duration-300" style={{ width: `${s * 25}%` }} /></div>
              <p className="mt-1 text-sm text-slate-500">{labels[s]}</p>
            </div>
          )}
          {msg && <p role="alert" className={`rounded-xl p-3 text-sm ${msg.err ? 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300' : 'bg-teal-100 text-teal-800 dark:bg-teal-500/15 dark:text-teal-200'}`}>{msg.text}</p>}
          <button disabled={busy} className="btn-primary">{busy ? 'Please wait…' : signup ? 'Sign up' : 'Log in'}</button>
        </form>
        {!signup && <button onClick={forgot} className="mt-4 text-sm font-semibold text-brand-500">Forgot password?</button>}
        <p className="mt-6 text-sm text-slate-500">
          {signup ? 'Already have an account? ' : 'New here? '}
          <Link className="font-semibold text-brand-500" to={signup ? '/login' : '/signup'}>{signup ? 'Log in' : 'Create an account'}</Link>
        </p>
      </div>
    </div>
  )
}
