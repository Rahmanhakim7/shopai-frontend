import Swal, { SweetAlertResult } from "sweetalert2";
const confirmButtonColor = "#16a34a";

export const showSuccess = (message: string) =>
  Swal.fire({
    icon: "success",
    title: "Berhasil",
    text: message,
    timer: 2000,
    showConfirmButton: false,
    confirmButtonColor,
  });

export const showError = (message: string) =>
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
    confirmButtonColor,
  });

export const showWarning = (message: string) =>
  Swal.fire({
    icon: "warning",
    title: "Perhatian",
    text: message,
    confirmButtonColor,
  });

export const showConfirm = (
  title: string,
  message: string,
): Promise<SweetAlertResult> =>
  Swal.fire({
    title,
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor: "#ef4444",
    confirmButtonText: "Ya",
    cancelButtonText: "Batal",
  });
