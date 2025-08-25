// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user info
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (err) {
      console.error("Error fetching user:", err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  // Fetch transactions and calculate balance
  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);

      let total = 1000; // default starting balance
      res.data.forEach((t) => {
        total = t.type === "credit" ? total + t.amount : total - t.amount;
      });
      setBalance(total);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  // Initialize dashboard
  useEffect(() => {
    const initialize = async () => {
      await fetchUser();
      await fetchTransactions();
      setLoading(false); // ✅ stop showing loading
    };
    initialize();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      {user && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-800"
            >
              Logout
            </button>
          </div>
          <p className="mb-4 text-lg">
            Welcome, <span className="font-semibold">{user.name}</span>!
          </p>
        </>
      )}

      <p className="mb-4 text-lg">
        Balance: <span className="font-bold">₹{balance}</span>
      </p>

      <TransactionForm onTransaction={fetchTransactions} />

      <h3 className="text-xl mt-6 mb-2 font-semibold">Transactions</h3>
      <ul className="space-y-2">
        {transactions.map((t, i) => (
          <li key={i} className="p-2 border rounded shadow-sm">
            {t.type.toUpperCase()} ₹{t.amount} on{" "}
            {new Date(t.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
