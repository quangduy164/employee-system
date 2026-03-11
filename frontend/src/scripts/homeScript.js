import { useEffect, useState } from "react";
import api from "../utils/api";

function useHome() {

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [addingEmployee, setAddingEmployee] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.email.toLowerCase().includes(search.toLowerCase())
  );

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

  // update employee
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

  // mở modal add
  const handleOpenAdd = () => {
    setEditingEmployee(null);
    setAddingEmployee(true);
    setName("");
    setEmail("");
    setPassword("");
  };

  // tạo employee
  const handleCreate = (e) => {

    e.preventDefault();

    api.post("/employees", {
      name,
      email,
      password
    })
      .then(() => {

        fetchEmployees();
        setAddingEmployee(false);

      })
      .catch(err => {
        console.log(err);
      });

  };

  return {
    employees,
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
  };

}

export default useHome;