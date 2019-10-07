import React, { useState, useEffect } from "react";
import { getTransactions } from "../../utils/api";
import EventCard from "./EventCard";
import CheckinCard from "./CheckinCard";

const Home = () => {
  const [latestEvents, setLatestEvents] = useState([]);
  const [latestCheckins, setLatestCheckins] = useState([]);

  useEffect(() => {
    getTransactions({ type: 11, limit: 4, sort: "timestamp:desc" })
      .then(res => {
        setLatestEvents(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    getTransactions({ type: 12, limit: 5, sort: "timestamp:desc" })
      .then(res => {
        setLatestCheckins(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-12 col-lg-6">
          <h1 className="mb-5">Latest Events</h1>
          {latestEvents.map(event => (
            <EventCard key={event.id} data={event} />
          ))}
          {!latestEvents.length && <h3 className="text-muted">None</h3>}
        </div>
        <div className="col-12 col-lg-6">
          <h1 className="mb-5">Latest Check-Ins</h1>
          {latestCheckins.map(checkIn => (
            <CheckinCard key={checkIn.id} data={checkIn} />
          ))}
          {!latestCheckins.length && <h3 className="text-muted">None</h3>}
        </div>
      </div>
    </div>
  );
};

export default Home;
