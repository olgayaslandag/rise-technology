import Swal from "sweetalert2";

export const SwalWait = Swal.mixin({
    icon: 'info',
    title: 'Lütfen Bekleyin',
    text: 'Sunucudan bilgiler alınma işlemi biraz zaman alabilir. Beklediğiniz için teşekkürler.',
    showConfirmButton: false,
    allowOutsideClick: false
});

export const SwalConfirm = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-primary me-3',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'Tamam',
    cancelButtonText: 'İptal',
});

export const SwalNew = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success'
    },
    buttonsStyling: false,
    confirmButtonText: 'Tamam'
});

export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})