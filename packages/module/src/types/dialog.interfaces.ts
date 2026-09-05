/**
 * Dialog modal 리뉴얼 props
 */
export interface IDialogParams {
  /** dialog 열림 여부 */
  isOpenDialog: boolean;
  /** alert: 확인 버튼만, confirm: 확인, 취소 버튼 표시 */
  type: 'alert' | 'confirm';
  /** dialog 제목 */
  title: string;
  /** dialog 내용 */
  message: string;
  /** ok 버튼 텍스트 */
  okLabel?: string;
  /** cancel 버튼 텍스트 */
  cancelLabel?: string;
  /** ok 버튼 클릭 시 실행 함수 */
  okFn?: () => void;
  /** cancel 버튼 클릭 시 실행 함수 */
  cancelFn?: () => void;
}

/**
 * Toast notify 리뉴얼 props
 */
export interface IToastParams {
  /**
   * toast 유형
   * default: 기본, success: 성공, error: 에러, warning: 경고, info: 정보
   */
  type: 'default' | 'success' | 'error' | 'warning' | 'info';
  /** toast 열림 여부 */
  isVisible: boolean;
  /** toast 내용 */
  message: string;
  /** toast 지속 시간 */
  duration: number;
  /** toast timeout (내부용) */
  _timeout: NodeJS.Timeout | null;
}
