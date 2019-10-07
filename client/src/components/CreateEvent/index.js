import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { processEvent } from "../../utils/api";
import { generateRandomAccount } from "../../utils/helpers";
import Form from "./Form";

const emptyForm = {
  name: "",
  description: "",
  entranceFee: null,
  eventStartTs: null,
  eventEndTs: null,
  invitees: []
};

const Alert = () => (
  <div className="alert alert-warning mb-5 text-justify">
    <strong>ATTENTION!</strong> For the demo purposes of this Proof of Concept it is <u>optional</u>{" "}
    to enter a <i>passphrase</i> and list of <i>invitees</i>.<br />
    <br />
    If left empty, funds from the Genesis account will be utilized to create the event, and several
    random public keys will be fetched from a pool of available accounts.
  </div>
);

const CreateEvent = () => {
  const [form, setForm] = useState(emptyForm);
  const [randomAccount, setRandomAccount] = useState(generateRandomAccount());
  const [eventCreated, setEventCreated] = useState(false);
  const [inviteeBuffer, setInviteeBuffer] = useState("");
  const [errors, setErrors] = useState([]);

  const handleInviteeChange = e => {
    setInviteeBuffer(e.target.value);
  };

  const handleInviteeAdd = () => {
    const bufferTrimmed = inviteeBuffer.trim();

    if (
      bufferTrimmed.match(/[0-9A-Fa-f]{64}/g) &&
      bufferTrimmed.length <= 64 &&
      !form.invitees.includes(bufferTrimmed)
    ) {
      setForm({ ...form, invitees: [...form.invitees, bufferTrimmed] });
      setInviteeBuffer("");
    }
  };

  const handleInviteeRemove = pubKey => {
    const updatedList = form.invitees.filter(invitee => pubKey !== invitee);
    setForm({ ...form, invitees: updatedList });
  };

  const handleChange = e => {
    const updatedForm = { ...form, [e.target.name]: e.target.value };
    setForm(updatedForm);
  };

  const handleSubmit = e => {
    e.preventDefault();

    processEvent({ ...form, recipientId: randomAccount.address })
      .then(res => {
        setEventCreated(true);
        setErrors([]);
      })
      .catch(err => {
        setErrors(err.errors);
      });
  };

  return (
    <div>
      <h1 className="mb-5">
        {eventCreated ? (
          "Event created!"
        ) : (
          <>
            Create Event <FontAwesomeIcon icon="plus" />
          </>
        )}
      </h1>

      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-9 col-lg-8 text-left">
          {!eventCreated ? (
            <>
              <Alert />

              <Form
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                form={form}
                inviteeBuffer={inviteeBuffer}
                handleInviteeChange={handleInviteeChange}
                handleInviteeAdd={handleInviteeAdd}
                handleInviteeRemove={handleInviteeRemove}
              />

              {errors.map(err => (
                <div key={err.message} className="alert alert-danger mb-3">
                  <span className="d-block">
                    <strong>Error:</strong> {err.message}
                  </span>
                  <span className="d-block">
                    <strong>Expected:</strong> {err.expected}
                  </span>
                  <span className="d-block">
                    <strong>Received:</strong> {err.actual ? err.actual : "empty"}
                  </span>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="alert alert-success mb-5">
                <strong>ATTENTION!</strong> Be sure to carefully write down the account details
                below, as this is the address where all the entrance fees will be sent to!
              </div>

              <div className="card">
                <div className="card-body">
                  <p>
                    <span className="text-muted d-block">Address</span>
                    {randomAccount.address}
                  </p>
                  <p>
                    <span className="text-muted d-block">Public key</span>
                    {randomAccount.publicKey}
                  </p>
                  <p>
                    <span className="text-muted d-block">Passphrase</span>
                    {randomAccount.passphrase}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
