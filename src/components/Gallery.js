import React, {useCallback, useEffect, useState} from 'react';
import {Box, Image, Button, Heading, useDisclosure, WrapItem, Wrap, Flex, useToast} from "@chakra-ui/react";
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
    const toast = useToast()

    const fetchImages = useCallback(async () => {
        try {
            const fetchedImages = await getImages(category);
            setImages(fetchedImages);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Počas sťahovania fotiek nastala chyba',
                status: 'error',
                isClosable: true,
            });
        }
    }, [category]);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);
    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
        onOpen();
    };

    return (
        <Flex direction="column" align="center" justify="center" minH="100vh" bg="gray.100">
            <Box padding="4"  maxW="94vw" w="100%" >
                <Heading fontSize="36px" fontWeight="medium" marginBottom="40px">
                    Fotogaléria
                </Heading>
                <Button fontSize="18px" fontWeight="medium" marginBottom="40px"
                        onClick={() => navigate('/', {replace: true})}>
                    ← {category}
                </Button>
                    <Wrap minChildWidth='120px' spacing="32px" justify="flex-start" align="stretch" >
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
