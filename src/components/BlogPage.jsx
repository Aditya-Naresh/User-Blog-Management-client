import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import {
  Eye,
  Feather,
  AlertCircle,
  Edit,
  LucideArrowLeftCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setEditModalOn, setSelectedBlog } from "../redux/blog/blogSlice";
import { fetchBlogPost, updateViews } from "../redux/blog/blogThunk";
import { useNavigate, useParams } from "react-router-dom";

const BlogPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user_id);
  const isLoading = useSelector((state) => state.blog.isLoading);
  const [blog, setBlog] = useState();
  const { blogId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBlogPost(blogId))
      .unwrap()
      .then((res) => {
        setBlog(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, blogId]);

  const handleGoBack = () => {
    navigate("/");
  };

  const handleEdit = () => {
    console.log("Edit button Clicked");
    dispatch(setSelectedBlog(blog));
    dispatch(setEditModalOn());
  };

  if (!blog && !isLoading) {
    return (
      <div className="bg-gray-100 min-h-screen py-6 px-4 flex justify-center items-center">
        <AlertCircle size={40} className="text-red-500" />
        <Typography variant="h6" className="ml-4 text-gray-600">
          Error Fetching Blog Data
        </Typography>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin text-blue-500 w-12 h-12" />
        </div>
      ) : (
        <div className="bg-gray-100 min-h-screen py-6 px-4">
          <Card className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
            <CardMedia
              component="img"
              alt="Blog Image"
              height="200"
              image={blog.image ? blog.image : "/BLOG.png"}
              className="rounded-t-lg"
            />

            <CardContent className="p-6">
              <Typography
                variant="h4"
                className="text-primary font-bold text-2xl mb-4"
              >
                {blog.title}
              </Typography>

              <Typography variant="body1" className="text-secondary mb-4">
                <span className="font-semibold">Category:</span>{" "}
                {blog.category_name}
              </Typography>

              <div className="flex justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Eye size={20} className="text-gray-600" />
                  <Typography variant="body2" className="text-gray-600">
                    <span className="font-semibold">Views:</span> {blog.views}
                  </Typography>
                </div>
                <div className="flex items-center space-x-2">
                  <Feather size={20} className="text-gray-600" />
                  <Typography variant="body2" className="text-gray-600">
                    <span className="font-semibold">Author:</span> {blog.author}
                  </Typography>
                </div>
              </div>

              {/* Render Markdown Content */}
              <div className="markdown-body mb-6">
                <MDEditor.Markdown
                  source={blog.content}
                  style={{
                    backgroundColor: "#f9f9f9",
                    color: "#000000",
                    padding: "1rem",
                    borderRadius: "8px",
                  }}
                />
              </div>

              <div className="flex items-center space-x-4">
                {/* Edit Button (Only visible if user is the author) */}
                {userId == blog.user && (
                  <Button
                    variant="outlined"
                    color="primary"
                    className="flex items-center space-x-2"
                    onClick={handleEdit}
                  >
                    <Edit size={20} />
                    <span>Edit</span>
                  </Button>
                )}
              </div>
            </CardContent>

            <Box className="p-4 flex justify-between">
              <Button
                onClick={handleGoBack}
                variant="contained"
                color="secondary"
                className="w-full flex items-center space-x-2"
              >
                <LucideArrowLeftCircle size={20} />
                <span>Go Back</span>
              </Button>
            </Box>
          </Card>
        </div>
      )}
    </>
  );
};

export default BlogPage;
