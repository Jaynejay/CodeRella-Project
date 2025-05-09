import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackSchema } from "../../schemas/feedbackSchema";
import { useAccountData, useSubmitFeedback } from "../../hooks/usePayments";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 5;

const AccountTab = () => {
    const { data, isLoading, isError } = useAccountData();
    const feedbackMutation = useSubmitFeedback();
    const [page, setPage] = useState(1);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(feedbackSchema),
    });

    const onSubmit = (formData) => {
        feedbackMutation.mutate(formData, {
            onSuccess: () => {
                toast.success("Feedback submitted");
                reset();
            },
            onError: (err) => toast.error(err.message || "Something went wrong"),
        });
    };

    const paginatedHistory = data?.history?.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil((data?.history?.length || 0) / ITEMS_PER_PAGE);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 shadow">
                        <Skeleton height={30} className="mb-4" />
                        <Skeleton count={3} />
                    </div>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-red-600 p-6 text-lg">
                Failed to load account data. Please try again later.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 px-6 py-4">
            {/* Row 1: Balance & Bank */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Balance */}
                <div className="bg-white p-6 rounded-2xl shadow space-y-2">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Balance</h2>
                        <span className="bg-blue-900 text-white text-xs px-2 py-1 rounded-full">Rs</span>
                    </div>
                    <p className="text-4xl font-bold text-blue-800">
                        Rs. {data.balance.toLocaleString()}
                    </p>
                    <p className="text-sm text-red-600 font-medium">
                        🔴 Pending Rs. {data.pending.toFixed(2)}
                    </p>
                </div>

                {/* Bank Info */}
                <div className="bg-white p-6 rounded-2xl shadow space-y-2">
                    <h2 className="text-lg font-semibold mb-3">Bank Details</h2>
                    {Object.entries(data.bankDetails).map(([label, value]) => (
                        <p key={label}>
              <span className="font-medium">
                {label.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:
              </span>{" "}
                            {value}
                        </p>
                    ))}
                </div>
            </div>

            {/* Row 2: History & Feedback */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* History */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-lg font-semibold mb-4">History</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                            <tr className="text-left border-b">
                                <th className="py-2 px-3 font-medium text-gray-600">Paper</th>
                                <th className="py-2 px-3 font-medium text-gray-600">Voucher</th>
                                <th className="py-2 px-3 font-medium text-gray-600">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {paginatedHistory.map((item, idx) => (
                                <tr key={idx} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-3">{item.paper}</td>
                                    <td className="py-2 px-3">{item.voucher}</td>
                                    <td className="py-2 px-3">
                      <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.status === "Paid"
                                  ? "bg-green-100 text-green-700"
                                  : item.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-gray-200 text-gray-600"
                          }`}
                      >
                        {item.status}
                      </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                        >
                            Prev
                        </button>
                        <button
                            className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => p + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* Feedback */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-lg font-semibold mb-2">Payment Feedback</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <textarea
                rows={5}
                placeholder="Write your feedback here..."
                className="w-full p-3 border border-gray-300 rounded-md"
                {...register("feedback")}
            />
                        {errors.feedback && (
                            <p className="text-red-600 text-sm">{errors.feedback.message}</p>
                        )}
                        <button
                            type="submit"
                            disabled={feedbackMutation.isLoading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md w-full"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AccountTab;
