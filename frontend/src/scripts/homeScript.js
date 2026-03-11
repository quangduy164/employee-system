import { useEffect, useState } from "react";
import api from "../utils/api";

function useHome() {

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [addingEmployee, setAddingEmployee] = useState(false);
  const [deleteEmployee, setDeleteEmployee] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});


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

  const handleDelete = (emp) => {
    setDeleteEmployee(emp);
  };

  const confirmDelete = () => {

    api.delete(`/employees/${deleteEmployee.id}`)
      .then(() => {

        setEmployees(prev =>
          prev.filter(emp => emp.id !== deleteEmployee.id)
        );

        setDeleteEmployee(null);

      })
      .catch(err => {
        console.log(err);
      });

  };


  const validate = (isAdd = false) => {

    let newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (isAdd) {
      if (!password) {
        newErrors.password = "Password is required";
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
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

    if (!validate()) return;

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

    if (!validate(true)) return;

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
    deleteEmployee,
    name,
    email,
    password,
    errors,
    setName,
    setEmail,
    setPassword,
    setEditingEmployee,
    setAddingEmployee,
    setDeleteEmployee,
    confirmDelete
  };
}

export default useHome;