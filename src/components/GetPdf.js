import React from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Nav,
  Dropdown,
  Form,
  Button,
  Figure,
  Card,
  Table,
} from "react-bootstrap";

const GetPdf = ({
  ip_brisque,
  op_brisque,
  ip_entropy,
  op_entropy,
  ip_image,
  op_image,
  method_1,
  method_2,
}) => {
  return (
    <Container style={{ marginTop: "2rem" }}>
      <Row>
        <div style={{ margin: "2rem", fontSize: "20px", fontWeight: "bold" }}>
          Summary
        </div>
        <div style={{ margin: "1rem", fontSize: "15px", fontWeight: "bold" }}>
          Here are the results of Fusion of Two methods
        </div>
      </Row>

      <Table striped bordered hover style={{ fontSize: "20px" }}>
        <thead>
          <tr>
            <th>Parameters</th>
            <th>Input Image</th>
            <th>Output Image</th>
            <th>Difference</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Entropy</td>
            <td>{ip_entropy.toFixed(2)}</td>
            <td>{op_entropy.toFixed(2)}</td>
            <td>{Math.abs(op_entropy - ip_entropy).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Brisque</td>
            <td>{ip_brisque.toFixed(2)}</td>
            <td>{op_brisque.toFixed(2)}</td>
            <td>{Math.abs(op_brisque - ip_brisque).toFixed(2)}</td>
          </tr>
          {/* <tr>
                  <td>PSNR</td>
                  <td>{imageValues.brisque.psnr}</td>
                </tr> */}
        </tbody>
      </Table>
      <Row>
        <Col>
          Methods Used : {method_1} and {method_2}
        </Col>
      </Row>
    </Container>
  );
};

export default GetPdf;
