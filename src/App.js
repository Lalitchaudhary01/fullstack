import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [memes, setMemes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get("https://api.imgflip.com/get_memes");
        setMemes(response.data.data.memes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMemes();
  }, []);

  const filteredMemes = memes.filter((meme) =>
    meme.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <h1 className="text-center text-3xl font-bold mb-5">
        Meme Template Viewer
      </h1>

      <div className="mb-5 flex justify-center">
        <input
          type="text"
          placeholder="Search memes..."
          className="p-3 border border-gray-300 rounded-lg w-full max-w-md focus:outline-none focus:ring focus:ring-blue-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMemes.length > 0 ? (
          filteredMemes.map((meme) => (
            <div
              key={meme.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={meme.url}
                alt={meme.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h2 className="text-lg font-medium text-gray-800">
                  {meme.name}
                </h2>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No memes found.
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
