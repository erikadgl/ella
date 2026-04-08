"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type Subscription = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  created_at: string;
  status: "pending" | "paid" | "cancelled";
  notes: string | null;
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: {
    label: "En attente",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  paid: {
    label: "Paye",
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  cancelled: {
    label: "Annule",
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
};

export default function AdminDashboard() {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchSubscriptions = useCallback(async () => {
    const res = await fetch("/api/admin/subscriptions");
    if (res.status === 401) {
      router.push("/admin");
      return;
    }
    const data = await res.json();
    setSubscriptions(data.subscriptions || []);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    await fetch("/api/admin/subscriptions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    await fetchSubscriptions();
    setUpdating(null);
  }

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-zinc-500">Chargement...</p>
      </div>
    );
  }

  const counts = {
    total: subscriptions.length,
    pending: subscriptions.filter((s) => s.status === "pending").length,
    paid: subscriptions.filter((s) => s.status === "paid").length,
    cancelled: subscriptions.filter((s) => s.status === "cancelled").length,
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <button
          onClick={() => fetchSubscriptions()}
          className="rounded-lg border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          Rafraichir
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
          <p className="text-sm text-zinc-500">Total</p>
          <p className="text-2xl font-bold">{counts.total}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
          <p className="text-sm text-zinc-500">En attente</p>
          <p className="text-2xl font-bold text-yellow-600">{counts.pending}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
          <p className="text-sm text-zinc-500">Payes</p>
          <p className="text-2xl font-bold text-green-600">{counts.paid}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
          <p className="text-sm text-zinc-500">Annules</p>
          <p className="text-2xl font-bold text-red-600">{counts.cancelled}</p>
        </div>
      </div>

      {/* Table */}
      {subscriptions.length === 0 ? (
        <div className="text-center py-12 text-zinc-500">
          Aucune inscription pour le moment
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-900">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Nom</th>
                <th className="text-left px-4 py-3 font-medium">Email</th>
                <th className="text-left px-4 py-3 font-medium">Telephone</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
                <th className="text-left px-4 py-3 font-medium">Statut</th>
                <th className="text-left px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                  <td className="px-4 py-3 font-medium">{sub.name}</td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {sub.email}
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {sub.phone || "—"}
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {new Date(sub.created_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_LABELS[sub.status]?.color}`}
                    >
                      {STATUS_LABELS[sub.status]?.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {sub.status !== "paid" && (
                        <button
                          onClick={() => updateStatus(sub.id, "paid")}
                          disabled={updating === sub.id}
                          className="rounded bg-green-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-green-500 disabled:opacity-50 transition-colors"
                        >
                          Marquer paye
                        </button>
                      )}
                      {sub.status !== "cancelled" && (
                        <button
                          onClick={() => updateStatus(sub.id, "cancelled")}
                          disabled={updating === sub.id}
                          className="rounded bg-red-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-red-500 disabled:opacity-50 transition-colors"
                        >
                          Annuler
                        </button>
                      )}
                      {sub.status !== "pending" && (
                        <button
                          onClick={() => updateStatus(sub.id, "pending")}
                          disabled={updating === sub.id}
                          className="rounded border border-zinc-300 dark:border-zinc-700 px-2.5 py-1 text-xs font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 transition-colors"
                        >
                          En attente
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
