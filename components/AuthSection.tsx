
import React, { useState } from 'react';
import { supabase } from '../services/supabase';

interface AuthSectionProps {
  onAuthSuccess: () => void;
}

const AuthSection: React.FC<AuthSectionProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Verifique seu e-mail para confirmar o cadastro!');
      }
      onAuthSuccess();
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro na autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[100px] rounded-full -z-10"></div>

      <div className="w-full max-w-md glass rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-white/5 relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 gemini-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/20">
            <i className="fa-solid fa-bolt-lightning text-white text-3xl"></i>
          </div>
          <h1 className="text-3xl font-black gemini-text-gradient mb-2 tracking-tight">TikTok Viral Lab</h1>
          <p className="text-slate-400 text-sm font-medium">
            {isLogin ? 'Bem-vindo de volta ao futuro da criação.' : 'Comece sua jornada viral hoje.'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">E-mail Corporativo</label>
            <div className="relative">
              <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-white"
                placeholder="exemplo@lab.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Senha Segura</label>
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] p-3 rounded-xl flex items-center gap-2">
              <i className="fa-solid fa-triangle-exclamation"></i>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 gemini-gradient text-white rounded-2xl font-black text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3 mt-4"
          >
            {loading ? (
              <i className="fa-solid fa-circle-notch animate-spin text-lg"></i>
            ) : (
              <>
                <i className={`fa-solid ${isLogin ? 'fa-right-to-bracket' : 'fa-user-plus'}`}></i>
                <span>{isLogin ? 'Acessar Laboratório' : 'Criar Conta Gratuita'}</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-bold text-slate-500 hover:text-indigo-400 transition-colors uppercase tracking-widest"
          >
            {isLogin ? 'Não tem conta? Registre-se' : 'Já possui conta? Entre aqui'}
          </button>
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
           <div className="flex justify-center gap-4 grayscale opacity-30">
              <i className="fa-brands fa-tiktok text-sm"></i>
              <i className="fa-brands fa-google text-sm"></i>
              <i className="fa-brands fa-instagram text-sm"></i>
           </div>
           <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">
             IA Viral v3.5 • Powered by Gemini & Supabase
           </p>
        </div>
      </div>
    </div>
  );
};

export default AuthSection;
