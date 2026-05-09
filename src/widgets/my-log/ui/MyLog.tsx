'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  CameraPermissionGuide,
  VIDEO_RECORD_DURATION_MS,
  VideoRecorder,
  useVideoRecord,
} from '@/features/video-record';
import { LogCard } from '@/shared/ui';

export const MyLog = () => {
  const router = useRouter();
  const { state, blob, stream, openCamera, flipCamera, startRecording, closeCamera } =
    useVideoRecord(VIDEO_RECORD_DURATION_MS);
  const urlRef = useRef<string | null>(null);

  useEffect(() => {
    if (state !== 'done' || !blob) return;
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    const url = URL.createObjectURL(blob);
    urlRef.current = url;
    sessionStorage.setItem('uploadVideoUrl', url);
    sessionStorage.setItem('uploadVideoMimeType', blob.type);
    router.push('/log/upload');
  }, [state, blob, router]);

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

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
      {state === 'no-device' && (
        <CameraPermissionGuide
          onClose={closeCamera}
          title="카메라를 찾을 수 없어요"
          description="카메라 기기가 연결되어 있는지 확인한 뒤 다시 시도해 주세요."
        />
      )}
      {state === 'busy' && (
        <CameraPermissionGuide
          onClose={closeCamera}
          title="카메라를 사용할 수 없어요"
          description="카메라를 사용 중인 다른 앱이 있습니다. 해당 앱을 종료한 뒤 다시 시도해 주세요."
        />
      )}
      {state === 'error' && (
        <CameraPermissionGuide
          onClose={closeCamera}
          title="오류가 발생했어요"
          description="카메라를 시작할 수 없습니다. 잠시 후 다시 시도해 주세요."
        />
      )}
    </>
  );
};
