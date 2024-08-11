import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { SubmitButton } from '../components/common/Button';
import Input, { LabelInput } from '../components/common/Input';
import Spinner from '../components/common/Spinner';
import ValidateMessage from '../components/common/ValidateMessage';
import SignLayout from '../components/SignLayout';
import { supabaseClient } from '../supabase/client';
import { AuthChangeEvent } from '@supabase/supabase-js';

interface IFormValues {
  email:string,
  pw:string,
  confirmPw:string
}

const CheckPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<IFormValues>({ mode: 'onChange' });

  const onSubmitResetPassword:SubmitHandler<IFormValues> = async data => {
    const { email } = data;
    setIsLoading(true);
    try {
      const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: window.location.origin + `/login/check`,
        },
      );
      if (error) {
        navigate('/confirm/error');
      } else if (data) {
        navigate('/confirm/resetPassword');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitUpdatePassword:SubmitHandler<IFormValues> = async data => {
    const { pw } = data;
    setIsLoading(true);
    try {
      const { data, error } = await supabaseClient.auth.updateUser({
        password: pw,
      });
      if (data) {
        navigate('/confirm/updatePassword');
      }
      if (error) {
        navigate('/confirm/error');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      async (event: AuthChangeEvent) => {
        if (event == 'PASSWORD_RECOVERY') {
          setIsAuthenticated(true);
        }
      },
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <SignLayout>
      {!isAuthenticated && (
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmitResetPassword)}
        >
          <div>
            <p className="pb-4 text-center leading-6">
              비밀번호를 잃어버리셨나요?
              <br />
              인프런에 가입한 이메일을 정확히 입력해 주세요.
              <br /> 이메일을 통해 비밀번호 변경 링크가 전송됩니다.
            </p>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              {...register('email', {
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '이메일 형식으로 작성해주실래요?',
                },
              })}
              name="email"
            />
            {errors.email && (
              <ValidateMessage>{errors.email.message}</ValidateMessage>
            )}
          </div>
          <SubmitButton className={`bg-primary-600 text-white w-full`}>
            {!isLoading ? (
              '인증 메일 전송하기'
            ) : (
              <Spinner className="w-4 h-4" />
            )}
          </SubmitButton>
        </form>
      )}
      {isAuthenticated && (
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmitUpdatePassword)}
        >
          <div>
            <p className="pb-4 text-center leading-6">
              변경할 비밀번호로 정확히 입력해주세요.
            </p>
            <div>
              <LabelInput
                id="password"
                type="password"
                placeholder="••••••••••"
                {...register('pw', {
                  required: '비밀번호를 입력하세요',
                  validate: {
                    checkMinLength: value => {
                      return (
                        value.length > 8 || '비밀번호는 8자 이상이어야 해요!'
                        );
                      },
                      checkInclude: value => {
                        const reg = '^(?=.*[@$!%*#?&]).{1,}$';
                        return value.match(reg)
                        ? true
                        : '하나 이상의 특수문자가 포함되어야 해요';
                      },
                    },
                  })}
                  name="password"
              >
                비밀번호
              </LabelInput>
              {errors.pw && (
                <ValidateMessage>{errors.pw.message}</ValidateMessage>
              )}
            </div>
            <div className="pt-6">
              <LabelInput
                id="confirm-password"
                type="password"
                placeholder="••••••••••"
                {...register('confirmPw', {
                  required: '비밀번호를 확인하세요',
                  validate: {
                    matchPassword: value => {
                      const { pw } = getValues();
                      return (
                        pw === value || '비밀번호가 달라요! 확인해 보시겠어요?'
                        );
                      },
                    },
                  })}
                  name="confirm-password"
              >
                비밀번호 확인
              </LabelInput>
              {errors.confirmPw && (
                <ValidateMessage>{errors.confirmPw.message}</ValidateMessage>
              )}
            </div>
          </div>
          <SubmitButton className={`bg-primary-600 text-white w-full`}>
            {!isLoading ? '비밀번호 변경' : <Spinner className="w-4 h-4" />}
          </SubmitButton>
        </form>
      )}
    </SignLayout>
  );
};

export default CheckPassword;
