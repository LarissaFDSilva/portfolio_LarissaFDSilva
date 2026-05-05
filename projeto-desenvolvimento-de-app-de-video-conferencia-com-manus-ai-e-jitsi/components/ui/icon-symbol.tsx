// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Partial<Record<SymbolViewProps["name"], ComponentProps<typeof MaterialIcons>["name"]>>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * SF Symbols to Material Icons mappings for MusiClass
 */
const MAPPING = {
  // Default
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  // MusiClass tabs
  "music.note": "music-note",
  "video.fill": "videocam",
  "metronome": "timer",
  "person.fill": "person",
  // Room / Classroom
  "play.fill": "play-arrow",
  "stop.fill": "stop",
  "mic.fill": "mic",
  "mic.slash.fill": "mic-off",
  "camera.fill": "videocam",
  "camera.slash.fill": "videocam-off",
  "chat.bubble.fill": "chat",
  "hand.raised.fill": "back-hand",
  "xmark": "close",
  "xmark.circle.fill": "cancel",
  // Music Board
  "doc.text.fill": "description",
  "pencil": "edit",
  "magnifyingglass": "search",
  "arrow.up.arrow.down": "swap-vert",
  // Metronome
  "speaker.wave.2.fill": "volume-up",
  "waveform": "graphic-eq",
  "plus": "add",
  "minus": "remove",
  // QR Code
  "qrcode": "qr-code",
  "qrcode.viewfinder": "qr-code-scanner",
  // Performance
  "star.fill": "star",
  "heart.fill": "favorite",
  "flame.fill": "local-fire-department",
  "hands.clap.fill": "emoji-people",
  // Gamification
  "trophy.fill": "emoji-events",
  "checkmark.circle.fill": "check-circle",
  "clock.fill": "access-time",
  // Settings
  "gear": "settings",
  "bell.fill": "notifications",
  "moon.fill": "dark-mode",
  "sun.max.fill": "light-mode",
  "arrow.left": "arrow-back",
  "info.circle": "info",
  "wifi": "wifi",
  "wifi.slash": "wifi-off",
  "music.quarternote.3": "queue-music",
  "guitars": "piano",
  "music.note.list": "library-music",
  "tuningfork": "tune",
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
