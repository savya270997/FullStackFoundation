import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const API = "/api/users";

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const fetchUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

  const addUser = async () => {
    if (!name.trim()) return;
    await axios.post(API, { name });
    setName("");
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>FullStack Users</h1>

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
                <button
                  onClick={async () => {
                    await axios.put(`/api/users/${editingId}`, {
                      name: editName,
                    });
                    setEditingId(null);
                    fetchUsers();
                  }}
                >
                  ✅
                </button>
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
