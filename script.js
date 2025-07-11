document.addEventListener('DOMContentLoaded', () => {
  const codeOutput = document.getElementById('code-output');
  const statusContainer = document.querySelector('.compilation-status');
  const statusText = document.getElementById('status-text');
  const projetosSection = document.getElementById('projetos');

  // Adiciona a classe 'typing-cursor' inicialmente para exibir o cursor
  codeOutput.classList.add('typing-cursor');

  // As linhas de código foram atualizadas para incluir classes de estilo para sintaxe destacada
  const lines = [
    '<span class="comment">// Iniciando processo de compilação do portfólio...</span>',
    '<span class="keyword">function</span> <span class="function-name">compilePortfolio</span>() {',
    '  <span class="keyword">console</span>.<span class="function-name">log</span>(<span class="string">"Buscando módulos e dependências..."</span>);',
    '  <span class="comment">// Módulos: HTML, CSS, JavaScript, React, Node.js</span>',
    '  <span class="comment">// Dependências: Font Awesome, Placeholders</span>',
    '  <span class="keyword">return</span> <span class="string">"Portfólio em fase de compilação. Acesso total em breve!"</span>;',
    '}',
    '', // Empty line for spacing
    '<span class="function-name">compilePortfolio</span>();'
  ];
  let lineIndex = 0;
  let charIndex = 0;
  const typingSpeed = 50; // ms por caractere
  const lineDelay = 800; // ms entre linhas
  let animationStarted = false; // Flag para controlar se a animação já começou
  let completedLinesHtml = []; // Array para armazenar o HTML completo das linhas já digitadas

  function typeLine() {
    if (lineIndex < lines.length) {
      const currentLineFullHtml = lines[lineIndex];
      // Pega a parte da linha atual que foi digitada até agora
      const currentLineTypedPart = currentLineFullHtml.substring(0, charIndex + 1);

      // Constrói a saída HTML completa: todas as linhas completadas + linha atual parcialmente digitada
      // Isso garante que as linhas anteriores permaneçam visíveis e estilizadas
      codeOutput.innerHTML = completedLinesHtml.join('\n') + (completedLinesHtml.length > 0 ? '\n' : '') + currentLineTypedPart;

      charIndex++;

      // Verifica se a linha atual terminou de ser digitada
      if (charIndex > currentLineFullHtml.length) {
        completedLinesHtml.push(currentLineFullHtml); // Adiciona o HTML completo da linha atual às completadas
        lineIndex++;
        charIndex = 0;
        // Após uma linha ser totalmente digitada, adiciona uma quebra de linha e pausa antes de iniciar a próxima
        codeOutput.innerHTML = completedLinesHtml.join('\n') + '\n';
        setTimeout(typeLine, lineDelay);
      } else {
        // Continua digitando a linha atual
        setTimeout(typeLine, typingSpeed);
      }
    } else {
      // Todas as linhas digitadas
      codeOutput.innerHTML = completedLinesHtml.join('\n'); // Garante que o conteúdo final esteja correto
      codeOutput.classList.remove('typing-cursor'); // Remove o cursor piscante
      statusText.textContent = "Portfólio em fase de compilação. Acesso total em breve!";
      statusContainer.classList.add('visible');
    }
  }

  // Observer para iniciar a animação quando a seção "Projetos" estiver visível
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animationStarted) {
        typeLine(); // Inicia a animação de digitação
        animationStarted = true; // Define a flag para true para não reiniciar
        observer.unobserve(projetosSection); // Para de observar após iniciar
      }
    });
  }, {
    threshold: 0.5 // A animação dispara quando 50% da seção está visível
  });

  if (projetosSection) {
    observer.observe(projetosSection);
  }
});
