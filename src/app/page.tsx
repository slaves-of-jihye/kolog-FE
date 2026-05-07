import Image from 'next/image';

function VideoCard() {
  return (
    <div className="relative flex h-[162px] w-full shrink-0 flex-col items-center justify-between overflow-hidden rounded-[10px] p-3">
      <div className="absolute inset-0 rounded-[10px] bg-[#c4ccda]" />
      <div className="absolute inset-0 rounded-[10px] bg-black/10" />

      <div className="relative flex w-full items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="size-4 shrink-0 rounded-full bg-white" />
          <p className="text-[8px] tracking-[0.16px] whitespace-nowrap text-white">하린</p>
        </div>
        <div className="size-4 rounded-sm bg-white/30" />
      </div>

      <div className="relative flex flex-col items-center text-center text-[#f3f9fe]">
        <p
          className="text-[32px] leading-[0.9] whitespace-nowrap"
          style={{ fontFamily: 'var(--font-ok-dan-dan)' }}
        >
          10:00
        </p>
        <p className="text-[8px] tracking-[0.16px]">집에 가기</p>
      </div>

      <div className="relative flex h-0.5 w-[168px] items-center gap-0.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-full min-w-px flex-1 rounded-full bg-[#c4ccda]" />
        ))}
        <div className="h-full min-w-px flex-1 rounded-full bg-[#f8f9fb]" />
      </div>
    </div>
  );
}

export default function Main() {
  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="flex flex-col gap-16 px-5 pt-[68px] pb-16">
        <div className="flex items-center justify-between">
          <Image src="/logo.svg" alt="KOLOG" width={74} height={20} priority />
          <div className="size-8 shrink-0 rounded-full border border-[#9ec9f3] bg-[#dde2ec]" />
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <p className="text-base font-bold text-[#1a202c]">내가 올린 로그</p>
            <VideoCard />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="size-5 rounded bg-[#dde2ec]" />
                <p className="text-base font-bold text-[#1a202c]">최강 2학년 2반</p>
              </div>
              <p className="text-[10px] tracking-[0.2px] text-[#6e7d94]">바로가기→</p>
            </div>

            <div className="flex flex-col gap-1.5 rounded-xl border border-[#eef1f6] p-3">
              <div className="flex items-center gap-1">
                <div className="size-6 shrink-0 rounded-full border border-[#9ec9f3] bg-[#dde2ec]" />
                <p className="text-[10px] tracking-[0.2px] text-[#1a202c]">양정우</p>
              </div>
              <p className="text-[10px] tracking-[0.2px] text-[#4a5568]">
                양정우 님이 정현태 님의 로그에 &apos;😳&apos; 반응을 했습니다.
              </p>
            </div>

            <VideoCard />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 px-[120px] pt-[21px] pb-2">
        <div className="h-[5px] w-[135px] rounded-full bg-[#21242c]" />
      </div>
    </div>
  );
}
