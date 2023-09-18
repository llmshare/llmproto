"use client";

import axios from "axios";
import { useState } from "react";

function CodeGen() {
  const [code, setCode] = useState("");

  const handleCodeGeneration = async () => {
    const response = await axios.post("/api/generateCode", {
      id: "data",
    });

    setCode(response.data.code);
  };

  return (
    <>
      <textarea cols={70} rows={15} value={code} readOnly />
      <button type="button" onClick={handleCodeGeneration}>
        Generate Code
      </button>
    </>
  );
}

export default CodeGen;
