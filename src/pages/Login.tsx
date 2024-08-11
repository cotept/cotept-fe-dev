import { Link, useNavigate } from 'react-router-dom';

import { supabaseClient } from '@/supabase/client';
import SignLayout from '@components/SignLayout';
import Button, { SubmitButton } from '../components/common/Button';
import Input from '../components/common/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import ValidateMessage from '@components/common/ValidateMessage'

interface IFormValues {
  userEmail:string,
  userPW:string,
  login:string
}
const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    clearErrors,
    setError,
    handleSubmit,
  } = useForm<IFormValues>({ mode: 'onChange' });

  const onSubmit:SubmitHandler<IFormValues> = async data => {
    const { userEmail, userPW } = data;
    try {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email: userEmail,
        password: userPW,
      });
      if (error) {
        throw error;
      } else {
        navigate('/');
      }
    } catch (error) {
      setError('login', {
        type: 'loginCheck',
        message: `🚨이메일 또는 비밀번호를 잘못 입력하셨어요! 다시 확인해주세요🚨`,
      });
      return;
    }
  };
  const handleLoginKakao = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'kakao',
      });
      if (error) console.error(error);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SignLayout>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="border-b-[1px] border-gray-300 border-solid relative bottom-0 left-0 pb-6 after:absolute after:content-['OR'] after:bottom-0 after:left-[50%] after:translate-y-[50%] after:translate-x-[-50%] after:leading-[10px] after:bg-white after:text-gray-400 after:px-2 after:text-sm">
          <Button
            onClick={handleLoginKakao}
            className="w-full text-[#000000] text-opacity-85 bg-[#FEE500] relative font-bold after:absolute after:content-[''] after:bg-kakao-symbol after:w-6 after:h-[40px] after:bg-contain after:bg-center after:bg-no-repeat after:left-[15px] after:top-0 after:bottom-0"
          >
            카카오 로그인
          </Button>
        </div>
        <div>
          <Input
            id="userEmail"
            type="text"
            onFocus={() => clearErrors('login')}
            placeholder="이메일을 입력해주세요"
            {...register('userEmail', {
              required: '이메일을 입력해주세요',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '이메일 형식으로 작성해주실래요?',
              },
            })}
            name="userEmail"
          />
          {errors.userEmail && (
            <ValidateMessage>{errors.userEmail.message}</ValidateMessage>
          )}
        </div>
        <div>
          <Input
            id="userPW"
            type="password"
            onFocus={() => clearErrors('login')}
            placeholder="비밀번호를 입력해주세요"
            {...register('userPW', {
              required: '비밀번호를 입력하세요',
            })}
            name="userPW"
          />

          {errors.userPW && (
            <ValidateMessage>{errors.userPW.message}</ValidateMessage>
          )}
        </div>
        <div className="relative">
          {errors.login && (
            <ValidateMessage className="w-full relative text-center pt-0 pb-6">
              {errors.login.message}
            </ValidateMessage>
          )}
          <SubmitButton className="w-full bg-primary-500 text-white">
            로그인
          </SubmitButton>
        </div>
        <div className="text-sm font-light text-gray-500 dark:text-gray-400 flex gap-6 justify-center">
          <Link
            to="/login/check"
            className="text-sm font-medium text-gray-500 hover:underline dark:text-primary-500 relative after:content-['|'] after:absolute after:top-[-1.5px] after:right-[-14px]"
          >
            비밀번호 찾기
          </Link>
          <Link
            to="/signup"
            className="font-medium text-gray-500 hover:underline dark:text-primary-500"
          >
            회원가입
          </Link>
        </div>
      </form>
    </SignLayout>
  );
};

export default LoginPage;
