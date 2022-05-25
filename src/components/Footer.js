import React from "react";
import { Card } from "react-bootstrap";

const Footer = () => {
  return (
    <Card
      bg="dark"
      style={{
        // position: "absolute",
        // bottom: "0",
        marginTop: "5rem",
        width: "-webkit-fill-available",
        height: "70px",
        justifyContent: "center",
      }}
    >
      <Card.Footer className="text-muted">
        <div style={{ fontWeight: "bolder", color: "white" }}>
          Made by : Vrushabh Kulye , Mallikarjun Ople , Vaibhav Mahindra and Sudarshan Jamdar
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Footer;
