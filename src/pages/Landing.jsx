import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const steps = ['Push code to GitHub', 'Actions test and build it', 'Pages publishes it live']

export default function Landing({ session }) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
      <div>
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">Your workspace, live in minutes.</h1>
        <p className="mt-5 max-w-md text-lg text-slate-600 dark:text-slate-300">Create an account with Google, GitHub or your email, and land on a dashboard that already knows your name.</p>
        <div className="mt-8 flex gap-3">
          <Link to={session ? '/dashboard' : '/signup'} className="btn-primary">{session ? 'Open dashboard' : 'Create free account'}</Link>
          {!session && <Link to="/login" className="btn-ghost">Log in</Link>}
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-white/5">
        <p className="mb-4 font-semibold text-slate-500 dark:text-slate-400">Every change ships like this</p>
        {steps.map((s, i) => (
          <motion.div key={s} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.35 }}
            className="mb-3 flex items-center gap-3 rounded-xl bg-slate-100 p-4 dark:bg-white/10">
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 + i * 0.35, type: 'spring' }}
              className="grid h-7 w-7 place-items-center rounded-full bg-teal-500 text-sm font-bold text-white">✓</motion.span>
            {s}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
