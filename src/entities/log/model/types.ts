export interface LogAuthor {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
}

export interface Log {
  id: number;
  uploader: LogAuthor;
  videoUrl: string;
  caption: string | null;
  date: string;
  hour: number;
  comments: Chat[];
  emotions: Emotion[];
}

export interface LogListParams {
  date?: string;
  hour?: number;
}

export interface LogUpdateParams {
  logId: number;
  caption?: string;
  videoFile?: File;
}

export interface Chat {
  id: number;
  author: LogAuthor;
  content: string;
}

export interface CreateChatRequest {
  logId: number;
  content: string;
}

export interface Emotion {
  id: number;
  author: LogAuthor;
  emotionId: string;
}

export interface EmotionRequest {
  logId: number;
  emotionId: string;
}

export interface RecentLogDay {
  date: string; // 'M-D' 형식
  hours: number[];
}
