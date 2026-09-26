/**
 * 이전 로컬 백엔드 포트에서 반환된 이미지/비디오 URL을 현재 백엔드로 변환합니다.
 */
export const fixLocalhost = (url: string | null | undefined): string | undefined => {
  if (!url) return undefined;

  return url.replace('http://localhost:8001', 'http://localhost:8080');
};
