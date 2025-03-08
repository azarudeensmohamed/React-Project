import React, { useEffect,useState  } from 'react'
import apiClient from '../Components/apiClient'
import Sidebar from '../layout/sidebar';
import { FaCalendarAlt } from "react-icons/fa";
import { CiCircleAlert } from "react-icons/ci";
import activity from '../../../../public/assets/202412240402-image.png';
import Header from '../layout/Header';


export const Dashboard = () => {


    useEffect(() => {
        const loginUser = async () => {
            try {
                const response = await apiClient.get(`/auth/refresh`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.data.status === "error") {
                    navigate("/");
                }
            } catch (error) {
                if (error.response) {
                    console.error("Error:", error.message);
                    toast.error("An error occurred. Please try again.", { autoClose: 5000 });
                } else {
                    console.error('Error:', error.message);
                }
            }
        };

        loginUser();
    }, []);

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2 col-side-bar d-none d-sm-block">
                        <Sidebar />
                    </div>
                    <div className="col-12 col-sm-10 col-bg-color-2">
                    <Header />
                        <div className="page-title-head d-flex align-items-sm-center flex-sm-row flex-column">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="page-title-head d-flex align-items-sm-center flex-sm-row flex-column">
                                            <div className="flex-grow-1">
                                                <h4 className="fs-18 fw-semibold m-0">Welcome back, Admin</h4>
                                            </div>
                                            <div className="mt-3 mt-sm-0">
                                                <form action="#">
                                                    <div className="row g-2 mb-0 align-items-center">
                                                        <div className="col-auto">
                                                            <a href="#" className="btn btn-light">
                                                                <i className="ti ti-sort-ascending me-1"></i> Sort By
                                                            </a>
                                                        </div>
                                                        <div className="col-sm-auto">
                                                            <div className="input-group">
                                                                <input type="text" className="form-control border-0 shadow" data-provider="flatpickr" data-deafult-date="01 May to 31 May" data-date-format="d M" data-range-date="true" />
                                                                <span className="input-group-text bg-primary border-primary text-white">
                                                                    <FaCalendarAlt />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="site-details mt-1">
                                        <div className="row row-cols-xxl-1 row-cols-md-2 row-cols-1 ">
                                            <div className="col">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-3">
                                                                <p>URL: <a href="https://kgbuilders.com/" target="_blank"> https://kgbuilders.com/</a> </p>
                                                            </div>
                                                            <div className="col-3">
                                                                <p>Email: <a href="https://kgbuilders.com/" target="_blank"> info@kgbuilders.com</a> </p>
                                                            </div>
                                                            <div className="col-3">
                                                                <p>Mobile: <a href="https://kgbuilders.com/" target="_blank">+91-9876543210</a> </p>
                                                            </div>
                                                            <div className="col-3">
                                                                <div className="no-hig"><p><a href="#"> Edit Business Info <CiCircleAlert /></a> </p></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card">
                                                    <div className="card-header d-flex justify-content-between align-items-center bottom-bor">
                                                        <h4 className="header-title">Analytics</h4>
                                                        <div className="dropdown">

                                                            <a href="#" className="btn btn-sm btn-light">View Your Site Analytics <i className="ti ti-download ms-1"></i></a>
                                                        </div>
                                                    </div>
                                                    <div className="card-body pt-0">
                                                        <div className="row">
                                                            <div className="col-xxl-12">
                                                                <div className="analytics-select">
                                                                    Your key stats for the last 30 days
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="row">
                                                            <div className="col-xxl-3">
                                                                <div className="analytics-card">
                                                                    Site View
                                                                    <div className="data-value">56</div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xxl-3">
                                                                <div className="analytics-card">
                                                                    Total Leads
                                                                    <div className="data-value">156</div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xxl-3">
                                                                <div className="analytics-card">
                                                                    Total Pages
                                                                    <div className="data-value"> 6</div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xxl-3">
                                                                <div className="analytics-card">
                                                                    Total Products
                                                                    <div className="data-value">6</div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card">
                                                    <div className="card-header   justify-content-between align-items-center bottom-bor">
                                                        <h4 className="header-title">Activity feed</h4>
                                                        <div className="activity-sub">
                                                            Your most recent updates.
                                                        </div>
                                                    </div>
                                                    <div className="card-body pt-0">
                                                        <div className="row">
                                                            <div className="col-xxl-12">
                                                                <div className="no-details">
                                                                    Recent activity to show
                                                                </div>
                                                                <div className="activity-image">
                                                                    <img src={activity} alt="" className="img-fluid" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
