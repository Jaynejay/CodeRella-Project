import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";

import { voucherSchema } from "../../schemas/voucherSchema";
import {
    useVoucherData,
    useVoucherSubmit,
    usePaymentRateSearch,
} from "../../hooks/useVoucher";

const ITEMS_PER_PAGE = 5;

const VoucherTab = () => {
    // State for pagination
    const [page, setPage] = useState(1);

    // State for payment rate search
    const [rateForm, setRateForm] = useState({
        courseCode: "",
        subjectCode: "",
        duration: "",
    });

    const paymentRateMutation = usePaymentRateSearch();
    const { data: vouchers, isLoading: isVouchersLoading, isError } = useVoucherData();
    const submitMutation = useVoucherSubmit();

    // react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(voucherSchema),
    });

    const onSubmit = (data) => {
        submitMutation.mutate(data, {
            onSuccess: () => {
                toast.success("Voucher submitted successfully!");
                reset();
            },
            onError: (err) => {
                toast.error(err.message || "Submission failed.");
            },
        });
    };

    const handleRateSearch = () => {
        if (!rateForm.courseCode || !rateForm.subjectCode || !rateForm.duration) {
            toast.error("Please select all fields before searching.");
            return;
        }
        paymentRateMutation.mutate(rateForm);
    };

    // Paginated voucher list
    const totalPages = Math.ceil((vouchers?.length || 0) / ITEMS_PER_PAGE);
    const paginatedVouchers = vouchers?.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Grid of Search + Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Payment Rate Search */}
                <div className="bg-white shadow rounded-2xl p-6 space-y-4">
                    <h2 className="text-xl font-semibold">Payment Rates</h2>

                    <div className="space-y-4">
                        <select
                            value={rateForm.courseCode}
                            onChange={(e) => setRateForm({ ...rateForm, courseCode: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select Course Code</option>
                            <option value="C101">C101</option>
                            <option value="C102">C102</option>
                        </select>

                        <select
                            value={rateForm.subjectCode}
                            onChange={(e) => setRateForm({ ...rateForm, subjectCode: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select Subject Code</option>
                            <option value="S201">S201</option>
                            <option value="S202">S202</option>
                        </select>

                        <select
                            value={rateForm.duration}
                            onChange={(e) => setRateForm({ ...rateForm, duration: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select Paper Duration</option>
                            <option value="2">2 hours</option>
                            <option value="3">3 hours</option>
                        </select>

                        <button
                            onClick={handleRateSearch}
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                        >
                            Search
                        </button>
                    </div>

                    {/* Rate Result */}
                    {paymentRateMutation.isPending ? (
                        <Skeleton height={70} />
                    ) : paymentRateMutation.data ? (
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mt-4 space-y-1">
                            <p className="text-sm">
                                <span className="font-medium">Rate:</span>{" "}
                                {paymentRateMutation.data.rate}
                            </p>
                            <p className="text-xs text-gray-600 italic">{paymentRateMutation.data.note}</p>
                        </div>
                    ) : paymentRateMutation.isSuccess && !paymentRateMutation.data ? (
                        <p className="text-sm text-red-600 mt-4">No rate found for selected criteria.</p>
                    ) : null}
                </div>

                {/* Right: Voucher Form */}
                <div className="bg-white shadow rounded-2xl p-6 space-y-4">
                    <h2 className="text-xl font-semibold mb-2">Voucher</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Please fill out the form to generate your voucher!
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Registration ID"
                            {...register("registrationId")}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        {errors.registrationId && (
                            <p className="text-red-600 text-sm">{errors.registrationId.message}</p>
                        )}

                        <input
                            type="text"
                            placeholder="Exam Name"
                            {...register("examName")}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        {errors.examName && (
                            <p className="text-red-600 text-sm">{errors.examName.message}</p>
                        )}

                        <input
                            type="text"
                            placeholder="Course Code"
                            {...register("courseCode")}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        {errors.courseCode && (
                            <p className="text-red-600 text-sm">{errors.courseCode.message}</p>
                        )}

                        <input
                            type="text"
                            placeholder="Subject Code"
                            {...register("subjectCode")}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        {errors.subjectCode && (
                            <p className="text-red-600 text-sm">{errors.subjectCode.message}</p>
                        )}

                        <textarea
                            rows={3}
                            placeholder="Message (optional)"
                            {...register("message")}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />

                        <button
                            type="submit"
                            disabled={submitMutation.isLoading}
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            {/* Submitted Vouchers */}
            <div className="bg-white shadow rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4">Submitted Voucher Requests</h2>

                {isVouchersLoading ? (
                    <Skeleton count={5} height={20} />
                ) : isError ? (
                    <p className="text-red-600">Failed to load voucher data.</p>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border-t">
                                <thead>
                                <tr className="text-left border-b">
                                    <th className="py-2 px-3">Reg ID</th>
                                    <th className="py-2 px-3">Exam</th>
                                    <th className="py-2 px-3">Course</th>
                                    <th className="py-2 px-3">Subject</th>
                                    <th className="py-2 px-3">Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {paginatedVouchers.map((v, i) => (
                                    <tr key={i} className="border-b hover:bg-gray-50">
                                        <td className="py-2 px-3">{v.registrationId}</td>
                                        <td className="py-2 px-3">{v.examName}</td>
                                        <td className="py-2 px-3">{v.courseCode}</td>
                                        <td className="py-2 px-3">{v.subjectCode}</td>
                                        <td className="py-2 px-3">
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                v.status === "Approved"
                                    ? "bg-green-100 text-green-700"
                                    : v.status === "Rejected"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                          {v.status}
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
                    </>
                )}
            </div>
        </div>
    );
};

export default VoucherTab;
