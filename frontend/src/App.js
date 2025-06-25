import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const API = "/api/users";

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setUsers(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Add new user
  const addUser = async () => {
    if (!name.trim()) return;
    try {
      setLoading(true);
      await axios.post(API, { name });
      setName("");
      setError("");
      fetchUsers();
    } catch (err) {
      setError("Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API}/${id}`);
      setError("");
      fetchUsers();
    } catch (err) {
      setError("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  // Update user
  const updateUser = async () => {
    if (!editName.trim()) return;
    try {
      setLoading(true);
      await axios.put(`${API}/${editingId}`, { name: editName });
      setEditingId(null);
      setEditName("");
      setError("");
      fetchUsers();
    } catch (err) {
      setError("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>FullStack Users</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add user name"
      />
      <button onClick={addUser}>Add</button>

      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {editingId === u._id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <button onClick={updateUser}>✅</button>
                <button onClick={() => setEditingId(null)}>❌</button>
              </>
            ) : (
              <>
                {u.name}
                <button
                  onClick={() => {
                    setEditingId(u._id);
                    setEditName(u.name);
                  }}
                >
                  ✏️
                </button>
                <button onClick={() => deleteUser(u._id)}>🗑️</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
