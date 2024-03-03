import React, { useState } from "react";

import "../LoginForm/LoginForm.css";

interface Props {
  onSummarize: (content: string) => Promise<void>;
  onCreate: (content: string) => Promise<void>;
  summary?: string;
  insights?: string;
}

export default function AddPost({
  onSummarize,
  onCreate,
  summary,
  insights,
}: Props) {
  const [content, setContent] = useState<string>();

  const handleSummarize = () => {
    if (!content) {
      return;
    }

    onSummarize(content);
  };

  const handleCreate = () => {
    if (!content || !summary || !insights) {
      return;
    }

    onCreate(content);
  };

  return (
    <div className="login-form">
      <div className="input-container">
        <textarea
          placeholder="Enter Content"
          value={content}
          onChange={(ev) => setContent(ev.target.value)}
        />
      </div>

      <div className="button-container" onClick={handleSummarize}>
        <div className="button">Summarize</div>
      </div>

      {summary && (
        <div className="input-container">
          <h4>Summary</h4>
          <textarea
            value={summary}
            onChange={(ev) => setContent(ev.target.value)}
          />
        </div>
      )}

      {insights && (
        <div className="input-container">
          <h4>Insights</h4>
          <textarea
            value={insights}
            onChange={(ev) => setContent(ev.target.value)}
          />
        </div>
      )}

      <div className="button-container" onClick={handleCreate}>
        <div className="button">Create</div>
      </div>
    </div>
  );
}
