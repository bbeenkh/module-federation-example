import React, { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import hostPropsAtom from '@/stores/hostProps';
import { IHostProps } from '@/types/utils.interfaces';
import { useVendor } from '@/vendors/useVendor';

interface IProps extends IHostProps {
  children: React.ReactNode;
  callback?: (props: any) => void;
}

/**
 * Module Federation 초기화 수행 Wrapper 컴포넌트
 * @param children: Module Federation 루트컴포넌트
 * @param callback
 * @returns
 */
// TODO: 타입 초기화 관련 로직 추가
export default function MfedInitWrapper({
  callback,
  children,
  ...props
}: IProps) {
  const [isInit, setIsInit] = useState(false);
  const setHostProps = useSetAtom(hostPropsAtom);
  const { setVendor } = useVendor();

  useEffect(() => {
    const {
      host_openDialog,
      host_openToast,
      host_userInfo,
      host_route,
      vendor,
    } = props;
    setHostProps({
      host_openDialog,
      host_openToast,
      host_userInfo,
      host_route,
    });
    setVendor(vendor);
    // FIXME: ignore 제거
    //@ts-ignore
    callback && callback(props);
    setIsInit(true);
  }, [props, setHostProps]);

  if (!isInit) return null;

  return children;
}
