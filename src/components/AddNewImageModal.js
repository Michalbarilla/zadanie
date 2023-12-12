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
    WrapItem
} from '@chakra-ui/react';
import { FaFileUpload } from 'react-icons/fa';
import {useParams} from "react-router-dom";
import { CloseIcon } from '@chakra-ui/icons';

function PhotoUploadModal() {
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

    const handleSubmit = () => {
        if (files.length > 0) {
            console.log(files);

            for (const file of files) {
                const formData = new FormData();
                formData.append('image', file);
                uploadImageRequest(formData);
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
    }

    const uploadImageRequest = (formData) =>{
        try {
            fetch('http://api.programator.sk/gallery/'+ category, {
                method: 'POST',
                headers: {},
                body: formData,
            }).then(()=>
                toast({
                    title: 'Success',
                    description: 'File uploaded successfully!',
                    status: 'success',
                    isClosable: true,
                }))
        } catch (error) {
            console.error('Error uploading file:', error);
            toast({
                title: 'Error',
                description: 'There was an error uploading the file.',
                status: 'error',
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Button onClick={onOpen} fontWeight="regular" fontSize="16" >Pridať fotky</Button>
            <Modal isOpen={isOpen} onClose={handleClose}>
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
                                    <FaFileUpload size="24px" />
                                    <Text>Sem presunte fotky alebo kliknite pre vybranie súborov</Text>
                                </VStack>
                                <Input
                                    type="file"
                                    hidden
                                    multiple
                                    onChange={handleFilesChange}
                                    ref={inputRef}
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