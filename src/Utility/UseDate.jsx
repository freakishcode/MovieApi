import { useEffect, useState } from "react";

function UseDate() {
  const Locale = "em";
  const [Today, setDate] = useState(new Date());

  useEffect(() => {
    const Timer = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);

    return () => {
      clearInterval(Timer);
    };
  }, []);

  const day = Today.toLocalDateString(Locale, { weekday: "long" });
  const date = `${day}, ${Today.getDate()}, ${Today.toLocalDateString(Locale, { month: "long" })}\n\n `;
  const Time = Today.toLocalDateString(Locale, {
    hour: "numeric",
    hour12: true,
    minutes: "numeric",
  });

  return { date, Time };
}

export default UseDate;
