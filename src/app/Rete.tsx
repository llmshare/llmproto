"use client";

// Render Rete.js VIEW

import "./rete.css";

import { useRete } from "rete-react-plugin";

import createEditor from "@/Rete";

export default function Rete() {
  const [ref] = useRete(createEditor);

  return <div ref={ref} className="rete" />;
}
