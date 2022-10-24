import axios from "axios";
import type { NextPage } from "next";
import generateSignature from "../lib/generateSignature";
import { useState, useEffect, useCallback, useRef } from "react";
import getUserImage from "../lib/getUserImage";
import debounce from "../lib/debounce";
import { L5, L74 } from "react-isloading";

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

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-[#f3f5f8] min-h-screen">
      <h1 className="w-full text-4xl font-bold text-center ">
        Uprodit Search API Test
      </h1>
      <input
        ref={inputRef}
        type="search"
        onChange={e => {
          setIsLoading(true);
          handleSearch(e.target.value);
        }}
        placeholder="Search Freelancers (Specialties, Skills...)"
        className="w-full h-12 font-bold text-center transition-all rounded-lg outline-none"
      />

      {isLoading ? (
        <L74
          style={{
            height: "15rem",
            width: "15rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : !users.length ? (
        <h1 className="pb-12 m-auto text-2xl">No Result</h1>
      ) : (
        <>
          <div className="flex flex-wrap grid-cols-4 gap-8 ">
            {users.map((user: any, i: number) => (
              <div
                key={user.id}
                className="w-56 bg-white rounded-lg opacity-0 animate-reveal"
                style={{
                  animationDelay: 0.05 * (i + 1) + "s",
                }}
              >
                <div
                  id={user.image_id}
                  className="w-56 h-56 bg-center bg-no-repeat bg-cover rounded-lg"
                  style={{
                    backgroundImage:
                      // @ts-ignore
                      usersImages[user.image_id]
                        ? "url(data:image/png;base64, " +
                          // @ts-ignore
                          usersImages[user.image_id] +
                          ")"
                        : "url('/freelance.svg')",
                  }}
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
          <div className="flex gap-4">
            <button
              className={`transition-all p-2 px-4 font-semibold text-white bg-slate-500 rounded ${
                !startIndex && "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              onClick={() => startIndex && handleNavigation("previous")}
            >
              Previous
            </button>
            <button
              className="p-2 px-4 font-semibold text-white transition-all rounded bg-slate-500"
              onClick={() => handleNavigation("next")}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
