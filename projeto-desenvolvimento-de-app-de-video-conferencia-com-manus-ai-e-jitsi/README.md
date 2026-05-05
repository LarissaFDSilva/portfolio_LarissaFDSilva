🎵 MusicSync – Plataforma de Educação Musical & Vídeo
O MusicSync é uma solução de videoconferência de alta performance projetada especificamente para o ensino de música. O projeto resolve o problema da baixa qualidade de áudio e da falta de ferramentas colaborativas em chamadas de vídeo genéricas, oferecendo um ambiente onde a fidelidade sonora e o suporte pedagógico (partituras e metrônomos) são a prioridade.

🚀 Funcionalidades Principais
Áudio Hi-Fi para Instrumentos: Configuração otimizada para captar a riqueza harmônica de instrumentos, desativando supressores de ruído agressivos.

Estante de Partituras Digital: Visualizador nativo sincronizado onde o professor controla o scroll e faz anotações em tempo real para os alunos.

Modo Multicâmera (QR Code): Pareamento instantâneo de um celular para servir como câmera secundária focada no instrumento (ex: ângulo do teclado ou braço do violão).

Metrônomo Global Sincronizado: Pulsação visual e tátil unificada via servidor para manter o ritmo entre todos os participantes.

IA de Suporte Harmônico: Identificação de acordes em tempo real durante a aula para facilitar o aprendizado teórico.

🛠️ Tecnologias Utilizadas
Framework: React Native com Expo

Motor de Vídeo: Jitsi Meet API (lib-jitsi-meet)

Sincronização: WebSockets e NTP (Network Time Protocol)

Processamento de Som: Web Audio API

📂 Informações de Infraestrutura (Expo)
Ao desenvolver este projeto, uma pasta denominada .expo será gerada localmente. Conforme as diretrizes do projeto:

Origem: A pasta é criada automaticamente ao executar o comando expo start.

Arquivos Internos: * devices.json: Armazena informações sobre dispositivos que abriram o projeto recentemente para popular a lista de sessões de desenvolvimento.

settings.json: Contém a configuração do servidor para servir o manifesto da aplicação.

Versão e Segurança: Esta pasta não deve ser enviada ao GitHub, pois contém dados específicos da sua máquina local. Ela já está incluída no arquivo .gitignore por padrão.

🏁 Instruções de Instalação (Passo a Passo)
Siga os passos abaixo para configurar o ambiente de desenvolvimento em sua máquina:

Clonar o Repositório:

git clone https://github.com/seu-usuario/musicsync.git

cd musicsync

Instalar Dependências:

Certifique-se de ter o Node.js instalado.

npm install

Instalar o Expo CLI (opcional):

Caso ainda não possua o Expo globalmente:

npm install -g expo-cli

Iniciar o Projeto:
Execute o comando abaixo para gerar a pasta .expo e iniciar o servidor Metro.

npx expo start

Execução no Dispositivo:
Escaneie o QR Code gerado no terminal utilizando o aplicativo Expo Go (Android/iOS) para visualizar o app em tempo real.

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
