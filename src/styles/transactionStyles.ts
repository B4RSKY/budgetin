import { StyleSheet } from "react-native";

export const transactionStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },

  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },

  transactionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,

    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  transactionTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  transactionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  transactionCategory: {
    fontSize: 13,
    color: "#6B7280",
  },

  transactionDate: {
    fontSize: 12,
    color: "#9CA3AF",
  },

  incomeAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16A34A",
  },

  expenseAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#DC2626",
  },

  typeLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
  },

  incomeLabel: {
    color: "#16A34A",
  },

  expenseLabel: {
    color: "#DC2626",
  },
});
