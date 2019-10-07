import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getMinDate } from "../../utils/helpers";

const CreateEvent = props => (
  <form onSubmit={props.handleSubmit}>
    <label htmlFor="name">Name</label>
    <input
      onChange={props.handleChange}
      type="text"
      name="name"
      id="name"
      className="form-control mb-4"
      placeholder="My Event"
      required
    />

    <label htmlFor="description">Description</label>
    <textarea
      onChange={props.handleChange}
      type="text"
      name="description"
      id="description"
      className="form-control mb-4"
      placeholder="A description that explains what this event is about"
      rows="10"
      required
    />

    <label htmlFor="entranceFee">Entrance fee</label>
    <input
      onChange={props.handleChange}
      type="number"
      name="entranceFee"
      id="entranceFee"
      className="form-control mb-4"
      placeholder="5"
      min="0"
      required
    />

    <div className="row">
      <div className="col">
        <label htmlFor="eventStartTs">Event Start Date</label>
        <input
          onChange={props.handleChange}
          type="date"
          name="eventStartTs"
          id="eventStartTs"
          className="form-control mb-4"
          min={getMinDate("start")}
          required
        />
      </div>

      <div className="col">
        <label htmlFor="eventEndTs">Event End Date</label>
        <input
          onChange={props.handleChange}
          type="date"
          name="eventEndTs"
          id="eventEndTs"
          className="form-control mb-4"
          min={getMinDate("end")}
          required
        />
      </div>
    </div>

    <label htmlFor="invitees">
      Invitees <div className="badge badge-primary">{props.form.invitees.length}</div>
    </label>
    <div className="input-group mb-3">
      <input
        type="text"
        name="invitees"
        id="invitees"
        className="form-control"
        placeholder="An invitee's public key"
        onChange={props.handleInviteeChange}
        value={props.inviteeBuffer}
      />
      <div className="input-group-append">
        <button className="btn btn-outline-primary" type="button" onClick={props.handleInviteeAdd}>
          <FontAwesomeIcon icon="plus" />
        </button>
      </div>
    </div>

    <ul className="list-group small">
      {props.form.invitees.map((pubKey, i) => (
        <li key={i + pubKey} className="list-group-item text-monospace p-2 bg-light">
          {pubKey} (
          <span onClick={() => props.handleInviteeRemove(pubKey)} className="btn-link pointer">
            remove
          </span>
          )
        </li>
      ))}
    </ul>

    <hr className="mt-5 mb-5" />

    <label htmlFor="passphrase">Passphrase</label>
    <input
      onChange={props.handleChange}
      type="password"
      name="passphrase"
      id="passphrase"
      className="form-control"
      placeholder="Enter your passphrase"
    />

    <div className="text-center">
      <button className="btn btn-lg btn-dark mt-5 mb-5" onClick={null}>
        <FontAwesomeIcon icon="plus" /> Create
      </button>
    </div>
  </form>
);

export default CreateEvent;
