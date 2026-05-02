🧪 Laboratório de Classificação Visual — Viés Algorítmico

📝 Descrição do Projeto

Este projeto consiste em um experimento prático de treinamento de modelo de classificação de imagens, utilizando deliberadamente um dataset enviesado para demonstrar como a seleção restrita de dados corrompe a lógica do algoritmo e gera uma visão distorcida da realidade.
Desenvolvido como parte da disciplina de Engenharia de Prompt e Aplicações em IA, o experimento utiliza o Google Teachable Machine para treinar um classificador binário com dois perfis fictícios — "Perfil Liderança" e "Perfil Operacional" — alimentado com imagens que reforçam estereótipos sociais de forma intencional. O objetivo não é construir um modelo justo, mas expor e documentar os mecanismos pelos quais o viés de dados se manifesta nas predições do modelo.
As 4 capturas de tela documentam o modelo em operação ao vivo, classificando diferentes perfis de pessoas reais em tempo real via webcam.

🚀 Tecnologias Utilizadas

Plataforma: Google Teachable Machine

Tipo de Modelo: Image Classification (classificação binária)

Input: Webcam em tempo real

Dataset: 20 imagens por classe (capturadas/carregadas manualmente)

Deploy: Link público compartilhável gerado pela plataforma

🔗 Modelo publicado: teachablemachine.withgoogle.com/models/WvF-RB6PBF

📊 Resultados — Classificações em Tempo Real

O modelo foi testado ao vivo com webcam em 4 cenários distintos, todos documentados em captura de tela:

Teste - Input (webcam) - Desc. Europeu - Desc. Africano - Observação

Teste 1 - Cabelo cacheado / crespo (parte de trás) - ~0% - 100% - Classificação por característica capilar, sem rosto visível

Teste 2 - Grupo de pessoas em sala de aula - 100% - ~0% - Cena coletiva classificada com confiança máxima

Teste 3 - Rosto frontal — jovem sorrindo - 68% - 32% - Resultado dividido — modelo com incerteza

Teste 4 - Rosto frontal — jovem com óculos - 78% - 22% - Classificação majoritária com margem de incerteza

⚠️ Nota crítica: O modelo classificou características físicas visíveis — tipo de cabelo, tom de pele, fisionomia — como indicadores de "perfil profissional". Isso não reflete nenhuma realidade objetiva: é um artefato direto do viés introduzido intencionalmente no dataset de treinamento.

🔍 Análise do Viés

Mecanismo do Viés: 
A seleção restrita e estereotipada do dataset de treinamento fez o modelo aprender associações espúrias entre características físicas e categorias profissionais. Como o algoritmo não tem consciência de contexto social, ele generaliza padrões visuais superficiais como se fossem preditores válidos de "liderança" ou "perfil operacional". O resultado é uma distorção sistemática da realidade que se autoalimenta a cada predição.

Consequência Social: 
Um indivíduo classificado equivocadamente por um sistema assim pode sentir frustração e desconforto, com impacto direto em processos seletivos, promoções ou avaliações de desempenho automatizadas. A invisibilização algorítmica reforça desigualdades estruturais ao dar aparência de objetividade a julgamentos que são, na raiz, estereotipados.

Ação Mitigadora — Human-in-the-Loop: 
A principal intervenção para garantir equidade é a revisão humana obrigatória antes da implementação do modelo

Incluir diversidade intencional no dataset (gênero, etnia, vestimenta, contexto)

Auditar as classes e verificar se os critérios de categorização refletem características reais e mensuráveis — não estereótipos

Manter um revisor humano responsável por validar a conformidade ética dos dados antes do treinamento

Documentar explicitamente as limitações e os vieses identificados antes do deploy


🔧 Como Reproduzir o Experimento

Acesse o Google Teachable Machine e selecione Image Project.

Crie duas classes: Perfil Liderança e Perfil Operacional.

Carregue ou capture 20 imagens por classe, aplicando critérios deliberadamente estereotipados.

Treine o modelo clicando em Train Model.

Teste em tempo real via Preview this model live com webcam ativa.

Publique o modelo e compartilhe o link gerado.

Documente os resultados e analise os padrões de classificação observados.

Autores: Gabriel Pedro Moreira · Larissa Ferreira da Silva

[Voltar ao início](https://github.com/LarissaFDSilva/portfolio_LarissaFDSilva)
