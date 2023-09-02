"use client";

// Render ReteView.js VIEW

import "./rete.css";

import { useRete } from "rete-react-plugin";

import createEditor from "@/Rete/Rete";

export default function ReteView() {
  const [ref] = useRete(createEditor);

  return <div ref={ref} className="rete" />;
}
