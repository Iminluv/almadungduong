'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [isExpired, setIsExpired] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!token) {
      setError('Mã xác thực (token) không tồn tại hoặc không hợp lệ.');
      return;
    }

    if (password.length < 8) {
      setError('Mật khẩu phải có độ dài ít nhất 8 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess('Đặt lại mật khẩu thành công! Đang chuyển hướng về trang đăng nhập...');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          router.push('/tai-khoan');
        }, 3000);
      } else {
        const msg = data.error || 'Đặt lại mật khẩu thất bại.';
        setError(msg);
        if (msg.includes('hết hạn')) {
          setIsExpired(true);
        }
      }
    } catch (err) {
      setError('Đã xảy ra lỗi kết nối hệ thống.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="bg-surface p-8 shadow-sm border border-text/5 text-center max-w-[460px] mx-auto">
        <h2 className="text-xl font-bold text-red-600 mb-4 uppercase tracking-wider">Lỗi liên kết</h2>
        <p className="text-sm text-muted mb-6">Liên kết đặt lại mật khẩu này không hợp lệ hoặc thiếu mã xác thực.</p>
        <Button onClick={() => router.push('/tai-khoan')} className="w-full bg-navy text-white">
          Quay lại trang tài khoản
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-surface p-8 shadow-sm border border-text/5 max-w-[460px] mx-auto">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-2xl font-display font-bold uppercase tracking-tight text-navy">Đặt lại mật khẩu</h2>
        <p className="text-xs text-muted font-serif italic">Vui lòng nhập mật khẩu mới cho tài khoản của bạn.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded space-y-3">
          <p>{error}</p>
          {isExpired && (
            <Button
              onClick={() => router.push('/tai-khoan')}
              className="w-full bg-navy text-white text-xs mt-2 py-2"
            >
              Yêu cầu lại liên kết mới
            </Button>
          )}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 text-xs rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Mật khẩu mới</label>
          <input
            type="password"
            className="w-full bg-transparent border-b border-text/20 py-2 focus:border-accent outline-none transition-colors text-sm"
            placeholder="Tối thiểu 8 ký tự"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading || !!success}
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Xác nhận mật khẩu mới</label>
          <input
            type="password"
            className="w-full bg-transparent border-b border-text/20 py-2 focus:border-accent outline-none transition-colors text-sm"
            placeholder="Nhập lại mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading || !!success}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !!success}
          className="w-full bg-navy text-white py-4 text-xs font-bold uppercase tracking-[0.15em] hover:brightness-110 disabled:opacity-50 transition-all mt-4"
        >
          {loading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-bg pt-28 pb-32">
      <div className="container-custom">
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-navy border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}
