import React, { useState, useRef,useEffect  } from 'react'
import { useNavigate } from 'react-router-dom';
import ModalPop from '../Components/Modal';
import Sidebar from '../layout/sidebar';
import Header from '../layout/Header';
import Footr from '../layout/Footr';
import $ from 'jquery';
import 'datatables.net';
import axios from 'axios';
import apiClient from '../Components/apiClient'
import { handleApiRequestPost } from "../Helper/HelperFunction";
import { toast, ToastContainer } from "react-toastify";
import PlaceHolder from '../../../../public/assets/placeholder-image.jpg';


export const Media = () => {


    const modalRef = useRef();
    const [Show, setShow] = useState(false);
    const [selectionType, setSelectionType] = useState('single');
    const [selectionValue, setselectionValue] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedPreviewId, setselectedPreviewId] = useState('');
    const [ImgDetails, setImgDetails] = useState({});
    const [altImage,setaltImage] = useState('');

    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    function toggleshow() {
        setShow(!Show);
    }
    const openModalExternally = (e) => {
        if (modalRef.current) {
          modalRef.current();
        }
        const type = e.target.getAttribute('data-type');
        setSelectionType(type === '1' ? 'single' : 'multiple');
        const value = e.target.getAttribute('data-value');
        setselectionValue(value);

        const previewID = e.target.getAttribute('data-previewid');
        setselectedPreviewId(previewID);
      };

      let selectedPath = [];
      let selectedIds = [];

      const handleSelectionAction = (newSelectedIds, newSelectedPath, selectedDiv) => {
        selectedIds = newSelectedIds;
        selectedPath = newSelectedPath;

        const targetDiv = document.getElementById(selectedDiv);
        if (targetDiv) {
          targetDiv.innerHTML = '';

          selectedPath.forEach((img, index) => {
            const imgDiv = document.createElement('div');
            imgDiv.className = 'image-preview';

            const imgElement = document.createElement('img');
            imgElement.src = img;
            imgElement.alt = `Image ${selectedIds[index]}`;
            imgElement.style.width = '100px';
            imgElement.style.height = 'auto';
            imgElement.className = 'img-thumbnail';

            const removeButton = document.createElement('span');
            removeButton.className = 'image-remove';
            removeButton.textContent = 'X';
            removeButton.addEventListener('click', () => handleRemove(selectedIds[index], selectedDiv));

            imgDiv.appendChild(imgElement);
            imgDiv.appendChild(removeButton);

            targetDiv.appendChild(imgDiv);
          });
        }
      };

      const handleRemove = (id, selectedDiv) => {
        const indexToRemove = selectedIds.indexOf(id);
        if (indexToRemove > -1) {
          selectedIds.splice(indexToRemove, 1);
          selectedPath.splice(indexToRemove, 1);
        }
        handleSelectionAction(selectedIds, selectedPath, selectedDiv);
      };

    useEffect(() => {

      const table = $("#table_id").DataTable({
        processing: true,
        serverSide: true,
        iDisplayLength: 5,
        sDom: "lrtip",
        lengthChange: false,
        order: [[0, "desc"]],
        columnDefs: [{ className: "ps-3", targets: "_all" }],
        pagingType: window.innerWidth < 768 ? "full" : "full_numbers",
        ajax: {
          url: `${apiUrl}api/media-list-data`,
          type: "GET",
          dataType: "json",
          dataSrc: function (response) {
            return response.data;
          },
        },
        lengthMenu: [5, 25, 50, 100],
        pageLength: 5,
        columns: [
          { data: "id", orderable: false },
          { data: "file", orderable: false },
          { data: "file_title", orderable: false },
          { data: "date", orderable: false },
          {
            data: "action",
            orderable: false,
            render: function (action) {
              return `
                <button type="button" class="btn btn-soft-success btn-icon btn-sm rounded-circle edit-btn" data-id="${action}">
                  ✏️
                </button>
                <button type="button" class="btn btn-soft-danger btn-icon btn-sm rounded-circle delete-btn" data-id="${action}">
                  🗑️
                </button>
              `;
            },
          },
        ],
      });

      $(document).on("click", ".edit-btn", function (e) {
        e.preventDefault();
        let id = $(this).data("id");
            setSelectedId(id);
      });

      $(document).on("click", ".delete-btn", function (e) {
        e.preventDefault();
        let id = $(this).data("id");
        if (window.confirm("Are you sure you want to delete this item?")) {
        }
      });

      $('#search').on('keyup', function () {
          const SearchValue = $(this).val();
          table.column(3).search(SearchValue).draw();
      });

      return () => {
        if ($.fn.DataTable.isDataTable("#table_id")) {
          $("#table_id").DataTable().clear().destroy();
        }
      };
    }, [apiUrl, navigate]);


    useEffect(() => {
        if(!selectedId)return;
        const fetchSingleImages = async () => {
            try {
                const response = await axios.get(`${apiUrl}api/get-single-images/${selectedId}`);
                if (response.data.status === "success") {
                    setImgDetails(response.data.data);
                } else {
                    console.error("Error fetching images:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
        fetchSingleImages();
    }, [selectedId]);

    const formatDate = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        return new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", year: "numeric" }).format(date);
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return "0 KB";
        return `${(bytes / 1024).toFixed(2)} KB`;
    };

    const altSavefunction = (id) => {
        if(!id)return;
        const dataFrom = new FormData();
        dataFrom.append("altImage", ImgDetails.alt);
        dataFrom.append("id", id);
        const Newurl = 'media-alt-update';
        try {
            handleApiRequestPost(
                apiClient,
                dataFrom,
                Newurl,
                (data) => {
                    if (data?.status === 'error') {
                        toast.warning(data?.message || "Something went wrong");
                    } else if (data?.status === 'success') {
                        toast.success(data?.message || "Datas Added Successfully");
                    } else {
                        toast.error("Unexpected response status");
                    }
                },
                (error) => {
                    console.error("Login failed:", error?.response?.data || error);
                    toast.error(error?.response?.data?.message || "Something went wrong");
                }
            );
        } catch (error) {
          console.error('Form submission error:', error);
        };
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2 col-side-bar d-none d-sm-block">
                    <Sidebar />
                </div>
                <div className="col-12 col-sm-10 col-bg-color-2 px-2">
                   <Header />
                    <div className="page-title-blog d-flex align-items-sm-center flex-sm-row flex-column gap-2">
                        <div className="flex-grow-1">
                            <h4 className="fs-18 fw-semibold mb-0">Media Files</h4>
                        </div>
                        <div>
                             <input type="text" className='form-control' id="search" placeholder='Search' />
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="site-details mt-1">
                                    <form className="add-product-froms" >
                                        <div className="row">
                                            <div className="col-lg-8">
                                            <div className="card">
                                                    <div className="card-header d-flex align-items-center justify-content-between border-bottom border-light">
                                                        <h4 className="header-title">Media List</h4>
                                                        <div>
                                                            <button className="btn btn-primary float-start submit-button ms-1" onClick={openModalExternally}
                                                            data-type="multiple"
                                                            data-action="add"
                                                            data-previewid="product-multiple-preview"
                                                            data-value=""
                                                            type="button">Add Media</button>
                                                        </div>
                                                    </div>
                                                    <div className="table-responsive">
                                                        <table className="table table-nowrap mb-0" id="table_id">
                                                            <thead className="bg-light-subtle">
                                                                <tr>
                                                                    <th className="ps-3" style={{width: "50px"}}>S.NO</th>
                                                                    <th style={{width: "155px"}}>File</th>
                                                                    <th style={{width: "155px"}}>Title</th>
                                                                    <th>Upload Date</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="card" style={{minHeight:'570px'}}>
                                                    <div className="card-header">
                                                        <h4 className="card-title mb-0">Image Details</h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="card ">
                                                            <div id="product-multiple-preview" className="imageListClass d-flex">
                                                            { ImgDetails.file_path != undefined ?  ( <img src={apiUrl+ImgDetails.file_path} alt="" style={{width:'100%',height:'185px'}}/> ):
                                                                <img src={PlaceHolder} alt="" style={{width:'100%',height:'185px'}}/> }
                                                            </div>
                                                        </div>
                                                        <div>
                                                        <div className="image-details">
                                                            <p>File Title : <b className="image-title">  { ImgDetails.title != undefined ? ImgDetails.title : 'XXXX' } </b></p>
                                                            <p>File Date : { ImgDetails?.created_at != undefined ? formatDate(ImgDetails.created_at) : 'YYYY-MM-DD'}</p>
                                                            <p>File Size : { ImgDetails?.file_size != undefined ? formatFileSize(ImgDetails.file_size) : 'xxx kB'}</p>
                                                            <p>File Name : { ImgDetails.file_name != undefined ? ImgDetails.file_name : 'exmaple'}</p>
                                                        </div>
                                                        <hr/>
                                                        <label>Image Alt</label>
                                                            <input
                                                            type="text"
                                                            className="form-control"
                                                            value={ImgDetails.alt || ''}
                                                            onChange={(e) => setImgDetails((prev) => ({ ...prev, alt: e.target.value }))}
                                                            placeholder='Enter Imasge Alt'
                                                            />
                                                        <div className="image-details mt-3">
                                                            <h6><button type="button" className="btn btn-primary" onClick={() => altSavefunction(ImgDetails.id)} >Update</button></h6>
                                                        </div>
                                                        </div>
                                                    </div>
                                                <div className="row">
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <Footr />
                    </div>
                </div>
            </div>
            <ModalPop openModal={modalRef}  selectionType={selectionType} selectionAction={handleSelectionAction} selectedPreviewId={selectedPreviewId} selectionValue={selectionValue} />
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
    )
}

