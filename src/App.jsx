
import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  ShieldAlert,
  Users,
  Activity,
  Lock,
  LogOut,
  Send,
  User,
  MapPin,
  Globe,
  Cpu,
  Trash2,
  Eye
} from 'lucide-react';

const App = () => {
  // ESTADO GLOBAL
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Sistemas online. O que você deseja executar agora?'
    }
  ]);
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState([]);
  const messagesEndRef = useRef(null);

  // REGISTROS DEMONSTRATIVOS
  const generateFakeUserLog = () => {
    return {
      id: Math.random().toString(36).slice(2, 11),
      username: `User_${Math.floor(Math.random() * 1000)}`,
      ip: 'DEMO',
      location: 'Dados fictícios',
      coords: 'Não coletadas',
      lastSeen: new Date().toLocaleTimeString(),
      status: 'Online'
    };
  };

  useEffect(() => {
    setLogs(Array.from({ length: 8 }, generateFakeUserLog));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);

  // AUTENTICAÇÃO
  const handleLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = String(
      formData.get('username') || ''
    ).trim();

    const password = String(
      formData.get('password') || ''
    );

    if (!username || !password) return;

    // ACESSO DE ADMINISTRADOR
    if (
      username === 'zyoskov' &&
      password === 'manxzz09'
    ) {
      setUser({
        username: 'zyoskov',
        role: 'admin'
      });

      setView('chat');
      return;
    }

    // ACESSO DE MEMBRO
    setUser({
      username,
      role: 'user'
    });

    setView('chat');

    setLogs(prev => [
      ...prev,
      {
        ...generateFakeUserLog(),
        username
      }
    ]);
  };

  const handleLogout = () => {
    setUser(null);
    setView('login');
  };

  // CHAT DEMONSTRATIVO
  const sendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMsg = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const responses = [
        'Recebi sua mensagem. Este é um protótipo demonstrativo.',
        'Solicitação processada pelo sistema de demonstração.',
        'Análise concluída. Como posso ajudar?',
        'Sistema online. Aguardando nova solicitação.'
      ];

      const randomResp =
        responses[Math.floor(Math.random() * responses.length)];

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: randomResp
        }
      ]);
    }, 800);
  };

  // TELA DE LOGIN
  if (view === 'login') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-[#111] border border-zinc-800 p-8 rounded-2xl shadow-2xl">

          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
              <ShieldAlert size={32} className="text-white" />
            </div>

            <h1 className="text-2xl font-bold tracking-tighter">
              UNFILTERED AI
            </h1>

            <p className="text-zinc-500 text-sm">
              Acesso ao sistema
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1 ml-1">
                USUÁRIO
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />

                <input
                  name="username"
                  required
                  autoComplete="username"
                  className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-red-600 transition-colors"
                  placeholder="Digite seu usuário"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1 ml-1">
                SENHA
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />

                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-red-600 transition-colors"
                  placeholder="Digite sua senha"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all active:scale-95 shadow-lg"
            >
              ENTRAR NO SISTEMA
            </button>
          </form>
        </div>
      </div>
    );
  }

  // APLICAÇÃO PRINCIPAL
  return (
    <div className="flex h-screen bg-[#0a0a0a] text-zinc-200 font-sans overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#111] border-r border-zinc-800 flex flex-col">

        <div className="p-6 flex items-center gap-3 border-b border-zinc-800">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
            <Cpu size={16} className="text-white" />
          </div>

          <span className="font-bold tracking-tight">
            UNFILTERED
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setView('chat')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              view === 'chat'
                ? 'bg-red-600/10 text-red-500 border border-red-600/20'
                : 'hover:bg-zinc-800 text-zinc-400'
            }`}
          >
            <MessageSquare size={20} />
            <span className="font-medium">Chat IA</span>
          </button>

          {user?.role === 'admin' && (
            <button
              onClick={() => setView('admin')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                view === 'admin'
                  ? 'bg-red-600/10 text-red-500 border border-red-600/20'
                  : 'hover:bg-zinc-800 text-zinc-400'
              }`}
            >
              <Users size={20} />
              <span className="font-medium">
                Painel Admin
              </span>
            </button>
          )}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-xl mb-4">

            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold">
              {user?.username?.[0]?.toUpperCase()}
            </div>

            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">
                {user?.username}
              </p>

              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                {user?.role}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-zinc-500 hover:text-red-500 transition-colors"
          >
            <LogOut size={14} /> SAIR
          </button>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 flex flex-col relative">

        {view === 'chat' ? (
          <>
            <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-[#0a0a0a]/80 backdrop-blur-md z-10">

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />

                <span className="text-sm font-medium text-zinc-400">
                  IA Demonstrativa Ativa
                </span>
              </div>

              <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded text-zinc-500 font-mono">
                v4.5-UNFILTERED
              </span>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === 'user'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div className={`max-w-2xl flex gap-4 ${
                    msg.role === 'user'
                      ? 'flex-row-reverse'
                      : ''
                  }`}>

                    <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                      msg.role === 'user'
                        ? 'bg-zinc-700'
                        : 'bg-red-600'
                    }`}>
                      {msg.role === 'user'
                        ? <User size={16} />
                        : <Cpu size={16} />}
                    </div>

                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-zinc-800 text-zinc-100 rounded-tr-none'
                        : 'bg-[#111] border border-zinc-800 text-zinc-300 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent">

              <form
                onSubmit={sendMessage}
                className="max-w-4xl mx-auto relative"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-[#111] border border-zinc-800 rounded-2xl py-4 pl-6 pr-16 focus:outline-none focus:border-red-600 transition-all text-sm shadow-2xl"
                  placeholder="Digite sua mensagem..."
                />

                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all active:scale-90"
                >
                  <Send size={20} />
                </button>
              </form>

              <p className="text-center text-[10px] text-zinc-600 mt-4 uppercase tracking-widest">
                Protótipo demonstrativo: respostas pré-programadas e registros fictícios.
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-6xl mx-auto">

              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter">
                    Painel de Controle
                  </h2>

                  <p className="text-zinc-500">
                    Painel demonstrativo com registros fictícios.
                  </p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl flex items-center gap-3">
                  <Activity size={20} className="text-red-500" />

                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold">
                      Sessões demonstrativas
                    </p>

                    <p className="text-lg font-bold leading-none">
                      {logs.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#111] border border-zinc-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-sm">

                  <thead className="bg-zinc-900/50 text-zinc-500 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="px-6 py-4">Usuário</th>
                      <th className="px-6 py-4">IP demonstrativo</th>
                      <th className="px-6 py-4">Localização</th>
                      <th className="px-6 py-4">Coordenadas</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Ações</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-zinc-800">
                    {logs.map((log) => (
                      <tr
                        key={log.id}
                        className="hover:bg-zinc-800/30 transition-colors group"
                      >
                        <td className="px-6 py-4 font-medium">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-[10px]">
                              {log.username[0].toUpperCase()}
                            </div>
                            {log.username}
                          </div>
                        </td>

                        <td className="px-6 py-4 font-mono text-zinc-400">
                          {log.ip}
                        </td>

                        <td className="px-6 py-4 text-zinc-400">
                          <div className="flex items-center gap-1">
                            <Globe size={12} />
                            {log.location}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-zinc-400">
                          <div className="flex items-center gap-1">
                            <MapPin size={12} />
                            {log.coords}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase">
                            {log.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">

                            <button
                              onClick={() => alert(
                                `Registro demonstrativo:\nUsuário: ${log.username}\nIP: ${log.ip}\nLocal: ${log.location}`
                              )}
                              className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors"
                            >
                              <Eye size={16} />
                            </button>

                            <button
                              onClick={() => setLogs(
                                prev => prev.filter(l => l.id !== log.id)
                              )}
                              className="p-2 hover:bg-red-900/30 rounded-lg text-zinc-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>

                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
