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
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#E2E8F0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
  },
  filterContainer: {
    flexDirection: "row",
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  activeFilterTab: {
    backgroundColor: "#FFFFFF",
  },
  filterText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  activeFilterText: {
    color: "#15803D",
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
    paddingBottom: 20,
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
  percentageText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "400",
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
  actionButton: {
    backgroundColor: "#15803D",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});