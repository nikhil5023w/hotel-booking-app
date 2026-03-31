import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function ChangePassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.currentPassword || !form.newPassword)
      return toast.error("Fill all fields");

    try {
      setLoading(true);

      await API.put("/auth/change-password", form);

      toast.success("Password updated");
      setForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          type="password"
          placeholder="Current password"
          className="w-full border p-3 rounded"
          value={form.currentPassword}
          onChange={(e) =>
            setForm({ ...form, currentPassword: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="New password"
          className="w-full border p-3 rounded"
          value={form.newPassword}
          onChange={(e) =>
            setForm({ ...form, newPassword: e.target.value })
          }
        />

        <button
          disabled={loading}
          className="w-full bg-theme-accent text-white p-3 rounded hover:opacity-90"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}