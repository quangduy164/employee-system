import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import useHome from "../scripts/homeScript";
import api from "../utils/api";

// mock api để không gọi server thật
vi.mock("../utils/api");



/*
TEST 1
Kiểm tra fetchEmployees gọi API và set employees
*/
test("should fetch employees", async () => {

  api.get.mockResolvedValue({
    data: [{ id: 1, name: "John", email: "john@gmail.com" }]
  });

  const { result } = renderHook(() => useHome());

  // chờ useEffect chạy
  await new Promise(resolve => setTimeout(resolve, 0));

  expect(result.current.employees.length).toBe(1);
});



/*
TEST 2
Kiểm tra search filter hoạt động
*/
test("should filter employees by search", async () => {

  api.get.mockResolvedValue({
    data: [
      { id: 1, name: "John", email: "john@gmail.com" },
      { id: 2, name: "Anna", email: "anna@gmail.com" }
    ]
  });

  const { result } = renderHook(() => useHome());

  await new Promise(resolve => setTimeout(resolve, 0));

  act(() => {
    result.current.setSearch("john");
  });

  expect(result.current.filteredEmployees.length).toBe(1);
});



/*
TEST 3
Kiểm tra mở modal Add Employee
*/
test("should open add modal", () => {

  const { result } = renderHook(() => useHome());

  act(() => {
    result.current.handleOpenAdd();
  });

  expect(result.current.addingEmployee).toBe(true);
});



/*
TEST 4
Kiểm tra mở modal Edit
*/
test("should open edit modal", () => {

  const { result } = renderHook(() => useHome());

  const employee = {
    id: 1,
    name: "John",
    email: "john@gmail.com"
  };

  act(() => {
    result.current.handleEdit(employee);
  });

  expect(result.current.editingEmployee).toEqual(employee);
});



/*
TEST 5
Kiểm tra delete employee
*/
test("should delete employee", async () => {

  api.get.mockResolvedValue({
    data: [{ id: 1, name: "John", email: "john@gmail.com" }]
  });

  api.delete.mockResolvedValue({});

  const { result } = renderHook(() => useHome());

  await new Promise(resolve => setTimeout(resolve, 0));

  act(() => {
    result.current.handleDelete({ id: 1 });
  });

  await result.current.confirmDelete();

  expect(api.delete).toHaveBeenCalled();
});