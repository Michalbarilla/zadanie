import React, { useRef, useState} from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    VStack,
    Text,
    Center,
    useToast,
    useDisclosure,
    Image,
    Wrap,
    WrapItem, Box
} from '@chakra-ui/react';
import { CiImageOn } from "react-icons/ci";
import {useParams} from "react-router-dom";
import {CloseIcon, PlusSquareIcon} from '@chakra-ui/icons';
import {uploadImage} from "../services/Requests";

function PhotoUploadModal({callback}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [files, setFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef();
    const toast = useToast()
    const { category } = useParams();
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles([...files, ...droppedFiles]);

        const newFilePreviews = droppedFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(prevPreviews => [...prevPreviews, ...newFilePreviews]);
    };

    const handleFilesChange = (event) => {
        event.preventDefault();
        const fileList = [...event.target.files];
        setFiles([...files, ...fileList]);

        const newFilePreviews = fileList.map(file => URL.createObjectURL(file));
        setPreviewUrls(prevPreviews => [...prevPreviews, ...newFilePreviews]);
    };

    const openFileSelector = () => {
        inputRef.current.click();
    };

    const handleClose = () => {
        setPreviewUrls([]);
        setFiles([]);
        onClose();
    }

    const handleDeleteImage = (index) => {
        const newFiles = [...files.slice(0, index), ...files.slice(index + 1)];
        const newPreviewUrls = [...previewUrls.slice(0, index), ...previewUrls.slice(index + 1)];

        setFiles(newFiles);
        setPreviewUrls(newPreviewUrls);

        URL.revokeObjectURL(previewUrls[index]);
    };

    const handleSubmit = async () => {
        if (files.length > 0) {
            for (const file of files) {
                const formData = new FormData();
                formData.append('image', file);
                try {
                    await uploadImage(category, formData);
                    toast({
                        title: 'Success',
                        description: 'Fotky úspešne nahrané',
                        status: 'success',
                        isClosable: true,
                    });
                    callback();
                } catch (error) {
                    toast({
                        title: 'Error',
                        description: 'Počas nahrávania nastala chyba',
                        status: 'error',
                        isClosable: true,
                    });
                }
            }

            setFiles([]);
            setPreviewUrls([]);
            onClose();
        } else {
            toast({
                title: 'Error',
                description: 'No files selected to upload.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };


    return (
        <>
            <Button onClick={onOpen} fontWeight="regular" fontSize="16" width="100%" height="100%" bg="white"><Box>
                <PlusSquareIcon margin="16px" boxSize="24px" color="gray"/>
                <Text> Pridať fotky</Text>
            </Box></Button>
            <Modal isOpen={isOpen} onClose={handleClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Pridať fotky</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Center
                                p={10}
                                border="2px dashed"
                                borderColor={isDragging ? "blue.300" : "gray.300"} // UI feedback for dragging
                                borderRadius="md"
                                cursor="pointer"
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragOver}
                                onDrop={handleDrop}
                                onClick={openFileSelector}
                            >
                                <VStack spacing={2}>
                                    <CiImageOn  size="24px" />
                                    <Text>Sem presuňte fotky alebo kliknite pre vybranie súborov</Text>
                                </VStack>
                                <Input
                                    type="file"
                                    hidden
                                    multiple
                                    onChange={handleFilesChange}
                                    ref={inputRef}
                                    accept="image/*"
                                />
                            </Center>
                            <Wrap spacing="10px" justify="center">
                                {previewUrls.map((url, index) => (
                                    <WrapItem key={index} position="relative" boxSize="90px" >
                                        <Image
                                            src={url}
                                            alt={`Preview ${index}`}
                                            objectFit="cover"
                                            boxSize="90px"
                                            borderRadius="md"
                                        />
                                        <Button
                                            position="absolute"
                                            top="1"
                                            right="1"
                                            size="xs"
                                            onClick={() => handleDeleteImage(index)}
                                            color="red"
                                        >
                                            <CloseIcon />
                                        </Button>
                                    </WrapItem>
                                ))}
                            </Wrap>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button bg="black" textColor="white" width="100%" fontSize="16px" fontWeight="medium" onClick={handleSubmit}>
                            Pridať
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default PhotoUploadModal;