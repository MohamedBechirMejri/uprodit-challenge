import axios from "axios";
import type { NextPage } from "next";
import generateSignature from "../lib/generateSignature";
import { useState, useEffect, useCallback, useRef } from "react";
import getUserImage from "../lib/getUserImage";
import debounce from "../lib/debounce";
import Searchbar from "../components/Searchbar";
import Loader from "../components/Loader";
import User from "../components/User";
import NavButtons from "../components/NavButtons";

const Home: NextPage = () => {
  const [users, setUsers] = useState([]);
  const [usersImages, setUsersImages] = useState({}) as any;
  const [startIndex, setStartIndex] = useState(0);
  const [maxResults, setMaxResults] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  const inputRef = useRef(null);

  const handleSearch = useCallback(
    debounce((query: string, startIndex = 0, maxResults = 10) => {
      const APPID = process.env.NEXT_PUBLIC_UPRODIT_APPID;
      const ENV = process.env.NEXT_PUBLIC_UPRODIT_ENV;
      const API = process.env.NEXT_PUBLIC_UPRODIT_API;

      if (!APPID || !ENV || !API) return;

      const url = `https://${API}/v1/search/all?startIndex=${startIndex}&maxResults=${maxResults}&usecase=perso&terms=${query}`;

      axios
        .get(url, {
          headers: {
            Authorization: generateSignature(APPID, ENV, url),
          },
        })
        .then(res => {
          setUsers(res.data);
          setIsLoading(false);
        });
    }, 500),
    []
  );

  const handleNavigation = (loadWhichPage: "previous" | "next") => {
    // @ts-ignore
    const query = inputRef.current.value;
    const newStartIndex =
      loadWhichPage === "next"
        ? startIndex + maxResults
        : startIndex - maxResults;

    handleSearch(query, newStartIndex);
    setIsLoading(true);
    setStartIndex(newStartIndex);
  };

  useEffect(() => handleSearch(""), []); // show users on page load

  useEffect(() => {
    users.forEach(async (user: any) => {
      const id = user.image_id;
      const imageData = await (await getUserImage(id)).data.b64Content;
      setUsersImages((images: any) => ({
        ...images,
        [id]: imageData,
      }));
    });
  }, [users]);

  useEffect(() => {
    Object.entries(usersImages).forEach(([id, data]) => {
      const image = document.getElementById(id);
      if (image && data)
        image!.style.backgroundImage = `url(data:image/png;base64,${data})`;
    });
  }, [usersImages]);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-[#f3f5f8] min-h-screen">
      <h1 className="w-full text-4xl font-bold text-center ">
        Uprodit Search API Test
      </h1>
      <Searchbar
        inputRef={inputRef}
        setStartIndex={setStartIndex}
        setIsLoading={setIsLoading}
        handleSearch={handleSearch}
      />
      {isLoading ? (
        <Loader />
      ) : !users.length ? (
        <h1 className="pb-12 m-auto text-2xl">No Result</h1>
      ) : (
        <>
          <div className="flex flex-wrap justify-center grid-cols-4 gap-8">
            {users.map((user: any, i: number) => (
              <User key={user.id} user={user} i={i} />
            ))}
          </div>
          <NavButtons
            startIndex={startIndex}
            handleNavigation={handleNavigation}
          />
        </>
      )}
    </div>
  );
};

export default Home;
