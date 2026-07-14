import Swal from "sweetalert2";

export const showError = (message: string) =>
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
    confirmButtonColor: "#16a34a",
  });

export const showSuccess = (message: string) =>
  Swal.fire({
    icon: "success",
    title: "Berhasil",
    text: message,
    timer: 2000,
    confirmButtonColor: "#16a34a",
    showConfirmButton: false,
  });

export const showWarning = (message: string) =>
  Swal.fire({
    icon: "warning",
    title: "Perhatian",
    text: message,
    confirmButtonColor: "#16a34a",
  });