import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Calendar from "../Calendar";
import date from "../Calendar";
import "react-calendar/dist/Calendar.css";
import { useLocation } from "react-router-dom";

const FirstLayer = () => {
  const [dropdownMenu2, setdropdownMenu2] = useState(false);
  const path = useLocation();
  const pathname = path.pathname;
  const click = () => setdropdownMenu2(!dropdownMenu2);

  return (
    <>
      <div className="d-flex  align-items-center p-4 justify-content-between">
        <div className="fw-bolder  fs-5">E-Commerce/Admin{pathname}</div>
        <div className="Calendar position-relative    ">
          <Button
            onClick={click}
            style={{ color: "#0B5ED7", borderBlockColor: "#0B5ED7" }}
            className="fw-bolder  bg-transparent    "
          >
            Today :15-25-1998
            {/* Today : {date.toLocaleDateString()} */}
          </Button>
          {dropdownMenu2 && <Calendar className="" value={date} />}
        </div>
      </div>
    </>
  );
};

export default FirstLayer;
