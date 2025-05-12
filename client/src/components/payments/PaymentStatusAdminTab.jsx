import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import SearchBar from "../common/SearchBar";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import IconWithTooltip from "../common/IconWithTooltip";
import StatusFormModal from "./StatusFormModal";
import { useAdminStatuses, useDeleteStatus } from "../../hooks/useAdminStatus";

const ITEMS_PER_PAGE = 20;

const StatusTab = () => {
  const { data: statuses, isLoading, isError } = useAdminStatuses();
  const deleteMutation = useDeleteStatus();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleDelete = (id) => {
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success("Status deleted"),
      onError: () => toast.error("Failed to delete status"),
    });
  };

  const filteredData =
    statuses?.filter((s) =>
      [s.voucherNo, s.userId, s.username, s.status, s.amount, s.date]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) || [];

  const paginated = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / ITEMS_PER_PAGE)
  );

  return (
    <div className="bg-white shadow rounded-2xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Payment Status</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={() => setFormData({})}
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {isLoading ? (
        <Skeleton count={6} height={28} />
      ) : isError ? (
        <p className="text-red-600">Failed to load statuses.</p>
      ) : (
        <>
          <SearchBar placeholder="Search status..." onSearch={setSearchTerm} />

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-t">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 px-3">User ID</th>
                  <th className="py-2 px-3">Username</th>
                  <th className="py-2 px-3">Voucher No</th>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">
                      No results found.
                    </td>
                  </tr>
                ) : (
                  paginated.map((s) => (
                    <tr key={s.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3">{s.userId}</td>
                      <td className="py-2 px-3">{s.username}</td>
                      <td className="py-2 px-3">{s.voucherNo}</td>
                      <td className="py-2 px-3">Rs. {s.amount}</td>
                      <td className="py-2 px-3">{s.date}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            s.status === "Paid"
                              ? "bg-green-100 text-green-700"
                              : s.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center">
                        <div className="flex justify-center gap-2">
                          <IconWithTooltip label="Edit">
                            <Pencil
                              size={18}
                              className="text-blue-600 hover:text-blue-800 cursor-pointer"
                              onClick={() => setFormData(s)}
                            />
                          </IconWithTooltip>
                          <IconWithTooltip label="Delete">
                            <Trash2
                              size={18}
                              className="text-red-600 hover:text-red-800 cursor-pointer"
                              onClick={() => setDeleteTarget(s)}
                            />
                          </IconWithTooltip>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-600 pt-2">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          title="Delete Status"
          description={`Are you sure you want to delete status for voucher ${deleteTarget.voucherNo}?`}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={() => {
            handleDelete(deleteTarget.id);
            setDeleteTarget(null);
          }}
        />
      )}

      {formData !== null && (
        <StatusFormModal
          initialData={formData}
          onClose={() => setFormData(null)}
        />
      )}
    </div>
  );
};

export default StatusTab;
