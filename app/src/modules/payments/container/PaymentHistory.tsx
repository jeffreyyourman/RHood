import React, { useEffect } from "react";

import { observer } from "mobx-react";
import { observable } from "mobx";
import { useIndexStore } from "../../../contexts/IndexStoreContext";
import Axios from "axios";
import { API_PAYMENT_HISTORY_URL } from "../../../helpers/variables";
import "../paymentHistory.css";

const PaymentHistory: React.FC = observer(() => {
  const indexStore = useIndexStore();
  useEffect(() => {
    (async function () {
      const paymentHistoryResponse = await Axios.get(
        `${API_PAYMENT_HISTORY_URL}`
      );

      const paymentHistory = paymentHistoryResponse.data.response;

      indexStore.paymentHistoryResponse = paymentHistory;
    })();
  }, []);
  if (indexStore.paymentHistoryResponse.length === 0) {
    return <p>loading...</p>;
  }

  let totalAmt = 0;
  const displayPaymentHistory = indexStore.paymentHistoryResponse.map(
    (value, index) => {
      totalAmt = totalAmt + parseInt(value.amount);
      return (
        <React.Fragment key={index}>
          <p>Date: {value.created_at}</p>
          <p>Amount: {value.amount}</p>
          <hr />
        </React.Fragment>
      );
    }
  );
  return (
    <div className="paymentContainer">
      <h3>Total: {indexStore.formatter().format(totalAmt)}</h3>
      {displayPaymentHistory}
    </div>
  );
});

export default PaymentHistory;
