import { getAccountSessionData } from "@/backend/helpers/getSessionData";

export const GET = async () => {
  try {
    const accountSessionData = await getAccountSessionData();

    return Response.json({
      isLoggedIn:
        accountSessionData?.username && accountSessionData?.userId
          ? true
          : false,
      userId: accountSessionData?.userId,
    });
  } catch (error) {
    return Response.json(error.message);
  }
};
