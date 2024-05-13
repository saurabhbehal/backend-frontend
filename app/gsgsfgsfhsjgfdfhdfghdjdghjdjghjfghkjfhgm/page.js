"use client";
import { useEffect } from 'react';


import { isAuthenticated } from '../utils/auth';
import Frontend from '@/components/frontend/page';


const Page = () => {
    useEffect(() => {
        if (!isAuthenticated()) {
          // Redirect to login page if not authenticated
          router.push('/login');
        }
      }, []);
  return (
    <>
      <Frontend/>
    
    </>
  );
};

export default Page;