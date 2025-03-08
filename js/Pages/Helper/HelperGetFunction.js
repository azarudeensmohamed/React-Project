import { toast } from "react-toastify";

export const handleApiRequestGet = async (apiClient, url, successCallback, errorCallback) => {
  try {
    const response = await apiClient.post(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.status === "error") {
        if(successCallback) errorCallback(response.data);
    } else {
        if(successCallback) successCallback(response.data);
    }
  } catch (error) {
    if (errorCallback) errorCallback(error.response || error);
  }
};
