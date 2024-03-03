import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { DialogType, usePopup } from "react-custom-popup";
import { AppinioApi } from "../../api/AppinioApi";
import AddPost from "../../components/AddPostForm/AddPost";
import { useAuth } from "../../hooks/useAuth";

export default function AddPostPage() {
  const { user, logout } = useAuth();
  const [summary, setSummary] = useState<string>();
  const [insights, setInsights] = useState<string>();
  const { showAlert } = usePopup();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSummarize = async (content: string) => {
    try {
      const response = await AppinioApi.api.summarizeTextFromPostsController(
        {
          content,
        },
        { headers: { Authorization: `Bearer ${user?.accessToken}` } }
      );

      setSummary(response.data.summary);
      setInsights(response.data.insights);

      return;
    } catch (err) {
      showAlert({ type: DialogType.DANGER, text: "An error occured" });
      return;
    }
  };

  const handleCreate = async (content: string) => {
    try {
      await AppinioApi.api.createFromPostsController(
        {
          insights: insights!,
          content,
          summary: summary!,
        },
        { headers: { Authorization: `Bearer ${user?.accessToken}` } }
      );

      showAlert({ type: DialogType.SUCCESS, text: "Post Created!" });
    } catch (e) {
      showAlert({ type: DialogType.DANGER, text: "An error occured" });
    }
  };

  return (
    <div>
      <div className="logout-btn">
        <Link onClick={handleLogout} to={""}>
          Logout
        </Link>
      </div>
      <h2>Add Post</h2>
      <AddPost
        onSummarize={handleSummarize}
        onCreate={handleCreate}
        summary={summary}
        insights={insights}
      />
    </div>
  );
}
