import { createSlice } from "@reduxjs/toolkit";
import {
  createBlogPost,
  fetchBloglist,
  fetchBlogPost,
  fetchCategories,
  updateBlogPost,
} from "./blogThunk";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    isLoading: true,
    error: null,
    categoryList: [],
    selectedCategoryId: null,
    blogList: [],
    selectedBlog: {},
    selectedBlogId: null,
    showBlog: false,
    formModal: false,
    editModal: false,
    categoryFormModal: false,
  },
  reducers: {
    setShowBlog: (state, action) => {
      state.showBlog = true;
    },
    setShowBlogList: (state) => {
      state.showBlog = false;
    },
    setSelectedCategoryId: (state, action) => {
      state.selectedCategoryId = action.payload;
    },
    setFormModalOpen: (state) => {
      state.formModal = true;
    },
    setFormModalClose: (state) => {
      state.formModal = false;
    },
    setEditModalOn: (state) => {
      state.editModal = true;
      state.formModal = true;
    },
    setEditModalOff: (state) => {
      state.editModal = false;
      state.formModal = false;
    },
    setShowCategoryModalOn: (state) => {
      state.categoryFormModal = true;
    },
    setShowCategoryModalOff: (state) => {
      state.categoryFormModal = false;
    },
    setSelectedBlog: (state, action) => {
      state.selectedBlog = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBloglist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBloglist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogList = action.payload;
      })
      .addCase(fetchBloglist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createBlogPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBlogPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createBlogPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateBlogPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBlogPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateBlogPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const {
  setShowBlog,
  setShowBlogList,
  setFormModalClose,
  setFormModalOpen,
  setEditModalOn,
  setEditModalOff,
  setSelectedCategoryId,
  setShowCategoryModalOn,
  setShowCategoryModalOff,
  setSelectedBlog
} = blogSlice.actions;
export default blogSlice.reducer;
