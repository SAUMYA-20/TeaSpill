import { useEffect, useState } from "react";
import api from "../api";

export default function CommentSection({ tea}) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComments = async () => {
    try {
      const res = await api.get("/tea");
      const tea = res.data.find((t) => t._id === tea._id);
      setComments(tea?.comments || []);
    } catch (err) {
      console.error(err);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  fetchComments();
}, []);

  const addComment = async () => {
    if (!text.trim()) return;

    try {
      await api.post(`/tea/${tea._id}/comment`, { text });
      setText("");
      fetchComments();
    } catch (err) {
      console.error("Comment failed", err);
    }
  };

  return (
    <div className="mt-2">
      <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
        {comments.map((c, i) => (
          <div key={i} className="text-sm bg-[var(--tea-yellow)]/20 dark:bg-[var(--tea-green)]/20 p-3 rounded-2xl text-gray-700 dark:text-gray-200 border-l-4 border-[var(--tea-green)] dark:border-[var(--tea-yellow)]">
            {c.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="border-2 border-[var(--tea-yellow)] dark:border-[var(--tea-green)] bg-white dark:bg-[#1f2f24] p-3 flex-1 rounded-full"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={addComment}
          className="bg-[var(--tea-green)] text-white px-5 rounded-full"
        >
          Comment
        </button>
      </div>
    </div>
  );
}