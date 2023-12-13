import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button, useToast, useDisclosure,
} from '@chakra-ui/react';
import {DeleteIcon} from "@chakra-ui/icons";

function DeleteModal( ObjectUrl ) {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDelete = (category) => {
        console.log(category);
        fetch(`http://api.programator.sk/gallery/${category.objectUrl}`,{
            method  : 'DELETE'
        }).then((response) => {
            if (!response.ok){
                throw new Error();
            }
            toast({
                title: 'Success',
                description: "Odstránenie bolo úspešné",
                status: 'success',
                isClosable: true,
            });
            onClose();

        }).catch(() => {
                toast({
                    title: 'Error',
                    description: "Odstránenie nebolo úspešné",
                    status: 'error',
                    isClosable: true,
                });
            });
    };

    return (
        <>
            <Button
                position="absolute"
                top="4"
                right="4"
                onClick={onOpen}
                borderRadius="full"
                bg="rgba(0, 0, 0,0.2)" // Red background for delete
                color="white"
                fontSize="14px"
            >
                <DeleteIcon />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="24px" fontWeight="medium" >Potvrdiť vymazanie</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Button bg="red" textColor="white" width="100%" fontSize="16px" fontWeight="medium" onClick={()=> handleDelete(ObjectUrl)}>
                            Vymazať
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default DeleteModal;