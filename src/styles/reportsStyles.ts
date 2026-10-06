import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  headerArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
  },
  bannerCard: {
    backgroundColor: "#15803D",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  bannerLabel: {
    fontSize: 12,
    color: "#DCFCE7",
  },
  bannerAmount: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginVertical: 4,
  },
  bannerDescription: {
    fontSize: 12,
    color: "#DCFCE7",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748B",
  },
  incomeValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#15803D",
  },
  expenseValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#DC2626",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 12,
  },
  categoryList: {
    gap: 12,
    paddingBottom: 24,
  },
  categoryCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 10,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  progressBackground: {
    height: 6,
    backgroundColor: "#F1F5F9",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#15803D",
    borderRadius: 3,
  },
});