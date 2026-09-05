/**
 * 컨설팅 vendor
 * TODO: 컨설팅 기능 분리
 */
export const CONSULTING_VENDOR = {
  /** my010 vendor */
  my010S: 'my010S',
  /** 통신플랫폼 vendor */
  REBATE: 'REBATE',
} as const;
export type CONSULTING_VENDOR =
  (typeof CONSULTING_VENDOR)[keyof typeof CONSULTING_VENDOR];
