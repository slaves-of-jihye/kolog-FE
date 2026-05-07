import Image from 'next/image';
import UsersIcon from '@/shared/assets/icons/users-icon.svg';

function VideoCard() {
  return (
    <div className="relative flex h-[10.125rem] w-full shrink-0 flex-col items-center justify-between overflow-hidden rounded-[0.625rem] p-3">
      <div className="absolute inset-0 rounded-[0.625rem] bg-gray-300" />
      <div className="absolute inset-0 rounded-[0.625rem] bg-black/10" />

      <div className="relative flex w-full items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="size-4 shrink-0 rounded-full bg-white" />
          <p className="text-[0.5rem] tracking-[0.01rem] whitespace-nowrap text-white">하린</p>
        </div>
        <div className="size-4 rounded-sm bg-white/30" />
      </div>

      <div className="text-primary-50 relative flex flex-col items-center text-center">
        <p className="font-display text-[2rem] leading-[0.9] whitespace-nowrap">10:00</p>
        <p className="text-[0.5rem] tracking-[0.01rem]">집에 가기</p>
      </div>

      <div className="relative flex h-0.5 w-[10.5rem] items-center gap-0.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-full min-w-px flex-1 rounded-full bg-gray-300" />
        ))}
        <div className="h-full min-w-px flex-1 rounded-full bg-gray-50" />
      </div>
    </div>
  );
}

export default function Main() {
  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="flex flex-col gap-16 px-5 pt-[4.25rem] pb-16">
        <div className="flex items-center justify-between">
          <Image src="/logo.svg" alt="KOLOG" width={74} height={20} priority />
          <div className="border-primary-300 size-8 shrink-0 rounded-full border bg-gray-200" />
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <p className="text-base font-bold text-gray-800">내가 올린 로그</p>
            <VideoCard />
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

            <VideoCard />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 px-[7.5rem] pt-[1.3125rem] pb-2">
        <div className="h-[0.3125rem] w-[8.4375rem] rounded-full bg-[#21242c]" />
      </div>
    </div>
  );
}
