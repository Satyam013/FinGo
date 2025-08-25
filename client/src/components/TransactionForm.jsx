import { useState } from "react";
import axios from "axios";

export default function TransactionForm({ onTransaction }) {
  const [form, setForm] = useState({ type: "credit", amount: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/transactions",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onTransaction(res.data);
      setForm({ type: "credit", amount: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Transaction failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-gray-100 p-4 rounded-lg shadow-md"
    >
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="credit">Credit</option>
        <option value="debit">Debit</option>
      </select>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
