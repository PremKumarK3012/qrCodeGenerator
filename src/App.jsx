import React, { useState } from "react";
import "../src/App.css";

function App() {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qr, setQr] = useState("https://prem.in/");
  const [size, setSize] = useState("150");
  async function gen() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
        qr
      )}`;
      setImg(url);
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  }
  function downloadQR() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }
  return (
    <div className="container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please Wait...</p>}
      {img && <img src={img} className="img"></img>}

      <div>
        <label htmlFor="dataInput" className="label" id="label">
          Data For QR Code
        </label>
        <input
          type="text"
          id="dataInput"
          value={qr}
          placeholder="Enter The Data"
          onChange={(e) => setQr(e.target.value)}
        ></input>
        <label htmlFor="sizeInput" className="label">
          Imge Size eg:(150)
        </label>
        <input
          type="text"
          id="sizeInput"
          value={size}
          placeholder="Enter The Size"
          onChange={(e) => setSize(e.target.value)}
        ></input>
        <button className="gen" onClick={gen} disabled={loading}>
          Generate QR Code
        </button>
        <button className="dow" onClick={downloadQR}>
          Download QR Code
        </button>
      </div>
      <p className="footer">
        Designed By <a href="http://prempk.netlify.app"> Prem Kumar</a>
      </p>
    </div>
  );
}

export default App;
