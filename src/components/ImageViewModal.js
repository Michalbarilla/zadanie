import React, {useEffect, useState} from 'react';
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
import {getImageUrl} from "./Gallery";

function ImageViewerModal({ isOpen, onClose, images, initialIndex }) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
            debugger;
            setCurrentIndex(initialIndex);
    }, [initialIndex, isOpen]);

    const handlePrevious = () => {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        setCurrentIndex(prevIndex);
    };

    const handleNext = () => {
        const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        setCurrentIndex(nextIndex);
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
                    <Image src={getImageUrl(images[currentIndex])} maxWidth="80vw" maxHeight="80vh" margin="auto" />
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

