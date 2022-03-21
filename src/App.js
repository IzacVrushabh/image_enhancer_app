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
} from "react-bootstrap";
import axios from "axios";

function App() {
  const [image, setImage] = useState(true);
  const [outputImage, setOutputImage] = useState(true);
  const [finalInputImage, setFinalInputImage] = useState(null)
  const [finalOutputImage, setFinalOutputImage] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadState, setLoadState] = useState(false);
  const [fusionValue, setFusionValue] = useState(0);
  const [checkMethod, setCheckMethod] = useState({
    method1: "Method 1",
    method2: "Method 2",
  });

  // to upload image
  const UploadImage = (e) => {
    setSelectedImage(e.target.files[0]);
    let input = document.getElementById("input-image")

    const formData = new FormData();
    setFinalInputImage(input.files[0]);
    formData.append("image", input.files[0])
    axios.post("http://localhost:5000/enhance", formData)
    .then(res=> {
      console.log(res);
					let bytestring = res.data.status
          let image = bytestring.split('\'')[1]
          setFinalOutputImage('data:image/jpeg;base64,'+image)
          setImage(false);
					// in.attr('src' , 'data:image/jpeg;base64,'+image)
    })
    .catch(err=> console.log(err))
   
  };

  // to select value from dropdown
  const handleSelect = (e, type) => {
    // console.log(e, type);
    if (type === 1) setCheckMethod({ ...checkMethod, method1: e });
    else setCheckMethod({ ...checkMethod, method2: e });
  };

  //load output image
  const LoadImageFunction = () => {
    setLoadState(false);
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
                          <Dropdown.Item eventKey="BBHE">BPHEME</Dropdown.Item>
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
                          <Dropdown.Item eventKey="BBHE">BPHEME</Dropdown.Item>
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
                      setTimeout(LoadImageFunction, 5000);
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
                      outputImage ? finalImage : loadState ? loadImage : finalOutputImage
                    }
                  />
                  <Figure.Caption>
                    {loadState
                      ? "Click the Proceed Button"
                      : `Fusion of ${checkMethod.method1} - ${checkMethod.method2}`}
                  </Figure.Caption>
                </Figure>
              </div>
            </Col>
          </Row>
        </Container>
        <Card
          bg="dark"
          style={{
            position: "absolute",
            bottom: "0",
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
