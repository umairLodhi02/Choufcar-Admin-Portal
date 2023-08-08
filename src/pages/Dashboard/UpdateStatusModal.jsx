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
import Select from "react-select";
import { RECEIPT_STATUSES } from "../../Components/constants/layout";
import { updateReceiptStatus } from "../../slices/dashboard/thunk";
import { useDispatch } from "react-redux";

const UpdateStatusModal = ({
  updateStatusModalVisible,
  toggleUpdateStatusVisible,
  handleReceiptStatus,
  receiptStatus,
  selectedItem,
}) => {
  const dispatch = useDispatch();
  return (
    <Modal
      id="myModal"
      isOpen={updateStatusModalVisible}
      toggle={() => {
        toggleUpdateStatusVisible();
      }}
    >
      <ModalHeader>Update Receipt Status</ModalHeader>
      <ModalBody>
        <Col xl={12}>
          <Row className="g-3">
            <Col sm={6}>
              <div>
                <Select
                  defaultValue={
                    receiptStatus && receiptStatus.label
                      ? receiptStatus.label
                      : ""
                  }
                  onChange={(e) => {
                    handleReceiptStatus(e);
                  }}
                  options={RECEIPT_STATUSES.filter((r) => r.value !== 0)} // hide *New* status
                  name="choices-single-default"
                  id="idStatus"
                ></Select>
              </div>
            </Col>
          </Row>
        </Col>
      </ModalBody>
      <ModalFooter>
        <Button
          color="light"
          onClick={() => {
            toggleUpdateStatusVisible();
          }}
        >
          Close
        </Button>
        <Button
          color="primary"
          onClick={() => {
            toggleUpdateStatusVisible();
            dispatch(
              updateReceiptStatus({
                receiptId: selectedItem.id.toString(),
                status: receiptStatus.value.toString(),
                adType: selectedItem.adType.toLowerCase(),
                phoneNumber: selectedItem.user.phoneNumber,
                subsciptionType: selectedItem.adType.toLowerCase(),
                subsciptionNumber: selectedItem.packageNumber,
              })
            );
          }}
        >
          Save changes
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default UpdateStatusModal;
