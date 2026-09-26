'use client';

import { useState, useSyncExternalStore } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCreateLogMutation } from '@/features/video-record/api/sendVideoLog';
import DownloadIcon from '@/shared/assets/icons/download.svg';
import NavArrowLeft from '@/shared/assets/icons/nav-arrow-left.svg';
import { Profile } from '@/shared/ui';
import MoreVertical from '@/shared/assets/icons/more-vertical.svg';
import { useProfile } from '@/entities/user';

const SESSION_KEY = 'uploadVideoUrl';

const subscribeToVideoUrl = () => () => {};

export const LogUpload = () => {
  const router = useRouter();
  const { nickname, profileImage } = useProfile();
  const { mutate: uploadLog, isPending } = useCreateLogMutation();
  const [caption, setCaption] = useState('집에 가기');
  const [uploadError, setUploadError] = useState('');
  const videoUrl = useSyncExternalStore(
    subscribeToVideoUrl,
    () => sessionStorage.getItem(SESSION_KEY),
    () => null,
  );

  // useEffect(() => {
  //   return () => {
  //     if (videoUrl) URL.revokeObjectURL(videoUrl);
  //   };
  // }, [videoUrl]);

  const handleDownload = () => {
    if (!videoUrl) return;
    const mimeType = sessionStorage.getItem('uploadVideoMimeType') ?? 'video/mp4';
    const ext = mimeType === 'video/webm' ? 'webm' : 'mp4';
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = `kolog-${Date.now()}.${ext}`;
    a.click();
  };

  const handleUpload = async () => {
    if (!videoUrl || isPending) return;
    setUploadError('');

    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();

      const mimeType = sessionStorage.getItem('uploadVideoMimeType') ?? 'video/mp4';
      const ext = mimeType.includes('webm') ? 'webm' : 'mp4';
      const videoFile = new File([blob], `log-video-${Date.now()}.${ext}`, { type: mimeType });

      const formattedDate = dayjs().format('YYYY-MM-DD');

      uploadLog(
        {
          videoFile: videoFile,
          caption: caption,
          date: formattedDate,
          term: new Date().getHours(),
        },
        {
          onSuccess: () => {
            sessionStorage.removeItem(SESSION_KEY);
            sessionStorage.removeItem('uploadVideoMimeType');
            URL.revokeObjectURL(videoUrl);
            alert('로그가 성공적으로 업로드되었습니다!');
            router.push('/');
          },
          onError: (error) => {
            console.error('업로드 실패:', error);
            const status = axios.isAxiosError(error) ? error.response?.status : undefined;
            const messages: Record<number, string> = {
              400: '영상 형식 또는 업로드 정보가 올바르지 않습니다.',
              401: '로그인이 만료됐습니다. 다시 로그인해 주세요.',
              413: '영상 용량이 너무 큽니다.',
            };
            setUploadError(
              messages[status ?? 0] ?? '업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.',
            );
          },
        },
      );
    } catch (error) {
      console.error('파일 준비 실패:', error);
      setUploadError('영상 파일을 읽을 수 없습니다. 다시 촬영해 주세요.');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="flex flex-col gap-6 px-5 pt-[calc(4.25rem+env(safe-area-inset-top,0px))] pb-[calc(4rem+env(safe-area-inset-bottom,0px))]">
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
              <Profile className="size-4" src={profileImage} alt={nickname} border={false} />
              <p className="text-[0.5rem] tracking-[0.01rem] whitespace-nowrap text-white">
                {nickname}
              </p>
            </div>
            <MoreVertical className="size-4 fill-white" />
          </div>

          <div className="text-primary-50 relative flex flex-col items-center text-center">
            <p className="font-display text-[2rem] leading-[0.9] whitespace-nowrap">
              {new Date().getHours()}:00
            </p>
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
          disabled={!videoUrl || isPending}
          className="bg-primary-100 flex h-7 w-full items-center justify-center rounded-[0.5rem] text-[0.75rem] tracking-[0.015rem] text-gray-600"
        >
          업로드하기
        </button>
        {uploadError && (
          <p role="alert" className="text-xs text-red-500">
            {uploadError}
          </p>
        )}
      </div>
    </div>
  );
};
