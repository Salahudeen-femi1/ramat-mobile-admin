import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { assets } from '../../assets/assets';
// import { Link } from 'react-router-dom';
// import { useMutation } from '@tanstack/react-query'
// import { toast } from 'sonner';
// import axios from 'axios';

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // const { login } = useUser()
    // const navigate = useNavigate()

    // const mutation = useMutation<
    //     { token: string; user: UserProps },
    //     unknown,
    //     { email: string; password: string }
    // >({
    //     mutationFn: login,
    //     onSuccess: async (response) => {
    //         toast.success("Login successfully")
    //         console.log("login response", response)

    //         await login(
    //             response.token,
    //             response.user,
    //             response.user.role
    //         )

    //         if (response.user.role === "donor") {
    //             navigate("/dashboard");
    //         } else {
    //             navigate("/admin/dashboard");
    //         }
    //     },
    //     onError: (error) => {
    //         if (axios.isAxiosError(error)) {
    //             toast.error(
    //                 error.response?.data?.message || "Something went wrong"
    //             );

    //             console.log(error.response?.data);
    //         } else {
    //             toast.error("Something went wrong");
    //         }
    //     }

    // })

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values)
        },
    });

    const styles = {
        input: `text-black border-outlineBlack bg-fadedPrimary border border-gray-300 ${formik.touched.email && formik.errors.email
            ? 'border-red-500'
            : 'border-[#FBFCFB3]'
            } placeholder-black rounded-md px-4 h-[50px] border text-sm w-full outline-0`,
    };


    // if(user?.status === "PENDING" || user?.isEmailVerified === false){
    //     return (
    //         navigate("/EmailVerification")
    //     )
    // }

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

                        {/* Password */}
                        <div className="relative flex flex-col space-y-1">
                            <label htmlFor="password" className="font-medium">Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="Enter password"
                                value={formik.values.password}
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
                            {formik.touched.password && formik.errors.password && (
                                <span className="text-red-500 pl-3 text-sm">{formik.errors.password}</span>
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
                                disabled={formik.isSubmitting}
                                className="bg-primary text-white font-medium rounded-md h-[45px] cursor-pointer disabled:opacity-70 transition"
                            >
                                {formik.isSubmitting ? 'Logging in...' : 'Login'}
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
