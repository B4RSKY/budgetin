import { StyleSheet, Text, View } from "react-native";

import type { Transaction } from "../types/finance";
import { formatRupiah } from "../utils/currency";

interface TransactionItemProps {
  transaction: Transaction;
}

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

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const isIncome = transaction.type === "income";

  return (
    <View style={styles.container}>
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
            isIncome ? styles.incomeIcon : styles.expenseIcon,
          ]}
        >
          {isIncome ? "↗" : "↘"}
        </Text>
      </View>

      {/* INFORMASI */}
      <View style={styles.info}>
        <Text style={styles.title}>{transaction.title}</Text>

        <Text style={styles.category}>{transaction.category}</Text>

        <Text style={styles.date}>{formatTanggal(transaction.date)}</Text>
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
            styles.type,
            isIncome ? styles.incomeType : styles.expenseType,
          ]}
        >
          {isIncome ? "Pemasukan" : "Pengeluaran"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    padding: 16,
    marginBottom: 12,

    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

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

  incomeIcon: {
    color: "#15803D",
  },

  expenseIcon: {
    color: "#DC2626",
  },

  info: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },

  category: {
    fontSize: 12,
    color: "#475569",
    marginTop: 3,
  },

  date: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 3,
  },

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

  type: {
    fontSize: 10,
    fontWeight: "600",
    marginTop: 4,
  },

  incomeType: {
    color: "#15803D",
  },

  expenseType: {
    color: "#DC2626",
  },
});
