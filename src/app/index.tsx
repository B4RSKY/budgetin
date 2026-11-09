import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

import {
  demoProfile,
  demoTransactions,
  getBalance,
  getTotalExpense,
  getTotalIncome,
} from "../data/demoData";

import { styles } from "../styles/HomeStyle";
import { fetchExchangeRate } from "../services/currencyService";
import type { ExchangeRateResponse } from "../types/finance";

export default function HomeScreen() {
  const [showBalance, setShowBalance] = useState(true);

  // State untuk menyimpan data API kurs pada Landing Page.
  const [exchangeRate, setExchangeRate] = useState<ExchangeRateResponse | null>(null);
  const [loadingRate, setLoadingRate] = useState<boolean>(true);
  const [rateError, setRateError] = useState<string | null>(null);

  // Custom async function untuk mengambil kurs USD ke IDR.
  const loadExchangeRate = useCallback(async (): Promise<void> => {
    try {
      setLoadingRate(true);
      setRateError(null);
      const data = await fetchExchangeRate("USD");
      setExchangeRate(data);
    } catch (error) {
      setRateError(
        typeof error === "string" ? error : "Gagal memuat informasi kurs."
      );
    } finally {
      setLoadingRate(false);
    }
  }, []);

  useEffect(() => {
    loadExchangeRate();
  }, [loadExchangeRate]);

  const income = getTotalIncome();
  const expense = getTotalExpense();
  const balance = getBalance();

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(number));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F8FAFC"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/budgetin-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Pressable
            style={styles.profileButton}
            onPress={() =>
              Alert.alert(
                "Profil Budgetin",
                `${demoProfile.displayName}\n${demoProfile.email}`
              )
            }
          >
            <Ionicons
              name="person-outline"
              size={21}
              color="#15803D"
            />
          </Pressable>
        </View>

        {/* GREETING */}
        <View style={styles.greeting}>
          <Text style={styles.greetingSmall}>
            Selamat datang 👋
          </Text>

          <Text style={styles.greetingTitle}>
            Kelola keuanganmu dengan Budgetin
          </Text>
        </View>

        {/* TOTAL SALDO */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>
              Total Saldo
            </Text>

            <Pressable
              onPress={() =>
                setShowBalance((previous) => !previous)
              }
            >
              <Ionicons
                name={
                  showBalance
                    ? "eye-outline"
                    : "eye-off-outline"
                }
                size={24}
                color="#FFFFFF"
              />
            </Pressable>
          </View>

          <Text style={styles.balanceAmount}>
            {showBalance
              ? formatRupiah(balance)
              : "Rp •••••••"}
          </Text>

          <Text style={styles.balanceDescription}>
            Saldo saat ini
          </Text>
        </View>

        {/* PEMASUKAN DAN PENGELUARAN */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryIconIncome}>
              <Ionicons
                name="arrow-up-outline"
                size={20}
                color="#15803D"
              />
            </View>

            <Text style={styles.summaryLabel}>
              Pemasukan
            </Text>

            <Text style={styles.incomeAmount}>
              {formatRupiah(income)}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryIconExpense}>
              <Ionicons
                name="arrow-down-outline"
                size={20}
                color="#DC2626"
              />
            </View>

            <Text style={styles.summaryLabel}>
              Pengeluaran
            </Text>

            <Text style={styles.expenseAmount}>
              {formatRupiah(expense)}
            </Text>
          </View>
        </View>

        {/* INFORMASI KURS DARI EXTERNAL API */}
        <View
          style={{
            backgroundColor: "#EFF6FF",
            borderRadius: 16,
            padding: 16,
            marginBottom: 28,
            borderWidth: 1,
            borderColor: "#BFDBFE",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Text style={{ color: "#1D4ED8", fontSize: 14, fontWeight: "700" }}>
              Informasi Kurs Mata Uang
            </Text>
            <Pressable
              onPress={loadExchangeRate}
              disabled={loadingRate}
              accessibilityRole="button"
              accessibilityLabel="Muat ulang kurs mata uang"
            >
              <Ionicons name="refresh-outline" size={20} color="#1D4ED8" />
            </Pressable>
          </View>

          <Text style={{ color: "#475569", fontSize: 12, marginBottom: 8 }}>
            Data langsung dari External API (USD ke IDR)
          </Text>

          {loadingRate ? (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <ActivityIndicator size="small" color="#2563EB" />
              <Text style={{ color: "#475569", fontSize: 13 }}>
                Mengambil data kurs...
              </Text>
            </View>
          ) : rateError ? (
            <View>
              <Text style={{ color: "#B91C1C", fontSize: 13, marginBottom: 8 }}>
                {rateError}
              </Text>
              <Pressable onPress={loadExchangeRate}>
                <Text style={{ color: "#1D4ED8", fontWeight: "700", fontSize: 13 }}>
                  Coba lagi
                </Text>
              </Pressable>
            </View>
          ) : (
            <Text style={{ color: "#1E40AF", fontSize: 20, fontWeight: "800" }}>
              1 USD ={" "}
              {exchangeRate?.rates?.IDR
                ? formatRupiah(exchangeRate.rates.IDR)
                : "-"}
            </Text>
          )}
          {exchangeRate?.time_last_update_utc ? (
            <Text style={{ color: "#64748B", fontSize: 10, marginTop: 6 }}>
              Pembaruan: {exchangeRate.time_last_update_utc}
            </Text>
          ) : null}
        </View>

        {/* TRANSAKSI TERBARU */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Transaksi Terbaru
          </Text>

          <Pressable
            onPress={() => router.push("/transactions")}
          >
            <Text style={styles.seeAll}>
              Lihat semua
            </Text>
          </Pressable>
        </View>

        <View style={styles.transactionContainer}>
          {demoTransactions.length > 0 ? (
            demoTransactions.map((transaction, index) => {
              const isIncome = transaction.type === "income";

              return (
                <View
                  key={transaction.id}
                  style={[
                    styles.transactionItem,
                    index === demoTransactions.length - 1 &&
                      styles.lastTransaction,
                  ]}
                >
                  <View style={styles.transactionLeft}>
                    <View
                      style={[
                        styles.transactionIcon,
                        isIncome
                          ? styles.incomeIcon
                          : styles.expenseIcon,
                      ]}
                    >
                      <Ionicons
                        name={
                          isIncome
                            ? "arrow-up-outline"
                            : "arrow-down-outline"
                        }
                        size={19}
                        color={
                          isIncome ? "#15803D" : "#DC2626"
                        }
                      />
                    </View>

                    <View>
                      <Text style={styles.transactionTitle}>
                        {transaction.title}
                      </Text>

                      <Text style={styles.transactionCategory}>
                        {transaction.category}
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={[
                      styles.transactionAmount,
                      isIncome
                        ? styles.incomeText
                        : styles.expenseText,
                    ]}
                  >
                    {isIncome ? "+" : "-"}
                    {formatRupiah(transaction.amount)}
                  </Text>
                </View>
              );
            })
          ) : (
            <Text style={styles.transactionCategory}>
              Belum ada transaksi.
            </Text>
          )}
        </View>

        {/* AKSES CEPAT */}
        <Text style={styles.sectionTitle}>
          Akses Cepat
        </Text>

        <View style={styles.quickActionRow}>
          <Pressable
            style={styles.quickAction}
            onPress={() => router.push("/transactions")}
          >
            <View style={styles.quickIconContainer}>
              <Ionicons
                name="add-outline"
                size={25}
                color="#15803D"
              />
            </View>

            <Text style={styles.quickText}>
              Tambah Transaksi
            </Text>
          </Pressable>

          <Pressable
            style={styles.quickAction}
            onPress={() => router.push("/reports")}
          >
            <View style={styles.quickIconContainer}>
              <Ionicons
                name="stats-chart-outline"
                size={22}
                color="#15803D"
              />
            </View>

            <Text style={styles.quickText}>
              Lihat Statistik
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}