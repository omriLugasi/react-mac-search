import React from 'react';
import './App.css';
import ReactMacSearch from "./reactMacSearch";
import schemaExample from './mock/mockTest1.json'

function App() {
  return (
    <div className="App">
      <ReactMacSearch
          triggerKey={'k'}
          withMetaKey
          searchSchema={schemaExample as any}
          handleItemSelected={(e) => {
              console.log({ e })
          }}
      />
    </div>
  );
}

export default App;
