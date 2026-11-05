
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const getAccessToken = () => {
  return (
    localStorage.getItem("cerevolt_access") ||
    sessionStorage.getItem("cerevolt_access")
  );
};

const apiRequest = async (endpoint, options = {}) => {
  const token = getAccessToken();

  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
  } catch {
    throw new Error(
      "Unable to connect to the server. Please check whether the backend is running."
    );
  }

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type");
  const data = contentType?.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const error = new Error(
      data?.detail ||
        data?.message ||
        (typeof data === "string" && data) ||
        "Something went wrong. Please try again."
    );

    error.status = response.status;
    error.data = data;

    throw error;
  }

  return data;
};

export const apiGet = (endpoint) => {
  return apiRequest(endpoint, {
    method: "GET",
  });
};

export const apiPost = (endpoint, data) => {
  return apiRequest(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const apiPatch = (endpoint, data) => {
  return apiRequest(endpoint, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const apiPut = (endpoint, data) => {
  return apiRequest(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const apiDelete = (endpoint) => {
  return apiRequest(endpoint, {
    method: "DELETE",
  });
};

export default apiRequest;
