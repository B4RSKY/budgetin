import { ScrollView, Text, View } from "react-native";

import TransactionItem from "../components/TransactionItem";
import { demoTransactions } from "../data/demoData";
import { transactionStyles as styles } from "../styles/transactionStyles";

export default function TransactionsScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.listContainer}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Transaksi</Text>

        <Text style={styles.subtitle}>Riwayat pemasukan dan pengeluaran</Text>
      </View>

      {/* LOOP MENGGUNAKAN MAP */}
      {demoTransactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </ScrollView>
  );
}
