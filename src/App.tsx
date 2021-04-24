import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactMacSearch from "./reactMacSearch";
import schemaExample from './mock/mockSearchSchema.json'

function App() {
  return (
    <div className="App">
      <ReactMacSearch triggerKey={'k'} withMeta searchSchema={schemaExample} />
    </div>
  );
}

export default App;
