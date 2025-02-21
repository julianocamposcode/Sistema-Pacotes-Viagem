window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('erro')) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });
        Toast.fire({ icon: "error", title: "Usuário ou senha incorretos!" });
    }
    if (urlParams.has('sucesso')) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });
        Toast.fire({ icon: "success", title: "Sucesso ao entrar!" });
        setTimeout(() => {
            window.location.href = '/detalhe.html';
        }, 2000);
    }
};