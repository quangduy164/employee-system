import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";
import { describe, it, expect } from "vitest";

const renderHome = () =>
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

describe("Home component", () => {

  it("should render title", () => {
    renderHome();

    expect(
      screen.getByText("Employee List")
    ).toBeInTheDocument();
  });

  it("should show search input", () => {
    renderHome();

    expect(
      screen.getByPlaceholderText("Search name or email...")
    ).toBeInTheDocument();
  });

  it("should show add button", () => {
    renderHome();

    expect(
      screen.getByText("Add Employee")
    ).toBeInTheDocument();
  });

});