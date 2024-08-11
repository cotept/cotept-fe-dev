import { queryKeys } from '@/hooks/reactQuery/queryKey';
import { supabaseClient } from '@/supabase/client';
import { IBaekjoonTable } from '@/types/common/supabase';
import { PostgrestMaybeSingleResponse } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

const useSolvedQuery = (baekjoonId: string) => {
  return useQuery<PostgrestMaybeSingleResponse<IBaekjoonTable[]>>({
    queryKey: queryKeys.baekjoonController.solved(baekjoonId),
    queryFn: async () =>
      await supabaseClient.from('baekjoon').select('*').eq('id', baekjoonId),
  });
};

export default useSolvedQuery;
