import React, { useState } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";

const App = () => {
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "grape", label: "Grape" },
    { value: "orange", label: "Orange" },
  ];

  const [selectedValues, setSelectedValues] = useState([]);

  return (
    <div style={{ padding: "20px" }}>
      <h4>Multi-Select Dropdown</h4>
      <MultiSelectDropdown
        options={options}
        label="Choose Options"
        value={selectedValues}
        onChange={(values) => setSelectedValues(values)}
      />
    </div>
  );
};

export default App;
