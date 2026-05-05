import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";

const CHALLENGES = [
  { id: "1", title: "Ritmo em 4/4", desc: "Mantenha o tempo por 2 minutos", xp: 50, icon: "clock.fill" as const },
  { id: "2", title: "Escala de Dó", desc: "Toque a escala sem erros", xp: 30, icon: "music.note" as const },
  { id: "3", title: "Acorde Perfeito", desc: "Identifique 5 acordes seguidos", xp: 80, icon: "tuningfork" as const },
];

const RECENT_ROOMS = [
  { id: "1", name: "Aula de Violão", host: "Prof. Carlos", status: "ao vivo", code: "VIOLAO01" },
  { id: "2", name: "Teoria Musical", host: "Prof. Ana", status: "agendada", code: "TEORIA02" },
];

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 24,
            backgroundColor: colors.primary,
            borderBottomLeftRadius: 28,
            borderBottomRightRadius: 28,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <View>
              <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}>Bem-vindo de volta</Text>
              <Text style={{ color: "#FFFFFF", fontSize: 22, fontWeight: "700" }}>Músico</Text>
            </View>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: "rgba(255,255,255,0.2)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconSymbol name="person.fill" size={22} color="#FFFFFF" />
            </View>
          </View>

          {/* CTA Principal */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/rooms")}
            style={{
              backgroundColor: colors.secondary,
              borderRadius: 16,
              padding: 18,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            activeOpacity={0.85}
          >
            <View>
              <Text style={{ color: "#1A0A3E", fontSize: 18, fontWeight: "700" }}>Entrar em uma Aula</Text>
              <Text style={{ color: "rgba(26,10,62,0.7)", fontSize: 13, marginTop: 2 }}>
                Digite o código ou escolha uma sala
              </Text>
            </View>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: "rgba(26,10,62,0.15)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconSymbol name="play.fill" size={22} color="#1A0A3E" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 20, paddingTop: 24, gap: 24 }}>
          {/* Salas Recentes */}
          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <Text style={{ color: colors.foreground, fontSize: 18, fontWeight: "700" }}>Salas Recentes</Text>
              <TouchableOpacity onPress={() => router.push("/(tabs)/rooms")}>
                <Text style={{ color: colors.primary, fontSize: 14, fontWeight: "600" }}>Ver todas</Text>
              </TouchableOpacity>
            </View>
            {RECENT_ROOMS.map((room) => (
              <TouchableOpacity
                key={room.id}
                onPress={() =>
                  router.push({
                    pathname: "/pre-join" as any,
                    params: { roomName: room.code, roomTitle: room.name },
                  })
                }
                style={{
                  backgroundColor: colors.card,
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: colors.border,
                  gap: 12,
                }}
                activeOpacity={0.8}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    backgroundColor: room.status === "ao vivo" ? `${colors.success}22` : `${colors.primary}22`,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconSymbol
                    name="video.fill"
                    size={22}
                    color={room.status === "ao vivo" ? colors.success : colors.primary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "600" }}>{room.name}</Text>
                  <Text style={{ color: colors.muted, fontSize: 13, marginTop: 2 }}>{room.host}</Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 20,
                    backgroundColor: room.status === "ao vivo" ? `${colors.success}22` : `${colors.warning}22`,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "700",
                      color: room.status === "ao vivo" ? colors.success : colors.warning,
                    }}
                  >
                    {room.status === "ao vivo" ? "● AO VIVO" : "AGENDADA"}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Desafios do Dia */}
          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <Text style={{ color: colors.foreground, fontSize: 18, fontWeight: "700" }}>Desafios do Dia</Text>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 20,
                  backgroundColor: `${colors.secondary}22`,
                }}
              >
                <Text style={{ color: colors.secondary, fontSize: 12, fontWeight: "700" }}>+XP</Text>
              </View>
            </View>
            {CHALLENGES.map((challenge) => (
              <TouchableOpacity
                key={challenge.id}
                onPress={() => router.push("/challenge" as any)}
                style={{
                  backgroundColor: colors.card,
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: colors.border,
                  gap: 12,
                }}
                activeOpacity={0.8}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    backgroundColor: `${colors.primary}22`,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconSymbol name={challenge.icon} size={22} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "600" }}>{challenge.title}</Text>
                  <Text style={{ color: colors.muted, fontSize: 13, marginTop: 2 }}>{challenge.desc}</Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 20,
                    backgroundColor: `${colors.success}22`,
                  }}
                >
                  <Text style={{ color: colors.success, fontSize: 12, fontWeight: "700" }}>+{challenge.xp} XP</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Ferramentas Rápidas */}
          <View>
            <Text style={{ color: colors.foreground, fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
              Ferramentas
            </Text>
            <View style={{ flexDirection: "row", gap: 12 }}>
              {[
                { label: "Metrônomo", icon: "metronome" as const, route: "/(tabs)/metronome", color: colors.primary },
                { label: "Music Board", icon: "music.note.list" as const, route: "/music-board", color: colors.accent },
                { label: "Perfil", icon: "person.fill" as const, route: "/(tabs)/profile", color: colors.success },
              ].map((tool) => (
                <TouchableOpacity
                  key={tool.label}
                  onPress={() => router.push(tool.route as any)}
                  style={{
                    flex: 1,
                    backgroundColor: colors.card,
                    borderRadius: 16,
                    padding: 16,
                    alignItems: "center",
                    gap: 8,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                  activeOpacity={0.8}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: `${tool.color}22`,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconSymbol name={tool.icon} size={22} color={tool.color} />
                  </View>
                  <Text style={{ color: colors.foreground, fontSize: 12, fontWeight: "600", textAlign: "center" }}>
                    {tool.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
