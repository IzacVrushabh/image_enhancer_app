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
import jsPDF from "jspdf";
import "jspdf-autotable";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import logo from "../assets/camera_logo1.png";

const ShowResult = ({
  ip_brisque,
  op_brisque,
  ip_entropy,
  op_entropy,
  ip_image,
  op_image,
  method_1,
  method_2,
  p_value,
  q_value,
}) => {
  const printDocument = () => {
    const doc = new jsPDF();

    //get table html
    const pdfTable = document.getElementById("divToPrint");
    //html to pdf format
    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = { content: html };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(documentDefinition).open();
  };

  function createData(paramter, ip_data, op_data, diff) {
    return { paramter, ip_data, op_data, diff };
  }

  const rows = [
    createData(
      "Entropy",
      ip_entropy.toFixed(2),
      op_entropy.toFixed(2),
      Math.abs(op_entropy - ip_entropy).toFixed(2)
    ),
    createData(
      "Brisque",
      ip_brisque.toFixed(2),
      op_brisque.toFixed(2),
      Math.abs(op_brisque - ip_brisque).toFixed(2)
    ),
    // createData("PSNR", 20, 20, 30)
  ];

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const marginVerticalParameters = 450;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const Heading =
      "Low Light Image Contrast Enhancement using Blending of Histogram Equalization Based Methods DSIHE and MMBEBHE";
    const title = "Low Light Image Contrast Enhancement Report";
    const methodUsed = `Methods used in this experiment : ${method_1} and ${method_2}`;
    const parametersTitle =
      "Results based on the different parameters - Brisque and Entropy";
    const headers = [
      [
        "Parameters",
        "Input Image",
        "Output Image",
        //   "Difference"
      ],
    ];
    const inputImageText = "Input Image";
    const outputImageText = "Output Image";
    const EntropyDifference = `Entropy difference between input and output image is ${Math.abs(
      op_entropy - ip_entropy
    ).toFixed(2)}`;
    const BrisqueDifference = `Similarly, Brisque value difference is ${(Math.abs(
      op_brisque - ip_brisque
    ).toFixed(2))/10}`;
    const Image_Fusion_parameter = `Image Fusion Parameters : p = ${p_value} and q = ${q_value}`;

    const data = rows.map((elt, idx) => [
      elt.paramter,
      elt.ip_data,
      elt.op_data,
      //   elt.diff,
    ]);

    let content = {
      startY: marginVerticalParameters + 20,
      head: headers,
      body: data,
      theme: "grid",
      headStyles: {
        fillColor: "#f48116",
      },
      //   styles: { fillColor: [255, 0, 0] },
    };

    doc.addImage(logo, "PNG", marginLeft + 20, 80, 60, 30);
    // doc.setFont('Arial');
    // doc.text(Software, 0, 30);
    doc.setTextColor(0, 0, 0);
    doc.setTextColor("#f48116");
    doc.setFontSize(17);

    doc.text(title, marginLeft + 100, 100);
    doc.line(marginLeft + 100, 110, marginLeft + 460, 110);

    doc.setFontSize(12);
    doc.setTextColor("#000");

    const marginVerticalImage = 170;
    doc.text(inputImageText, marginLeft + 95, marginVerticalImage);
    doc.text(outputImageText, marginLeft + 355, marginVerticalImage);

    doc.addImage(
      ip_image,
      "PNG",
      marginLeft,
      marginVerticalImage + 20,
      245,
      170
    );
    doc.addImage(
      op_image,
      "PNG",
      marginLeft + 270,
      marginVerticalImage + 20,
      245,
      170
    );

    doc.setFont(undefined, "bold");
    doc.text(parametersTitle, marginLeft, marginVerticalParameters);
    doc.setFont(undefined, "normal");

    doc.setTextColor("#f48116");
    doc.autoTable(content);

    const marginVerticalSummaryTitle = 610;
    doc.setTextColor("#000");
    doc.setFont(undefined, "bold");
    doc.text("Summary : ", marginLeft, marginVerticalSummaryTitle);

    doc.setFont(undefined, "normal");
    doc.setFontSize(12);

    const marginVerticalSummary = marginVerticalSummaryTitle + 40;
    doc.text(methodUsed, marginLeft, marginVerticalSummary);
    doc.text(Image_Fusion_parameter, marginLeft, marginVerticalSummary + 20);
    doc.text(EntropyDifference, marginLeft, marginVerticalSummary + 40);
    doc.text(BrisqueDifference, marginLeft, marginVerticalSummary + 60);

    doc.output("dataurlnewwindow");
    doc.save("Report.pdf");
    // pdfMake.createPdf(doc).open();
  };

  return (
    <>
      <Container style={{ marginTop: "2rem" }}>
        <Row>
          <div style={{ margin: "2rem", fontSize: "20px", fontWeight: "bold" }}>
            Summary
            <Button
              style={{
                marginRight: "20px",
                borderWidth: "3px",
                float: "right",
                background: "rgb(211 37 37)",
                border: "none",
              }}
              onClick={() => {
                exportPDF();
              }}
            >
              Download Report
            </Button>
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
      </Container>
      {/* ===========================
      ========= Report Data ==========
      =============================== */}
      {/* <Container style={{ marginTop: "2rem", display: "none" }} id="divToPrint">
        <Row>
          <div
            style={{
              margin: "10px",
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
              color: "#f48116",
            }}
          >
            Low Light Image Contrast Enhancement using Blending of Histogram
            Equalization Based Methods DSIHE and MMBEBHE
          </div>
          <div
            style={{
              margin: "10px",
              fontSize: "16px",
              fontWeight: "400",
              textAlign: "center",
            }}
          >
            Summary
          </div>
          <div style={{ margin: "2rem", fontSize: "14px" }}>
            Here are the results of fusion of Two methods
          </div>
        </Row>
        <Row>
          <Col>
            <table
              style={{
                fontSize: "14px",
                alignItems: "center",
                textAlign: "center",
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              <thead>
                <tr>
                  <th style={{ margin: "10px" }}>Parameters</th>
                  <th style={{ margin: "10px" }}>Input Image</th>
                  <th style={{ margin: "10px" }}>Output Image</th>
                  <th style={{ margin: "10px" }}>Difference</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ margin: "10px" }}>Entropy</td>
                  <td style={{ margin: "10px" }}>{ip_entropy.toFixed(2)}</td>
                  <td style={{ margin: "10px" }}>{op_entropy.toFixed(2)}</td>
                  <td style={{ margin: "10px" }}>
                    {Math.abs(op_entropy - ip_entropy).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td style={{ margin: "10px" }}>Brisque</td>
                  <td style={{ margin: "10px" }}>{ip_brisque.toFixed(2)}</td>
                  <td style={{ margin: "10px" }}>{op_brisque.toFixed(2)}</td>
                  <td style={{ margin: "10px" }}>
                    {Math.abs(op_brisque - ip_brisque).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>

        <Row>
          <Col>
            <div style={{ margin: "3rem", fontSize: "15px" }}>
              <span style={{ fontWeight: "bold" }}>Methods Used :</span>{" "}
              {method_1} and {method_2}
            </div>
          </Col>
        </Row>
      </Container> */}
    </>
  );
};

export default ShowResult;
