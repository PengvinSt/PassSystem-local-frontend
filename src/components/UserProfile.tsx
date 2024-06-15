import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { useStateContext } from '../utils/internal.context';
import { FiSettings } from 'react-icons/fi';
import { observer } from 'mobx-react';
import { useAppContext } from '../utils/context';

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const { store } = useAppContext()
  const userProfileData = [
  {
    icon: <FiSettings style={{ color: currentColor }}/>,
    title: 'My Profile',
    desc: 'Account Settings',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  }
];

  return (
    <div className="nav-item absolute right-1 top-16 bg-slate-100 dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={store.user.currentUser?.picture}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">{store.user.currentUser?.name.first} {store.user.currentUser?.name.last}</p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  {store.user.currentUser?.job}   </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <div onClick={()=> {
          localStorage.removeItem('login');
          localStorage.removeItem('pass');
          store.user.setAuth(false);
          }}>
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
          
        />
        </div>
      </div>
    </div>

  );
};

export default observer(UserProfile);