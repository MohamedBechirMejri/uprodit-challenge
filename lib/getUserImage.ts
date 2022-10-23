import axios from "axios";
import generateSignature from "./generateSignature";

const getUserImage = async (id: string) => {
  const APPID = process.env.NEXT_PUBLIC_UPRODIT_APPID;
  const ENV = process.env.NEXT_PUBLIC_UPRODIT_ENV;
  const API = process.env.NEXT_PUBLIC_UPRODIT_API;

  const url = `https://${API}/v2/profile/picture/f/${id}`;

  return await axios.get(url, {
    headers: {
      Authorization: generateSignature(APPID!, ENV!, url),
    },
  });
};
export default getUserImage;
