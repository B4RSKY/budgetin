import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import {
  demoTransactions,
  getBalance,
  getTotalExpense,
  getTotalIncome,
} from "../data/demoData";

import { formatRupiah } from "../utils/currency";

export default function ReportsScreen() {
  // =====================================
  // DATA DARI SUMBER BERSAMA
  // =====================================

  const totalIncome = getTotalIncome();
  const totalExpense = getTotalExpense();
  const netBalance = getBalance();

  // =====================================
  // KELOMPOKKAN PENGELUARAN PER KATEGORI
  // =====================================

  const expenseCategories: Record<string, number> = {};

  for (let i = 0; i < demoTransactions.length; i++) {
    const item = demoTransactions[i];

    if (item.type === "expense") {
      expenseCategories[item.category] =
        (expenseCategories[item.category] || 0) + item.amount;
    }
  }

  const categoryEntries = Object.entries(expenseCategories).sort(
    ([, a], [, b]) => b - a,
  );

  // =====================================
  // RENDER CARD KATEGORI
  // =====================================

  const renderCategoryCard = (
    category: string,
    amount: number,
    index: number,
  ) => {
    const percentage =
      totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0;

    return (
      <View key={`${category}-${index}`} style={styles.categoryCard}>
        <View style={styles.categoryHeader}>
          <View style={styles.categoryTitleGroup}>
            <Ionicons name="pie-chart-outline" size={18} color="#15803D" />

            <Text style={styles.categoryName}>{category}</Text>
          </View>

          <Text style={styles.categoryAmount}>
            {formatRupiah(amount)}

            <Text style={styles.percentageText}> ({percentage}%)</Text>
          </Text>
        </View>

        {/* PROGRESS BAR */}
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(percentage, 100)}%`,
              },
            ]}
          />
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* =====================================
          HEADER
      ===================================== */}

      <View style={styles.headerArea}>
        <Ionicons name="stats-chart" size={24} color="#15803D" />

        <Text style={styles.headerTitle}>Statistik Keuangan</Text>
      </View>

      {/* =====================================
          BANNER SALDO
      ===================================== */}

      <View style={styles.bannerCard}>
        <Text style={styles.bannerLabel}>Total Saldo Saat Ini</Text>

        <Text style={styles.bannerAmount}>{formatRupiah(netBalance)}</Text>

        <Text style={styles.bannerDescription}>
          {netBalance >= 0
            ? "Kondisi Keuangan Stabil"
            : "Pengeluaran Melebihi Pemasukan"}
        </Text>
      </View>

      {/* =====================================
          PEMASUKAN & PENGELUARAN
      ===================================== */}

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Ionicons name="arrow-up-circle" size={20} color="#15803D" />

            <Text style={styles.statLabel}>Pemasukan</Text>
          </View>

          <Text style={styles.incomeValue}>{formatRupiah(totalIncome)}</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Ionicons name="arrow-down-circle" size={20} color="#DC2626" />

            <Text style={styles.statLabel}>Pengeluaran</Text>
          </View>

          <Text style={styles.expenseValue}>{formatRupiah(totalExpense)}</Text>
        </View>
      </View>

      {/* =====================================
          PENGELUARAN PER KATEGORI
      ===================================== */}

      <Text style={styles.sectionTitle}>Pengeluaran per Kategori</Text>

      <View style={styles.categoryList}>
        {categoryEntries.map(([category, amount], index) =>
          renderCategoryCard(category, amount, index),
        )}
      </View>
    </ScrollView>
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

  content: {
    padding: 20,
    paddingBottom: 32,
  },

  // =======================================
  // HEADER
  // =======================================

  headerArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
  },

  // =======================================
  // BANNER
  // =======================================

  bannerCard: {
    backgroundColor: "#15803D",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },

  bannerLabel: {
    fontSize: 12,
    color: "#DCFCE7",
  },

  bannerAmount: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginVertical: 4,
  },

  bannerDescription: {
    fontSize: 12,
    color: "#DCFCE7",
  },

  // =======================================
  // STATISTIC CARD
  // =======================================

  statsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",

    padding: 16,

    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },

  statLabel: {
    fontSize: 12,
    color: "#64748B",
  },

  incomeValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#15803D",
  },

  expenseValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#DC2626",
  },

  // =======================================
  // CATEGORY
  // =======================================

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 12,
  },

  categoryList: {
    gap: 12,
    paddingBottom: 24,
  },

  categoryCard: {
    backgroundColor: "#FFFFFF",

    padding: 16,

    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",

    gap: 10,
  },

  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  categoryTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },

  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },

  categoryAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },

  percentageText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "400",
  },

  // =======================================
  // PROGRESS BAR
  // =======================================

  progressBackground: {
    height: 6,
    backgroundColor: "#F1F5F9",
    borderRadius: 3,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#15803D",
    borderRadius: 3,
  },
});
