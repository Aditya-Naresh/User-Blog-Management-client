import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Bloglist from "./Bloglist";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlogPost,
  createCategory,
  fetchBloglist,
  fetchCategories,
  updateBlogPost,
} from "../redux/blog/blogThunk";
import FormModal from "./FormModal";
import BlogPage from "./BlogPage";
import {
  setFormModalClose,
  setSelectedCategoryId,
  setShowBlog,
  setShowCategoryModalOff,
  setShowCategoryModalOn,
} from "../redux/blog/blogSlice";
import toast from "react-hot-toast";
import CategoryList from "./CategoryList";
import CategoryFormModal from "./CategoryFormModal";

const Home = () => {
  const dispatch = useDispatch();
  const { accessToken, user_id } = useSelector((state) => state.auth);
  const {
    blogList,
    categoryList,
    selectedBlog,
    formModal,
    showBlog,
    editModal,
    selectedCategoryId,
    categoryFormModal,
  } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBloglist());
    dispatch(fetchCategories());
  }, [dispatch, accessToken, formModal, editModal, selectedBlog]);

  const handleCloseModal = () => dispatch(setFormModalClose());
  const handleCategoryClick = (data) => dispatch(setSelectedCategoryId(data));
  const handlCloseCategoryModal = () => dispatch(setShowCategoryModalOff());
  const onAddCategory = () => dispatch(setShowCategoryModalOn());

  const onSave = (data) => dispatch(createCategory(data));

  const ModalFormSubmission = (data) => {
    if (selectedBlog && editModal) {
      console.log("Dispatching update");

      dispatch(updateBlogPost({ id: selectedBlog.id, data: data }))
        .unwrap()
        .then((res) => {
          dispatch(setShowBlog(res));
          toast.success("Blog Updated");
        })
        .catch((error) => {
          toast.error("Error occured while updation: " + JSON.stringify(error));
        });
    } else {
      dispatch(createBlogPost(data))
        .unwrap()
        .then((res) => {
          console.log(res);

          toast.success("Blog Created");
        })
        .catch((error) => {
          console.log(error);

          toast.error("Error Occured: ", error);
        });
    }
  };
  return (
    <div>
      <CategoryList
        categories={categoryList}
        onCategoryClick={handleCategoryClick}
        onAddCategory={onAddCategory}
        accessToken={accessToken}
      />
      {!showBlog ? (
        <Bloglist blogs={blogList} selectedCategory={selectedCategoryId} />
      ) : (
        <BlogPage blog={selectedBlog} userId={user_id} />
      )}

      <FormModal
        open={formModal}
        onClose={handleCloseModal}
        categories={categoryList}
        submitFunction={ModalFormSubmission}
        editModal={editModal}
        initialData={selectedBlog}
      />
      <CategoryFormModal
        open={categoryFormModal}
        onClose={handlCloseCategoryModal}
        submitFunction={onSave}
      />
    </div>
  );
};

export default Home;
