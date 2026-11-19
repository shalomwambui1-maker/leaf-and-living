import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ProductForm from "./ProductForm";

const emptyValues = {
  name: "",
  category: "",
  careLevel: "",
  description: "",
  price: "",
  image: "",
};

// helper: fills in the whole form with good values
async function fillForm(user) {
  await user.type(screen.getByLabelText("Name"), "  Snake Plant  ");
  await user.selectOptions(screen.getByLabelText("Category"), "Indoor");
  await user.selectOptions(screen.getByLabelText("Care level"), "easy");
  await user.type(screen.getByLabelText("Description"), "A simple plant");
  await user.type(screen.getByLabelText("Price (KES)"), "850");
  await user.selectOptions(
    screen.getByLabelText("Image"),
    "/images/snake-plant.jpg"
  );
}

function setup(onSubmit = jest.fn(), onCancel = jest.fn()) {
  render(
    <ProductForm
      title="Add product"
      initialValues={emptyValues}
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitLabel="Add product"
    />
  );
  return { onSubmit, onCancel, user: userEvent.setup() };
}

test("shows errors and does not submit when the form is empty", async () => {
  const { onSubmit, user } = setup();

  await user.click(screen.getByRole("button", { name: "Add product" }));

  expect(screen.getByText("Name is required")).toBeInTheDocument();
  expect(screen.getByText("Description is required")).toBeInTheDocument();
  expect(onSubmit).not.toHaveBeenCalled();
});

test("shows a price error when the price is 0", async () => {
  const { onSubmit, user } = setup();

  await fillForm(user);
  await user.clear(screen.getByLabelText("Price (KES)"));
  await user.type(screen.getByLabelText("Price (KES)"), "0");
  await user.click(screen.getByRole("button", { name: "Add product" }));

  expect(
    screen.getByText("Price must be a number greater than 0")
  ).toBeInTheDocument();
  expect(onSubmit).not.toHaveBeenCalled();
});

test("submits the correct values (trimmed name, price as a number)", async () => {
  const { onSubmit, user } = setup();

  await fillForm(user);
  await user.click(screen.getByRole("button", { name: "Add product" }));

  expect(onSubmit).toHaveBeenCalledWith({
    name: "Snake Plant",
    category: "Indoor",
    careLevel: "easy",
    description: "A simple plant",
    price: 850,
    image: "/images/snake-plant.jpg",
  });
});

test("Cancel calls onCancel", async () => {
  const { onCancel, user } = setup();

  await user.click(screen.getByRole("button", { name: "Cancel" }));

  expect(onCancel).toHaveBeenCalled();
});

test("keeps the typed input when saving fails", async () => {
  const failingSubmit = jest.fn().mockRejectedValue(new Error("server down"));
  const { user } = setup(failingSubmit);

  await fillForm(user);
  await user.click(screen.getByRole("button", { name: "Add product" }));

  expect(await screen.findByText(/could not save/i)).toBeInTheDocument();
  // the form still has what the user typed
  expect(screen.getByLabelText("Description")).toHaveValue("A simple plant");
  expect(screen.getByLabelText("Price (KES)")).toHaveValue(850);
});