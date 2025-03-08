import React,{useState} from 'react';
import { FaBell } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import avatar from '../../../../public/assets/avatar-1.jpg';

const Header = () => {


        const [Show, setShow] = useState(false);

        function toggleshow(){
            setShow(!Show);
        }

  return (
    <header className="app-topbar">
    <div className="page-container topbar-menu">
        <div className="d-flex align-items-center gap-2">

            <a href="index.html" className="logo">
                <span className="logo-light">
                    <span className="logo-lg"><img src="#" alt="logo" /></span>
                    <span className="logo-sm"><img src="#" alt="small logo"/></span>
                </span>

                <span className="logo-dark">
                    <span className="logo-lg"><img src="#" alt="dark logo" /></span>
                    <span className="logo-sm"><img src="#" alt="small logo" /></span>
                </span>
            </a>

            <button className="sidenav-toggle-button px-2">
                <i className="ti ti-menu-deep fs-24"></i>
            </button>

            <button className="topnav-toggle-button px-2" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
                <i className="ti ti-menu-deep fs-22"></i>
            </button>

            <div className="topbar-search text-muted d-none d-xl-flex gap-2 align-items-center" data-bs-toggle="modal" data-bs-target="#searchModal" type="button">
                <FaSearch />
                <span className="me-2">Search something..</span>
                <span className="ms-auto fw-medium">⌘K</span>
            </div>

        </div>

        <div className="d-flex align-items-center gap-2">

            <div className="topbar-item d-flex d-xl-none">
                <button className="topbar-link" data-bs-toggle="modal" data-bs-target="#searchModal" type="button">
                    <i className="ti ti-search fs-22"></i>
                </button>
            </div>

            <div className="topbar-item">
                <div className="dropdown">
                    <button className="topbar-link dropdown-toggle drop-arrow-none" data-bs-toggle="dropdown" data-bs-offset="0,25" type="button" data-bs-auto-close="outside" aria-haspopup="false" aria-expanded="false">
                    <FaBell />
                        <span className="noti-icon-badge"></span>
                    </button>
                    <div className="dropdown-menu p-0 dropdown-menu-end dropdown-menu-lg" >
                        <div className="p-3 border-bottom border-dashed">
                            <div className="row align-items-center">
                                <div className="col-md-12">
                                    <h6 className="m-0 fs-16 fw-semibold"> Notifications</h6>
                                </div>
                                <div className="col-auto">
                                    <div className="dropdown">
                                        <a href="#" className="dropdown-toggle drop-arrow-none link-dark" data-bs-toggle="dropdown" data-bs-offset="0,15" aria-expanded="false">
                                            <IoIosSettings />
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end">

                                            <a href="#" className="dropdown-item">Mark as Read</a>

                                            <a href="#" className="dropdown-item">Delete All</a>

                                            <a href="#" className="dropdown-item">Do not Disturb</a>

                                            <a href="#" className="dropdown-item">Other Settings</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
{/* style={{ maxHeight: "300px" }} */}
                        <div className="position-relative z-2 card shadow-none rounded-0"  data-simplebar>

                            <div className="dropdown-item notification-item py-2 text-wrap active" id="notification-1">
                                <span className="d-flex align-items-center">
                                    <span className="me-3 position-relative flex-shrink-0">
                                        <img src={avatar} className="avatar-md rounded-circle" alt="" />
                                        <span className="position-absolute rounded-pill bg-danger notification-badge">
                                            <i className="ti ti-message-circle"></i>
                                            <span className="visually-hidden">unread messages</span>
                                        </span>
                                    </span>
                                    <span className="flex-grow-1 text-muted">
                                        <span className="fw-medium text-body">Glady Haid</span> commented on <span className="fw-medium text-body">paces admin status</span>
                                        <br />
                                        <span className="fs-12">25m ago</span>
                                    </span>
                                    <span className="notification-item-close">
                                        <button type="button" className="btn btn-ghost-danger rounded-circle btn-sm btn-icon" data-dismissible="#notification-1">
                                            <i className="ti ti-x fs-16"></i>
                                        </button>
                                    </span>
                                </span>
                            </div>


                            <div className="dropdown-item notification-item py-2 text-wrap" id="notification-2">
                                <span className="d-flex align-items-center">
                                    <span className="me-3 position-relative flex-shrink-0">
                                        <img src="{{asset('assets/admin/images/users/avatar-4.jpg')}}" className="avatar-md rounded-circle" alt="" />
                                        <span className="position-absolute rounded-pill bg-info notification-badge">
                                            <i className="ti ti-currency-dollar"></i>
                                            <span className="visually-hidden">unread messages</span>
                                        </span>
                                    </span>
                                    <span className="flex-grow-1 text-muted">
                                        <span className="fw-medium text-body">Tommy Berry</span> donated <span className="text-success">$100.00</span> for <span className="fw-medium text-body">Carbon removal program</span>
                                        <br />
                                        <span className="fs-12">58m ago</span>
                                    </span>
                                    <span className="notification-item-close">
                                        <button type="button" className="btn btn-ghost-danger rounded-circle btn-sm btn-icon" data-dismissible="#notification-2">
                                            <i className="ti ti-x fs-16"></i>
                                        </button>
                                    </span>
                                </span>
                            </div>


                            <div className="dropdown-item notification-item py-2 text-wrap" id="notification-3">
                                <span className="d-flex align-items-center">
                                    <div className="avatar-md flex-shrink-0 me-3">
                                        <span className="avatar-title bg-success-subtle text-success rounded-circle fs-22">
                                            <iconify-icon icon="solar:wallet-money-bold-duotone"></iconify-icon>
                                        </span>
                                    </div>
                                    <span className="flex-grow-1 text-muted">
                                        You withdraw a <span className="fw-medium text-body">$500</span> by <span className="fw-medium text-body">New York ATM</span>
                                        <br />
                                        <span className="fs-12">2h ago</span>
                                    </span>
                                    <span className="notification-item-close">
                                        <button type="button" className="btn btn-ghost-danger rounded-circle btn-sm btn-icon" data-dismissible="#notification-3">
                                            <i className="ti ti-x fs-16"></i>
                                        </button>
                                    </span>
                                </span>
                            </div>


                            <div className="dropdown-item notification-item py-2 text-wrap" id="notification-4">
                                <span className="d-flex align-items-center">
                                    <span className="me-3 position-relative flex-shrink-0">
                                        <img src="{{asset('assets/admin/images/users/avatar-7.jpg')}}" className="avatar-md rounded-circle" alt="" />
                                        <span className="position-absolute rounded-pill bg-secondary notification-badge">
                                            <i className="ti ti-plus"></i>
                                            <span className="visually-hidden">unread messages</span>
                                        </span>
                                    </span>
                                    <span className="flex-grow-1 text-muted">
                                        <span className="fw-medium text-body">Richard Allen</span> followed you in <span className="fw-medium text-body">Facebook</span>
                                        <br />
                                        <span className="fs-12">3h ago</span>
                                    </span>
                                    <span className="notification-item-close">
                                        <button type="button" className="btn btn-ghost-danger rounded-circle btn-sm btn-icon" data-dismissible="#notification-4">
                                            <i className="ti ti-x fs-16"></i>
                                        </button>
                                    </span>
                                </span>
                            </div>


                            <div className="dropdown-item notification-item py-2 text-wrap" id="notification-5">
                                <span className="d-flex align-items-center">
                                    <span className="me-3 position-relative flex-shrink-0">
                                        <img src="{{asset('assets/admin/images/users/avatar-10.jpg')}}" className="avatar-md rounded-circle" alt="" />
                                        <span className="position-absolute rounded-pill bg-danger notification-badge">
                                            <i className="ti ti-heart-filled"></i>
                                            <span className="visually-hidden">unread messages</span>
                                        </span>
                                    </span>
                                    <span className="flex-grow-1 text-muted">
                                        <span className="fw-medium text-body">Victor Collier</span> liked you recent photo in <span className="fw-medium text-body">Instagram</span>
                                        <br />
                                        <span className="fs-12">10h ago</span>
                                    </span>
                                    <span className="notification-item-close">
                                        <button type="button" className="btn btn-ghost-danger rounded-circle btn-sm btn-icon" data-dismissible="#notification-5">
                                            <i className="ti ti-x fs-16"></i>
                                        </button>
                                    </span>
                                </span>
                            </div>
                        </div>
                        {/* style={{ height: "300px" }} */}
                        <div className="d-flex align-items-center justify-content-center text-center position-absolute top-0 bottom-0 start-0 end-0 z-1">
                            <div>
                                <iconify-icon icon="line-md:bell-twotone-alert-loop" className="fs-80 text-secondary mt-2"></iconify-icon>
                                <h4 className="fw-semibold mb-0 fst-italic lh-base mt-3">Hey! 👋 <br />You have no any notifications</h4>
                            </div>
                        </div>
                        <a href="#" className="dropdown-item notification-item position-fixed z-2 bottom-0 text-center text-reset text-decoration-underline link-offset-2 fw-bold notify-item border-top border-light py-2">
                            View All
                        </a>
                    </div>
                </div>
            </div>
            <div className="topbar-item d-none d-sm-flex">
                <button className="topbar-link" data-bs-toggle="offcanvas" data-bs-target="#theme-settings-offcanvas" type="button">
                <IoIosSettings />
                </button>
            </div>
            <div className="topbar-item nav-user">
                <div className="dropdown">
                    <a className="topbar-link dropdown-toggle drop-arrow-none px-2" data-bs-toggle="dropdown" data-bs-offset="0,19" type="button" aria-haspopup="false" onClick={toggleshow}>
                        <img src={avatar} width="32" className="rounded-circle me-lg-2 d-flex" alt="user-image" />
                        <span className="d-lg-flex flex-column gap-1 d-none">
                            <h5 className="my-0">Dhanoo K.</h5>
                            <h6 className="my-0 fw-normal">Premium</h6>
                        </span>
                        <i className="ti ti-chevron-down d-none d-lg-block align-middle ms-2"></i>
                    </a>
                    <div className={`dropdown-menu dropdown-menu-end ${Show == true ? 'show' : ''}`}>

                        <div className="dropdown-header noti-title">
                            <h6 className="text-overflow m-0">Welcome !</h6>
                        </div>


                        <a href="#" className="dropdown-item">
                            <i className="ti ti-user-hexagon me-1 fs-17 align-middle"></i>
                            <span className="align-middle">My Account</span>
                        </a>


                        <a href="#" className="dropdown-item">
                            <i className="ti ti-wallet me-1 fs-17 align-middle"></i>
                            <span className="align-middle">Wallet : <span className="fw-semibold">$985.25</span></span>
                        </a>


                        <a href="#" className="dropdown-item">
                            <i className="ti ti-settings me-1 fs-17 align-middle"></i>
                            <span className="align-middle">Settings</span>
                        </a>


                        <a href="#" className="dropdown-item">
                            <i className="ti ti-lifebuoy me-1 fs-17 align-middle"></i>
                            <span className="align-middle">Support</span>
                        </a>

                        <div className="dropdown-divider"></div>


                        <a href="#" className="dropdown-item">
                            <i className="ti ti-lock-square-rounded me-1 fs-17 align-middle"></i>
                            <span className="align-middle">Lock Screen</span>
                        </a>
                        <a href="{{url('/admin/logout')}}" className="dropdown-item active fw-semibold text-danger">
                            <i className="ti ti-logout me-1 fs-17 align-middle"></i>
                            <span className="align-middle">Sign Out</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
  )
}

export default Header
