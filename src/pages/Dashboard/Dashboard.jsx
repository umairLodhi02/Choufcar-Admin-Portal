import React, { useEffect } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
//Import Breadcrumb
import BreadCrumb from "../../Components/Common/BreadCrumb";
import DataTable from "react-data-table-component";

import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  getReceiptData,
  updateReceiptStatus,
} from "../../slices/dashboard/thunk";
import Loader from "../../Components/Common/Loader";

import { useState } from "react";
import {
  RECEIPT_STATUSES,
  getReceiptStatusById,
} from "../../Components/constants/layout";
import moment from "moment";
import { hideRecipeError, toggleModal } from "../../slices/dashboard/reducer";
import UpdateStatusModal from "./UpdateStatusModal";
import ResponseModal from "./ResponseModal";

const ACTIVE_LIST_VALUES = {
  APPROVED: "APPROVED",
  NEW: "NEW",
  REJECTED: "REJECTED",
};

const Dashboard = () => {
  document.title = "Dashboard"; //for meta title
  const dispatch = useDispatch();

  const { response, error, loading, modal } = useSelector(
    (state) => state.Receipt
  );

  const [selectedItem, setSelectedItem] = useState({});

  const [activeList, setActiveList] = useState("NEW");
  const [filteredList, setFilteredList] = useState([]);

  const [updateStatusModalVisible, setUpdateStatusModalVisible] =
    useState(false);

  const [receiptStatus, setReceiptStatus] = useState({});

  const columns = [
    // {
    //   name: (
    //     <Input
    //       className="form-check-input fs-15"
    //       type="checkbox"
    //       name="checkAll"
    //       value="option1"
    //     />
    //   ),
    //   cell: (row) => (
    //     <input
    //       className="form-check-input fs-15"
    //       type="checkbox"
    //       name="checkAll"
    //       value="option2"
    //       onChange={(e) => {
    //         console.log(row);
    //         const { checked } = e.target;
    //         if (checked) {
    //           onSelectedRow(row);
    //         } else {
    //           onUnSelectedRow(row);
    //         }
    //       }}
    //     />
    //   ),
    // },
    {
      name: <span className="font-weight-bold fs-13">SR No.</span>,
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Phone Number</span>,
      selector: (row) => row.user.phoneNumber,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Package Number</span>,
      selector: (row) => row.packageNumber,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Ad Type</span>,
      selector: (row) => row.adType,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Create Date</span>,
      selector: (row) => moment(row.createdDate).format("YYYY-MM-DD"),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      sortable: true,
      selector: (row) => {
        let obj = getReceiptStatusById(row.newApprovedRejected);
        switch (obj.value) {
          case "0":
          case 0:
            return (
              <span className="badge badge-soft-secondary"> {obj.label} </span>
            );
          case "1":
          case 1:
            return (
              <span className="badge badge-soft-success"> {obj.label} </span>
            );
          case "2":
          case 2:
            return (
              <span className="badge badge-soft-danger"> {obj.label} </span>
            );
          default:
            return <span className="badge badge-soft-warning"> </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      cell: (row) => {
        return (
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
            >
              <i className="ri-more-fill align-middle"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem
                onClick={() => {
                  setSelectedItem(row);
                  let currentStatus = getReceiptStatusById(
                    row.newApprovedRejected
                  );
                  setReceiptStatus(currentStatus);
                  toggleUpdateStatusVisible();
                }}
              >
                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                Update Status
              </DropdownItem>
              {/* <DropdownItem className="edit-item-btn">
                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                Edit
              </DropdownItem>
              <DropdownItem className="remove-item-btn">
                {" "}
                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                Delete{" "}
              </DropdownItem> */}
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      },
    },
  ];

  const toggleUpdateStatusVisible = () => {
    setUpdateStatusModalVisible(!updateStatusModalVisible);
  };

  useEffect(() => {
    dispatch(getReceiptData());
  }, []);

  useEffect(() => {
    if (response?.data?.newList && response?.data?.newList.length > 0) {
      setFilteredList(response?.data?.newList);
      setActiveList(ACTIVE_LIST_VALUES.NEW);
    } else if (
      response?.data?.approvedList &&
      response?.data?.approvedList.length > 0
    ) {
      setActiveList(ACTIVE_LIST_VALUES.APPROVED);
      setFilteredList(response.data.approvedList);
    } else if (
      response?.data?.rejectedList &&
      response?.data?.rejectedList.length > 0
    ) {
      setFilteredList(response?.data?.rejectedList);
      setActiveList(ACTIVE_LIST_VALUES.REJECTED);
    } else {
      setFilteredList([]);
      setActiveList(ACTIVE_LIST_VALUES.APPROVED);
    }
  }, [response]);

  const handleReceiptStatus = (status) => {
    setReceiptStatus(status);
  };

  // useEffect(() => {
  //   if (message) {
  //     setTimeout(() => {
  //       dispatch(hideRecipeError());
  //     }, 4000);
  //   }
  // }, [message]);

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          {loading ? <Loader error={error.message} /> : null}
          <BreadCrumb title="Dashboard" breadcrumbItem="Dashboard" />
          {modal ? (
            <ResponseModal
              modal_successMessage={modal}
              tog_successMessage={(val) => {
                dispatch(toggleModal(val));
              }}
              response={error}
              fetchList={() => {
                dispatch(getReceiptData());
              }}
            />
          ) : null}
          <Row>
            <Col sm="6">
              <div className="d-flex align-items-center gap-2">
                <p className="mb-0">Filter by: </p>
                <Button
                  size="sm"
                  color="secondary"
                  outline={"none"}
                  className={`rounded-pill ${
                    activeList === ACTIVE_LIST_VALUES.NEW ? "active" : ""
                  }`}
                  onClick={() => {
                    setFilteredList(response?.data?.newList);
                    setActiveList(ACTIVE_LIST_VALUES.NEW);
                  }}
                >
                  New
                </Button>

                <Button
                  color="success"
                  size="sm"
                  outline={"none"}
                  className={`rounded-pill ${
                    activeList === ACTIVE_LIST_VALUES.APPROVED ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveList(ACTIVE_LIST_VALUES.APPROVED);
                    setFilteredList(response?.data?.approvedList);
                  }}
                >
                  Approved
                </Button>

                <Button
                  color="danger"
                  size="sm"
                  outline={"none"}
                  className={`rounded-pill ${
                    activeList === ACTIVE_LIST_VALUES.REJECTED ? "active" : ""
                  }`}
                  onClick={() => {
                    setFilteredList(response?.data?.rejectedList);
                    setActiveList(ACTIVE_LIST_VALUES.REJECTED);
                  }}
                >
                  Rejected
                </Button>
              </div>
            </Col>
            {/* <Col sm="6">
              <Button
                onClick={() => toggleUpdateStatusVisible()}
                disabled={!(selectedRows && selectedRows.length === 1)}
              >
                Update status
              </Button>{" "}
            </Col> */}
          </Row>
          <DataTable
            columns={columns}
            data={filteredList || []}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="700px"
          />
        </Container>
      </div>

      <UpdateStatusModal
        updateStatusModalVisible={updateStatusModalVisible}
        handleReceiptStatus={handleReceiptStatus}
        toggleUpdateStatusVisible={toggleUpdateStatusVisible}
        receiptStatus={receiptStatus}
        selectedItem={selectedItem}
      />
    </>
  );
};

export default Dashboard;
