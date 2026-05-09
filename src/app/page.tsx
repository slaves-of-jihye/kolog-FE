import Link from 'next/link';
import UsersIcon from '@/shared/assets/icons/users-icon.svg';
import { LogCard, Profile } from '@/shared/ui';
import { Header } from '@/widgets/header';
import { MyLog } from '@/widgets/my-log';

const Main = () => {
  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="flex flex-col gap-16 px-5 pt-[4.25rem] pb-16">
        <Header />

        <div className="flex flex-col gap-10">
          <MyLog />

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <UsersIcon className="size-5" />
                <p className="text-base font-bold text-gray-800">최강 2학년 2반</p>
              </div>
              <Link href="/log" className="text-[0.625rem] tracking-[0.0125rem] text-gray-500">
                바로가기→
              </Link>
            </div>

            <div className="flex flex-col gap-1.5 rounded-xl border border-gray-100 p-3">
              <div className="flex items-center gap-1">
                <Profile className="size-6" border />
                <p className="text-[0.625rem] tracking-[0.0125rem] text-gray-800">양정우</p>
              </div>
              <p className="text-[0.625rem] tracking-[0.0125rem] text-gray-600">
                양정우 님이 정현태 님의 로그에 &apos;😳&apos; 반응을 했습니다.
              </p>
            </div>

            <LogCard authorName="하린" time="10:00" message="명한 것도 어느 것도여야죠" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
