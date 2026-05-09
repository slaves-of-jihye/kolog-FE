'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CameraPermissionGuide, VideoRecorder, useVideoRecord } from '@/features/video-record';
import { LogCard } from '@/shared/ui';

export const MyLog = () => {
  const router = useRouter();
  const { state, blob, stream, openCamera, flipCamera, startRecording, closeCamera } =
    useVideoRecord(2000);

  useEffect(() => {
    if (state !== 'done' || !blob) return;
    const url = URL.createObjectURL(blob);
    sessionStorage.setItem('uploadVideoUrl', url);
    router.push('/log/upload');
  }, [state, blob, router]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-base font-bold text-gray-800">내가 올린 로그</p>
        <LogCard
          authorName="하린"
          time="10:00"
          message="집에 가기"
          showUploadCta
          onUploadCtaClick={openCamera}
        />
      </div>

      {stream && (state === 'previewing' || state === 'recording') && (
        <VideoRecorder
          stream={stream}
          state={state}
          onRecord={startRecording}
          onFlip={flipCamera}
          onClose={closeCamera}
        />
      )}

      {state === 'denied' && <CameraPermissionGuide onClose={closeCamera} />}
    </>
  );
};
