// https://react-dnd.github.io/react-dnd/about

import React, { useEffect } from "react";
import "./App.css";
// , useLocalStore
// const localStore = useLocalStore(()=>{});

import { observer } from "mobx-react";
import { observable } from "mobx";
import { useIndexStore } from "./contexts/IndexStoreContext";
import Axios from "axios";
import { API_INSTRUMENTS_URL } from "./helpers/variables";
import json1 from "./helpers/json/test1.json";
import json2 from "./helpers/json/test2.json";
import json3 from "./helpers/json/test3.json";
import json4 from "./helpers/json/test4.json";
import json5 from "./helpers/json/test5.json";
import json6 from "./helpers/json/test6.json";
import json7 from "./helpers/json/test7.json";
import json8 from "./helpers/json/test8.json";
import json9 from "./helpers/json/test9.json";
import json10 from "./helpers/json/test10.json";
import json11 from "./helpers/json/test11.json";
import json12 from "./helpers/json/test12.json";
import json13 from "./helpers/json/test13.json";
import json14 from "./helpers/json/test14.json";
import json15 from "./helpers/json/test15.json";
import Dashboard from './modules/dashboard/container/Dashboard';
export interface instrumentResponse {
  account: string,
  account_number: string,
  average_buy_price: string,
  created_at: string,
  instrument: string,
  intraday_average_buy_price: string,
  intraday_quantity: string,
  pending_average_buy_price: string,
  quantity: string,
  shares_held_for_buys: string,
  shares_held_for_options_collateral: string,
  shares_held_for_options_events: string,
  shares_held_for_sells: string,
  shares_held_for_stock_grants: string,
  shares_pending_from_options_events: string,
  symbol: string,
  updated_at: string,
  url: string
}

function findSymbol(json:any, stock:any) {
  json.some((e:any) => {
    if (e.url === stock.instrument) {
      stock.symbol = e.symbol;
    }
  });
}
const App: React.FC = observer(() => {
  const indexStore = useIndexStore();

  useEffect(() => {
    (async function () {
      const instrumentsResponse = await Axios.get(`${API_INSTRUMENTS_URL}`);

      const myStocks = instrumentsResponse.data.myInstruments;
      // console.log('myStocks',myStocks[0])
      // console.log('json1',json1[0])
      for (let i = 0; i < myStocks.length; i++) {
        let stock = myStocks[i];

        findSymbol(json1, stock)
        findSymbol(json2, stock);
        findSymbol(json3, stock);
        findSymbol(json4, stock);
        findSymbol(json5, stock);
        findSymbol(json6, stock);
        findSymbol(json7, stock);
        findSymbol(json8, stock);
        findSymbol(json9, stock);
        findSymbol(json10, stock);
        findSymbol(json11, stock);
        findSymbol(json12, stock);
        findSymbol(json13, stock);
        findSymbol(json14, stock);
        findSymbol(json15, stock);
      }
      indexStore.instrumentResponse = myStocks;
      
    })();
  }, []);
  if (indexStore.instrumentResponse.length === 0) return null;

  console.log("instrumentResponse", indexStore.instrumentResponse[0]);

  return <Dashboard />;
});

export default App;
