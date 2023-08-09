import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import dummyImage from "../../assets/images/error400-cover.png";
import { Spinner } from "reactstrap";
const SwiperImage = ({ imgUrl }) => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true); // Initialize loading state as true

  useEffect(() => {
    const img = new Image();

    let url = "";
    if (imgUrl.includes("/receipt/")) {
      url = imgUrl.replace("/receipt/", "/adManager/");
    } else {
      url = imgUrl;
    }

    img.src = url;

    img.onload = () => {
      setImage(url);
      setLoading(false);
    };

    img.onerror = () => {
      setImage(dummyImage);
      setLoading(false);
    };
  }, [image]);

  return (
    <SwiperSlide>
      {loading ? (
        <div
          style={{
            height: 300,
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <Spinner color="primary">loading...</Spinner>
        </div>
      ) : (
        <img
          src={image}
          alt=""
          className="img-fluid"
          style={{ display: "block" }}
        />
      )}
    </SwiperSlide>
  );
};

export default SwiperImage;
