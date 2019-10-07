import React, { useState } from "react";
import { utils } from "@liskhq/lisk-transactions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAccount } from "../../utils/api";
import { Link } from "react-router-dom";

const Alert = () => (
  <div className="alert alert-warning mb-5 text-justify">
    <strong>ATTENTION!</strong> For demo purposes, try: <br />
    <br />
    naive ghost harsh april wonder knife kiwi fix scheme wheat lobster choice
  </div>
);

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountData, setAccountData] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const [error, setError] = useState("");

  const handleChange = e => {
    setPassphrase(e.target.value.trim());
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetchAccount();
  };

  const fetchAccount = e => {
    getAccount(passphrase)
      .then(res => {
        if (res.data.length > 0) {
          setAccountData(res.data[0]);
          setIsLoggedIn(true);
        } else {
          setError("Account does not exist");
        }
      })
      .catch(err => {
        console.log(err);
        setError("Could not fetch account");
      });
  };

  return (
    <div>
      <h1 className="mb-5">Account</h1>

      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-9 col-lg-8">
          {!isLoggedIn ? (
            <form onSubmit={handleSubmit}>
              <Alert />

              <label htmlFor="passphrase" className="sr-only">
                Passphrase
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
                <FontAwesomeIcon icon="sign-in-alt" /> View Account
              </button>

              {error && <div className="alert alert-danger mb-3">{error}</div>}
            </form>
          ) : (
            <div className="card border shadow-sm mb-4 animated fadeIn">
              <div className="card-body body-hover text-left">
                <div>
                  <span className="text-muted">Address: </span>
                  <span className="d-block">{accountData.address}</span>
                </div>

                <div className="mt-3">
                  <span className="text-muted">Balance: </span>
                  <span className="d-block">
                    {utils.convertBeddowsToLSK(accountData.balance)} INV
                  </span>
                </div>

                <div className="mt-3">
                  <span className="text-muted">Invited for events: </span>
                  <ul>
                    {accountData.asset.eventsInvited
                      ? accountData.asset.eventsInvited.map(event => (
                          <li key={`invited_${event}`}>
                            <Link to={`event/${event}`}>{event}</Link>
                          </li>
                        ))
                      : "None"}
                  </ul>
                </div>

                <div className="mt-3">
                  <span className="text-muted">Attended events: </span>

                  <ul>
                    {accountData.asset.eventsAttended
                      ? accountData.asset.eventsAttended.map(event => (
                          <li key={`attended_${event}`}>
                            <Link to={`event/${event}`}>{event}</Link>
                          </li>
                        ))
                      : "None"}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
