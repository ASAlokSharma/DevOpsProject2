import { motion } from 'framer-motion'
import { supabase } from '../supabase'

export default function Dashboard({ user }) {
  const m = user.user_metadata || {}
  const full = m.full_name || m.name || m.user_name || user.email.split('@')[0]
  const first = full.split(' ')[0]
  const h = new Date().getHours()
  const greet = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold tracking-tight md:text-5xl">{greet}, {first} 👋</motion.h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">Signed in as {user.email}</p>
      <div className="mt-10 flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
        {m.avatar_url && <img src={m.avatar_url} alt="" className="h-14 w-14 rounded-full" referrerPolicy="no-referrer" />}
        <div><p className="font-semibold">{full}</p><p className="text-sm text-slate-500">More features arrive in phase 2.</p></div>
        <button onClick={() => supabase.auth.signOut()} className="btn-ghost ml-auto">Log out</button>
      </div>
    </section>
  )
}
