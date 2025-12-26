import { useEffect, useState } from "react";

function WindowResizeTracker() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let device;
  if (size.width < 768) device = "Mobile";
  else if (size.width <= 1024) device = "Tablet";
  else device = "Desktop";

  return (
    <div>
      <p>{size.width} x {size.height}</p>
      <h3>{device}</h3>
    </div>
  );
}

export default WindowResizeTracker;
