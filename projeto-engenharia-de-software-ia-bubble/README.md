📋 Sistema de Orçamentos — Bubble.io

📝 Descrição do Projeto

Este projeto consiste em uma aplicação web de gestão de orçamentos construída sem código tradicional, utilizando a plataforma No-Code Bubble.io com IA integrada como acelerador de desenvolvimento. O objetivo principal é aplicar rigorosamente os fundamentos de engenharia de software — segurança, escalabilidade e governança de dados — mesmo em um ambiente visual e sem código.
Desenvolvido como parte da disciplina de Engenharia de Software e IA, o sistema permite que consultores e vendedores criem, gerenciem e enviem orçamentos para clientes, controlando status, itens, valores e formas de pagamento. A IA do Bubble foi utilizada como copiloto na construção dos workflows e da interface, enquanto as decisões de arquitetura de dados e segurança foram guiadas por princípios de engenharia tradicionais.

🚀 Tecnologias Utilizadas

Plataforma: Bubble.io (No-Code / Low-Code)

IA Integrada: Bubble AI Agent (geração assistida de workflows e layout)

Banco de Dados: Banco relacional nativo do Bubble (Data Types com relacionamentos)

Automações: Workflows visuais com eventos de botão e lógica condicional

Segurança: Privacy Rules por Data Type com escopo por Creator

Estratégia de Saída: Data API (JSON) + plano de migração para React + Node.js + PostgreSQL

🗂️ Arquitetura de Dados

O sistema é estruturado em 4 Data Types com relacionamentos definidos:

Entidades Principais

Data Type - Campo - Tipo - Descrição 

Usuario - Nome - Text - Nome do consultor/vendedor 

Empresa - Text - Nome da empresa vinculada 

Nome Fantasia - Text - Identificação principal 

CNPJ_CPF - Text - Chave de identificação única 

Email Contato - Text - Para envio automático de orçamentos

Cliente — — Dados do cliente final - 

Orcamento - Numero_Sequencial - NumberID amigável para o cliente

Cliente - Cliente - Relacionamento 1:1 com a tabela Cliente 

Vendedor - User - Vincula o criador do orçamento (Creator) 

Valor_Total - Number - Soma calculada dos itens

Status - OS_Status - Vinculado ao Option Set de status

Validade - Date - Data limite da proposta

Item_Orcamento - Orçamento_Pai - Orcamento - Referência inversa para o cabeçalho

Descrição - Text - Serviço/produto no momento da venda 

Preço_Unitario - Number - Salvo no momento da venda (imutável)

Quantidade - Number - Quantidade negociada

⚠️ Decisão de Engenharia: O Preço_Unitario é salvo diretamente no Item_Orcamento — e não referenciado do catálogo — para garantir que mudanças futuras no catálogo não alterem orçamentos já emitidos.

Option Sets

OS_Status_Orcamento - OS_Forma_Pagamento

Rascunho (Cinza) - Boleto

Enviado (Azul) - Cartão de Crédito

Aprovado (Verde) - Pix

Rejeitado (Vermelho)

Expirado (Amarelo)

🔐 Segurança — Privacy Rules
As regras de privacidade foram configuradas individualmente por Data Type, garantindo que cada usuário acesse apenas os dados que lhe pertencem:

Regra aplicada a Client: This Client's Creator is Current User — o usuário só visualiza, busca e acessa arquivos dos clientes que ele mesmo cadastrou.

Permissões padrão (everyone else): visualização e busca habilitadas por padrão, sem auto-binding.

Mesma estrutura de Privacy Rules aplicada a Quote, QuoteItem e User.


⚙️ Workflows Implementados

A lógica de negócio foi implementada em 9 workflows na página index:

Workflow - Evento - Ação Principal

nq-cancel-btn - Botão clicado - Fecha o Popup de nova cotação e reseta inputs

nq-close-btn - Botão clicado - Fecha o modal de orçamento

nq-item-remove-btn - Botão clicado - Remove item da lista do orçamento

nq-save-btn - Botão clicado - Salva o orçamento no banco de dados

open-new-quote-btn - Botão clicado - Abre o Popup de criação de novo orçamento

quote-row-delete-btn - Botão clicado - Exclui um orçamento existente

quote-row-view-btn - Botão clicado - Abre a visualização de um orçamento

quote-row-whatsapp-btn - Botão clicado - Inicia envio do orçamento via WhatsApp

Reset item inputs on add button - Botão clicado - Limpa campos após adição de item

📝 Cada workflow possui Notes documentadas descrevendo sua função — estas anotações servem como especificação técnica para uma futura migração do sistema para código tradicional.

📊 Resultados e Aprendizados

IA como copiloto: O Bubble AI Agent acelerou a geração de estrutura de dados e wireframes, mas as decisões de arquitetura, segurança e escalabilidade exigiram julgamento humano e aplicação de fundamentos de engenharia.

No-Code com rigor de engenharia: É possível aplicar princípios como isolamento de dados, imutabilidade de registros históricos e controle de acesso granular mesmo sem escrever uma linha de código.

Documentação como ativo: As Notes dos Workflows funcionam como especificação técnica viva do sistema — indispensáveis para manutenção e para uma eventual migração.

Vendor Lock-in é gerenciável: A ausência de acesso ao código-fonte não significa perda total de controle, desde que a estratégia de saída seja planejada desde o início.


🚪 Estratégia de Saída — Mitigação de Vendor Lock-in

Por ser construído em Bubble.io, o código-fonte gerado pela plataforma não é exportável. Para garantir soberania sobre os dados e a lógica de negócio, as seguintes medidas foram adotadas:

Extração de Dados:

Ativação da Data API nas configurações da aplicação

Habilitação de acesso externo às tabelas Usuários e Orçamentos

Extração periódica via requisições JSON, legível por qualquer sistema externo

Plano de Migração Futura (se necessário):

Banco de Dados: Esquema replicado em PostgreSQL ou MySQL

Back-end: Lógica dos Workflows recodificada em Node.js, guiada pelas Notes documentadas

Front-end: Interface reconstruída em React, baseada nos wireframes originais

O ativo mais valioso — dados e lógica de negócio — permanece recuperável e transferível, mesmo que a infraestrutura de execução seja proprietária.

🔧 Como Acessar o Projeto

Acesse o editor do projeto no Bubble: Bubble Editor — larissaferreiradasillva

Para extrair dados via API, ative a Data API em Settings > API no editor do Bubble.

Faça requisições GET nos endpoints gerados para as tabelas Usuario e Orcamento.

Autora: Larissa Ferreira da Silva

Voltar ao início
