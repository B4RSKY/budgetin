import { router, Stack, usePathname } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function RootLayout() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isTransactions = pathname === "/transactions";
  const isReports = pathname === "/reports";

  return (
    <View style={styles.container}>
      {/* =====================================
          SCREEN
      ===================================== */}

      <View style={styles.screenContainer}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </View>

      {/* =====================================
          BOTTOM NAVIGATION
      ===================================== */}

      <View style={styles.bottomNavigation}>
        {/* BERANDA */}
        <Pressable style={styles.navItem} onPress={() => router.push("/")}>
          <Text style={[styles.navIcon, isHome && styles.navIconActive]}>
            ⌂
          </Text>

          <Text style={[styles.navText, isHome && styles.navTextActive]}>
            Beranda
          </Text>
        </Pressable>

        {/* TRANSAKSI */}
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

        {/* STATISTIK */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  screenContainer: {
    flex: 1,
  },

  // =====================================
  // BOTTOM NAVIGATION
  // =====================================

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
