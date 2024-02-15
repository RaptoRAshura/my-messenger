'use client';

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ClipLoader } from "react-spinners"

interface LoadingModalProps {
}

const LoadingModal: React.FC<LoadingModalProps> = ({
}) => {

    return (
       <Transition.Root show as={Fragment}>
            <Dialog
                as={"div"}
                className={"relative z-50"}
                onClose={() =>{}}
            >
                <Transition.Child
                   as={Fragment}
                   enter="east-out duration-300"
                   enterFrom="opacity-0"
                   enterTo="opacity-100"
                   leave="ease-in duration-300"
                   leaveFrom="opacity-100"
                   leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-opacity-50 bg-gray-100 transition-opacity"/>
                </Transition.Child>
                <div className="fixed overflow-y-auto inset-0 z-10">
                    <div className="flex min-h-full items-center justify-center text-center p-4">
                        <Dialog.Panel>
                            <ClipLoader size={40} color={"#00E4FF"} />
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
       </Transition.Root>
    )
}

export default LoadingModal;