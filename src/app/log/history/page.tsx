import { LogCard } from '@/shared/ui';
import { Header } from '@/widgets/header';

type HistoryEntry = {
  date: string;
  log?: { authorName: string; time: string; message: string };
};

const mockHistory: HistoryEntry[] = [
  { date: '4월 24일의 기록', log: { authorName: '하린', time: '10:00', message: '집에 가기' } },
  { date: '4월 25일의 기록', log: { authorName: '하린', time: '10:00', message: '집에 가기' } },
  { date: '4월 26일의 기록' },
  { date: '4월 27일의 기록' },
];

const History = () => {
  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="flex flex-col gap-16 px-5 pt-[4.25rem] pb-16">
        <Header />

        {/* 날짜별 기록 목록 */}
        <div className="flex flex-col gap-3">
          {mockHistory.map((entry, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 overflow-hidden rounded-[0.5rem] bg-gray-100 p-4"
            >
              <p className="text-[0.875rem] font-bold text-gray-800">{entry.date}</p>
              {entry.log ? (
                <>
                  <LogCard
                    authorName={entry.log.authorName}
                    time={entry.log.time}
                    message={entry.log.message}
                  />
                  <button
                    type="button"
                    className="text-left text-[0.625rem] tracking-[0.0125rem] text-gray-500"
                  >
                    바로가기 →
                  </button>
                </>
              ) : (
                <p className="text-[0.625rem] tracking-[0.0125rem] text-gray-600">
                  아직 기록이 없습니다.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
