import logo from '../logo.svg';
import {Box, Heading, Image, useDisclosure, Wrap, WrapItem, Flex, Text} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import AddCategoryModal from "./AddCategoryModal";

function Categories(){
    const [categories, setCategories] = useState([]);
    const { isOpen, onClose } = useDisclosure();

    useEffect(() => {
        fetch('http://api.programator.sk/gallery')
            .then((response) => response.json())
            .then((data) => setCategories(data.galleries));
    },[]);
    const getImageUrl = (image) => {
        try{
        const width = 304;
        const height = 228;
    return `http://api.programator.sk/images/${width}x${height}/${image.fullpath}`;
    }
    catch{
            return logo;
    }
    };
    return (
        <Flex direction="column" align="center" justify="center" h="100vh" bg="gray.100">
            <Box padding="4" width="full" maxW="2000px">
                <Heading fontSize="36px" fontWeight="medium" marginBottom="40px"  >
                    Fotogaléria
                </Heading>
                <Text fontSize="18px" fontWeight="medium" marginBottom="40px">Kategórie</Text>
                <Wrap minChildWidth='304px' spacing="30px">
                    {categories && categories.map((category) => (
                        <Link to={`/gallery/${category.name}`} key={category.path}>
                            <WrapItem width="304px" height="295px" boxShadow="md" rounded="lg" overflow="hidden" bg="white">
                                <Box width="100%" height="100%" display="flex" flexDirection="column">
                                    <Image src={getImageUrl(category.image)} alt={category.name} height="228px" objectFit="cover"/>
                                    <Box p="6" flexGrow="1">
                                        <Heading fontWeight="regular" fontSize="16" size="md" marginBottom="2" align="center">
                                            {decodeURIComponent(category.name)}
                                        </Heading>
                                        <Box as="span" color="gray.600" fontSize="sm">
                                            {category.count}
                                        </Box>
                                    </Box>
                                </Box>
                            </WrapItem>
                        </Link>
                    ))}
                    <WrapItem width="304px" height="295px" boxShadow="md" rounded="lg" overflow="hidden" bg="white">
                        <AddCategoryModal isOpen={isOpen} onClose={onClose} />
                    </WrapItem>
                </Wrap>
            </Box>
        </Flex>
    );
}

export default Categories;