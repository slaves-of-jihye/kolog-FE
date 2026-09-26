import { useMutation, useQueryClient } from '@tanstack/react-query';
import { baseApi } from '@/shared/api/base';

type Log = {
  videoFile: File;
  caption: string;
  date: string;
  term: number;
};

export const createLog = async (body: Log) => {
  const formData = new FormData();

  formData.append('videoFile', body.videoFile);
  formData.append('caption', body.caption);
  formData.append('date', body.date);
  formData.append('term', String(body.term));
  try {
    const { data } = await baseApi.post('/api/v1/logs', formData);
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

export const useCreateLogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });
};
