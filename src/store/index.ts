import { UserMetadata } from '@supabase/supabase-js';
import { create } from 'zustand';

export interface IKakaoUserInfo {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  phone_verified: boolean;
  preferred_username: string;
  provider_id: string;
  sub: string;
  user_name: string;
  baekjoon_id?: string;
}

export interface IEmailUserInfo {
  avatar_url?: string;
  baekjoon_id: string;
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
  user_name: string;
}

export type IUserInfo = IKakaoUserInfo | IEmailUserInfo | UserMetadata;

interface IUserStore {
  userInfo: IUserInfo | null;
  setUserInfo: (data: IUserInfo) => void;
  deleteUserInfo: () => void;
}

export const userStore = create<IUserStore>(set => ({
  userInfo: null,
  setUserInfo: data => {
    set({ userInfo: data });
  },
  deleteUserInfo: () => {
    set({ userInfo: null });
  },
}));
