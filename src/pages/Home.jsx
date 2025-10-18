import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-dvh">
      <Link
        className="bg-red-700 text-white p-3 rounded-md cursor-pointer"
        to="/word_typing"
      >
        Go to the Play Ground
      </Link>
    </div>
  );
};

export default Home;
