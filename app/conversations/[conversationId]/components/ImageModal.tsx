'use client';

import Modal from "@/app/components/Modal";
import useConversation from "@/app/hooks/useConvesation";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface ImageModalProps {
    src: string | null
    isOpen?: boolean
    onClose: () => void
}

const ImageModal: React.FC<ImageModalProps> = ({
    isOpen,
    onClose,
    src
}) => {

    if (!src) return null;

    return (
        <Modal
            isOpen={Boolean(isOpen)}
            onClose={onClose}
        >
            <div className="w-80 h-80">
                <Image
                    className="object-cover"
                    fill
                    alt={"image"}
                    src={src} 
                />
            </div>
        </Modal>
    )
}

export default ImageModal;