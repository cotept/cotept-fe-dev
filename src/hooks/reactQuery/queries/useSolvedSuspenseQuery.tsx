import { queryKeys } from '@/hooks/reactQuery/queryKey';
import { supabaseClient } from '@/supabase/client';
import { IBaekjoonTable } from '@/types/common/supabase';
import { PostgrestMaybeSingleResponse } from '@supabase/supabase-js';
import { useSuspenseQuery } from '@tanstack/react-query';

const useSolvedSuspenseQuery = (baekjoonId: string) => {
  return useSuspenseQuery<PostgrestMaybeSingleResponse<IBaekjoonTable[]>>({
    queryKey: queryKeys.baekjoonController.solved(baekjoonId),
    queryFn: async () =>
      await supabaseClient.from('baekjoon').select('*').eq('id', baekjoonId),
  });
};

export default useSolvedSuspenseQuery;
