import UserDetailContext from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import React, { useEffect, useState, useContext } from 'react';

function Provider({ children }: any) {
  const { user } = useUser();
  const CreateUser = useMutation(api.users.CreateNewUser);
  const [userDetail, setUserDetail] = useState<any>();

  useEffect(() => {
    if (user) {
      CreateNewUser();
    }
  }, [user]);

  const CreateNewUser = async () => {
    if (user) {
      const result = await CreateUser({
        email: user?.primaryEmailAddress?.emailAddress ?? '',
        imageUrl: user?.imageUrl ?? '',
        name: user?.fullName ?? '',
      });

      console.log('User from Clerk', result);

      // ✅ store result into context state
      setUserDetail(result);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;

// ✅ correct helper
export const useUserDetailContext = () => useContext(UserDetailContext);
