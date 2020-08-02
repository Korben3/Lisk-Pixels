import React from "react";
import "./Swatches.css";

const Swatches = ({ lpxConsole, selectedColor, swatchClicked }) => {
  return (
    <div className="colors">
      <div style={{ float: "right" }}>
        <table className="selectedColor">
          <tbody>
            <tr>
              <td
                style={{ backgroundColor: selectedColor }}
                id="userSelectedColor"
              ></td>
            </tr>
          </tbody>
        </table>

        <table className="swatches">
          <tbody>
            <tr>
              <td
                style={{ backgroundColor: "#000000" }}
                id="c0"
                onClick={() => swatchClicked("c0")}
              ></td>
              <td
                style={{ backgroundColor: "#0000AA" }}
                id="c1"
                onClick={() => swatchClicked("c1")}
              ></td>
              <td
                style={{ backgroundColor: "#00AA00" }}
                id="c2"
                onClick={() => swatchClicked("c2")}
              ></td>
              <td
                style={{ backgroundColor: "#00AAAA" }}
                id="c3"
                onClick={() => swatchClicked("c3")}
              ></td>
              <td
                style={{ backgroundColor: "#AA0000" }}
                id="c4"
                onClick={() => swatchClicked("c4")}
              ></td>
              <td
                style={{ backgroundColor: "#AA00AA" }}
                id="c5"
                onClick={() => swatchClicked("c5")}
              ></td>
              <td
                style={{ backgroundColor: "#AA5500" }}
                id="c6"
                onClick={() => swatchClicked("c6")}
              ></td>
              <td
                style={{ backgroundColor: "#AAAAAA" }}
                id="c7"
                onClick={() => swatchClicked("c7")}
              ></td>
            </tr>
            <tr>
              <td
                style={{ backgroundColor: "#555555" }}
                id="c8"
                onClick={() => swatchClicked("c8")}
              ></td>
              <td
                style={{ backgroundColor: "#5555FF" }}
                id="c9"
                onClick={() => swatchClicked("c9")}
              ></td>
              <td
                style={{ backgroundColor: "#55FF55" }}
                id="cA"
                onClick={() => swatchClicked("cA")}
              ></td>
              <td
                style={{ backgroundColor: "#55FFFF" }}
                id="cB"
                onClick={() => swatchClicked("cB")}
              ></td>
              <td
                style={{ backgroundColor: "#FF5555" }}
                id="cC"
                onClick={() => swatchClicked("cC")}
              ></td>
              <td
                style={{ backgroundColor: "#FF55FF" }}
                id="cD"
                onClick={() => swatchClicked("cD")}
              ></td>
              <td
                style={{ backgroundColor: "#FFFF55" }}
                id="cE"
                onClick={() => swatchClicked("cE")}
              ></td>
              <td
                style={{ backgroundColor: "#FFFFFF" }}
                id="cF"
                onClick={() => swatchClicked("cF")}
              ></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Swatches;
