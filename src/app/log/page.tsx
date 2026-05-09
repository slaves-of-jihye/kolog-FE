import { Header } from '@/widgets/header';
import { GroupLog } from '@/widgets/group-log';
import { VlogBanner } from '@/widgets/vlog-banner';

type SearchParams = Promise<{ date?: string; hours?: string; completed?: string }>;

const Log = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { date, hours, completed } = await searchParams;
  const isPastView = Boolean(date && hours);
  const isCompleted = completed === 'true';

  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="flex flex-col gap-16 px-5 pt-[4.25rem] pb-16">
        <Header />

        <div className="flex flex-col gap-3">
          {isPastView && <VlogBanner date={date} isCompleted={isCompleted} />}
          <GroupLog date={date} />
        </div>
      </div>
    </div>
  );
};

export default Log;
