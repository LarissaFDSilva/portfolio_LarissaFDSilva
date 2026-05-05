# MusiClass - TODO

## Setup & Branding
- [x] Gerar logo do app MusiClass
- [x] Atualizar app.config.ts com nome e logo
- [x] Configurar tema de cores (violeta + âmbar)
- [x] Configurar ícones da tab bar

## Navegação & Estrutura
- [x] Configurar tab bar com 4 abas: Home, Salas, Metrônomo, Perfil
- [x] Criar tela Home/Dashboard
- [x] Criar tela Salas/Explorar
- [x] Criar tela Perfil
- [x] Criar tela Metrônomo (aba dedicada)

## Sala de Aula (Jitsi Meet)
- [x] Instalar e configurar react-native-jitsi-meet ou WebView com Jitsi
- [x] Configurar opções de áudio Hi-Fi (disableAudioProcessing, highFidelityMusicMode)
- [x] Implementar tela de pré-entrada (configurar áudio/câmera)
- [x] Implementar overlay de controles customizados sobre o Jitsi
- [x] Botões flutuantes: Music Board, Metrônomo, QR Code, Acordes, Performance

## Music Board
- [x] Criar componente MusicBoard com visualizador de partituras/cifras
- [x] Implementar zoom e scroll na partitura
- [x] Implementar scroll sincronizado via WebSocket (simulado)
- [x] Implementar anotações em tempo real
- [x] Painel de seleção de músicas/cifras

## Metrônomo Global
- [x] Criar componente MetronomeVisualizer com pulso nas bordas
- [x] Controles de BPM (+/-, tap tempo)
- [x] Seletor de compasso (2/4, 3/4, 4/4, 6/8)
- [x] Indicador visual de tempo forte/fraco
- [x] Toggle de sincronização com sala

## Segunda Câmera (QR Code)
- [x] Criar tela de geração de QR Code
- [x] Instruções de uso passo a passo
- [x] Status de conexão da câmera secundária
- [x] Preview do feed integrado

## Overlay de Acordes (IA)
- [x] Criar componente ChordOverlay semi-transparente
- [x] Simulação de detecção de acordes em tempo real
- [x] Histórico dos últimos 5 acordes
- [x] Toggle ativar/desativar

## Modo Performance (Palco Virtual)
- [x] Layout destaque para o performer
- [x] Sistema de reações animadas (Aplausos, Coração, Fogo)
- [x] Linha do tempo de reações rítmicas
- [x] Contador de reações

## Gamificação — Desafios de Leitura
- [x] Tela de desafios com mini-game musical
- [x] Exibição de trecho musical e metrônomo integrado
- [x] Sistema de pontuação baseado na constância
- [x] Histórico de pontuações e conquistas/badges

## Perfil
- [x] Tela de perfil com avatar e nome
- [x] Seleção de papel: Professor / Aluno
- [x] Histórico de aulas
- [x] Conquistas e badges


## Autenticação & Persistência (Nova Feature)
- [x] Criar tela de login com Google e Apple
- [x] Implementar hook useAuth para gerenciar sessão
- [x] Criar tabelas de usuário e progresso no banco de dados
- [x] Implementar endpoints tRPC para salvar/carregar progresso
- [x] Integrar autenticação nas telas existentes
- [x] Salvar XP, desafios completados e histórico de aulas
- [x] Sincronizar progresso entre dispositivos
- [x] Tela de logout e gerenciamento de conta


## Gamificação - Emblemas e Conquistas (Nova Feature)
- [x] Definir 20+ conquistas com critérios específicos
- [x] Criar tabelas de banco de dados para conquistas detalhadas
- [x] Implementar lógica de desbloqueio automático
- [x] Criar componentes UI para badges e emblemas
- [x] Implementar tela de conquistas com histórico
- [x] Adicionar notificações ao desbloquear conquistas
- [x] Criar sistema de progressão (Bronze, Prata, Ouro)
- [x] Testar fluxo completo de gamificação
