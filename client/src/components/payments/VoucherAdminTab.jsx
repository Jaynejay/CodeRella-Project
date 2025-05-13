import { useState } from "react";
import { Pencil, Trash2, CheckCircle2, XCircle } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import ConfirmActionModal from "../common/ConfirmActionModal";
import VoucherDetailModal from "./VoucherDetailModal";
import IconWithTooltip from "../common/IconWithTooltip";
import SearchBar from "../common/SearchBar";
import DateRangePicker from "../common/DateRangePicker";

import {
  useAdminVouchers,
  useApproveVoucher,
  useRejectVoucher,
  useDeleteVoucher,
} from "../../hooks/useAdminVouchers";

const ITEMS_PER_PAGE = 20;

const VoucherAdminTab = () => {
  const { data, isLoading, isError } = useAdminVouchers();
  const approveMutation = useApproveVoucher();
  const rejectMutation = useRejectVoucher();
  const deleteMutation = useDeleteVoucher();

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [viewTarget, setViewTarget] = useState(null);
  const [actionTarget, setActionTarget] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleApprove = (id) => {
    approveMutation.mutate(id, {
      onSuccess: () => toast.success("Voucher approved"),
      onError: () => toast.error("Failed to approve"),
    });
  };

  const handleReject = (id) => {
    rejectMutation.mutate(id, {
      onSuccess: () => toast.success("Voucher rejected"),
      onError: () => toast.error("Failed to reject"),
    });
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success("Voucher deleted"),
      onError: () => toast.error("Delete failed"),
    });
  };

  const filteredData =
    data?.filter((v) => {
      const matchesSearch =
        v.voucherNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.status.toLowerCase().includes(searchTerm.toLowerCase());

      const itemDate = new Date(v.submittedAt);
      const afterStart = startDate ? itemDate >= new Date(startDate) : true;
      const beforeEnd = endDate ? itemDate <= new Date(endDate) : true;

      return matchesSearch && afterStart && beforeEnd;
    }) || [];

  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / ITEMS_PER_PAGE)
  );

  return (
    <div className="bg-white shadow rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-semibold">Submitted Vouchers</h2>

      {isLoading ? (
        <Skeleton count={6} height={28} />
      ) : isError ? (
        <p className="text-red-600">Failed to load vouchers.</p>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <SearchBar
              placeholder="Search vouchers..."
              onSearch={setSearchTerm}
            />

            <div className="pl-24">Filter by date:</div>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-t">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 px-3">Voucher Code</th>
                  <th className="py-2 px-3">Submitted By</th>
                  <th className="py-2 px-3">Submitted At</th>
                  <th className="py-2 px-3">Course</th>
                  <th className="py-2 px-3">Subject</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">
                      No results found.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((v) => (
                    <tr key={v.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3">{v.voucherNo}</td>
                      <td className="py-2 px-3">{v.name}</td>
                      <td className="py-2 px-3">{v.submittedAt}</td>
                      <td className="py-2 px-3">{v.course}</td>
                      <td className="py-2 px-3">{v.subject}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
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
                      <td className="py-2 px-3 text-center">
                        <div className="flex justify-center gap-2">
                          <IconWithTooltip label="Edit">
                            <Pencil
                              size={18}
                              className="text-blue-600 hover:text-blue-800 cursor-pointer"
                              onClick={() => setViewTarget(v)}
                            />
                          </IconWithTooltip>

                          <IconWithTooltip label="Delete">
                            <Trash2
                              size={18}
                              className="text-red-600 hover:text-red-800 cursor-pointer"
                              onClick={() => setDeleteTarget(v)}
                            />
                          </IconWithTooltip>

                          <IconWithTooltip label="Approve">
                            <CheckCircle2
                              size={18}
                              className="text-green-600 hover:text-green-800 cursor-pointer"
                              onClick={() => {
                                setActionTarget(v);
                                setActionType("approve");
                              }}
                            />
                          </IconWithTooltip>

                          <IconWithTooltip label="Reject">
                            <XCircle
                              size={18}
                              className="text-gray-500 hover:text-red-500 cursor-pointer"
                              onClick={() => {
                                setActionTarget(v);
                                setActionType("reject");
                              }}
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
          title="Delete Voucher"
          description={`Are you sure you want to delete voucher ${deleteTarget.voucherNo}?`}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={() => {
            handleDelete(deleteTarget.id);
            setDeleteTarget(null);
          }}
        />
      )}

      {actionTarget && (
        <ConfirmActionModal
          title={`${actionType === "approve" ? "Approve" : "Reject"} Voucher`}
          description={`Are you sure you want to ${actionType} voucher ${actionTarget.voucherNo}?`}
          confirmLabel={actionType === "approve" ? "Approve" : "Reject"}
          onCancel={() => {
            setActionTarget(null);
            setActionType(null);
          }}
          onConfirm={() => {
            if (actionType === "approve") handleApprove(actionTarget.id);
            if (actionType === "reject") handleReject(actionTarget.id);
            setActionTarget(null);
            setActionType(null);
          }}
        />
      )}

      {viewTarget && (
        <VoucherDetailModal
          data={viewTarget}
          onClose={() => setViewTarget(null)}
        />
      )}
    </div>
  );
};

export default VoucherAdminTab;
