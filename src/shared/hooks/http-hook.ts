import {
  useState,
  useCallback,
  useRef,
  useEffect,
  MutableRefObject,
} from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const activeHttpRequests: MutableRefObject<AbortController[]> = useRef([]);

  const isMounted = useRef(true);

  const sendRequest = useCallback(
    async (
      url: string,
      method = "GET",
      body: string | null = null,
      headers = {}
    ) => {
      try {
        setIsLoading(true);

        const httpAbortCtrl = new AbortController();

        activeHttpRequests.current.push(httpAbortCtrl);

        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData: any | string = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);

        return responseData;
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            console.log("Abortada ligação à base de dados.");
            return; // exit early
          }

          setError(
            err.message || "Algo correu errado. Tente, de novo, mais tarde."
          );

          setIsLoading(false);

          throw err;
        }
      }
    },
    []
  );

  const clearError = () => {
    setError("");
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
      activeHttpRequests.current.forEach((abortCtrl: AbortController) =>
        abortCtrl.abort()
      );
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
