import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => (
  <div>
    <hr className="mt-5 mb-5" />
    <p className="text-muted"></p>
    <p className="text-muted small">
      Lisk Inviter SDK Proof of Concept by Lemii.{" "}
      <a
        title="Source Code"
        href="https://github.com/sidechain-solutions/lisk-inviter"
        target="_blank"
        rel="noopener noreferrer"
      >
        Source code <FontAwesomeIcon icon="external-link-alt" />
      </a>
      <br />
      ©2019 Sidechain Solutions
    </p>
  </div>
);

export default Footer;
