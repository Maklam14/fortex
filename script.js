const vitrine = document.querySelector(".vitrine-servicos");

if (vitrine && "IntersectionObserver" in window) {
  vitrine.classList.add("animar");

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");

          // Executa a animação apenas uma vez
          observador.unobserve(entrada.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  observador.observe(vitrine);
}

const lightbox = document.querySelector("#gallery-lightbox");
const imagemAmpliada = document.querySelector(
  "#gallery-lightbox-image"
);

if (lightbox && imagemAmpliada) {
  const botaoFechar = lightbox.querySelector(".gallery-close");

  document.querySelectorAll(".gallery-item").forEach((botao) => {
    botao.addEventListener("click", () => {
      const imagem = botao.querySelector("img");

      // Não abre imagens que ainda não carregaram ou estão quebradas
      if (!imagem || !imagem.complete || imagem.naturalWidth === 0) {
        return;
      }

      imagemAmpliada.src = imagem.currentSrc || imagem.src;
      imagemAmpliada.alt = imagem.alt;

      lightbox.showModal();
      document.body.classList.add("gallery-aberta");
    });
  });

  botaoFechar.addEventListener("click", () => {
    lightbox.close();
  });

  // Fecha ao clicar na área escura ao redor da foto
  lightbox.addEventListener("click", (evento) => {
    if (evento.target === lightbox) {
      lightbox.close();
    }
  });

  // Também executa quando a pessoa fecha usando Esc
  lightbox.addEventListener("close", () => {
    document.body.classList.remove("gallery-aberta");
    imagemAmpliada.removeAttribute("src");
  });
}