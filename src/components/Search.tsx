import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

interface Props {
  searchHospital: (radius: number) => void;
  onChangeRadius:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined;
  radius: number;
  onChangeType: (e: any) => void;
}

const useStyles = makeStyles({
  input: {
    padding: "0.375rem 0.75rem",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    border: "1px solid #ced4da",
    borderRadius: "0.25rem",
    transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
    width: "49%",
    // marginTop: "50px",
    alignSelf: "center",
  },
  input_details: {
    // display: "flex",
    // flexDirection: "column",
    // paddingBottom: "40px",
  },
  dropdown: {
    padding: "10px 10px",
    fontSize: "13.5px",
    fontWeight: 400,
    lineHeight: 1.5,
    border: "1px solid #ced4da",
    borderRadius: "0.25rem",
    width: "55%",
    alignSelf: "center",
  },
  search_places: {
    textAlign: "center",
  },
  select_type: {
    margin: 0,
    marginLeft: "78px",
    marginTop: "20px",
  },
  select_radius: {
    margin: 0,
    marginLeft: "78px",
  },
  default_radius: {
    margin: 0,
    marginLeft: "78px",
    fontSize: "13px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    margin: "0 auto",
    marginTop: "40px",
    marginBottom: "40px",
  },
  button: {
    width: "49%",
    alignSelf: "center",
    margin: "24px 20px",
  },
});

const Search: React.FC<Props> = ({
  searchHospital,
  onChangeRadius,
  onChangeType,
  radius,
}) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.input_details}>
        <div className={classes.card}>
          <h4 className={classes.search_places}>Search for Places</h4>
          <h5 className={classes.select_radius}>Select Radius</h5>
          <input
            type="number"
            className={classes.input}
            onChange={onChangeRadius}
            // onBlur={() => searchHospital(radius)}
            value={radius}
            name="radius"
            placeholder="Enter your search radius here in km"
          />
          <p className={classes.default_radius}>
            default would search by hospitals
          </p>
          <h5 className={classes.select_type}>Select Type</h5>
          <select
            className={classes.dropdown}
            id="select"
            onChange={onChangeType}
          >
            <option value="">-</option>
            <option value="hospital">Clinic/Hospital/Medical-Center</option>
            <option value="pharmacy">Pharmacy</option>
          </select>
          <p className={classes.default_radius}>search in kilometres</p>
          <Button
            variant="contained"
            color="primary"
            onBlur={() => searchHospital(radius)}
            className={classes.button}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Search;
