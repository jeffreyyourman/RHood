// const dividendsResponse = Axios.get(`API_DIVIDENDS_URL/${ticker}`)
import React, { useEffect } from "react";
import {API_STOCKS_DIVIDEND_URL} from '../../../../helpers/variables';
import { observer } from "mobx-react";
import { observable } from "mobx";
import { useIndexStore } from "../../../../contexts/IndexStoreContext";
import Axios from 'axios'
const StocksDividend: React.FC = observer(() => {
  const indexStore = useIndexStore();
  useEffect(()=>{
    (async function () {

    const StockDividendResponse = await Axios.get(`${API_STOCKS_DIVIDEND_URL}/${'dis'}`);

    const stockDividend = StockDividendResponse.data;
    console.log('stockDividend',stockDividend);
    // indexStore.earningsResponse = stocksEarnings;
    })();
  },[])
  return (
    <>
      <div>StocksDividend</div>
    </>
  );
});

export default StocksDividend;
