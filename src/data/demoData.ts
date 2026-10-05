import type { Transaction } from "../types/finance";

export const demoTransactions: Transaction[] = [
  {
    id: "trx-001",
    title: "Gaji",
    amount: 2000000,
    type: "income",
    category: "Gaji",
    date: "2026-10-01",
  },
  {
    id: "trx-002",
    title: "Makan",
    amount: 25000,
    type: "expense",
    category: "Makanan",
    date: "2026-10-02",
  },
  {
    id: "trx-003",
    title: "Belanja",
    amount: 150000,
    type: "expense",
    category: "Belanja",
    date: "2026-10-03",
  },
  {
    id: "trx-004",
    title: "Transportasi",
    amount: 50000,
    type: "expense",
    category: "Transportasi",
    date: "2026-10-04",
  },
];

export function getTotalIncome(): number {
  let total = 0;

  for (let i = 0; i < demoTransactions.length; i++) {
    if (demoTransactions[i].type === "income") {
      total += demoTransactions[i].amount;
    }
  }

  return total;
}

export function getTotalExpense(): number {
  let total = 0;

  for (let i = 0; i < demoTransactions.length; i++) {
    if (demoTransactions[i].type === "expense") {
      total += demoTransactions[i].amount;
    }
  }

  return total;
}

export function getBalance(): number {
  return getTotalIncome() - getTotalExpense();
}
