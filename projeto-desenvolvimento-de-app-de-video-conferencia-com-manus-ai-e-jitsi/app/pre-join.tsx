import { View, Text, TouchableOpacity, Switch, ScrollView } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function PreJoinScreen() {
  const colors = useColors();
  const router = useRouter();
  const { roomName, roomTitle } = useLocalSearchParams<{ roomName: string; roomTitle: string }>();

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [hiFiAudio, setHiFiAudio] = useState(true);
  const [role, setRole] = useState<"student" | "teacher">("student");

  const handleJoin = () => {
    router.push({
      pathname: "/classroom" as any,
      params: { roomName, roomTitle },
    });
  };

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 28,
            borderBottomLeftRadius: 28,
            borderBottomRightRadius: 28,
          }}
        >
          <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 16 }}>
            <IconSymbol name="arrow.left" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={{ color: "#FFFFFF", fontSize: 24, fontWeight: "800" }}>Configurar Entrada</Text>
          <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, marginTop: 4 }}>
            {roomTitle || roomName}
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20, paddingTop: 24, gap: 20 }}>
          {/* Preview da câmera (simulado) */}
          <View
            style={{
              backgroundColor: "#1A1230",
              borderRadius: 20,
              height: 180,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: colors.border,
              overflow: "hidden",
            }}
          >
            {camOn ? (
              <View style={{ alignItems: "center", gap: 8 }}>
                <IconSymbol name="camera.fill" size={40} color="rgba(255,255,255,0.4)" />
                <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>Câmera ativa</Text>
              </View>
            ) : (
              <View style={{ alignItems: "center", gap: 8 }}>
                <IconSymbol name="camera.fill" size={40} color="rgba(255,255,255,0.3)" />
                <Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Câmera desativada</Text>
              </View>
            )}
            {/* Indicador de nome */}
            <View
              style={{
                position: "absolute",
                bottom: 12,
                left: 12,
                backgroundColor: "rgba(0,0,0,0.6)",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "600" }}>Músico</Text>
            </View>
          </View>

          {/* Controles de mídia */}
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: colors.border,
              overflow: "hidden",
            }}
          >
            <Text
              style={{
                color: colors.foreground,
                fontSize: 16,
                fontWeight: "700",
                padding: 20,
                paddingBottom: 12,
              }}
            >
              Dispositivos
            </Text>
            {[
              {
                label: "Microfone",
                icon: "mic.fill" as const,
                value: micOn,
                onChange: setMicOn,
              },
              {
                label: "Câmera",
                icon: "camera.fill" as const,
                value: camOn,
                onChange: setCamOn,
              },
            ].map((item, i) => (
              <View
                key={item.label}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  paddingVertical: 14,
                  borderTopWidth: 1,
                  borderTopColor: colors.border,
                  gap: 12,
                }}
              >
                <IconSymbol name={item.icon} size={20} color={item.value ? colors.primary : colors.muted} />
                <Text style={{ flex: 1, color: colors.foreground, fontSize: 15 }}>{item.label}</Text>
                <Switch
                  value={item.value}
                  onValueChange={item.onChange}
                  trackColor={{ false: colors.border, true: `${colors.primary}80` }}
                  thumbColor={item.value ? colors.primary : colors.muted}
                />
              </View>
            ))}
          </View>

          {/* Configurações de áudio musical */}
          <View
            style={{
              backgroundColor: hiFiAudio ? `${colors.primary}15` : colors.card,
              borderRadius: 20,
              padding: 20,
              borderWidth: 1,
              borderColor: hiFiAudio ? `${colors.primary}40` : colors.border,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: hiFiAudio ? `${colors.primary}22` : colors.surface,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconSymbol name="waveform" size={22} color={hiFiAudio ? colors.primary : colors.muted} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "700" }}>
                  Modo Hi-Fi Musical
                </Text>
                <Text style={{ color: colors.muted, fontSize: 13, marginTop: 4, lineHeight: 18 }}>
                  Desativa o cancelamento de ruído para preservar as frequências do instrumento. Recomendado para aulas de instrumento.
                </Text>
              </View>
              <Switch
                value={hiFiAudio}
                onValueChange={setHiFiAudio}
                trackColor={{ false: colors.border, true: `${colors.primary}80` }}
                thumbColor={hiFiAudio ? colors.primary : colors.muted}
              />
            </View>
            {hiFiAudio && (
              <View
                style={{
                  marginTop: 12,
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: `${colors.primary}15`,
                  borderWidth: 1,
                  borderColor: `${colors.primary}30`,
                }}
              >
                <Text style={{ color: colors.primary, fontSize: 12, fontWeight: "600" }}>
                  ✓ disableAudioProcessing: true{"\n"}
                  ✓ highFidelityMusicMode: true{"\n"}
                  ✓ enableNoisyMicDetection: false
                </Text>
              </View>
            )}
          </View>

          {/* Papel */}
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 20,
              padding: 20,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: "700", marginBottom: 12 }}>
              Entrar como
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              {(["student", "teacher"] as const).map((r) => (
                <TouchableOpacity
                  key={r}
                  onPress={() => setRole(r)}
                  style={{
                    flex: 1,
                    padding: 14,
                    borderRadius: 12,
                    alignItems: "center",
                    backgroundColor: role === r ? colors.primary : colors.surface,
                    borderWidth: 1,
                    borderColor: role === r ? colors.primary : colors.border,
                    gap: 6,
                  }}
                  activeOpacity={0.8}
                >
                  <IconSymbol
                    name={r === "student" ? "music.note" : "tuningfork"}
                    size={22}
                    color={role === r ? "#FFFFFF" : colors.muted}
                  />
                  <Text
                    style={{
                      color: role === r ? "#FFFFFF" : colors.muted,
                      fontSize: 14,
                      fontWeight: "600",
                    }}
                  >
                    {r === "student" ? "Aluno" : "Professor"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Botão de entrar */}
          <TouchableOpacity
            onPress={handleJoin}
            style={{
              backgroundColor: colors.primary,
              borderRadius: 16,
              padding: 18,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
            }}
            activeOpacity={0.85}
          >
            <IconSymbol name="video.fill" size={20} color="#FFFFFF" />
            <Text style={{ color: "#FFFFFF", fontSize: 17, fontWeight: "700" }}>Entrar na Aula</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
