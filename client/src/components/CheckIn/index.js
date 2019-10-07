import React, { useState, useEffect } from "react";
import { getTransactions } from "../../utils/api";
import LatestEvents from "./LatestEvents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EventCard from "../Home/EventCard";

const CheckIn = () => {
  const [latestEvents, setLatestEvents] = useState({ col1: [], col2: [] });
  const [hasSearched, setHasSearched] = useState(false);
  const [eventId, setEventId] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    getTransactions({ type: 11, limit: 6, sort: "timestamp:desc" })
      .then(res => {
        const split = Math.ceil(res.data.length / 2);

        setLatestEvents({
          col1: res.data.slice(0, split),
          col2: res.data.slice(split, res.data.length)
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleChange = e => {
    setEventId(e.target.value.trim());
  };

  const searchEvent = e => {
    e.preventDefault();
    getTransactions({ type: 11, limit: 1, id: eventId })
      .then(res => {
        if (res.data.length) {
          setError("");
        } else {
          setError(`No results for event ID: ${eventId}'`);
        }
        setHasSearched(true);
        setSearchResult(res.data);
      })
      .catch(err => {
        setSearchResult([]);
        setError("Could not search event");
      });
  };

  const reset = () => {
    setHasSearched(false);
    setSearchResult([]);
  };

  return (
    <div>
      <h1 className="mb-4">Search Event by ID</h1>

      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-9 col-lg-8">
          <form onSubmit={searchEvent}>
            <label htmlFor="event" className="sr-only">
              Password
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="event"
              id="event"
              className="form-control"
              placeholder="Enter event ID"
              required
            />
            <button className="btn btn-dark mt-4 mb-5" type="submit">
              <FontAwesomeIcon icon="search" /> Search
            </button>
          </form>
        </div>
      </div>

      <hr className="mt-5 mb-5" />

      {hasSearched ? (
        <>
          <h1 className="mb-4">Search Results</h1>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-9 col-lg-8">
              {searchResult.length > 0 && <EventCard data={searchResult[0]} />}
              {error && <div className="alert alert-danger mb-3">{error}</div>}
            </div>
          </div>
          <button className="btn btn-dark mt-4 mb-5" onClick={reset}>
            <FontAwesomeIcon icon="long-arrow-alt-left" /> Return to Latest Events
          </button>
        </>
      ) : (
        <>
          <h1 className="mb-4">Latest 6 Events</h1>
          <LatestEvents col1={latestEvents.col1} col2={latestEvents.col2} />
        </>
      )}
    </div>
  );
};

export default CheckIn;
