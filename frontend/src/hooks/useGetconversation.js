import React, { useState,useEffect } from "react";

function useGetconversation() {
  const [loding, setLoading] = useState(false);
  const [conversation, setCoverstion] = useState([]);

  useEffect(() => {
    const getCoverstion = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }
        setCoverstion(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCoverstion();
  }, []);

  return { loding, conversation };
}

export default useGetconversation;
