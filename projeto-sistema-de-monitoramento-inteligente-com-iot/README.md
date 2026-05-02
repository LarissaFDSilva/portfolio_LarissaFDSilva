🏋️ Academia Meraki — Sistema de Monitoramento Inteligente com IoT

📝 Descrição do Projeto

Este projeto consiste em um sistema de banco de dados relacional para monitoramento inteligente de alunos em academias, desenvolvido em sprints progressivas de modelagem. O objetivo principal é gerenciar de forma integrada todos os dados gerados pelos alunos ao longo de sua jornada — dentro e fora da academia — abrangendo métricas de desempenho, frequência e evolução física, com foco na análise de sazonalidade e taxa de evasão (churn) de clientes.
Desenvolvido como parte da disciplina de Modelagem de Banco de Dados, o projeto parte da definição do minimundo (Artefato 01), passa pela classificação e análise de dados (Artefato 02), avança para o DER conceitual e lógico (Artefatos 03 e 04), realiza a verificação das formas normais (Artefato 05) e culmina no script SQL completo em PostgreSQL com todas as tabelas, relacionamentos, constraints, triggers e dados iniciais.

📌 Problema central investigado: Alta taxa de evasão de membros no período pós-Carnaval — identificar padrões sazonais, alertar sobre riscos iminentes e gerar relatórios analíticos para apoiar decisões estratégicas da gestão.

🚀 Tecnologias Utilizadas

SGBD: PostgreSQL 12+

Modelagem: MySQL Workbench (DER físico), diagramas ER conceitual e lógico

Linguagem: SQL (DDL + DML + PL/pgSQL para triggers e funções)

Dispositivo IoT: Pulseira inteligente integrada via API (monitoramento contínuo)

Encoding: UTF-8

🗂️ Arquitetura do Banco de Dados

O schema foi desenvolvido iterativamente em 5 artefatos, evoluindo do conceitual ao físico.

Entidades e Tabelas Principais

Tabela - Descrição - Chave Primária 

pessoa - Dados pessoais dos usuários - id_pessoa (SERIAL)

emaiL - Endereços de e-mail - id_email (SERIAL)

telefone - Números de telefone por tipo - id_telefone (SERIAL)

plano - Planos de assinatura (mensal, trimestral, anual) - id_plano (SERIAL)

api - Credenciais de APIs externas (pulseiras) - id_api (SERIAL)

pulseira - Dispositivos IoT de monitoramento - id_pulseira (SERIAL)

aluno - Alunos matriculados - id_aluno (SERIAL)

restricao_medica - Condições médicas e restrições dos alunos - id_restricao_medica (SERIAL)

sessao_treino - Registro de cada sessão realizada - id_sessao_treino (SERIAL)

avaliacao_fisica - Avaliações físicas periódicas - id_avaliacao_fisica (SERIAL)

medida_corporal - Catálogo de tipos de medidas corporais - id_medida_corporal (SERIAL)

Tabelas de Relacionamento (N:M)

Tabela - Entidades relacionadas
pessoa_email - Pessoa ↔ Email (com flag principal)
pessoa_telefone - Pessoa ↔ Telefone (com flag principal)
avaliacao_medida - Avaliação Física ↔ Medida Corporal (com valor_medida)
aluno_sessao_treino - Aluno ↔ Sessão de Treino (com tipo_treino e objetivo)

Cardinalidades dos Relacionamentos

Aluno → Plano: N:1 — vários alunos por plano; cada aluno tem um plano
Aluno → Pulseira: 1:1 — cada aluno possui uma pulseira exclusiva
Aluno → Sessão de Treino: N:M — via tabela aluno_sessao_treino
Aluno → Avaliação Física: 1:N — um aluno pode ter múltiplas avaliações ao longo do tempo
Avaliação Física → Medida Corporal: N:M — via tabela avaliacao_medida
Pulseira → API: N:1 — cada pulseira se conecta a uma API externa
Pessoa → Email / Telefone: N:M — uma pessoa pode ter múltiplos contatos


⚙️ Funcionalidades do Sistema

O sistema VAI FAZER:

Comparar períodos e grupos de usuários para identificar padrões sazonais

Alertar sobre riscos iminentes de evasão por ausência prolongada

Gerar relatórios analíticos da taxa de churn por período

Registrar automaticamente sessões de treino via pulseira IoT

Coletar métricas de desempenho (frequência cardíaca, intensidade, calorias)

Controlar avaliações físicas e evolução das medidas corporais

O sistema NÃO VAI FAZER:

Gestão de cobrança ou controle financeiro

Comunicação direta entre membros

Sugestão de treinos personalizados

Emissão de nota fiscal ou agendamento de aulas


📊 Resultados e Aprendizados

O projeto foi desenvolvido em 5 sprints progressivas, cada uma consolidando um nível de maturidade do modelo.

Artefato 01 — Minimundo: Definição do escopo, atores (Gerente, Aluno, Recepcionista, Personal Trainer, Consultor Comercial) e os 7 processos fundamentais do sistema.

Artefato 02 — Análise de Dados: Identificação de 12 exemplos de transformação dado → informação e classificação de 20 atributos entre estruturados (CPF, data de matrícula, frequência semanal) e não estruturados (comentários de cancelamento, vídeos de treino, inferências comportamentais).

Artefato 03 — Consolidação do Minimundo: Versão final unificada (v1.2) servindo como fundação inalterável para a modelagem. Definição de 7 entidades preliminares e 7 processos operacionais detalhados.

Artefato 04 — DER Conceitual e Lógico: Diagrama Entidade-Relacionamento com 6 entidades principais e suas cardinalidades. Todas as chaves primárias e estrangeiras definidas. DER revisado com adição de Restrição Médica, Medida Corporal e Telefone_Aluno.

Artefato 05 — Normalização (1FN, 2FN, 3FN): Todas as 6 tabelas verificadas e aprovadas nas três formas normais — valores atômicos, ausência de dependências parciais e ausência de dependências transitivas em 100% dos critérios avaliados.

Script SQL Final:

11 tabelas principais + 4 tabelas de relacionamento

Constraints de integridade (CHECK, UNIQUE, FK com ON DELETE/UPDATE)

Índices otimizados para as consultas mais frequentes

Trigger automático de updated_at em todas as tabelas mutáveis

Trigger de cálculo automático de IMC na avaliação física

12 medidas corporais padrão pré-cadastradas como dados iniciais


🔧 Como Executar

Certifique-se de ter o PostgreSQL 12+ instalado e em execução.

Crie o banco de dados: CREATE DATABASE academia_meraki ENCODING 'UTF8';

Conecte-se ao banco e execute o script: psql -U seu_usuario -d academia_meraki -f Script_Convertido.sql

Verifique as tabelas criadas: SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;

👥 Equipe

Nicolas Petrimperni · Gabriel Saldanha · Victor Sittino · Sidney Marciel · Pedro Salem · Guilherme Barros · Lukas Rocha · Larissa Silva · Kauam Alves · Gabriel Bryan · Augusto Henrique · Gabriel de Assis

Voltar ao início
