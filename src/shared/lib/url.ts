/**
 * localhost URL을 배포 도메인으로 변환합니다.
 * 백엔드에서 localhost로 반환된 이미지/비디오 URL을 프론트엔드 환경에 맞게 변환합니다.
 */
export const fixLocalhost = (url: string | null | undefined): string | undefined => {
  if (!url) return undefined;

  return url
    .replace('http://localhost:8001', process.env.NEXT_PUBLIC_API_URL || '')
    .replace('http://localhost:8080', process.env.NEXT_PUBLIC_API_URL || '');
};
