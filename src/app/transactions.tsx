import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import TransactionItem from "../components/TransactionItem";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
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
  { value: "transfer", label: "Transfer" },
];

export default function TransactionsScreen() {
  const { user, signOut } = useAuth();

  // State Transaksi Cloud (Supabase)
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loadingTx, setLoadingTx] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [txError, setTxError] = useState<string | null>(null);

  // State Form Tambah Transaksi Baru
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [txType, setTxType] = useState<TransactionType>("expense");
  const [submitting, setSubmitting] = useState<boolean>(false);

  // State API Kurs (Modul 3)
  const [exchangeRate, setExchangeRate] = useState<ExchangeRateResponse | null>(
    null,
  );
  const [loadingRate, setLoadingRate] = useState<boolean>(true);
  const [rateError, setRateError] = useState<string | null>(null);

  // 1. FETCH API KURS RUPIAH (MODUL 3)
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

  // 2. READ DATA DARI SUPABASE CLOUD (SELECT + RLS)
  const fetchTransactions = useCallback(async () => {
    if (!user) return;
    try {
      setTxError(null);
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Map data Supabase ke tipe Transaction aplikasi Anda
      const formatted: Transaction[] = (data || []).map((row: any) => ({
        id: row.id,
        title: row.title,
        amount: Number(row.amount),
        type: row.type as TransactionType,
        category: row.category || "Umum",
        date: new Date(row.created_at).toLocaleDateString("id-ID"),
      }));

      setTransactions(formatted);
    } catch (err: any) {
      setTxError(err.message || "Gagal memuat transaksi dari cloud.");
    } finally {
      setLoadingTx(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Pull-to-refresh handler
  const onRefresh = () => {
    setRefreshing(true);
    fetchTransactions();
  };

  // 3. CREATE DATA KE SUPABASE CLOUD (INSERT + OPTIMISTIC UI)
  const handleAddTransaction = async () => {
    if (!user) return;
    const cleanTitle = title.trim();
    const numericAmount = Number(amount);

    if (!cleanTitle || isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert(
        "Input Tidak Valid",
        "Masukkan judul dan nominal yang benar.",
      );
      return;
    }

    // Optimistic UI: tampilkan langsung di layar sebelum server selesai merespons
    const tempId = `temp-${Date.now()}`;
    const optimisticItem: Transaction = {
      id: tempId,
      title: cleanTitle,
      amount: numericAmount,
      type: txType,
      category: "Umum",
      date: new Date().toLocaleDateString("id-ID"),
    };

    const previousTransactions = [...transactions];
    setTransactions([optimisticItem, ...transactions]);
    setTitle("");
    setAmount("");

    try {
      setSubmitting(true);
      const { data, error } = await supabase
        .from("transactions")
        .insert([
          {
            title: cleanTitle,
            amount: numericAmount,
            type: txType,
            user_id: user.id, // Mengaitkan dengan user yang login (RLS)
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Ganti item sementara dengan data asli dari database (ID UUID asli)
      if (data) {
        setTransactions((prev) =>
          prev.map((item) =>
            item.id === tempId
              ? {
                  id: data.id,
                  title: data.title,
                  amount: Number(data.amount),
                  type: data.type as TransactionType,
                  category: data.category || "Umum",
                  date: new Date(data.created_at).toLocaleDateString("id-ID"),
                }
              : item,
          ),
        );
      }
    } catch (err: any) {
      // Rollback jika gagal menyimpan ke cloud
      setTransactions(previousTransactions);
      Alert.alert(
        "Gagal Menyimpan",
        err.message || "Terjadi kesalahan server.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Filter lokal berdasarkan tab yang dipilih
  const visibleTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((item) => item.type === filter);

  const callsign = user?.user_metadata?.callsign || user?.email || "Pengguna";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.listContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* HEADER + TOMBOL LOGOUT */}
      <View
        style={[
          styles.header,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <View>
          <Text style={styles.title}>Transaksi</Text>
          <Text style={styles.subtitle}>Akun: {callsign}</Text>
          <Text style={[styles.demoLabel, { color: "#15803D" }]}>
            Terhubung ke Supabase Cloud (RLS Aktif)
          </Text>
        </View>

        <Pressable
          onPress={signOut}
          style={{
            backgroundColor: "#FEE2E2",
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#FCA5A5",
          }}
        >
          <Text style={{ color: "#DC2626", fontWeight: "700", fontSize: 12 }}>
            Keluar
          </Text>
        </Pressable>
      </View>

      {/* --- KOTAK INFO API KURS (MODUL 3) --- */}
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

      {/* --- FORM TAMBAH TRANSAKSI CLOUD (INSERT SUPABASE) --- */}
      <View
        style={{
          backgroundColor: "#FFFFFF",
          marginHorizontal: 20,
          marginBottom: 16,
          padding: 14,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#E2E8F0",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "700",
            color: "#0F172A",
            marginBottom: 10,
          }}
        >
          Catat Transaksi Baru
        </Text>

        <TextInput
          placeholder="Judul transaksi (mis. Makan Siang / Gaji)"
          value={title}
          onChangeText={setTitle}
          editable={!submitting}
          style={{
            backgroundColor: "#F8FAFC",
            borderWidth: 1,
            borderColor: "#CBD5E1",
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 10,
            marginBottom: 8,
            fontSize: 14,
          }}
        />

        <TextInput
          placeholder="Nominal (Rp)"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          editable={!submitting}
          style={{
            backgroundColor: "#F8FAFC",
            borderWidth: 1,
            borderColor: "#CBD5E1",
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 10,
            marginBottom: 10,
            fontSize: 14,
          }}
        />

        {/* Pilihan Tipe Transaksi */}
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
          {(["expense", "income", "transfer"] as TransactionType[]).map(
            (typeOption) => (
              <Pressable
                key={typeOption}
                onPress={() => setTxType(typeOption)}
                style={{
                  flex: 1,
                  paddingVertical: 8,
                  borderRadius: 8,
                  alignItems: "center",
                  backgroundColor:
                    txType === typeOption ? "#15803D" : "#F1F5F9",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: txType === typeOption ? "#FFFFFF" : "#475569",
                  }}
                >
                  {typeOption === "expense"
                    ? "Keluar"
                    : typeOption === "income"
                      ? "Masuk"
                      : "Transfer"}
                </Text>
              </Pressable>
            ),
          )}
        </View>

        <Pressable
          onPress={handleAddTransaction}
          disabled={submitting}
          style={{
            backgroundColor: submitting ? "#86EFAC" : "#15803D",
            paddingVertical: 11,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "700", fontSize: 14 }}>
            {submitting ? "Menyimpan..." : "+ Simpan ke Cloud"}
          </Text>
        </Pressable>
      </View>

      {/* FILTER KATEGORI */}
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

      {/* DAFTAR TRANSAKSI DARI SUPABASE */}
      {loadingTx ? (
        <ActivityIndicator
          size="large"
          color="#15803D"
          style={{ marginTop: 20 }}
        />
      ) : txError ? (
        <View style={styles.emptyCard}>
          <Text style={[styles.emptyTitle, { color: "#DC2626" }]}>
            Gagal Memuat Data
          </Text>
          <Text style={styles.emptyDescription}>{txError}</Text>
        </View>
      ) : visibleTransactions.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Belum ada transaksi</Text>
          <Text style={styles.emptyDescription}>
            Tambahkan transaksi baru di atas atau tarik layar ke bawah untuk
            memuat ulang.
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
