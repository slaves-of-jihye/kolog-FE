import { useEffect, useRef, useState } from 'react';

export type RecordState = 'idle' | 'previewing' | 'recording' | 'done' | 'denied';

const getMimeType = (): string => {
  if (typeof MediaRecorder === 'undefined') return 'video/mp4';
  if (MediaRecorder.isTypeSupported('video/webm')) return 'video/webm';
  return 'video/mp4';
};

const requestStream = (facingMode: 'user' | 'environment') =>
  navigator.mediaDevices.getUserMedia({ video: { facingMode }, audio: true });

export const useVideoRecord = (durationMs = 2000) => {
  const [state, setState] = useState<RecordState>('idle');
  const [blob, setBlob] = useState<Blob | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const streamRef = useRef<MediaStream | null>(null);

  const openCamera = async () => {
    if (state !== 'idle') return;
    try {
      const mediaStream = await requestStream(facingMode);
      streamRef.current = mediaStream;
      setStream(mediaStream);
      setState('previewing');
    } catch (err) {
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        setState('denied');
      }
    }
  };

  const flipCamera = async () => {
    if (state !== 'previewing') return;
    const next: 'user' | 'environment' = facingMode === 'user' ? 'environment' : 'user';
    streamRef.current?.getTracks().forEach((t) => t.stop());
    try {
      const mediaStream = await requestStream(next);
      streamRef.current = mediaStream;
      setStream(mediaStream);
      setFacingMode(next);
    } catch {
      // 전환 실패 시 기존 방향으로 재시도
      try {
        const fallback = await requestStream(facingMode);
        streamRef.current = fallback;
        setStream(fallback);
      } catch {
        closeCamera();
      }
    }
  };

  const startRecording = () => {
    if (state !== 'previewing' || !streamRef.current) return;

    const mimeType = getMimeType();
    const recorder = new MediaRecorder(streamRef.current, { mimeType });
    const chunks: BlobPart[] = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      setBlob(new Blob(chunks, { type: mimeType }));
      setState('done');
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      setStream(null);
    };

    recorder.start();
    setState('recording');

    setTimeout(() => {
      if (recorder.state === 'recording') recorder.stop();
    }, durationMs);
  };

  const closeCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setStream(null);
    setBlob(null);
    setState('idle');
  };

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return { state, blob, stream, facingMode, openCamera, flipCamera, startRecording, closeCamera };
};
