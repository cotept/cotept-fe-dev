import { supabaseClient } from '@/supabase/client';
import { NavigateFunction } from 'react-router-dom';

export const handleLogOut = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  deleteUserInfo: () => void,
  navigate: NavigateFunction,
) => {
  e.preventDefault();
  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) console.error(error);
    deleteUserInfo();
    navigate('/');
  } catch (error) {
    console.error(error);
  }
};
