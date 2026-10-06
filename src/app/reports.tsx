import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 1. IMPORT DATA & UTILS
import {
  demoTransactions,
  getBalance,
  getTotalExpense,
  getTotalIncome,
} from "../data/demoData";
import { formatRupiah } from "../utils/currency";

// 2. IMPORT EXTERNAL STYLES (Modul 1 Subbab 3.2)
import { styles } from "../styles/reportsStyles";

export default function ReportsScreen() {
  const totalIncome = getTotalIncome();
  const totalExpense = getTotalExpense();
  const netBalance = getBalance();

  const expenseCategories: Record<string, number> = {};

  // PRIMITIVE LOOP FOR (Modul 1 Subbab 5.4.C)
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

  // CUSTOM FUNCTION (Modul 1 Subbab 5.3.B)
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
            {/* INLINE STYLING (Modul 1 Subbab 3.3) tetap dipertahankan untuk nilai demo */}
            <Text style={{ fontSize: 12, color: "#64748B", fontWeight: "400" }}>
              {" "}
              ({percentage}%)
            </Text>
          </Text>
        </View>

        {/* PROGRESS BAR (INLINE STYLING) */}
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
      {/* HEADER */}
      <View style={styles.headerArea}>
        <Ionicons name="stats-chart" size={24} color="#15803D" />
        <Text style={styles.headerTitle}>Statistik Keuangan</Text>
      </View>

      {/* BANNER SALDO */}
      <View style={styles.bannerCard}>
        <Text style={styles.bannerLabel}>Total Saldo Saat Ini</Text>
        <Text style={styles.bannerAmount}>{formatRupiah(netBalance)}</Text>
        <Text style={styles.bannerDescription}>
          {netBalance >= 0
            ? "Kondisi Keuangan Stabil"
            : "Pengeluaran Melebihi Pemasukan"}
        </Text>
      </View>

      {/* PEMASUKAN & PENGELUARAN */}
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

      {/* PENGELUARAN PER KATEGORI */}
      <Text style={styles.sectionTitle}>Pengeluaran per Kategori</Text>

      {/* LOOP .MAP() (Modul 1 Subbab 5.4.A) */}
      <View style={styles.categoryList}>
        {categoryEntries.map(([category, amount], index) =>
          renderCategoryCard(category, amount, index),
        )}
      </View>
    </ScrollView>
  );
}