"use client";

// Render ReteView.js VIEW

import "./rete.css";

import { useRete } from "rete-react-plugin";

import createEditor from "@/views/Page/CodePage";

export default function ReteView() {
  const [ref] = useRete(createEditor);

  return (
    <div
      ref={ref}
      className="rete"
      style={{ height: "80vh", marginTop: "2rem" }}
    />
  );
}
