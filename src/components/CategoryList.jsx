import React from "react";
import { Box, Button, Typography, Avatar, Chip } from "@mui/material";
import { Tag } from "lucide-react";

const CategoryList = ({
  categories,
  onCategoryClick,
  onAddCategory,
  accessToken,
}) => {
  const totalPosts = categories.reduce(
    (sum, category) => sum + category.post_count,
    0
  );

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#3f51b5",
          mb: 2,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Tag size={20} />
        Categories
      </Typography>

      {/* Button to Add New Category */}
      {accessToken && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            onClick={onAddCategory}
            variant="contained"
            sx={{
              backgroundColor: "#6a0dad", // Royal purple
              color: "#ffd700", // Golden text
              display: "flex",
              alignItems: "center",
              gap: "8px",
              "&:hover": {
                backgroundColor: "#8e24aa", // Slightly lighter purple on hover
              },
            }}
          >
            <Tag size={16} />
            Add New Category
          </Button>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {/* "Show all" category */}
        <Box
          key="showAll"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "#fff",
            padding: "12px 16px", // Uniform padding for all items
            borderRadius: "8px", // Same border radius for consistency
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            width: "fit-content", // Ensure the width adjusts to the content
            minWidth: "200px", // Minimum width for consistent size
            "&:hover": {
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
            },
          }}
          onClick={() => onCategoryClick(null)} // null represents "Show all"
        >
          {/* Circular Avatar Image */}
          <Avatar
            alt="All"
            src="./BLOG.png"
            sx={{
              width: 50,
              height: 50,
              border: "2px solid #3f51b5",
              cursor: "pointer",
            }}
          />
          {/* Category Name */}
          <Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                color: "#3f51b5",
                textTransform: "capitalize",
              }}
            >
              Show all
            </Typography>
            {/* Post Count Badge */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: "0.875rem",
                textTransform: "capitalize",
              }}
            >
              {totalPosts} Posts
            </Typography>
          </Box>
        </Box>

        {/* Categories list as Tags */}
        {categories.map((category) => (
          <Box
            key={category.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: "#fff",
              padding: "12px 16px", // Uniform padding for all items
              borderRadius: "8px", // Same border radius for consistency
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              width: "fit-content", // Ensure the width adjusts to the content
              minWidth: "200px", // Minimum width for consistent size
              "&:hover": {
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
              },
            }}
            onClick={() => onCategoryClick(category.id)} // Pass the category id
          >
            {/* Circular Avatar Image */}
            <Avatar
              alt={category.name}
              src={category.image}
              sx={{
                width: 50,
                height: 50,
                border: "2px solid #3f51b5",
                cursor: "pointer",
              }}
            />
            {/* Category Name */}
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color: "#3f51b5",
                  textTransform: "capitalize",
                }}
              >
                {category.name}
              </Typography>
              {/* Post Count Badge */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: "0.875rem",
                  textTransform: "capitalize",
                }}
              >
                {category.post_count} Posts
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryList;
