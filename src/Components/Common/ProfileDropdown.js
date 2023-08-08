import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

//import images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import { logoutUser } from "../../slices/thunks";
import Loader from "./Loader";

const ProfileDropdown = () => {
  const { user, loading } = useSelector((state) => ({
    user: state.Profile.user,
    loading: state.Login.auth,
  }));
  const dispatch = useDispatch();

  let authUser = "";
  if (localStorage.getItem("authUser")) {
    authUser = JSON.parse(localStorage.getItem("authUser"));
  }

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };
  return (
    <React.Fragment>
      {loading && <Loader />}
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
      >
        <DropdownToggle tag="button" type="button" className="btn">
          <span className="d-flex align-items-center">
            <img
              className="rounded-circle header-profile-user"
              src={avatar1}
              alt="Header Avatar"
            />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {authUser.userName || ""}
              </span>
              <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                Admin
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <h6 className="dropdown-header">Welcome {authUser.userName}!</h6>
          <DropdownItem className="p-0">
            <Link to={process.env.PUBLIC_URL + "#"} className="dropdown-item">
              <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
              <span className="align-middle">Profile</span>
            </Link>
          </DropdownItem>
          {/* <DropdownItem className="p-0">
            <Link to={process.env.PUBLIC_URL + "#"} className="dropdown-item">
              <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle">Messages</span>
            </Link>
          </DropdownItem>
          <DropdownItem className="p-0">
            <Link to={"#"} className="dropdown-item">
              <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle">Taskboard</span>
            </Link>
          </DropdownItem>
          <DropdownItem className="p-0">
            <Link to={process.env.PUBLIC_URL + "#"} className="dropdown-item">
              <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle">Help</span>
            </Link>
          </DropdownItem> */}
          <DropdownItem className="p-0">
            <Link to={process.env.PUBLIC_URL + "#"} className="dropdown-item">
              {/* <span className="badge bg-soft-success text-success mt-1 float-end">
                New
              </span> */}
              <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle">Settings</span>
            </Link>
          </DropdownItem>
          <div className="dropdown-divider"></div>
          {/* <DropdownItem className="p-0">
            <Link to={process.env.PUBLIC_URL + "#"} className="dropdown-item">
              <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle">
                Balance : <b>$5971.67</b>
              </span>
            </Link>
          </DropdownItem> */}

          {/* <DropdownItem className="p-0">
            <Link to={process.env.PUBLIC_URL + "#"} className="dropdown-item">
              <i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle">Lock screen</span>
            </Link>
          </DropdownItem> */}
          <DropdownItem className="p-0">
            <button
              onClick={() => dispatch(logoutUser())}
              className="dropdown-item"
            >
              <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle" data-key="t-logout">
                Logout
              </span>
            </button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
