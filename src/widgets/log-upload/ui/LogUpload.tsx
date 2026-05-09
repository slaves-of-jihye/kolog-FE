'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DownloadIcon from '@/shared/assets/icons/download.svg';
import NavArrowLeft from '@/shared/assets/icons/nav-arrow-left.svg';
import { Profile } from '@/shared/ui';
import MoreVertical from '@/shared/assets/icons/more-vertical.svg';

const SESSION_KEY = 'uploadVideoUrl';

export const LogUpload = () => {
  const router = useRouter();
  // lazy initializer로 SSR 안전하게 sessionStorage 읽기
  const [caption, setCaption] = useState('집에 가기');
  const [videoUrl] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem(SESSION_KEY);
  });

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  const handleDownload = () => {
    if (!videoUrl) return;
    const mimeType = sessionStorage.getItem('uploadVideoMimeType') ?? 'video/mp4';
    const ext = mimeType === 'video/webm' ? 'webm' : 'mp4';
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = `kolog-${Date.now()}.${ext}`;
    a.click();
  };

  const handleUpload = () => {
    // TODO: API 연동
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem('uploadVideoMimeType');
    router.push('/');
  };

  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="flex flex-col gap-6 px-5 pt-[4.25rem] pb-16">
        {/* 헤더 */}
        <div className="flex h-[1.625rem] items-center gap-6">
          <button type="button" aria-label="뒤로가기" onClick={() => router.back()}>
            <NavArrowLeft className="size-5 stroke-gray-600" />
          </button>
          <p className="text-base font-bold text-gray-600">로그 업로드</p>
        </div>

        {/* 비디오 카드 */}
        <div className="relative flex h-[10.125rem] w-full flex-col items-center justify-between overflow-hidden rounded-[0.625rem] p-3">
          {videoUrl ? (
            <video
              src={videoUrl}
              autoPlay
              muted
              playsInline
              loop
              className="absolute inset-0 h-full w-full rounded-[0.625rem] object-cover"
            />
          ) : (
            <div className="absolute inset-0 rounded-[0.625rem] bg-gray-300" />
          )}
          <div className="absolute inset-0 rounded-[0.625rem] bg-black/10" />

          <div className="relative flex w-full items-center justify-between">
            <div className="flex items-center gap-1">
              <Profile className="size-4" />
              <p className="text-[0.5rem] tracking-[0.01rem] whitespace-nowrap text-white">하린</p>
            </div>
            <MoreVertical className="size-4 fill-white" />
          </div>

          <div className="text-primary-50 relative flex flex-col items-center text-center">
            <p className="font-display text-[2rem] leading-[0.9] whitespace-nowrap">10:00</p>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="캡션 입력"
              className="text-primary-50 placeholder:text-primary-50/60 max-w-[7.25rem] truncate bg-transparent text-center text-[0.5rem] tracking-[0.01rem] outline-none"
            />
          </div>

          <div className="relative flex w-full items-center justify-end">
            <button
              type="button"
              aria-label="저장"
              onClick={handleDownload}
              className="text-primary-50 size-6"
            >
              <DownloadIcon className="stroke-primary-50 size-full" />
            </button>
          </div>
        </div>

        {/* 업로드 버튼 */}
        <button
          type="button"
          onClick={handleUpload}
          className="bg-primary-100 flex h-7 w-full items-center justify-center rounded-[0.5rem] text-[0.75rem] tracking-[0.015rem] text-gray-600"
        >
          업로드하기
        </button>
      </div>
    </div>
  );
};
