import "./App.css";
import { useState } from "react";

let a = 0;
let decimal = 0;
let decimalAdded = false;
let b = 0;
let clear_all = false;

function App() {
  const [display, setDisplay] = useState("0");
  const [currentOperator, setCurrentOperator] = useState("0");

  const handleNumberClick = (num: number) => {
    clear_all = false;
    if (currentOperator === "=") {
      a = num;
      b = 0;
      decimal = 0;
      decimalAdded = false;
      setCurrentOperator("");
      setDisplay(num.toString());
      return;
    }
    if (currentOperator === "") {
      clear_all = false;
      if (decimalAdded) {
        decimal = decimal * 10 + num;
        setDisplay(a + "." + decimal);
      } else {
        a = a * 10 + num;
        setDisplay(a.toString());
      }
    } else {
      if (decimalAdded) {
        decimal = decimal * 10 + num;
        setDisplay(b + "." + decimal);
      } else {
        b = b * 10 + num;
        setDisplay(b.toString());
      }
    }
  };

  const handleClearClick = () => {
    if (currentOperator === "" || currentOperator === "=" || clear_all) {
      a = 0;
      decimal = 0;
      decimalAdded = false;
      setCurrentOperator("");
      clear_all = false;
      setDisplay("0");
      return;
    } else {
      b = 0;
      decimal = 0;
      decimalAdded = false;
      clear_all = true;
      setDisplay(b.toString());
    }
  };

  const handleOperatorClick = (operator: string) => {
    clear_all = false;
    if (currentOperator === "" && operator === "=") return;

    if (currentOperator === "") {
      //
      let astr = a.toString();
      if (decimalAdded) {
        astr = astr + "." + decimal.toString();
      }
      a = a + decimal / Math.pow(10, decimal.toString().length);
      decimal = 0;
      decimalAdded = false;
      setCurrentOperator(operator);
      setDisplay(astr);
      return;
    } else {
      //
      b = b + decimal / Math.pow(10, decimal.toString().length);
      switch (currentOperator) {
        case "+":
          a = a + b;
          break;
        case "-":
          a = a - b;
          break;
        case "×":
          a = a * b;
          break;
        case "÷":
          if (b === 0) {
            setDisplay("Error");
            a = 0;
            b = 0;
            decimal = 0;
            decimalAdded = false;
            setCurrentOperator("");
            return;
          }
          a = a / b;
          break;
      }
      decimal = 0;
      decimalAdded = false;
      b = 0;
      setCurrentOperator(operator === "=" ? "=" : operator);
      setDisplay(a.toString());
    }
  };

  const handleDecimalClick = () => {
    if (!decimalAdded) {
      decimalAdded = true;
      if (currentOperator === "") {
        setDisplay(a + ".");
      } else {
        setDisplay(b + ".");
      }
    }
  };

  return (
    <main>
      <section>
        <div className="display">{display}</div>
        <div className="buttons">
          <button onClick={() => handleNumberClick(7)}>7</button>
          <button onClick={() => handleNumberClick(8)}>8</button>
          <button onClick={() => handleNumberClick(9)}>9</button>
          <button
            className={currentOperator === "÷" ? "active" : ""}
            onClick={() => handleOperatorClick("÷")}
          >
            ÷
          </button>

          <button onClick={() => handleNumberClick(4)}>4</button>
          <button onClick={() => handleNumberClick(5)}>5</button>
          <button onClick={() => handleNumberClick(6)}>6</button>
          <button
            className={currentOperator === "×" ? "active" : ""}
            onClick={() => handleOperatorClick("×")}
          >
            ×
          </button>

          <button onClick={() => handleNumberClick(1)}>1</button>
          <button onClick={() => handleNumberClick(2)}>2</button>
          <button onClick={() => handleNumberClick(3)}>3</button>
          <button
            className={currentOperator === "-" ? "active" : ""}
            onClick={() => handleOperatorClick("-")}
          >
            -
          </button>

          <button onClick={() => handleNumberClick(0)}>0</button>
          <button onClick={() => handleDecimalClick()}>.</button>
          <button onClick={() => handleOperatorClick("=")}>=</button>
          <button
            className={currentOperator === "+" ? "active" : ""}
            onClick={() => handleOperatorClick("+")}
          >
            +
          </button>

          <button className="clear-button" onClick={handleClearClick}>
            {currentOperator === "" || currentOperator === "=" || clear_all
              ? "AC"
              : "C"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
