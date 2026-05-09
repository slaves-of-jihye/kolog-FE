'use client';

import { useEffect, useRef, useState } from 'react';
import { VIDEO_RECORD_DURATION_S } from '../config';
import type { RecordState } from '../model/useVideoRecord';

type VideoRecorderProps = {
  stream: MediaStream;
  state: RecordState;
  onRecord: () => void;
  onFlip: () => void;
  onClose: () => void;
};

const FlipIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 4v6h6" />
    <path d="M23 20v-6h-6" />
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
  </svg>
);

export const VideoRecorder = ({ stream, state, onRecord, onFlip, onClose }: VideoRecorderProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const isRecording = state === 'recording';

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // setState는 모두 타이머 콜백 안에서 호출 (effect body 동기 호출 금지)
  useEffect(() => {
    if (state !== 'recording') return;

    const init = setTimeout(() => setCountdown(VIDEO_RECORD_DURATION_S), 0);
    const interval = setInterval(
      () => setCountdown((prev) => (prev !== null && prev > 1 ? prev - 1 : null)),
      1000,
    );

    return () => {
      clearTimeout(init);
      clearInterval(interval);
    };
  }, [state]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <video ref={videoRef} autoPlay muted playsInline className="h-full w-full object-cover" />

      {/* 카운트다운 */}
      {countdown !== null && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-display text-[6rem] leading-none text-white/80">{countdown}</p>
        </div>
      )}

      {/* 상단: 닫기 + 카메라 전환 */}
      <div className="absolute top-0 right-0 left-0 flex items-center justify-between px-5 pt-12">
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className="flex size-10 items-center justify-center rounded-full bg-black/40 text-lg text-white"
        >
          ✕
        </button>
        <button
          type="button"
          aria-label="카메라 전환"
          disabled={isRecording}
          onClick={onFlip}
          className="flex size-10 items-center justify-center rounded-full bg-black/40 disabled:opacity-40"
        >
          <FlipIcon />
        </button>
      </div>

      {/* 하단: 촬영 버튼 */}
      <div className="absolute right-0 bottom-0 left-0 flex items-center justify-center pb-16">
        <button
          type="button"
          aria-label={isRecording ? '촬영 중' : '촬영 시작'}
          disabled={isRecording}
          onClick={onRecord}
          className="flex size-[4.5rem] items-center justify-center rounded-full border-4 border-white disabled:cursor-default"
        >
          <div
            className={`bg-red-500 transition-all duration-300 ${
              isRecording ? 'size-6 rounded-md' : 'size-12 rounded-full'
            }`}
          />
        </button>
      </div>
    </div>
  );
};
