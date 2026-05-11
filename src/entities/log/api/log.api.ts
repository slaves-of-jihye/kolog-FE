import { useMutation, useQuery } from '@tanstack/react-query';
import { baseApi } from '@/shared/api/base';
import { EmotionRequest, EmotionResponse, HourlyLogResponse } from '../model/types';

export const logApi = {
  getHourlyLogs: async (hour?: number) => {
    const response = await baseApi.get<HourlyLogResponse>('/api/v1/logs/hour', {
      params: { hour },
    });
    return response.data;
  },
  postEmotion: async (data: EmotionRequest) => {
    const response = await baseApi.post<EmotionResponse>('/api/v1/video/emotion', data);
    return response.data;
  },
};

export const useHourlyLogs = (hour?: number) => {
  return useQuery({
    queryKey: ['logs', 'hour', hour],
    queryFn: () => logApi.getHourlyLogs(hour),
    select: (response) => response.data,
  });
};

export const useEmotionMutation = () => {
  return useMutation({
    mutationFn: (data: EmotionRequest) => logApi.postEmotion(data),
  });
};
