import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";

const SAMPLE_SONGS = [
  {
    id: "1",
    title: "Garota de Ipanema",
    artist: "Tom Jobim",
    chords: ["Fmaj7", "G7", "Gm7", "C7", "Fmaj7", "Fm7", "Bb7", "Ebmaj7"],
    key: "Fá Maior",
  },
  {
    id: "2",
    title: "Aquarela",
    artist: "Toquinho",
    chords: ["C", "Am", "F", "G", "C", "Em", "Am", "G7"],
    key: "Dó Maior",
  },
  {
    id: "3",
    title: "Asa Branca",
    artist: "Luiz Gonzaga",
    chords: ["G", "D7", "G", "C", "G", "D7", "G"],
    key: "Sol Maior",
  },
];

export default function MusicBoardScreen() {
  const colors = useColors();
  const router = useRouter();
  const [selected, setSelected] = useState(SAMPLE_SONGS[0]);
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [annotating, setAnnotating] = useState(false);
  const [annotation, setAnnotation] = useState("");
  const [annotations, setAnnotations] = useState<string[]>([]);
  const [zoom, setZoom] = useState(1);

  const addAnnotation = () => {
    if (annotation.trim()) {
      setAnnotations((prev) => [annotation, ...prev]);
      setAnnotation("");
      setAnnotating(false);
    }
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
            paddingBottom: 20,
          }}
        >
          <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 12 }}>
            <IconSymbol name="arrow.left" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
            <View>
              <Text style={{ color: "#FFFFFF", fontSize: 24, fontWeight: "800" }}>Music Board</Text>
              <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, marginTop: 4 }}>
                Partituras e Cifras Sincronizadas
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setSyncEnabled((s) => !s)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 16,
                backgroundColor: syncEnabled ? `${colors.success}33` : "rgba(255,255,255,0.15)",
                borderWidth: 1,
                borderColor: syncEnabled ? colors.success : "rgba(255,255,255,0.3)",
              }}
            >
              <Text
                style={{
                  color: syncEnabled ? colors.success : "rgba(255,255,255,0.7)",
                  fontSize: 12,
                  fontWeight: "700",
                }}
              >
                {syncEnabled ? "● SYNC ON" : "SYNC OFF"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, paddingTop: 20, gap: 20 }}>
          {/* Seletor de música */}
          <View>
            <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: "700", marginBottom: 10 }}>
              Músicas
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", gap: 10, paddingRight: 20 }}>
                {SAMPLE_SONGS.map((song) => (
                  <TouchableOpacity
                    key={song.id}
                    onPress={() => setSelected(song)}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 14,
                      backgroundColor: selected.id === song.id ? colors.primary : colors.card,
                      borderWidth: 1,
                      borderColor: selected.id === song.id ? colors.primary : colors.border,
                      minWidth: 140,
                    }}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={{
                        color: selected.id === song.id ? "#FFFFFF" : colors.foreground,
                        fontSize: 13,
                        fontWeight: "700",
                      }}
                    >
                      {song.title}
                    </Text>
                    <Text
                      style={{
                        color: selected.id === song.id ? "rgba(255,255,255,0.7)" : colors.muted,
                        fontSize: 12,
                        marginTop: 2,
                      }}
                    >
                      {song.artist}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Visualizador de partitura/cifra */}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              padding: 20,
              borderWidth: 1,
              borderColor: colors.border,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            {/* Toolbar */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
                paddingBottom: 12,
                borderBottomWidth: 1,
                borderBottomColor: "#E5E7EB",
              }}
            >
              <View>
                <Text style={{ color: "#1A0A3E", fontSize: 16, fontWeight: "700" }}>{selected.title}</Text>
                <Text style={{ color: "#6B7280", fontSize: 13 }}>
                  {selected.artist} — Tom: {selected.key}
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <TouchableOpacity
                  onPress={() => setZoom((z) => Math.max(0.7, z - 0.1))}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    backgroundColor: "#F3F0FF",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "#7C3AED", fontSize: 16, fontWeight: "700" }}>−</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setZoom((z) => Math.min(1.5, z + 0.1))}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    backgroundColor: "#F3F0FF",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "#7C3AED", fontSize: 16, fontWeight: "700" }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Clave e cifras */}
            <View style={{ alignItems: "center", marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 28 * zoom,
                  letterSpacing: 4,
                  color: "#1A0A3E",
                  fontFamily: "serif",
                  marginBottom: 8,
                }}
              >
                𝄞
              </Text>
              {/* Pentagrama simulado */}
              {[0, 1, 2, 3, 4].map((i) => (
                <View
                  key={i}
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#374151",
                    marginBottom: 10,
                  }}
                />
              ))}
            </View>

            {/* Acordes em grade */}
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {selected.chords.map((chord, i) => (
                <View
                  key={i}
                  style={{
                    paddingHorizontal: 14 * zoom,
                    paddingVertical: 8 * zoom,
                    borderRadius: 10,
                    backgroundColor: i % 4 === 0 ? "#7C3AED" : "#F3F0FF",
                    borderWidth: 1,
                    borderColor: i % 4 === 0 ? "#7C3AED" : "#DDD6FE",
                  }}
                >
                  <Text
                    style={{
                      color: i % 4 === 0 ? "#FFFFFF" : "#7C3AED",
                      fontSize: 16 * zoom,
                      fontWeight: "800",
                    }}
                  >
                    {chord}
                  </Text>
                </View>
              ))}
            </View>

            {/* Anotações */}
            {annotations.length > 0 && (
              <View style={{ marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#E5E7EB" }}>
                <Text style={{ color: "#6B7280", fontSize: 12, fontWeight: "600", marginBottom: 8 }}>
                  ANOTAÇÕES
                </Text>
                {annotations.map((ann, i) => (
                  <View
                    key={i}
                    style={{
                      backgroundColor: "#FFFBEB",
                      borderRadius: 8,
                      padding: 8,
                      marginBottom: 6,
                      borderLeftWidth: 3,
                      borderLeftColor: "#F59E0B",
                    }}
                  >
                    <Text style={{ color: "#1A0A3E", fontSize: 13 }}>{ann}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Controles */}
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity
              onPress={() => setAnnotating((a) => !a)}
              style={{
                flex: 1,
                padding: 14,
                borderRadius: 14,
                backgroundColor: annotating ? `${colors.secondary}22` : colors.surface,
                alignItems: "center",
                borderWidth: 1,
                borderColor: annotating ? colors.secondary : colors.border,
                flexDirection: "row",
                justifyContent: "center",
                gap: 6,
              }}
              activeOpacity={0.8}
            >
              <IconSymbol name="pencil" size={16} color={annotating ? colors.secondary : colors.muted} />
              <Text
                style={{
                  color: annotating ? colors.secondary : colors.foreground,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Anotar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                padding: 14,
                borderRadius: 14,
                backgroundColor: syncEnabled ? `${colors.success}22` : colors.surface,
                alignItems: "center",
                borderWidth: 1,
                borderColor: syncEnabled ? colors.success : colors.border,
                flexDirection: "row",
                justifyContent: "center",
                gap: 6,
              }}
              activeOpacity={0.8}
            >
              <IconSymbol name="wifi" size={16} color={syncEnabled ? colors.success : colors.muted} />
              <Text
                style={{
                  color: syncEnabled ? colors.success : colors.foreground,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Scroll Sync
              </Text>
            </TouchableOpacity>
          </View>

          {/* Campo de anotação */}
          {annotating && (
            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: colors.secondary,
                gap: 10,
              }}
            >
              <TextInput
                value={annotation}
                onChangeText={setAnnotation}
                placeholder="Digite sua anotação..."
                placeholderTextColor={colors.muted}
                multiline
                returnKeyType="done"
                onSubmitEditing={addAnnotation}
                style={{
                  color: colors.foreground,
                  fontSize: 15,
                  minHeight: 60,
                  backgroundColor: colors.surface,
                  borderRadius: 10,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              />
              <TouchableOpacity
                onPress={addAnnotation}
                style={{
                  backgroundColor: colors.secondary,
                  borderRadius: 10,
                  padding: 12,
                  alignItems: "center",
                }}
                activeOpacity={0.85}
              >
                <Text style={{ color: "#1A0A3E", fontSize: 14, fontWeight: "700" }}>Salvar Anotação</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
