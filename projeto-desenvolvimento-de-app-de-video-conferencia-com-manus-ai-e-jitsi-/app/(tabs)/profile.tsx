import { ScrollView, Text, View, TouchableOpacity, Switch } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";

const BADGES = [
  { id: "1", label: "Primeiro Acorde", icon: "music.note", earned: true },
  { id: "2", label: "Ritmo Perfeito", icon: "metronome", earned: true },
  { id: "3", label: "5 Aulas", icon: "star.fill", earned: true },
  { id: "4", label: "Mestre do Tempo", icon: "clock.fill", earned: false },
  { id: "5", label: "Solista", icon: "guitars", earned: false },
  { id: "6", label: "Campeão", icon: "trophy.fill", earned: false },
];

const HISTORY = [
  { id: "1", name: "Aula de Violão", date: "04/05/2026", duration: "45 min" },
  { id: "2", name: "Teoria Musical", date: "03/05/2026", duration: "60 min" },
  { id: "3", name: "Piano Iniciante", date: "01/05/2026", duration: "30 min" },
];

export default function ProfileScreen() {
  const colors = useColors();
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header com avatar */}
        <View
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 32,
            alignItems: "center",
            borderBottomLeftRadius: 28,
            borderBottomRightRadius: 28,
          }}
        >
          <View
            style={{
              width: 88,
              height: 88,
              borderRadius: 44,
              backgroundColor: "rgba(255,255,255,0.25)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 12,
              borderWidth: 3,
              borderColor: "rgba(255,255,255,0.5)",
            }}
          >
            <IconSymbol name="person.fill" size={44} color="#FFFFFF" />
          </View>
          <Text style={{ color: "#FFFFFF", fontSize: 22, fontWeight: "700" }}>Músico</Text>
          <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, marginTop: 4 }}>
            {role === "student" ? "Aluno" : "Professor"}
          </Text>

          {/* XP e Nível */}
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              marginTop: 16,
              backgroundColor: "rgba(255,255,255,0.15)",
              borderRadius: 16,
              paddingHorizontal: 24,
              paddingVertical: 12,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "800" }}>320</Text>
              <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>XP Total</Text>
            </View>
            <View style={{ width: 1, backgroundColor: "rgba(255,255,255,0.3)" }} />
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "800" }}>Nível 3</Text>
              <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>Músico</Text>
            </View>
            <View style={{ width: 1, backgroundColor: "rgba(255,255,255,0.3)" }} />
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "800" }}>8</Text>
              <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>Aulas</Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, paddingTop: 24, gap: 24 }}>
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
              Meu Papel
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
                      marginTop: 6,
                    }}
                  >
                    {r === "student" ? "Aluno" : "Professor"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Conquistas */}
          <View>
            <Text style={{ color: colors.foreground, fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
              Conquistas
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              {BADGES.map((badge) => (
                <View
                  key={badge.id}
                  style={{
                    width: "30%",
                    backgroundColor: badge.earned ? colors.card : colors.surface,
                    borderRadius: 16,
                    padding: 14,
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: badge.earned ? `${colors.secondary}60` : colors.border,
                    opacity: badge.earned ? 1 : 0.5,
                    gap: 6,
                  }}
                >
                  <IconSymbol
                    name={badge.icon as any}
                    size={28}
                    color={badge.earned ? colors.secondary : colors.muted}
                  />
                  <Text
                    style={{
                      color: badge.earned ? colors.foreground : colors.muted,
                      fontSize: 11,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {badge.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Histórico */}
          <View>
            <Text style={{ color: colors.foreground, fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
              Histórico de Aulas
            </Text>
            {HISTORY.map((item) => (
              <View
                key={item.id}
                style={{
                  backgroundColor: colors.card,
                  borderRadius: 14,
                  padding: 14,
                  marginBottom: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: colors.border,
                  gap: 12,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: `${colors.primary}22`,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconSymbol name="checkmark.circle.fill" size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "600" }}>{item.name}</Text>
                  <Text style={{ color: colors.muted, fontSize: 12, marginTop: 2 }}>{item.date}</Text>
                </View>
                <Text style={{ color: colors.muted, fontSize: 13 }}>{item.duration}</Text>
              </View>
            ))}
          </View>

          {/* Configurações */}
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
              Configurações
            </Text>
            {[
              {
                label: "Notificações",
                icon: "bell.fill" as const,
                value: notifications,
                onChange: setNotifications,
              },
              {
                label: "Modo Escuro",
                icon: "moon.fill" as const,
                value: darkMode,
                onChange: setDarkMode,
              },
            ].map((setting, i) => (
              <View
                key={setting.label}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  paddingVertical: 14,
                  borderTopWidth: i === 0 ? 1 : 0,
                  borderTopColor: colors.border,
                  gap: 12,
                }}
              >
                <IconSymbol name={setting.icon} size={20} color={colors.primary} />
                <Text style={{ flex: 1, color: colors.foreground, fontSize: 15 }}>{setting.label}</Text>
                <Switch
                  value={setting.value}
                  onValueChange={setting.onChange}
                  trackColor={{ false: colors.border, true: `${colors.primary}80` }}
                  thumbColor={setting.value ? colors.primary : colors.muted}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
