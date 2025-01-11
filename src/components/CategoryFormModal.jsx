import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { X, Save } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

const CategoryFormModal = ({ open, onClose, submitFunction }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (
        key === "image" &&
        (data[key] instanceof File || data[key] instanceof Blob)
      ) {
        formData.append(key, data[key]);
      } else if (key !== "image") {
        formData.append(key, data[key]);
      }
    });
    submitFunction(formData);
    reset()
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <div className="flex justify-between items-center">
          <Typography variant="h6">
            Add Category
          </Typography>
          <Button onClick={onClose} color="secondary">
            <X size={24} />
          </Button>
        </div>
      </DialogTitle>

      <DialogContent>
        {/* Category Name Field */}
        <Controller
          name="name"
          control={control}
          rules={{ required: "Category name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Category Name"
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
              sx={{ mb: 2 }}
            />
          )}
        />

        {/* Image Upload Field */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" className="mb-2">
            Upload Category Image
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="category-image-upload"
          />
          <label htmlFor="category-image-upload">
            <Button variant="outlined" component="span" color="primary">
              Choose Image
            </Button>
          </label>

          {imagePreview && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="textSecondary">
                Image Preview:
              </Typography>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  objectFit: "contain",
                }}
              />
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
          startIcon={<Save size={20} />}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryFormModal;
