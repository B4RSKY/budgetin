import { Text, View } from "react-native";

import { transactionStyles as styles } from "../styles/transactionStyles";
import type { Transaction } from "../types/finance";

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

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const isIncome = transaction.type === "income";

  return (
    <View style={styles.transactionCard}>
      <View style={styles.transactionTop}>
        <View>
          <Text style={styles.transactionTitle}>{transaction.title}</Text>

          <Text style={styles.transactionCategory}>{transaction.category}</Text>

          {/* INLINE STYLING */}
          <Text
            style={{
              marginTop: 4,
            }}
          >
            {formatTanggal(transaction.date)}
          </Text>
        </View>

        <Text style={isIncome ? styles.incomeAmount : styles.expenseAmount}>
          {isIncome ? "+" : "−"} {formatRupiah(transaction.amount)}
        </Text>
      </View>

      <Text
        style={[
          styles.typeLabel,
          isIncome ? styles.incomeLabel : styles.expenseLabel,
        ]}
      >
        {isIncome ? "Pemasukan" : "Pengeluaran"}
      </Text>
    </View>
  );
}
