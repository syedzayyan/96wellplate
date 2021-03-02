import './App.css';
import { useState, createContext, useContext } from "react"
import ColorPicker, { useColor } from "react-color-palette";

const ColorContext = createContext();

const ColorContextProvider = (props) => {
    const [colorCode, setColorCode] = useColor("hex", "#121212");
    return(
        <ColorContext.Provider value = {[colorCode, setColorCode]}>
            {props.children}
        </ColorContext.Provider>
    )
}

function TableData(props) {
  const [colors, setColors] = useState(false)
  const [colorCode] = useContext(ColorContext);
  const backColor = colorCode.hex
  return <td
    className="table-cell"
    style={colors ? ({ backgroundColor: backColor }) : ({ backgroundColor: "white" })}
    onClick={() => { setColors(prev => !prev); }}
  >{props.num}</td>
}

function ColorPalet() {
  const [colorCode, setColorCode] = useContext(ColorContext);
  return (
    <div>
      <ColorPicker width={456} height={228} color={colorCode} onChange={setColorCode} hideHSB dark />;
    </div>
  )
}

function App() {
  const tableBody = [];
  const tableHeader = [];
  const rows = 8;
  const columns = 13;

  for (var i = 0; i < rows; i++) {
    tableBody[i] = [];
    for (var j = 0; j < columns; j++) {
      if (j === 0) {
        tableBody[i][j] = i + 1
        console.log(null)
        continue
      }
      tableBody[i][j] = "";
    }
  }

  for (var y = 0; y < columns; y++) {
    if (y === 0) {
      tableHeader[y] = null
      continue
    }
    tableHeader[y] = String.fromCharCode(63 + y + 1);
  }

  return (
    <div className = "plate-container">
      <ColorContextProvider>
      <ColorPalet />
      <div>
        <table>
          <tbody style={{ border: "0.1rem solid black" }}>
            <tr>
              {tableHeader.map((x, y) =>
                <th style={{ fontSize: "2rem" }}>
                  {x}
                </th>
              )}
            </tr>
            {
              tableBody.map((numList, i) => (
                <tr key={i}>
                  {
                    numList.map((num, j) =>
                      <TableData key={j} num={num} />
                    )
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      </ColorContextProvider>
    </div>
  );
}

export default App;
