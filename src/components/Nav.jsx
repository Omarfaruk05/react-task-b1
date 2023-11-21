import React from "react";

const Nav = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-5xl font-bold">APP</h3>
      </div>
      <div>
        <button className="bg-[#9BFF00] rounded-3xl py-1 px-3 font-semibold text-black">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Nav;
