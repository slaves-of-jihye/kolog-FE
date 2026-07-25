import Link from 'next/link';
import { SignupForm } from '@/features/auth';

const SignupPage = () => (
  <div className="relative min-h-screen w-full bg-white">
    <div className="mx-auto flex w-[18.5rem] flex-col items-center gap-6 pt-[calc(10rem+env(safe-area-inset-top,0px))]">
      <p className="w-full text-center text-xl font-bold text-gray-800">회원가입</p>
      <SignupForm />
      <div className="flex w-full items-center justify-center gap-2">
        <p className="text-[0.75rem] text-gray-600">이미 계정이 있으신가요?</p>
        <Link
          href="/login"
          className="text-primary-400 text-[0.75rem] font-semibold hover:underline"
        >
          로그인
        </Link>
      </div>
    </div>
  </div>
);

export default SignupPage;
