"use client";

import axios from "axios";
import { useState } from "react";

function CodeGen() {
  // const [code, setCode] = useState("");

  const handleCodeGeneration = async () => {
    const response = await axios.post("/api/generateCode", {
      id: "data",
    });

    // setCode(generatedCode);

    const generatedCode = response.data.code;

    // download the generated code as a file
    const blob = new Blob([generatedCode], { type: "text/plain" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary <a> element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated.js";

    // Append the <a> element to the document body
    document.body.appendChild(a);

    // Programmatically click the <a> element to trigger the download
    a.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Enable the textarea during dev to preview generated code */}
      {/* <textarea cols={70} rows={15} value={code} readOnly /> */}
      <button type="button" onClick={handleCodeGeneration}>
        Generate Code
      </button>
    </>
  );
}

export default CodeGen;
