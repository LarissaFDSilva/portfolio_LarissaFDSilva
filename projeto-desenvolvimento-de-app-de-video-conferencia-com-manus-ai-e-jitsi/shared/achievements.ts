/**
 * Sistema de Conquistas do MusiClass
 * Define todos os emblemas, critérios de desbloqueio e recompensas
 */

export type AchievementTier = "bronze" | "silver" | "gold" | "platinum";
export type AchievementCategory = "lessons" | "challenges" | "xp" | "instruments" | "social" | "milestones";

export interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  tier: AchievementTier;
  icon: string; // emoji or icon name
  criteria: AchievementCriteria;
  xpReward: number;
  unlockedMessage: string;
}

export interface AchievementCriteria {
  type: "lessons_attended" | "challenges_completed" | "xp_earned" | "instrument_mastery" | "streak" | "accuracy" | "social";
  target: number;
  metadata?: Record<string, any>;
}

// Definição de todas as conquistas
export const ACHIEVEMENTS: Record<string, AchievementDefinition> = {
  // ============ AULAS (Lessons) ============
  first_lesson: {
    id: "first_lesson",
    name: "Primeiro Passo",
    description: "Frequente sua primeira aula",
    category: "lessons",
    tier: "bronze",
    icon: "🎓",
    criteria: { type: "lessons_attended", target: 1 },
    xpReward: 10,
    unlockedMessage: "Parabéns! Você começou sua jornada musical! 🎵",
  },
  ten_lessons: {
    id: "ten_lessons",
    name: "Aprendiz Dedicado",
    description: "Frequente 10 aulas",
    category: "lessons",
    tier: "bronze",
    icon: "📚",
    criteria: { type: "lessons_attended", target: 10 },
    xpReward: 50,
    unlockedMessage: "Você é um aprendiz dedicado! Continue assim! 💪",
  },
  fifty_lessons: {
    id: "fifty_lessons",
    name: "Veterano das Aulas",
    description: "Frequente 50 aulas",
    category: "lessons",
    tier: "silver",
    icon: "🏆",
    criteria: { type: "lessons_attended", target: 50 },
    xpReward: 200,
    unlockedMessage: "50 aulas! Você é um verdadeiro músico! 🎼",
  },
  hundred_lessons: {
    id: "hundred_lessons",
    name: "Mestre das Aulas",
    description: "Frequente 100 aulas",
    category: "lessons",
    tier: "gold",
    icon: "👑",
    criteria: { type: "lessons_attended", target: 100 },
    xpReward: 500,
    unlockedMessage: "100 aulas! Você é uma lenda! 🌟",
  },

  // ============ DESAFIOS (Challenges) ============
  first_challenge: {
    id: "first_challenge",
    name: "Aceita o Desafio",
    description: "Complete seu primeiro desafio",
    category: "challenges",
    tier: "bronze",
    icon: "⚡",
    criteria: { type: "challenges_completed", target: 1 },
    xpReward: 15,
    unlockedMessage: "Você completou seu primeiro desafio! 🎯",
  },
  five_challenges: {
    id: "five_challenges",
    name: "Desafiador",
    description: "Complete 5 desafios",
    category: "challenges",
    tier: "bronze",
    icon: "🎪",
    criteria: { type: "challenges_completed", target: 5 },
    xpReward: 75,
    unlockedMessage: "5 desafios! Você está no caminho certo! 🚀",
  },
  twenty_challenges: {
    id: "twenty_challenges",
    name: "Campeão de Desafios",
    description: "Complete 20 desafios",
    category: "challenges",
    tier: "silver",
    icon: "🥇",
    criteria: { type: "challenges_completed", target: 20 },
    xpReward: 250,
    unlockedMessage: "20 desafios completados! Você é um campeão! 🏅",
  },
  perfect_accuracy: {
    id: "perfect_accuracy",
    name: "Precisão Perfeita",
    description: "Complete um desafio com 100% de precisão",
    category: "challenges",
    tier: "gold",
    icon: "🎯",
    criteria: { type: "accuracy", target: 100 },
    xpReward: 150,
    unlockedMessage: "Perfeição! 100% de precisão! 💯",
  },

  // ============ XP (Experience Points) ============
  hundred_xp: {
    id: "hundred_xp",
    name: "Iniciante",
    description: "Ganhe 100 XP",
    category: "xp",
    tier: "bronze",
    icon: "⭐",
    criteria: { type: "xp_earned", target: 100 },
    xpReward: 0,
    unlockedMessage: "Você ganhou 100 XP! Bom começo! 🌱",
  },
  five_hundred_xp: {
    id: "five_hundred_xp",
    name: "Experiente",
    description: "Ganhe 500 XP",
    category: "xp",
    tier: "silver",
    icon: "✨",
    criteria: { type: "xp_earned", target: 500 },
    xpReward: 0,
    unlockedMessage: "500 XP! Você está progredindo! 📈",
  },
  thousand_xp: {
    id: "thousand_xp",
    name: "Mestre da Experiência",
    description: "Ganhe 1000 XP",
    category: "xp",
    tier: "gold",
    icon: "🔥",
    criteria: { type: "xp_earned", target: 1000 },
    xpReward: 0,
    unlockedMessage: "1000 XP! Você é uma potência! ⚡",
  },
  five_thousand_xp: {
    id: "five_thousand_xp",
    name: "Lenda Viva",
    description: "Ganhe 5000 XP",
    category: "xp",
    tier: "platinum",
    icon: "💎",
    criteria: { type: "xp_earned", target: 5000 },
    xpReward: 0,
    unlockedMessage: "5000 XP! Você é uma lenda! 👑",
  },

  // ============ INSTRUMENTOS (Instruments) ============
  violin_master: {
    id: "violin_master",
    name: "Mestre do Violino",
    description: "Domine o violino com 500 XP",
    category: "instruments",
    tier: "gold",
    icon: "🎻",
    criteria: { type: "instrument_mastery", target: 500, metadata: { instrument: "violin" } },
    xpReward: 300,
    unlockedMessage: "Você dominou o violino! 🎻✨",
  },
  piano_master: {
    id: "piano_master",
    name: "Mestre do Piano",
    description: "Domine o piano com 500 XP",
    category: "instruments",
    tier: "gold",
    icon: "🎹",
    criteria: { type: "instrument_mastery", target: 500, metadata: { instrument: "piano" } },
    xpReward: 300,
    unlockedMessage: "Você dominou o piano! 🎹✨",
  },
  guitar_master: {
    id: "guitar_master",
    name: "Mestre da Guitarra",
    description: "Domine a guitarra com 500 XP",
    category: "instruments",
    tier: "gold",
    icon: "🎸",
    criteria: { type: "instrument_mastery", target: 500, metadata: { instrument: "guitar" } },
    xpReward: 300,
    unlockedMessage: "Você dominou a guitarra! 🎸✨",
  },
  multi_instrumentalist: {
    id: "multi_instrumentalist",
    name: "Polímata Musical",
    description: "Domine 3 instrumentos diferentes",
    category: "instruments",
    tier: "platinum",
    icon: "🎼",
    criteria: { type: "instrument_mastery", target: 3 },
    xpReward: 500,
    unlockedMessage: "Você é um polímata musical! 🎼👑",
  },

  // ============ SEQUÊNCIAS (Streaks) ============
  week_streak: {
    id: "week_streak",
    name: "Semana Consistente",
    description: "Frequente aulas por 7 dias consecutivos",
    category: "milestones",
    tier: "silver",
    icon: "🔥",
    criteria: { type: "streak", target: 7 },
    xpReward: 100,
    unlockedMessage: "7 dias de aulas! Você é consistente! 🔥",
  },
  month_streak: {
    id: "month_streak",
    name: "Mês Completo",
    description: "Frequente aulas por 30 dias consecutivos",
    category: "milestones",
    tier: "gold",
    icon: "🌟",
    criteria: { type: "streak", target: 30 },
    xpReward: 300,
    unlockedMessage: "30 dias de aulas! Você é dedicado! 🌟",
  },

  // ============ SOCIAIS (Social) ============
  first_friend: {
    id: "first_friend",
    name: "Fazendo Amigos",
    description: "Adicione seu primeiro amigo",
    category: "social",
    tier: "bronze",
    icon: "👫",
    criteria: { type: "social", target: 1, metadata: { action: "add_friend" } },
    xpReward: 20,
    unlockedMessage: "Você fez seu primeiro amigo! 👫",
  },
  ten_friends: {
    id: "ten_friends",
    name: "Socialista",
    description: "Tenha 10 amigos",
    category: "social",
    tier: "silver",
    icon: "👥",
    criteria: { type: "social", target: 10, metadata: { action: "friends_count" } },
    xpReward: 100,
    unlockedMessage: "10 amigos! Você é sociável! 👥",
  },

  // ============ MARCOS (Milestones) ============
  level_five: {
    id: "level_five",
    name: "Nível 5 Alcançado",
    description: "Atinja o nível 5",
    category: "milestones",
    tier: "bronze",
    icon: "📈",
    criteria: { type: "xp_earned", target: 400 }, // 500 XP = Level 5
    xpReward: 0,
    unlockedMessage: "Nível 5! Você está crescendo! 📈",
  },
  level_ten: {
    id: "level_ten",
    name: "Nível 10 Alcançado",
    description: "Atinja o nível 10",
    category: "milestones",
    tier: "silver",
    icon: "🎖️",
    criteria: { type: "xp_earned", target: 900 }, // 1000 XP = Level 10
    xpReward: 0,
    unlockedMessage: "Nível 10! Você é um veterano! 🎖️",
  },
  level_twenty: {
    id: "level_twenty",
    name: "Nível 20 Alcançado",
    description: "Atinja o nível 20",
    category: "milestones",
    tier: "gold",
    icon: "👑",
    criteria: { type: "xp_earned", target: 1900 }, // 2000 XP = Level 20
    xpReward: 0,
    unlockedMessage: "Nível 20! Você é uma lenda! 👑",
  },
};

// Agrupar conquistas por tier
export const ACHIEVEMENTS_BY_TIER: Record<AchievementTier, AchievementDefinition[]> = {
  bronze: Object.values(ACHIEVEMENTS).filter((a) => a.tier === "bronze"),
  silver: Object.values(ACHIEVEMENTS).filter((a) => a.tier === "silver"),
  gold: Object.values(ACHIEVEMENTS).filter((a) => a.tier === "gold"),
  platinum: Object.values(ACHIEVEMENTS).filter((a) => a.tier === "platinum"),
};

// Agrupar conquistas por categoria
export const ACHIEVEMENTS_BY_CATEGORY: Record<AchievementCategory, AchievementDefinition[]> = {
  lessons: Object.values(ACHIEVEMENTS).filter((a) => a.category === "lessons"),
  challenges: Object.values(ACHIEVEMENTS).filter((a) => a.category === "challenges"),
  xp: Object.values(ACHIEVEMENTS).filter((a) => a.category === "xp"),
  instruments: Object.values(ACHIEVEMENTS).filter((a) => a.category === "instruments"),
  social: Object.values(ACHIEVEMENTS).filter((a) => a.category === "social"),
  milestones: Object.values(ACHIEVEMENTS).filter((a) => a.category === "milestones"),
};

// Função para obter cor baseada no tier
export function getTierColor(tier: AchievementTier): string {
  const colors: Record<AchievementTier, string> = {
    bronze: "#CD7F32",
    silver: "#C0C0C0",
    gold: "#FFD700",
    platinum: "#E5E4E2",
  };
  return colors[tier];
}

// Função para obter cor de fundo baseada no tier
export function getTierBackgroundColor(tier: AchievementTier): string {
  const colors: Record<AchievementTier, string> = {
    bronze: "#CD7F3222",
    silver: "#C0C0C022",
    gold: "#FFD70022",
    platinum: "#E5E4E222",
  };
  return colors[tier];
}
