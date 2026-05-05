import { View, Text, TouchableOpacity, ScrollView, Share } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import QRCode from "react-native-qrcode-svg";

const STEPS = [
  {
    step: 1,
    title: "Escaneie o QR Code",
    desc: "Abra a câmera do seu smartphone secundário e aponte para o código abaixo.",
    icon: "qrcode.viewfinder" as const,
  },
  {
    step: 2,
    title: "Acesse o link",
    desc: "O link abrirá automaticamente a sala de aula com a câmera do segundo dispositivo.",
    icon: "wifi" as const,
  },
  {
    step: 3,
    title: "Posicione o instrumento",
    desc: "Coloque o smartphone para focar no dedilhado, postura ou instrumento.",
    icon: "camera.fill" as const,
  },
  {
    step: 4,
    title: "Feed integrado",
    desc: "O vídeo da segunda câmera aparecerá automaticamente na sala para todos.",
    icon: "video.fill" as const,
  },
];

export default function SecondCameraScreen() {
  const colors = useColors();
  const router = useRouter();
  const { roomName } = useLocalSearchParams<{ roomName: string }>();
  const [connected, setConnected] = useState(false);

  const safeRoom = (roomName || "MusiClassRoom").replace(/[^a-zA-Z0-9]/g, "");
  const cam2Code = `${safeRoom}-CAM2`;
  const joinUrl = `https://meet.jit.si/${safeRoom}?displayName=Camera2-${safeRoom}`;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Entre como câmera secundária na aula MusiClass:\n${joinUrl}`,
        url: joinUrl,
      });
    } catch {}
  };

  const simulateConnect = () => {
    setConnected(true);
    setTimeout(() => setConnected(false), 5000);
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
          <Text style={{ color: "#FFFFFF", fontSize: 24, fontWeight: "800" }}>Segunda Câmera</Text>
          <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, marginTop: 4 }}>
            Foque no instrumento com um segundo dispositivo
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20, paddingTop: 24, gap: 24 }}>
          {/* Status de conexão */}
          {connected && (
            <View
              style={{
                backgroundColor: `${colors.success}22`,
                borderRadius: 16,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                borderWidth: 1,
                borderColor: `${colors.success}40`,
              }}
            >
              <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.success, fontSize: 15, fontWeight: "700" }}>
                  Segunda câmera conectada!
                </Text>
                <Text style={{ color: colors.muted, fontSize: 13, marginTop: 2 }}>
                  Feed integrado à sala de aula
                </Text>
              </View>
            </View>
          )}

          {/* QR Code */}
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 24,
              padding: 24,
              alignItems: "center",
              borderWidth: 1,
              borderColor: colors.border,
              gap: 16,
            }}
          >
            <View
              style={{
                padding: 16,
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <QRCode
                value={joinUrl}
                size={180}
                color="#1A0A3E"
                backgroundColor="#FFFFFF"
              />
            </View>
            <View style={{ alignItems: "center", gap: 4 }}>
              <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: "700" }}>
                Código: {cam2Code}
              </Text>
              <Text style={{ color: colors.muted, fontSize: 13, textAlign: "center" }}>
                Escaneie com o smartphone que será a câmera secundária
              </Text>
            </View>

            {/* Botões de ação */}
            <View style={{ flexDirection: "row", gap: 10, width: "100%" }}>
              <TouchableOpacity
                onPress={handleShare}
                style={{
                  flex: 1,
                  padding: 14,
                  borderRadius: 14,
                  backgroundColor: colors.surface,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 6,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
                activeOpacity={0.8}
              >
                <IconSymbol name="paperplane.fill" size={16} color={colors.primary} />
                <Text style={{ color: colors.primary, fontSize: 14, fontWeight: "600" }}>Compartilhar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={simulateConnect}
                style={{
                  flex: 1,
                  padding: 14,
                  borderRadius: 14,
                  backgroundColor: colors.primary,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 6,
                }}
                activeOpacity={0.85}
              >
                <IconSymbol name="wifi" size={16} color="#FFFFFF" />
                <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600" }}>Testar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Instruções passo a passo */}
          <View>
            <Text style={{ color: colors.foreground, fontSize: 18, fontWeight: "700", marginBottom: 14 }}>
              Como usar
            </Text>
            {STEPS.map((step, i) => (
              <View
                key={step.step}
                style={{
                  flexDirection: "row",
                  gap: 14,
                  marginBottom: i < STEPS.length - 1 ? 16 : 0,
                }}
              >
                {/* Linha de conexão */}
                <View style={{ alignItems: "center" }}>
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      backgroundColor: `${colors.primary}22`,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 2,
                      borderColor: `${colors.primary}40`,
                    }}
                  >
                    <IconSymbol name={step.icon} size={20} color={colors.primary} />
                  </View>
                  {i < STEPS.length - 1 && (
                    <View
                      style={{
                        width: 2,
                        flex: 1,
                        backgroundColor: `${colors.primary}30`,
                        marginTop: 4,
                        marginBottom: -4,
                        minHeight: 24,
                      }}
                    />
                  )}
                </View>
                <View style={{ flex: 1, paddingTop: 4, paddingBottom: i < STEPS.length - 1 ? 16 : 0 }}>
                  <Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "700" }}>
                    {step.step}. {step.title}
                  </Text>
                  <Text style={{ color: colors.muted, fontSize: 14, marginTop: 4, lineHeight: 20 }}>
                    {step.desc}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Dica */}
          <View
            style={{
              backgroundColor: `${colors.secondary}15`,
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: `${colors.secondary}30`,
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Text style={{ fontSize: 20 }}>💡</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "700" }}>Dica</Text>
              <Text style={{ color: colors.muted, fontSize: 13, marginTop: 4, lineHeight: 18 }}>
                Posicione o smartphone secundário em um suporte ou apoio para ter as mãos livres durante a aula. Ângulo ideal: 45° apontando para o instrumento.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
