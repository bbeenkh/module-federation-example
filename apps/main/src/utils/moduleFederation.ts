/**
 * Module Federation remote module 로드
 * @returns mftest module bundle
 */
export const loadTestRemoteModule = async () => {
  //@ts-ignore
  const res = (await import('User/mftest')).default;
  return res;
};
