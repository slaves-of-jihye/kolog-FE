import dayjs from 'dayjs';
import { Header } from '@/widgets/header';
import { GroupLog } from '@/widgets/group-log';
import { VlogBanner } from '@/widgets/vlog-banner';
import { logApi } from '@/entities/log';

export const revalidate = 60;

type SearchParams = Promise<{ date?: string; hour?: string; completed?: string }>;

const Log = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { date, hour: hourParam, completed } = await searchParams;
  const isPastView = Boolean(date);
  const isCompleted = completed === 'true';
  const hour = hourParam ? parseInt(hourParam, 10) : dayjs().hour();

  const formattedDate = date ? date.replace(/"/g, '').replace('/', '-') : dayjs().format('M-D');
  const logs = await logApi.getHourlyLogs(hour, formattedDate);

  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="flex flex-col gap-16 px-5 pt-[4.25rem] pb-16">
        <Header />

        <div className="flex flex-col gap-3">
          {isPastView && <VlogBanner date={date} isCompleted={isCompleted} />}
          <GroupLog date={date} hour={hour} initialLogs={logs.data} />
        </div>
      </div>
    </div>
  );
};

export default Log;
