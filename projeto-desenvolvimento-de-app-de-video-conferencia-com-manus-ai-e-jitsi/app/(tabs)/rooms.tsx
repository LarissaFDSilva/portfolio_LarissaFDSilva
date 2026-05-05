import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";

const SAMPLE_ROOMS = [
  { id: "1", name: "Aula de Violão", host: "Prof. Carlos", status: "live", participants: 3, code: "VIOLAO01" },
  { id: "2", name: "Teoria Musical Avançada", host: "Prof. Ana", status: "scheduled", participants: 0, code: "TEORIA02" },
  { id: "3", name: "Piano para Iniciantes", host: "Prof. Marcos", status: "live", participants: 5, code: "PIANO03" },
  { id: "4", name: "Percussão e Ritmo", host: "Prof. Beatriz", status: "scheduled", participants: 0, code: "PERCUS04" },
];

export default function RoomsScreen() {
  const colors = useColors();
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");
  const [roomName, setRoomName] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const handlePreJoin = (code: string, name: string) => {
    if (!code.trim()) {
      Alert.alert("Código necessário", "Por favor, insira o código da sala.");
      return;
    }
    router.push({
      pathname: "/pre-join" as any,
      params: { roomName: code.trim().toUpperCase(), roomTitle: name || code },
    });
  };

  const handleCreateRoom = () => {
    if (!roomName.trim()) {
      Alert.alert("Nome necessário", "Por favor, insira o nome da sala.");
      return;
    }
    const code = roomName.replace(/\s+/g, "").toUpperCase().slice(0, 10);
    router.push({
      pathname: "/pre-join" as any,
      params: { roomName: code, roomTitle: roomName },
    });
  };

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20 }}>
          <Text style={{ color: colors.foreground, fontSize: 28, fontWeight: "800" }}>Salas</Text>
          <Text style={{ color: colors.muted, fontSize: 15, marginTop: 4 }}>
            Entre em uma aula ou crie sua sala
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20, gap: 20 }}>
          {/* Entrar por código */}
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
              Entrar por Código
            </Text>
            <TextInput
              value={roomCode}
              onChangeText={(t) => setRoomCode(t.toUpperCase())}
              placeholder="Ex: VIOLAO01"
              placeholderTextColor={colors.muted}
              autoCapitalize="characters"
              returnKeyType="done"
              onSubmitEditing={() => handlePreJoin(roomCode, roomCode)}
              style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 14,
                fontSize: 18,
                fontWeight: "700",
                color: colors.foreground,
                letterSpacing: 3,
                textAlign: "center",
                borderWidth: 1,
                borderColor: colors.border,
                marginBottom: 12,
              }}
            />
            <TouchableOpacity
              onPress={() => handlePreJoin(roomCode, roomCode)}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 12,
                padding: 14,
                alignItems: "center",
              }}
              activeOpacity={0.85}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "700" }}>Configurar e Entrar</Text>
            </TouchableOpacity>
          </View>

          {/* Criar nova sala */}
          <TouchableOpacity
            onPress={() => setShowCreate(!showCreate)}
            style={{
              backgroundColor: showCreate ? colors.surface : `${colors.primary}15`,
              borderRadius: 20,
              padding: 20,
              borderWidth: 1,
              borderColor: showCreate ? colors.border : `${colors.primary}40`,
            }}
            activeOpacity={0.9}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ color: colors.primary, fontSize: 16, fontWeight: "700" }}>
                + Criar Nova Sala
              </Text>
              <IconSymbol
                name={showCreate ? "xmark" : "chevron.right"}
                size={18}
                color={colors.primary}
              />
            </View>
            {showCreate && (
              <View style={{ marginTop: 16, gap: 12 }}>
                <TextInput
                  value={roomName}
                  onChangeText={setRoomName}
                  placeholder="Nome da sala (ex: Aula de Violão)"
                  placeholderTextColor={colors.muted}
                  returnKeyType="done"
                  style={{
                    backgroundColor: colors.card,
                    borderRadius: 12,
                    padding: 14,
                    fontSize: 15,
                    color: colors.foreground,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                />
                <TouchableOpacity
                  onPress={handleCreateRoom}
                  style={{
                    backgroundColor: colors.primary,
                    borderRadius: 12,
                    padding: 14,
                    alignItems: "center",
                  }}
                  activeOpacity={0.85}
                >
                  <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "700" }}>Criar e Configurar</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>

          {/* Salas disponíveis */}
          <View>
            <Text style={{ color: colors.foreground, fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
              Salas Disponíveis
            </Text>
            {SAMPLE_ROOMS.map((room) => (
              <TouchableOpacity
                key={room.id}
                onPress={() => handlePreJoin(room.code, room.name)}
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
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    backgroundColor: room.status === "live" ? `${colors.success}22` : `${colors.primary}22`,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconSymbol
                    name="video.fill"
                    size={24}
                    color={room.status === "live" ? colors.success : colors.primary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "600" }}>{room.name}</Text>
                  <Text style={{ color: colors.muted, fontSize: 13, marginTop: 2 }}>{room.host}</Text>
                  {room.status === "live" && (
                    <Text style={{ color: colors.muted, fontSize: 12, marginTop: 2 }}>
                      {room.participants} participante{room.participants !== 1 ? "s" : ""}
                    </Text>
                  )}
                </View>
                <View style={{ alignItems: "flex-end", gap: 6 }}>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 20,
                      backgroundColor: room.status === "live" ? `${colors.success}22` : `${colors.warning}22`,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "700",
                        color: room.status === "live" ? colors.success : colors.warning,
                      }}
                    >
                      {room.status === "live" ? "● AO VIVO" : "AGENDADA"}
                    </Text>
                  </View>
                  <Text style={{ color: colors.muted, fontSize: 11 }}>{room.code}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
