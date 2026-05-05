import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  Animated,
  Alert,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useRef, useEffect } from "react";
import { WebView } from "react-native-webview";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useKeepAwake } from "expo-keep-awake";
import * as Haptics from "expo-haptics";

// Configuração Jitsi com opções Hi-Fi para instrumentos musicais
const buildJitsiHTML = (roomName: string, displayName: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; background: #0F0A1E; overflow: hidden; }
    #jitsi-container { width: 100%; height: 100%; }
    #loading {
      position: fixed; inset: 0; background: #0F0A1E;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center; color: white; gap: 16px;
      font-family: -apple-system, sans-serif;
    }
    .spinner {
      width: 48px; height: 48px; border: 4px solid rgba(124,58,237,0.3);
      border-top-color: #7C3AED; border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div id="loading">
    <div class="spinner"></div>
    <p style="font-size:16px;font-weight:600;">Conectando à sala...</p>
    <p style="font-size:13px;opacity:0.6;">${roomName}</p>
  </div>
  <div id="jitsi-container"></div>
  <script src="https://meet.jit.si/external_api.js"></script>
  <script>
    window.onload = function() {
      try {
        const options = {
          roomName: '${roomName}',
          width: '100%',
          height: '100%',
          parentNode: document.getElementById('jitsi-container'),
          userInfo: {
            displayName: '${displayName}'
          },
          configOverwrite: {
            // Configurações Hi-Fi para instrumentos musicais
            disableAudioProcessing: true,
            enableNoisyMicDetection: false,
            autoCaptionOnRecord: false,
            prejoinPageEnabled: false,
            startWithAudioMuted: false,
            startWithVideoMuted: false,
            // Qualidade de áudio musical
            audioQuality: {
              stereo: true,
              opusMaxAverageBitrate: 510000,
            },
            // Interface limpa para partitura
            toolbarButtons: ['microphone', 'camera', 'chat', 'raisehand', 'tileview'],
            disableDeepLinking: true,
            enableWelcomePage: false,
          },
          interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: ['microphone', 'camera', 'desktop', 'chat', 'raisehand'],
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            SHOW_BRAND_WATERMARK: false,
            BRAND_WATERMARK_LINK: '',
            DEFAULT_REMOTE_DISPLAY_NAME: 'Músico',
            MOBILE_APP_PROMO: false,
            HIDE_INVITE_MORE_HEADER: true,
          },
        };

        const api = new JitsiMeetExternalAPI('meet.jit.si', options);

        api.addEventListener('videoConferenceJoined', function() {
          document.getElementById('loading').style.display = 'none';
          window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'joined' }));
        });

        api.addEventListener('videoConferenceLeft', function() {
          window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'left' }));
        });

        api.addEventListener('participantJoined', function(e) {
          window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'participantJoined', data: e }));
        });

        window._jitsiApi = api;
      } catch(e) {
        document.getElementById('loading').innerHTML = '<p style="color:#EF4444;padding:20px;text-align:center;">Erro ao conectar. Verifique sua conexão com a internet.</p>';
      }
    };
  </script>
</body>
</html>
`;

type OverlayMode = "none" | "musicboard" | "qrcode" | "chords" | "performance";

export default function ClassroomScreen() {
  useKeepAwake();
  const colors = useColors();
  const router = useRouter();
  const { roomName, roomTitle } = useLocalSearchParams<{ roomName: string; roomTitle: string }>();

  const [joined, setJoined] = useState(false);
  const [overlay, setOverlay] = useState<OverlayMode>("none");
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [participants, setParticipants] = useState(1);
  const [chordDetected, setChordDetected] = useState("Am");
  const [chordHistory, setChordHistory] = useState(["Am", "C", "G", "Em"]);
  const [reactions, setReactions] = useState<{ id: number; emoji: string; x: number }[]>([]);
  const reactionId = useRef(0);

  // Simulação de detecção de acordes
  const CHORDS = ["Am", "C", "G", "Em", "F", "Dm", "E7", "A7", "Bm", "D"];
  useEffect(() => {
    if (!joined) return;
    const interval = setInterval(() => {
      const chord = CHORDS[Math.floor(Math.random() * CHORDS.length)];
      setChordDetected(chord);
      setChordHistory((prev) => [chord, ...prev.slice(0, 4)]);
    }, 3500);
    return () => clearInterval(interval);
  }, [joined]);

  const handleWebViewMessage = (event: any) => {
    try {
      const msg = JSON.parse(event.nativeEvent.data);
      if (msg.type === "joined") {
        setJoined(true);
        if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else if (msg.type === "left") {
        router.back();
      } else if (msg.type === "participantJoined") {
        setParticipants((p) => p + 1);
      }
    } catch {}
  };

  const handleLeave = () => {
    Alert.alert("Sair da Aula", "Deseja realmente sair da sala?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: () => router.back() },
    ]);
  };

  const addReaction = (emoji: string) => {
    const id = ++reactionId.current;
    const x = Math.random() * 200 + 50;
    setReactions((prev) => [...prev, { id, emoji, x }]);
    setTimeout(() => setReactions((prev) => prev.filter((r) => r.id !== id)), 2000);
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const toggleOverlay = (mode: OverlayMode) => {
    setOverlay((prev) => (prev === mode ? "none" : mode));
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const safeRoomName = (roomName || "MusiClassRoom").replace(/[^a-zA-Z0-9]/g, "");

  return (
    <View style={{ flex: 1, backgroundColor: "#0F0A1E" }}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0A1E" />

      {/* Jitsi Meet WebView */}
      <WebView
        source={{ html: buildJitsiHTML(safeRoomName, "Músico") }}
        style={{ flex: 1 }}
        onMessage={handleWebViewMessage}
        javaScriptEnabled
        domStorageEnabled
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback
        allowsFullscreenVideo
        originWhitelist={["*"]}
        mixedContentMode="always"
      />

      {/* Header overlay */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          paddingTop: Platform.OS === "ios" ? 50 : 30,
          paddingHorizontal: 16,
          paddingBottom: 12,
          backgroundColor: "rgba(15,10,30,0.7)",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "700" }}>
            {roomTitle || safeRoomName}
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
            {joined ? `${participants} participante${participants !== 1 ? "s" : ""}` : "Conectando..."}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleLeave}
          style={{
            backgroundColor: "#EF4444",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
          }}
          activeOpacity={0.85}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "700" }}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Floating action buttons (lado direito) */}
      <View
        style={{
          position: "absolute",
          right: 12,
          top: Platform.OS === "ios" ? 120 : 100,
          gap: 10,
        }}
      >
        {[
          { mode: "musicboard" as const, icon: "music.note.list" as const, label: "Board" },
          { mode: "qrcode" as const, icon: "qrcode" as const, label: "2ª Cam" },
          { mode: "chords" as const, icon: "tuningfork" as const, label: "Acordes" },
          { mode: "performance" as const, icon: "star.fill" as const, label: "Palco" },
        ].map((btn) => (
          <TouchableOpacity
            key={btn.mode}
            onPress={() => toggleOverlay(btn.mode)}
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: overlay === btn.mode ? colors.primary : "rgba(15,10,30,0.8)",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1.5,
              borderColor: overlay === btn.mode ? colors.primary : "rgba(255,255,255,0.2)",
            }}
            activeOpacity={0.8}
          >
            <IconSymbol name={btn.icon} size={22} color={overlay === btn.mode ? "#FFFFFF" : "rgba(255,255,255,0.8)"} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Overlay: Music Board */}
      {overlay === "musicboard" && (
        <View
          style={{
            position: "absolute",
            bottom: 80,
            left: 12,
            right: 72,
            backgroundColor: "rgba(15,10,30,0.95)",
            borderRadius: 20,
            padding: 16,
            borderWidth: 1,
            borderColor: "rgba(124,58,237,0.4)",
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "700" }}>Music Board</Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <View
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 10,
                  backgroundColor: `${colors.success}33`,
                }}
              >
                <Text style={{ color: colors.success, fontSize: 11, fontWeight: "700" }}>● SYNC</Text>
              </View>
            </View>
          </View>
          {/* Partitura simulada */}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              padding: 12,
              minHeight: 120,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 32, letterSpacing: 8, color: "#1A0A3E", fontFamily: "serif" }}>
              𝄞 Am C G Em
            </Text>
            <Text style={{ fontSize: 14, color: "#6B7280", marginTop: 8 }}>
              Cifra sincronizada com o professor
            </Text>
            <View style={{ flexDirection: "row", gap: 6, marginTop: 10 }}>
              {["Am", "C", "G", "Em", "F", "Dm"].map((chord) => (
                <View
                  key={chord}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 8,
                    backgroundColor: "#F3F0FF",
                    borderWidth: 1,
                    borderColor: "#DDD6FE",
                  }}
                >
                  <Text style={{ color: "#7C3AED", fontSize: 13, fontWeight: "700" }}>{chord}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 10,
                backgroundColor: `${colors.primary}33`,
                alignItems: "center",
              }}
            >
              <Text style={{ color: colors.primary, fontSize: 13, fontWeight: "600" }}>↑ Scroll Sync</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 10,
                backgroundColor: `${colors.secondary}33`,
                alignItems: "center",
              }}
            >
              <Text style={{ color: colors.secondary, fontSize: 13, fontWeight: "600" }}>✏ Anotar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Overlay: QR Code Segunda Câmera */}
      {overlay === "qrcode" && (
        <View
          style={{
            position: "absolute",
            bottom: 80,
            left: 12,
            right: 72,
            backgroundColor: "rgba(15,10,30,0.95)",
            borderRadius: 20,
            padding: 16,
            borderWidth: 1,
            borderColor: "rgba(124,58,237,0.4)",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "700", marginBottom: 12 }}>
            Segunda Câmera
          </Text>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              gap: 8,
            }}
          >
            {/* QR Code simulado */}
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: "#1A0A3E",
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconSymbol name="qrcode" size={60} color="#FFFFFF" />
            </View>
            <Text style={{ color: "#1A0A3E", fontSize: 13, fontWeight: "600", textAlign: "center" }}>
              Escaneie com seu smartphone
            </Text>
            <Text style={{ color: "#6B7280", fontSize: 12, textAlign: "center" }}>
              Código: {safeRoomName}-CAM2
            </Text>
          </View>
          <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 10, textAlign: "center" }}>
            O feed da câmera secundária será integrado automaticamente à sala
          </Text>
        </View>
      )}

      {/* Overlay: Acordes (IA) */}
      {overlay === "chords" && (
        <View
          style={{
            position: "absolute",
            bottom: 80,
            left: 12,
            right: 72,
            backgroundColor: "rgba(15,10,30,0.92)",
            borderRadius: 20,
            padding: 16,
            borderWidth: 1,
            borderColor: "rgba(245,158,11,0.4)",
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "700" }}>Overlay de Acordes</Text>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 10,
                backgroundColor: `${colors.secondary}33`,
              }}
            >
              <Text style={{ color: colors.secondary, fontSize: 11, fontWeight: "700" }}>● IA ATIVA</Text>
            </View>
          </View>
          <View style={{ alignItems: "center", marginBottom: 12 }}>
            <Text style={{ color: colors.secondary, fontSize: 48, fontWeight: "800" }}>{chordDetected}</Text>
            <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>Acorde detectado em tempo real</Text>
          </View>
          <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginBottom: 8 }}>Histórico:</Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {chordHistory.map((chord, i) => (
              <View
                key={i}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 10,
                  backgroundColor: i === 0 ? `${colors.secondary}33` : "rgba(255,255,255,0.1)",
                  borderWidth: 1,
                  borderColor: i === 0 ? `${colors.secondary}60` : "transparent",
                }}
              >
                <Text
                  style={{
                    color: i === 0 ? colors.secondary : "rgba(255,255,255,0.6)",
                    fontSize: 14,
                    fontWeight: "700",
                  }}
                >
                  {chord}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Overlay: Modo Performance */}
      {overlay === "performance" && (
        <View
          style={{
            position: "absolute",
            bottom: 80,
            left: 12,
            right: 72,
            backgroundColor: "rgba(15,10,30,0.95)",
            borderRadius: 20,
            padding: 16,
            borderWidth: 1,
            borderColor: "rgba(236,72,153,0.4)",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
            Palco Virtual
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginBottom: 14 }}>
            Envie reações para o performer
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            {[
              { emoji: "👏", label: "Aplausos" },
              { emoji: "❤️", label: "Amei" },
              { emoji: "🔥", label: "Incrível" },
              { emoji: "🎵", label: "Musical" },
            ].map((r) => (
              <TouchableOpacity
                key={r.emoji}
                onPress={() => addReaction(r.emoji)}
                style={{ alignItems: "center", gap: 4 }}
                activeOpacity={0.7}
              >
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  <Text style={{ fontSize: 26 }}>{r.emoji}</Text>
                </View>
                <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>{r.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Reações flutuantes */}
      {reactions.map((r) => (
        <Animated.Text
          key={r.id}
          style={{
            position: "absolute",
            bottom: 200,
            left: r.x,
            fontSize: 32,
            pointerEvents: "none",
          }}
        >
          {r.emoji}
        </Animated.Text>
      ))}
    </View>
  );
}
