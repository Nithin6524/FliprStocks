import transactionService from "../services/transactionService.js";

export const transactionController = {
    async getTransactions(req, res) {
        try {
            const { symbol } = req.query;
            const transactions =
                await transactionService.getTransactionsBySymbol(symbol);

            res.json({
                success: true,
                data: transactions,
            });
        } catch (error) {
            console.error("Error fetching transactions:", error);
            res.status(500).json({
                success: false,
                error: "Failed to fetch transactions",
            });
        }
    },

    async createTransaction(req, res) {
        try {
            const { type, symbol, quantity, price, date } = req.body;

            // Basic validation
            if (!type || !symbol || !quantity || !price || !date) {
                return res.status(400).json({
                    success: false,
                    error: "Missing required fields",
                });
            }

            if (!["buy", "sell", "sip"].includes(type)) {
                return res.status(400).json({
                    success: false,
                    error: "Invalid transaction type",
                });
            }

            const transaction = await transactionService.createTransaction({
                type,
                symbol: symbol.toUpperCase(),
                quantity: parseFloat(quantity),
                price: parseFloat(price),
                date,
            });

            res.status(201).json({
                success: true,
                data: transaction,
            });
        } catch (error) {
            console.error("Error creating transaction:", error);
            res.status(500).json({
                success: false,
                error: "Failed to create transaction",
            });
        }
    },

};
