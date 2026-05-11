import { useQuery } from '@tanstack/react-query';
import { baseApi } from '@/shared/api/base';
import { HourlyLogResponse } from '../model/types';

export const logApi = {
  getHourlyLogs: async (hour?: number) => {
    const response = await baseApi.get<HourlyLogResponse>('/api/v1/logs/hour', {
      params: { hour },
    });
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
