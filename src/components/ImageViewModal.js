import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    Image,
    IconButton,
    Flex,
} from '@chakra-ui/react';
import {ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

function ImageViewerModal({ isOpen, onClose, imageUrl }) {
    const handlePrevious = () => {
        console.log('Go to previous image');
    };

    const handleNext = () => {
        console.log('Go to next image');
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
            <ModalOverlay />
            <ModalContent maxWidth="none" background="transparent" boxShadow="none">
                <ModalHeader>
                    <ModalCloseButton
                        position="absolute"
                        right={2}
                        top={2}
                        color="white"
                        zIndex="1"
                    />
                </ModalHeader>
                <Flex align="center" justify="center" height="100vh">
                    <IconButton
                        aria-label="Previous image"
                        icon={<ChevronLeftIcon />}
                        position="absolute"
                        left="0"
                        margin="auto"
                        height="fit-content"
                        top="0"
                        bottom="0"
                        zIndex="1"
                        onClick={handlePrevious}
                    />
                    <Image src={imageUrl} maxWidth="80vw" maxHeight="80vh" margin="auto" />
                    <IconButton
                        aria-label="Next image"
                        icon={<ChevronRightIcon />}
                        position="absolute"
                        right="0"
                        margin="auto"
                        height="fit-content"
                        top="0"
                        bottom="0"
                        zIndex="1"
                        onClick={handleNext}
                    />
                </Flex>
            </ModalContent>
        </Modal>
    );
}
export default ImageViewerModal;

