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

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.email.toLowerCase().includes(search.toLowerCase())
  );

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = (emp) => {
    setDeleteEmployee(emp);
  };

  const confirmDelete = async () => {
    if (!deleteEmployee) return;

    try {
      await api.delete(`/employees/${deleteEmployee.id}`);

      setEmployees((prev) =>
        prev.filter((emp) => emp.id !== deleteEmployee.id)
      );

      setDeleteEmployee(null);
    } catch (err) {
      console.error(err);
    }
  };

  const validate = (isAdd = false) => {
    const newErrors = {};
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

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    setName(emp.name);
    setEmail(emp.email);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await api.put(`/employees/${editingEmployee.id}`, {
        name,
        email,
      });

      fetchEmployees();
      setEditingEmployee(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenAdd = () => {
    setEditingEmployee(null);
    setAddingEmployee(true);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!validate(true)) return;

    try {
      await api.post("/employees", {
        name,
        email,
        password,
      });

      fetchEmployees();
      setAddingEmployee(false);
    } catch (err) {
      console.error(err);
    }
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
    confirmDelete,
  };
}

export default useHome;