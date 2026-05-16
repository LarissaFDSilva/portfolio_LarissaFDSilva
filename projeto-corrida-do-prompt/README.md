🏁 A Corrida do Prompt

📝 Descrição do Projeto

Este projeto consiste em um experimento prático de Engenharia de Prompt Iterativo, explorando como o refinamento progressivo de um prompt impacta a qualidade, precisão e profundidade da resposta gerada por modelos de linguagem (LLMs).
Desenvolvido como parte da disciplina de Engenharia de Prompt e Aplicações em IA, o experimento parte de dois cenários criativos — a geração de uma imagem artística e a redação de uma carta formal — e demonstra como cada camada de contexto e detalhe adicionada ao prompt transforma radicalmente o resultado final.
Os dois desafios trabalhados foram:

🎨 Imagem: "Uma imagem de um astronauta estilo barroco tocando violoncelo em Marte"

✉️ Texto: "Um e-mail formal de desculpas de um pirata para um rei"

🚀 Tecnologias e Ferramentas Utilizadas

Modelos de IA: Qwen 3.5-Plus / Qwen 3.6-Plus (geração de imagem), LLM de texto (geração das cartas)

Técnica Central: Prompt Engineering Iterativo

Formato de Saída: Imagens JPG 4K + Cartas formais em português

📊 Resultados e Aprendizados

O experimento demonstrou de forma clara como cada iteração de prompt produz resultados progressivamente mais ricos e precisos.

🎨 Evolução do Prompt de Imagem

Versão - Acréscimo ao Promp - tImpacto no Resultado

🎨 Evolução do Prompt de Imagem (Qwen Plus)

| Versão | Foco do Acréscimo / Alteração | Impacto no Resultado Realizado |
| :--- | :--- | :--- |
| **Prompt 1** | Base: Cenário realista 4K, astronauta em Marte com traje barroco tocando violoncelo. | Geração inicial com composição limpa, mas elementos do traje simplificados. |
| **Prompt 2** | Mudança para "hiperrealista" e especificação de violoncelo também em estilo barroco. | O instrumento ganha detalhes dourados e ornamentos coesos com o traje. |
| **Prompt 3** | Ângulo cinematográfico, iluminação baixa, poeira suspensa e paleta em tons de ferrugem/dourado. | Atmosfera mais densa, imagem texturizada com poeira e reflexos dourados evidentes na armadura barroca. |
| **Prompt 4** | Estética cinematográfica com forte contraste de luz/sombra e detalhes simulando veludo no traje. | Iluminação dramática (chiaroscuro), realçando os relevos dourados contra as partes escuras do traje. |
| **Prompt 5** | Enquadramento técnico: plano médio frontal e fundo desfocado suavemente (bokeh) nas rochas. | Isolamento perfeito do astronauta, direcionando estritamente a atenção do espectador para os detalhes da armadura e do violoncelo. |

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

Comece com o Prompt 1 (versão mais simples) e, a cada rodada, adicione uma nova camada de contexto conforme a natureza do desafio:

Para o Texto (E-mail):
- Prompt 1: Instrução básica
- Prompt 2: + Contexto geográfico/histórico específico
- Prompt 3: + Motivação/Ação do personagem
- Prompt 4: + Tensão / Consequência dramática
- Prompt 5: + Prazo ou urgência concreta

Para a Imagem (Astronauta):
- Prompt 1: Instrução básica (Tema central)
- Prompt 2: + Refinamento de estilo (Hiperrealismo e sub-elementos)
- Prompt 3: + Atmosfera e Iluminação (Cores, poeira, tom)
- Prompt 4: + Contraste e Texturas (Luz/sombra e materiais)
- Prompt 5: + Enquadramento técnico (Planos de câmera e profundidade de campo)

💡 Reflexão Crítica — Viés e Human-in-the-Loop

Este experimento conecta-se diretamente ao conceito de viés por seleção restrita de dados:

Mecanismo do Viés: Quando não fornecemos detalhes suficientes, o modelo preenche as lacunas com suposições genéricas, distorcendo o resultado esperado.

Consequência Social: Frustração com outputs imprecisos, retrabalho e perda de confiança no processo por parte do usuário.

Mitigação (Human-in-the-Loop): A intervenção humana iterativa — revisando e enriquecendo o prompt a cada ciclo — garante que o modelo reproduza com fidelidade o que foi solicitado, funcionando como controle de qualidade em cada etapa da geração.


Autores: Gabriel Pedro Moreira · Larissa Ferreira da Silva

[Voltar ao início](https://github.com/LarissaFDSilva/portfolio_LarissaFDSilva)
