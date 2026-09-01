'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import Link from 'next/link';
import UsersIcon from '@/shared/assets/icons/users-icon.svg';
import { LogCard } from '@/shared/ui';
import { Header } from '@/widgets/header';
import { MyLog } from '@/widgets/my-log';
import { useHourlyLogs } from '@/entities/log';

const Main = () => {
  const router = useRouter();
  const today = dayjs().format('M-D');
  const currentHour = dayjs().hour();
  const { data: logs } = useHourlyLogs(currentHour, today);

  // 인증 체크
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  // 가장 먼저 업로드된 로그 (featured log)
  const featuredLog = logs && logs.length > 0 ? logs[0] : null;

  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="flex flex-col gap-16 px-5 pt-[4.25rem] pb-16">
        <Header />

        <div className="flex flex-col gap-10">
          <MyLog />

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <UsersIcon className="size-5" />
                <p className="text-base font-bold text-gray-800">
                  {process.env.NEXT_PUBLIC_GROUP_NAME || '우리 반'}
                </p>
              </div>
              <Link
                href={`/log?date=${today}&hour=${currentHour}`}
                className="text-[0.625rem] tracking-[0.0125rem] text-gray-500"
              >
                바로가기→
              </Link>
            </div>
            {featuredLog && (
              <LogCard
                authorName={featuredLog.nickname}
                time={`${featuredLog.hour}:00`}
                message={featuredLog.caption}
                videoUrl={featuredLog.videoUrl}
                profileImageUrl={featuredLog.profileImage || undefined}
                showProgress={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
