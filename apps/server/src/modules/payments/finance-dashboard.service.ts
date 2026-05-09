import FinanceTransaction from "../../models/FinanceTransaction";

export const getFinanceDashboard = async () => {
  const now = new Date();

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const transactions = await FinanceTransaction.find({
    isDeleted: false,
    status: "completed",
  });

  const monthlyTransactions = transactions.filter((t) => t.transactionDate >= startOfMonth);

  const monthlyIncome = monthlyTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const monthlyExpenses = monthlyTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return {
    monthlyIncome,
    monthlyExpenses,
    monthlyProfit: monthlyIncome - monthlyExpenses,
  };
};
