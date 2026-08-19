import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, Mail, CheckCircle2 } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';

export const AccountModal: React.FC = () => {
  const { isAccountOpen, closeAccount } = useSearch();
  const [view, setView] = useState<'signin' | 'register' | 'forgot' | 'dashboard'>('signin');
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setUser({ email, name: email.split('@')[0] });
      setView('dashboard');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setUser({ email, name });
      setView('dashboard');
    }
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedMessage(`Password reset link sent to ${email}`);
    setTimeout(() => {
      setSubmittedMessage('');
      setView('signin');
    }, 2500);
  };

  const handleLogout = () => {
    setUser(null);
    setView('signin');
  };

  return (
    <AnimatePresence>
      {isAccountOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeAccount}
            className="fixed inset-0 bg-[#171716] z-50 cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#FEFBF4] text-[#294A3A] p-8 z-50 border border-[#294A3A]/15 shadow-xl space-y-6"
          >
            <div className="flex justify-between items-center pb-4 border-b border-[#294A3A]/10">
              <h2 className="font-serif text-2xl text-[#294A3A]">
                {view === 'signin' && 'SIGN IN'}
                {view === 'register' && 'CREATE ACCOUNT'}
                {view === 'forgot' && 'FORGOT PASSWORD'}
                {view === 'dashboard' && `WELCOME, ${user?.name.toUpperCase()}`}
              </h2>
              <button
                onClick={closeAccount}
                className="p-1 hover:bg-[#294A3A]/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[#294A3A]" />
              </button>
            </div>

            {submittedMessage && (
              <div className="bg-[#294A3A]/10 p-4 flex items-center space-x-3 text-xs uppercase tracking-wider font-semibold text-[#294A3A]">
                <CheckCircle2 className="w-5 h-5 text-[#294A3A]" />
                <span>{submittedMessage}</span>
              </div>
            )}

            {/* Dashboard View */}
            {view === 'dashboard' && user ? (
              <div className="space-y-6">
                <div className="bg-[#F8F5EE] p-4 border border-[#294A3A]/10 space-y-1">
                  <p className="text-xs uppercase tracking-widest text-[#294A3A]/60">ACCOUNT EMAIL</p>
                  <p className="font-semibold text-sm">{user.email}</p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs uppercase tracking-widest text-[#294A3A]/60 font-bold">
                    ORDER HISTORY
                  </h3>
                  <div className="bg-[#F8F5EE] p-6 text-center border border-[#294A3A]/10 space-y-2">
                    <p className="font-serif text-lg">NO ORDERS YET</p>
                    <p className="text-xs text-[#294A3A]/60">
                      When you place an order, it will appear here.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full gw-button-secondary py-3 text-xs"
                >
                  SIGN OUT
                </button>
              </div>
            ) : view === 'signin' ? (
              /* Sign In View */
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#294A3A]/70 mb-1 font-semibold">
                    EMAIL ADDRESS
                  </label>
                  <div className="flex items-center border border-[#294A3A]/30 px-3 bg-[#F8F5EE]">
                    <Mail className="w-4 h-4 text-[#294A3A]/40 mr-2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full py-3 bg-transparent text-sm outline-none text-[#294A3A]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs uppercase tracking-widest text-[#294A3A]/70 font-semibold">
                      PASSWORD
                    </label>
                    <button
                      type="button"
                      onClick={() => setView('forgot')}
                      className="text-[11px] text-[#294A3A]/60 hover:text-[#294A3A] underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="flex items-center border border-[#294A3A]/30 px-3 bg-[#F8F5EE]">
                    <Lock className="w-4 h-4 text-[#294A3A]/40 mr-2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full py-3 bg-transparent text-sm outline-none text-[#294A3A]"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full gw-button-primary py-4">
                  SIGN IN
                </button>

                <div className="text-center pt-2">
                  <p className="text-xs text-[#294A3A]/70">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setView('register')}
                      className="font-bold underline hover:text-[#294A3A]"
                    >
                      Create one
                    </button>
                  </p>
                </div>
              </form>
            ) : view === 'register' ? (
              /* Register View */
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#294A3A]/70 mb-1 font-semibold">
                    FULL NAME
                  </label>
                  <div className="flex items-center border border-[#294A3A]/30 px-3 bg-[#F8F5EE]">
                    <User className="w-4 h-4 text-[#294A3A]/40 mr-2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full py-3 bg-transparent text-sm outline-none text-[#294A3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#294A3A]/70 mb-1 font-semibold">
                    EMAIL ADDRESS
                  </label>
                  <div className="flex items-center border border-[#294A3A]/30 px-3 bg-[#F8F5EE]">
                    <Mail className="w-4 h-4 text-[#294A3A]/40 mr-2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full py-3 bg-transparent text-sm outline-none text-[#294A3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#294A3A]/70 mb-1 font-semibold">
                    PASSWORD
                  </label>
                  <div className="flex items-center border border-[#294A3A]/30 px-3 bg-[#F8F5EE]">
                    <Lock className="w-4 h-4 text-[#294A3A]/40 mr-2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full py-3 bg-transparent text-sm outline-none text-[#294A3A]"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full gw-button-primary py-4">
                  CREATE ACCOUNT
                </button>

                <div className="text-center pt-2">
                  <p className="text-xs text-[#294A3A]/70">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setView('signin')}
                      className="font-bold underline hover:text-[#294A3A]"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </form>
            ) : (
              /* Forgot Password View */
              <form onSubmit={handleForgot} className="space-y-4">
                <p className="text-xs text-[#294A3A]/70">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#294A3A]/70 mb-1 font-semibold">
                    EMAIL ADDRESS
                  </label>
                  <div className="flex items-center border border-[#294A3A]/30 px-3 bg-[#F8F5EE]">
                    <Mail className="w-4 h-4 text-[#294A3A]/40 mr-2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full py-3 bg-transparent text-sm outline-none text-[#294A3A]"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full gw-button-primary py-4">
                  SEND RESET LINK
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setView('signin')}
                    className="text-xs text-[#294A3A]/70 underline hover:text-[#294A3A]"
                  >
                    Back to Sign In
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
