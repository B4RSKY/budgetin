import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "../constants/theme";

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

  tombolNew: {
    alignItems: "center",
    justifyContent: "center",
    color: "#111827",
  },

  foot: {
    fontSize: 28,
    fontWeight: "700",
    margin: 12,
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

  container: { flex: 1, backgroundColor: colors.background },
  listContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  header: { marginBottom: spacing.xl },
  title: { fontSize: 24, fontWeight: "700", color: colors.textPrimary },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: 14,
    color: colors.textSecondary,
  },
  demoLabel: { marginTop: spacing.sm, fontSize: 12, color: colors.textMuted },
  filterRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  filterButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xs,
  },
  filterButtonActive: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  filterText: { fontSize: 12, color: colors.textSecondary, fontWeight: "600" },
  filterTextActive: { color: colors.primaryDark },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  transactionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  transactionTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  transactionInfo: { flex: 1 },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  transactionCategory: {
    marginTop: spacing.xs,
    fontSize: 13,
    color: colors.textSecondary,
  },
  transactionDate: {
    marginTop: spacing.xs,
    fontSize: 12,
    color: colors.textMuted,
  },
  amountBox: { alignItems: "flex-end", flexShrink: 1 },
  incomeAmount: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.success,
    textAlign: "right",
  },
  expenseAmount: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.danger,
    textAlign: "right",
  },
  typeLabel: { marginTop: spacing.sm, fontSize: 12, fontWeight: "600" },
  incomeLabel: { color: colors.success },
  expenseLabel: { color: colors.danger },
  emptyCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.card,
    padding: spacing.xl,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: "center",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailLabel: { fontSize: 14, color: colors.textSecondary },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
    flex: 1,
    textAlign: "right",
  },
  primaryButton: {
    minHeight: 44,
    borderRadius: radius.button,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xl,
    padding: spacing.md,
  },
  primaryButtonText: { color: colors.surface, fontWeight: "700", fontSize: 14 },
});
