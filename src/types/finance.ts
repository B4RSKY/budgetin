export type TransactionType = "income" | "expense";

export type TransactionCategory =
  | "Gaji"
  | "Makanan"
  | "Transportasi"
  | "Belanja"
  | "Tagihan"
  | "Hiburan"
  | "Pendidikan"
  | "Kesehatan"
  | "Tabungan"
  | "Lainnya";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
  note?: string;
}

export interface Budget {
  id: string;
  category: TransactionCategory;
  limit: number;
  spent: number;
}

export interface DemoProfile {
  displayName: string;
  email: string;
}

export interface ExchangeRateResponse {
  result: string;
  base_code: string;
  rates: {
    IDR: number;
  };
  time_last_update_utc: string;
}
