import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Pagination,
  Box,
} from "@mui/material";
import { Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setShowBlog } from "../redux/blog/blogSlice";
import { useNavigate } from "react-router-dom";
import { fetchBlogPost } from "../redux/blog/blogThunk";

const Bloglist = () => {
  const { blogList, selectedCategoryId } = useSelector((state) => state.blog);
  
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const filteredBlogs = selectedCategoryId
    ? blogList.filter((blog) => blog.category === selectedCategoryId)
    : blogList;

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const navigate = useNavigate();
  const handleViewBlog = (blog) => {    
    navigate(`/blog/${blog.id}`);
  };

 

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          color: "#3f51b5",
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          mb: 4,
        }}
      >
        Browse the Blogs
      </Typography>

      {filteredBlogs.length === 0 ? (
        <Typography variant="h5" align="center" sx={{ color: "gray" }}>
          No blogs available in this category.
        </Typography>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 4,
              px: 4,
            }}
          >
            {currentBlogs.map((blog) => (
              <Card
                key={blog.id}
                sx={{
                  background: "linear-gradient(145deg, #ffffff, #e0e0e0)",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.33)",
                  borderRadius: "12px",
                }}
              >
                <CardMedia
                  component="img"
                  image={blog.image ? blog.image : "/BLOG.png"}
                  alt={blog.title}
                  sx={{
                    height: 200,
                    width: "100%",
                    objectFit: "cover",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />

                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ color: "#3f51b5", fontWeight: "bold" }}
                  >
                    {blog.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {blog.content.length > 100
                      ? `${blog.content.substring(0, 100)}...`
                      : blog.content}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      <Eye size={16} style={{ marginRight: 4 }} />
                      {blog.views} Views
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <span style={{ fontWeight: "bold" }}>Author:</span>{" "}
                      {blog.author}
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Eye />}
                    onClick={() => handleViewBlog(blog)}
                    sx={{
                      color: "#3f51b5",
                      "&:hover": {
                        color: "#303f9f",
                      },
                    }}
                  >
                    View Blog
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>

          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{ mt: 4, display: "flex", justifyContent: "center" }}
          />
        </>
      )}
    </div>
  );
};

export default Bloglist;
