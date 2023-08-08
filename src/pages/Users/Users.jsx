import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

//Import Breadcrumb
const Users = () => {
  document.title = "Users"; //for meta title
  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <BreadCrumb title="Users" breadcrumbItem="Users" />
          //write Html code or structure Users page
        </Container>
      </div>
    </>
  );
};

export default Users;
