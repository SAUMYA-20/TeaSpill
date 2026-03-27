import { useState } from "react";
import api from "../api";

export default function CreateTea({ refresh }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = async () => {
    if (!title.trim() || !content.trim()) return;

    await api.post("/tea", { title, content });
    setTitle("");
    setContent("");
    refresh();
  };

  return (
    <div className="p-6 rounded-3xl shadow-xl mb-8 backdrop-blur-md bg-white/50 dark:bg-black/50 border-2 border-[var(--tea-yellow)] dark:border-[var(--tea-green)] transition-all duration-300">

      <div className="p-6 rounded-2xl shadow-md bg-white dark:bg-[#2a3a2f] border border-[var(--tea-yellow)]/50 dark:border-[var(--tea-green)]/50 transition-all duration-300">

        <input
          className="border-2 border-[var(--tea-yellow)] dark:border-[var(--tea-green)] bg-white dark:bg-[#1f2f24]
                     text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                     p-4 w-full mb-4 rounded-2xl focus:outline-none focus:ring-4
                     focus:ring-[var(--tea-green)]/30 dark:focus:ring-[var(--tea-yellow)]/30 transition-all duration-200"
          placeholder="What's brewing? (Title)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border-2 border-[var(--tea-yellow)] dark:border-[var(--tea-green)] bg-white dark:bg-[#1f2f24]
                     text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                     p-4 w-full mb-5 rounded-2xl focus:outline-none focus:ring-4
                     focus:ring-[var(--tea-green)]/30 dark:focus:ring-[var(--tea-yellow)]/30 transition-all duration-200 resize-none"
          rows="3"
          placeholder="Spill the tea here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={submit}
          className="bg-[var(--tea-green)] text-white px-6 py-3 rounded-full font-bold
                     hover:bg-[var(--tea-brown)] hover:scale-105 hover:shadow-lg
                     transition-all duration-200 active:scale-95"
        >
          🍵 Post Tea
        </button>

      </div>
    </div>
  );
}