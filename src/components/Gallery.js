import React, { useEffect, useState } from 'react';
import {Box, Image, Button, Heading, useDisclosure, WrapItem, Wrap, Flex} from "@chakra-ui/react";
import { useNavigate, useParams } from 'react-router-dom';
import PhotoUploadModal from "./AddNewImageModal";

function Gallery() {
    const { isOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const { category } = useParams();
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch(`http://api.programator.sk/gallery/${category}`)
            .then((response) => response.json())
            .then((data) => setImages(data.images));
    }, [category]);

    const getImageUrl = (image) => {
        const width = 304;
        const height = 295;
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
                        <WrapItem key={image.path} boxShadow="md" rounded="lg" overflow="hidden">
                            <Image src={getImageUrl(image)} alt={`Obrázok ${image.path}`} objectFit="cover" />
                        </WrapItem>
                    ))}
                    <WrapItem boxShadow="md" rounded="lg" overflow="hidden" width="304px" height="295">
                        <PhotoUploadModal isOpen={isOpen} onClose={onClose} />
                    </WrapItem>
                </Wrap>
            </Box>
        </Flex>
    );
}

export default Gallery;
