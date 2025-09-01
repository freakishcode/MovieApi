import { useEffect, useState } from "react";

/**
 * Custom hook to get the current date and time, updating every minute.
 * @param {string} locale - Optional locale string (default: "en-US")
 * @returns {{ date: string, time: string, raw: Date }}
 */
function useDate(locale = "en-US") {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  // Format: "Monday, 31 August"
  const date = now.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Format: "10:30 AM"
  const time = now.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return { date, time, raw: now };
}

export default useDate;
