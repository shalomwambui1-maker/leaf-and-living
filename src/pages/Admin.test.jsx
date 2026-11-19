import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Admin from "./Admin";

const products = [
  {
    id: "1",
    name: "Snake Plant",
    category: "Indoor",
    careLevel: "easy",
    description: "An upright plant.",
    price: 850,
    image: "/images/snake-plant.jpg",
  },
];

function setup(deleteProduct = jest.fn().mockResolvedValue()) {
  render(
    <MemoryRouter>
      <Admin
        products={products}
        loading={false}
        loadError={false}
        refreshProducts={jest.fn()}
        deleteProduct={deleteProduct}
      />
    </MemoryRouter>
  );
  return { deleteProduct, user: userEvent.setup() };
}

test("shows the products in the table", () => {
  setup();
  expect(screen.getByText("Snake Plant")).toBeInTheDocument();
});

test("cancelling the confirmation does not delete the product", async () => {
  const { deleteProduct, user } = setup();

  await user.click(screen.getByRole("button", { name: "Delete" }));
  expect(screen.getByRole("dialog")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Cancel" }));

  expect(deleteProduct).not.toHaveBeenCalled();
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("confirming the delete calls deleteProduct with the id", async () => {
  const { deleteProduct, user } = setup();

  await user.click(screen.getByRole("button", { name: "Delete" }));
  await user.click(screen.getByRole("button", { name: "Yes, delete" }));

  expect(deleteProduct).toHaveBeenCalledWith("1");
});

test("shows an error if the delete fails", async () => {
  const failing = jest.fn().mockRejectedValue(new Error("fail"));
  const { user } = setup(failing);

  await user.click(screen.getByRole("button", { name: "Delete" }));
  await user.click(screen.getByRole("button", { name: "Yes, delete" }));

  expect(await screen.findByText(/could not delete/i)).toBeInTheDocument();
});