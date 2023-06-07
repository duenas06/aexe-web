import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    ModalFooter,
} from '@chakra-ui/react';

export default function ReusableModal({ header, component, onClose, isOpen, footer }) {
    return (
        <>

            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent maxW='40%' bg="#97392F" color="white">
                    <ModalHeader fontWeight={"bold"} fontSize={'3xl'}>{header}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={5}>{component}</ModalBody>
                    <ModalFooter>
                        {footer}
                    </ModalFooter>
                </ModalContent>

            </Modal>
        </>
    );
}