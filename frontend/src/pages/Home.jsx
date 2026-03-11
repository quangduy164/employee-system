import "../css/Home.css";
import useHome from "../scripts/homeScript";

function Home() {

  const {
    employees,
    handleDelete,
    handleEdit,
    handleUpdate,
    editingEmployee,
    name,
    email,
    setName,
    setEmail,
    setEditingEmployee
  } = useHome();

  return (

    <div className="home-container">

      <h2>Employee List</h2>

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

          {employees.map((emp, index) => (

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


      {/* OVERLAY EDIT */}

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

    </div>

  );
}

export default Home;