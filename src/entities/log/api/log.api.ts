import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { baseApi } from '@/shared/api/base';
import {
  Chat,
  CreateChatRequest,
  Emotion,
  EmotionRequest,
  Log,
  LogListParams,
  LogUpdateParams,
  RecentLogDay,
} from '../model/types';

export const logApi = {
  getLogs: async (params: LogListParams = {}) => {
    const response = await baseApi.get<Log[]>('/api/v1/logs', { params });
    return response.data;
  },
  getLog: async (logId: number) => {
    const response = await baseApi.get<Log>(`/api/v1/logs/${logId}`);
    return response.data;
  },
  updateLog: async ({ logId, caption, videoFile }: LogUpdateParams) => {
    const formData = new FormData();
    if (caption !== undefined) formData.append('caption', caption);
    if (videoFile) formData.append('videoFile', videoFile);
    const response = await baseApi.patch<Log>(`/api/v1/logs/${logId}`, formData);
    return response.data;
  },
  deleteLog: async (logId: number) => {
    await baseApi.delete(`/api/v1/logs/${logId}`);
  },
  postLogChat: async ({ logId, content }: CreateChatRequest) => {
    const response = await baseApi.post<Chat>(`/api/v1/logs/${logId}/comment`, { content });
    return response.data;
  },
  postEmotion: async ({ logId, emotionId }: EmotionRequest) => {
    const response = await baseApi.post<Emotion>(`/api/v1/logs/${logId}/emotion`, { emotionId });
    return response.data;
  },
};

export const useLogs = (params: LogListParams = {}) => {
  return useQuery({
    queryKey: ['logs', 'list', params.date, params.hour, params.userId],
    queryFn: () => logApi.getLogs(params),
    enabled: params.userId === undefined || params.userId > 0,
  });
};

export const useLog = (logId: number) => {
  return useQuery({
    queryKey: ['logs', 'detail', logId],
    queryFn: () => logApi.getLog(logId),
    enabled: !!logId,
  });
};

export const useUpdateLogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LogUpdateParams) => logApi.updateLog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });
};

export const useDeleteLogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (logId: number) => logApi.deleteLog(logId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });
};

export const useCreateChatMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateChatRequest) => logApi.postLogChat(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });
};

export const useEmotionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EmotionRequest) => logApi.postEmotion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });
};

/**
 * 백엔드에는 "로그가 있는 전체 날짜" 목록 API가 없어, 최근 N일을 날짜별로 직접 조회해
 * 로그가 있는 날만 추려낸다. 히스토리 화면 전용 집계 훅.
 */
export const useRecentLogDays = (daysBack = 14) => {
  const days = Array.from({ length: daysBack }, (_, i) => dayjs().subtract(i, 'day'));

  const results = useQueries({
    queries: days.map((day) => ({
      queryKey: ['logs', 'list', day.format('YYYY-MM-DD'), undefined],
      queryFn: () => logApi.getLogs({ date: day.format('YYYY-MM-DD') }),
    })),
  });

  const isLoading = results.some((result) => result.isLoading);
  const data: RecentLogDay[] = days
    .map((day, i) => {
      const logs = results[i].data ?? [];
      const hours = Array.from(new Set(logs.map((log) => log.hour))).sort((a, b) => a - b);
      return { date: day.format('M-D'), hours };
    })
    .filter((item) => item.hours.length > 0);

  return { data, isLoading };
};
