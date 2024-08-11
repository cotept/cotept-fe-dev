import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import { supabaseClient } from '@/supabase/client';
import {
  ILoginFormValues,
  ISignUpDependencies,
  ISignUpFormValues,
} from '@/types/form/auth';

export const useAuthService = () => {
  const authService: SupabaseAuthClient = supabaseClient.auth;
  const signUp =
    (dependencies: ISignUpDependencies) =>
    async (inputData: ISignUpFormValues) => {
      const { email, pw, username, baekjoonID } = inputData;
      dependencies.setIsLoadingSignup(true);
      try {
        const { error } = await supabaseClient.auth.signUp({
          email,
          password: pw,
          options: {
            data: {
              user_name: username,
              avatar_url: null,
              baekjoon_id: baekjoonID,
            },
          },
        });

        if (error) {
          console.error(error);
        } else {
          dependencies.navigate('/signup/confirm');
        }
      } catch (error) {
        console.error(error);
      }
    };

  const signOut = async () => {
    // 로직 구현
  };

  const signInWithPassword = async (data: ILoginFormValues) => {
    const { userEmail, userPW } = data;
    return await authService.signInWithPassword({
      email: userEmail,
      password: userPW,
    });
  };

  const signInWithKakao = async () => {
    return await authService.signInWithOAuth({
      provider: 'kakao',
    });
  };

  const getSession = async () => {
    // 로직 구현
  };

  const onAuthStateChange = async () => {
    // 로직 구현
  };

  const updateUser = async () => {
    // 로직 구현
  };

  const resetPasswordForEmail = async () => {
    // 로직 구현
  };

  return {
    signUp,
    signOut,
    signInWithPassword,
    signInWithKakao,
    getSession,
    onAuthStateChange,
    updateUser,
    resetPasswordForEmail,
  };
};
