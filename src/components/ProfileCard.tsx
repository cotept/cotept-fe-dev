import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import DefaultUser from '@/assets/defaultUser.svg?react';
import Refresh from '@/assets/refresh.svg?react';
import { LoadingButton } from '@/components/common/Button';
import { fromNow } from '@/utils/contribution';

import { userStore } from '../store';
import DonutChart from './DonutChart';
import { IBaekjoonTable } from '@/types/common/supabase';
import useSolvedQuery from '@/hooks/reactQuery/queries/useSolvedQuery';
import useUpdateSolvedMutation from '@/hooks/reactQuery/mutations/useUpdateSolvedMutation';

const ProfileCard = () => {
  const { userInfo } = userStore();
  const params = useParams() as { id: string };

  const { mutate, isPending } = useUpdateSolvedMutation(params.id);
  const { data: baekjoonData } = useSolvedQuery(params.id);
  const data = baekjoonData?.data?.[0] as IBaekjoonTable;
  const updated_at = data?.updated_at;
  const solved_day = data?.solved_day;
  const solved_total_count = data?.solved_total_count;
  const review_count = data?.review_count;
  const review_ratio = Math.floor((review_count / solved_total_count) * 100);
  return (
    <section className="grid grid-cols-2 grid-rows-2 gap-2 lg:grid-cols-3 lg:grid-rows-1 lg:gap-4">
      <article className="col-start-1 col-end-3 lg:col-start-1 lg:col-end-2">
        <picture>
          {userInfo?.avatar_url ? (
            <img
              src={userInfo?.avatar_url}
              alt="프로필 사진"
              className="max-h-[100px] rounded-full bg-gray-300 object-contain"
            />
          ) : (
            <div className="h-[70px] w-[70px] rounded-full bg-gray-300 lg:h-[100px] lg:w-[100px]">
              <DefaultUser />
            </div>
          )}
        </picture>
        <div className="">
          <h2 className="text-md my-3 font-bold lg:text-3xl">
            {params.id || userInfo?.user_name}
          </h2>
          <div className="mb-4 flex items-center gap-2">
            <LoadingButton
              isPending={isPending || !updated_at}
              onClick={() => mutate(params.id)}
              className={`h-6 w-8 bg-primary-600 py-1 text-white lg:h-8 lg:w-10 lg:py-2`}
            >
              <Refresh />
            </LoadingButton>
            <div className="flex text-sm lg:text-base">
              <p>마지막 업데이트 : </p>
              {isPending || !updated_at ? null : (
                <span className="ml-2">{fromNow(updated_at)}</span>
              )}
            </div>
          </div>
          {userInfo?.user_name ? null : (
            <div className="w-full rounded-lg border border-solid border-gray-300 p-2 text-sm lg:rounded-xl lg:p-3.5 lg:text-base">
              <Link to="/login">
                🔔 카카오 연동하고 나만의 PT를 받아보세요.
              </Link>
            </div>
          )}
        </div>
      </article>
      <article className="col-start-1 col-end-2 flex flex-col rounded-lg bg-profileCard-study p-3 font-bold text-white lg:col-start-2 lg:col-end-3 lg:rounded-xl lg:p-8">
        <p className="text-base lg:text-lg">학습일</p>
        <div className="flex h-full items-center justify-center text-lg lg:text-3xl">
          {((isPending || !updated_at) && '-') || solved_day || '-'}일 / 365일
        </div>
      </article>
      <article className="col-start-2 col-end-3 flex flex-col rounded-lg bg-profileCard-review p-3 font-bold text-white lg:col-start-3 lg:col-end-4 lg:rounded-xl lg:p-8">
        <p className="text-base lg:text-lg">복습력</p>
        <div className="flex h-full flex-col items-center justify-around gap-1 md:flex-row">
          {isPending || !updated_at ? null : (
            <DonutChart
              width={100}
              height={100}
              value={review_ratio || 0}
              innerRadius={40}
              outerRadius={49}
            />
          )}
          <ul className="list-disc text-sm lg:text-base">
            <li>
              문제 해결{' '}
              {((isPending || !updated_at) && '-') || solved_total_count}문제
            </li>
            <li>
              복습 {((isPending || !updated_at) && '-') || review_count}문제
            </li>
          </ul>
        </div>
      </article>
    </section>
  );
};

export default ProfileCard;
