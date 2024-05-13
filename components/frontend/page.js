"use client";
import { useEffect } from 'react';

import ProjectImageUpload from '../frontend/ProjectImageUpload';
import React from 'react';
import FileUploadForm from '../frontend/CategoryUpload';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../../app/utils/auth';


const frontend = () => {
    useEffect(() => {
        if (!isAuthenticated()) {
          // Redirect to login page if not authenticated
          router.push('/login');
        }
      }, []);
  return (
    <>
      <FileUploadForm/>
      <ProjectImageUpload/>
    
    </>
  );
};

export default frontend;