import React, { useState } from 'react';
import {
  ShieldCheck,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sparkles,
  UserPlus,
  LogIn,
  AlertCircle,
  KeyRound,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useCoffee } from '../../context/CoffeeContext';

export const AdminAuth = () => {
  const { loginWithEmail, registerWithEmail, loginAdmin, authLoading } = useCoffee();

  // Mode: 'login' | 'register' | 'pin'
  const [mode, setMode] = useState('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!email.trim() || !password) {
      setFormError('Please enter both Email and Password');
      return;
    }

    const res = await loginWithEmail(email, password);
    if (!res.success) {
      setFormError(res.error || 'Failed to sign in. Please verify credentials.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!email.trim() || !password) {
      setFormError('Please enter Email and Password');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match. Please verify.');
      return;
    }

    const res = await registerWithEmail(email, password, username);
    if (!res.success) {
      setFormError(res.error || 'Failed to create account.');
    } else {
      setFormSuccess('Account successfully registered in Firebase Authentication!');
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    const success = loginAdmin(pin);
    if (!success) {
      setFormError('Invalid Security PIN. Use demo PIN: 1234');
    }
  };

  const handleQuickDemo = () => {
    loginAdmin('1234');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-lg bg-gradient-to-b from-[#18120e] via-[#120d0a] to-[#0e0b08] border border-amber-500/25 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-fade-in">
        
        {/* Ambient Glows */}
        <div className="absolute -top-28 -right-28 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-28 -left-28 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="relative w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#d97706] via-[#f59e0b] to-[#fbbf24] flex items-center justify-center text-[#0c0805] shadow-xl shadow-amber-500/25">
            <div className="absolute -top-1 left-3.5 w-1.5 h-1.5 rounded-full bg-amber-200/90 animate-steam pointer-events-none"></div>
            <div className="absolute -top-2 left-6.5 w-2 h-2 rounded-full bg-amber-100 animate-steam [animation-delay:0.8s] pointer-events-none"></div>
            <ShieldCheck size={36} className="stroke-[2.5]" />
            <div className="absolute inset-0 rounded-2xl bg-amber-400/20 blur-md -z-10"></div>
          </div>
          <h2 className="font-heading font-black text-2xl text-white tracking-wide uppercase animate-shimmer">
            Firebase Admin Auth
          </h2>
          <p className="text-xs text-[#a89889] font-medium max-w-xs mx-auto">
            {mode === 'login' && 'Sign in with your Firebase Email & Password to manage the cafe.'}
            {mode === 'register' && 'Register a new Admin Username, Email & Password in Firebase.'}
            {mode === 'pin' && 'Enter master security PIN to unlock the terminal.'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-[#140e0a] p-1.5 rounded-2xl border border-[#33241b] mb-6 text-xs font-black">
          <button
            type="button"
            onClick={() => { setMode('login'); setFormError(''); }}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/20'
                : 'text-[#9c8978] hover:text-white hover:bg-[#201712]'
            }`}
          >
            <LogIn size={14} />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => { setMode('register'); setFormError(''); }}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/20'
                : 'text-[#9c8978] hover:text-white hover:bg-[#201712]'
            }`}
          >
            <UserPlus size={14} />
            <span>New User</span>
          </button>

          <button
            type="button"
            onClick={() => { setMode('pin'); setFormError(''); }}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all ${
              mode === 'pin'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/20'
                : 'text-[#9c8978] hover:text-white hover:bg-[#201712]'
            }`}
          >
            <KeyRound size={14} />
            <span>PIN Code</span>
          </button>
        </div>

        {/* Error Alert Box */}
        {formError && (
          <div className="mb-5 p-3.5 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-start gap-2.5 animate-shake">
            <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">{formError}</span>
              {formError.includes('operation-not-allowed') && (
                <span className="text-[11px] text-amber-300/90 block">
                  👉 Go to Firebase Console → Authentication → Sign-in method → Click "Email/Password" and enable it.
                </span>
              )}
            </div>
          </div>
        )}

        {/* Success Alert Box */}
        {formSuccess && (
          <div className="mb-5 p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5">
            <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
            <span className="font-bold">{formSuccess}</span>
          </div>
        )}

        {/* ==================== 1. SIGN IN FORM ==================== */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Mail size={14} /> Email Address
              </label>
              <input
                type="email"
                required
                placeholder="admin@cafepailwan.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field w-full font-medium"
                autoComplete="email"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-amber-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Lock size={14} /> Password
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-[#a89889] hover:text-amber-400 flex items-center gap-1"
                >
                  {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                  <span>{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your Firebase password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field w-full font-mono pr-10"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="btn btn-primary w-full btn-lg shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 mt-2"
            >
              {authLoading ? (
                <span>Authenticating with Firebase...</span>
              ) : (
                <>
                  <LogIn size={17} />
                  <span>Sign In as Admin</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* ==================== 2. REGISTER NEW USER FORM ==================== */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <User size={14} /> Username / Display Name
              </label>
              <input
                type="text"
                placeholder="e.g. Omkar (Cafe Manager)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field w-full font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Mail size={14} /> New Email Address
              </label>
              <input
                type="email"
                required
                placeholder="newadmin@cafepailwan.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field w-full font-medium"
                autoComplete="email"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-amber-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Lock size={14} /> New Password (min. 6 characters)
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-[#a89889] hover:text-amber-400 flex items-center gap-1"
                >
                  {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                  <span>{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                placeholder="Create strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field w-full font-mono"
                autoComplete="new-password"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Lock size={14} /> Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field w-full font-mono"
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="btn btn-primary w-full btn-lg shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 mt-2"
            >
              {authLoading ? (
                <span>Registering in Firebase...</span>
              ) : (
                <>
                  <UserPlus size={17} />
                  <span>Create Firebase Admin Account</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* ==================== 3. PIN BACKUP FORM ==================== */}
        {mode === 'pin' && (
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <KeyRound size={14} /> Security PIN Code
              </label>
              <input
                type="password"
                maxLength={6}
                placeholder="PIN (Demo: 1234)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="input-field text-center text-2xl tracking-widest font-mono font-black w-full"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full btn-lg shadow-lg shadow-amber-500/25"
            >
              Unlock With PIN
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#33241b]"></div>
          </div>
          <span className="relative bg-[#120d0a] px-3 text-[11px] text-[#8e7e70] font-black uppercase tracking-wider">
            Quick Testing
          </span>
        </div>

        {/* Quick Demo Bypass Button */}
        <button
          type="button"
          onClick={handleQuickDemo}
          className="btn btn-secondary w-full flex items-center justify-center gap-2 py-3 border-amber-500/35 hover:border-amber-500/60 shadow-sm"
        >
          <Sparkles size={16} className="text-amber-400" />
          <span className="text-xs font-bold">One-Click Demo Admin Login (Bypass)</span>
        </button>

        {/* Firebase Console Tip Notice */}
        <div className="mt-5 p-3 rounded-2xl bg-[#17100b] border border-[#38261c] text-[11px] text-[#9c8978] space-y-1 flex items-start gap-2.5">
          <Info size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-[#cfbeae]">Firebase Authentication Live</p>
            <p className="leading-relaxed">
              New users registered here are created directly in your Firebase project (<span className="text-amber-400 font-mono">hospital-381e7</span>) under <strong>Authentication &gt; Users</strong>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
