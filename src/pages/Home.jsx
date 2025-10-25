import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [catFacts, setCatFacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCatFacts = async () => {
    setLoading(true);
    try {
      // create random page min 1 to max 30
      const randomPage = Math.floor(Math.random() * 30) + 1;
      const res = await axios.get(
        `https://catfact.ninja/facts?page=${randomPage}`
      );
      const randomFacts = res.data.data
        ?.sort(() => Math.random() - 0.5)
        ?.slice(0, 4);

      setCatFacts(randomFacts);
    } catch (error) {
      console.error("Error fetching cat facts:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCatFacts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-700 to-black text-white flex flex-col p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold animate-pulse">Falling Clouds</h1>
        <Link
          to="/word_typing"
          className="bg-yellow-300 text-gray-800 font-semibold px-4 py-2 rounded-md hover:bg-yellow-400"
        >
          Go to Play Ground
        </Link>
      </div>

      <div className="flex flex-1 flex-col justify-centerd items-start px-4 md:!mt-15">
        <h2 className="font-semibold !text-start !mt-2">🐱 Random Cat Facts</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl !mx-austo !my-2">
          {loading ? (
            <p>Loading...</p>
          ) : (
            catFacts.map((fact, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-purple-800 via-purple-600 to-pink-600 p-1 rounded-xl shadow-xl transform hover:scale-105 transition duration-300"
              >
                <div className="bg-black text-white p-6 rounded-lg h-full flex items-center justify-center text-center text-sm">
                  {fact.fact}
                </div>
              </div>
            ))
          )}
        </div>

        {!loading && (
          <button
            onClick={fetchCatFacts}
            className="text-sm underline hover:text-yellow-200 self-start"
          >
            Show me new facts
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
