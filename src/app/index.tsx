import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

import {
  demoTransactions,
  getBalance,
  getTotalExpense,
  getTotalIncome,
} from "../data/demoData";

import { styles } from "../styles/HomeStyle";

export default function HomeScreen() {
  const [showBalance, setShowBalance] = useState(true);

  // =====================================
  // DATA DARI DEMO DATA BERSAMA
  // =====================================

  const income = getTotalIncome();
  const expense = getTotalExpense();
  const balance = getBalance();

  // =====================================
  // FORMAT RUPIAH
  // =====================================

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
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
        {/* =====================================
            HEADER
        ===================================== */}

        <View style={styles.header}>
          <Image
            source={require("../../assets/images/budgetin-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Pressable
            style={styles.profileButton}
            onPress={() => {}}
          >
            <Ionicons
              name="person-outline"
              size={21}
              color="#15803D"
            />
          </Pressable>
        </View>

        {/* =====================================
            GREETING
        ===================================== */}

        <View style={styles.greeting}>
          <Text style={styles.greetingSmall}>
            Selamat datang 👋
          </Text>

          <Text style={styles.greetingTitle}>
            Kelola keuanganmu dengan Budgetin
          </Text>
        </View>

        {/* =====================================
            BALANCE
        ===================================== */}

        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>
              Total Saldo
            </Text>

            <Pressable
              onPress={() =>
                setShowBalance(!showBalance)
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

        {/* =====================================
            PEMASUKAN & PENGELUARAN
        ===================================== */}

        <View style={styles.summaryRow}>
          {/* PEMASUKAN */}

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

          {/* PENGELUARAN */}

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

        {/* =====================================
            TRANSAKSI TERBARU
        ===================================== */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Transaksi Terbaru
          </Text>

          <Pressable onPress={() => {}}>
            <Text style={styles.seeAll}>
              Lihat semua
            </Text>
          </Pressable>
        </View>

        <View style={styles.transactionContainer}>
          {demoTransactions.map(
            (transaction, index) => {
              const isIncome =
                transaction.type === "income";

              return (
                <View
                  key={transaction.id}
                  style={[
                    styles.transactionItem,
                    index ===
                      demoTransactions.length - 1 &&
                      styles.lastTransaction,
                  ]}
                >
                  {/* ICON + DATA TRANSAKSI */}

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
                          isIncome
                            ? "#15803D"
                            : "#DC2626"
                        }
                      />
                    </View>

                    <View>
                      <Text
                        style={styles.transactionTitle}
                      >
                        {transaction.title}
                      </Text>

                      <Text
                        style={
                          styles.transactionCategory
                        }
                      >
                        {transaction.category}
                      </Text>
                    </View>
                  </View>

                  {/* NOMINAL */}

                  <Text
                    style={[
                      styles.transactionAmount,
                      isIncome
                        ? styles.incomeText
                        : styles.expenseText,
                    ]}
                  >
                    {isIncome ? "+" : "-"}
                    {formatRupiah(
                      transaction.amount
                    )}
                  </Text>
                </View>
              );
            }
          )}
        </View>

        {/* =====================================
            AKSES CEPAT
        ===================================== */}

        <Text style={styles.sectionTitle}>
          Akses Cepat
        </Text>

        <View style={styles.quickActionRow}>
          {/* TAMBAH TRANSAKSI */}

          <Pressable
            style={styles.quickAction}
            onPress={() => {}}
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

          {/* STATISTIK */}

          <Pressable
            style={styles.quickAction}
            onPress={() => {}}
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