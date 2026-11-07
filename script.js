// ===== Scroll suave entre as seções =====
const linksInternos = document.querySelectorAll('a[href^="#"]');
const prefereMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

linksInternos.forEach(function (link) {
  link.addEventListener('click', function (evento) {
    const idDestino = link.getAttribute('href');
    const destino = document.querySelector(idDestino);

    if (!destino) {
      return;
    }

    evento.preventDefault();

    destino.scrollIntoView({
      behavior: prefereMenosMovimento ? 'auto' : 'smooth',
      block: 'start'
    });

    // Leva o foco para a seção, ajuda quem usa teclado e leitor de tela
    destino.setAttribute('tabindex', '-1');
    destino.focus({ preventScroll: true });
  });
});


// ===== Acordeão dos cartões de cuidado =====
const botoesAcordeao = document.querySelectorAll('.botao-acordeao');

botoesAcordeao.forEach(function (botao) {
  botao.addEventListener('click', function () {
    const estaAberto = botao.getAttribute('aria-expanded') === 'true';
    const painel = document.getElementById(botao.getAttribute('aria-controls'));
    const icone = botao.querySelector('.icone');

    if (estaAberto) {
      botao.setAttribute('aria-expanded', 'false');
      painel.hidden = true;
      icone.textContent = '+';
    } else {
      botao.setAttribute('aria-expanded', 'true');
      painel.hidden = false;
      icone.textContent = '−';
    }
  });
});


// ===== Lista interativa do passo a passo =====
const marcadores = document.querySelectorAll('.passo-marcador');
const textoProgresso = document.getElementById('texto-progresso');
const barraPreenchida = document.getElementById('barra-preenchida');

function atualizarProgresso() {
  let concluidos = 0;

  marcadores.forEach(function (marcador) {
    if (marcador.checked) {
      concluidos++;
    }
  });

  const total = marcadores.length;
  const porcentagem = (concluidos / total) * 100;

  barraPreenchida.style.width = porcentagem + '%';

  if (concluidos === total) {
    textoProgresso.textContent = 'Parabéns! Você concluiu os ' + total + ' passos.';
  } else {
    textoProgresso.textContent = concluidos + ' de ' + total + ' passos concluídos';
  }
}

marcadores.forEach(function (marcador) {
  marcador.addEventListener('change', atualizarProgresso);
});


// ===== Aviso ao abrir links externos =====
const linksExternos = document.querySelectorAll('a[target="_blank"]');
const avisoLink = document.getElementById('aviso-link');

linksExternos.forEach(function (link) {
  link.addEventListener('click', function () {
    const nomeDoLink = link.textContent.trim();
    avisoLink.textContent = 'Abrindo "' + nomeDoLink + '" em uma nova aba.';

    // Limpa a mensagem depois de alguns segundos
    setTimeout(function () {
      avisoLink.textContent = '';
    }, 5000);
  });
});