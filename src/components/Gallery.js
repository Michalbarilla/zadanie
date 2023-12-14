import React, {useCallback, useEffect, useState} from 'react';
import {Box, Image, Button, Heading, useDisclosure, WrapItem, Wrap, Flex} from "@chakra-ui/react";
import { useNavigate, useParams } from 'react-router-dom';
import PhotoUploadModal from "./AddNewImageModal";
import ImageViewerModal from "./ImageViewModal";
import DeleteModal from "./DeleteModal";
import {getImages, getImageUrl} from "../services/Requests";

export function Gallery() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const navigate = useNavigate();
    const {category} = useParams();
    const [images, setImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const fetchImages = useCallback(async () => {
        try {
            const fetchedImages = await getImages(category);
            setImages(fetchedImages);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    }, [category]); // `category` is a dependency for useCallback

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);
    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
        onOpen();
    };

    return (
        <Flex direction="column" align="center" justify="center" minH="100vh" bg="gray.100">
            <Box padding="4" width="full" maxW="1700px">
                <Heading fontSize="36px" fontWeight="medium" marginBottom="40px">
                    Fotogaléria
                </Heading>
                <Button fontSize="18px" fontWeight="medium" marginBottom="40px"
                        onClick={() => navigate('/', {replace: true})}>
                    ← {category}
                </Button>
                <Wrap minChildWidth='120px' spacing="32px">
                    {images && images.map((image, index) => (
                        <WrapItem key={image.path} boxShadow="md" rounded="lg" overflow="hidden" position="relative">
                            <Image
                                src={getImageUrl(image,304,295)}
                                alt={`Obrázok ${image.path}`}
                                objectFit="cover"
                                onClick={() => handleImageClick(index)}
                            />
                            <DeleteModal objectUrl={image.fullpath} callback={()=>fetchImages()}/>
                        </WrapItem>
                    ))}
                    <WrapItem boxShadow="md" rounded="lg" overflow="hidden" width="304px" height="295">
                        <PhotoUploadModal callback={()=>fetchImages()}/>
                    </WrapItem>
                </Wrap>
                {selectedImageIndex !== null && (
                    <ImageViewerModal
                        isOpen={isOpen}
                        onClose={() => {
                            onClose();
                            setSelectedImageIndex(null);
                        }}
                        images={images}
                        initialIndex={selectedImageIndex}
                    />
                )}
            </Box>
        </Flex>
    );
}
