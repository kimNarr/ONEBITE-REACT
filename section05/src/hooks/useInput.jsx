import { useState } from "react";

function useInput() {
  const [input, setInput] = useState("");

  const onChange = (e) => {
    setInput(e.current.value);
  };

  return [input, onChange];
}

export default useInput;
