export interface ILoginFormValues {
  userEmail: string;
  userPW: string;
  login: string;
}

export interface ISignUpBaekjoonValidation {
  isLoading: boolean;
  checked: boolean;
  text: string;
}

export interface ISignUpFormValues {
  email: string;
  username: string;
  baekjoonID: string;
  pw: string;
  confirmPw: string;
}

export interface ISignUpDependencies {
  setIsLoadingSignup: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: (path: string) => void;
}
