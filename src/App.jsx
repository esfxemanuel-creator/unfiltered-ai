
  const handleLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = String(formData.get('username') || '').trim();
    const password = String(formData.get('password') || '');

    if (!username || !password) return;

    // Acesso de administrador
    if (username === 'zyoskov' && password === 'manxzz09') {
      setUser({ username: 'zyoskov', role: 'admin' });
      setView('chat');
      return;
    }

    // Acesso de membro
    setUser({ username, role: 'user' });
    setView('chat');

    setLogs(prev => [
      ...prev,
      { ...generateFakeUserLog(), username }
    ]);
  };
