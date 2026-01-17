import Swal from "sweetalert2";

/* SUCCESS */
export const alertSuccess = (title = "Success", text = "") => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonColor: "#4f46e5",
  });
};

/* ERROR */
export const alertError = (title = "Error", text = "Something went wrong") => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonColor: "#ef4444",
  });
};

/* CONFIRM (DELETE) */
export const alertConfirm = (text = "Are you sure?") => {
  return Swal.fire({
    icon: "warning",
    title: "Confirm",
    text,
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#64748b",
    confirmButtonText: "Yes, delete it",
  });
};