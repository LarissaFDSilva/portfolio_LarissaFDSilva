🏁 A Corrida do Prompt

📝 Descrição do Projeto

Este projeto consiste em um experimento prático de Engenharia de Prompt Iterativo, explorando como o refinamento progressivo de um prompt impacta a qualidade, precisão e profundidade da resposta gerada por modelos de linguagem (LLMs).
Desenvolvido como parte da disciplina de Engenharia de Prompt e Aplicações em IA, o experimento parte de dois cenários criativos — a geração de uma imagem artística e a redação de uma carta formal — e demonstra como cada camada de contexto e detalhe adicionada ao prompt transforma radicalmente o resultado final.
Os dois desafios trabalhados foram:

🎨 Imagem: "Uma imagem de um astronauta estilo barroco tocando violoncelo em Marte"

✉️ Texto: "Um e-mail formal de desculpas de um pirata para um rei"

🚀 Tecnologias e Ferramentas Utilizadas

Modelos de IA: Qwen 3.5-Plus (geração de imagem), LLM de texto (geração das cartas)

Técnica Central: Prompt Engineering Iterativo

Formato de Saída: Imagens JPG 4K + Cartas formais em português

📊 Resultados e Aprendizados

O experimento demonstrou de forma clara como cada iteração de prompt produz resultados progressivamente mais ricos e precisos.

🎨 Evolução do Prompt de Imagem

Versão - Acréscimo ao Promp - tImpacto no Resultado

Prompt 1 - Base: astronauta barroco tocando violoncelo em Marte - Cenário realista 4K; astronauta com ornamentos barrocos, violoncelo padrão

Prompt 2 - + "hiperrealista" + violoncelo no estilo barroco - Instrumento também ornamentado; composição mais dramática e coesa artisticamente

Prompt 3 - + Iluminação cinematográfica: luz dourada ao pôr do sol marciano, sombras longas dramáticas - A paleta de cores muda radicalmente: tons alaranjados e dourados contrastam com o azul escuro do espaço ao fundo, criando profundidade e tensão visual

Prompt 4 - + Perspectiva e enquadramento: plano médio frontal, câmera levemente abaixo do sujeito (ângulo contra-plongée), desfoque de fundo (bokeh) nas rochas marcianas - O astronauta ganha imponência e presença; o fundo desfocado isola o personagem e direciona o olhar do espectador para os detalhes do traje e do instrumento

Prompt 5 - + Detalhes narrativos de ambiente: poeira marciana suspensa no ar, partículas de luz refletindo nas gemas do traje barroco, duas luas visíveis no céu crepuscular - A cena passa de uma ilustração estática para um momento narrativo: o ambiente interage com o personagem, conferindo vida, escala e profundidade épica à composição

Cada iteração atua sobre uma dimensão visual diferente: Prompt 3 define a paleta e a emoção da luz; Prompt 4 controla a relação câmera-sujeito e a hierarquia visual; Prompt 5 adiciona elementos ambientais que transformam a cena em uma narrativa. Juntos, demonstram que uma imagem de qualidade cinematográfica resulta do controle explícito de iluminação, enquadramento e contexto ambiental — não apenas do tema central.

✉️ Evolução do Prompt de Texto (E-mail do Pirata)

O prompt de texto foi iterado 5 vezes, revelando como contexto e restrições narrativas enriquecem progressivamente a resposta:

Versão - Acréscimo - Personagem - Característica marcante
Prompt 1 - Instrução base - Capitão Elias Vance - Tom genérico, ofertas de restituição e serviço

Prompt 2 - + Pirata vive num navio + rei da Inglaterra - Capitão Thomas Crowe - Datação histórica (1720), mais atmosfera náutica

Prompt 3 - Atacou navio do rei + salvar a própria vida - Capitão Julian Blackwood- Tom urgente, proposta de delação de outros piratas

Prompt 4 - + Rei decidido a executar + carta comovente - Capitão Samuel Vane - Pirata oferece a própria vida pela tripulação

Prompt 5 - + Prazo de 48 horas - Capitão Edward Thatch - Justificativa moral profunda: o ouro foi enviado para alimentar viúvas e órfãos

Principais aprendizados:

Quanto mais contexto e restrições narrativas, mais rica e convincente é a resposta gerada.
Adicionar stakes claros (risco de vida, prazo de 48h) gera textos dramaticamente mais envolventes e literários.
A especificidade no prompt de imagem afeta todos os elementos visuais — não apenas o que foi explicitamente mencionado.
Prompts vagos geram distorções e resultados imprecisos. Prompts detalhados entregam exatamente o que foi solicitado — princípio central da mitigação de viés por seleção restrita de dados.


🔧 Como Reproduzir o Experimento

Escolha um dos dois desafios: geração de imagem ou redação de carta.
Comece com o Prompt 1 (versão mais simples) em qualquer LLM de sua escolha.
A cada rodada, adicione uma nova camada de contexto conforme a sequência:

Prompt 1: Instrução básica

Prompt 2: + Local / contexto físico específico

Prompt 3: + Motivação do personagem

Prompt 4: + Tensão / consequência dramática

Prompt 5: + Prazo ou urgência concreta

Compare os resultados de cada versão e avalie as diferenças em qualidade, tom e precisão.


💡 Reflexão Crítica — Viés e Human-in-the-Loop

Este experimento conecta-se diretamente ao conceito de viés por seleção restrita de dados:

Mecanismo do Viés: Quando não fornecemos detalhes suficientes, o modelo preenche as lacunas com suposições genéricas, distorcendo o resultado esperado.

Consequência Social: Frustração com outputs imprecisos, retrabalho e perda de confiança no processo por parte do usuário.

Mitigação (Human-in-the-Loop): A intervenção humana iterativa — revisando e enriquecendo o prompt a cada ciclo — garante que o modelo reproduza com fidelidade o que foi solicitado, funcionando como controle de qualidade em cada etapa da geração.


Autores: Gabriel Pedro Moreira · Larissa Ferreira da Silva

[Voltar ao início](https://github.com/LarissaFDSilva/portfolio_LarissaFDSilva)
