import { toast } from "react-toastify";

export const handleApiRequestPost = async (apiClient, data, url, successCallback, errorCallback) => {
  try {
    const response = await apiClient.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.status === "error") {
      if (errorCallback) errorCallback(response.data);
    } else {
      if (successCallback) successCallback(response.data);
    }
  } catch (error) {
    console.error("Error:", error.message);
    toast.error("An error occurred. Please try again.", { autoClose: 5000 });
    if (errorCallback) errorCallback(error.response || error);
  }
};


