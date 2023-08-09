import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import {
  Pagination,
  Navigation,
  Scrollbar,
  EffectFade,
  EffectCreative,
  Mousewheel,
  EffectFlip,
  EffectCoverflow,
  Autoplay,
} from "swiper";
import SwiperImage from "./SwiperImage";

const SwiperSlider = ({
  imagesForSlider,
  swiperSliderModal,
  toggleSwiperModal,
}) => {
  return (
    <Modal
      id="swiper-modal
      "
      tabIndex="-1"
      isOpen={swiperSliderModal}
      toggle={(val) => {
        toggleSwiperModal(val);
      }}
      centered
      className="modal-dialog-scrollable"
    >
      <div id="myModalLabel" className="modal-title modal-header">
        <h5 className="modal-title">Receipt images</h5>
        <button
          type="button"
          onClick={() => {
            toggleSwiperModal(false);
          }}
          className="btn-close text-end"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>{" "}
      </div>

      <ModalBody>
        <Col xl={12} lg={12}>
          <Card>
            <CardBody>
              <Swiper
                pagination={{ clickable: true, dynamicBullets: true }}
                modules={[Navigation, Pagination, Autoplay]}
                navigation={true}
                loop={true}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                className="mySwiper swiper pagination-dynamic-swiper rounded"
              >
                <div className="swiper-wrapper">
                  {imagesForSlider &&
                    imagesForSlider.length > 0 &&
                    imagesForSlider.map((img) => {
                      return <SwiperImage imgUrl={img} />;
                    })}
                </div>
              </Swiper>
            </CardBody>
          </Card>
        </Col>
      </ModalBody>
    </Modal>
  );
};

export default SwiperSlider;
