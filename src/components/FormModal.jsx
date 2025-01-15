import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { X, Save } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { useForm, Controller } from "react-hook-form";

const FormModal = ({
  open,
  onClose,
  categories,
  submitFunction,
  initialData,
  editModal,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (editModal && initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key, initialData[key]);
        if (key === "image" && initialData[key]) {
          setImagePreview(initialData[key]); // Set image preview if image exists
        }
      });
    } else {
      reset(); // Reset form if no initial data
      setImagePreview(null);
    }
  }, [initialData, setValue, reset]);

  // Handle markdown editor content
  const handleMarkdownChange = (value) => {
    setValue("content", value);
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  const onSubmit = (data) => {
    console.log(data);

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
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <div className="flex justify-between items-center">
          <Typography variant="h6">
            {editModal ? "Edit Blog" : "Create Blog"}
          </Typography>
          <Button onClick={onClose} color="secondary">
            <X size={24} />
          </Button>
        </div>
      </DialogTitle>

      <DialogContent>
        {/* Title Field */}
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Blog Title"
              variant="outlined"
              fullWidth
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : ""}
              sx={{ mb: 2 }}
            />
          )}
        />

        {/* Category Field */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Category</InputLabel>
          <Controller
            name="category"
            control={control}
            defaultValue=""
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select {...field} label="Category" error={!!errors.category}>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.category && (
            <Typography variant="body2" color="error">
              {errors.category.message}
            </Typography>
          )}
        </FormControl>

        {/* Image Upload Field */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" className="mb-2">
            Upload Blog Image
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
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

        {/* Blog Content (Markdown Editor) */}
        <div className="mb-4">
          <Typography variant="h6" className="mb-2">
            Blog Content (Markdown)
          </Typography>
          <Controller
            name="content"
            control={control}
            defaultValue=""
            rules={{ required: "Content is required" }}
            render={({ field }) => (
              <>
                <MDEditor
                  {...field}
                  value={field.value || ""}
                  onChange={(value) => field.onChange(value)}
                  height={300}
                />
                {errors.content && (
                  <Typography variant="body1" color="error">
                    {errors.content.message}
                  </Typography>
                )}
              </>
            )}
          />
        </div>
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

export default FormModal;
