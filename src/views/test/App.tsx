import { useEffect, useState } from "react";

function App() {
  const [count, setcount] = useState(0);

  useEffect(() => {
    const timer = +setInterval(() => {
      setcount((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <div>{count}</div>;
}

export default App;
