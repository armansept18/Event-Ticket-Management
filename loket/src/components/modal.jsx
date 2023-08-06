import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import defaultImage from "../assets/loket.png";
export const BasicModal = ({
  isOpen,
  onClose,
  setProducts,
  Product,
  products = [],
}) => {
  const [data, setData] = useState(
    Product
      ? Product
      : {
          id: "",
          imgUrl: "",
          name: "",
          date: "",
          time: "",
          location: "",
          category: "",
          price: 0,
        }
  );
  useEffect(() => {
    console.log('Product :>> ', Product);
    setData(Product);
  }, [Product]);

  const inputHandler = (e) => {
    if (e.target.id == "price")
      if (isNaN(e.target.value)) return setData({ ...data, [e.target.id]: 0 });
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const clear = () => {
    setData({
      id: "",
      imgUrl: "",
      name: "",
      date: "",
      time: "",
      location: "",
      category: "",
      price: 0,
    });
  };

  const submit = () => {
    try {
      //add
      if (!Product) {
        if (
          data.id &&
          data.imgUrl &&
          data.name &&
          data.time &&
          data.location &&
          data.category &&
          data.price
        )
          setProducts([
            ...products,
            { ...data, id: products[products.length - 1].id + 1 },
          ]);
        else alert("lengkapi input");
        clear();
      } else {
        const idx = products.findIndex((prod) => prod.id == Product.id); //0
        const tmp = [...products];
        tmp[idx] = data;
        setProducts(tmp);
      }
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const remove = () => {
    const idx = products.findIndex((prod) => prod.id == Product.id);
    const tmp = [...products];
    tmp.splice(idx, 1);
    setProducts(tmp);
    clear();
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add/Edit Events</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center flexDir="column" gap={"15px"}>
              <img
                src={data?.ImageUrl ? data?.ImageUrl : defaultImage}
                width={"201px"}
                height={"143px"}
                alt="isi dengan gambar"
              ></img>
              <Input
                id="ImageUrl"
                placeholder="Image URL"
                maxW="300px"
                defaultValue={data?.ImageUrl}
                onChange={inputHandler}
              ></Input>
              <Input
                id="name"
                placeholder="Product Name"
                maxW="300px"
                defaultValue={data?.name}
                onChange={inputHandler}
              ></Input>
              <Input
                id="time"
                placeholder="time"
                maxW="300px"
                defaultValue={data?.time}
                onChange={inputHandler}
              ></Input>
              <Input
                id="location"
                placeholder="location"
                maxW="300px"
                defaultValue={data?.location}
                onChange={inputHandler}
              ></Input>
              <Input
                id="category"
                placeholder="category"
                maxW="300px"
                defaultValue={data?.category}
                onChange={inputHandler}
              ></Input>
              <Input
                id="price"
                placeholder="Product Price"
                maxW="300px"
                defaultValue={data?.price}
                value={data?.price}
                onChange={inputHandler}
              ></Input>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submit}>
              Submit
            </Button>
            {Product ? (
              <Button colorScheme="red" mr={3} onClick={remove}>
                Delete
              </Button>
            ) : null}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
