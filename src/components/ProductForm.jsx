import { useState } from "react";
import validateProduct from "../utils/validateProduct";
import {
  CATEGORIES,
  CARE_LEVELS,
  IMAGE_OPTIONS,
} from "../constants/productOptions";

// Reusable form for Add and Edit
// Props:
// title - "Add product" or "Edit product"
// initialValues - empty values for Add, the product's values for Edit
// onSubmit - async function that receives the clean values (throws if saving fails)
// onCancel - function for the Cancel button
// submitLabel - text on the main button
function ProductForm({ title, initialValues, onSubmit, onCancel, submitLabel }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // updates the right field when the user types
  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");

    // 1. check the values
    const foundErrors = validateProduct(values);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) {
      return; // stop, show the errors
    }

    // 2. clean the values (trim spaces, price as a number)
    const cleanValues = {
      ...values,
      name: values.name.trim(),
      description: values.description.trim(),
      price: Number(values.price),
    };

    // 3. try to save. If it fails we keep what the user typed.
    setSubmitting(true);
    try {
      await onSubmit(cleanValues);
    } catch (error) {
      setSubmitError("Could not save the product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="form-card">
      <h2>{title}</h2>

      {submitError && <p className="admin-error">{submitError}</p>}

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Snake Plant"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <p className="field-error">{errors.name}</p>}

        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={values.category}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <p className="field-error">{errors.category}</p>}

        <label htmlFor="careLevel">Care level</label>
        <select
          id="careLevel"
          name="careLevel"
          value={values.careLevel}
          onChange={handleChange}
        >
          <option value="">Select a care level</option>
          {CARE_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        {errors.careLevel && <p className="field-error">{errors.careLevel}</p>}

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={values.description}
          onChange={handleChange}
        />
        {errors.description && (
          <p className="field-error">{errors.description}</p>
        )}

        <label htmlFor="price">Price (KES)</label>
        <input
          id="price"
          name="price"
          type="number"
          step="any"
          value={values.price}
          onChange={handleChange}
        />
        {errors.price && <p className="field-error">{errors.price}</p>}

        <label htmlFor="image">Image</label>
        <select
          id="image"
          name="image"
          value={values.image}
          onChange={handleChange}
        >
          <option value="">Select an image</option>
          {IMAGE_OPTIONS.map((image) => (
            <option key={image} value={image}>
              {image.split("/").pop()}
            </option>
          ))}
        </select>
        {errors.image && <p className="field-error">{errors.image}</p>}

        {/* small preview. If the image fails to load, we hide it */}
        {values.image && (
          <img
            key={values.image}
            src={values.image}
            alt="Preview"
            className="form-preview"
            onError={(e) => (e.target.style.display = "none")}
          />
        )}

        <div className="form-buttons">
          <button type="submit" className="admin-btn" disabled={submitting}>
            {submitting ? "Saving..." : submitLabel}
          </button>
          <button type="button" className="admin-btn outline" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;