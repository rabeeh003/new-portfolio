'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/admin/LoginForm';
import Dashboard from '@/components/admin/Dashboard';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {user ? <Dashboard /> : <LoginForm />}
    </div>
  );
}