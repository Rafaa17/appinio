import React, { useEffect, useState } from "react";
import { AppinioApi } from "../../api/AppinioApi";
import { useAuth } from "../../hooks/useAuth";
import { PostDto } from "appinio-api";
import { Link, useNavigate } from "react-router-dom";
import { AnimationType, DialogType, usePopup } from "react-custom-popup";

import "./Home.css";

export default function HomePage() {
  const { user, logout } = useAuth();
  const { showAlert } = usePopup();
  const [posts, setPosts] = useState<PostDto[]>([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    AppinioApi.api
      .findAllFromPostsController({
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch(() => {
        showAlert({
          type: DialogType.WARNING,
          text: "Something went wrong",
          animationType: AnimationType.SWING,
        });
      });
  }, []);

  return (
    <>
      <div className="add-new-post-btn">
        <Link to={"add-post"}>Add New Post</Link>
      </div>
      <div className="logout-btn">
        <Link onClick={handleLogout} to={""}>
          Logout
        </Link>
      </div>
      <div className="posts-container">
        {posts.map((post, _index) => (
          <div className="post-container">
            <h2>Post #{post.id}</h2>
            <div className="post-content">
              <div>
                <h5>Content</h5>
                <textarea value={post.content} />
              </div>

              <div>
                <h5>Summary</h5>
                <textarea value={post.summary} />
              </div>

              <div>
                <h5>Insights</h5>
                <textarea value={post.insights} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
