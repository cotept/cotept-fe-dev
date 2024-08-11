import { userStore } from '@/store';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { userInfo } = userStore();

  if (userInfo == null) {
    alert('로그인이 필요한 기능입니다.');
  }

  // 로그인 한 user 사용 가능 페이지
  return userInfo == null ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;
