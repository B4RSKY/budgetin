import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
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

export default function HomeScreen() {
  const [showBalance, setShowBalance] = useState(true);

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