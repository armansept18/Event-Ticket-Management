import { useDisclosure } from "@chakra-ui/react";

export const ProductListPage = ({ search }) => {
  const [products, setProducts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setProducts([...data.products]);
  }, []);
  return (
    <>
      <Center alignItems={"flex-start"} marginTop={"35px"}>
        <Flex justifyContent={"right"} bgColor={"blue"}>
          <img
            src={add50}
            alt=""
            style={{
              position: "fixed",
              backgroundColor: "white",
              borderRadius: "50%",
              objectFit: "cover",
              cursor: "pointer",
              marginRight: "20px",
              marginTop: "20px",
            }}
            onClick={onOpen}
          />
        </Flex>
        <ModalInputProduct
          isOpen={isOpen}
          onClose={onClose}
          setProducts={setProducts}
          products={products}
        />
      </Center>
    </>
  );
};
