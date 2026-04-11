export enum HomeStackRoutes {
  HOME = "Home",
  TRANSACTIONS_LIST = "TransactionsList",
  TRANSACTION_DETAILS = "TransactionDetails",
}

export type HomeStackParamList = {
  Home: undefined;
  TransactionsList: undefined;
  TransactionDetails: { transactionId: string };
};
