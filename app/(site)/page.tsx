'use client';

import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className={`flex flex-col justify-center h-full w-full items-center py-6 gap-4 sm:gap-6 
      px-6 bg-stone-50`}>
      {/* Body */}
      <div id="contianer" className="py-6 min-h-full max-w-md md:max-w-lg lg:max-w-xl 
        w-full flex flex-col justify-between sm:justify-center gap-4 sm:gap-6">
        <div className="gap-4 flex 
          flex-col justify-center sm:items-center">
          <Image 
            alt="my-messenger" 
            height="512" 
            width="512" 
            className="mx-auto w-auto h-12 md:h-16" 
            src={"/images/logo.png"} 
          />
          <h2 className="px-2 text-start md:text-center text-transparent bg-clip-text 
            bg-gradient-to-r from-blue-500 via-pink-500 to-rose-500 font-semibold 
            text-5xl lg:text-6xl lg:leading-tight md:leading-tight sm:leading-tight 
            leading-tight tracking-tight">
            Hang out <br/> anytime, anywhere
          </h2>
          <h4 className="text-gray-600 text-start md:text-center text-md lg:text-lg 
            font-medium px-2">
            Messenger makes it easy and fun to stay close to your favorite people.
          </h4>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
