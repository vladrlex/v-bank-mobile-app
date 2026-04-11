export interface Transaction {
  id: string;
  title: string;
  amount: string;
  date: string;
  category: string;
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "trx_123_abc",
    title: "Кафе 'Espressoholic'",
    amount: "-120.00 ₴",
    date: "25.10.2025, 14:30",
    category: "Їжа та напої",
  },
  {
    id: "trx_987_xyz",
    title: "Покупка в 'Silpo'",
    amount: "-850.50 ₴",
    date: "25.10.2025, 10:15",
    category: "Продукти",
  },
  {
    id: "trx_456_jkl",
    title: "Переказ коштів",
    amount: "+5000.00 ₴",
    date: "24.10.2025, 18:00",
    category: "Поповнення",
  },
  {
    id: "trx_789_mno",
    title: "Таксі 'Bolt'",
    amount: "-230.00 ₴",
    date: "24.10.2025, 09:00",
    category: "Транспорт",
  },
];
