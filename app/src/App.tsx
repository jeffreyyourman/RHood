import React from 'react';
import './App.css';
import { observer } from 'mobx-react';
import { useIndexStore } from "./contexts/IndexStoreContext";

const App: React.FC= observer(() => {
  
  const indexStore = useIndexStore();

  return (
    <div className="">
      
    </div>
  );
}) 

export default App;
