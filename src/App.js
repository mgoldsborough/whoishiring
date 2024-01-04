import { useState, useEffect } from "react";
import CommentsComponent from "./CommentsComponent";
import "./App.css";

import postIds from "./postIds.json";

function App() {
  const [selectedPostId, setSelectedPostId] = useState(postIds[0].id);

  const [filterRemote, setFilterRemote] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white text-lg p-4">
        <h1 className="font-bold">HN: Who's Hiring?</h1>
      </header>

      <main className="flex-grow p-4 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          {/* Dropdown for selecting post ID */}
          <div className="mb-4">
            <label htmlFor="post-select" className="block text-gray-700 mb-2">
              Which Who's Hiring Post?
            </label>
            <select
              id="post-select"
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
              value={selectedPostId}
              onChange={(e) => setSelectedPostId(e.target.value)}
            >
              {postIds.map((ele) => (
                <option key={ele.id} value={ele.id}>
                  {ele.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="search"
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter keywords"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              id="remote"
              className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500 focus:border-blue-500 rounded"
              checked={filterRemote}
              onChange={(e) => setFilterRemote(e.target.checked)}
            />
            <label htmlFor="remote" className="ml-2 text-gray-700 text-lg">
              Show only 'REMOTE' comments
            </label>
          </div>
          <CommentsComponent
            postId={selectedPostId}
            filterRemote={filterRemote}
            searchTerm={debouncedSearchTerm}
          />
        </div>
      </main>

      <footer className="bg-gray-700 text-white text-center p-4">
        © 2024 Made by <a href="https://www.onlyonet.com">OOT</a> |{" "}
        <a href="https://github.com/mgoldsborough/whoshiring">Source Code</a>
      </footer>
    </div>
  );
}

export default App;
