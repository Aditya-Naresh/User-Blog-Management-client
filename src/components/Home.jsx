import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Bloglist from "./Bloglist";
import FormModal from "./FormModal";
import BlogPage from "./BlogPage";
import CategoryList from "./CategoryList";
import CategoryFormModal from "./CategoryFormModal";

import {
  createBlogPost,
  createCategory,
  fetchBloglist,
  fetchCategories,
  updateBlogPost,
} from "../redux/blog/blogThunk";

import {
  setFormModalClose,
  setSelectedCategoryId,
  setShowBlog,
  setShowCategoryModalOff,
  setShowCategoryModalOn,
} from "../redux/blog/blogSlice";
import { Loader } from "lucide-react";

const Home = ({ children }) => {
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.auth);
  const {
    isLoading,
    categoryList,
    selectedBlog,
    formModal,
    editModal,
    categoryFormModal,
  } = useSelector((state) => state.blog);

  // Fetch blogs and categories on mount
  useEffect(() => {
    dispatch(fetchBloglist());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handlers
  const handleCloseModal = () => dispatch(setFormModalClose());
  const handleCategoryClick = (data) => dispatch(setSelectedCategoryId(data));
  const handleCloseCategoryModal = () => dispatch(setShowCategoryModalOff());
  const handleAddCategory = () => dispatch(setShowCategoryModalOn());

  const handleCategorySave = (data) => {
    dispatch(createCategory(data))
      .unwrap()
      .then(() => {
        toast.success("Category created successfully!");
      })
      .catch((error) => {
        console.error("Error creating category:", error);
        toast.error("Failed to create category.");
      });
  };

  const handleFormSubmission = (data) => {
    if (selectedBlog && editModal) {
      dispatch(updateBlogPost({ id: selectedBlog.id, data }))
        .unwrap()
        .then((res) => {
          dispatch(setShowBlog(res));
          toast.success("Blog updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating blog:", error);
          toast.error("Failed to update blog.");
        });
    } else {
      dispatch(createBlogPost(data))
        .unwrap()
        .then((res) => {
          toast.success("Blog created successfully!");
        })
        .catch((error) => {
          console.error("Error creating blog:", error);
          toast.error("Failed to create blog.");
        });
    }
  };

  return (
    <div>
      <CategoryList
        categories={categoryList}
        onCategoryClick={handleCategoryClick}
        onAddCategory={handleAddCategory}
        accessToken={accessToken}
      />

      <FormModal
        open={formModal}
        onClose={handleCloseModal}
        categories={categoryList}
        submitFunction={handleFormSubmission}
        editModal={editModal}
        initialData={selectedBlog}
      />

      <CategoryFormModal
        open={categoryFormModal}
        onClose={handleCloseCategoryModal}
        submitFunction={handleCategorySave}
      />
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin text-blue-500 w-12 h-12" />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Home;
