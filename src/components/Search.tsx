import React from "react";

interface Props {
  searchHospital: (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => void;
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  radius: string;
}

const Search: React.FC<Props> = ({ searchHospital, onChange, radius }) => {
  return (
    <div className="App">
      <div className="input_details">
        <input
          type="number"
          className="input"
          onChange={onChange}
          // onInput={searchHospital}
          value={radius}
          placeholder="Enter your search radius here in metres"
        />
      </div>
    </div>
  );
};

export default Search;
