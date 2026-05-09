import { LogList } from '@/widgets/log-list';

const mockLogs = [
  { authorName: '하린', time: '10:00', message: '집에 가기' },
  { authorName: '미수', time: '10:00', message: '여기 어디야' },
  {
    authorName: '소리',
    time: '10:00',
    message: '같이 놀자',
    comment: { authorName: '하린', text: '임소리 왜케 귀엽지 진짜' },
  },
  { authorName: '하린', time: '10:00', message: '집에 가기' },
  { authorName: '하린', time: '10:00', message: '집에 가기' },
];

type GroupLogProps = {
  date?: string;
};

export const GroupLog = ({ date }: GroupLogProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <p className="text-base font-bold text-gray-800">최강 2학년 2반 로그</p>
        <p className="text-[0.75rem] tracking-[0.015rem] text-gray-500">{date ?? '4/24'}</p>
      </div>

      <div className="flex h-1 items-center gap-0.5">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className={`h-full min-w-px flex-1 rounded-full ${i === 6 ? 'bg-primary-400' : 'bg-gray-300'}`}
          />
        ))}
      </div>

      <LogList logs={mockLogs} />
    </div>
  );
};
