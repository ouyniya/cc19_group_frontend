import Swal from "sweetalert2";

export const createAlert = (icon, text) => {
    //sweet alert

    Swal.fire({
              icon: icon || "info", 
              text: text || "Something wrong",
              timer: 3000,
            })
};

