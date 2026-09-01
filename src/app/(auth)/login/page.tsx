import Link from 'next/link';
import { LoginForm } from '@/features/auth';

const LoginPage = () => (
  <div className="relative min-h-screen w-full bg-white">
    <div className="mx-auto flex w-[18.5rem] flex-col items-center gap-6 pt-[calc(10rem+env(safe-area-inset-top,0px))]">
      <p className="w-full text-center text-xl font-bold text-gray-800">로그인</p>
      <LoginForm />
      <div className="flex w-full items-center justify-center gap-2">
        <p className="text-[0.75rem] text-gray-600">계정이 없으신가요?</p>
        <Link
          href="/signup"
          className="text-primary-400 text-[0.75rem] font-semibold hover:underline"
        >
          회원가입
        </Link>
      </div>
    </div>
  </div>
);

export default LoginPage;
