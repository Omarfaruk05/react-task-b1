import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import MkdSDK from "../utils/MkdSDK";

const AdminDashboardPage = () => {
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");
  const [page, setpage] = useState(1);

  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();

  const sdk = new MkdSDK();
  useEffect(() => {
    async function response() {
      try {
        const videoData = await sdk.callRestAPI(
          { page: page, limit: 10 },
          "PAGINATE"
        );
        setVideo(videoData.list);
        console.log(video); // Log the video state here
      } catch (error) {
        if (error.message) {
          console.log(error.message);
          setError("email", { message: error.message });
        }
      }
    }
    response();
  }, [page]);
  console.log(video);

  if (!video) {
    return (
      <div className=" w-full h-[90.5vh] flex justify-center items-center">
        <button
          type="button"
          class="bg-indigo-500 rounded-md flex text-3xl px-4 py-2"
          disabled
        >
          Loading...
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto min-h-[90.5vh]">
      <Nav />
      {/* leaderboard heading  */}
      <div className="flex justify-between items-center mt-24">
        <div>
          <h5 className="text-2xl font-semibold">Todays Leaderboard</h5>
        </div>
        <div className="flex gap-2 bg-gray-700 p-3 rounded-lg">
          <small>{formattedDate}</small>
          <button className="bg-[#9BFF00] rounded-3xl text-xs px-4 text-black">
            SUBMISSIONS OPEN
          </button>
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
        {/* table content  */}
        {video?.map((x) => (
          <div
            key={x.id}
            className="md:grid md:grid-cols-4 gap-4 mt-4 border border-gray-600 py-2 px-4 rounded-2xl"
          >
            <div className="col-span-2 flex gap-2 font-semibold items-center">
              <p>{x?.id}</p>
              <div className="w-24 bg-gray-600 rounded-md">
                <img className="w-24 rounded-md" src={x?.photo} alt="" />
              </div>
              <h3 className="text-xl">{x?.title}</h3>
            </div>
            <h4 className="text-lg">{x?.username}</h4>
            <h4 className="text-lg ">{x?.like}</h4>
          </div>
        ))}
      </div>
      {/* pagination  */}
      <div className=" w-full text-center mt-12">
        <button
          onClick={() => setpage(page + 1)}
          className="text-black bg-[#9BFF00] px-4 py-1 rounded-lg"
        >
          {"Next ->"}
        </button>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
