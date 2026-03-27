import api from "../api";
import CommentSection from "./CommentSection";

export default function TeaCard({ tea, refresh }) {
  return (
    <div className="p-6 rounded-3xl shadow-lg mb-6 backdrop-blur-md
                    bg-white/60 dark:bg-black/50
                    border-2 border-[var(--tea-yellow)] dark:border-[var(--tea-green)]
                    transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">

      <h2 className="text-2xl font-bold text-[var(--tea-green)] dark:text-[var(--tea-yellow)] mb-3">
        {tea.title}
      </h2>

      <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-5">
        {tea.content}
      </p>

      <div className="flex gap-4 mb-5">

        <button
          onClick={async () => {
            await api.post(`/tea/${tea._id}/like`);
            refresh();
          }}
          className="px-5 py-2.5 rounded-full font-semibold
                     bg-[var(--tea-yellow)] text-[var(--tea-brown)]
                     hover:bg-[#e5b520] hover:scale-105 hover:shadow-lg
                     transition-all duration-200 active:scale-95"
        >
          🔥 {tea.likes}
        </button>

        <button
          onClick={async () => {
            await api.post(`/tea/${tea._id}/dislike`);
            refresh();
          }}
          className="px-5 py-2.5 rounded-full font-semibold
                     bg-[var(--tea-brown)] text-[var(--tea-yellow)]
                     hover:bg-[#4a3024] hover:scale-105 hover:shadow-lg
                     transition-all duration-200 active:scale-95"
        >
          ❄️ {tea.dislikes}
        </button>

      </div>

      <div className="border-t border-[var(--tea-yellow)]/30 dark:border-[var(--tea-green)]/30 pt-4">
        <CommentSection teaId={tea._id} />
      </div>
    </div>
  );
}