import React from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";


function GenerateQR() {
  const { id } = useParams();

 const downloadQR = () => {
  const blob = new Blob([id], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `vegetable-${id}-qr.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};


  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>QR Code for Vegetable ID: {id}</h2>
      <div style={{ margin: "20px" }}>
        <QRCodeCanvas id="veg-qr-code" value={id} size={256} />

      </div>
      <button onClick={downloadQR}>Click here to download QR code</button>
    </div>
  );
}

export default GenerateQR;
