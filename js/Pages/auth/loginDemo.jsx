import React, { useState, } from 'react';
import './loginDemo.css';
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import draklogo from '../../../../public/assets/logo-dark.png';
import logo from '../../../../public/assets/logo.png';
import apiClient from '../Components/apiClient'
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleApiRequestPost } from "../Helper/HelperFunction";

const loginDemo = () => {
    const navigate = useNavigate();
    const [AuthData, setAuthData] = useState({ email: '', password: '' });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passVisible, setPassVisible] = useState(false);
    const [ConfirpassVisible, setConfirPassVisible] = useState(false);
    const [forgotPass, setFogotPass] = useState(true);
    const [OtpSUbmit, setOtpSUbmit] = useState(true);
    const [otp, setotp] = useState({ Votp: "" });
    const [ChangePassword, setChangePassword] = useState(true);
    const [Verfyemail, setEmail] = useState({ vemail: "" });
    const [password, setPassword] = useState({
        email: "",
        password: "",
        confirmpassword: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {

        const { name, value } = e.target;
        setErrors((prevData) => ({
            ...prevData,
            [name]: '',
        })
        );
        setAuthData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleChangePass = (e) => {
        const { name, value } = e.target;
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
        setPassword((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    function handleforgotPass() {
        setFogotPass(!forgotPass);
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const togglepass = () => {
        setPasswordVisible(!passVisible);
    };
    const toggleconfirm = () => {
        setPasswordVisible(!ConfirpassVisible);
    };

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
        if (data.Votp.trim() === '') {
            errors.Votp = 'Invalid OTP';
        }
        return errors;
    }

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <>
            <div className="auth-bg d-flex min-vh-100 justify-content-center align-items-center">
                <div className="row g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
                    <div className="col-xl-4 col-lg-5 col-md-6">
                        <div className="card overflow-hidden text-center h-100 p-xxl-4 p-3 mb-0">
                            <a href="index.html" className="auth-brand mb-3">
                                <img src={draklogo} alt="dark logo" height="24" className="logo-dark" />
                                <img src={logo} alt="logo light" height="24" className="logo-light" />
                            </a>

                            <h3 className="fw-semibold mb-2 mt-2">Login your account</h3>

                            <p className="text-muted">Enter your email address and password to access admin panel.</p>
                            {forgotPass == true ? (
                                <form id="login" onSubmit={handleSubmit} className="text-start mb-3">
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="email">Email</label>
                                        <input type="email" id="email" name="email" className="form-control" value={AuthData.email} onChange={handleChange} placeholder="Enter your email" />
                                        {errors.email && <span className="error">{errors.email}</span>}
                                    </div>

                                    <div className="mb-3 position">
                                        <label className="form-label" htmlFor="password">Password</label>
                                        <input type="password" name="password" id="password" className="form-control" value={AuthData.password} onChange={handleChange} placeholder="Enter your password" />
                                        {errors.password && <span className="error">{errors.password}</span>}
                                        <span className='eye-icon' onClick={togglePasswordVisibility}>
                                            {passwordVisible ? <FaEyeSlash /> : <IoMdEye />}
                                        </span>
                                        <div className={`password-show ${passwordVisible ? 'show' : ''}`}>{AuthData.password}</div>
                                    </div>

                                    <div className="d-flex justify-content-between mb-4">
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="checkbox-signin" />
                                            <label className="form-check-label" htmlFor="checkbox-signin">Remember me</label>
                                        </div>
                                        <a onClick={handleforgotPass} className="text-muted border-bottom border-dashed cur-pointer">Forget Password</a>
                                    </div>

                                    <div className="d-grid">
                                        <button className="btn btn-primary" type="submit">Login</button>
                                    </div>
                                </form>
                            ) :
                                (
                                    <div>
                                        {OtpSUbmit == true ? (
                                            <form onSubmit={handleSubmitForgot} className="text-start mb-3">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="email">Email</label>
                                                    <input type="email" id="email" name="Vemail" className="form-control" value={Verfyemail.vemail}
                                                        onChange={(e) => {
                                                            setErrors({});
                                                            setEmail({ ...Verfyemail, vemail: e.target.value });
                                                        }}
                                                        placeholder="Enter your email" />
                                                    {errors.Vemail && <span className="error">{errors.Vemail}</span>}
                                                </div>
                                                <div className="d-grid">
                                                    <button className="btn btn-primary" type="submit">Get OTP</button>
                                                </div>
                                            </form>
                                        ) : (
                                            <>
                                                {
                                                    ChangePassword == true ? (
                                                        <form onSubmit={handleOTP} className="text-start mb-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="email">OTP</label>
                                                                <input type="number" id="email" name="Votp" className="form-control" value={otp.Votp}
                                                                    onChange={(e) => {
                                                                        setErrors({});
                                                                        setotp({ ...otp, Votp: e.target.value })
                                                                    }}
                                                                    placeholder="Enter OTP" />
                                                                {errors.Votp && <span className="error">{errors.Votp}</span>}
                                                            </div>
                                                            <div className="d-grid">
                                                                <button className="btn btn-primary" type="submit">Verify OTP</button>
                                                            </div>
                                                        </form>
                                                    ) : (
                                                        <form onSubmit={handleGetnewpass} className="text-start mb-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="email">Password</label>
                                                                <input type="text" id="email" name="password" className="form-control" value={password.password}
                                                                    onChange={handleChangePass} placeholder="Enter your password" />
                                                                    {errors.password && <span className="error">{errors.password}</span>}
                                                                <span className='eye-icon' onClick={togglepass}>
                                                                    {passVisible ? <FaEyeSlash /> : <IoMdEye />}
                                                                </span>
                                                                <div className={`password-show ${passVisible ? 'show' : ''}`}>{password.password}</div>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="email">Confirm Password</label>
                                                                <input type="text" id="email" name="confirmpassword" className="form-control" value={password.confirmpassword}
                                                                    onChange={handleChangePass} placeholder="Re Enter password" />
                                                                    {errors.confirmpassword && <span className="error">{errors.confirmpassword}</span>}
                                                                    <span className='eye-icon' onClick={toggleconfirm}>
                                                                        {ConfirpassVisible ? <FaEyeSlash /> : <IoMdEye />}
                                                                    </span>
                                                                    <div className={`password-show ${ConfirpassVisible ? 'show' : ''}`}>{password.password}</div>

                                                            </div>
                                                            <div className="d-grid">
                                                                <button className="btn btn-primary" type="submit">Confirm</button>
                                                            </div>
                                                        </form>
                                                    )
                                                }
                                            </>
                                        )
                                        }
                                    </div>
                                )
                            }

                            <p className="mt-3 mb-0">
                                <script>document.write(new Date().getFullYear())</script>2025 © Pacca Pro - By <span className="fw-bold text-decoration-underline text-uppercase text-reset fs-12">YUNG</span>
                            </p>

                        </div>
                    </div>
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
    )
}

export default loginDemo
