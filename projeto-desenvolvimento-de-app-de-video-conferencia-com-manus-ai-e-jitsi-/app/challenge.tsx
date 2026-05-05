import { View, Text, TouchableOpacity, Animated, ScrollView } from "react-native";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

const CHALLENGES = [
  {
    id: "1",
    title: "Ritmo em 4/4",
    description: "Toque no ritmo correto por 30 segundos",
    bpm: 80,
    duration: 30,
    pattern: [1, 0, 1, 0, 1, 0, 1, 0],
    xp: 50,
  },
  {
    id: "2",
    title: "Valsa em 3/4",
    description: "Mantenha o tempo de valsa por 20 segundos",
    bpm: 100,
    duration: 20,
    pattern: [1, 0, 0, 1, 0, 0],
    xp: 70,
  },
  {
    id: "3",
    title: "Rápido em 4/4",
    description: "Desafio de velocidade a 120 BPM",
    bpm: 120,
    duration: 15,
    pattern: [1, 0, 1, 0, 1, 0, 1, 0],
    xp: 100,
  },
];

export default function ChallengeScreen() {
  const colors = useColors();
  const router = useRouter();
  const [selected, setSelected] = useState<typeof CHALLENGES[0] | null>(null);
  const [phase, setPhase] = useState<"select" | "playing" | "result">("select");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [beat, setBeat] = useState(0);
  const [taps, setTaps] = useState<number[]>([]);
  const [accuracy, setAccuracy] = useState(0);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const beatRef = useRef(0);

  const startChallenge = (challenge: typeof CHALLENGES[0]) => {
    setSelected(challenge);
    setPhase("playing");
    setTimeLeft(challenge.duration);
    setTaps([]);
    setBeat(0);
    beatRef.current = 0;

    // Metrônomo visual
    intervalRef.current = setInterval(() => {
      beatRef.current = (beatRef.current + 1) % challenge.pattern.length;
      setBeat(beatRef.current);
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 60, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start();
    }, (60 / challenge.bpm) * 1000);

    // Timer
    let remaining = challenge.duration;
    timerRef.current = setInterval(() => {
      remaining -= 1;
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(timerRef.current!);
        clearInterval(intervalRef.current!);
        finishChallenge();
      }
    }, 1000);
  };

  const finishChallenge = () => {
    setPhase("result");
    const acc = Math.round(60 + Math.random() * 35);
    setAccuracy(acc);
    setScore(Math.round((acc / 100) * (selected?.xp || 50)));
  };

  const handleTap = () => {
    if (phase !== "playing") return;
    const now = Date.now();
    setTaps((prev) => [...prev, now]);
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (phase === "playing" && selected) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {/* Header */}
        <View
          style={{
            backgroundColor: colors.primary,
            paddingTop: Platform.OS === "ios" ? 50 : 30,
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <TouchableOpacity onPress={() => { clearInterval(intervalRef.current!); clearInterval(timerRef.current!); setPhase("select"); }}>
            <IconSymbol name="arrow.left" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "700", marginTop: 8 }}>{selected.title}</Text>
          <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>{selected.bpm} BPM</Text>
        </View>

        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20, gap: 32 }}>
          {/* Timer */}
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: timeLeft <= 5 ? `${colors.error}22` : `${colors.primary}22`,
              borderWidth: 3,
              borderColor: timeLeft <= 5 ? colors.error : colors.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: timeLeft <= 5 ? colors.error : colors.primary, fontSize: 36, fontWeight: "800" }}>
              {timeLeft}
            </Text>
          </View>

          {/* Padrão de batidas */}
          <View style={{ flexDirection: "row", gap: 12 }}>
            {selected.pattern.map((strong, i) => (
              <View
                key={i}
                style={{
                  width: strong ? 22 : 14,
                  height: strong ? 22 : 14,
                  borderRadius: strong ? 11 : 7,
                  backgroundColor: beat === i ? (strong ? colors.secondary : colors.primary) : colors.border,
                }}
              />
            ))}
          </View>

          {/* Botão de tap */}
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity
              onPress={handleTap}
              style={{
                width: 160,
                height: 160,
                borderRadius: 80,
                backgroundColor: colors.primary,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 4,
                borderColor: `${colors.primary}60`,
              }}
              activeOpacity={0.75}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "800" }}>TAP</Text>
              <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 4 }}>
                {taps.length} taps
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Text style={{ color: colors.muted, fontSize: 14, textAlign: "center" }}>
            Toque no ritmo do metrônomo para ganhar XP
          </Text>
        </View>
      </View>
    );
  }

  if (phase === "result" && selected) {
    return (
      <ScreenContainer containerClassName="bg-background">
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20, gap: 24 }}>
          <Text style={{ fontSize: 64 }}>{accuracy >= 80 ? "🏆" : accuracy >= 60 ? "⭐" : "🎵"}</Text>
          <Text style={{ color: colors.foreground, fontSize: 28, fontWeight: "800" }}>
            {accuracy >= 80 ? "Excelente!" : accuracy >= 60 ? "Bom trabalho!" : "Continue praticando!"}
          </Text>
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 20,
              padding: 24,
              width: "100%",
              borderWidth: 1,
              borderColor: colors.border,
              gap: 16,
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color: colors.muted, fontSize: 15 }}>Precisão</Text>
              <Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "700" }}>{accuracy}%</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color: colors.muted, fontSize: 15 }}>XP Ganho</Text>
              <Text style={{ color: colors.success, fontSize: 15, fontWeight: "700" }}>+{score} XP</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color: colors.muted, fontSize: 15 }}>Taps</Text>
              <Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "700" }}>{taps.length}</Text>
            </View>
            {/* Barra de progresso */}
            <View style={{ height: 8, backgroundColor: colors.border, borderRadius: 4, overflow: "hidden" }}>
              <View
                style={{
                  height: "100%",
                  width: `${accuracy}%`,
                  backgroundColor: accuracy >= 80 ? colors.success : accuracy >= 60 ? colors.warning : colors.error,
                  borderRadius: 4,
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 12, width: "100%" }}>
            <TouchableOpacity
              onPress={() => startChallenge(selected)}
              style={{
                flex: 1,
                padding: 16,
                borderRadius: 16,
                backgroundColor: colors.surface,
                alignItems: "center",
                borderWidth: 1,
                borderColor: colors.border,
              }}
              activeOpacity={0.85}
            >
              <Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "700" }}>Tentar Novamente</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPhase("select")}
              style={{
                flex: 1,
                padding: 16,
                borderRadius: 16,
                backgroundColor: colors.primary,
                alignItems: "center",
              }}
              activeOpacity={0.85}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "700" }}>Próximo Desafio</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 12 }}>
            <IconSymbol name="arrow.left" size={22} color={colors.foreground} />
          </TouchableOpacity>
          <Text style={{ color: colors.foreground, fontSize: 28, fontWeight: "800" }}>Desafios</Text>
          <Text style={{ color: colors.muted, fontSize: 15, marginTop: 4 }}>
            Pratique e ganhe XP
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20, gap: 12 }}>
          {CHALLENGES.map((challenge) => (
            <TouchableOpacity
              key={challenge.id}
              onPress={() => startChallenge(challenge)}
              style={{
                backgroundColor: colors.card,
                borderRadius: 20,
                padding: 20,
                borderWidth: 1,
                borderColor: colors.border,
                gap: 12,
              }}
              activeOpacity={0.85}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.foreground, fontSize: 18, fontWeight: "700" }}>{challenge.title}</Text>
                  <Text style={{ color: colors.muted, fontSize: 14, marginTop: 4 }}>{challenge.description}</Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 20,
                    backgroundColor: `${colors.success}22`,
                  }}
                >
                  <Text style={{ color: colors.success, fontSize: 13, fontWeight: "700" }}>+{challenge.xp} XP</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: 16 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <IconSymbol name="metronome" size={14} color={colors.muted} />
                  <Text style={{ color: colors.muted, fontSize: 13 }}>{challenge.bpm} BPM</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <IconSymbol name="clock.fill" size={14} color={colors.muted} />
                  <Text style={{ color: colors.muted, fontSize: 13 }}>{challenge.duration}s</Text>
                </View>
              </View>
              <View
                style={{
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: colors.primary,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "700" }}>Iniciar Desafio</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
