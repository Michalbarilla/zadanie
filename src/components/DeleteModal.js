import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteRequest } from "../services/Requests";

function DeleteModal({ objectUrl, callback }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = new useToast();
  const handleDelete = async () => {
    try {
      await deleteRequest(objectUrl);
      onClose();
      callback();
      toast({
        title: "Success",
        description: "Úspešne zmazané.",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Počas vymazávania nastala chyba.",
        status: "error",
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Button
        position="absolute"
        top="4"
        right="4"
        onClick={onOpen}
        borderRadius="full"
        bg="rgba(0, 0, 0,0.2)"
        color="white"
        fontSize="14px"
      >
        <DeleteIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="24px" fontWeight="medium">
            Potvrdiť vymazanie
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button
              bg="red"
              textColor="white"
              width="100%"
              fontSize="16px"
              fontWeight="medium"
              onClick={handleDelete}
            >
              Vymazať
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteModal;
