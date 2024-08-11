import { supabaseClient } from '../../../supabase/client';

export const useBaekJoonRepository = () => {
  const getEmailFromProfile = async (email: string) => {
    const { data, error } = await supabaseClient
      .from('profiles')
      .select('email')
      .eq('email', email);
    if (error) {
      throw error;
    }

    return data;
  };

  return { getEmailFromProfile };
};
