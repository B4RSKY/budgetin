import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { demoTransactions } from '../../data/demoData';
import { formatRupiah, formatTanggal } from '../../components/TransactionItem';
import { transactionStyles as styles } from '../../styles/transactionStyles';

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const transaction = demoTransactions.find(item => item.id === id);
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.listContainer}>
      <Stack.Screen options={{ title: 'Detail Transaksi', headerShown: false }} />
      <View style={styles.header}>
        <Text style={styles.title}>Detail Transaksi</Text>
        <Text style={styles.demoLabel}>Data contoh untuk demonstrasi</Text>
      </View>
      {transaction ? (
        <View style={styles.transactionCard}>
          <Text style={styles.sectionTitle}>{transaction.title}</Text>
          <View style={styles.detailRow}><Text style={styles.detailLabel}>Jenis</Text><Text style={styles.detailValue}>{transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}</Text></View>
          <View style={styles.detailRow}><Text style={styles.detailLabel}>Nominal</Text><Text style={styles.detailValue}>{transaction.type === 'income' ? '+' : '−'}{formatRupiah(transaction.amount)}</Text></View>
          <View style={styles.detailRow}><Text style={styles.detailLabel}>Kategori</Text><Text style={styles.detailValue}>{transaction.category}</Text></View>
          <View style={styles.detailRow}><Text style={styles.detailLabel}>Tanggal</Text><Text style={styles.detailValue}>{formatTanggal(transaction.date)}</Text></View>
          {transaction.note ? <View style={styles.detailRow}><Text style={styles.detailLabel}>Catatan</Text><Text style={styles.detailValue}>{transaction.note}</Text></View> : null}
        </View>
      ) : (
        <View style={styles.emptyCard}><Text style={styles.emptyTitle}>Transaksi tidak ditemukan</Text><Text style={styles.emptyDescription}>Periksa kembali transaksi yang dipilih.</Text></View>
      )}
      <Pressable style={styles.primaryButton} onPress={() => router.canGoBack() ? router.back() : router.replace('/transactions')}>
        <Text style={styles.primaryButtonText}>Kembali ke Transaksi</Text>
      </Pressable>
    </ScrollView>
  );
}
