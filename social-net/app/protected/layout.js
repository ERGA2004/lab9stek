'use client';

import { useEffect } from 'react'; 
import { useRouter } from 'next/navigation'; 
import Cookies from 'js-cookie'; 

export default function ProtectedLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');


    if (!accessToken) {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div>
      {children} 
    </div>
  );
}
