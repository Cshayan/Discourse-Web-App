import React, { useState } from "react";
import { Card, CardContent, Typography, Button } from "../material/index";
import { connect } from "react-redux";
import { deletePost, updatePost } from "../actions/posts";
import PropTypes from "prop-types";
import TitleIcon from "@material-ui/icons/Title";
import DescriptionIcon from "@material-ui/icons/Description";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const Post = ({ post, deletePost, updatePost }) => {
  let [updatedTitle, setUpdatedTitle] = useState("");
  let [updatedDesc, setUpdatedDesc] = useState("");

  const {
    _id,
    title,
    description,
    user: { name },
  } = post;

  const updatePostHandle = (_id) => {
    if (updatedTitle.length === 0) {
      updatedTitle = title;
    }
    if (updatedDesc.length === 0) {
      updatedDesc = description;
    }
    updatePost({ updatedTitle, updatedDesc, _id });
  };

  return (
    <div>
      <Card style={{ width: "70%", margin: "15px auto" }}>
        <CardContent>
          <Typography variant="h4">
            <TitleIcon style={{ color: "#341f97", margin: "0 5px" }} />
            <span
              contentEditable={true}
              suppressContentEditableWarning={true}
              onInput={(e) => setUpdatedTitle(e.currentTarget.textContent)}
            >
              {title}
            </span>
          </Typography>{" "}
          <br />
          <Typography variant="body1">
            <DescriptionIcon style={{ color: "#341f97", margin: "0 5px" }} />
            <span
              contentEditable={true}
              suppressContentEditableWarning={true}
              onInput={(e) => setUpdatedDesc(e.currentTarget.textContent)}
            >
              {description}
            </span>
          </Typography>
          <Typography variant="subtitle1" style={{ margin: "1rem" }}>
            Post by - <b>{name}</b>
          </Typography>
          <Button
            variant="outlined"
            color="default"
            onClick={() => updatePostHandle(_id)}
          >
            <EditIcon /> Update
          </Button>
          {"   "}
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => deletePost({ _id })}
          >
            <DeleteIcon /> Delete
          </Button>
          <p style={{ fontSize: "14px", margin: "0.5rem" }}>
            To update the title or description of the post, click over it and
            start editing. Press the update button to save the changes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

Post.propTypes = {
  deletePost: PropTypes.func,
  updatePost: PropTypes.func,
};

export default connect(null, { deletePost, updatePost })(Post);
