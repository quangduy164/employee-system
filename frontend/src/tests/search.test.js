import { describe, it, expect } from "vitest";

function filterEmployees(employees, search) {

  return employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.email.toLowerCase().includes(search.toLowerCase())
  );

}

describe("Employee Search", () => {

  const employees = [
    { name: "John", email: "john@gmail.com" },
    { name: "Anna", email: "anna@gmail.com" }
  ];

  it("should find by name", () => {

    const result = filterEmployees(employees, "john");

    expect(result.length).toBe(1);

  });

  it("should find by email", () => {

    const result = filterEmployees(employees, "anna");

    expect(result.length).toBe(1);

  });

});