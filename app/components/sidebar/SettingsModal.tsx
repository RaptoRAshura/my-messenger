'use client';

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";
import Button from "../Button";

interface SettingsModalProps {
    isOpen?: boolean;
    onClose: () => void;
    currentUser: User;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    currentUser
}) => {

    const router = useRouter();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const { handleSubmit, formState: { errors }, register, watch, setValue,  } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image
        }
    })

    const image = watch('image');

    const handleUpload = (result: any) => {
        setValue('image', result?.info?.secure_url, {
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/settings', data)
        .then(() => {
            router.refresh();
            onClose();
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }

    return (
        <Modal
            isOpen={Boolean(isOpen)}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-8">
                    <div>
                        <h2 className="text-base text-gray-900 leading-7 font-semibold">
                            Profile
                        </h2>
                        <p className="mt-1 leading-6 text-sm text-gray-600">
                            Edit you public information
                        </p>
                        <div className="mt-4 flex flex-col gap-y-4">
                            <Input 
                                disabled={isLoading}
                                id={"name"}
                                register={register}
                                required
                                errors={errors}
                                label={"Name"}
                            />
                            <div>
                                <label className="block text-xs font-medium leading-6 
                                text-gray-600">
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <Image 
                                        width={48}
                                        alt={"profile"}
                                        height={48}
                                        className="rounded-full"
                                        src={image || currentUser?.image || '/images/profile_male.jpg'}
                                    />
                                    <CldUploadButton 
                                        options={{maxFiles: 1}}
                                        onUpload={handleUpload}
                                        uploadPreset="lyl1bsns"
                                    >
                                        <Button  disabled={isLoading} secondary type="button">Change</Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-6 justify-end">
                        <Button disabled={isLoading} type="button" secondary onClick={onClose} >Cancel</Button>
                        <Button disabled={isLoading} type="submit" >Save</Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default SettingsModal;