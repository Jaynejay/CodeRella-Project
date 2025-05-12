import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rateSchema } from "../../schemas/rateSchema";
import { useAddRate, useUpdateRate } from "../../hooks/useAdminRates";
import toast from "react-hot-toast";

const RateFormModal = ({ initialData, onClose }) => {
  const isEdit = Boolean(initialData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(rateSchema),
    defaultValues: initialData || {},
  });

  const addMutation = useAddRate();
  const updateMutation = useUpdateRate();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    const mutation = isEdit ? updateMutation : addMutation;
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success(`Rate ${isEdit ? "updated" : "added"} successfully`);
        onClose();
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg space-y-4">
        <h2 className="text-lg font-semibold">
          {isEdit ? "Edit Payment Rate" : "Add New Payment Rate"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            placeholder="Course Code"
            {...register("courseCode")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.courseCode && (
            <p className="text-sm text-red-600">{errors.courseCode.message}</p>
          )}

          <input
            placeholder="Course"
            {...register("course")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.course && (
            <p className="text-sm text-red-600">{errors.course.message}</p>
          )}

          <input
            placeholder="Subject Code"
            {...register("subjectCode")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.subjectCode && (
            <p className="text-sm text-red-600">{errors.subjectCode.message}</p>
          )}

          <input
            placeholder="Subject"
            {...register("subject")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.subject && (
            <p className="text-sm text-red-600">{errors.subject.message}</p>
          )}

          <input
            placeholder="Duration (hours)"
            type="number"
            {...register("duration", { valueAsNumber: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.duration && (
            <p className="text-sm text-red-600">{errors.duration.message}</p>
          )}

          <input
            placeholder="Rate"
            type="number"
            {...register("rate", { valueAsNumber: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.rate && (
            <p className="text-sm text-red-600">{errors.rate.message}</p>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={addMutation.isLoading || updateMutation.isLoading}
            >
              {isEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RateFormModal;
