'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { LogList } from '@/widgets/log-list';
import { useHourlyLogs, useAvailableHours, Log } from '@/entities/log';

type GroupLogProps = {
  date?: string;
  hour?: number;
  initialLogs?: Log[];
};

export const GroupLog = ({ date, hour, initialLogs }: GroupLogProps) => {
  const router = useRouter();
  const formattedDate = date ? date.replace(/"/g, '').replace('/', '-') : dayjs().format('M-D');
  const resolvedHour = hour ?? dayjs().hour();
  const [currentHour, setCurrentHour] = useState(resolvedHour);

  const { data: availableHours } = useAvailableHours();
  const { data: logs } = useHourlyLogs(currentHour, formattedDate);
  const displayLogs = logs ?? initialLogs ?? [];

  // 현재 날짜의 사용 가능한 시간대 찾기
  const dateHours = availableHours?.find((item) => item.date === formattedDate)?.hours ?? [];
  const currentIndex = dateHours.indexOf(currentHour);

  const handleHourChange = (newHour: number) => {
    setCurrentHour(newHour);
    router.push(`/log?date=${formattedDate}&hour=${newHour}`);
  };

  const handlePrevHour = () => {
    if (currentIndex > 0) {
      handleHourChange(dateHours[currentIndex - 1]);
    }
  };

  const handleNextHour = () => {
    if (currentIndex < dateHours.length - 1) {
      handleHourChange(dateHours[currentIndex + 1]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-base font-bold text-gray-800">
            {process.env.NEXT_PUBLIC_GROUP_NAME || '우리 반'} 로그
          </p>
          <p className="text-[0.75rem] tracking-[0.015rem] text-gray-500">
            {date ?? formattedDate} · {currentHour}:00
          </p>
        </div>
        {dateHours.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevHour}
              disabled={currentIndex === 0}
              className="text-[0.625rem] text-gray-500 disabled:opacity-30"
            >
              ← 이전
            </button>
            <button
              type="button"
              onClick={handleNextHour}
              disabled={currentIndex === dateHours.length - 1}
              className="text-[0.625rem] text-gray-500 disabled:opacity-30"
            >
              다음 →
            </button>
          </div>
        )}
      </div>

      <div className="flex h-1 items-center gap-0.5">
        {dateHours.map((hourValue) => (
          <button
            key={hourValue}
            type="button"
            onClick={() => handleHourChange(hourValue)}
            className={`h-full min-w-px flex-1 rounded-full ${hourValue === currentHour ? 'bg-primary-400' : 'bg-gray-300'}`}
          />
        ))}
      </div>

      <LogList logs={displayLogs} />
    </div>
  );
};
