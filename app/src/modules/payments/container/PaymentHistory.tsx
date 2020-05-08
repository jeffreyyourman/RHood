import React, { useEffect } from "react";

import { observer } from "mobx-react";
import { observable } from "mobx";
import { useIndexStore } from "../../../contexts/IndexStoreContext";
import Axios from 'axios';
import {API_PAYMENT_HISTORY_URL} from '../../../helpers/variables'; 

const PaymentHistory: React.FC = observer(() => {
  const indexStore = useIndexStore();
  useEffect(()=>{
    (async function () {

    const paymentResponse = await Axios.get(`${API_PAYMENT_HISTORY_URL}`);
    console.log('paymentResponse',paymentResponse);
    // const myStocks = paymentResponse.data.myInstruments;
    // indexStore.paymentHistoryResponse = myStocks;
    })();
  },[])

  return (
    <>
      <div>PaymentHistory</div>
    </>
  );
});

export default PaymentHistory;
