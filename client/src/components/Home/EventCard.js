import React from "react";
import { utils } from "@liskhq/lisk-transactions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const EventCard = props => {
  const { name, entranceFee, eventStartTs, eventEndTs } = props.data.asset;

  return (
    <Link className="no-decoration" to={`/event/${props.data.id}`}>
      <div className="card clickable-card border shadow-sm mb-4 animated fadeIn">
        <div className="card-header bg-primary text-light">
          <h5>
            <FontAwesomeIcon icon="calendar-alt" /> {name}
          </h5>
        </div>
        <div className="card-body body-hover text-left">
          <div className="row">
            <div className="col">
              <span className="text-muted">From: </span>
              <span className="accentuate d-block">
                {new Date(eventStartTs * 1000).toLocaleDateString()}
              </span>
            </div>
            <div className="col">
              <span className="text-muted">To: </span>
              <span className="accentuate d-block">
                {new Date(eventEndTs * 1000).toLocaleDateString()}
              </span>
            </div>
            <div className="col">
              <span className="text-muted">Price: </span>
              <span className="accentuate d-block">
                {utils.convertBeddowsToLSK(String(entranceFee))} INV
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
