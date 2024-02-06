

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs"
import axios from "axios";

type AuthFormVariant = "LOGIN" | "REGISTER"; 

const AuthForm = () => {

    const [ formVariant, setFormVariant ] = useState<AuthFormVariant>("LOGIN");
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const toggleFormVariant = useCallback(() => {
        setFormVariant(formVariant === "LOGIN" ? "REGISTER" : "LOGIN");
    }, [formVariant]);

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onFormSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (formVariant === "REGISTER") {
            axios.post('/api/register', data);
        } 
        if (formVariant === "LOGIN") {
            // NextAuth Signin
        }
    }

    const socialSignIn = (action: string) => {
        setIsLoading(true);

        //Next Auth Socail Sign in

    }

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-lg py-4 px-2 flex flex-col gap-4">
            <form 
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(onFormSubmit)}
            >
                { formVariant === "REGISTER" && (
                        <Input 
                        id={"name"}
                        placeholder="Your name"
                        errors={errors} 
                        register={register}
                        disabled={isLoading}
                    />
                )}
                <Input 
                    id={"email"}
                    type="email"
                    placeholder={"Email address"}
                    errors={errors} 
                    register={register}
                    disabled={isLoading}
                />

                <Input 
                    id={"password"}
                    placeholder={"Password"} 
                    type="password"
                    errors={errors} 
                    register={register}
                    disabled={isLoading}
                />
                <div className="mt-4">
                    <Button
                        disabled={isLoading}
                        type={"submit"}
                    >
                        {formVariant === "LOGIN" ? "Log In" : "Sign Up"}
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute flex inset-0 items-center">
                    <div className="border-t-[0.5px] border-gray-300 w-full" />
                </div>
                <div className="relative flex justify-center" >
                    <span className="text-gray-500 bg-stone-50 px-2 text-sm">Or continue with</span>
                </div>
            </div>
            <div className="flex gap-3 justify-center">
                <AuthSocialButton text={"Github"} disabled={isLoading} icon={BsGithub} onClick={() => socialSignIn("github")}/>
                <AuthSocialButton text={"Google"} disabled={isLoading} icon={BsGoogle} onClick={() => socialSignIn("google")}/>
            </div>
            <div className="flex sm:justify-center items-center py-4 gap-4">
                <span className="text-gray-500 font-normal text-sm">
                    {formVariant === "LOGIN" ? "New to Messenger?" : "Already have an account?"}
                </span>
                <button
                    className={`hover:underline hover:text-blue-500 text-sm text-gray-600  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={toggleFormVariant}
                    disabled={isLoading}
                >
                    { formVariant === "LOGIN" ? "Create Account" : "Log In" }
                </button>
            </div>
        </div>
    );
}

export default AuthForm;