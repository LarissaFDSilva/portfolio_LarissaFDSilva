⚔️ Batalha de Modelos & Engenharia de Prompt (XML)

📝 Descrição do Projeto: 
Este projeto consiste em um experimento comparativo de modelos de linguagem (LLMs) utilizando Engenharia de Prompt estruturada em XML. O objetivo principal é avaliar como diferentes IAs interpretam e executam um mesmo prompt estruturado, identificando diferenças em precisão, criatividade, verbosidade e qualidade do código gerado.
Desenvolvido como parte da disciplina de Engenharia de Prompt e Aplicações em IA, o experimento solicita a cada modelo a geração de uma página HTML5 Single Page com CSS3 integrado, com tema na Força Aérea Brasileira — incluindo menu de navegação, galeria, rodapé e uma ferramenta de alistamento militar.
Os modelos avaliados foram: ChatGPT, Gemini, DeepSeek, Qwen, Grok, Maritaca e Claude.

🚀 Tecnologias e Ferramentas Utilizadas:
Formato do Prompt: XML estruturado

Saída Esperada: HTML5 + CSS3 (Single Page Application)

Modelos Avaliados: GPT, Gemini, DeepSeek, Qwen, Grok, Maritaca, Claude

Critérios de Avaliação: Precisão do prompt, qualidade do HTML, criatividade, bugs e consumo de tokens

📊 Resultados e Aprendizados
O experimento produziu resultados distintos entre os modelos, evidenciando diferenças significativas de interpretação e execução.
Critério:	 
GPT, Gemini, DeepSeek, Qwen, Grok, Maritaca, Claude
Precisão estimada do prompt:	
6, 7,5, 6, 8, 9, 9, 8
Precisão do HTML:	
9, 8, 6,5, 8,5, 6, 6, 8
Criatividade no Conteúdo:	
3, 6, 6, 6, 7, 4, 9
Erros de Sintaxe (Bugs):	
7, 7,	7, 7, 6, 5, 7
Tokens Gastos:	
1.100, 1.950, 4.200, 1.450, 4.850, 1.250, 4.800

Principais achados:

Claude obteve a maior nota em criatividade (9/10), entregando o site visualmente mais agradável, e foi eleito o modelo com maior compreensão da estrutura XML do prompt.
Grok foi o mais fiel ao prompt em termos de precisão (9/10), mas errou a ordem de distribuição dos elementos e utilizou o maior número de tokens (4.850) para um resultado considerado básico.
GPT entregou a melhor precisão de HTML (9/10), porém o resultado não foi responsivo e teve baixa criatividade visual (3/10).
DeepSeek alucionou em algumas partes e adicionou elementos além do solicitado.
Maritaca apresentou erros nos campos do formulário e não anexou imagens corretamente.
Diferença de verbosidade: O Grok usou ~4.850 tokens contra ~1.100 do GPT para resultados comparáveis — demonstrando que maior consumo de tokens não implica maior qualidade.

🔧 Como Reproduzir o Experimento

Copie o prompt XML estruturado abaixo.
Cole-o em cada uma das ferramentas de IA desejadas (ChatGPT, Gemini, Claude, etc.).
Avalie o resultado gerado conforme os critérios do quadro comparativo.

xml
<tarefa>
  <objetivo>Criar uma página HTML5 única com CSS3 interno (single page).</objetivo>
  <tema>[FORÇA AÉREA BRASILEIRA]</tema>
  <diretrizes_design>
    <layout>Responsivo e minimalista.</layout>
    <paleta_cores>[AZUL]</paleta_cores>
    <tipografia>Sans-serif para títulos, Serif para corpo.</tipografia>
  </diretrizes_design>
  <obrigatoriedades_tecnicas>
    <item>Menu de navegação funcional (âncoras).</item>
    <item>Seção de portfólio ou galeria.</item>
    <item>Rodapé com informações de contato simuladas.</item>
    <item>Ferramenta de alistamento militar com formulário padrão
    (medidas corporais, saúde física e psicológica).</item>
  </obrigatoriedades_tecnicas>
  <metrica_obrigatoria>
    Ao final da resposta, informe uma estimativa de quantos tokens
    foram gerados para este código.
  </metrica_obrigatoria>
</tarefa>

💡 Reflexão Crítica

Maior compreensão do prompt XML: Claude
Maior verbosidade para resultado equivalente: Grok (4.850 tokens) vs. GPT (1.100 tokens)
Melhor para prototipagem rápida: Claude
Melhor para códigos mais complexos: Claude


Autores: Victor Hugo Sittino Alvim · Larissa Ferreira da Silva · Leticia Gabrielly Pozzi Egea Campos
[Voltar ao início](https://github.com/LarissaFDSilva/portfolio_LarissaFDSilva)
