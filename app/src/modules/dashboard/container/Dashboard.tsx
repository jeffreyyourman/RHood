// const dividendsResponse = Axios.get(`API_DIVIDENDS_URL/${ticker}`)
import React from "react";

import { observer } from "mobx-react";
// import { observable } from "mobx";
// import { useIndexStore } from "../../../contexts/IndexStoreContext";
import PaymentHistory from '../../payments/container/PaymentHistory';
import DividendHistory from '../../dividends/dividendHistory/container/DividendHistory';
import MyStocks from '../../myStocks/container/MyStocks';

const Dashboard: React.FC = observer(() => {
  // const indexStore = useIndexStore();

  return (
      <div>
        <PaymentHistory />
        <DividendHistory />
        <MyStocks />
      </div>
  );
});

export default Dashboard;
