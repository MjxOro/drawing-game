'use client'

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { useRouter } from 'next/navigation'
import { checkAuth } from '../app/GlobalRedux/Features/auth/authSlice';

const ProtectedRoute = ({ children }:any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuth, isLoading } = useAppSelector(state => state.auth)
  const token = sessionStorage.getItem('access_token')

  useEffect(() => {
    dispatch(checkAuth())
    if (!token) {
      router.replace('/');
    }else{
      router.replace('/play');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return(
   <div>{children}</div>
  )

};

export default ProtectedRoute
