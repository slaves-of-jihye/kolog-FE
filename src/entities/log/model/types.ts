export interface User {
  id: number;
  nickname: string;
  profileImage: string;
}

export interface Log {
  logId: number;
  videoUrl: string;
  caption: string;
  date: string;
  hour: number;
  user: User;
}

export interface HourlyLogResponse {
  status: number;
  message: string;
  data: Log[];
}

export interface EmotionRequest {
  videoId: number;
  emotionId: number;
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
