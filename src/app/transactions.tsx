import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import TransactionItem from "../components/TransactionItem";
import { demoTransactions } from "../data/demoData";
import { transactionStyles as styles } from "../styles/transactionStyles";
import type { Transaction, TransactionType } from "../types/finance";

type Filter = "all" | TransactionType;
const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "income", label: "Pemasukan" },
  { value: "expense", label: "Pengeluaran" },
];

export default function TransactionsScreen() {
  const [filter, setFilter] = useState<Filter>("all");
  const [visibleTransactions, setVisibleTransactions] =
    useState<Transaction[]>(demoTransactions);

  useEffect(() => {
    setVisibleTransactions(
      filter === "all"
        ? demoTransactions
        : demoTransactions.filter((item) => item.type === filter),
    );
  }, [filter]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.listContainer}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Transaksi</Text>
        <Text style={styles.subtitle}>Riwayat pemasukan dan pengeluaran</Text>
        <Text style={styles.demoLabel}>Data contoh untuk demonstrasi</Text>
      </View>
      <View style={styles.filterRow}>
        {filters.map((item) => (
          <Pressable
            key={item.value}
            accessibilityRole="button"
            accessibilityState={{ selected: filter === item.value }}
            style={[
              styles.filterButton,
              filter === item.value && styles.filterButtonActive,
            ]}
            onPress={() => setFilter(item.value)}
          >
            <Text
              style={[
                styles.filterText,
                filter === item.value && styles.filterTextActive,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.sectionTitle}>
        Daftar Transaksi ({visibleTransactions.length})
      </Text>
      {visibleTransactions.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Belum ada transaksi</Text>
          <Text style={styles.emptyDescription}>
            Tidak ada transaksi pada filter ini.
          </Text>
        </View>
      ) : (
        visibleTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onPress={() =>
              router.push({
                pathname: "/transaction/[id]",
                params: { id: transaction.id },
              })
            }
          />
        ))
      )}
    </ScrollView>
  );
}
