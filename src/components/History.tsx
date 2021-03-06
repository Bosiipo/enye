import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RoomIcon from "@material-ui/icons/Room";
import { HistoryProps, User } from "./Interfaces";

interface Props {
  // loading: boolean;
  // data: HistoryProps[] | undefined;
  history: HistoryProps[];
  currentUser: User | null | undefined;
  renderHistory: (id: string) => void;
  // userId: string;
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
  box: {
    border: "2px solid black",
    width: "75%",
    margin: "15px 46px",
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
  },
  icon: {
    color: "orange",
    fontSize: "20px",
    paddingTop: "1px",
    paddingRight: "16px",
    paddingLeft: "10px",
  },
  scroll: {
    height: "300px",
    overflowY: "scroll",
    overflowX: "hidden",
  },
  p: {
    cursor: "pointer",
  },
});

const Search: React.FC<Props> = ({
  // data,
  // loading,
  history,
  renderHistory,
  currentUser,
  // userId,
}) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.input_details}>
        <div className={classes.card}>
          <h4 className={classes.search_places}>Previous Search Results</h4>
          <div className={classes.scroll}>
            {history.map(
              (h: {
                type: React.ReactNode;
                radius: React.ReactNode;
                id: string;
              }) => {
                return (
                  <div key={h.id} className={classes.box}>
                    <p
                      onClick={() => renderHistory(h.id)}
                      className={classes.p}
                    >
                      <span>
                        <RoomIcon className={classes.icon} />
                      </span>
                      <span>{h.type}, </span>
                      <span>{h.radius} Away</span>
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
