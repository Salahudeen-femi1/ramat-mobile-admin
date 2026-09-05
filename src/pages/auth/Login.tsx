import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { assets } from '../../assets/assets';
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../../service/apiService';
import { useUser } from '../../context/UserContext';
import type { AdminLoginProps, AdminLoginResponse } from '../../helper/types';

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const navigate = useNavigate()
    const { login } = useUser()

    const mutation = useMutation<AdminLoginResponse, Error,
        AdminLoginProps>({
            mutationFn: loginService,
            onSuccess: (data) => {
                toast.success(data.message)

                login(data.token, data.user);

                navigate('/dashboard/overview')

            },
            onError: (error: Error) => {
                const message = error.message || "Something went wrong. Please try again.";

                toast.error(message);
            }

        })

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        pin: Yup.string()
            .min(4, 'PIN must be at least 4 characters')
            .required('PIN is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            pin: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            mutation.mutate(values)
        },
    });

    const styles = {
        input: `text-black border-outlineBlack bg-fadedPrimary border border-gray-300 ${formik.touched.email && formik.errors.email
            ? 'border-red-500'
            : 'border-[#FBFCFB3]'
            } placeholder-black rounded-md px-4 h-[50px] border text-sm w-full outline-0`,
    };

    return (
        <div className="flex items-center">
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white flex flex-col items-center justify-center h-screen px-4">
                <div className="w-full flex flex-col items-center justify-center">

                    <div className="flex flex-col gap-2 items-center mb-8 font-medium">

                        <h3>Welcome Back!</h3>
                        <p>Login with your details</p>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-5 w-full max-w-md">

                        {/* Email */}
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="email" className="font-medium">Email address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter email address"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={styles.input}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <span className="text-red-500 pl-3 text-sm">{formik.errors.email}</span>
                            )}
                        </div>

                        {/* PIN */}
                        <div className="relative flex flex-col space-y-1">
                            <label htmlFor="pin" className="font-medium">PIN</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="pin"
                                name="pin"
                                placeholder="Enter PIN"
                                value={formik.values.pin}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={styles.input}
                            />
                            <span
                                className="absolute right-4 top-11 cursor-pointer text-black"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                            </span>
                            {formik.touched.pin && formik.errors.pin && (
                                <span className="text-red-500 pl-3 text-sm">{formik.errors.pin}</span>
                            )}
                        </div>

                        {/* Forgot password */}
                        <span className="self-end text-primary">
                            <button type="button" className="font-medium text-sm cursor-pointer">
                                Forgot Password?
                            </button>
                        </span>

                        {/* Buttons */}
                        <div className="flex flex-col space-y-6 mt-4">

                            <button
                                type="submit"
                                disabled={mutation.isPending}
                                className="bg-primary text-white font-medium rounded-md h-[45px] cursor-pointer disabled:opacity-70 transition"
                            >
                                {mutation.isPending ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right side image */}
            <div className="w-1/2 h-screen md:flex flex-col gap-5 items-center justify-center bg-primary p-7">

                <img
                    src={assets.motor}
                    alt="ramat pickup logo"
                    className=" w-auto h-40vh object-cover"
                />
            </div>
        </div>
    );
};

export default Login;
