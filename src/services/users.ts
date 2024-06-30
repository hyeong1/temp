import axios from "axios";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const userUrl = process.env.NEXT_PUBLIC_API_SERVER + "/users";

const getUserInfo = async (token: RequestCookie) => {
  try {
    const response = await axios.get(userUrl, {
      withCredentials: true,
      headers: {
        Cookie: `${token.name}=${token.value}`,
      },
    });
    return response;
  } catch (error) {
    console.error("getUserInfo Error: ", error);
    throw error;
  }
};

export { getUserInfo };
