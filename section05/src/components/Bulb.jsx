import { useState } from "react";

const Bulb = () => {
  const [light, setLight] = useState("off");
  console.log(light);

  const styledBulb = {
    width: "100px",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#111",
    fontSize: "14px",
  };
  return (
    <div>
      {light === "on" ? (
        <h1 style={{ ...styledBulb, background: "yellow" }}>ON</h1>
      ) : (
        <h1 style={{ ...styledBulb, background: "grey" }}>OFF</h1>
      )}
      <button
        onClick={() => {
          setLight(light === "on" ? "off" : "on");
        }}
      >
        {light === "on" ? "끄기" : "켜기"}
      </button>
    </div>
  );
};

export default Bulb;
