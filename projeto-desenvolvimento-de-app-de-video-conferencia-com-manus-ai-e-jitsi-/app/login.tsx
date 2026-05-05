import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/use-auth";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { startOAuthLogin } from "@/constants/oauth";
import { Platform } from "react-native";

export default function LoginScreen() {
  const colors = useColors();
  const router = useRouter();
  const { isAuthenticated, loading, refresh } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Se já está autenticado, redireciona para home
  if (isAuthenticated && !loading) {
    router.replace("/(tabs)");
    return null;
  }

  const handleLogin = async () => {
    try {
      setIsLoggingIn(true);
      setError(null);
      await startOAuthLogin();
      // Após o login, o app será redirecionado via deep link
      // Aguarde um pouco e tente atualizar o estado de autenticação
      setTimeout(() => {
        refresh();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
      setIsLoggingIn(false);
    }
  };

  if (loading) {
    return (
      <ScreenContainer containerClassName="bg-background">
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: colors.muted, marginTop: 16, fontSize: 15 }}>Carregando...</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between", paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo e Branding */}
        <View style={{ paddingHorizontal: 20, paddingTop: 40, alignItems: "center", gap: 16 }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 24,
              backgroundColor: colors.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 40 }}>🎵</Text>
          </View>
          <View style={{ alignItems: "center", gap: 8 }}>
            <Text style={{ color: colors.foreground, fontSize: 32, fontWeight: "800" }}>MusiClass</Text>
            <Text style={{ color: colors.muted, fontSize: 15, textAlign: "center", lineHeight: 22 }}>
              Aulas de música ao vivo com professores do mundo inteiro
            </Text>
          </View>
        </View>

        {/* Conteúdo principal */}
        <View style={{ paddingHorizontal: 20, gap: 20 }}>
          {/* Benefícios */}
          <View style={{ gap: 12 }}>
            {[
              { icon: "cloud.fill", text: "Salve seu progresso na nuvem" },
              { icon: "chart.bar.fill", text: "Acompanhe seu desempenho" },
              { icon: "person.2.fill", text: "Conecte com professores" },
              { icon: "star.fill", text: "Desbloqueie conquistas e badges" },
            ].map((item, i) => (
              <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
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
                  <IconSymbol name={item.icon as any} size={18} color={colors.primary} />
                </View>
                <Text style={{ color: colors.foreground, fontSize: 14, flex: 1 }}>{item.text}</Text>
              </View>
            ))}
          </View>

          {/* Mensagem de erro */}
          {error && (
            <View
              style={{
                backgroundColor: `${colors.error}22`,
                borderRadius: 12,
                padding: 12,
                borderWidth: 1,
                borderColor: `${colors.error}40`,
              }}
            >
              <Text style={{ color: colors.error, fontSize: 13, fontWeight: "600" }}>⚠️ {error}</Text>
            </View>
          )}

          {/* Botões de login */}
          <View style={{ gap: 12 }}>
            {/* Google */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoggingIn}
              style={{
                backgroundColor: colors.card,
                borderRadius: 14,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                borderWidth: 1,
                borderColor: colors.border,
                opacity: isLoggingIn ? 0.6 : 1,
              }}
              activeOpacity={0.85}
            >
              {isLoggingIn ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <>
                  <Text style={{ fontSize: 20 }}>🔐</Text>
                  <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: "700" }}>
                    Entrar com Conta
                  </Text>
                </>
              )}
            </TouchableOpacity>


          </View>

          {/* Termos */}
          <Text
            style={{
              color: colors.muted,
              fontSize: 12,
              textAlign: "center",
              lineHeight: 18,
            }}
          >
            Ao fazer login, você concorda com nossos{" "}
            <Text style={{ color: colors.primary, fontWeight: "700" }}>Termos de Serviço</Text> e{" "}
            <Text style={{ color: colors.primary, fontWeight: "700" }}>Política de Privacidade</Text>
          </Text>
        </View>

        {/* Continuar sem login (opcional) */}
        <View style={{ paddingHorizontal: 20, gap: 12 }}>
          <View
            style={{
              height: 1,
              backgroundColor: colors.border,
            }}
          />
          <TouchableOpacity
            onPress={() => router.replace("/(tabs)")}
            style={{
              padding: 14,
              alignItems: "center",
            }}
            activeOpacity={0.7}
          >
            <Text style={{ color: colors.muted, fontSize: 14, fontWeight: "600" }}>
              Continuar sem login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
