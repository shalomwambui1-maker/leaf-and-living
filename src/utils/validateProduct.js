import { CATEGORIES, CARE_LEVELS, IMAGE_OPTIONS } from "../constants/productOptions";

// Checks the form values and returns an object of errors.
// If the object is empty, the product is valid.
function validateProduct(values) {
  const errors = {};

  // name: required (trim spaces first)
  if (!values.name || values.name.trim() === "") {
    errors.name = "Name is required";
  }

  // category: must be one of the agreed options
  if (!CATEGORIES.includes(values.category)) {
    errors.category = "Please choose a category";
  }

  // care level: must be one of the agreed options
  if (!CARE_LEVELS.includes(values.careLevel)) {
    errors.careLevel = "Please choose a care level";
  }

  // description: required
  if (!values.description || values.description.trim() === "") {
    errors.description = "Description is required";
  }

  // price: must be a number greater than 0
  const price = Number(values.price);
  if (values.price === "" || values.price === undefined || isNaN(price) || price <= 0) {
    errors.price = "Price must be a number greater than 0";
  }

  // image: must be from the bundled images
  if (!IMAGE_OPTIONS.includes(values.image)) {
    errors.image = "Please choose an image";
  }

  return errors;
}

export default validateProduct;