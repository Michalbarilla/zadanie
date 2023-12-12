import logo from '../logo.svg';
import React, {useEffect, useState} from 'react';
import {Box, SimpleGrid, Image, Button, IconButton, Heading} from "@chakra-ui/react";
import { useNavigate, useParams } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';

function Gallery(){
    const navigate = useNavigate();
    const { category } = useParams();

    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch('http://api.programator.sk/gallery/' + category)
            .then((response) => response.json())
            .then((data) => setImages(data.images));
    },[]);

    const getImageUrl = (image) => {
        try {
            const width = 200;
            const height = 200;
            return `http://api.programator.sk/images/${width}x${height}/${image.fullpath}`;
        } catch {
            return logo;
        }
    }

    return (
        <Box padding="4" bg="gray.100" margin="auto">
            <Heading as="h1" size="xxl" margin="6">
                {category}
            </Heading>
            <Button onClick={() => navigate('/',{replace: true})} marginY="4">
                ← Späť na kategórie
            </Button>
            <SimpleGrid  minChildWidth='120px' spacing="100px">
                {images && images.map((image) => (
                    <Box key={image.path} boxShadow="md" rounded="lg" overflow="hidden">
                        <Image src={getImageUrl(image)} alt={`Obrázok ${image.path}`} objectFit="cover" />
                    </Box>
                ))}
                <Box boxShadow="md" rounded="lg" overflow="hidden" display="flex" justifyContent="center" alignItems="center">
                    <IconButton
                        aria-label="Pridať fotky"
                        icon={<AddIcon />}
                        size="lg"
                        isRound
                    />
                </Box>
            </SimpleGrid>
        </Box>
    );
}

export default Gallery;