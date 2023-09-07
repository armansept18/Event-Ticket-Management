import React, { useState, useEffect } from "react";
import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import { api } from "../api/axios";
import gambar1 from "../assets/carousel1.jpg";

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 200,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Carousel = () => {
  const [slider, setSlider] = useState(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });
  const [carousel, setCarousel] = useState([]);

  const fetchCarousel = () => {
    api
      .get("/carousels")
      .then((res) => setCarousel(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchCarousel();
  }, []);

  return (
    <Box
      // objectFit={"contain"}
      position={"relative"}
      height={"280px"}
      width={"1280px"}
      objectFit={"contain"}
      // overflow={"hidden"}
      margin={"20px auto"}
      // padding={"20px"}
    >
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      <IconButton
        aria-label="left-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt />
      </IconButton>

      <IconButton
        aria-label="right-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt />
      </IconButton>

      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {carousel.map((card, index) => (
          <Box
            key={index}
            height={"280px"}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            objectFit={"contain"}
            borderRadius={"20px"}
            padding={"20px"}
            backgroundImage={`url(${card.imageCarousel})`}
            // backgroundImage={gambar1}
          ></Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
