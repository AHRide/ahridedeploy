import React from "react";
import NavBarClient from "../../../components/NavBarClient";
import "../HistoryPages.css";
import DisplayClientHistory from "./ClientHistoryCards";

const ClientHistoryPage = () => {
  return (
    <>
      <NavBarClient />
      <div className="history-main-container">
        <h1 className="history-page-title">History</h1>

        <div className="history-row2">
          <div className="history-column4"><h2>Name</h2></div>
          <div className="history-column5"><h2>Location</h2></div>
          <div className="history-column6"><h2>Status</h2></div>
        </div>

        <div className="history-row2">
          <div className="history-column2"><h4>From</h4></div>
          <div className="history-column1"><h4>----------&gt;</h4></div>
          <div className="history-column3"><h4>To</h4></div>
        </div>
        <div><DisplayClientHistory /></div>
      </div>
    </>
  );
};

export default ClientHistoryPage;