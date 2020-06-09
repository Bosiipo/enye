import React, { useRef } from "react";

interface Props {
  searchHospital: (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => void;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Search: React.FC<Props> = ({ searchHospital, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="App">
      <div className="input_details">
        <input
          type="number"
          className="input"
          onInput={searchHospital}
          ref={inputRef}
          placeholder="Enter your geo-location radius here in kilometres"
        />
      </div>
    </div>
  );
};

export default Search;
