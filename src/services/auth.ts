import axiosInstance from "@/lib/axiosInstance";

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const response = await axiosInstance.post("/api/register", {
      firstName,
      lastName,
      email,
      password
    });

    return response.data;
  } catch (error: any) {
    throw new Error("Login failed: " + (error.response?.data?.message || error.message));
  }
};


export const resetPassword = async (email: string) => {
  try {
    const response = await axiosInstance.post("/api/reset-password", { email });
    return response.data;
  } catch (error: any) {
    throw new Error("Password reset failed: " + (error.response?.data?.message || error.message));
  }
};
