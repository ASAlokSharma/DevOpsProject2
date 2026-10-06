import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { supabase } from './supabase'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'

function ThemeToggle() {
  const [dark, setDark] = useState(document.documentElement.classList.contains('dark'))
  const toggle = () => {
    const next = !dark; setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch {}
  }
  return <button onClick={toggle} aria-label="Toggle light or dark theme" className="btn-ghost !px-3 !py-2">{dark ? '☀️' : '🌙'}</button>
}

function Nav({ session }) {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
      <Link to="/" className="text-xl font-extrabold tracking-tight">Ship<span className="text-teal-500">Pad</span></Link>
      <nav className="flex items-center gap-3">
        <ThemeToggle />
        {session
          ? <Link to="/dashboard" className="btn-primary">Dashboard</Link>
          : <><Link to="/login" className="btn-ghost">Log in</Link><Link to="/signup" className="btn-primary">Sign up</Link></>}
      </nav>
    </header>
  )
}

export default function App() {
  const [session, setSession] = useState(undefined)
  const location = useLocation()
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])
  if (session === undefined) return <div className="grid min-h-screen place-items-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" /></div>
  return (
    <>
      <Nav session={session} />
      <AnimatePresence mode="wait">
        <motion.main key={location.pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <Routes location={location}>
            <Route path="/" element={<Landing session={session} />} />
            <Route path="/login" element={session ? <Navigate to="/dashboard" /> : <Auth mode="login" />} />
            <Route path="/signup" element={session ? <Navigate to="/dashboard" /> : <Auth mode="signup" />} />
            <Route path="/dashboard" element={session ? <Dashboard user={session.user} /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </>
  )
}
