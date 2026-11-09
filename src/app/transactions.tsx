import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import TransactionItem from "../components/TransactionItem";
import { demoTransactions } from "../data/demoData";
import { fetchExchangeRate } from "../services/currencyService";
import { transactionStyles as styles } from "../styles/transactionStyles";
import type {
  ExchangeRateResponse,
  Transaction,
  TransactionType,
} from "../types/finance";
import { formatRupiah } from "../utils/currency";

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

  const [exchangeRate, setExchangeRate] = useState<ExchangeRateResponse | null>(
    null,
  );
  const [loadingRate, setLoadingRate] = useState<boolean>(true);
  const [rateError, setRateError] = useState<string | null>(null);

  useEffect(() => {
    const loadExchangeRate = async () => {
      try {
        setLoadingRate(true);
        setRateError(null);
        const data = await fetchExchangeRate("USD");
        setExchangeRate(data);
      } catch (error) {
        setRateError(error as string);
      } finally {
        setLoadingRate(false);
      }
    };

    loadExchangeRate();
  }, []);

  useEffect(() => {
    setVisibleTransactions(
      filter === "all"
        ? demoTransactions
        : demoTransactions.filter((item) => item.type === "income"),
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

      {/* --- KOTAK INFO API KURS --- */}
      <View
        style={{
          padding: 15,
          backgroundColor: "#e0f2fe",
          borderRadius: 8,
          marginBottom: 15,
          marginHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 13,
            color: "#0284c7",
            marginBottom: 5,
            fontWeight: "bold",
          }}
        >
          Info Kurs Terkini (USD ke IDR)
        </Text>
        {loadingRate ? (
          <ActivityIndicator
            size="small"
            color="#0284c7"
            style={{ alignSelf: "flex-start" }}
          />
        ) : rateError ? (
          <Text style={{ color: "red", fontSize: 13 }}>{rateError}</Text>
        ) : (
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#0369a1" }}>
            1 USD ={" "}
            {exchangeRate?.rates.IDR
              ? formatRupiah(exchangeRate.rates.IDR)
              : "-"}
          </Text>
        )}
      </View>
      {/* --------------------------- */}

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
