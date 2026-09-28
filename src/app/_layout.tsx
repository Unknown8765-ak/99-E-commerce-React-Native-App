import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

import { AuthProvider, useAuth } from "@/context/auth-context";
import { CartProvider } from "@/context/cart-context";

SplashScreen.preventAutoHideAsync().catch(() => {});

function AuthGuard() {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    SplashScreen.hideAsync();

    const currentGroup = segments[0];

    const isAuthScreen = currentGroup === "auth";
    const isTabsScreen = currentGroup === "(tabs)";

    if (!isAuthenticated && isTabsScreen) {
      router.replace("/auth/login");
      return;
    }

    if (isAuthenticated && isAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, isLoading, segments, router]);

  if (isLoading) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="product/[id]"
        options={{
          title: "Product Details",
          headerBackTitle: "Back",
        }}
      />

      <Stack.Screen
        name="auth/login"
        options={{
          title: "Login",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="auth/register"
        options={{
          title: "Register",
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <AuthGuard />
      </CartProvider>
    </AuthProvider>
  );
}