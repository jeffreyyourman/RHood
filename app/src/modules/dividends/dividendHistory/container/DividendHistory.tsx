import React, { useEffect } from "react";
import { API_DIVIDENDS_HISTORY_URL } from "../../../../helpers/variables";
import Axios from "axios";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { useIndexStore } from "../../../../contexts/IndexStoreContext";
import '../dividendHistory.css';

const DividendHistory: React.FC = observer(() => {
  const indexStore = useIndexStore();
  useEffect(() => {
    (async function () {
      const dividendHistoryResponse = await Axios.get(
        `${API_DIVIDENDS_HISTORY_URL}`
      );
      const dividendHistory = dividendHistoryResponse.data.response;
      console.log("dividendHistory", dividendHistory);
      indexStore.dividendHistoryResponse = dividendHistory;
    })();
  }, []);
  if (indexStore.dividendHistoryResponse.length === 0) {
    return <p>loading...</p>;
  }
  let totalAmt = 0;

  return (
    
    <div className="dividendHistoryContainer">
      {indexStore.dividendHistoryResponse.map((value) => {
        totalAmt = totalAmt + parseInt(value.amount);
        return (
          <>
            <p>Amount: {value.amount}</p>
            <p>Date: {value.payable_date}</p>
            <hr />
          </>
        );
      })}
      <p>{totalAmt}</p>
    </div>
  );


});

export default DividendHistory;
