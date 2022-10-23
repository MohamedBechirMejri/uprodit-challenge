import axios from "axios";
import generateSignature from "./generateSignature";

const getUserImage = async (id: string) => {
  const APPID = process.env.NEXT_PUBLIC_UPRODIT_APPID;
  const ENV = process.env.NEXT_PUBLIC_UPRODIT_ENV;
  const API = process.env.NEXT_PUBLIC_UPRODIT_API;

  return await axios.get(`https://${API}/v2/profile/picture/f/${id}`, {
    headers: {
      Authorization: generateSignature(
        APPID!,
        ENV!,
        `https://${API}/v2/profile/picture/f/${id}`
      ),
    },
  });
};
export default getUserImage;
