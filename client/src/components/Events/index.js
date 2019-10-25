import React, { useState, useEffect } from "react";
import { getTransactions } from "../../utils/api";
import LatestEvents from "./LatestEvents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EventCard from "../Home/EventCard";
import { Link } from "react-router-dom";

const CheckIn = props => {
  const [latestEvents, setLatestEvents] = useState({ col1: [], col2: [] });
  const [totalCount, setTotalCount] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [eventId, setEventId] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState();

  const offset = props.match.params.offset ? parseInt(props.match.params.offset) : 0;

  useEffect(() => {
    getTransactions({ type: 11, limit: 6, sort: "timestamp:desc", offset })
      .then(res => {
        const split = Math.ceil(res.data.length / 2);

        setLatestEvents({
          col1: res.data.slice(0, split),
          col2: res.data.slice(split, res.data.length)
        });

        setTotalCount(parseInt(res.meta.count));
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.match.params.offset]);

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

  const PaginationButton = ({ direction }) => {
    const eventsPerPage = 6;
    let buttonComponent;

    if (direction === "previous") {
      const isDisabled = offset < eventsPerPage;

      buttonComponent = isDisabled ? (
        <button className="btn btn-lg btn-outline-primary mt-4 mb-5 mr-3" disabled>
          <FontAwesomeIcon icon="arrow-left" />
        </button>
      ) : (
        <Link
          to={`/events/${offset - eventsPerPage}`}
          className="btn btn-lg btn-outline-primary mt-4 mb-5 mr-3"
        >
          <FontAwesomeIcon icon="arrow-left" />
        </Link>
      );
    } else if (direction === "next") {
      const isDisabled = totalCount - offset < eventsPerPage;

      buttonComponent = isDisabled ? (
        <button className="btn btn-lg btn-outline-primary mt-4 mb-5" disabled>
          <FontAwesomeIcon icon="arrow-right" />
        </button>
      ) : (
        <Link
          to={`/events/${offset + eventsPerPage}`}
          className="btn btn-lg btn-outline-primary mt-4 mb-5"
        >
          <FontAwesomeIcon icon="arrow-right" />
        </Link>
      );
    }

    return buttonComponent;
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
          <h1 className="mb-0">
            Showing Events {offset + 1}-{offset + 6 < totalCount ? offset + 6 : totalCount}
          </h1>
          <p className="mb-4">Total: {totalCount}</p>
          <LatestEvents col1={latestEvents.col1} col2={latestEvents.col2} />

          <PaginationButton direction="previous" />
          <PaginationButton direction="next" />
        </>
      )}
    </div>
  );
};

export default CheckIn;
