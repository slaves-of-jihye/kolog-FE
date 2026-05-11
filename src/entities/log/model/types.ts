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
