import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SignLayout from '../components/SignLayout';
import fetchAchievement from '@/apis/fetchAchievement';
import { userStore } from '@/store';
import { supabaseClient } from '../supabase/client';
import { useQueryClient } from '@tanstack/react-query';

const SignUpConfirm = () => {
  const navigate = useNavigate();
  const { setUserInfo } = userStore();
  const baekjoonData = useRef<string | null>(null);
  const [userId, setUserId] = useState<string>();
  const queryClient = useQueryClient();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const getSession = async () => {
      const session = await supabaseClient.auth.getSession();
      if (session.data.session?.user.id) {
        // 사용자 ID가 있으면 상태 업데이트
        setUserId(session.data.session?.user.id);
        navigate('/'); // 로그인한 사용자는 메인 페이지로 리다이렉트
      }
    };

    getSession();

    // 실시간 인증 상태 체크
    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const data = session.user.user_metadata;
          setUserInfo(data);
          if (!baekjoonData.current) {
            // setTimeout으로 한 이유는 onAuthStateChange와 데드락을 피하기 위해 사용
            timeoutId = setTimeout(async () => {
              const { data: baekjoon } = await supabaseClient
                .from('baekjoon')
                .select('solved_recent')
                .eq('id', session.user.user_metadata.baekjoon_id);
              baekjoonData.current = baekjoon?.[0].solved_recent;
              // baekjoon 테이블에 있는 solved_recent 컬럼을 조회 후 없으면 크롤링
              // session에 baekjoon_id가 존재해야함
              if (
                session.user.user_metadata.baekjoon_id &&
                !baekjoon?.[0].solved_recent
              ) {
                const res = await queryClient.fetchQuery({
                  queryKey: ['solved', session.user.user_metadata.baekjoon_id],
                  queryFn: () =>
                    fetchAchievement(session.user.user_metadata.baekjoon_id),
                });
                const crawling = res.data[0];
                // 크롤링한 데이터를 가지고 baekjoon 테이블 업데이트
                await supabaseClient
                  .from('baekjoon')
                  .update({
                    solved_problem: crawling.solved_problem,
                    solved_count: crawling.solved_count,
                    solved_recent: crawling.solved_recent,
                    solved_total_count: crawling.solved_total_count,
                    solved_day: crawling.solved_day,
                    review_count: crawling.review_count,
                    updated_at: crawling.updated_at,
                  })
                  .eq('id', session.user.user_metadata.baekjoon_id);
              }
            }, 0);
          }
          navigate('/');
        }
      },
    );

    return () => {
      clearTimeout(timeoutId);
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  // 이미 로그인한 경우 인증 상관없이 메인 페이지로 이동
  if (userId) {
    return null;
  }

  return (
    <SignLayout>
      <p className="text-center leading-6">
        회원가입 인증 메일이 발송되었습니다. <br />
        메일 발송에 약 5분 내외 소요됩니다.
        <br /> 인증 메일 확인 후 로그인 가능합니다.
      </p>
    </SignLayout>
  );
};

export default SignUpConfirm;
