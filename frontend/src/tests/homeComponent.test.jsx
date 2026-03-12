import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Home from "../pages/Home";

// mock hook useHome
const mockUseHome = vi.fn();

vi.mock("../scripts/homeScript", () => ({
  default: () => mockUseHome()
}));


/*
TEST 1
Kiểm tra component có render title và danh sách employee không
*/
test("should render employee list", () => {

  mockUseHome.mockReturnValue({
    filteredEmployees: [
      { id: 1, name: "John", email: "john@gmail.com" },
      { id: 2, name: "Anna", email: "anna@gmail.com" }
    ],

    search: "",
    setSearch: vi.fn(),

    handleDelete: vi.fn(),
    handleEdit: vi.fn(),
    handleUpdate: vi.fn(),
    handleOpenAdd: vi.fn(),
    handleCreate: vi.fn(),

    editingEmployee: null,
    addingEmployee: false,
    deleteEmployee: null,

    name: "",
    email: "",
    password: "",
    errors: {},

    setName: vi.fn(),
    setEmail: vi.fn(),
    setPassword: vi.fn(),

    setEditingEmployee: vi.fn(),
    setAddingEmployee: vi.fn(),
    setDeleteEmployee: vi.fn(),
    confirmDelete: vi.fn()
  });

  render(<Home />);

  // kiểm tra title
  expect(screen.getByText("Employee List")).toBeInTheDocument();

  // kiểm tra employee hiển thị trong bảng
  expect(screen.getByText("John")).toBeInTheDocument();
  expect(screen.getByText("Anna")).toBeInTheDocument();
});


/*
TEST 2
Kiểm tra input search có gọi setSearch khi người dùng nhập
*/
test("should update search input", async () => {

  const setSearch = vi.fn();

  mockUseHome.mockReturnValue({
    filteredEmployees: [],
    search: "",
    setSearch,

    handleDelete: vi.fn(),
    handleEdit: vi.fn(),
    handleUpdate: vi.fn(),
    handleOpenAdd: vi.fn(),
    handleCreate: vi.fn(),

    editingEmployee: null,
    addingEmployee: false,
    deleteEmployee: null,

    name: "",
    email: "",
    password: "",
    errors: {},

    setName: vi.fn(),
    setEmail: vi.fn(),
    setPassword: vi.fn(),

    setEditingEmployee: vi.fn(),
    setAddingEmployee: vi.fn(),
    setDeleteEmployee: vi.fn(),
    confirmDelete: vi.fn()
  });

  render(<Home />);

  const input = screen.getByPlaceholderText("Search name or email...");

  await userEvent.type(input, "john");

  // kiểm tra setSearch có được gọi
  expect(setSearch).toHaveBeenCalled();
});


/*
TEST 3
Kiểm tra click nút Add Employee
*/
test("should call handleOpenAdd when clicking Add Employee", async () => {

  const handleOpenAdd = vi.fn();

  mockUseHome.mockReturnValue({
    filteredEmployees: [],
    search: "",
    setSearch: vi.fn(),

    handleDelete: vi.fn(),
    handleEdit: vi.fn(),
    handleUpdate: vi.fn(),
    handleOpenAdd,
    handleCreate: vi.fn(),

    editingEmployee: null,
    addingEmployee: false,
    deleteEmployee: null,

    name: "",
    email: "",
    password: "",
    errors: {},

    setName: vi.fn(),
    setEmail: vi.fn(),
    setPassword: vi.fn(),

    setEditingEmployee: vi.fn(),
    setAddingEmployee: vi.fn(),
    setDeleteEmployee: vi.fn(),
    confirmDelete: vi.fn()
  });

  render(<Home />);

  const button = screen.getByText("Add Employee");

  await userEvent.click(button);

  // kiểm tra hàm mở modal add
  expect(handleOpenAdd).toHaveBeenCalled();
});


/*
TEST 4
Kiểm tra modal Edit hiển thị khi editingEmployee khác null
*/
test("should render edit modal", () => {

  mockUseHome.mockReturnValue({
    filteredEmployees: [],
    search: "",
    setSearch: vi.fn(),

    handleDelete: vi.fn(),
    handleEdit: vi.fn(),
    handleUpdate: vi.fn(),
    handleOpenAdd: vi.fn(),
    handleCreate: vi.fn(),

    editingEmployee: { id: 1, name: "John", email: "john@gmail.com" },
    addingEmployee: false,
    deleteEmployee: null,

    name: "John",
    email: "john@gmail.com",
    password: "",
    errors: {},

    setName: vi.fn(),
    setEmail: vi.fn(),
    setPassword: vi.fn(),

    setEditingEmployee: vi.fn(),
    setAddingEmployee: vi.fn(),
    setDeleteEmployee: vi.fn(),
    confirmDelete: vi.fn()
  });

  render(<Home />);

  // kiểm tra modal edit xuất hiện
  expect(screen.getByText("Edit Employee")).toBeInTheDocument();
});


/*
TEST 5
Kiểm tra modal Delete hiển thị khi deleteEmployee khác null
*/
test("should render delete modal", () => {

  mockUseHome.mockReturnValue({
    filteredEmployees: [],
    search: "",
    setSearch: vi.fn(),

    handleDelete: vi.fn(),
    handleEdit: vi.fn(),
    handleUpdate: vi.fn(),
    handleOpenAdd: vi.fn(),
    handleCreate: vi.fn(),

    editingEmployee: null,
    addingEmployee: false,
    deleteEmployee: { id: 1, name: "John" },

    name: "",
    email: "",
    password: "",
    errors: {},

    setName: vi.fn(),
    setEmail: vi.fn(),
    setPassword: vi.fn(),

    setEditingEmployee: vi.fn(),
    setAddingEmployee: vi.fn(),
    setDeleteEmployee: vi.fn(),
    confirmDelete: vi.fn()
  });

  render(<Home />);

  // kiểm tra modal delete xuất hiện
  expect(screen.getByText("Delete Employee")).toBeInTheDocument();
});