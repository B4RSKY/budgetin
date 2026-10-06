import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // =====================================
  // CONTAINER
  // =====================================

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // =====================================
  // HEADER
  // =====================================

  header: {
    height: 90,
    marginTop: 18,
    marginLeft: 12,
    marginRight: 12,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    width: 105,
    height: 48,
    marginLeft: 5,
  },

  profileButton: {
    width: 42,
    height: 42,
    borderRadius: 21,

    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#BBF7D0",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 5,
  },

  // =====================================
  // GREETING
  // =====================================

  greeting: {
    marginTop: 2,
    marginBottom: 20,
  },

  greetingSmall: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 6,
  },

  greetingTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    lineHeight: 30,
  },

  // =====================================
  // BALANCE
  // =====================================

  balanceCard: {
    backgroundColor: "#15803D",
    borderRadius: 20,
    padding: 22,
    marginBottom: 18,
  },

  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  balanceLabel: {
    color: "#DCFCE7",
    fontSize: 14,
  },

  balanceAmount: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 12,
  },

  balanceDescription: {
    color: "#DCFCE7",
    fontSize: 12,
    marginTop: 6,
  },

  // =====================================
  // SUMMARY
  // =====================================

  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,

    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  summaryIconIncome: {
    width: 38,
    height: 38,
    borderRadius: 19,

    backgroundColor: "#DCFCE7",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 10,
  },

  summaryIconExpense: {
    width: 38,
    height: 38,
    borderRadius: 19,

    backgroundColor: "#FEE2E2",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 10,
  },

  summaryLabel: {
    fontSize: 12,
    color: "#475569",
    marginBottom: 5,
  },

  incomeAmount: {
    color: "#15803D",
    fontSize: 16,
    fontWeight: "700",
  },

  expenseAmount: {
    color: "#DC2626",
    fontSize: 16,
    fontWeight: "700",
  },

  // =====================================
  // SECTION
  // =====================================

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },

  seeAll: {
    color: "#15803D",
    fontSize: 13,
    fontWeight: "600",
  },

  // =====================================
  // TRANSACTION
  // =====================================

  transactionContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,

    paddingHorizontal: 16,
    marginBottom: 28,

    borderWidth: 1,
    borderColor: "#E2E8F0",

    overflow: "hidden",
  },

  transactionItem: {
    minHeight: 72,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  lastTransaction: {
    borderBottomWidth: 0,
  },

  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 12,
  },

  incomeIcon: {
    backgroundColor: "#DCFCE7",
  },

  expenseIcon: {
    backgroundColor: "#FEE2E2",
  },

  transactionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },

  transactionCategory: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 3,
  },

  transactionAmount: {
    fontSize: 13,
    fontWeight: "700",
  },

  incomeText: {
    color: "#15803D",
  },

  expenseText: {
    color: "#DC2626",
  },

  // =====================================
  // QUICK ACTION
  // =====================================

  quickActionRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },

  quickAction: {
    flex: 1,

    backgroundColor: "#FFFFFF",
    borderRadius: 16,

    padding: 18,

    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  quickIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,

    backgroundColor: "#DCFCE7",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 8,
  },

  quickText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0F172A",
    textAlign: "center",
  },
});