// utils/auth.ts
import Cookies from "js-cookie";

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = Cookies.get("refresh_token");

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      Cookies.set("access_token", data.access_token, { expires: 1 }); // Update access token
      return data.access_token;
    } else {
      // Refresh token is invalid or expired
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      return null;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};
