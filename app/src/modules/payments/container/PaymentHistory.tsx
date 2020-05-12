import React, { useEffect } from "react";

import { observer } from "mobx-react";
import { observable } from "mobx";
import { useIndexStore } from "../../../contexts/IndexStoreContext";
import Axios from "axios";
import { API_PAYMENT_HISTORY_URL } from "../../../helpers/variables";

const PaymentHistory: React.FC = observer(() => {
  const indexStore = useIndexStore();
  useEffect(() => {
    (async function () {
      const paymentHistoryResponse = await Axios.get(
        `${API_PAYMENT_HISTORY_URL}`
      );
      // console.log('paymentHistoryResponse.data.response',paymentHistoryResponse.data.response)
      const paymentHistory = paymentHistoryResponse.data.response;
      console.log("paymentHistory", paymentHistory);
      indexStore.paymentHistoryResponse = paymentHistory;
    })();
  }, []);

  return (
    <>
      <div style={{'backgroundColor':'purple', 'color': 'white'}}>PaymentHistory</div>
    </>
  );
});

export default PaymentHistory;
