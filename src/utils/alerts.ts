import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';

export const showAlert = (alertIcon: SweetAlertIcon, title: string, position: SweetAlertPosition = 'top') => {
  Swal.fire({
    title: title,
    toast: true,
    position: position,
    icon: alertIcon,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });
};
