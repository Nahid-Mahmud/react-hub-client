import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";

const SearchBox = ({setSearch,handleSearch,}) => {

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        onChange={(event, value) => {
          setSearch(value);
        }}
        sx={{
          width: 300,
          backgroundColor: "white",
          height: "50px",
          borderRadius: "10px",
          marginTop: "10px",
          overflow: "hidden"
          
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <Button
        onClick={handleSearch}
        style={{
          backgroundColor: "white",
          height: "2rem",
          marginTop: "1rem",
          marginLeft: ".5rem",
        }}
        sx={{ color: "black" }}
      >
        {" "}
        Search{" "}
      </Button>
    </>
  );
};

const top100Films = [
  { label: "tech" },
  { label: "lifestyle" },
  { label: "tour" },
];

export default SearchBox;
