const LogCard = () => {
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
};

export default LogCard;
