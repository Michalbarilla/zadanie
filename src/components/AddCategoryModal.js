// AddCategoryModal.js
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
    Input, useDisclosure,
} from '@chakra-ui/react';

function AddCategoryModal({ isOpen, onClose }) { // These are props coming from the parent component
    const [categoryName, setCategoryName] = useState('');

    const handleSave = () => {
        console.log('Saving new category:', categoryName);
        // Add your save logic here...
        setCategoryName('');
        onClose(); // This should close the modal
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}> // Use the props here
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Pridať kategóriu</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel htmlFor="categoryName">Názov kategórie *</FormLabel>
                        <Input
                            id="categoryName"
                            placeholder="Názov kategórie"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={handleSave}>
                        Pridať
                    </Button>
                    <Button onClick={onClose}>Zrušiť</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default AddCategoryModal;