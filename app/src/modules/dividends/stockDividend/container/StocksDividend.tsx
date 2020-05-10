// const dividendsResponse = Axios.get(`API_DIVIDENDS_URL/${ticker}`)
import React, { useEffect } from "react";
import {API_STOCKS_DIVIDEND_URL} from '../../../../helpers/variables';
import { observer } from "mobx-react";
import { observable } from "mobx";
import { useIndexStore } from "../../../../contexts/IndexStoreContext";
import Axios from 'axios';
import { useLocalStore, useObserver } from 'mobx-react'

export interface MyStockDividend {
  ticker: string;
}


const StocksDividend: React.FC<MyStockDividend> = observer(({ticker}) => {
  const indexStore = useIndexStore();
  const localStore = useLocalStore((): any =>({
    stockDividendResponse: [] as Array<[]>
  }));
  useEffect(()=>{
    (async function () {

    const StockDividendResponse = await Axios.get(`${API_STOCKS_DIVIDEND_URL}/${ticker}`);

    const stockDividend = StockDividendResponse.data;
    // console.log('stockDividend',stockDividend);
    localStore.stockDividendResponse = stockDividend
    // indexStore.earningsResponse = stocksEarnings;
    })();
  },[])
  console.log('stockDividendResponse',localStore.stockDividendResponse);
  return (
    <>
      <div>StocksDividend</div>
    </>
  );
});

export default StocksDividend;
