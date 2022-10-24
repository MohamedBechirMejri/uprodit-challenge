import axios from "axios";
import type { NextPage } from "next";
import generateSignature from "../lib/generateSignature";
import { useState, useEffect, useCallback, useRef } from "react";
import getUserImage from "../lib/getUserImage";
import debounce from "../lib/debounce";

const Home: NextPage = () => {
  const [users, setUsers] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [maxResults, setMaxResults] = useState(10);

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

    setStartIndex(newStartIndex);
    handleSearch(query, newStartIndex);
  };

  useEffect(() => handleSearch(""), []); // show users on page load

  useEffect(() => {
    document.querySelectorAll(".user-image").forEach(async (image: any) => {
      const imageData = await (await getUserImage(image.id)).data.b64Content;
      imageData && (image.src = "data:image/png;base64, " + imageData);
    });
  }, [users]);

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <h1 className="w-full text-4xl font-bold text-center ">
        Uprodit Search API Test
      </h1>
      <input
        ref={inputRef}
        type="search"
        onChange={e => handleSearch(e.target.value)}
        placeholder="Search Freelancers (Specialties, Skills...)"
        className="w-full h-12 font-bold text-center transition-all rounded-lg outline-none"
      />

      <div>
        <button onClick={() => startIndex && handleNavigation("previous")}>
          Previous
        </button>
        <button onClick={() => handleNavigation("next")}>Next</button>
      </div>

      <div className="grid grid-cols-4 gap-8 bg-[#f3f5f8]">
        {users.map((user: any) => (
          <div key={user.id} className="bg-white rounded-lg ">
            <img
              src="/freelance.svg"
              id={user.image_id}
              className="w-full rounded-lg user-image"
            />

            <div className="flex flex-col gap-4 p-2">
              <p className="w-full font-medium text-center">
                {user.denomination}
              </p>
              <p className="w-full"> Specialized in :</p>
              <p className="w-full">{user.specialities.join(" / ")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
