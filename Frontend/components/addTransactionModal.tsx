"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Transaction {
    type: string;
    asset: string;
    symbol: string;
    quantity: number;
    price: number;
    date: string;
}

interface AddTransactionModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onAddTransaction: (transaction: Transaction) => void;
}

export function AddTransactionModal({
    isOpen,
    onOpenChange,
    onAddTransaction,
}: AddTransactionModalProps) {
    const [newTransaction, setNewTransaction] = useState<Transaction>({
        type: "buy",
        asset: "",
        symbol: "",
        quantity: 0,
        price: 0,
        date: new Date().toISOString().split("T")[0],
    });

    const handleSubmit = () => {
        onAddTransaction(newTransaction);
        setNewTransaction({
            type: "buy",
            asset: "",
            symbol: "",
            quantity: 0,
            price: 0,
            date: new Date().toISOString().split("T")[0],
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#F9FAFB]">
                <DialogHeader>
                    <DialogTitle className="text-[#1F2937]">
                        Add New Transaction
                    </DialogTitle>
                    <DialogDescription className="text-[#6B7280]">
                        Record a buy, sell, or SIP transaction for your
                        portfolio.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label
                            htmlFor="type"
                            className="text-right text-[#1F2937]"
                        >
                            Type
                        </Label>
                        <Select
                            value={newTransaction.type}
                            onValueChange={(value) =>
                                setNewTransaction({
                                    ...newTransaction,
                                    type: value,
                                })
                            }
                        >
                            <SelectTrigger
                                id="type"
                                className="col-span-2 border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937] focus:ring-[#06B6D4]"
                            >
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#F9FAFB]">
                                <SelectItem
                                    value="buy"
                                    className="text-black hover:bg-teal-600"
                                >
                                    Buy
                                </SelectItem>
                                <SelectItem value="sell" className="text-black">
                                    Sell
                                </SelectItem>
                                <SelectItem value="sip" className="text-black">
                                    SIP
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label
                            htmlFor="asset"
                            className="text-right text-[#1F2937]"
                        >
                            Asset
                        </Label>
                        <Input
                            id="asset"
                            placeholder="Asset Name"
                            className="col-span-2 border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937] placeholder:text-[#6B7280] focus:ring-[#06B6D4]"
                            value={newTransaction.asset}
                            onChange={(e) =>
                                setNewTransaction({
                                    ...newTransaction,
                                    asset: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label
                            htmlFor="symbol"
                            className="text-right text-[#1F2937]"
                        >
                            Symbol
                        </Label>
                        <Input
                            id="symbol"
                            placeholder="Symbol"
                            className="col-span-2 border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937] placeholder:text-[#6B7280] focus:ring-[#06B6D4]"
                            value={newTransaction.symbol}
                            onChange={(e) =>
                                setNewTransaction({
                                    ...newTransaction,
                                    symbol: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label
                            htmlFor="quantity"
                            className="text-right text-[#1F2937]"
                        >
                            Quantity
                        </Label>
                        <Input
                            id="quantity"
                            type="number"
                            className="col-span-2 border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937] placeholder:text-[#6B7280] focus:ring-[#06B6D4]"
                            value={newTransaction.quantity}
                            onChange={(e) =>
                                setNewTransaction({
                                    ...newTransaction,
                                    quantity: parseInt(e.target.value) || 0,
                                })
                            }
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label
                            htmlFor="price"
                            className="text-right text-[#1F2937]"
                        >
                            Price
                        </Label>
                        <Input
                            id="price"
                            type="number"
                            className="col-span-2 border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937] placeholder:text-[#6B7280] focus:ring-[#06B6D4]"
                            value={newTransaction.price}
                            onChange={(e) =>
                                setNewTransaction({
                                    ...newTransaction,
                                    price: parseInt(e.target.value) || 0,
                                })
                            }
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button
                            onClick={handleSubmit}
                            className="bg-[#06B6D4] text-white hover:bg-[#06B6D4]/90"
                        >
                            Add Transaction
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
