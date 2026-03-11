import "../css/Home.css";
import useHome from "../scripts/homeScript";

function Home() {

  const {
    filteredEmployees,
    search,
    setSearch,
    handleDelete,
    handleEdit,
    handleUpdate,
    handleOpenAdd,
    handleCreate,
    editingEmployee,
    addingEmployee,
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    setEditingEmployee,
    setAddingEmployee
  } = useHome();

  return (

    <div className="home-container">

      <h2>Employee List</h2>

      {/* SEARCH + ADD */}
      <div className="top-bar">

        <input
          className="search-input"
          placeholder="Search name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="add-btn"
          onClick={handleOpenAdd}
        >
          Add Employee
        </button>

      </div>

      {/* TABLE */}
      <table className="employee-table">

        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredEmployees && filteredEmployees.map((emp, index) => (

            <tr key={emp.id}>
              <td>{index + 1}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() => handleEdit(emp)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(emp.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>


      {/* EDIT MODAL */}
      {editingEmployee && (

        <div className="overlay">

          <div className="modal">

            <h3>Edit Employee</h3>

            <form onSubmit={handleUpdate}>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />

              <div className="modal-buttons">

                <button type="submit">
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => setEditingEmployee(null)}
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* ADD MODAL */}
      {addingEmployee && (

        <div className="overlay">

          <div className="modal">

            <h3>Add Employee</h3>

            <form onSubmit={handleCreate}>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />

              <div className="modal-buttons">

                <button type="submit">
                  Create
                </button>

                <button
                  type="button"
                  onClick={() => setAddingEmployee(false)}
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );
}

export default Home;