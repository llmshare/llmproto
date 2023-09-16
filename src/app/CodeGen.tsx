"use client";

import axios from "axios";
import { useState } from "react";

function CodeGen() {
  const [code, setCode] = useState("");

  const handleCodeGeneration = async () => {
    const response = await axios.get("/api/generateCode", {
      data: {
        openAIID: 10,
        chainID: 1,
      },
    });

    setCode(response.data.code);
  };

  return (
    <>
      <textarea name="" id="" cols={70} rows={15} value={code} readOnly />
      <button type="button" onClick={handleCodeGeneration}>
        Generate Code
      </button>
    </>
  );
}

export default CodeGen;
