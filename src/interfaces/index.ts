export interface State {
  roomKey: string | null;
}

export interface RouteItem {
  title: string;
  to: string;
}

export interface SwalOption {
  toast: boolean;
  confirmButtonText: string;
  cancelButtonText: string;
  timer: number;
  timerProgressBar: boolean;
  position: 'top-end' | 'top' | 'top-start' | 'top-left' | 'top-right' |
    'center' | 'center-start' | 'center-end' | 'center-left' | 'center-right' |
    'bottom' | 'bottom-start' | 'bottom-end' | 'bottom-left' | 'bottom-right';
}
