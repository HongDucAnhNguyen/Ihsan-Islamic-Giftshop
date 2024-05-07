import { getSessionData } from "@/backend/helpers/getSessionData";

const page = async () => {
  const user = await getSessionData();
  return (
    <div>
      <h1>User: {user?.username}</h1>
    </div>
  );
};

export default page;
