import { BLOGS_LOADED, BLOG_SELECTED, BLOG_POSTED } from "../actions/types";

const initialState = {
  loading: true,
  allBlogs: [],
  selectedBlogID: "",
  postedBlog: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case BLOGS_LOADED:
      return {
        ...state,
        loading: false,
        allBlogs: payload.data,
      };
    case BLOG_POSTED:
      return {
        ...state,
        loading: false,
        postedBlog: payload
      };
    case BLOG_SELECTED:
      return { ...state, selectedBlogID: payload };
    default:
      return state;
  }
}
