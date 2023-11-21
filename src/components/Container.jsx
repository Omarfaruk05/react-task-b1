import update from "immutability-helper";
import { useCallback, useEffect, useState } from "react";
import { Card } from "./Card";
import MkdSDK from "../utils/MkdSDK";

export const Container = () => {
  const [error, setError] = useState("");
  const [page, setpage] = useState(1);
  {
    const [video, setVideo] = useState([]);

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

    if (!video) {
      return <div>hhh</div>;
    }
    const moveCard = useCallback((dragIndex, hoverIndex) => {
      setVideo((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        })
      );
    }, []);
    const renderCard = useCallback((card, index) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card}
          moveCard={moveCard}
        />
      );
    }, []);
    return (
      <>
        <div>
          {video.map((card, i) => renderCard(card, i))}
          <div className=" w-full text-center mt-12">
            <button
              onClick={() => setpage(page + 1)}
              className="text-black bg-[#9BFF00] px-4 py-1 rounded-lg"
            >
              {"Next ->"}
            </button>
          </div>
        </div>
      </>
    );
  }
};
