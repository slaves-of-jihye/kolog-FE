import { baseApi } from '@/shared/api/base';

type Log = {
  videoFile: File;
  caption: string;
  date: string;
  hour: number;
};

export const createLog = async (body: Log) => {
  const formData = new FormData();

  formData.append('videoFile', body.videoFile);
  formData.append('caption', body.caption);
  formData.append('date', body.date);
  formData.append('hour', String(body.hour));
  try {
    const token = localStorage.getItem('accessToken');
    const { data } = await baseApi.post('/api/v1/logs/video', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    if (error && typeof error === 'object' && 'response' in error) {
      console.log(
        '에러 내용:',
        JSON.stringify((error as { response?: { data?: unknown } }).response?.data),
      );
    }
    throw error;
  }
};
