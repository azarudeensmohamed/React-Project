import React, { useEffect, useState, useRef  } from 'react'
import { useParams } from 'react-router-dom';
import Sidebar from '../../layout/sidebar';
import Header from '../../layout/Header';
import Footr from '../../layout/Footr';
import ModalPop from '../../Components/Modal';
import apiClient from '../../Components/apiClient';
import { handleApiRequestPost } from "../../Helper/HelperFunction";
import { handleApiRequestGet } from "../../Helper/HelperGetFunction";
import { toast, ToastContainer } from "react-toastify";

export const Article = () => {

    const { id } = useParams();
    const modalRef = useRef();
    const [Show, setShow] = useState(false);
    const [selectionType, setSelectionType] = useState('single');
    const [selectionValue, setselectionValue] = useState('');
    const [selectedPreviewId, setselectedPreviewId] = useState('');
    const [selectedThumb, setselectedThumb] = useState([]);
    const [selectedBanner, setselectedBanner] = useState([]);
    const [selectedMobile, setselectedMobile] = useState([]);
    const [valueset, setValueset] = useState([]);

    const [selectedThumbprev, setselectedThumbPrev] = useState([]);
    const [selectedBannerprev, setselectedBannerPrev] = useState([]);
    const [selectedMobileprev, setselectedMobileprev] = useState([]);

    const [FromsData, setFormsData] = useState({
        title: '',
        slug: '',
        articles_thumb: '',
        mobile_banner: '',
        banner: '',
        article_title: '',
        url_source:'',
        description:'',
        date:'',
        status: 'active'
    });


    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (!id) return;
        const Geturl =`article-get/${id}`;
        handleApiRequestGet(
            apiClient,
            Geturl,
            (data) => {
                if (data.status === "success") {
                    setFormsData({
                        title: data.data.title || "",
                        slug: data.data.slug || "",
                        articles_thumb: data.data.article_thumb || "",
                        mobile_banner: data.data.mobile_banner || "",
                        banner: data.data.banner || "",
                        article_title: data.data.article_title || "",
                        url_source: data.data.slug || "",
                        description: data.data.description || "",
                        date: data.data.date || "",
                        status: data.data.status || "",
                    });
                    if (data.data.article_thumbs?.file_path) {
                        setselectedThumbPrev(data.data.article_thumbs.file_path);
                    }
                    if (data.data.article__mobile?.file_path) {
                        setselectedMobileprev(data.data.article__mobile.file_path);
                    }
                    if (data.data.article_banner?.file_path) {
                        setselectedBannerPrev(data.data.article_banner.file_path);
                    }
                    setselectedThumb(data.data.article_thumb);
                    setselectedMobile(data.data.mobile_banner);
                    setselectedBanner(data.data.banner);
                } else {
                    console.log("Unexpected response status");
                }
            },
            (error) => {
                console.error("Data fetch failed:", error?.response?.data || error);
                console.log(error?.response?.data?.message || "Something went wrong");
            }
        );
    }, [id]);

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
        const ValueID =e.target.getAttribute('data-valueset');
        setValueset(ValueID);
      };

      let selectedPath = [];
      let selectedIds = [];

      const handleSelectionAction = (newSelectedIds, newSelectedPath, selectedDiv) => {
        selectedIds = newSelectedIds;
        selectedPath = newSelectedPath;
        if (selectedDiv === "articles-thumb-preview") {
            setselectedThumb(newSelectedIds);
            setFormsData((prev) => ({
                ...prev,
                articles_thumb: selectedIds
            }));
        } else if (selectedDiv === "articles-banner-preview") {
            setselectedBanner(newSelectedIds);
            setFormsData((prev) => ({
                ...prev,
                banner: selectedIds
            }));
        } else if (selectedDiv === "articles-mobile-preview") {
            setselectedMobile(newSelectedIds);
            setFormsData((prev) => ({
                ...prev,
                mobile_banner: selectedIds
            }));
        }


        const targetDiv = document.getElementById(selectedDiv);
        if (targetDiv) {
          targetDiv.innerHTML = '';

          selectedPath.forEach((img, index) => {
            const imgDiv = document.createElement('div');
            imgDiv.className = 'image-preview-single';

            const imgElement = document.createElement('img');
            imgElement.src = img;
            imgElement.alt = `Image ${selectedIds[index]}`;
            imgElement.style.width = '175px';
            imgElement.style.height = '100px';
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


      function handleData(e) {
        const value = e.target.value;
        const name = e.target.name;

        setFormsData((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const Newurl = id ? `article-update/${id}` : 'article-save';

        try {
            handleApiRequestPost(
                apiClient,
                FromsData,
                Newurl,
                (data) => {
                    if (data?.status === 'error') {
                        toast.warning(data?.message || "Something went wrong");
                    } else if (data?.status === 'success') {
                        toast.success(data?.message || "Datas Added Successfully");
                        if (!id) {
                        clearAllPreviews();
                        setFormsData({
                            title: '',
                            slug: '',
                            articles_thumb: '',
                            mobile_banner: '',
                            banner: '',
                            article_title: '',
                            url_source:'',
                            description:'',
                            date:'',
                            status: 'active',
                          });
                        }
                    } else {
                        toast.error("Something went wrong");
                    }
                },
                (error) => {
                    console.error("Login failed:", error?.response?.data || error);
                    // toast.error(error?.response?.data?.message || "Something went wrong");
                }
            );
        } catch (error) {
          console.error('Form submission error:', error);
        }
      };

      const clearAllPreviews = () => {
        const previewDivIds = [
          'articles-thumb-preview',
          'articles-mobile-preview',
          'articles-banner-preview',
        ];

        previewDivIds.forEach((divId) => {
          const previewDiv = document.getElementById(divId);
          if (previewDiv) {
            previewDiv.innerHTML = '';
          }
        });
        selectedIds = [];
        selectedPath = [];
      };


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
                            <h4 className="fs-18 fw-semibold mb-0">Article</h4>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="site-details mt-1">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="card">
                                                <div className="card-header d-flex align-items-center justify-content-between border-bottom border-light">
                                                    <h4 className="header-title"> { !id ? 'Add' : 'Edit'} Article</h4>
                                                </div>
                                                <form onSubmit={handleSubmit}>
                                                <div className="card-body">
                                                    <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-12">
                                                        <div className="mb-3">
                                                        <label htmlFor="title" className="form-label">Title</label>
                                                        <input type="text"
                                                            name="title"
                                                            id="title"
                                                            value={FromsData.title || ''}
                                                            className="form-control"
                                                            onChange={handleData}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-12">
                                                        <div className="mb-3">
                                                        <label htmlFor="banner_title" className="form-label">Banner Title</label>
                                                        <div className="input-group-btn">
                                                            <input type="text" name="article_title"
                                                                id="article_title"
                                                                value={FromsData.article_title || ''}
                                                                onChange={handleData}
                                                                className="form-control" />
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-12">
                                                        <div className="mb-3">
                                                        <label htmlFor="url_source" className="form-label">Source Url</label>
                                                        <div className="input-group-btn">
                                                            <input type="text" name="url_source"
                                                                id="url_source"
                                                                value={FromsData.url_source || ''}
                                                                onChange={handleData}
                                                                className="form-control" />
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-12">
                                                        <div className="mb-3">
                                                        <label htmlFor="date" className="form-label">Date</label>
                                                        <div className="input-group-btn">
                                                            <input type="date" name="date"
                                                                id="banner_title"
                                                                value={FromsData.date || ''}
                                                                onChange={handleData}
                                                                className="form-control" />
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-12">
                                                        <div className="mb-3">
                                                        <label htmlFor="solution_thumb" className="form-label pe-2">Article Thumb</label>
                                                        <input type="hidden" value={FromsData.articles_thumb} name="article_thumb" id="articles-thumb" />
                                                        <button
                                                            type="button"
                                                            className="template-btn btn btn-success open-gallery-sec"
                                                            onClick={openModalExternally}
                                                            data-type="1"
                                                            data-action="add"
                                                            data-previewid="articles-thumb-preview"
                                                            data-valueset={selectedThumb}
                                                            data-value="thumb"
                                                        >
                                                            + Select Solution Thumb
                                                        </button>
                                                        </div>
                                                        <div id="articles-thumb-preview">
                                                        {id && selectedThumbprev.length != 0 && <div className="image-preview-single"><img src={apiUrl+selectedThumbprev} data-id={selectedThumb} alt="articles Thumbnail" style={{width: '175px', height: '100px'}} /><span onClick={() =>handleRemove(selectedThumb,'articles-thumb-preview')} className="image-remove">X</span></div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-12">
                                                        <div className="mb-3">
                                                        <label htmlFor="mobile_banner" className="form-label pe-2">Mobile Banner</label>
                                                        <input type="hidden" value={FromsData.mobile_banner} name="mobile_banner" id="mobile-banner" />
                                                        <button
                                                            type="button"
                                                            className="template-btn btn btn-success open-gallery-sec"
                                                            onClick={openModalExternally}
                                                            data-type="1"
                                                            data-action="add"
                                                            data-previewid="articles-mobile-preview"
                                                            data-valueset={selectedMobile}
                                                            data-value="mobile"
                                                        >
                                                            + Select Mobile Banner
                                                        </button>
                                                        </div>
                                                        <div id="articles-mobile-preview">
                                                        {id && selectedMobileprev.length != 0 && <div className="image-preview-single"><img src={apiUrl+selectedMobileprev} data-id={selectedMobile} alt="articles Thumbnail" style={{width: '175px', height: '100px'}} /><span onClick={() =>handleRemove(selectedMobile,'articles-mobile-preview')} className="image-remove">X</span></div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-12">
                                                        <div className="mb-3">
                                                        <label htmlFor="inner_banner" className="form-label pe-2">Banner</label>
                                                        <input type="hidden" value={FromsData.banner} name="banner" id="inner-banner" />
                                                        <button
                                                            type="button"
                                                            className="template-btn btn btn-success open-gallery-sec"
                                                            onClick={openModalExternally}
                                                            data-type="1"
                                                            data-action="add"
                                                            data-previewid="articles-banner-preview"
                                                            data-valueset={selectedBanner}
                                                            data-value="banner"
                                                        >
                                                            + Select Inner Banner
                                                        </button>
                                                        </div>
                                                        <div id="articles-banner-preview">
                                                        {id && selectedBannerprev.length != 0 && <div className="image-preview-single"><img src={apiUrl+selectedBannerprev} data-id={selectedBanner} alt="articles Thumbnail" style={{width: '175px', height: '100px'}} /><span onClick={() =>handleRemove(selectedBanner,'articles-banner-preview')} className="image-remove">X</span></div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-12">
                                                        <div className="mb-3">
                                                        <label htmlFor="slug" className="form-label">Descrption</label>
                                                        <div className="input-group-btn">
                                                            <textarea type="text"
                                                                name="description"
                                                                value={FromsData.description}
                                                                id="description"
                                                                onChange={handleData}
                                                                className="form-control" ></textarea>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-12">
                                                        <div className="mb-3">
                                                        <label htmlFor="prstatus" className="form-label">Status</label>
                                                        <select
                                                            className="form-select"
                                                            name="status"
                                                            id="prstatus"
                                                            value={FromsData.status}
                                                            onChange={handleData}
                                                        >
                                                            <option value="active">Active</option>
                                                            <option value="inactive">Inactive</option>
                                                        </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-12 pt-3">
                                                        <button className="btn btn-primary submit-button" type="submit">Save</button>
                                                    </div>
                                                    </div>
                                                </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footr />
                    </div>
                </div>
            </div>
            <ModalPop  openModal={modalRef}  selectionType={selectionType}  selectionAction={handleSelectionAction}
            selectedPreviewId={selectedPreviewId} selectionValue={selectionValue}  valueset={valueset} />

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

