import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useSaveStatus } from "../../hooks/useAdminStatus";

const statusSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  username: z.string().min(1, "Username is required"),
  voucherNo: z.string().min(1, "Voucher No is required"),
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .positive("Amount must be greater than zero"),
  date: z.string().min(1, "Date is required"),
  status: z.enum(["Requested", "Pending", "Paid", "Cancelled"]),
});

const StatusFormModal = ({ initialData = {}, onClose }) => {
  const isEdit = !!initialData?.id;
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(statusSchema),
    defaultValues: initialData || {},
  });

  const mutation = useSaveStatus();

  useEffect(() => {
    if (initialData) {
      for (const key in initialData) {
        setValue(key, initialData[key]);
      }
    }
  }, [initialData, setValue]);

  const onSubmit = async (values) => {
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success(`Status ${isEdit ? "updated" : "added"} successfully`);
        reset();
        onClose();
      },
      onError: (err) => {
        toast.error(err.message || "Failed to save status");
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4">
          {isEdit ? "Edit Status" : "Add Status"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">User ID</label>
            <input
              {...register("userId")}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.userId && (
              <p className="text-red-500 text-sm">{errors.userId.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Username</label>
            <input
              {...register("username")}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Voucher No</label>
            <input
              {...register("voucherNo")}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.voucherNo && (
              <p className="text-red-500 text-sm">{errors.voucherNo.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Amount</label>
            <input
              type="number"
              {...register("amount", { valueAsNumber: true })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Date</label>
            <input
              type="date"
              {...register("date")}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Status</label>
            <select
              {...register("status")}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select</option>
              <option value="Requested">Requested</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusFormModal;
