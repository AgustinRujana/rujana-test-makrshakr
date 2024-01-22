//Modules
import { useState, useEffect } from "react";

//Components
import ImageLoader from "@comp/ImageLoader";

//Helpers
import { getBgImage } from "@utils/useUtils";
import { IconClose } from "@utils/useIcons";

const Hero = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  const getItems = async () => {
    try {
      setLoading(true);
      await fetch(`https://catfact.ninja/facts?page=${page}`)
        .then((response) => response.json())
        .then((d) => {
          const aux = d.data.map((el) => ({
            ...el,
            image: getBgImage(),
          }));
          setPage((prevPage) => prevPage + 1);
          setItems((prevItems) => [...prevItems, ...aux]);
        });
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleCardClick = (index) => {
    setDetail(items[index]);
  };

  const handleScroll = () => {
    if (
      Math.round(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return;
    }
    getItems();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const List = () => {
    return (
      <>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((e, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center w-full h-full min-h-96 minh sm:min-h-64 md:min-h-72 bg-pink-400 rounded overflow-hidden shadow cursor-pointer transform transition-all hover:scale-105"
              onClick={() => handleCardClick(i)}
            >
              <ImageLoader src={e.image} />
              <div className="flex items-center p-6 h-18 w-full text-white font-thin tracking-tight text-xl">
                <span className="truncate">{e.fact}</span>
                <span>{"(" + e.length + ")"} </span>
              </div>
            </div>
          ))}
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
        </section>
      </>
    );
  };

  const Detail = () => {
    return (
      <section className="grid grid-cols-5 h-full w-full rounded overflow-hidden shadow">
        <ImageLoader
          className="col-span-2 h-full min-h-56 bg-pink-400"
          src={detail.image}
        />

        <div className="col-span-3 flex flex-col p-4 bg-pink-400 text-white font-thin tracking-tighter text-xl">
          <div
            className="flex items-center justify-end gap-2"
            onClick={() => setDetail(null)}
          >
            <IconClose className="w-6 h-6 cursor-pointer" />
          </div>
          <span className="">
            {detail.fact} {"(" + detail.length + ")"}
          </span>
        </div>
      </section>
    );
  };

  return (
    <>
      <section className="flex justify-center pb-8 sm:pb-16">
        <div className="flex flex-col items-center w-full">
          <span className="bg-gradient-to-r from-pink-600 to-indigo-600 inline-block text-transparent bg-clip-text font-bold text-6xl sm:text-7xl">
            Cat Facts
          </span>
          <span className="opacity-75 text-xs sm:text-sm text-white font-thin">
            Do not tell my dogs I did this <b>#Dogs4thewin</b>
          </span>
          <span className="opacity-75 text-xs sm:text-sm text-white font-thin">
            Made with ❤️ by @AgustinRujana
          </span>
        </div>
      </section>
      <section className="flex w-full">
        {detail ? <Detail /> : <List />}
      </section>
    </>
  );
};

export default Hero;
