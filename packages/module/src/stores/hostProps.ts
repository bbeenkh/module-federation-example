import { IHostProps } from '@/types/utils.interfaces';
import { atom } from 'jotai';

const hostPropsAtom = atom<IHostProps>({
  host_openDialog: () => {},
  host_openToast: () => {},
  host_userInfo: {
    email: '',
    id: 0,
    name: '',
    phone: '',
    role: '',
    organizable_name: '',
    organizable_id: 0,
    code: '',
  },
  host_route: {
    push: async () => {},
    go: () => {},
    replace: async () => {},
  },
});

export default hostPropsAtom;
