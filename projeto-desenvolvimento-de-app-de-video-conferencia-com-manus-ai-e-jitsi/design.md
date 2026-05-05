# MusiClass — Design de Interface

## Identidade Visual

- **Nome:** MusiClass
- **Tagline:** Aulas de música ao vivo, onde você estiver
- **Paleta de Cores:**
  - Primary: `#7C3AED` (violeta musical — criatividade e profissionalismo)
  - Secondary: `#F59E0B` (âmbar — energia e calor)
  - Background Light: `#FAFAFA`
  - Background Dark: `#0F0A1E`
  - Surface Light: `#F3F0FF`
  - Surface Dark: `#1A1230`
  - Accent: `#10B981` (verde — sucesso, gamificação)

---

## Telas do App

### 1. Home / Dashboard
- Saudação ao usuário com nome
- Card de "Próxima Aula" com horário e professor/aluno
- Botão grande "Entrar na Aula" (CTA principal)
- Seção "Minhas Salas" (salas salvas)
- Seção "Desafios do Dia" (gamificação)
- Bottom tab bar: Home | Salas | Metrônomo | Perfil

### 2. Salas / Explorar
- Campo de busca de sala por código
- Lista de salas recentes
- Botão "Criar Nova Sala"
- Card de sala: nome, participantes, status (ao vivo / agendada)

### 3. Sala de Aula (Jitsi Meet View)
- WebView com Jitsi Meet em fullscreen
- Overlay superior: nome da sala + botão Music Board
- Overlay inferior: controles customizados (microfone, câmera, chat, sair)
- Botão flutuante: Metrônomo
- Botão flutuante: QR Code (segunda câmera)
- Botão flutuante: Acordes (overlay IA)
- Botão flutuante: Modo Performance

### 4. Music Board (Partituras/Cifras)
- Visualizador de partitura em SVG/imagem
- Barra de ferramentas: Scroll sincronizado | Anotação | Zoom
- Indicador de sincronização (professor/aluno)
- Painel lateral: lista de músicas/cifras
- Botão para adicionar cifra por URL ou upload

### 5. Metrônomo Global
- Display BPM grande e centralizado
- Controles: +/- BPM, tap tempo
- Visualizador pulsante nas bordas da tela
- Toggle: Sincronizar com sala
- Seletor de compasso (2/4, 3/4, 4/4, 6/8)
- Indicador visual de tempo forte/fraco

### 6. QR Code — Segunda Câmera
- Tela de geração de QR Code para o professor/aluno
- Instruções passo a passo
- Preview do feed da câmera secundária
- Status de conexão

### 7. Overlay de Acordes (IA)
- Painel semi-transparente sobre o vídeo
- Exibição do acorde detectado em tempo real
- Histórico dos últimos 5 acordes
- Toggle para ativar/desativar

### 8. Modo Performance (Palco Virtual)
- Layout destaque para o performer
- Reações: Aplausos, Coração, Fogo (animadas)
- Linha do tempo de reações rítmicas
- Contador de reações

### 9. Desafios de Leitura (Mini-game)
- Exibição de trecho musical
- Metrônomo integrado
- Pontuação baseada na constância do tempo
- Histórico de pontuações e conquistas

### 10. Perfil
- Avatar e nome do usuário
- Papel: Professor / Aluno
- Histórico de aulas
- Conquistas e badges
- Configurações do app

---

## Fluxos Principais

### Fluxo 1: Entrar em uma Aula
Home → Digitar código da sala → Configurar áudio/câmera → Entrar na sala Jitsi

### Fluxo 2: Criar uma Sala (Professor)
Home → "Nova Sala" → Configurar nome/opções → Compartilhar código → Iniciar aula

### Fluxo 3: Usar Music Board
Sala de Aula → Botão Music Board → Selecionar partitura → Sincronizar com alunos

### Fluxo 4: Segunda Câmera
Sala de Aula → Botão QR Code → Escanear com smartphone → Feed integrado na sala

### Fluxo 5: Desafio de Leitura
Home → Desafios do Dia → Selecionar desafio → Praticar → Ver pontuação

---

## Componentes Reutilizáveis

- `RoomCard` — Card de sala com status
- `MetronomeVisualizer` — Pulso visual nas bordas
- `ChordOverlay` — Overlay semi-transparente de acordes
- `MusicBoard` — Visualizador de partituras
- `ReactionBar` — Barra de reações do Modo Performance
- `ChallengeCard` — Card de desafio de leitura
- `QRCodeModal` — Modal de QR Code para segunda câmera
