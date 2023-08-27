import React from 'react';
import { useRete } from 'rete-react-plugin';
import logo from './logo.svg';
import './App.css';
import './rete.css';
import styled from "styled-components";
import { createEditor } from './node';

const Info = styled.div`
  margin: 1em;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  color: #9f7b00;
`;

function App() {
  const [ref] = useRete(createEditor)

  return (
    <div className="App">
      <Info>Drag the unconnected node onto the connection between nodes</Info>
      <div ref={ref} style={{ height: "100vh", width: "100vw" }}></div>
    </div>
  );
}

export default App
