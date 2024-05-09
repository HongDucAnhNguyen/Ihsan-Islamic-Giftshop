import { getAccountSessionData } from "@/backend/helpers/getSessionData";
import Profile from "@/components/auth/Profile";

const page = async () => {
  const user = await getAccountSessionData();
  return <Profile user={{ ...user }}></Profile>;
};

export default page;
