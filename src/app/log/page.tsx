import dayjs from 'dayjs';
import { Header } from '@/widgets/header';
import { GroupLog } from '@/widgets/group-log';
import { VlogBanner } from '@/widgets/vlog-banner';

type SearchParams = Promise<{ date?: string; hour?: string; completed?: string }>;

const Log = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { date, hour: hourParam, completed } = await searchParams;
  const isPastView = Boolean(date);
  const isCompleted = completed === 'true';
  const hour = hourParam ? parseInt(hourParam, 10) : dayjs().hour();

  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="flex flex-col gap-16 px-5 pt-[4.25rem] pb-16">
        <Header />

        <div className="flex flex-col gap-3">
          {isPastView && <VlogBanner date={date} isCompleted={isCompleted} />}
          <GroupLog date={date} hour={hour} />
        </div>
      </div>
    </div>
  );
};

export default Log;
