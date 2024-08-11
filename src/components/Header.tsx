import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useLocation } from 'react-router-dom';

import { userStore } from '@/store';

import { supabaseClient } from '../supabase/client';
import AvatarButton from './AvatarButton';

const Header = () => {
  const { pathname } = useLocation();
  const { userInfo, setUserInfo } = userStore();
  const [loginIsIntialized, setLoginIsIntialized] = useState(false);

  useEffect(() => {
    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // handleSignedIn
          // parameter : event, session, callback
          const data = session?.user.user_metadata;
          setUserInfo(data);
        } else if (event === 'SIGNED_OUT') {
          //사용자세션제거
          [window.localStorage, window.sessionStorage].forEach(storage => {
            Object.entries(storage).forEach(([key]) => {
              storage.removeItem(key);
            });
          });
        }
        setLoginIsIntialized(true);
      },
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (pathname === '/login' || pathname === '/signup') return null;
  return (
    <header className="fixed z-50 w-full shadow-sm">
      <nav className="border-gray-200 bg-white px-4 py-2.5 lg:px-6 dark:bg-gray-800">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              💪코테PT
            </span>
          </Link>
          <div className="flex h-8 items-center lg:order-2">
            {loginIsIntialized ? (
              userInfo?.user_name ? (
                <AvatarButton />
              ) : (
                <Link
                  to="/login"
                  className="rounded-lg bg-primary-700 px-4 py-[6px] text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 lg:px-5 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  로그인
                </Link>
              )
            ) : null}

            <button
              type="button"
              className="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <GiHamburgerMenu />
            </button>
          </div>
          <div
            className="hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto"
            id="mobile-menu-2"
          >
            <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
              <li>
                <Link
                  to="/ready"
                  className="block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-primary-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent lg:dark:hover:text-white"
                >
                  학습방
                </Link>
              </li>
              <li>
                <Link
                  to="/ready"
                  className="block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-primary-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent lg:dark:hover:text-white"
                >
                  복습방
                </Link>
              </li>
              <li>
                <Link
                  to="/ready"
                  className="block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-primary-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent lg:dark:hover:text-white"
                >
                  기록방
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
