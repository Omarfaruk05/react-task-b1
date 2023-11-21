import React from "react";
import Nav from "../components/Nav";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "../components/Container";

const AdminDashboardPage = () => {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  const formattedTime = `${hours}:${minutes}`;
  const formattedDate = currentDate.toDateString();
  return (
    <div className="max-w-7xl mx-auto min-h-[90.5vh]">
      <Nav />
      {/* leaderboard heading  */}
      <div className="flex justify-between items-center mt-24">
        <div className="mb-4">
          <h5 className="text-5xl">Today's Leaderboard</h5>
        </div>
        <div className="flex gap-2 bg-gray-800 p-3 rounded-2xl">
          <small>{formattedDate}</small>
          <button className="bg-[#9BFF00] rounded-3xl text-xs px-4 text-black">
            SUBMISSIONS OPEN
          </button>
          <small>{formattedTime}</small>
        </div>
      </div>
      {/* data table  */}
      <div>
        {/* table heading  */}
        <div className="bg-gray-900 md:grid md:grid-cols-4 gap-4 mt-4 p-2 rounded-lg">
          <h4 className="text-xl font-semibold col-span-2"># Title</h4>
          <h4 className="text-xl font-semibold">Author</h4>
          <h4 className="text-xl font-semibold"> Likes</h4>
        </div>
        {/* table contentainer  */}
        <DndProvider backend={HTML5Backend}>
          <Container />
        </DndProvider>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
