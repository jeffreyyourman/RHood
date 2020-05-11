// const dividendsResponse = Axios.get(`API_DIVIDENDS_URL/${ticker}`)
import React from "react";

import { observer } from "mobx-react";
// import { observable } from "mobx";
// import { useIndexStore } from "../../../contexts/IndexStoreContext";
import PaymentHistory from "../../payments/container/PaymentHistory";
import DividendHistory from "../../dividends/dividendHistory/container/DividendHistory";
import MyStocks from "../../myStocks/container/MyStocks";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

const Dashboard: React.FC = observer(() => {
  // const indexStore = useIndexStore();

  return (
    <div>
      <DndProvider backend={Backend}>
        <PaymentHistory />
        <DividendHistory />
        <MyStocks />
      </DndProvider>
    </div>
  );
});

export default Dashboard;
