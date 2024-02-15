'use client';

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from '@/app/components/Modal';
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import Select from "@/app/components/inputs/Select";

interface GroupChatModalProps {
    isOpen?: boolean;
    onClose: () => void;
    users: User[]
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
    isOpen,
    onClose,
    users
}) => {

    const router = useRouter();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const { handleSubmit, formState: { errors }, register, watch, setValue,  } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: []
        }
    })

    const members = watch('members');

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/conversations', {
            ...data, 
            isGroup: true 
        })
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
                            Create group
                        </h2>
                        <p className="mt-1 leading-6 text-sm text-gray-600">
                            Create a chat with more than 2 people.
                        </p>
                        <div className="mt-4 flex flex-col gap-y-4">
                            <Input 
                                disabled={isLoading}
                                id={"name"}
                                register={register}
                                required
                                errors={errors}
                                label={"Group name"}
                            />
                           <Select
                                disabled={isLoading}
                                label={"Members"}
                                options={users.map((user) => ({
                                    value: user.id,
                                    label: user.name
                                }))}
                                onChange={(value) => setValue('members', value, {
                                    shouldValidate: true
                                })}
                                value={members}
                           />
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

export default GroupChatModal;