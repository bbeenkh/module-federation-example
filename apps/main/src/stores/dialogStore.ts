import { defineStore } from 'pinia';

interface IDialogParams {
  isOpenDialog: boolean;
  type: 'alert' | 'confirm';
  title: string;
  message: string;
  okLabel?: string;
  cancelLabel?: string;
  okFn?: () => void;
  cancelFn?: () => void;
}

interface DialogWithId extends IDialogParams {
  id: number;
}

let dialogId = 0;

const defaultDialogParams: IDialogParams = {
  isOpenDialog: false,
  type: 'alert',
  title: '',
  message: '',
  okLabel: '확인',
  cancelLabel: '취소',
  okFn: () => {},
  cancelFn: () => {},
};

const dialogStore = defineStore('renew-dialog', {
  state: () => ({
    dialogs: [] as DialogWithId[],
  }),
  actions: {
    openDialog(params: Partial<Omit<IDialogParams, 'isOpenDialog'>>) {
      const newDialog: DialogWithId = {
        ...defaultDialogParams,
        ...params,
        isOpenDialog: true,
        id: dialogId++,
      };
      this.dialogs.push(newDialog);
      return newDialog.id;
    },
    closeDialog(id: number) {
      this.dialogs = this.dialogs.filter((dialog) => dialog.id !== id);
    },
    closeAllDialogs() {
      this.dialogs = [];
    },
  },
});
export default dialogStore;
