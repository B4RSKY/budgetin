import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 1. IMPORT MODULE EXTERNAL (Modul 1 Subbab 1.1 & 3.2)
import { Transaction, TransactionType } from "../types/finance";
import { formatRupiah } from "../utils/currency";

// 2. ARRAY OF OBJECTS (Modul 1 Subbab 5.5.A)
const transactionsData: Transaction[] = [
  { id: "1", title: "Gaji Utama", amount: 4500000, type: "income", category: "Gaji", date: "2026-10-01" },
  { id: "2", title: "Makan Siang", amount: 150000, type: "expense", category: "Makanan", date: "2026-10-02" },
  { id: "3", title: "Belanja Bulanan", amount: 400000, type: "expense", category: "Belanja", date: "2026-10-03" },
  { id: "4", title: "Bensin Motor", amount: 100000, type: "expense", category: "Transportasi", date: "2026-10-04" },
  { id: "5", title: "Listrik & WiFi", amount: 350000, type: "expense", category: "Tagihan", date: "2026-10-05" },
];

export default function ReportsScreen() {
  // 3. CUSTOM FUNCTION & PRIMITIVE LOOP FOR (Modul 1 Subbab 5.3.B & 5.4.C)
  const calculateTotal = (type: TransactionType): number => {
    let total = 0;
    for (let i = 0; i < transactionsData.length; i++) {
      if (transactionsData[i].type === type) {
        total += transactionsData[i].amount;
      }
    }
    return total;
  };

  const totalIncome = calculateTotal("income");
  const totalExpense = calculateTotal("expense");
  const netBalance = totalIncome - totalExpense;

  // Mengelompokkan Pengeluaran per Kategori
  const expenseCategories: Record<string, number> = {};
  for (let i = 0; i < transactionsData.length; i++) {
    const item = transactionsData[i];
    if (item.type === "expense") {
      expenseCategories[item.category] = (expenseCategories[item.category] || 0) + item.amount;
    }
  }

  const categoryEntries = Object.entries(expenseCategories).sort(([, a], [, b]) => b - a);

  // CUSTOM FUNCTION UNTUK RENDER CARD (Modul 1 Subbab 5.3.B)
  const renderCategoryCard = (category: string, amount: number, index: number) => {
    const percentage = totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0;

    return (
      <View key={index} style={styles.categoryCard}>
        <View style={styles.categoryHeader}>
          <View style={styles.categoryTitleGroup}>
            <Ionicons name="pie-chart-outline" size={18} color="#15803D" />
            <Text style={styles.categoryName}>{category}</Text>
          </View>
          <Text style={styles.categoryAmount}>
            {formatRupiah(amount)}{" "}
            {/* INLINE STYLING (Modul 1 Subbab 3.3) */}
            <Text style={{ fontSize: 12, color: "#64748B" }}>({percentage}%)</Text>
          </Text>
        </View>

        {/* Progress Bar Indikator Visual */}
        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: `${Math.min(percentage, 100)}%` }]} />
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Judul */}
      <View style={styles.headerArea}>
        <Ionicons name="stats-chart" size={24} color="#15803D" />
        <Text style={styles.headerTitle}>Statistik Keuangan</Text>
      </View>

      {/* Banner Utama Saldo */}
      <View style={styles.bannerCard}>
        <Text style={styles.bannerLabel}>Total Saldo Saat Ini (Selisih)</Text>
        {/* INLINE STYLING (Modul 1 Subbab 3.3) */}
        <Text style={{ fontSize: 26, fontWeight: "bold", color: "#FFFFFF", marginVertical: 4 }}>
          {formatRupiah(netBalance)}
        </Text>
        <Text style={{ fontSize: 12, color: "#DCFCE7" }}>
          {netBalance >= 0 ? "Kondisi Keuangan Stabil" : "Pengeluaran Melebihi Pemasukan"}
        </Text>
      </View>

      {/* Grid Kartu Pemasukan & Pengeluaran */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Ionicons name="arrow-up-circle" size={20} color="#15803D" />
            <Text style={styles.statLabel}>Pemasukan</Text>
          </View>
          {/* INLINE STYLING (Modul 1 Subbab 3.3) */}
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#15803D" }}>
            {formatRupiah(totalIncome)}
          </Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Ionicons name="arrow-down-circle" size={20} color="#DC2626" />
            <Text style={styles.statLabel}>Pengeluaran</Text>
          </View>
          {/* INLINE STYLING (Modul 1 Subbab 3.3) - PERBAIKAN DI BARIS INI */}
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#DC2626" }}>
            {formatRupiah(totalExpense)}
          </Text>
        </View>
      </View>

      {/* Section Pengeluaran per Kategori */}
      <Text style={styles.sectionTitle}>Pengeluaran per Kategori</Text>

      {/* 4. LOOP .MAP() (Modul 1 Subbab 5.4.A) */}
      <View style={styles.categoryList}>
        {categoryEntries.map(([category, amount], index) =>
          renderCategoryCard(category, amount, index)
        )}
      </View>
    </ScrollView>
  );
}

// 5. INTERNAL / EXTERNAL STYLING (Modul 1 Subbab 3.1 & 3.2)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    padding: 20,
  },
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
  bannerCard: {
    backgroundColor: "#15803D",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  bannerLabel: {
    fontSize: 12,
    color: "#DCFCE7",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 10,
  },
  categoryHeader: {
    flexDirection: "row",
    justifycontent: "space-between",
    alignItems: "center",
  },
  categoryTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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