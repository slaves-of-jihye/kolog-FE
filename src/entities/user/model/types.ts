export interface UpdateProfileRequest {
  nickname?: string;
  profileImage?: File;
}

export interface UserProfileResponse {
  status: number;
  message: string;
  data: {
    userId: number;
    nickname: string;
    profileImage: string;
    email: string;
    createdAt: string;
  };
}
