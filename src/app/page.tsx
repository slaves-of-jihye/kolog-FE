import Image from 'next/image';
import UsersIcon from '@/shared/assets/icons/users-icon.svg';
import { LogCard } from '@/shared/ui';
import { ProfileMenu } from '@/features/profile-menu';

const Main = () => {
  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="flex flex-col gap-16 px-5 pt-[4.25rem] pb-16">
        <div className="flex items-center justify-between">
          <Image src="/logo.svg" alt="KOLOG" width={74} height={20} priority />
          <ProfileMenu />
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <p className="text-base font-bold text-gray-800">내가 올린 로그</p>
            <LogCard />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <UsersIcon className="size-5" />
                <p className="text-base font-bold text-gray-800">최강 2학년 2반</p>
              </div>
              <p className="text-[0.625rem] tracking-[0.0125rem] text-gray-500">바로가기→</p>
            </div>

            <div className="flex flex-col gap-1.5 rounded-md border border-gray-100 p-3">
              <div className="flex items-center gap-1">
                <div className="border-primary-300 size-6 shrink-0 rounded-full border bg-gray-200" />
                <p className="text-[0.625rem] tracking-[0.0125rem] text-gray-800">양정우</p>
              </div>
              <p className="text-[0.625rem] tracking-[0.0125rem] text-gray-600">
                양정우 님이 정현태 님의 로그에 &apos;😳&apos; 반응을 했습니다.
              </p>
            </div>

            <LogCard />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 px-[7.5rem] pt-[1.3125rem] pb-2">
        <div className="h-[0.3125rem] w-[8.4375rem] rounded-full bg-[#21242c]" />
      </div>
    </div>
  );
};
export default Main;
