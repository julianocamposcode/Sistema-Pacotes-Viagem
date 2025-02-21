// Buscar e exibir os dados do JSON
const selector = (element) => {
  return document.querySelector(element)
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("./assets/dados.json")
    .then((response) => response.json())
    .then((data) => {



      let id = localStorage.getItem("id")

      const quantidade = document.getElementById('quantidade');
      document.getElementById('incrementar').addEventListener('click', function () {
        if (data[id].lugaresDisponiveis != 0) {
          selector('.lugares').innerHTML = data[id].lugaresDisponiveis -= 1
          quantidade.value = parseInt(quantidade.value) + 1;
          selector('.calc').innerHTML = parseFloat(data[id].calc * quantidade.value).toFixed(3)
        } else {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-center",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({ icon: "info", title: "Você selecionou todos os lugares disponíveis!" });
        }
      });

      document.getElementById('decrementar').addEventListener('click', function () {
        if (parseInt(quantidade.value) > 0) {
          selector('.lugares').innerHTML = data[id].lugaresDisponiveis += 1
          quantidade.value = parseInt(quantidade.value) - 1;
          selector('.calc').innerHTML = parseFloat(data[id].calc * quantidade.value).toFixed(3)
        }
      });

      const mediaQuery = window.matchMedia("(max-width: 768px)");

      function handleScreenSize(e) {
        if (e.matches) {
          if (data[id].nome == 'Pacote para Dubai, Emirados Árabes') {
            data[id].nome = 'Pacote para Dubai, E. Árabes'
          }
        }
      }

      mediaQuery.addEventListener("change", handleScreenSize);
      handleScreenSize(mediaQuery);


      selector('.nome_pacote').innerHTML = data[id].nome
      selector('.img_viagem_detalhe').src = data[id].src
      selector('.dataPartida').innerHTML = data[id].dataPartida
      selector('.duracao').innerHTML = data[id].duracao
      selector('.partida').innerHTML = data[id].localPartida
      selector('.lugares').innerHTML = data[id].lugaresDisponiveis
      selector('.preco').innerHTML = parseFloat(data[id].preco).toFixed(3)


      selector('.transp').innerHTML = data[id].transp
      selector('.hosp').innerHTML = data[id].hosp
      selector('.aliment').innerHTML = data[id].aliment
      selector('.passeios').innerHTML = data[id].passeios
      selector('.pagament').innerHTML = data[id].pagament
      selector('.descricao_content').innerHTML = data[id].descricao
      selector('.frame').src = data[id].frame


      // botão comprar

    })
    .catch((error) => console.error("Erro ao carregar JSON:", error));
});

let buy = selector('.comprar')
let loader = selector('.loader')

buy.onclick = () => {
  loader.style.display = 'flex';
  buy.childNodes[1].textContent = ''
  setTimeout(() => {
    loader.style.display = 'none';
    buy.childNodes[1].textContent = 'Comprar'
    if (quantidade.value == 0) {
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
      Toast.fire({ icon: "error", title: "Nenhum lugar reservado!" });
    } else {
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
      Toast.fire({ icon: "success", title: `${quantidade.value} Lugares reservados com sucesso!` });
    }
  }, 1000);
}