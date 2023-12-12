import logo from '../logo.svg';
import {Box, Heading, SimpleGrid, Image, Button, useDisclosure, Flex} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import AddCategoryModal from "./AddCategoryModal";

function Categories(){
    const [categories, setCategories] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        fetch('http://api.programator.sk/gallery')
            .then((response) => response.json())
            .then((data) => setCategories(data.galleries));
    },[]);
    const getImageUrl = (image) => {
        try{
        const width = 200;
        const height = 200;
    return `http://api.programator.sk/images/${width}x${height}/${image.fullpath}`;
    }
    catch{
            return logo;
    }
    };
    return (
        <Flex padding="4" bg="gray.100" margin="auto">
            <Heading as="h1" size="xxl" margin="6">
                Fotogaléria
            </Heading>
            <SimpleGrid  minChildWidth='120px' spacing="100px">
                {categories && categories.map((category) => (
                    <Link to={`/gallery/${category.name}`} key={category.path}>
                    <Box key={category.path} width="200px" boxShadow="md" rounded="lg" overflow="hidden">
                        <Image src={getImageUrl(category.image)} alt={category.name} />
                        <Box p="6" bg="white">
                            <Heading as="h3" size="md" marginBottom="2">
                                {decodeURIComponent(category.name)}
                            </Heading>
                            <Box as="span" color="gray.600" fontSize="sm">
                                {category.count}
                            </Box>
                        </Box>
                    </Box>
                    </Link>
                ))}
                <Box boxShadow="md" rounded="lg" overflow="hidden" display="flex" justifyContent="center" alignItems="center" onClick={AddCategoryModal}>
                    <Button onClick={onOpen}>Pridať kategóriu</Button>
                    <AddCategoryModal isOpen={isOpen} onClose={onClose} />
                </Box>
            </SimpleGrid>
        </Flex>
    );
}

export default Categories;