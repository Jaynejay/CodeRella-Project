import React, { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import RateFormModal from "./RateFormModal";
import { useAdminRates, useDeleteRate } from "../../hooks/useAdminRates";
import IconWithTooltip from "../common/IconWithTooltip";

const RatesTab = () => {
  const { data: rates, isLoading, isError } = useAdminRates();
  const deleteMutation = useDeleteRate();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formData, setFormData] = useState(null); // used for both add and edit

  const handleDelete = (id) => {
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success("Rate deleted successfully"),
      onError: (err) => toast.error(err.message || "Delete failed"),
    });
  };

  return (
    <div className="bg-white shadow rounded-2xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Payment Rates</h2>
        <button
          onClick={() => setFormData({})}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {isLoading ? (
        <Skeleton count={5} height={30} />
      ) : isError ? (
        <p className="text-red-600">Failed to load rates.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-t">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 px-3">Course Code</th>
                <th className="py-2 px-3">Course</th>
                <th className="py-2 px-3">Subject Code</th>
                <th className="py-2 px-3">Subject</th>
                <th className="py-2 px-3">Duration</th>
                <th className="py-2 px-3">Rate</th>
                <th className="py-2 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((rate) => (
                <tr key={rate.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3">{rate.courseCode}</td>
                  <td className="py-2 px-3">{rate.course}</td>
                  <td className="py-2 px-3">{rate.subjectCode}</td>
                  <td className="py-2 px-3">{rate.subject}</td>
                  <td className="py-2 px-3">{rate.duration}</td>
                  <td className="py-2 px-3">Rs. {rate.rate}</td>
                  <td className="py-2 px-3 text-center">
                    <div className="flex justify-center gap-3">
                      <IconWithTooltip label="Edit">
                        <Pencil
                          className="text-blue-600 hover:text-blue-800 cursor-pointer"
                          size={18}
                          onClick={() => setFormData(rate)}
                        />
                      </IconWithTooltip>

                      <IconWithTooltip label="Delete">
                        <Trash2
                          className="text-red-600 hover:text-red-800 cursor-pointer"
                          size={18}
                          onClick={() => setDeleteTarget(rate)}
                        />
                      </IconWithTooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          title="Delete Rate"
          description={`Are you sure you want to delete rate for ${deleteTarget.courseCode}?`}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={() => {
            handleDelete(deleteTarget.id);
            setDeleteTarget(null);
          }}
        />
      )}

      {formData !== null && (
        <RateFormModal
          initialData={formData}
          onClose={() => setFormData(null)}
        />
      )}
    </div>
  );
};

export default RatesTab;
