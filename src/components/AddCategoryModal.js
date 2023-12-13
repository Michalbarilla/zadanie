import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input, useToast, useDisclosure, Text, Box,
} from '@chakra-ui/react';
 import {PlusSquareIcon} from '@chakra-ui/icons'
import {addCategory} from "../services/Requests";

function AddCategoryModal({callback}) {
    const [categoryName, setCategoryName] = useState('');
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSave = async () => {
        if (categoryName.length === 0) {
            toast({
                title: 'Error',
                description: "Názov kategórie nesmie byť prázdny.",
                status: 'error',
                isClosable: true,
            });
            return;
        }
        try {
            await addCategory(categoryName);
            onClose();
            setCategoryName('');
            toast({
                title: 'Success',
                description: "Nová kategória bola úspešne vytvorená.",
                status: 'success',
                isClosable: true,
            });
            callback();
        } catch (error) {
            toast({
                title: 'Error',
                description: "Počas vytvárania novej kategórie nastala chyba.",
                status: 'error',
                isClosable: true,
            });
            console.error('Error adding category:', error);
        }
    };
    return (
        <>
            <Button onClick={onOpen} fontWeight="regular" fontSize="16"  width="100%" height="100%" bg="white">
               <Box>
                    <PlusSquareIcon margin="16px" boxSize="24px" color="gray"/>
                    <Text> Pridať kategóriu </Text>
               </Box>
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="24px" fontWeight="medium" >Pridať kategóriu</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Input
                                fontSize="16px"
                                fontWeight="medium"
                                placeholder=" "
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                size="lg"
                            />
                            <FormLabel
                                htmlFor="categoryName"
                                position="absolute"
                                top="-2"
                                left="3"
                                zIndex="1"
                                px={2}
                                bg="white"
                                fontSize="14px"
                                fontWeight="medium"
                            >
                                Názov kategórie *
                            </FormLabel>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button bg="black" textColor="white" width="100%" fontSize="16px" fontWeight="medium" onClick={handleSave}>
                            Pridať
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddCategoryModal;