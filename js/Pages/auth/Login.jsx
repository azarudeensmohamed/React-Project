import React, { useState, useEffect } from 'react';
import './login.css';
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import logo from '../../../../public/assets/KG-Logos.png';
import apiClient from '../Components/apiClient';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { handleApiRequestPost } from "../Helper/HelperFunction";

const Login = () => {
    const navigate = useNavigate();

    const [AuthData, setAuthData] = useState({ email: '', password: '' });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const [forgotPass, setFogotPass] = useState(true);
    const [OtpSUbmit, setOtpSUbmit] = useState(true);
    const [otp, setotp] = useState({Votp:""});
    const [ChangePassword, setChangePassword] = useState(true);
    const [Verfyemail, setEmail] = useState({vemail:""});
    const [password, setPassword] = useState({email:"",password:"",confirmpassword:""});
    const [token, setToken] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleChangePass = (e) => {
        const { name, value } = e.target;
        setPassword((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const apiUrl = "http://127.0.0.1:8000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(AuthData);

        if (Object.keys(validationErrors).length === 0) {
            const url = "/login";

            handleApiRequestPost(
                apiClient,
                AuthData,
                url,
                (data) => {
                    const token = data.access_token;
                    localStorage.setItem("token", token);
                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 3000);
                },
                (error) => {
                    console.error("Login failed:", error);
                }
            );
        } else {
            setErrors(validationErrors);
        }
    };

    function handleSubmitForgot(event) {
        event.preventDefault();
        const validationErrors = validateFormEmail(Verfyemail);

        if (Object.keys(validationErrors).length === 0) {
            const Newurl = "/verify-email";

            handleApiRequestPost(
                apiClient,
                Verfyemail,
                Newurl,
                (data) => {
                    if (data.status === 'error') {
                        toast.warning(data.message || "Invalid Email Address");
                    } else {
                        toast.success(data.message || "Otp has been sent to your email.");
                        setPassword(prevState => ({
                            ...prevState,
                            email: data.mail
                        }));
                        setOtpSUbmit(false);
                    }
                },
                (error) => {
                    console.error("Something: wrong please try later", error);
                }
            );
        } else {
            setErrors(validationErrors);
        }
    }

    function handleOTP(event) {
        event.preventDefault();
        const validationOTPErrors = validotp(otp);

        if (Object.keys(validationOTPErrors).length === 0) {
            const Newurl = "/verify-otp";

            handleApiRequestPost(
                apiClient,
                otp,
                Newurl,
                (data) => {
                    if (data?.status === 'error') {
                        toast.warning(data?.message || "Invalid OTP");
                    } else if (data?.status === 'success') {
                        toast.success(data?.message || "OTP has been verified");
                        setChangePassword(false);
                    } else {
                        toast.error("Unexpected response status");
                    }
                },
                (error) => {
                    console.error("Login failed:", error?.response?.data || error);
                    toast.error(error?.response?.data?.message || "Something went wrong");
                }
            );
        } else {
            setErrors(validationOTPErrors);
        }
    }




    function handleGetnewpass(event) {
        event.preventDefault();

        const validationPassErrors = validPassword(password);
        if (Object.keys(validationPassErrors).length === 0) {
            const Newurl = "/change-password";

            handleApiRequestPost(
                apiClient,
                password,
                Newurl,
                (data) => {
                    if (data.message === "Fail") {
                        toast.warning(data.message || "Something went wrong.");
                    } else {
                        toast.success(data.message || "Password changed successfully.");
                        setOtpSUbmit(false);
                        navigate("/dashboard");
                    }
                },
                (error) => {
                    console.error("Login failed:", error);
                    toast.error("Failed to change password.");
                }
            );
        } else {
            setErrors(validationPassErrors);
        }
    }



    function handleforgotPass() {
        setFogotPass(!forgotPass);
    }

    const validateForm = (data) => {
        let errors = {};

        if (data.email.trim() === '') {
            errors.email = 'Email is required';
        } else if (!isValidEmail(data.email)) {
            errors.email = 'Invalid email format';
        }

        if (data.password.trim() === '') {
            errors.password = 'Password is required';
        }

        return errors;
    };

    const validPassword = (data) => {
        let errors = {};

        if (data.password.trim() === '') {
            errors.password = 'Invalid Password';
        }

        if (data.confirmpassword.trim() === '') {
            errors.confirmpassword = 'Invalid Confirm Password';
        }

        if (data.password.trim() !== data.confirmpassword.trim()) {
            errors.confirmpassword = 'Password mismatch';
        }

        return errors;
    };

    const validateFormEmail = (data) => {
        let errors = {};
        if (!isValidEmail(data.vemail)) {
            errors.Vemail = 'Invalid email format';
        }
        return errors;
    }
    const validotp = (data) => {
        let errors = {};
        if(data.Votp.trim() === ''){
            errors.Votp = 'Invalid OTP';
        }
        return errors;
    }

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };



    return (
        <>
            <div className="container-fluid bg-col">
                <div className="login-form">
                    <div className='d-flex justify-content-center mb-4'>
                        <img src={logo} alt="" />
                    </div>
                    {forgotPass == true ? (
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="email"
                                className='mb-2'
                                placeholder="email"
                                value={AuthData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                            <div className='position'>
                                <input type="password" name="password" placeholder="Password" value={AuthData.password} onChange={handleChange} />
                                <span className='eye-icon' onClick={togglePasswordVisibility}>
                                    {passwordVisible ? <FaEyeSlash /> : <IoMdEye />}
                                </span>
                                <div className={`password-show ${passwordVisible ? 'show' : ''}`}>{AuthData.password}</div>
                                {errors.password && <span className="error">{errors.password}</span>}
                            </div>
                            <button type="submit">Login</button>
                        </form>) :
                        (
                            <div>
                                {OtpSUbmit == true ? (
                                    <form onSubmit={handleSubmitForgot}>
                                        <input
                                            type="text"
                                            name="Vemail"
                                            className="mb-2"
                                            placeholder="Please Enter email"
                                            value={Verfyemail.vemail}
                                            onChange={(e) => setEmail({ ...Verfyemail, vemail: e.target.value })}
                                        />
                                        {errors.Vemail && <span className="error">{errors.Vemail}</span>}
                                        <button type="submit">Submit</button>
                                    </form> ) :
                                    (
                                        <div>
                                            {
                                                ChangePassword == true ? (
                                                    <form onSubmit={handleOTP}>
                                                <input
                                                    type="text"
                                                    name="otp"
                                                    className="mb-2"
                                                    placeholder="Enter OTP"
                                                    value={otp.Votp}
                                                    onChange={(e) => setotp({...otp,Votp:e.target.value})}
                                                />
                                                {errors.Votp && <span className="error">{errors.Votp}</span>}
                                                <button type="submit">Submit</button>
                                            </form>
                                                ) : (
                                                    <form onSubmit={handleGetnewpass}>
                                                        <input
                                                            type="text"
                                                            name="password"
                                                            className="mb-2"
                                                            placeholder="Please Enter Password"
                                                            value={password.password}
                                                            onChange={handleChangePass}
                                                        />
                                                        {errors.password && <span className="error">{errors.password}</span>}
                                                        <input
                                                            type="text"
                                                            name="confirmpassword"
                                                            className="mb-2"
                                                            placeholder="Please Confirm Password"
                                                            value={password.confirmpassword}
                                                            onChange={handleChangePass}
                                                        />
                                                        {errors.confirmpassword && <span className="error">{errors.confirmpassword}</span>}
                                                        <button type="submit">Submit</button>
                                                    </form>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>

                        )}
                    <div onClick={handleforgotPass} className="register-link">{forgotPass == true ? 'Forgot password' : 'Back To Login'}</div>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </>
    );
};

export default Login;
