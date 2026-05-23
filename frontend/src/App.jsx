import React, { useState } from 'react';
import { Send, Plus, MessageSquare, Loader2 } from 'lucide-react';
import Plot3D from './components/Plot3D';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function App() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const activeChat = chats.find(c => c.id === activeChatId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    setIsLoading(true);
    const newId = Date.now().toString();
    const prompt = inputValue;
    setInputValue("");

    try {
      // Use the environment variable instead of hardcoding localhost
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      
      const res = await fetch(`${apiUrl}/api/visualize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      const data = await res.json();
      
      const newChat = {
        id: newId,
        title: prompt.length > 20 ? prompt.substring(0, 20) + "..." : prompt,
        data: data.success ? data : null,
        error: data.success ? null : data.error
      };

      setChats(prev => [newChat, ...prev]);
      setActiveChatId(newId);
    } catch (err) {
      console.error("Backend connection failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-glow">
      {/* Sidebar */}
      <div className="w-64 bg-geminiPanel border-r border-gray-800 flex flex-col z-10">
        <div className="p-4">
          <button 
            onClick={() => setActiveChatId(null)}
            className="flex items-center gap-2 w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-sm font-medium transition-colors"
          >
            <Plus size={16} /> New Visualization
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-2">
          <p className="text-xs text-gray-500 font-semibold px-2 mb-2 mt-4">Recent</p>
          {chats.map(chat => (
            <button
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-left transition-colors ${activeChatId === chat.id ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800/50'}`}
            >
              <MessageSquare size={14} />
              <span className="truncate">{chat.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        <div className="flex-1 flex flex-col items-center justify-center p-8 pb-32">
          {!activeChat ? (
            <div className="text-center animate-fade-in">
              <h1 className="text-4xl font-light text-white mb-4">Visualize your math!</h1>
              <p className="text-gray-400">Try typing "plot the sombrero function" or "show me a torus"</p>
            </div>
          ) : (
            <div className="w-full max-w-4xl h-full flex flex-col items-center">
              {activeChat.error ? (
                <div className="text-red-400 mt-20 text-xl font-light">{activeChat.error}</div>
              ) : (
                <>
                  <div className="text-geminiBlue text-lg mb-4 bg-blue-900/20 px-6 py-2 rounded-full border border-blue-900/50 overflow-x-auto max-w-full">
                    <InlineMath math={activeChat.data?.formula || ""} />
                  </div>
                  <div className="flex-1 w-full relative">
                    <Plot3D data={activeChat.data} />
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Floating Input Bar */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center px-8 z-20">
          <form 
            onSubmit={handleSubmit}
            className="w-full max-w-3xl bg-[#1e1e1e] border border-gray-700 rounded-full flex items-center px-4 py-3 shadow-2xl"
          >
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask for a 3D mathematical expression..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 px-2"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={!inputValue.trim() || isLoading}
              className={`p-2 rounded-full transition-colors ${!inputValue.trim() ? 'text-gray-600' : 'text-white bg-white/10 hover:bg-white/20'}`}
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}