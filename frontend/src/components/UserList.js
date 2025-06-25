export default function UserList({ users, onEdit, onDelete }) {
  return (
    <ul>
      {users.map((u) => (
        <li key={u._id}>
          {u.name}
          <button onClick={() => onEdit(u)}>✏️</button>
          <button onClick={() => onDelete(u._id)}>🗑️</button>
        </li>
      ))}
    </ul>
  );
}
