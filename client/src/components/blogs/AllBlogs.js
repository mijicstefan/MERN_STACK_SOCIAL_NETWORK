import React, { useEffect } from "react";
import PropTypes from "prop-types";
import BlogCard from "./BlogCard";
import { loadTeachers } from "../../actions/teachers";
import { connect } from "react-redux";
import { Grid, TextField } from "@material-ui/core";
//Blog API action
import { loadBlogs } from "../../actions/blog";



const AllBlogs = ({
  loadBlogs,
  blogs,
  loading,
}) => {
  useEffect(() => {
    loadBlogs();
  }, []);

  console.log('Blogs loaded:' , blogs);
  return (
    <div>
      <Grid container spacing={2}>
        {blogs &&
          blogs.map((blog) => (
            <Grid item xs={3}>
              <BlogCard
                key={blog.blogName}
                loading={loading}
                name={blog.blogName}
                category={blog.category}
                createdAt={blog.createdAt}
                blog={blog}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

AllBlogs.propTypes = {
  loadBlogs: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  blogs: PropTypes.array
};

const mapStateToProps = (state) => ({
  blogs: state?.blog?.allBlogs[0],
  loading: state?.blog?.loading
});

export default connect(mapStateToProps, { loadBlogs })(AllBlogs);
