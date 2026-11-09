import { ExchangeRateResponse } from "../types/finance";

export const fetchExchangeRate = (
  baseCurrency: string = "USD",
): Promise<ExchangeRateResponse> => {
  return new Promise((resolve, reject) => {
    fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`)
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          reject("Gagal mengambil data kurs dari server.");
        }
      })
      .then(null, (error) => {
        reject("Terjadi kesalahan jaringan: " + error.message);
      });
  });
};
