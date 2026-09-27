import dayjs from 'dayjs';

/**
 * 'M-D' 형식(예: '9-27')의 날짜 문자열을 올해 기준 ISO 날짜(YYYY-MM-DD)로 변환합니다.
 * 로그 목록/생성 등 백엔드 API는 ISO 날짜만 허용합니다.
 */
export const mdToIso = (mdDate: string): string => {
  const [month, day] = mdDate.split('-').map(Number);
  return dayjs(new Date(dayjs().year(), month - 1, day)).format('YYYY-MM-DD');
};
