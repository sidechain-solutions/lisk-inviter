import React, { useState, useEffect } from "react";
import { getTransactions } from "../../utils/api";
import { convertNetworkTimestampToDate } from "../../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CheckinCard = props => {
  const [eventData, setEventData] = useState(null);

  const { senderId, timestamp } = props.data;
  const { eventId } = props.data.asset;

  useEffect(() => {
    getTransactions({ type: 11, limit: 1, id: eventId })
      .then(res => setEventData(res.data[0]))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="card border-primary shadow-sm mb-4 animated fadeIn">
      <div className="card-body text-left">
        <h5 className="text-center">
          <FontAwesomeIcon icon="sign-in-alt" /> {eventData ? eventData.asset.name : eventId}
        </h5>

        <div className="row">
          <div className="col">
            <span className="text-muted">User:</span>
            <span className="d-block">{senderId}</span>
          </div>
          <div className="col">
            <span className="text-muted">Check-In Date:</span>
            <span className="d-block">{convertNetworkTimestampToDate(timestamp)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckinCard;
