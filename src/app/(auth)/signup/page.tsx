import { SignupForm } from '@/features/auth';

const SignupPage = () => (
  <div className="relative min-h-screen w-full bg-white">
    <div className="mx-auto flex w-[18.5rem] flex-col items-center gap-6 pt-[calc(10rem+env(safe-area-inset-top,0px))]">
      <p className="w-full text-center text-xl font-bold text-gray-800">회원가입</p>
      <SignupForm />
    </div>
  </div>
);

export default SignupPage;
