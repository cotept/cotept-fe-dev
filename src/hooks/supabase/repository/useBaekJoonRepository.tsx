import { ICustomBaekjoonCrawlingData } from '@/types/common/baekjoon';
import { supabaseClient } from '../../../supabase/client';

export const useBaekJoonRepository = () => {
  const getRecentlySolvedItemsById = async (userId: string) => {
    const { data, error } = await supabaseClient
      .from('baekjoon')
      .select('solved_recent')
      .eq('id', userId);

    if (error) {
      throw error;
    }
    return data;
  };

  const updateSolvedItems = async (
    userId: string,
    newData: Partial<ICustomBaekjoonCrawlingData>,
  ) => {
    const { data, error } = await supabaseClient
      .from('baekjoon')
      .update({
        solved_problem: newData.solved_problem,
        solved_count: newData.solved_count,
        solved_recent: newData.solved_recent,
        solved_total_count: newData.solved_total_count,
        solved_day: newData.solved_day,
        review_count: newData.review_count,
        updated_at: newData.updated_at,
      })
      .eq('id', userId);
    if (error) {
      throw error;
    }
    return data;
  };

  return { getRecentlySolvedItemsById, updateSolvedItems };
};
