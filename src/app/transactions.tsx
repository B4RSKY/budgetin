import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";

import type { Transaction } from "../types/finance";
import { formatRupiah } from "../utils/currency";

// =====================================
// DATA TRANSAKSI
// =====================================
// Data ini mengikuti transaksi yang saat ini
// ditampilkan pada Dashboard.

const transactions: Transaction[] = [
  {
    id: "1",
    title: "Makan",
    category: "Makanan",
    amount: 25000,
    type: "expense",
    date: "2026-10-01",
  },
  {
    id: "2",
    title: "Gaji",
    category: "Pendapatan",
    amount: 2000000,
    type: "income",
    date: "2026-10-02",
  },
  {
    id: "3",
    title: "Belanja",
    category: "Kebutuhan",
    amount: 150000,
    type: "expense",
    date: "2026-10-03",
  },
  {
    id: "4",
    title: "Transportasi",
    category: "Transportasi",
    amount: 50000,
    type: "expense",
    date: "2026-10-04",
  },
];

// =====================================
// FORMAT TANGGAL
// =====================================

function formatTanggal(date: string): string {
  const [year, month, day] = date.split("-");

  const namaBulan = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  return `${Number(day)} ${namaBulan[Number(month) - 1]} ${year}`;
}

// =====================================
// ITEM TRANSAKSI
// =====================================

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const isIncome = transaction.type === "income";

  return (
    <View style={styles.transactionItem}>
      {/* ICON */}
      <View
        style={[
          styles.iconContainer,
          isIncome ? styles.incomeIconContainer : styles.expenseIconContainer,
        ]}
      >
        <Text
          style={[
            styles.iconText,
            isIncome ? styles.incomeIconText : styles.expenseIconText,
          ]}
        >
          {isIncome ? "↗" : "↘"}
        </Text>
      </View>

      {/* INFORMASI TRANSAKSI */}
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionTitle}>{transaction.title}</Text>

        <Text style={styles.transactionCategory}>{transaction.category}</Text>

        <Text style={styles.transactionDate}>
          {formatTanggal(transaction.date)}
        </Text>
      </View>

      {/* NOMINAL */}
      <View style={styles.amountContainer}>
        <Text
          style={[
            styles.amount,
            isIncome ? styles.incomeAmount : styles.expenseAmount,
          ]}
        >
          {isIncome ? "+" : "−"}
          {formatRupiah(transaction.amount)}
        </Text>

        <Text
          style={[
            styles.typeLabel,
            isIncome ? styles.incomeLabel : styles.expenseLabel,
          ]}
        >
          {isIncome ? "Pemasukan" : "Pengeluaran"}
        </Text>
      </View>
    </View>
  );
}

// =====================================
// SCREEN TRANSAKSI
// =====================================

export default function TransactionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transaksi</Text>

        <Text style={styles.headerSubtitle}>
          Riwayat pemasukan dan pengeluaran
        </Text>
      </View>

      {/* RINGKASAN */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Semua Transaksi</Text>

        <Text style={styles.summaryDescription}>
          Data transaksi demo Budgetin
        </Text>
      </View>

      {/* LIST TRANSAKSI */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// =====================================
// STYLES
// =====================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  // HEADER
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 16,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },

  headerSubtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 5,
  },

  // SUMMARY
  summaryCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  summaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  summaryDescription: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },

  // LIST
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },

  // TRANSACTION
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    padding: 16,
    marginBottom: 12,

    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  // ICON
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 12,
  },

  incomeIconContainer: {
    backgroundColor: "#DCFCE7",
  },

  expenseIconContainer: {
    backgroundColor: "#FEE2E2",
  },

  iconText: {
    fontSize: 20,
    fontWeight: "700",
  },

  incomeIconText: {
    color: "#15803D",
  },

  expenseIconText: {
    color: "#DC2626",
  },

  // INFORMASI
  transactionInfo: {
    flex: 1,
  },

  transactionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },

  transactionCategory: {
    fontSize: 12,
    color: "#475569",
    marginTop: 3,
  },

  transactionDate: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 3,
  },

  // NOMINAL
  amountContainer: {
    alignItems: "flex-end",
    marginLeft: 8,
  },

  amount: {
    fontSize: 13,
    fontWeight: "700",
  },

  incomeAmount: {
    color: "#15803D",
  },

  expenseAmount: {
    color: "#DC2626",
  },

  // LABEL
  typeLabel: {
    fontSize: 10,
    fontWeight: "600",
    marginTop: 4,
  },

  incomeLabel: {
    color: "#15803D",
  },

  expenseLabel: {
    color: "#DC2626",
  },
});
