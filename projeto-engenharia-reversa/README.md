🔬 Engenharia Reversa Assistida por IA — Editor de Formas SVG

📝 Descrição do Projeto

Este projeto consiste na reconstrução funcional de um aplicativo web a partir da observação de sua interface externa, sem acesso ao código-fonte original. O objetivo principal é praticar a tradução de comportamentos visuais e regras de negócio em instruções precisas para um modelo de IA, exercitando a capacidade de descrever lógica de forma estruturada em vez de escrevê-la sintaticamente.
Desenvolvido como parte da disciplina de Engenharia de Prompt e Aplicações em IA, o projeto utiliza o Gemini no Google AI Studio como motor de geração, com System Instructions configuradas para que o modelo atue como desenvolvedor Full-Stack. A interface de referência escolhida foi o Blobmaker — um editor visual de formas orgânicas em SVG — e o resultado é uma reconstrução funcional gerada inteiramente por IA a partir de descrições lógicas e funcionais.

Interface de referência: Blobmaker

Interface reconstruída: Remix: Blobby — Google AI Studio

🚀 Tecnologias Utilizadas

Modelo de IA: Gemini (Google AI Studio)

Linguagens geradas: HTML, CSS e JavaScript (estrutura Full-Stack de página única)

Ambiente de configuração: Google AI Studio — System Instructions

Interface de referência: Blobmaker App (editor SVG No-Code)

Metodologia: Engenharia Reversa visual + Prompt Engineering descritivo


⚙️ Como o Projeto Foi Construído

O processo seguiu três etapas sequenciais:

1. Análise
Acesso ao webapp de referência (Blobmaker), exploração de todas as funcionalidades e mapeamento completo dos componentes visuais e regras de lógica de negócio presentes na interface — sem visualizar o código-fonte original e sem fornecer o link diretamente ao modelo.

2. Configuração
No Google AI Studio, definição das System Instructions do Gemini especificando que ele deveria atuar como desenvolvedor Full-Stack. As instruções descreveram a estrutura de arquivos esperada (HTML, CSS, JS) e o comportamento de cada interação do usuário mapeada na etapa anterior.

3. Construção e Validação
Geração do aplicativo completo dentro do AI Studio, execução no ambiente de teste, comparação funcional e estética com a referência original e ajuste iterativo das instruções até que o software final apresentasse comportamento equivalente.

📊 Resultados e Aprendizados

O projeto evidenciou uma reconfiguração fundamental do papel do desenvolvedor assistido por IA.

Do código para a lógica: Realizar engenharia reversa sem visualizar o código-fonte desloca o esforço da escrita sintática para a descrição lógica e funcional — a qualidade do resultado depende diretamente da capacidade de estruturar o problema antes de prompt.
Revisor crítico como competência-chave: Evitar a confiança cega nos outputs gerados pelo modelo é indispensável. O profissional que apenas aceita o código da IA sem validar conformidade técnica e escalabilidade torna-se vulnerável à obsolescência.
Engenharia de Prompts como nova sintaxe: Assim como dominar uma linguagem de programação era o requisito básico do desenvolvedor tradicional, dominar a decomposição de requisitos em instruções claras e testáveis é a nova competência central do engenheiro assistido por IA.
Fronteira ética: A engenharia reversa assistida por IA é legítima enquanto serve como base inicial para aprendizado ou prototipagem com melhorias propostas. Torna-se plágio digital quando replica a interface sem nenhuma originalidade, adaptação de contexto ou inovação funcional.

🔧 Como Reproduzir o Experimento

Acesse uma interface web de referência de sua escolha e explore todas as funcionalidades sem visualizar o código-fonte.
No Google AI Studio, abra um novo projeto e configure as System Instructions descrevendo:

O papel do modelo (ex: desenvolvedor Full-Stack)

A estrutura de arquivos esperada (HTML + CSS + JS em arquivo único ou separado)

O comportamento de cada componente e interação mapeados na etapa anterior

Gere o aplicativo e execute-o no ambiente de preview do AI Studio.

Compare o resultado com a referência original e refine as instruções iterativamente até atingir equivalência funcional e estética.

💡 Reflexão Crítica — Ética e Futuro da Profissão

Competências indispensáveis para o engenheiro de software na era da IA:

Revisão analítica crítica: Nunca aceitar o output do modelo como verdade absoluta — validar conformidade técnica, segurança e escalabilidade é responsabilidade humana insubstituível.
Engenharia de Prompts estruturada: Decompor requisitos complexos em blocos lógicos claros e testáveis, transformando a descrição do problema na principal entrega intelectual do profissional.

Diretriz ética proposta: Desenvolvedores e empresas devem adotar a obrigatoriedade de diferenciação em qualquer processo de engenharia reversa assistida por IA — seja via melhorias de UX, performance, acessibilidade ou inovação funcional — respeitando o esforço intelectual do criador original enquanto promove o progresso técnico de forma ética.

Autora: Larissa Ferreira da Silva

Voltar ao início
