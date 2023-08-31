"use client";

import "./rete.css";

import { useRete } from "rete-react-plugin";

import createEditor from "@/Rete";
// import createEditor from "@/Rete/dataflow"; // Index import

export default function Rete() {
  const [ref] = useRete(createEditor);

  return <div ref={ref} className="rete" />;
}
