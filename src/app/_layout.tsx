import { router, Stack, usePathname, useSegments } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";

function RootLayoutNav() {
  const pathname = usePathname();
  const segments = useSegments();
  const { user, isLoading } = useAuth();

  const isHome = pathname === "/";
  const isTransactions = pathname === "/transactions";
  const isReports = pathname === "/reports";
  const isLoginPage = pathname === "/login" || segments[0] === "login";

  useEffect(() => {
    if (isLoading) return;

    if (!user && !isLoginPage) {
      router.replace("/login");
    } else if (user && isLoginPage) {
      router.replace("/");
    }
  }, [user, isLoading, isLoginPage]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#15803D" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="login" options={{ title: "Masuk" }} />
          <Stack.Screen name="index" options={{ title: "Beranda" }} />
          <Stack.Screen name="transactions" options={{ title: "Transaksi" }} />
          <Stack.Screen
            name="reports"
            options={{ title: "Statistik Keuangan" }}
          />
        </Stack>
      </View>

      {!isLoginPage && (
        <View style={styles.bottomNavigation}>
          <Pressable style={styles.navItem} onPress={() => router.push("/")}>
            <Text style={[styles.navIcon, isHome && styles.navIconActive]}>
              ⌂
            </Text>
            <Text style={[styles.navText, isHome && styles.navTextActive]}>
              Beranda
            </Text>
          </Pressable>

          <Pressable
            style={styles.navItem}
            onPress={() => router.push("/transactions")}
          >
            <Text
              style={[styles.navIcon, isTransactions && styles.navIconActive]}
            >
              ▣
            </Text>
            <Text
              style={[styles.navText, isTransactions && styles.navTextActive]}
            >
              Transaksi
            </Text>
          </Pressable>

          <Pressable
            style={styles.navItem}
            onPress={() => router.push("/reports")}
          >
            <Text style={[styles.navIcon, isReports && styles.navIconActive]}>
              ▥
            </Text>
            <Text style={[styles.navText, isReports && styles.navTextActive]}>
              Statistik
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  screenContainer: {
    flex: 1,
  },
  bottomNavigation: {
    height: 75,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
  },
  navIcon: {
    fontSize: 23,
    color: "#64748B",
  },
  navIconActive: {
    color: "#15803D",
  },
  navText: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 3,
  },
  navTextActive: {
    color: "#15803D",
    fontWeight: "700",
  },
});
