"use client";

import { Search } from "lucide-react";
import { FormEvent, useState } from "react";

const SearchInput = () => {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(text);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-amber-400 transition"
    >
      <Search size={18} className="text-gray-400" />
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-full outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};

export default SearchInput;
