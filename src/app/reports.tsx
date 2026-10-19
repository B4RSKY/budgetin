import { useState, useEffect } from "react";
import { ScrollView, Text, View, TouchableOpacity, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

import { demoTransactions } from "../data/demoData";
import { formatRupiah } from "../utils/currency";
import { styles } from "../styles/reportsStyles";

export default function ReportsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [selectedPeriod, setSelectedPeriod] = useState<"all" | "month" | "week">("all");
  const [incomeTotal, setIncomeTotal] = useState<number>(0);
  const [expenseTotal, setExpenseTotal] = useState<number>(0);
  const [filteredList, setFilteredList] = useState(demoTransactions);

  useEffect(() => {
    const filtered = demoTransactions.filter((item) => {
      if (selectedPeriod === "week") return item.date >= "2026-10-03";
      if (selectedPeriod === "month") return item.date >= "2026-10-01";
      return true;
    });

    let income = 0;
    let expense = 0;

    filtered.forEach((item) => {
      if (item.type === "income") income += item.amount;
      if (item.type === "expense") expense += item.amount;
    });

    setIncomeTotal(income);
    setExpenseTotal(expense);
    setFilteredList(filtered);
  }, [selectedPeriod]);

  const netBalance = incomeTotal - expenseTotal;

  const expenseCategories: Record<string, number> = {};
  for (let i = 0; i < filteredList.length; i++) {
    const item = filteredList[i];
    if (item.type === "expense") {
      expenseCategories[item.category] =
        (expenseCategories[item.category] || 0) + item.amount;
    }
  }

  const categoryEntries = Object.entries(expenseCategories).sort(
    ([, a], [, b]) => b - a
  );

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleOpenTransactions = () => {
    router.push("/transactions");
  };

  const renderCategoryCard = (category: string, amount: number, index: number) => {
    const percentage =
      expenseTotal > 0 ? Math.round((amount / expenseTotal) * 100) : 0;

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

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.min(percentage, 100)}%` },
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
      <View style={styles.headerArea}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={20} color="#0F172A" />
        </TouchableOpacity>

        <View style={styles.headerTitleGroup}>
          <Ionicons name="stats-chart" size={22} color="#15803D" />
          <Text style={styles.headerTitle}>Statistik Keuangan</Text>
        </View>

        <View style={{ width: 32 }} />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterTab, selectedPeriod === "all" && styles.activeFilterTab]}
          onPress={() => setSelectedPeriod("all")}
        >
          <Text style={[styles.filterText, selectedPeriod === "all" && styles.activeFilterText]}>
            Semua
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterTab, selectedPeriod === "month" && styles.activeFilterTab]}
          onPress={() => setSelectedPeriod("month")}
        >
          <Text style={[styles.filterText, selectedPeriod === "month" && styles.activeFilterText]}>
            Bulan Ini
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterTab, selectedPeriod === "week" && styles.activeFilterTab]}
          onPress={() => setSelectedPeriod("week")}
        >
          <Text style={[styles.filterText, selectedPeriod === "week" && styles.activeFilterText]}>
            Minggu Ini
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bannerCard}>
        <Text style={styles.bannerLabel}>Total Saldo Saat Ini</Text>
        <Text style={styles.bannerAmount}>{formatRupiah(netBalance)}</Text>
        <Text style={styles.bannerDescription}>
          {netBalance >= 0 ? "Kondisi Keuangan Stabil" : "Pengeluaran Melebihi Pemasukan"}
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Ionicons name="arrow-up-circle" size={20} color="#15803D" />
            <Text style={styles.statLabel}>Pemasukan</Text>
          </View>
          <Text style={styles.incomeValue}>{formatRupiah(incomeTotal)}</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Ionicons name="arrow-down-circle" size={20} color="#DC2626" />
            <Text style={styles.statLabel}>Pengeluaran</Text>
          </View>
          <Text style={styles.expenseValue}>{formatRupiah(expenseTotal)}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Pengeluaran per Kategori</Text>
      <View style={styles.categoryList}>
        {categoryEntries.map(([category, amount], index) =>
          renderCategoryCard(category, amount, index)
        )}
      </View>

      <Pressable style={styles.actionButton} onPress={handleOpenTransactions}>
        <Text style={styles.actionButtonText}>Lihat Detail Transaksi ➔</Text>
      </Pressable>
    </ScrollView>
  );
}