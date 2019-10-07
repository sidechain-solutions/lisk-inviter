import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTransactions, processCheckIn } from "../../utils/api";

const Alert = () => (
  <div className="alert alert-warning mb-5 text-justify">
    <strong>ATTENTION!</strong> In a production-ready and 'real life scenario' version of this PoC,
    the user would be able to check-in by using a wristband or other device/chip that can be scanned
    at the entrance of the event.
    <br />
    <br />
    For the purpose of this demo, 'scanning' of a guest's device is simulated by entering a
    passphrase and pressing the 'Check-In' button :-)
  </div>
);

const CheckInEvent = props => {
  const [eventData, setEventData] = useState(null);
  const [passphrase, setPassphrase] = useState("");
  const [errors, setErrors] = useState([]);
  const [checkInComplete, setCheckInComplete] = useState(false);
  const id = props.match.params.id;

  useEffect(() => {
    getTransactions({ type: 11, limit: 1, id })
      .then(res => setEventData(res.data[0]))
      .catch(err => console.log(err));
  }, []);

  const handleChange = e => {
    setPassphrase(e.target.value.trim());
  };

  const handleSubmit = e => {
    e.preventDefault();
    checkIn();
  };

  const checkIn = () => {
    processCheckIn({
      eventId: eventData.id,
      amount: String(eventData.asset.entranceFee),
      recipientId: eventData.recipientId,
      passphrase
    })
      .then(res => {
        setCheckInComplete(true);
      })
      .catch(err => {
        setErrors(err.errors);
      });
  };

  return (
    <>
      {eventData ? (
        <div>
          <h1 className="mb-4">
            Check-In Event: {eventData.asset.name} <FontAwesomeIcon icon="calendar-alt" />
          </h1>

          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-9 col-lg-8">
              <Alert />

              {!checkInComplete ? (
                <form onSubmit={handleSubmit}>
                  <label htmlFor="passphrase" className="sr-only">
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    type="password"
                    name="passphrase"
                    id="passphrase"
                    className="form-control"
                    placeholder="Enter your passphrase"
                    required
                  />
                  <button className="btn btn-lg btn-dark mt-4 mb-5" type="submit">
                    <FontAwesomeIcon icon="sign-in-alt" /> Check-In
                  </button>

                  {errors.map(err => (
                    <div key={err.message} className="alert alert-danger mb-3">
                      {err.message}
                    </div>
                  ))}
                </form>
              ) : (
                <div className="alert alert-success mb-3">You have successfully checked in!</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>test</p>
      )}
    </>
  );
};

export default CheckInEvent;
