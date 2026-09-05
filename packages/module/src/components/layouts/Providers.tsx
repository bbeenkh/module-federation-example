import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/rquery/queryClient';
import { Provider } from 'jotai';
import { twMerge } from 'tailwind-merge';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 모듈 공통 Provider 컴포넌트
 */
export default function Providers({ children, className }: IProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <div className={twMerge(className)}>{children}</div>
          <ReactQueryDevtools initialIsOpen={false} />
        </Provider>
      </QueryClientProvider>
    </>
  );
}
