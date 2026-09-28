export interface UpdateProfileRequest {
  nickname?: string;
  profileImage?: File;
}

export interface UserMeResponse {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
}
