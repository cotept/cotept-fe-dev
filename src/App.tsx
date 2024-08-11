import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';

import Header from '@/components/Header';
import CheckPassword from '@/pages/CheckPassword';
import Confirm from '@/pages/Confirm';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import NotReady from '@/pages/NotReady';
import ProfilePage from '@/pages/Profile';
import SignUpPage from '@/pages/SignUp';
import SignUpConfirm from '@/pages/SignUpConfirm';
import PublicRoute from '@/utils/PublicRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 60 * 1000 * 5,
    },
  },
});

const App = () => {
  useEffect(() => {
    ReactGA.initialize(`${import.meta.env.VITE_GOOGLE_ID}`);
    ReactGA.send({
      hitType: 'pageview',
      page: '/landingpage',
      title: 'Landing Page',
    });
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Reset />
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/profile/:id" element={<ProfilePage />}></Route>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/signup" element={<SignUpPage />}></Route>
              <Route path="/signup/confirm" element={<SignUpConfirm />}></Route>
              <Route path="/confirm/:state" element={<Confirm />}></Route>
            </Route>
            <Route path="/login/check" element={<CheckPassword />}></Route>
            <Route path="/ready" element={<NotReady />}></Route>
            <Route path="/*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
