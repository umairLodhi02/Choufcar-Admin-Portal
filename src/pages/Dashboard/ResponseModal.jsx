import { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { loadAnimation } from "lottie-web";
import { defineElement } from "lord-icon-element";
// register lottie and define custom element
defineElement(loadAnimation);
const ResponseModal = ({
  tog_successMessage,
  modal_successMessage,
  response,
  fetchList,
}) => {
  return (
    <Modal
      id="success-Payment"
      tabIndex="-1"
      isOpen={modal_successMessage}
      toggle={(val) => {
        tog_successMessage(val);
      }}
      centered
    >
      <ModalBody className="text-center p-5">
        <div className="text-end">
          <button
            type="button"
            onClick={() => {
              tog_successMessage(false);
            }}
            className="btn-close text-end"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="mt-2">
          {response.responseCode === "00" ? (
            <lord-icon
              src="https://cdn.lordicon.com/tqywkdcz.json"
              trigger="hover"
              style={{ width: "150px", height: "150px" }}
            ></lord-icon>
          ) : (
            <lord-icon
              src="https://cdn.lordicon.com/inrunzby.json"
              trigger="hover"
              colors="primary:#ffc738,secondary:#92140c"
              style={{ width: "150px", height: "150px" }}
            ></lord-icon>
          )}

          <h4 className="mb-3 mt-4">
            {response && response.responseCode === "00"
              ? "Confirmation"
              : "Error"}
          </h4>
          <p className="text-muted fs-15 mb-4">
            {(response && (response.message || response.responseMessage)) || ""}
          </p>
          <div className="hstack gap-2 justify-content-center">
            <button
              className="btn btn-primary"
              onClick={() => {
                tog_successMessage(false);
                if (response.responseCode === "00") {
                  fetchList();
                }
              }}
            >
              Back to List
            </button>
          </div>
        </div>
      </ModalBody>
      {/* <div className="modal-footer bg-light p-3 justify-content-center">
        <p className="mb-0 text-muted">
          You like our service?{" "}
          <Link to="#" className="link-secondary fw-semibold">
            Invite Friends
          </Link>
        </p>
      </div> */}
    </Modal>
  );
};
export default ResponseModal;
