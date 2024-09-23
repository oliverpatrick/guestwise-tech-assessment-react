const BASE_URL = "http://localhost:3001";

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

export const fetchData = async (
  endpoint: string,
  options: FetchOptions = {}
) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const fetchOptions: FetchOptions = {
    method: options.method || "GET",
    headers,
    body: options.body,
  };

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, fetchOptions);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
