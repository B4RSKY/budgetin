import { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const [showBalance, setShowBalance] = useState(true);

  // =====================================
  // DATA SEMENTARA
  // =====================================

  const income = 4000000;
  const expense = 1500000;
  const balance = income - expense;

  const transactions = [
    {
      id: 1,
      title: "Makan",
      category: "Makanan",
      amount: -25000,
    },
    {
      id: 2,
      title: "Gaji",
      category: "Pendapatan",
      amount: 2000000,
    },
    {
      id: 3,
      title: "Belanja",
      category: "Kebutuhan",
      amount: -150000,
    },
    {
      id: 4,
      title: "Transportasi",
      category: "Transportasi",
      amount: -50000,
    },
  ];

  // =====================================
  // FORMAT RUPIAH
  // =====================================

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Math.abs(number));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F8FAFC"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* =====================================
            HEADER
        ===================================== */}

        <View style={styles.header}>
          <Image
            source={require("../../assets/images/budgetin-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Pressable
            style={styles.profileButton}
            onPress={() => {}}
          >
            <Text style={styles.profileText}>
              👤
            </Text>
          </Pressable>
        </View>

        {/* =====================================
            GREETING
        ===================================== */}

        <View style={styles.greeting}>
          <Text style={styles.greetingSmall}>
            Selamat datang 
          </Text>

          <Text style={styles.greetingTitle}>
            Kelola keuanganmu dengan Budgetin
          </Text>
        </View>

        {/* =====================================
            BALANCE
        ===================================== */}

        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>
              Total Saldo
            </Text>

            <Pressable
              onPress={() =>
                setShowBalance(!showBalance)
              }
            >
              <Text style={styles.eye}>
                {showBalance ? "👁" : "🙈"}
              </Text>
            </Pressable>
          </View>

          <Text style={styles.balanceAmount}>
            {showBalance
              ? formatRupiah(balance)
              : "Rp •••••••"}
          </Text>

          <Text style={styles.balanceDescription}>
            Saldo saat ini
          </Text>
        </View>

        {/* =====================================
            PEMASUKAN & PENGELUARAN
        ===================================== */}

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryIconIncome}>
              <Text style={styles.incomeIconText}>
                ↗
              </Text>
            </View>

            <Text style={styles.summaryLabel}>
              Pemasukan
            </Text>

            <Text style={styles.incomeAmount}>
              {formatRupiah(income)}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryIconExpense}>
              <Text style={styles.expenseIconText}>
                ↘
              </Text>
            </View>

            <Text style={styles.summaryLabel}>
              Pengeluaran
            </Text>

            <Text style={styles.expenseAmount}>
              {formatRupiah(expense)}
            </Text>
          </View>
        </View>

        {/* =====================================
            TRANSAKSI TERBARU
        ===================================== */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Transaksi Terbaru
          </Text>

          <Pressable onPress={() => {}}>
            <Text style={styles.seeAll}>
              Lihat semua
            </Text>
          </Pressable>
        </View>

        <View style={styles.transactionContainer}>
          {transactions.map(
            (transaction, index) => {
              const isIncome =
                transaction.amount > 0;

              return (
                <View
                  key={transaction.id}
                  style={[
                    styles.transactionItem,
                    index ===
                      transactions.length - 1 &&
                      styles.lastTransaction,
                  ]}
                >
                  <View style={styles.transactionLeft}>
                    <View
                      style={[
                        styles.transactionIcon,
                        isIncome
                          ? styles.incomeIcon
                          : styles.expenseIcon,
                      ]}
                    >
                      <Text
                        style={[
                          styles.transactionIconText,
                          isIncome
                            ? styles.incomeIconText
                            : styles.expenseIconText,
                        ]}
                      >
                        {isIncome ? "↗" : "↘"}
                      </Text>
                    </View>

                    <View>
                      <Text
                        style={styles.transactionTitle}
                      >
                        {transaction.title}
                      </Text>

                      <Text
                        style={
                          styles.transactionCategory
                        }
                      >
                        {transaction.category}
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={[
                      styles.transactionAmount,
                      isIncome
                        ? styles.incomeText
                        : styles.expenseText,
                    ]}
                  >
                    {isIncome ? "+" : "-"}
                    {formatRupiah(
                      transaction.amount
                    )}
                  </Text>
                </View>
              );
            }
          )}
        </View>

        {/* =====================================
            AKSES CEPAT
        ===================================== */}

        <Text style={styles.sectionTitle}>
          Akses Cepat
        </Text>

        <View style={styles.quickActionRow}>
          <Pressable
            style={styles.quickAction}
            onPress={() => {}}
          >
            <View style={styles.quickIconContainer}>
              <Text style={styles.quickIcon}>
                ＋
              </Text>
            </View>

            <Text style={styles.quickText}>
              Tambah Transaksi
            </Text>
          </Pressable>

          <Pressable
            style={styles.quickAction}
            onPress={() => {}}
          >
            <View style={styles.quickIconContainer}>
              <Text style={styles.quickIcon}>
                📊
              </Text>
            </View>

            <Text style={styles.quickText}>
              Lihat Statistik
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* =====================================
          BOTTOM NAVIGATION
      ===================================== */}

      <View style={styles.bottomNavigation}>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIconActive}>
            ⌂
          </Text>

          <Text style={styles.navTextActive}>
            Beranda
          </Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => {}}
        >
          <Text style={styles.navIcon}>
            ▣
          </Text>

          <Text style={styles.navText}>
            Transaksi
          </Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => {}}
        >
          <Text style={styles.navIcon}>
            ▥
          </Text>

          <Text style={styles.navText}>
            Statistik
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// =========================================
// STYLES
// =========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 110,
  },

  // =======================================
  // HEADER
  // =======================================

  header: {
    height: 150,
    marginTop: 15,
    marginLeft:9,
    marginRight: 9,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    width: 100,
    height: 100,
  },

  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,

    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#BBF7D0",

    alignItems: "center",
    justifyContent: "center",
  },

  profileText: {
    fontSize: 17,
  },

  // =======================================
  // GREETING
  // =======================================

  greeting: {
    marginTop: 2,
    marginBottom: 20,
  },

  greetingSmall: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 6,
  },

  greetingTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    lineHeight: 30,
  },

  // =======================================
  // BALANCE
  // =======================================

  balanceCard: {
    backgroundColor: "#15803D",
    borderRadius: 20,
    padding: 22,
    marginBottom: 18,
  },

  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  balanceLabel: {
    color: "#DCFCE7",
    fontSize: 14,
  },

  eye: {
    fontSize: 18,
  },

  balanceAmount: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 12,
  },

  balanceDescription: {
    color: "#DCFCE7",
    fontSize: 12,
    marginTop: 6,
  },

  // =======================================
  // SUMMARY
  // =======================================

  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  summaryIconIncome: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  summaryIconExpense: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  incomeIconText: {
    fontSize: 18,
    color: "#15803D",
    fontWeight: "700",
  },

  expenseIconText: {
    fontSize: 18,
    color: "#DC2626",
    fontWeight: "700",
  },

  summaryLabel: {
    fontSize: 12,
    color: "#475569",
    marginBottom: 5,
  },

  incomeAmount: {
    color: "#15803D",
    fontSize: 16,
    fontWeight: "700",
  },

  expenseAmount: {
    color: "#DC2626",
    fontSize: 16,
    fontWeight: "700",
  },

  // =======================================
  // SECTION
  // =======================================

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },

  seeAll: {
    color: "#15803D",
    fontSize: 13,
    fontWeight: "600",
  },

  // =======================================
  // TRANSACTIONS
  // =======================================

  transactionContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },

  transactionItem: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  lastTransaction: {
    borderBottomWidth: 0,
  },

  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  incomeIcon: {
    backgroundColor: "#DCFCE7",
  },

  expenseIcon: {
    backgroundColor: "#FEE2E2",
  },

  transactionIconText: {
    fontSize: 18,
  },

  transactionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },

  transactionCategory: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 3,
  },

  transactionAmount: {
    fontSize: 13,
    fontWeight: "700",
  },

  incomeText: {
    color: "#15803D",
  },

  expenseText: {
    color: "#DC2626",
  },

  // =======================================
  // QUICK ACTION
  // =======================================

  quickActionRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },

  quickAction: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  quickIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  quickIcon: {
    fontSize: 22,
  },

  quickText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0F172A",
    textAlign: "center",
  },

  // =======================================
  // BOTTOM NAVIGATION
  // =======================================

  bottomNavigation: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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

  navIconActive: {
    fontSize: 23,
    color: "#15803D",
  },

  navIcon: {
    fontSize: 23,
    color: "#64748B",
  },

  navTextActive: {
    fontSize: 11,
    color: "#15803D",
    fontWeight: "700",
    marginTop: 3,
  },

  navText: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 3,
  },
});