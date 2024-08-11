import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userStore } from '../store';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { FaUserAlt } from 'react-icons/fa';
import { handleLogOut } from '@/utils/logout';

const AvatarButton = () => {
  const { userInfo, deleteUserInfo } = userStore();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useOnClickOutside(ref, () => setVisible(false));

  return (
    <div id="header-profile" className="relative left-0 top-0" ref={ref}>
      <button
        className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-300 text-gray-700"
        onClick={() => setVisible(!visible)}
      >
        {userInfo && userInfo.avatar_url ? (
          <img
            src={userInfo.avatar_url}
            className="w-full"
            alt={`${userInfo.user_name}님의 프로필 사진`}
          />
        ) : (
          <FaUserAlt className="w-full fill-white" />
        )}
      </button>
      {visible && (
        <ul className="absolute right-0 top-[100%] mt-1 flex w-[150px] flex-col overflow-hidden rounded-lg bg-white text-sm drop-shadow-md">
          <li className="border-b-[1px] border-solid border-gray-100 px-4 py-3 text-center">
            {userInfo?.user_name}
          </li>
          <li className=" hover:bg-gray-50">
            <Link to={`/profile`} className="inline-block w-full px-4 py-3">
              마이페이지
            </Link>
          </li>
          <li className=" hover:bg-gray-50">
            <button
              className="w-full px-4 py-3 text-left"
              onClick={e => handleLogOut(e, deleteUserInfo, navigate)}
            >
              로그아웃
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default AvatarButton;
