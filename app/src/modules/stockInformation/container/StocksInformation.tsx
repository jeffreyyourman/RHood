// const dividendsResponse = Axios.get(`API_DIVIDENDS_URL/${chosenStock}`)
import React, { useEffect } from "react";
import {API_STOCKS_DIVIDEND_URL} from '../../../helpers/variables';
import { observer } from "mobx-react";
import { observable } from "mobx";
import { useIndexStore } from "../../../contexts/IndexStoreContext";
import Axios from 'axios';
import { useLocalStore, useObserver } from 'mobx-react'

export interface MyStockDividend {
  chosenStock,
  backToAllStocks
}


const StocksInformation: React.FC<MyStockDividend> = observer(({backToAllStocks, chosenStock}) => {
  const indexStore = useIndexStore();
  const localStore = useLocalStore(() =>({
    stockDividendResponse: {}
  }));
  useEffect(()=>{
    (async function () {
      try {
        const StockDividendResponse = await Axios.get(`${API_STOCKS_DIVIDEND_URL}/${chosenStock.symbol}`);
        const stockDividend = StockDividendResponse.data.response.data;
        // console.log('stockDividend',stockDividend);
        localStore.stockDividendResponse = stockDividend
      } catch (err) {
        console.log('error', err);
      }
    

    })();
  },[])
  if(Object.keys(localStore.stockDividendResponse).length === 0) return <div>loading...</div>
  console.log({chosenStock, dividendResponse: localStore.stockDividendResponse})
  return (
    <>
      <div>
  
        <p>{chosenStock.average_buy_price}</p>
        <p>{chosenStock.quantity}</p>
        <p>{chosenStock.symbol}</p>
        <p>{chosenStock.name}</p>
      </div>
      <button onClick={()=>backToAllStocks()}>back</button>
    </>
  );
});

export default StocksInformation;
