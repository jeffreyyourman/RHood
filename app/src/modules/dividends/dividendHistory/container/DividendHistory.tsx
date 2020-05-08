import React, { useEffect } from "react";
import {API_DIVIDENDS_HISTORY_URL} from '../../../../helpers/variables';

import Axios from 'axios'
import { observer } from "mobx-react";
import { observable } from "mobx";
import { useIndexStore } from "../../../../contexts/IndexStoreContext";

const DividendHistory: React.FC = observer(() => {
  const indexStore = useIndexStore();
  useEffect(()=>{
    (async function () {

    const dividendHistoryResponse = await Axios.get(`${API_DIVIDENDS_HISTORY_URL}/${'dis'}`);

    const dividendHistory = dividendHistoryResponse.data;
    console.log('dividendHistory',dividendHistory);
    // indexStore.dividendHistoryResponse = dividendHistory;
    })();
  },[])
  return (
    <>
      <div>DividendHistory</div>
    </>
  );
});

export default DividendHistory;
