import { useEffect, useState } from "react";
import api from "../utils/api";

function useHome() {

  const [employees, setEmployees] = useState([]);

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchEmployees = () => {
    api.get("/employees")
      .then(res => {
        setEmployees(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = (id) => {

    if (!window.confirm("Are you sure to delete this employee?")) {
      return;
    }

    api.delete(`/employees/${id}`)
      .then(() => {
        setEmployees(prev =>
          prev.filter(emp => emp.id !== id)
        );
      })
      .catch(err => {
        console.log(err);
      });

  };

  // mở modal edit
  const handleEdit = (emp) => {

    setEditingEmployee(emp);
    setName(emp.name);
    setEmail(emp.email);

  };

  // lưu chỉnh sửa
  const handleUpdate = (e) => {

    e.preventDefault();

    api.put(`/employees/${editingEmployee.id}`, {
      name,
      email
    })
      .then(() => {

        fetchEmployees();
        setEditingEmployee(null);

      })
      .catch(err => {
        console.log(err);
      });

  };

  return {
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
  };

}

export default useHome;