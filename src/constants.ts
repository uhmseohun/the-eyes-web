export const VISION_SERVER_URL = 'http://localhost:5000';
export const BACKEND_API_URL = 'http://localhost:3000';
export const SOCKET_IO_URL = 'http://localhost:3000';
export const WEBAPP_URL = 'http://localhost:8080';
export const KAKAO_SDK_KEY = '29631686dd2f203de7e6bc295659a4ea';
export const GOOGLE_TRACKING_ID = 'UA-145834925-2';
export const QRCODE_API_URI = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=';

interface SwalOption {
  toast: boolean;
  confirmButtonText: string;
  cancelButtonText: string;
  timer: number;
  timerProgressBar: boolean;
  position: 'top-end' | 'top' | 'top-start' | 'top-left' | 'top-right' |
    'center' | 'center-start' | 'center-end' | 'center-left' | 'center-right' |
    'bottom' | 'bottom-start' | 'bottom-end' | 'bottom-left' | 'bottom-right';
}
export const SWAL_OPTIONS: SwalOption = {
  toast: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  timer: 1500,
  timerProgressBar: true,
  position: 'top-end',
};
