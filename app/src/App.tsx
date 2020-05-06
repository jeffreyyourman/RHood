import React, { useEffect } from "react";
import "./App.css";
// , useLocalStore
// const localStore = useLocalStore(()=>{});

import { observer } from "mobx-react";
import { useIndexStore } from "./contexts/IndexStoreContext";
import Axios from "axios";
import { API_INSTRUMENTS_URL } from "./helpers/variables";
import json1 from "./helpers/json/test1.json";
import json2 from './helpers/json/test2.json';
import json3 from './helpers/json/test3.json';
import json4 from './helpers/json/test4.json';
import json5 from './helpers/json/test5.json';
import json6 from './helpers/json/test6.json';
import json7 from './helpers/json/test7.json';
import json8 from './helpers/json/test8.json';
import json9 from './helpers/json/test9.json';
import json10 from './helpers/json/test10.json';
import json11 from './helpers/json/test11.json';
import json12 from './helpers/json/test12.json';
import json13 from './helpers/json/test13.json';
import json14 from './helpers/json/test14.json';
import json15 from './helpers/json/test15.json';

const App: React.FC = observer(() => {
  // const indexStore = useIndexStore();
 
  console.log("parsejson1");
  useEffect(() => {
    (async function () {
      const instrumentsResponse = await Axios.get(`${API_INSTRUMENTS_URL}`);
      
      const myStocks = instrumentsResponse.data.myInstruments;
      
      console.log('json1[0].url',json1[0])
      console.log('myStocks[0].url',myStocks[0])
      
      for (let i = 0; i < myStocks.length; i++) {
        let stock = myStocks[i];
        
        json1.some(e => {
          if (e.url === stock.instrument) {
            stock.symbol = e.symbol
            console.log({e, stock})
          }
        })
        json2.some(e => {
          if(e.url === stock.instrument) {
            stock.symbol = e.symbol
            console.log({e, stock});
          }
        })
        json3.some(e => {
          if(e.url === stock.instrument) {
            stock.symbol = e.symbol
            console.log({e, stock});
          }
        })
        json4.some(e => {
          if(e.url === stock.instrument) {
            stock.symbol = e.symbol
            console.log({e, stock});
          }
        })
        json5.some(e => {
          if(e.url === stock.instrument) {
            stock.symbol = e.symbol
            console.log({e, stock});
          }
        })
        json6.some(e => {
          if(e.url === stock.instrument) {
            stock.symbol = e.symbol
            console.log({e, stock});
          }
        })
        json7.some(e => {
          if(e.url === stock.instrument) {
            stock.symbol = e.symbol
            console.log({e, stock});
          }
        })
        json8.some(e => {
          if(e.url === stock.instrument) {
            stock.symbol = e.symbol
            console.log({e, stock});
          }
        })
        json9.some(e => {
          if(e.url === stock.instrument) {
            stock.symbol = e.symbol
            console.log({e, stock});
          }
        })
        json10.some(e => {
          if(e.url === stock.instrument) {
            stock.symbol = e.symbol
            console.log({e, stock});
          }
        })
        json11.some(e => {
          if(e.url === stock.instrument) {
            stock.symbol = e.symbol
            console.log({e, stock});
          }
        })
        json12.some(e => {
          if(e.url === stock.instrument) {
            stock.symbol = e.symbol
            console.log({e, stock});
          }
        })
        json13.some(e => {
          if(e.url === stock.instrument) {
            stock.symbol = e.symbol
            console.log({e, stock});
          }
        })
        json14.some(e => {
          if(e.url === stock.instrument) {
            stock.symbol = e.symbol
            console.log({e, stock});
          }
        })
        json15.some(e => {
          if(e.url === stock.instrument) {
            stock.symbol = e.symbol
            console.log({e, stock});
          }
        })
      }
      // const dividendsResponse = Axios.get(`API_DIVIDENDS_URL/${ticker}`)
      // const earningsResponse = Axios.get(`API_EARNINGS_URL/${ticker}`)
    })();
  }, []);

  return <div className=""></div>;
});

export default App;
