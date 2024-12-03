import { useState, useEffect } from "react";

const useGetData = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3", // Simulating Chrome on Windows
            Accept: "application/json", // Accepting JSON data
            "Accept-Language": "en-US,en;q=0.9", // Accepting English (US) language
            Connection: "keep-alive", // Keep connection alive (mimics browsers)
            Origin: new URL(endpoint).origin, // Including the origin header
            // Other headers can be added if needed, like "Referer"
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result: T = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 90000);
    return () => clearInterval(intervalId);
  }, [endpoint]);

  return { data, isLoading, error };
};

export default useGetData;
