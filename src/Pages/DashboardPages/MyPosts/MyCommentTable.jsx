import React, { useState } from "react";

const MyCommentTable = () => {
  const [buttonDisable, setbuttonDisable] = useState(true);
  const [value, setvalue] = useState("    Irrelavent");
  const handleOptionChange = (e) => {
    setvalue(e.target.value);
    setbuttonDisable(false);
  };
  console.log(value);

  const handleReoprt = ()=>{
    setbuttonDisable(true);
  }

  return (
    <tr>
      <th>3</th>
      <td>Brice Swyre</td>
      <td>Tax Accountant</td>
      <td>
        <select
          className="btn text-black capitalize   hover:bg-white hover:text-black bg-slate-200 "
          name="usertag"
          onChange={handleOptionChange}
          id="usertag"
        >
          <option className="capitalize" value={"Irrelavent"}>
            Irrelavent
          </option>
          <option className="capitalize" value={"Violance"}>
            Violance
          </option>
          <option className="capitalize" value={"Hate Speech"}>
            Hate Speech
          </option>
        </select>
      </td>
      <td>
        <button
        onClick={handleReoprt}
          disabled={buttonDisable}
          className="btn btn-outline bg-yellow-500"
        >
          {" "}
          Report
        </button>
      </td>
    </tr>
  );
};

export default MyCommentTable;
