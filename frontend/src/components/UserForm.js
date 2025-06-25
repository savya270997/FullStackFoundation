export default function UserForm({
  name,
  setName,
  onSubmit,
  isEditing,
  cancelEdit,
}) {
  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={onSubmit}>{isEditing ? "Update" : "Add"}</button>
      {isEditing && <button onClick={cancelEdit}>Cancel</button>}
    </div>
  );
}
