import { defineStore } from 'pinia';

interface IToastParams {
  type: 'default' | 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  message: string;
  duration: number;
  _timeout: NodeJS.Timeout | null;
}

const defaultToastProps: IToastParams = {
  type: 'default',
  duration: 5000,
  isVisible: false,
  message: '',
  _timeout: null,
};

const toastNotify = defineStore('renew-toast', {
  state: (): IToastParams => ({ ...defaultToastProps }),
  actions: {
    openToast({
      message,
      type = 'default',
    }: {
      message: string;
      type: IToastParams['type'];
    }) {
      if (this.isVisible) return;
      this.message = message;
      this.type = type;
      this.isVisible = true;
      if (!this._timeout) {
        this._timeout = setTimeout(() => {
          this.closeToast();
        }, this.duration);
      }
    },
    closeToast() {
      this._timeout && clearTimeout(this._timeout!);
      this.$reset();
    },
  },
});

export default toastNotify;
