import axios from "axios";
import type { NextPage } from "next";
import generateSignature from "../lib/generateSignature";
import { useState, useEffect, useCallback } from "react";
import getUserImage from "../lib/getUserImage";
import debounce from "../lib/debounce";

const Home: NextPage = () => {
  const [users, setUsers] = useState([]);

  const handleSearch = useCallback(
    debounce((e: any) => {
      const APPID = process.env.NEXT_PUBLIC_UPRODIT_APPID;
      const ENV = process.env.NEXT_PUBLIC_UPRODIT_ENV;
      const API = process.env.NEXT_PUBLIC_UPRODIT_API;

      if (!APPID || !ENV || !API) return;

      const query = e.target.value;
      const url = `https://${API}/v1/search/all?startIndex=0&maxResults=10&usecase=perso&terms=${query}`;

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

  useEffect(() => {
    document.querySelectorAll(".user-image").forEach(async (image: any) => {
      const imageData = await (await getUserImage(image.id)).data.b64Content;
      imageData && (image.src = "data:image/png;base64, " + imageData);
    });
  }, [users]);

  return (
    <div>
      <div className="w-full p-2">
        <input
          type="search"
          onChange={handleSearch}
          className="w-full h-12 font-bold text-center rounded-lg outline-none ring-gray-600 ring"
        />
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
