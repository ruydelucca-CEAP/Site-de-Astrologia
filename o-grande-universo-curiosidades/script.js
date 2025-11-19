document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------------
    // ** LÓGICA DA PÁGINA INICIAL: NASA APOD **
    // ------------------------------------------------------------------------
    
    // NOTA: Para uso em produção, substitua 'DEMO_KEY' pela sua chave de API pessoal da NASA.
    const APOD_API_KEY = 'dot5XkVQEMrNIAMawvRL0FMIhmAqJ8S83Iw3X7np'; 
    const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${APOD_API_KEY}`;
    const apodContainer = document.getElementById('apod-content');

    // ** FUNÇÃO DE TRADUÇÃO SIMPLES **
    // Esta função apenas prefixa o título para simular a tradução.
    function traduzirTitulo(tituloOriginal) {
        if (tituloOriginal) {
            // Se o título estiver em inglês simples, você pode adicionar uma tradução manual aqui:
            // Exemplo: if (tituloOriginal === 'Andromeda Galaxy') return 'Galáxia de Andrômeda';
            // Caso contrário, usamos a prefixação.
            return `${tituloOriginal}`;
        }
        return "Título Indisponível";
    }

    if (apodContainer) {
        fetch(APOD_URL)
            .then(response => response.json())
            .then(data => {
                let mediaHTML = '';
                
                // Trata Imagem ou Vídeo
                if (data.media_type === 'image') {
                    mediaHTML = `<img src="${data.url}" alt="${data.title}">`;
                } else if (data.media_type === 'video') {
                    // Incorpora o vídeo (YouTube)
                    mediaHTML = `<iframe width="100%" height="315" src="${data.url.replace('http:', 'https:')}" frameborder="0" allowfullscreen></iframe>`;
                }
                
                // Traduz o título
                const tituloTraduzido = traduzirTitulo(data.title);
                
                // Injeta o conteúdo no HTML
                apodContainer.innerHTML = `
                    ${mediaHTML}
                    <h4>${tituloTraduzido} (${data.date})</h4>
                    <p>
                        Explicação Original (Inglês): <br>${data.explanation}
                    </p>
                    
                    <p class="nota-traducao">
                    </p>

                    <p class="nota-traducao">
                        Nota: Informações Tiradas do Site https://apod.nasa.gov/apod/.
                    </p>
                `;
            })
            .catch(error => {
                console.error('Erro ao buscar dados da NASA APOD:', error);
                apodContainer.innerHTML = '<p>Falha ao carregar a Imagem do Dia. Por favor, tente novamente mais tarde.</p>';
            });
    }

    // ------------------------------------------------------------------------
    // ** DADOS E LÓGICA PARA PÁGINA DE PLANETAS **
    // ------------------------------------------------------------------------
    
    // Dados dos Planetas (Mantenha ou adicione aqui seus dados)
    const planetasData = {
        mercurio: { 
            nome: 'Mercúrio', 
            texto: 'Mercúrio é o menor planeta do Sistema Solar e o mais próximo do Sol. Sua superfície é coberta por crateras, e ele não possui luas.' 
        },
        venus: { 
            nome: 'Vênus', 
            texto: 'Vênus é o segundo planeta a partir do Sol e é conhecido por ser o planeta mais quente, devido a um intenso efeito estufa.' 
        },
        marte: { 
            nome: 'Marte', 
            texto: 'Marte, o Planeta Vermelho, é o foco da exploração em busca de vida fora da Terra. Possui a maior montanha conhecida, o Olympus Mons.' 
        },
        jupiter: { 
            nome: 'Júpiter', 
            texto: 'Júpiter é o maior planeta do Sistema Solar, famoso por sua Grande Mancha Vermelha, uma tempestade que dura séculos.' 
        },
        saturno: { 
            nome: 'Saturno', 
            texto: 'Saturno é famoso por seus extensos e impressionantes anéis, compostos principalmente de gelo e rochas.' 
        },
        urano: { 
            nome: 'Urano', 
            texto: 'Urano se destaca por orbitar o Sol de lado, com seu eixo de rotação quase paralelo ao plano orbital.' 
        },
        netuno: { 
            nome: 'Netuno', 
            texto: 'Netuno é o planeta mais distante do Sol e é um gigante gasoso conhecido por seus ventos supersônicos.' 
        },
        terra: { 
            nome: 'Terra', 
            texto: 'A Terra é o único planeta conhecido por abrigar vida. Cerca de 71% de sua superfície é coberta por água.' 
        }
    };

    // ------------------------------------------------------------------------
    // ** DADOS E LÓGICA PARA PÁGINA DE CONSTELAÇÕES **
    // ------------------------------------------------------------------------

    // Dados das Constelações (Mantenha ou adicione aqui seus dados)
    const constelacoesData = {
        ursamaior: {
            nome: 'Ursa Maior',
            texto: 'Uma das constelações mais conhecidas do hemisfério norte. Suas sete estrelas mais brilhantes formam o asterismo do "Big Dipper" ou "Carro". É frequentemente usada para encontrar o Polo Norte.',
            positions: [ [40, 50], [50, 40], [60, 55], [70, 70], [80, 80], [30, 60], [20, 75] ],
            lines: [ [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6] ]
        },
        cruzeirodosul: {
            nome: 'Cruzeiro do Sul',
            texto: 'A menor, mas mais famosa constelação do hemisfério sul. Suas estrelas formam uma cruz distinta, crucial para a navegação no hemisfério sul.',
            positions: [ [30, 30], [70, 30], [50, 60], [40, 90] ],
            lines: [ [0, 1], [0, 2], [1, 2], [2, 3] ]
        },
        orion: {
            nome: 'Órion',
            texto: 'Uma das constelações mais proeminentes e belas do céu, visível em quase todo o mundo. É o lar da Nebulosa de Órion e do supergigante vermelho Betelgeuse.',
            positions: [ [30, 20], [70, 20], [20, 50], [80, 50], [10, 80], [90, 80], [50, 60] ],
            lines: [ [0, 2], [1, 3], [2, 4], [3, 5], [2, 6], [3, 6] ]
        },
        virgem: {
            nome: 'Virgem',
            texto: 'Uma das constelações do zodíaco. É a segunda maior constelação e é a casa de Spica, uma das estrelas mais brilhantes do céu noturno.',
            positions: [ [30, 10], [50, 30], [70, 50], [40, 70], [60, 90] ],
            lines: [ [0, 1], [1, 2], [2, 3], [3, 4] ]
        },
        hidra: {
            nome: 'Hidra',
            texto: 'A maior constelação em área do céu noturno. Representa a Hidra de Lerna, uma criatura aquática da mitologia grega, e é visível principalmente no hemisfério sul.',
            positions: [ [10, 10], [20, 30], [30, 50], [40, 70], [50, 90], [70, 80], [90, 70] ],
            lines: [ [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6] ]
        },
        aries: {
            nome: 'Áries',
            texto: 'Uma constelação do zodíaco, representando o carneiro dourado da mitologia grega. É notável por incluir o Ponto Vernal, que marca o início da primavera no hemisfério norte.',
            positions: [ [30, 30], [70, 30], [50, 60] ],
            lines: [ [0, 1], [1, 2], [2, 0] ]
        },
        gemeos: {
            nome: 'Gêmeos',
            texto: 'Uma constelação do zodíaco, nomeada em homenagem aos irmãos gêmeos Castor e Pólux. Suas duas estrelas mais brilhantes, Castor e Pólux, são facilmente visíveis.',
            positions: [ [30, 10], [30, 50], [70, 10], [70, 50] ],
            lines: [ [0, 1], [2, 3], [0, 2] ]
        },
        escorpiao: {
            nome: 'Escorpião',
            texto: 'Uma constelação proeminente do zodíaco, que se parece com a forma de um escorpião. Contém a estrela supergigante vermelha Antares, seu coração.',
            positions: [ [50, 10], [30, 30], [70, 30], [30, 50], [70, 50], [40, 80], [60, 80] ],
            lines: [ [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6] ]
        },
        aquario: {
            nome: 'Aquário',
            texto: 'Uma constelação do zodíaco, simbolizando o portador de água. É uma das constelações mais antigas e está localizada em uma região do céu apelidada de "O Mar".',
            positions: [ [30, 20], [70, 20], [50, 50], [30, 70], [70, 70] ],
            lines: [ [0, 2], [1, 2], [2, 3], [2, 4] ]
        },
        andromeda: {
            nome: 'Andrômeda',
            texto: 'Conhecida por abrigar a Galáxia de Andrômeda (M31), a galáxia espiral mais próxima da Via Láctea. Na mitologia, ela representa a princesa Andrômeda.',
            positions: [ [20, 50], [50, 50], [70, 30], [90, 50] ],
            lines: [ [0, 1], [1, 2], [1, 3] ]
        },
        centauro: {
            nome: 'Centauro',
            texto: 'Uma grande constelação do hemisfério sul. Contém Alpha Centauri, o sistema estelar mais próximo do nosso, e Omega Centauri, o maior aglomerado globular conhecido.',
            positions: [ [20, 30], [50, 10], [80, 30], [50, 50], [30, 70], [70, 70] ],
            lines: [ [0, 1], [1, 2], [2, 3], [3, 4], [3, 5] ]
        },
        lyra: {
            nome: 'Lyra',
            texto: 'Uma pequena constelação, mas facilmente reconhecida por sua estrela brilhante, Vega, que é uma das estrelas do Triângulo de Verão. Representa a lira de Orfeu.',
            positions: [ [50, 10], [30, 40], [70, 40], [40, 70], [60, 70] ],
            lines: [ [0, 1], [0, 2], [1, 3], [2, 4] ]
        },
        // ... adicione mais constelações aqui
    };

    // ------------------------------------------------------------------------
    // ** CONFIGURAÇÃO DE LISTENERS GERAIS **
    // ------------------------------------------------------------------------

    const planetasButtons = document.querySelectorAll('.container-planetas .planeta-btn');
    const constelacoesButtons = document.querySelectorAll('.container-constelacoes .constelacao-btn');
    const infoPlanetaDiv = document.getElementById('info-planeta');
    const infoConstelacaoDiv = document.getElementById('info-constelacao');

    // Inicialização (se os elementos existirem)
    if (planetasButtons.length > 0) {
        applyEventListeners(planetasButtons, infoPlanetaDiv, planetasData, false);
    }
    if (constelacoesButtons.length > 0) {
        applyEventListeners(constelacoesButtons, infoConstelacaoDiv, constelacoesData, true);
    }

    // ------------------------------------------------------------------------
    // ** FUNÇÕES AUXILIARES (Modificada) **
    // ------------------------------------------------------------------------
    
    /**
     * Função para calcular a distância e o ângulo entre dois pontos (estrelas)
     */
    function getLineProperties(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy); // Distância (em pixels, mas funciona com %)
        const angle = Math.atan2(dy, dx) * (180 / Math.PI); // Ângulo em graus
        return { length, angle };
    }

    /**
     * Função genérica para aplicar listeners de clique
     * @param {NodeList} buttons - Os botões (planetas ou constelações)
     * @param {HTMLElement} infoDiv - A div de informação (info-planeta ou info-constelacao)
     * @param {Object} dataMap - O dicionário de dados (planetasData ou constelacoesData)
     * @param {boolean} isConstellation - Define se deve aplicar a lógica de animação de constelação
     */
    function applyEventListeners(buttons, infoDiv, dataMap, isConstellation) {
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const itemClicado = this.getAttribute('data-planeta') || this.getAttribute('data-constelacao');
                const data = dataMap[itemClicado];
                
                // NOVO: Obter os dados de visibilidade dos atributos do botão
                const visibilidade = this.getAttribute('data-visibilidade');
                const paises = this.getAttribute('data-paises');

                if (data) {
                    // 1. Remove a classe de animação para resetar
                    infoDiv.classList.remove('aparecer');

                    // Adiciona um pequeno atraso antes de atualizar e re-aplicar a animação
                    setTimeout(() => {
                        let content = `
                            <h3>${data.nome}</h3>
                            <div class="constelacao-detalhes">
                                <div class="texto-info">
                                    <p>${data.texto.replace(/\n/g, '<br>')}</p>
                        `;

                        // NOVO: Adiciona a informação de visibilidade e países
                        if (isConstellation && visibilidade && paises) {
                            content += `
                                    <h4>🌎 Visibilidade Geográfica</h4>
                                    <ul>
                                        <li><strong>Faixa de Latitude:</strong> ${visibilidade}</li>
                                        <li><strong>Melhores Países/Regiões:</strong> ${paises}</li>
                                    </ul>
                            `;
                        }
                        
                        content += `</div>`; // Fecha a div texto-info

                        if (isConstellation) {
                            // 2. Cria a área da animação para constelações
                            content += `
                                <div class="animacao-area">
                                    <div id="constellation-animation-container"></div>
                                </div>
                            </div> `; // Fecha constelacao-detalhes
                        } else {
                            content += `</div>`; // Fecha a div se for planeta
                        }
                        
                        // 3. Atualiza o conteúdo da div
                        infoDiv.innerHTML = content;
                        
                        // 4. Se for constelação, dispara a função de animação
                        if (isConstellation) {
                            drawConstellation(itemClicado, data.positions, data.lines);
                        }
                        
                        // 5. Adiciona a classe para fazer o texto aparecer suavemente
                        infoDiv.classList.add('aparecer');
                        
                    }, 10);
                }
            });

            // 6. Adiciona a animação de clique (diferente para constelação vs. planeta)
            button.addEventListener('mousedown', function() {
                this.style.transform = isConstellation ? 'scale(0.98)' : 'scale(0.95)';
            });

            button.addEventListener('mouseup', function() {
                // Manter a transformação visual original dos botões de Planeta com Imagem (escala)
                this.style.transform = isConstellation ? 'scale(1.05)' : 'scale(1.05)'; 
                
                // Animação visual da imagem ao clicar (apenas para planetas)
                if (!isConstellation) {
                    const img = this.querySelector('img');
                    if (img) {
                        img.style.transform = 'scale(0.9) rotate(5deg)';
                        setTimeout(() => {
                            img.style.transform = 'scale(1) rotate(0deg)';
                        }, 150);
                    }
                }
            });

            button.addEventListener('mouseleave', function() {
                this.style.transform = ''; 
                if (!isConstellation) {
                    const img = this.querySelector('img');
                    if (img) img.style.transform = '';
                }
            });
        });
    }

    /**
     * Função que desenha a constelação e a animação de laser
     */
    function drawConstellation(id, positions, lines) {
        const container = document.getElementById('constellation-animation-container');
        if (!container) return;
        container.innerHTML = ''; // Limpa o container
        const stars = [];

        // 1. Cria as estrelas (pontos)
        positions.forEach((pos, index) => {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${pos[0]}%`;
            star.style.top = `${pos[1]}%`;
            star.style.transform = 'translate(-50%, -50%)'; 
            star.style.animationDelay = `${index * 0.1}s`;
            container.appendChild(star);
            stars.push(star);
        });

        // 2. Cria as linhas (o "laser")
        lines.forEach((lineIndices, lineIndex) => {
            const startStarIndex = lineIndices[0];
            const endStarIndex = lineIndices[1];

            const startPos = positions[startStarIndex];
            const endPos = positions[endStarIndex];

            // 3. Obtém as propriedades de geometria
            const { length, angle } = getLineProperties(startPos[0], startPos[1], endPos[0], endPos[1]);
            
            const line = document.createElement('div');
            line.className = 'constelacao-linha';

            // 4. Posiciona e Rotaciona a linha
            line.style.left = `${startPos[0]}%`;
            line.style.top = `${startPos[1]}%`;
            line.style.width = `${length}%`;
            line.style.transform = `rotate(${angle}deg)`;
            
            // 5. Define o atraso da animação (espera as estrelas aparecerem)
            const starDelay = Math.max(startStarIndex, endStarIndex) * 0.1;
            line.style.animationDelay = `${starDelay + (lineIndex * 0.3)}s`;
            
            container.appendChild(line);
        });
    }
});