import { LoginForm } from '@/features/auth';

const LoginPage = () => (
  <div className="relative min-h-screen w-full bg-white">
    <div className="mx-auto flex w-[18.5rem] flex-col items-center gap-6 pt-[calc(10rem+env(safe-area-inset-top,0px))]">
      <p className="w-full text-center text-xl font-bold text-gray-800">로그인</p>
      <LoginForm />
    </div>
  </div>
);

export default LoginPage;
