import {Box, Heading, Image, Wrap, WrapItem, Flex, Text, Badge} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import AddCategoryModal from "./AddCategoryModal";
import DeleteModal from "./DeleteModal";
import {fetchGalleries, fetchImageCount, getImageUrl} from "../services/Requests";

function Categories(){
    const [categories, setCategories] = useState([]);
    const [imageCounts, setImageCounts] = useState({});

    const fetchCategories = async () => {
        try {
            const data = await fetchGalleries();
            setCategories(data.galleries);
            for (const category of data.galleries) {
                try {
                    const imageData = await fetchImageCount(category.path);
                    setImageCounts(prev => ({
                        ...prev,
                        [category.name]: imageData.images.length,
                    }));
                } catch (error) {
                    setCategories(prevCategories => prevCategories.filter(cat => cat.path !== category.path));
                }
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    function getPhotoLabel(count) {
        if (count === 1) {
            return 'fotka';
        } else if (count > 1 && count < 5) {
            return 'fotky';
        } else {
            return 'fotiek';
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Flex direction="column" align="center" justify="center" minH="100vh" bg="gray.100">
            <Box padding="4" width="full" maxW="1700px">
                <Heading fontSize="36px" fontWeight="medium" marginBottom="40px"  >
                    Fotogaléria
                </Heading>
                <Text fontSize="18px" fontWeight="medium" marginBottom="40px">Kategórie</Text>
                <Wrap minChildWidth='304px' spacing="30px">
                    {categories && categories.map((category) => (
                            <WrapItem width="304px" height="295px" boxShadow="md"  overflow="hidden" bg="white">
                                <Box width="100%" height="100%" display="flex" flexDirection="column" position="relative">
                                    <Link to={`/gallery/${category.name}`} key={category.path}>
                                        <Image src={getImageUrl(category.image)} alt={category.name} height="228px" objectFit="cover"/>
                                        <Box p="6" flexGrow="1">
                                            <Heading fontWeight="regular" fontSize="16" size="md" marginBottom="2" align="center">
                                                {decodeURIComponent(category.name)}
                                            </Heading>
                                        </Box>
                                    </Link>
                                    <Badge
                                        position="absolute"
                                        top="4"
                                        left="4"
                                        px="2"
                                        py="1"
                                        borderRadius="full"
                                        bg="rgba(0, 0, 0,0.2)"
                                        color="white"
                                        fontSize="12px"
                                        fontWeight="medium"
                                        textTransform="lowercase"
                                    >
                                        {imageCounts[category.name]} {getPhotoLabel(imageCounts[category.name])}
                                    </Badge>
                                    <DeleteModal objectUrl={category.path} callback={()=>fetchCategories()}/>
                                </Box>
                            </WrapItem>
                    ))}
                    <WrapItem width="304px" height="295px" boxShadow="md"  overflow="hidden" >
                        <AddCategoryModal callback={()=>fetchCategories()}/>
                    </WrapItem>
                </Wrap>
            </Box>
        </Flex>
    );
}

export default Categories;