import React from "react";
import HospitalProps from "./Interfaces";

// interface Props {
//   name: string;
//   categorySet: Array<string>;
//   categories?: Array<object>;
//   classifications?: Array<object>;
// }

const List: React.FC<HospitalProps> = (hospitals) => {
  //   const inputRef = useRef<HTMLInputElement>(null);
  console.log(hospitals);
  return (
    <div className="App">
      <h1>{hospitals.poi.name}</h1>
      <p>
        {hospitals.address.streetNumber}, {hospitals.address.streetName}
      </p>
    </div>
  );
};

export default List;

{
  /* <ul>
        {hospitals.map(({ name, categorySet, categories, classifications }) => (
          <li
            key={name}
            style={{
              margin: "7px",
            }}
          >
            {name}
          </li>
        ))}
      </ul> */
}
