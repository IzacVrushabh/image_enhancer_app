import React, { useState, useEffect } from "react";
import "./App.css";
import img from "./assets/boat.jpg";
import img1 from "./assets/boat-op.png";
import logo from "./assets/logo.gif";
import dummyImage from "./assets/dummy-image.gif";
import finalImage from "./assets/OutputImage.gif";
import loadImage from "./assets/loading-img.gif";
import { toast, ToastContainer } from "react-toastify";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
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
import axios from "axios";

function App() {
  const [image, setImage] = useState(true);
  const [outputImage, setOutputImage] = useState(true);
  const [finalInputImage, setFinalInputImage] = useState(null);
  const [finalOutputImage, setFinalOutputImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadState, setLoadState] = useState(false);
  const [fusionValue, setFusionValue] = useState(0);
  const [showTable, setShowTable] = useState(false);
  const [checkMethod, setCheckMethod] = useState({
    method1: "Method 1",
    method2: "Method 2",
  });
  const [imageValues, setImageValues] = useState({
    entropy: {
      ip_ent: 0,
      op_ent: 0,
    },
    brisque: {
      ip_brisque: 0,
      op_brisque: 0
    },
    // psnr: 0
  });

  // to upload image
  const UploadImage = (e) => {
    setSelectedImage(e.target.files[0]);

    setFinalInputImage(e.target.files[0]);
    setImage(false);
  };

  // to select value from dropdown
  const handleSelect = (e, type) => {
    // console.log(e, type);
    if (type === 1) setCheckMethod({ ...checkMethod, method1: e });
    else setCheckMethod({ ...checkMethod, method2: e });
  };

  //load output image
  const LoadImageFunction = () => {
    const formData = new FormData();
    let input = document.getElementById("input-image");
    formData.append("image", input.files[0]);
    formData.append("met1", checkMethod.method1);
    formData.append("met2", checkMethod.method2);
    formData.append("fusion_params", fusionValue);
    axios
      .post("http://localhost:5000/enhance", formData)
      .then((res) => {
        console.log(res);
        let bytestring = res.data.status;
        let image = bytestring.split("'")[1];
        setFinalOutputImage("data:image/png;base64," + image);
        setImageValues({
          entropy: {
            ip_ent: res.data.ip_ent,
            op_ent: res.data.op_ent,
          },
          brisque: {
            ip_brisque: res.data.ip_brisque,
            op_brisque: res.data.op_brisque
          },
          // psnr: res.data.psnr
        });
        setLoadState(false);
        // in.attr('src' , 'data:image/jpeg;base64,'+image)
      })
      .catch((err) => console.log(err));
    
  };

  useEffect(() => {
    // axios
    //   .get("http://localhost:5000/get_data")
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    if (selectedImage) {
      setFinalInputImage(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  return (
    <>
      <ToastContainer autoClose={2500} />
      <div className="App">
        <Navbar bg="light" expand="lg" style={{ minHeight: "200px" }}>
          <Container fluid>
            <Navbar.Brand
              href="#"
              className="font-weight-bold"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                alt=""
                src={logo}
                width="60"
                height="60"
                className="d-inline-block align-top"
              />{" "}
              <h2 style={{ paddingTop: "8px" }}>Image Enhancer App</h2>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav
                className="me-auto my-5 my-lg-0"
                style={{
                  maxHeight: "100px",
                  flex: "inherit",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
                // navbarScroll
              >
                <Form.Group
                  controlId="formFile"
                  className="mb-3"
                  style={{ marginLeft: "50px" }}
                >
                  <Form.Label>Choose Image</Form.Label>
                  <input
                    onChange={(e) => UploadImage(e)}
                    type="file"
                    // size="lg"
                    id="input-image"
                  />
                </Form.Group>
                <Container>
                  <Row>
                    <Col>
                      <Dropdown onSelect={(e) => handleSelect(e, 1)}>
                        <Dropdown.Toggle
                          id="dropdown-button-dark-example1"
                          variant="secondary"
                        >
                          {checkMethod.method1}
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                          <Dropdown.Item eventKey="BBHE">BBHE</Dropdown.Item>
                          <Dropdown.Item eventKey="BPHEME">
                            BPHEME
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="DSIHE">DSIHE</Dropdown.Item>
                          <Dropdown.Item eventKey="MMBEBHE">
                            MMBEBHE
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="RLBHE">RLBHE</Dropdown.Item>
                          <Dropdown.Item eventKey="FHSABP">
                            FHSABP
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="BHEPL">BHEPL</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                    <Col>
                      <Dropdown onSelect={(e) => handleSelect(e, 2)}>
                        <Dropdown.Toggle
                          id="dropdown-button-dark-example1"
                          variant="secondary"
                        >
                          {checkMethod.method2}
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                          <Dropdown.Item eventKey="BBHE">BBHE</Dropdown.Item>
                          <Dropdown.Item eventKey="BPHEME">
                            BPHEME
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="DSIHE">DSIHE</Dropdown.Item>
                          <Dropdown.Item eventKey="MMBEBHE">
                            MMBEBHE
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="RLBHE">RLBHE</Dropdown.Item>
                          <Dropdown.Item eventKey="FHSABP">
                            FHSABP
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="BHEPL">BHEPL</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                  <Row style={{ width: "60%", margin: "auto" }}>
                    <Form.Label>Fusion Parameter Ratio(p - q)</Form.Label>

                    <Box sx={{ width: "100%" }}>
                      <Slider
                        aria-label="FusionValue"
                        defaultValue={0}
                        getAriaValueText={(e) => setFusionValue(e)}
                        valueLabelDisplay="auto"
                        step={0.2}
                        marks
                        min={0}
                        max={1}
                      />
                    </Box>
                  </Row>
                  <Row>
                    <h6>
                      p-{fusionValue} : q -{" "}
                      {fusionValue === 0.8 ? 0.2 : 1 - fusionValue}
                    </h6>
                  </Row>
                </Container>
              </Nav>
              <Button
                style={{
                  marginRight: "20px",
                  borderWidth: "3px",
                  background: "#25D366",
                  border: "none",
                }}
                onClick={() => setShowTable(true)}
              >
                Get Report
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container style={{ marginTop: "50px" }}>
          <Row>
            <Col>
              <div className="h4">Input Image</div>
              <div>
                <Figure>
                  <Figure.Image
                    width={image ? 300 : 450}
                    height={image ? 270 : 450}
                    alt="171x180"
                    src={image ? dummyImage : finalInputImage}
                  />
                  <Figure.Caption> </Figure.Caption>
                </Figure>
              </div>
            </Col>
            <Col
              xs={2}
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "inherit",
              }}
            >
              <div className="h4">
                <Button
                  style={{
                    borderWidth: "3px",
                    background: "#25D366",
                    border: "none",
                  }}
                  onClick={() => {
                    if (image) toast.error("Please choose input image");
                    else if (
                      checkMethod.method1 === "Method 1" ||
                      checkMethod.method2 === "Method 2"
                    )
                      toast.error("Please select methods");
                    else {
                      setOutputImage(false);
                      setLoadState(true);
                      LoadImageFunction();
                    }
                  }}
                >
                  Proceed
                </Button>
              </div>
            </Col>
            <Col>
              <div className="h4">Output Image</div>
              <div>
                <Figure>
                  <Figure.Image
                    width={outputImage || loadState ? 300 : 450}
                    height={outputImage || loadState ? 270 : 450}
                    alt="171x180"
                    src={
                      outputImage
                        ? finalImage
                        : loadState
                        ? loadImage
                        : finalOutputImage
                    }
                  />
                  <Figure.Caption className="text-black">
                    {loadState
                      ? "Click the Proceed Button"
                      : `Fusion of ${checkMethod.method1} - ${checkMethod.method2}`}
                  </Figure.Caption>
                </Figure>
              </div>
            </Col>
          </Row>
        </Container>
        {showTable ? (
          <Container style={{marginTop: "2rem"}}>
            <div style={{margin: "2rem", fontSize: "20px", fontWeight: "bold"}}>Summary</div>
            <Table striped bordered hover style={{fontSize: "20px"}}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Input Image</th>
                  <th>Output Image</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Entropy</td>
                  <td>{imageValues.entropy.ip_ent.toFixed(2)}</td>
                  <td>{imageValues.entropy.op_ent.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Brisque</td>
                  <td>{imageValues.brisque.ip_brisque.toFixed(2)}</td>
                  <td>{imageValues.brisque.op_brisque.toFixed(2)}</td>
                </tr>
                {/* <tr>
                  <td>PSNR</td>
                  <td>{imageValues.brisque.psnr}</td>
                </tr> */}
              </tbody>
            </Table>
          </Container>
        ) : null}

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
              Made by : Vrushabh Kulye , Mallikarjun Ople , Vaibhav Mahindra
            </div>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}

export default App;
