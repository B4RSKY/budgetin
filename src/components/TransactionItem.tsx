import { Pressable, Text, View } from 'react-native';
import { transactionStyles as styles } from '../styles/transactionStyles';
import type { Transaction } from '../types/finance';

export function formatTanggal(date: string): string {
  const [year, month, day] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${Number(day)} ${months[Number(month) - 1] ?? ''} ${year}`;
}

export function formatRupiah(amount: number): string {
  return `Rp${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(amount)}`;
}

interface Props { transaction: Transaction; onPress?: () => void }

export default function TransactionItem({ transaction, onPress }: Props) {
  const income = transaction.type === 'income';
  return (
    <Pressable onPress={onPress} disabled={!onPress} accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`Detail transaksi ${transaction.title}`}
      style={({ pressed }) => [styles.transactionCard, pressed && { opacity: 0.75 }]}>
      <View style={styles.transactionTop}>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionTitle}>{transaction.title}</Text>
          <Text style={styles.transactionCategory}>{transaction.category}</Text>
          <Text style={styles.transactionDate}>{formatTanggal(transaction.date)}</Text>
        </View>
        <View style={styles.amountBox}>
          <Text style={income ? styles.incomeAmount : styles.expenseAmount}>
            {income ? '+' : '−'}{formatRupiah(transaction.amount)}
          </Text>
          <Text style={[styles.typeLabel, income ? styles.incomeLabel : styles.expenseLabel]}>
            {income ? 'Pemasukan' : 'Pengeluaran'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
