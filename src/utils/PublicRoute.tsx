import { userStore } from '@/store';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const { userInfo } = userStore();
  // 로그인 안한 user 사용 가능 페이지
  return userInfo == null ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
