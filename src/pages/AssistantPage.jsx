import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import useAppStore from "../store/storeAnalytics";
import EmptyState from "../components/assistant/EmptyState";
import ThinkingSteps from "../components/assistant/ThinkingSteps";
import MessageBubble from "../components/assistant/MessageBubble";
import TypingIndicator from "../components/assistant/TypingIndicator";

export default function AssistantPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [thinking, setThinking] = useState([]);
    const bottomRef = useRef(null);
    const isDark = useAppStore(state => state.isDark);

    /* Auto scroll */
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const sendMessage = async (text) => {
        const msg = (text || input).trim();
        if (!msg || loading) return;

        setMessages(prev => [...prev, { role: "user", content: msg }]);
        setInput("");
        setLoading(true);
        setThinking([]);

        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        try {
            const res = await fetch("http://127.0.0.1:8000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: msg, user_token: token }),
            });

            const data = await res.json();
            setThinking(data.thinking || []);
            setMessages(prev => [...prev, { role: "assistant", content: data.answer }]);
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
        }

        setLoading(false);
    };

    return (
        <DashboardLayout title="AI Assistant">
            <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col">

                {/* Messages area */}
                <div className={`flex-1 overflow-y-scroll rounded-2xl border p-5 space-y-4 mb-4 transition-colors
          ${isDark
                        ? "bg-white/2 border-white/6"
                        : "bg-white border-slate-200 shadow-sm"
                    }
        `}>
                    {messages.length === 0 ? (
                        <EmptyState isDark={isDark} onSuggest={sendMessage} />
                    ) : (
                        <>
                            {messages.map((msg, i) => (
                                <div key={i}>
                                    {/* Show thinking before assistant message */}
                                    {msg.role === "assistant" && i === messages.length - 1 && (
                                        <ThinkingSteps steps={thinking} isDark={isDark} />
                                    )}
                                    <MessageBubble msg={msg} isDark={isDark} />
                                </div>
                            ))}
                            {loading && <TypingIndicator isDark={isDark} />}
                        </>
                    )}
                    <div ref={bottomRef} />
                </div>

                {/* Input area */}
                <div className={`flex items-center gap-3 p-3 rounded-2xl border transition-colors
          ${isDark
                        ? "bg-white/5 border-white/10"
                        : "bg-white border-slate-200 shadow-sm"
                    }
        `}>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                        placeholder="Ask about your projects, invoices, clients…"
                        disabled={loading}
                        className={`flex-1 bg-transparent text-sm outline-none placeholder transition-colors
              ${isDark ? "text-white placeholder-white/25" : "text-slate-800 placeholder-slate-400"}
            `}
                    />
                    <button
                        onClick={() => sendMessage()}
                        disabled={loading || !input.trim()}
                        className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 flex items-center justify-center text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_4px_12px_rgba(99,102,241,0.4)] shrink-0"
                    >
                        <Send size={15} className={loading ? "animate-pulse" : ""} />
                    </button>
                </div>

            </div>
        </DashboardLayout>
    );
}