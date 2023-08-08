import React, { useEffect } from "react";
import { Spinner } from "reactstrap";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Loader = (props) => {
  useEffect(() => {
    document.body.classList.add("scroll-disabled");
    return () => {
      document.body.classList.remove("scroll-disabled");
    };
  }, []);
  return (
    <React.Fragment>
      <div className="custom-spinner d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-center mx-2 mt-2">
          <Spinner color="primary"> Loading... </Spinner>
        </div>
        {toast.error(props.error, {
          position: "top-right",
          hideProgressBar: false,
          progress: undefined,
          toastId: "",
        })}
      </div>
    </React.Fragment>
  );
};

export default Loader;
