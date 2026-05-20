document.addEventListener("DOMContentLoaded", () => {
    // === 1. CONTROLADOR DOS SLIDES DE STORYTELLING ===
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sectionSobre = document.getElementById('sobre-mim');
    
    let currentSlide = 0;

    const gradients = [
        'linear-gradient(135deg, #0b071a 0%, #170f2c 40%, #2a1142 80%, #1a0933 100%)', 
        'linear-gradient(135deg, #1f0515 0%, #360722 45%, #12021c 85%, #05000d 100%)', 
        'linear-gradient(135deg, #05141c 0%, #0c2336 50%, #180924 90%, #03010a 100%)', 
        'linear-gradient(135deg, #04140b 0%, #092616 40%, #150826 85%, #020703 100%)'  
    ];

    function updateStoryDeck(index) {
        if (!slides.length) return;
        slides.forEach((slide, i) => {
            if(i === index) {
                slide.classList.add('active');
                if(dots[i]) dots[i].classList.add('active');
            } else {
                slide.classList.remove('active');
                if(dots[i]) dots[i].classList.remove('active');
            }
        });

        if (sectionSobre) {
            sectionSobre.style.background = gradients[index];
        }
        
        if(prevBtn && nextBtn) {
            prevBtn.disabled = index === 0;
            
            // Troca dinamicamente o caractere textual da seta direita
            if (index === slides.length - 1) {
                nextBtn.innerHTML = "&#x21BB;"; // Código universal estável para o símbolo de recarregar (↻)
                nextBtn.classList.add('reload-active');
            } else {
                nextBtn.innerHTML = "&gt;"; // Caractere simples de maior que (>)
                nextBtn.classList.remove('reload-active');
            }
        }
    }

    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
            updateStoryDeck(currentSlide);
        });
    }

    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            if(currentSlide > 0) {
                currentSlide--;
                updateStoryDeck(currentSlide);
            }
        });
    }

    // === 2. SIMULAÇÃO DO TERMINAL DE PROJETOS (CORRIGIDO) ===
    const codeOutput = document.getElementById('code-output');
    const statusText = document.getElementById('status-text');

    // Texto simulando comandos de infraestrutura e desenvolvimento
    const terminalLines = [
        "CRITICAL_ALERT: UNAUTHORIZED INTRUSION DETECTED",
        "SYSTEM_COMPROMISED // BYPASSING FIREWALL ACCESSED...",
        "",
        "jose@nttdata-ops:~$ whoami",
        "Role: IT Infrastructure Analyst [NTT DATA]",
        "Assignment: NSOC (Network Security Operations Center)",
        "Target: Critical Operational Technology (OT) Infrastructure",
        "Location: Hydroelectric Power Plant Sector",
        "",
        "jose@nttdata-ops:~$ netstat -an | grep 502",
        "tcp    0   0 10.240.12.45:502      10.240.12.100:ESTABLISHED // SCADA/Modbus link",
        "tcp    0   0 10.240.12.46:502      10.240.12.101:ESTABLISHED // PLC Controller",
        "",
        "jose@nttdata-ops:~$ dump_active_sessions --secure",
        "[+] Extracting telemetry data logs...",
        "[+] Intercepting Cisco IOS Core Switches configurations...",
        "[+] Mapping active BGP routing protocols...",
        "[+] Industrial Control Systems (ICS) perimeter exposed.",
        "",
        "ALERT: NETWORK ISOLATION TRIGGERED BY NSOC",
        "Dumping log trace to terminal... System breach permanent.",
        ""
    ];

    let lineIndex = 0;
    let charIndex = 0;

    function typeTerminal() {
        if (!codeOutput) return;

        // Se terminou todas as linhas, aguarda 4 segundos e reinicia o terminal
        if (lineIndex >= terminalLines.length) {
            if (statusText) statusText.innerText = "Sistema estável. Aguardando próxima rotina...";
            setTimeout(() => {
                codeOutput.innerText = "";
                lineIndex = 0;
                charIndex = 0;
                if (statusText) statusText.innerText = "Executando varreduras de rotina...";
                typeTerminal();
            }, 4000);
            return;
        }

        let currentLineText = terminalLines[lineIndex];

        // Se for uma linha vazia, pula direto
        if (currentLineText === "") {
            codeOutput.innerText += "\n";
            lineIndex++;
            charIndex = 0;
            setTimeout(typeTerminal, 200);
            return;
        }

        // Digita caractere por caractere
        codeOutput.innerText += currentLineText[charIndex];
        charIndex++;

        // Verifica se a linha atual terminou
        if (charIndex < currentLineText.length) {
            // Velocidade da digitação (mais rápido para dar sensação de automação)
            setTimeout(typeTerminal, 15); 
        } else {
            // Quebra a linha e vai para a próxima
            codeOutput.innerText += "\n";
            lineIndex++;
            charIndex = 0;
            
            // Rola o terminal automaticamente para baixo à medida que digita
            const preContainer = codeOutput.parentElement;
            if (preContainer) {
                preContainer.scrollTop = preContainer.scrollHeight;
            }

            // Pausa um pouco maior entre linhas de comandos diferentes
            let delay = currentLineText.startsWith("jose@") ? 600 : 150;
            setTimeout(typeTerminal, delay);
        }
    }

    // Inicializa o efeito se o elemento existir na página
    if (codeOutput) {
        codeOutput.innerText = ""; // Garante que comece vazio
        if (statusText) statusText.innerText = "Executando varreduras de rotina...";
        setTimeout(typeTerminal, 1000);
    }
});