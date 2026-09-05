import { atom, useAtom } from 'jotai';
import { CONSULTING_VENDOR } from './vendor.types';

// vendor 상태 atom
export const vendorAtom = atom<CONSULTING_VENDOR>(CONSULTING_VENDOR.my010S);

/**
 * vendor 상태 관리 store
 * - my010, 통신 플랫폼 분기처리 다음 vendor 사용하여 관리
 */
export function useVendor() {
  const [vendor, setVendor] = useAtom(vendorAtom);

  // vendor 변경 함수
  function setVendorValue(data: CONSULTING_VENDOR) {
    setVendor(data);
  }

  // vendor 조회 함수
  function getVendorValue() {
    return vendor;
  }

  return {
    vendor,
    setVendor: setVendorValue,
    getVendor: getVendorValue,
  };
}
