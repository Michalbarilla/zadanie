import React, { useEffect, useState } from 'react';
import {Box, Image, Button, Heading, useDisclosure, WrapItem, Wrap, Flex} from "@chakra-ui/react";
import { useNavigate, useParams } from 'react-router-dom';
import PhotoUploadModal from "./AddNewImageModal";
import ImageViewerModal from "./ImageViewModal";
import DeleteModal from "./DeleteModal";

function Gallery() {
    const { isOpen,onOpen, onClose } = useDisclosure();

    const navigate = useNavigate();
    const { category } = useParams();
    const [images, setImages] = useState([]);

    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageClick = (image) => {
        setSelectedImage(image);
        onOpen();
    };

    useEffect(() => {
        fetch(`http://api.programator.sk/gallery/${category}`)
            .then((response) => response.json())
            .then((data) => setImages(data.images));
    }, [category]);

    const getImageUrl = (image, width = 304, height = 295) => {
        return `http://api.programator.sk/images/${width}x${height}/${image.fullpath}`;
    };

    return (
        <Flex direction="column" align="center" justify="center" h="100vh" bg="gray.100">
            <Box padding="4"  width="full" maxW="2000px">
                <Heading fontSize="36px" fontWeight="medium" marginBottom="40px"  >
                    Fotogaléria
                </Heading>
                <Button fontSize="18px" fontWeight="medium" marginBottom="40px" onClick={() => navigate('/', { replace: true })}>
                    ← {category}
                </Button>
                <Wrap minChildWidth='120px' spacing="32px">
                    {images && images.map((image) => (
                        <WrapItem key={image.path} boxShadow="md" rounded="lg" overflow="hidden" position="relative">
                            <Image
                                src={getImageUrl(image)}
                                alt={`Obrázok ${image.path}`}
                                objectFit="cover"
                                onClick={() => handleImageClick(image,1200,0)}
                            />
                            <DeleteModal objectUrl={image.fullpath}/>
                        </WrapItem>
                    ))}
                    <WrapItem boxShadow="md" rounded="lg" overflow="hidden" width="304px" height="295">
                        <PhotoUploadModal isOpen={isOpen} onClose={onClose} />
                    </WrapItem>
                </Wrap>
                {selectedImage && (
                    <ImageViewerModal
                        isOpen={isOpen}
                        onClose={() => {
                            onClose();
                            setSelectedImage(null); // Clear the selected image when closing the modal
                        }}
                        imageUrl={getImageUrl(selectedImage)}
                    />
                )}
            </Box>
        </Flex>
    );
}

export default Gallery;
