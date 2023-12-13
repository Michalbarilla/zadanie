import {Box, Heading, Image, useDisclosure, Wrap, WrapItem, Flex, Text, Badge} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import AddCategoryModal from "./AddCategoryModal";
import DeleteModal from "./DeleteModal";

function Categories(){
    const [categories, setCategories] = useState([]);
    const [imageCounts, setImageCounts] = useState({});
    const { isOpen, onClose } = useDisclosure();


    const fetchCategories = () => {
        fetch('http://api.programator.sk/gallery')
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.galleries);
                data.galleries.forEach((category) => {
                    fetch(`http://api.programator.sk/gallery/${(category.path)}`)
                        .then((response) => {
                            if (response.status === 404){
                                throw new Error();
                            }
                            return response.json();
                        })
                        .then((imageData) => {
                            setImageCounts((prev) => ({
                                ...prev,
                                [category.name]: imageData.images.length,
                            }));
                        })
                        .catch(() => {
                            setCategories(prevCategories => prevCategories.filter(cat => cat.path !== category.path));
                        });
                });
            })
    };

    useEffect(() => {
        fetchCategories();
    }, [isOpen, onClose]);
    const getImageUrl = (image) => {
        try{
        const width = 304;
        const height = 228;
        return `http://api.programator.sk/images/${width}x${height}/${image.fullpath}`;
        }
        catch{
                return 'no-image-found.png';
        }
    };

    return (
        <Flex direction="column" align="center" justify="center" minH="100vh" bg="gray.100">
            <Box padding="4" width="full" maxW="2000px">
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
                                        {imageCounts[category.name]} fotiek
                                    </Badge>
                                    <DeleteModal objectUrl={category.path}/>
                                </Box>
                            </WrapItem>
                    ))}
                    <WrapItem width="304px" height="295px" boxShadow="md"  overflow="hidden" >
                        <AddCategoryModal isOpen={isOpen} onClose={onClose} />
                    </WrapItem>
                </Wrap>
            </Box>
        </Flex>
    );
}

export default Categories;