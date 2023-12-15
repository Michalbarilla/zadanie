import React, {useEffect, useState} from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Image,
    IconButton,
    Flex, Box, Spinner,
} from '@chakra-ui/react';
import {ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {getImageUrl} from "../services/Requests";

function ImageViewerModal({ isOpen, onClose, images, initialIndex }) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
            setCurrentIndex(initialIndex);
    }, [initialIndex]);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const handleImageError = () => {
        setIsLoading(false);
    };

    const handlePrevious = () => {
        setIsLoading(true);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        setCurrentIndex(prevIndex);
    };

    const handleNext = () => {
        setIsLoading(true);
        const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        setCurrentIndex(nextIndex);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
            <ModalOverlay />
            <ModalContent maxWidth="none" backgroundColor="transparent" boxShadow="none">
                <Flex align="center" justify="center" height="100vh" position="relative">
                    <Box
                        position="absolute"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        bg="rgba(0, 0, 0, 0.5)"
                        zIndex="0"
                    /><Box position="relative" width="max-content">
                    <IconButton
                        aria-label="Previous image"
                        icon={<ChevronLeftIcon />}
                        position="absolute"
                        left="-5"
                        margin="auto"
                        width="40px"
                        height="40px"
                        top="0"
                        bottom="0"
                        zIndex="1"
                        borderRadius="full"
                        bg="white"
                        onClick={handlePrevious}
                        style={{ display: isLoading ? 'none' : 'block' }}
                    />
                    {isLoading && (
                        <Flex justify="center" align="center" position="absolute" top="0" right="0" bottom="0" left="0" zIndex="1">
                            <Spinner size="xl" color="white" />
                        </Flex>
                    )}
                    <Image
                        src={getImageUrl(images[currentIndex],0,0)}
                        maxWidth="80vw"
                        maxHeight="80vh"
                        margin="auto"
                        zIndex="1"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        style={{ display: isLoading ? 'none' : 'block' }}
                    />
                    <IconButton
                        aria-label="Next image"
                        icon={<ChevronRightIcon />}
                        position="absolute"
                        right="-5"
                        margin="auto"
                        top="0"
                        bottom="0"
                        zIndex="1"
                        borderRadius="full"
                        bg="white"
                        width="40px"
                        height="40px"
                        onClick={handleNext}
                        style={{ display: isLoading ? 'none' : 'block' }}
                    />
                    <ModalCloseButton
                        position="absolute"
                        right="-3"
                        top="-3"
                        color="black"
                        zIndex="2"
                        borderRadius="full"
                        width="40px"
                        height="40px"
                        bg="white"
                        style={{ display: isLoading ? 'none' : 'block' }}
                    />
                </Box>
                </Flex>
            </ModalContent>
        </Modal>
    );
}
export default ImageViewerModal;

