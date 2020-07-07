import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts, createPost } from "../actions/posts";
import Post from "./Post";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "../material";
import StreetviewIcon from "@material-ui/icons/Streetview";
import Divider from "@material-ui/core/Divider";
import PostAddIcon from "@material-ui/icons/PostAdd";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "50%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  input: {
    padding: "1rem",
    border: "1px solid #341f97",
    margin: "5px 0",
  },
}));

const Dashboard = ({ getPosts, posts: { posts, loading }, createPost }) => {
  const classes = useStyles();

  const [createPostData, setCreatePostData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const { title, description } = createPostData;

  // onChangeHandler
  const onChangeHandler = (e) => {
    setCreatePostData({ ...createPostData, [e.target.name]: e.target.value });
  };

  const onCreatePostFromSubmit = (e) => {
    e.preventDefault();
    createPost({ title, description });
    setCreatePostData({ title: "", description: "" });
  };

  return (
    <div>
      <br />
      <form
        className={classes.form}
        onSubmit={(e) => onCreatePostFromSubmit(e)}
      >
        <h2>
          <PostAddIcon /> Create a new post{" "}
        </h2>
        <input
          type="text"
          name="title"
          placeholder="Your post title"
          className={classes.input}
          value={title}
          onChange={(e) => onChangeHandler(e)}
        />
        <input
          name="description"
          rows="10"
          placeholder="Post description"
          value={description}
          style={{
            border: "1px solid #341f97",
            padding: "3rem 1rem",
            margin: "1rem 0",
          }}
          onChange={(e) => onChangeHandler(e)}
        />
        <br />
        <Button type="submit" variant="outlined" color="primary">
          Create a post
        </Button>
      </form>
      <br />
      <Typography variant="h5">
        <StreetviewIcon /> See your latest posts and posts by other authors
      </Typography>{" "}
      <Divider />
      {loading
        ? "Waiting..."
        : posts.map((post) => <Post key={post._id} post={post} />)}
    </div>
  );
};

Dashboard.propTypes = {
  getPosts: PropTypes.func.isRequired,
  createPost: PropTypes.func,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, { getPosts, createPost })(Dashboard);
