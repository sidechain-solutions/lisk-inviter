import React, { useState, useEffect } from "react";
import { utils } from "@liskhq/lisk-transactions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTransactions } from "../../utils/api";
import { Link } from "react-router-dom";
import htmlParser from "react-html-parser";

const Event = props => {
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const id = props.match.params.id;

    getTransactions({ type: 11, limit: 1, id })
      .then(res => setEventData(res.data[0]))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      {eventData ? (
        <div>
          <h1 className="mb-5">Viewing Event: {eventData.id}</h1>
          <div className="card border shadow-sm mb-4">
            <div className="card-header bg-primary text-light">
              <h5>
                <FontAwesomeIcon icon="calendar-alt" /> {eventData.asset.name}
              </h5>
            </div>
            <div className="card-body text-left">
              <p>
                <span className="text-muted">Description: </span>
                <span className="d-block">{htmlParser(eventData.asset.description)}</span>
              </p>
              <hr className="mt-4 mb-4" />
              <div className="row">
                <div className="col">
                  <span className="text-muted">From: </span>
                  <span className="accentuate d-block">
                    {new Date(eventData.asset.eventStartTs * 1000).toLocaleDateString()}
                  </span>
                </div>
                <div className="col">
                  <span className="text-muted">To: </span>
                  <span className="accentuate d-block">
                    {new Date(eventData.asset.eventEndTs * 1000).toLocaleDateString()}
                  </span>
                </div>
                <div className="col">
                  <span className="text-muted">Invitees: </span>
                  <span className="accentuate d-block">{eventData.asset.invitees.length}</span>
                </div>
                <div className="col">
                  <span className="text-muted">Price: </span>
                  <span className="accentuate d-block">
                    {utils.convertBeddowsToLSK(String(eventData.asset.entranceFee))} INV
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Link className="btn btn-dark mt-4" to={`../checkin/${eventData.id}`}>
            <FontAwesomeIcon icon="sign-in-alt" /> Go to Check-In
          </Link>
        </div>
      ) : (
        <h1>Nothing found</h1>
      )}
    </>
  );
};

export default Event;
