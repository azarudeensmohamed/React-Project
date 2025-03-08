import { useState } from "react"
import { Link,NavLink } from "react-router-dom"
import logo from '../../../../public/assets/logo.png';
import { AiOutlineDashboard } from "react-icons/ai";
import { LuFiles } from "react-icons/lu";
import { LuBookMarked } from "react-icons/lu";
import { PiArticleNyTimesFill } from "react-icons/pi";
import { IoIosSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { MdPermMedia } from "react-icons/md";
import { MdFeaturedPlayList } from "react-icons/md";
export default function SidebarItem(){
    const [open, setOpen] = useState(false)
    const [activeMenu, setActiveMenu] = useState(null);

    const toggleMenu = (menu) => {
      setActiveMenu(activeMenu === menu ? null : menu);
    };
    // const toggleactive = (menu) => {
    //   setActiveMenu(activeMenu === menu ? null : menu);
    // };

        return (
           <>
            <div className="sidenav-menu">
                <Link href="index.html" className="logo">
                    <span className="logo-light">
                        <span className="logo-lg"><img src={logo} alt="logo" /></span>
                        <span className="logo-sm"><img src={logo} alt="small" lodata-bs-toggle="collapse" /></span>
                    </span>

                    <span className="logo-dark" style={{padding: '5px'}}>
                        <span className="logo-lg"><img src={logo} alt="dark logo" width={150} height={60}/></span>
                        <span className="logo-sm"><img src="../../../../src/assets/logo-dark.png" alt="small logo"/></span>
                    </span>
                </Link>
                <button className="button-sm-hover">
                    <i className="ti ti-circle align-middle"></i>
                </button>

                <button className="button-close-fullsidebar">
                    <i className="ti ti-x align-middle"></i>
                </button>

                <div data-simplebar>
                    <ul className="side-nav">
                        <li className="side-nav-item active" >
                            <NavLink to="/dashboard" className="side-nav-link">
                                <span className="menu-icon"><AiOutlineDashboard /></span>
                                <span className="menu-text"> Home </span>
                                <span className="badge bg-success rounded-pill">5</span>
                            </NavLink>
                        </li>
                        <li className={`side-nav-item ${activeMenu === 'property' ? 'active' : ''} ${(location.pathname === "/property" || location.pathname === "/property-list") ? "active" : "" }`}>
                            <a data-bs-toggle="collapse" href="#property" aria-expanded="false" aria-controls="property" className={`side-nav-link ${activeMenu === 'property' ? 'active' : ''}`}  onClick={() => toggleMenu('property')}>
                                <span className="menu-icon"><LuFiles /></span>
                                <span className="menu-text"> Property management</span>
                                <span className="menu-arrow"></span>
                            </a>
                            <div className={`collapse ${activeMenu === 'property' ? 'show' : ''} ${(location.pathname === "/property" || location.pathname === "/property-list") ? "show" : "" }`} id="property">
                                <ul className="sub-menu">
                                    <li className="side-nav-item">
                                        <Link to="/property" className={`side-nav-link ${(location.pathname === "/property") ? "active" : "" }`}>
                                            <span className="menu-text">Add Property</span>
                                        </Link>
                                    </li>
                                    <li className="side-nav-item">
                                        <Link to="/property-list" className={`side-nav-link ${(location.pathname === "/property-list") ? "active" : "" }`}>
                                            <span className="menu-text">Property List</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className={`side-nav-item ${activeMenu === 'solution' ? 'active' : ''}`}>
                            <a data-bs-toggle="collapse" href="#solution" aria-expanded="false" aria-controls="solution" className={`side-nav-link ${activeMenu === 'solution' ? 'active' : ''}`} onClick={() => toggleMenu('solution')}>
                                <span className="menu-icon"><FaClipboardList /></span>
                                <span className="menu-text"> Solution management</span>
                                <span className="menu-arrow"></span>
                            </a>
                            <div className={`collapse ${activeMenu === 'solution' ? 'show' : ''}`} id="solution">
                                <ul className="sub-menu">
                                    <li className="side-nav-item">
                                        <NavLink href="{{url('/admin/add-solution')}}" className="side-nav-link">
                                            <span className="menu-text">Add Solution</span>
                                        </NavLink>
                                    </li>
                                    <li className="side-nav-item">
                                        <NavLink href="{{url('/admin/solution-list')}}" className="side-nav-link">
                                            <span className="menu-text">Solution List</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className={`side-nav-item ${activeMenu === 'feature' ? 'active' : ''} ${(location.pathname === "/feature" || location.pathname === "/feature-list") ? "active" : "" }`}>
                            <a data-bs-toggle="collapse" href="#feature" aria-expanded="false" aria-controls="feature" className={`side-nav-link ${activeMenu === 'feature' ? 'active' : ''}`}  onClick={() => toggleMenu('feature')}>
                                <span className="menu-icon"><MdFeaturedPlayList /></span>
                                <span className="menu-text"> Feature management</span>
                                <span className="menu-arrow"></span>
                            </a>
                            <div className={`collapse ${activeMenu === 'feature' ? 'show' : ''} ${(location.pathname === "/feature" || location.pathname === "/feature-list") ? "show" : "" }`} id="feature">
                                <ul className="sub-menu">
                                    <li className="side-nav-item">
                                        <NavLink to="/feature" className="side-nav-link">
                                            <span className="menu-text">Add Feature</span>
                                        </NavLink>
                                    </li>
                                    <li className="side-nav-item">
                                        <NavLink to="/feature-list" className="side-nav-link">
                                            <span className="menu-text">Feature List</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className={location.pathname === "/media" ? "side-nav-item active" : "side-nav-item"}>
                            <NavLink to="/media" className={location.pathname === "/media" ? "side-nav-link active" : "side-nav-link"}>
                                <span className="menu-icon"><MdPermMedia /></span>
                                <span className="menu-text"> Media Upload </span>
                            </NavLink>
                        </li>

                        <li className={`side-nav-item ${activeMenu === 'Blog' ? 'active' : ''} ${(location.pathname === "/blogs" || location.pathname === "/blogs-list") ? "active" : "" }`}>
                            <a data-bs-toggle="collapse" href="#Blog" aria-expanded="false" aria-controls="Blog" className={`side-nav-link ${activeMenu === 'Blog' ? 'active' : ''}`} onClick={() => toggleMenu('Blog')}>
                                <span className="menu-icon"><LuBookMarked /></span>
                                <span className="menu-text"> Blogs management</span>
                                <span className="menu-arrow"></span>
                            </a>
                            <div className={`collapse ${activeMenu === 'Blog' ? 'show' : ''} ${(location.pathname === "/blogs" || location.pathname === "/blogs-list") ? "show" : "" }`} id="Blog">
                                <ul className="sub-menu">
                                    <li className="side-nav-item">
                                        <NavLink to="/blogs" className={`side-nav-link ${(location.pathname === "/blogs") ? "active" : "" }`}>
                                            <span className="menu-text">Add Blogs</span>
                                        </NavLink>
                                    </li>
                                    <li className="side-nav-item">
                                        <NavLink to="/blogs-list" className={`side-nav-link ${(location.pathname === "/blogs-list")  ? "active" : "" }`}>
                                            <span className="menu-text">Blogs List</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className={`side-nav-item ${activeMenu === 'articles' ? 'active' : ''} ${(location.pathname === "/article" || location.pathname === "/articles-list") ? "active" : "" }`}>
                            <a data-bs-toggle="collapse" href="#articles" aria-expanded="false" aria-controls="articles" className={`side-nav-link ${activeMenu === 'articles' ? 'active' : ''}`} onClick={() => toggleMenu('articles')}>
                                <span className="menu-icon"><PiArticleNyTimesFill /></span>
                                <span className="menu-text"> Articles management</span>
                                <span className="menu-arrow"></span>
                            </a>
                            <div className={`collapse ${activeMenu === 'articles' ? 'show' : ''}`} id="articles">
                                <ul className="sub-menu">
                                    <li className="side-nav-item">
                                        <NavLink to="/article" className={`side-nav-link ${(location.pathname === "/article")  ? "active" : "" }`}>
                                            <span className="menu-text">Add Articles</span>
                                        </NavLink>
                                    </li>
                                    <li className="side-nav-item">
                                        <NavLink to="/articles-list" className={`side-nav-link ${(location.pathname === "/articles-list")  ? "active" : "" }`}>
                                            <span className="menu-text">Articles List</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="side-nav-item">
                            <a href="#" className="side-nav-link">
                                <span className="menu-icon"><IoIosSettings /></span>
                                <span className="menu-text"> setting </span>
                            </a>
                        </li>
                        <li className="side-nav-item">
                            <a href="#" className="side-nav-link">
                                <span className="menu-icon"><IoLogOut /></span>
                                <span className="menu-text"> Logout </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            </>
        )
}
