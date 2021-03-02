import "./App.css"
import { useState } from "react"
import ColorPicker, { useColor } from "react-color-palette";

function App() {
  const tableBody = [];
  const tableHeader = [];
  const rows = 8;
  const columns = 13;

  for (var i = 0; i < rows; i++) {
    tableBody[i] = [];
    for (var j = 0; j < columns; j++) {
      if (j === 0) {
        tableBody[i][j] = String.fromCharCode(64 + i + 1)
        console.log(null)
        continue
      }
      tableBody[i][j] = "white";
    }
  }
  for(var x =0; x < columns; x ++){
    tableHeader[x] = x;
  }

  const [colorPalette, SetColorPalette] = useState(tableBody)
  const [color, setColor] = useColor("hex", "#121212");

  const updateWellColor = (i, j) => {
    const tempColorPalette = colorPalette;
    tempColorPalette[i][j] = color.hex;
    SetColorPalette([...tempColorPalette]);
  }


  if (colorPalette.length < 0) {
    return <div>Loading</div>
  }
  return (
    <div>
      <h1 style = {{textAlign:"center"}}>96 Well Plate Layout Maker</h1>
      <div className="plate-container">
        <div>
          <ColorPicker width={456} height={228} color={color} onChange={setColor} hideHSB dark />
        </div>
        <div>
          <table>
            <tbody style={{ border: "0.1rem solid black" }}>
            {tableHeader.map((x, y) =>
                <th key = {y}>
                  {x}
                  <br></br>
                  <div contentEditable = "true" style = {{height:"2rem", width:"2rem"}}></div>
                </th>
              )}
              {
                colorPalette.map((colorList, i) => (
                  <tr key={i}>
                    {
                      colorList.map((color, j) =>
                        <td onClick={() => { updateWellColor(i, j) }} key={j} style={{ backgroundColor: color }} className="table-cell"><div className = "table-cell-text">{color}</div></td>
                      )
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default App