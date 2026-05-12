import { useMutation, useQuery } from '@tanstack/react-query';
import { baseApi } from '@/shared/api/base';
import {
  CreateChatRequest,
  CreateChatResponse,
  DateLogResponse,
  EmotionRequest,
  EmotionResponse,
  HourlyLogResponse,
  LogChatResponse,
  UpdateCaptionRequest,
  UpdateCaptionResponse,
} from '../model/types';

const MOCK_ACCESS_TOKEN = 'mock-access-token';

const authHeaders = {
  Authorization: `Bearer ${MOCK_ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
};

export const logApi = {
  getHourlyLogs: async (hour?: number, date?: string) => {
    const response = await baseApi.get<HourlyLogResponse>('/api/v1/logs/hour', {
      params: { hour, date },
    });
    return response.data;
  },
  postEmotion: async (data: EmotionRequest) => {
    const response = await baseApi.post<EmotionResponse>('/api/v1/video/emotion', data, {
      headers: authHeaders,
    });
    return response.data;
  },
  getLogChats: async (logId: number) => {
    const response = await baseApi.get<LogChatResponse>(`/api/v1/video/${logId}/chat`);
    return response.data;
  },
  postLogChat: async (data: CreateChatRequest) => {
    const response = await baseApi.post<CreateChatResponse>('/api/v1/video/chat', data, {
      headers: authHeaders,
    });
    return response.data;
  },
  getLogsByDate: async (date: string) => {
    const response = await baseApi.get<DateLogResponse>(`/api/v1/logs/${date}`);
    return response.data;
  },
  patchLogCaption: async ({ logId, caption }: UpdateCaptionRequest) => {
    const response = await baseApi.patch<UpdateCaptionResponse>(
      `/api/v1/logs/${logId}/caption`,
      { caption },
      { headers: authHeaders },
    );
    return response.data;
  },
};

export const useHourlyLogs = (hour?: number, date?: string) => {
  return useQuery({
    queryKey: ['logs', 'hour', hour, date],
    queryFn: () => logApi.getHourlyLogs(hour, date),
    select: (response) => response.data,
  });
};

export const useLogChats = (logId: number) => {
  return useQuery({
    queryKey: ['logs', 'chats', logId],
    queryFn: () => logApi.getLogChats(logId),
    select: (response) => response.data,
    enabled: !!logId,
  });
};

export const useLogsByDate = (date: string) => {
  return useQuery({
    queryKey: ['logs', 'date', date],
    queryFn: () => logApi.getLogsByDate(date),
    select: (response) => response.data,
    enabled: !!date,
  });
};

export const useEmotionMutation = () => {
  return useMutation({
    mutationFn: (data: EmotionRequest) => logApi.postEmotion(data),
  });
};

export const useCreateChatMutation = () => {
  return useMutation({
    mutationFn: (data: CreateChatRequest) => logApi.postLogChat(data),
  });
};

export const useUpdateCaptionMutation = () => {
  return useMutation({
    mutationFn: (data: UpdateCaptionRequest) => logApi.patchLogCaption(data),
  });
};
