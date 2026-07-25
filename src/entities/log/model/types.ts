export interface Log {
  logId: number;
  videoUrl: string;
  caption: string;
  date: string;
  hour: number;
  userId: number;
  nickname: string;
  profileImage: string | null;
}

export interface HourlyLogResponse {
  status: number;
  message: string;
  data: {
    hours: number[];
    logs: Log[];
  };
}

export interface EmotionRequest {
  logId: number;
  emotionId: string;
}

export interface EmotionResponse {
  status: number;
  message: string;
  emotionId: number;
}

export interface Chat {
  chatId: number;
  userId: number;
  nickname: string;
  profileImage: string;
  chatContent: string;
}

export interface LogChatResponse {
  status: number;
  message: string;
  data: Chat[];
}

export interface CreateChatRequest {
  logId: number;
  chatContent: string;
}

export interface CreateChatResponse {
  status: number;
  message: string;
  chatContent: string;
}

export interface DateLogItem {
  date: string;
  hour: number;
  userId: number;
  nickname: string;
  profileImage: string;
  videoUrl: string;
  caption: string;
}

export interface DateLogResponse {
  status: number;
  message: string;
  data: DateLogItem[];
}

export interface UpdateCaptionRequest {
  logId: number;
  caption: string;
}

export interface UpdateCaptionResponse {
  status: number;
  message: string;
  data: {
    logId: number;
    caption: string;
    updatedAt: string;
  };
}

export interface HourListItem {
  date: string;
  hours: number[];
}

export interface HourListResponse {
  status: number;
  message: string;
  data: HourListItem[];
}
