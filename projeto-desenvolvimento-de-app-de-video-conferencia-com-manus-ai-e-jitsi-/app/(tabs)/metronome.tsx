import { Text, View, TouchableOpacity, Animated } from "react-native";
import { useState, useEffect, useRef, useCallback } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

const TIME_SIGNATURES = ["2/4", "3/4", "4/4", "6/8"] as const;
type TimeSignature = typeof TIME_SIGNATURES[number];

const getBeatsPerMeasure = (sig: TimeSignature) => {
  if (sig === "2/4") return 2;
  if (sig === "3/4") return 3;
  if (sig === "6/8") return 6;
  return 4;
};

export default function MetronomeScreen() {
  const colors = useColors();
  const [bpm, setBpm] = useState(80);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [timeSig, setTimeSig] = useState<TimeSignature>("4/4");
  const [tapTimes, setTapTimes] = useState<number[]>([]);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const beatRef = useRef(0);

  const totalBeats = getBeatsPerMeasure(timeSig);

  const triggerBeat = useCallback(() => {
    beatRef.current = (beatRef.current % totalBeats) + 1;
    setCurrentBeat(beatRef.current);

    // Pulse animation
    Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.08, duration: 60, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();

    // Border flash
    Animated.sequence([
      Animated.timing(borderAnim, { toValue: 1, duration: 50, useNativeDriver: false }),
      Animated.timing(borderAnim, { toValue: 0, duration: 200, useNativeDriver: false }),
    ]).start();

    // Haptic feedback
    if (Platform.OS !== "web") {
      if (beatRef.current === 1) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  }, [totalBeats, pulseAnim, borderAnim]);

  useEffect(() => {
    if (isPlaying) {
      beatRef.current = 0;
      triggerBeat();
      intervalRef.current = setInterval(triggerBeat, (60 / bpm) * 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCurrentBeat(0);
      beatRef.current = 0;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, bpm, timeSig]);

  const handleTap = () => {
    const now = Date.now();
    const newTaps = [...tapTimes, now].slice(-4);
    setTapTimes(newTaps);
    if (newTaps.length >= 2) {
      const intervals = newTaps.slice(1).map((t, i) => t - newTaps[i]);
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const newBpm = Math.round(60000 / avgInterval);
      if (newBpm >= 20 && newBpm <= 300) setBpm(newBpm);
    }
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.border, colors.primary],
  });

  return (
    <ScreenContainer containerClassName="bg-background">
      <Animated.View
        style={{
          flex: 1,
          borderWidth: 4,
          borderColor,
          borderRadius: 0,
        }}
      >
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 16 }}>
          {/* Título */}
          <Text style={{ color: colors.foreground, fontSize: 28, fontWeight: "800", marginBottom: 4 }}>
            Metrônomo
          </Text>
          <Text style={{ color: colors.muted, fontSize: 14, marginBottom: 24 }}>
            Sincronizado com a sala
          </Text>

          {/* BPM Display */}
          <Animated.View
            style={{
              alignItems: "center",
              justifyContent: "center",
              transform: [{ scale: pulseAnim }],
              marginBottom: 24,
            }}
          >
            <View
              style={{
                width: 180,
                height: 180,
                borderRadius: 90,
                backgroundColor: isPlaying ? `${colors.primary}22` : colors.surface,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 3,
                borderColor: isPlaying ? colors.primary : colors.border,
              }}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 64,
                  fontWeight: "800",
                  lineHeight: 72,
                }}
              >
                {bpm}
              </Text>
              <Text style={{ color: colors.muted, fontSize: 16, fontWeight: "600" }}>BPM</Text>
            </View>
          </Animated.View>

          {/* Batidas visuais */}
          <View style={{ flexDirection: "row", justifyContent: "center", gap: 10, marginBottom: 24 }}>
            {Array.from({ length: totalBeats }).map((_, i) => (
              <View
                key={i}
                style={{
                  width: i === 0 ? 20 : 14,
                  height: i === 0 ? 20 : 14,
                  borderRadius: i === 0 ? 10 : 7,
                  backgroundColor:
                    isPlaying && currentBeat === i + 1
                      ? i === 0
                        ? colors.secondary
                        : colors.primary
                      : colors.border,
                }}
              />
            ))}
          </View>

          {/* Controles BPM */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 24 }}>
            <TouchableOpacity
              onPress={() => setBpm((b) => Math.max(20, b - 5))}
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: colors.surface,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: colors.border,
              }}
              activeOpacity={0.8}
            >
              <Text style={{ color: colors.foreground, fontSize: 24, fontWeight: "700" }}>−</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setBpm((b) => Math.max(20, b - 1))}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.surface,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: colors.border,
              }}
              activeOpacity={0.8}
            >
              <Text style={{ color: colors.foreground, fontSize: 18, fontWeight: "700" }}>−</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setBpm((b) => Math.min(300, b + 1))}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.surface,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: colors.border,
              }}
              activeOpacity={0.8}
            >
              <Text style={{ color: colors.foreground, fontSize: 18, fontWeight: "700" }}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setBpm((b) => Math.min(300, b + 5))}
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: colors.surface,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: colors.border,
              }}
              activeOpacity={0.8}
            >
              <Text style={{ color: colors.foreground, fontSize: 24, fontWeight: "700" }}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Compasso */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ color: colors.muted, fontSize: 13, fontWeight: "600", marginBottom: 10, textAlign: "center" }}>
              COMPASSO
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "center", gap: 8 }}>
              {TIME_SIGNATURES.map((sig) => (
                <TouchableOpacity
                  key={sig}
                  onPress={() => setTimeSig(sig)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 12,
                    backgroundColor: timeSig === sig ? colors.primary : colors.surface,
                    borderWidth: 1,
                    borderColor: timeSig === sig ? colors.primary : colors.border,
                  }}
                  activeOpacity={0.8}
                >
                  <Text
                    style={{
                      color: timeSig === sig ? "#FFFFFF" : colors.foreground,
                      fontSize: 15,
                      fontWeight: "700",
                    }}
                  >
                    {sig}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Botões principais */}
          <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
            <TouchableOpacity
              onPress={handleTap}
              style={{
                flex: 1,
                padding: 16,
                borderRadius: 16,
                backgroundColor: colors.surface,
                alignItems: "center",
                borderWidth: 1,
                borderColor: colors.border,
              }}
              activeOpacity={0.75}
            >
              <Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "700" }}>TAP TEMPO</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsPlaying((p) => !p)}
              style={{
                flex: 1,
                padding: 16,
                borderRadius: 16,
                backgroundColor: isPlaying ? colors.error : colors.primary,
                alignItems: "center",
              }}
              activeOpacity={0.85}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "700" }}>
                {isPlaying ? "PARAR" : "INICIAR"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </ScreenContainer>
  );
}
