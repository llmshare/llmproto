"use client";

import axios from "axios";
import { useState } from "react";

function CodeGen() {
  const [code, setCode] = useState("");

  const handleCodeGeneration = async () => {
    const response = await axios.post("/api/generateCode", { openAIID: 10 });

    setCode(response.data.code);
  };

  return (
    <>
      <textarea name="" id="" cols={30} rows={10} value={code} readOnly>
        {code}
      </textarea>
      <button type="button" onClick={handleCodeGeneration}>
        Generate Code
      </button>
    </>
  );
}

export default CodeGen;
