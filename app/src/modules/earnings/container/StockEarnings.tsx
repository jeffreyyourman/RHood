// const earningsResponse = Axios.get(`API_EARNINGS_URL/${ticker}`);
// const dividendsResponse = Axios.get(`API_DIVIDENDS_URL/${ticker}`)
import React, { useEffect } from "react";
import {API_EARNINGS_URL} from '../../../helpers/variables';
import { observer } from "mobx-react";
import { observable } from "mobx";
import { useIndexStore } from "../../../contexts/IndexStoreContext";
import Axios from 'axios'; 

const StockEarnings: React.FC = observer(() => {
  const indexStore = useIndexStore();
  useEffect(()=>{
    (async function () {

    const earningsResponse = await Axios.get(`${API_EARNINGS_URL}/${'dis'}`);

    const stocksEarnings = earningsResponse.data;
    console.log('stocksEarnings',stocksEarnings);
    // indexStore.earningsResponse = stocksEarnings;
    })();
  },[])
  return (
    <>
      <div>StockEarnings</div>
    </>
  );
});

export default StockEarnings;
