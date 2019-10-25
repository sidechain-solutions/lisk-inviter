import React from "react";
import EventCard from "../Home/EventCard";

const LatestEvents = props => (
  <div>
    {!props.col1.length && !props.col2.length ? (
      <h3 className="text-muted">None</h3>
    ) : (
      <>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6">
            {props.col1.map(event => (
              <EventCard key={event.id} data={event} />
            ))}
          </div>
          {props.col2.length > 0 && (
            <div className="col-12 col-lg-6">
              {props.col2.map(event => (
                <EventCard key={event.id} data={event} />
              ))}
            </div>
          )}
        </div>
      </>
    )}
  </div>
);

export default LatestEvents;
