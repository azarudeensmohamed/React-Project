import React, { useEffect,useState, useRef  } from 'react'
import { useParams } from 'react-router-dom';
import Sidebar from '../../layout/sidebar';
import Header from '../../layout/Header';
import Footr from '../../layout/Footr';
import ModalPop from '../../Components/Modal';
import apiClient from '../../Components/apiClient';
import { handleApiRequestPost } from "../../Helper/HelperFunction";
import { handleApiRequestGet } from "../../Helper/HelperGetFunction";
import { toast, ToastContainer } from "react-toastify";

export const Feature = () => {

    const { id } = useParams();
    const modalRef = useRef();
    const [selectionType, setSelectionType] = useState('single');
    const [selectionValue, setselectionValue] = useState('');
    const [selectedPreviewId, setselectedPreviewId] = useState('');
    const [selectedLogo, setselectedLogo] = useState([]);
    const [valueset, setValueset] = useState([]);
        const [selectedlogoprev, setselectedlogoprev] = useState([]);



    const [FormDatas, setFormsData] = useState({
            title: '',
            feature_logo: '',
        });

        function handleData(e) {
            const value = e.target.value;
            const name = e.target.name;

            setFormsData((prev) => ({
                ...prev,
                [name]: value
            }));
        }

        const apiUrl = import.meta.env.VITE_API_URL;

        useEffect(() => {
            if (!id) return;
            const Geturl =`feature-get/${id}`;
            handleApiRequestGet(
                apiClient,
                Geturl,
                (data) => {
                    if (data.status === "success") {
                        setFormsData({
                            title: data.data.title || "",
                            feature_logo: data.data.feature_logo || "",
                        });
                        if (data.data.featureimage?.file_path) {
                            setselectedlogoprev(data.data.featureimage.file_path);
                        }
                        setselectedLogo(data.data.feature_logo);
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


        useEffect(() => {
            if (!id) {
                setFormsData({
                    title: '',
                    feature_logo: '',
                });
            }
        }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const Newurl = id ? "feature-update" : "feature-save";
            const formDataToSend = new FormData();

            formDataToSend.append("title", FormDatas.title);
            formDataToSend.append("feature_logo", FormDatas.feature_logo);

            if (id) {
                formDataToSend.append("id", id);
            }

        try {
            handleApiRequestPost(
                apiClient,
                formDataToSend,
                Newurl,
                (data) => {
                    if (data?.status === 'error') {
                        toast.warning(data?.message || "Something went wrong");
                    } else if (data?.status === 'success') {
                        toast.success(data?.message || id ? "Datas Added Successfully" : "Datas Updated Successfully");
                        if (!id) {
                            clearAllPreviews();
                            setFormsData({
                                title: '',
                                feature_logo: '',
                            });
                        }
                    } else {
                        toast.error("Something went wrong");
                    }
                },
                (error) => {
                    console.error("Login failed:", error?.response?.data || error);
                }
            );
        } catch (error) {
          console.error('Form submission error:', error);
        }
      };

      const clearAllPreviews = () => {
        const previewDivIds = [
          'feature-logo-preview',
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

      let selectedIds = [];
      let selectedPath = [];

    const handleSelectionAction = (newSelectedIds, newSelectedPath, selectedDiv) => {
        selectedIds = newSelectedIds;
        selectedPath = newSelectedPath;
        if (selectedDiv === "feature-logo-preview") {
            setselectedLogo(newSelectedIds);
            setFormsData((prev) => ({
                ...prev,
                feature_logo: selectedIds
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
    }

    const handleRemove = (id, selectedDiv) => {
        const indexToRemove = selectedIds.indexOf(id);
        if (indexToRemove > -1) {
          selectedIds.splice(indexToRemove, 1);
          selectedPath.splice(indexToRemove, 1);
        }
        handleSelectionAction(selectedIds, selectedPath, selectedDiv);
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
                    <h4 className="fs-18 fw-semibold mb-0">Feature</h4>
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
                                            <h4 className="header-title"> { !id ? 'Add' : 'Edit'} Feature </h4>
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
                                                    value={FormDatas.title || ''}
                                                    className="form-control"
                                                    onChange={handleData}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="mb-3">
                                                <label htmlFor="solution_thumb" className="form-label pe-2">Feature Logo</label><br/>
                                                <input type="hidden" value={FormDatas.feature_logo} name="feature_logo" id="feature-logo" />
                                                <button
                                                    type="button"
                                                    className="template-btn btn btn-success open-gallery-sec"
                                                    onClick={openModalExternally}
                                                    data-type="1"
                                                    data-action="add"
                                                    data-valueset={selectedLogo}
                                                    data-previewid="feature-logo-preview"
                                                    data-value="lgog"
                                                >
                                                    + Select Logo Image
                                                </button>
                                                </div>
                                                <div id="feature-logo-preview" style={{width:'380px'}}>
                                                {id && selectedlogoprev.length != 0 && <div className="image-preview-single"><img src={apiUrl+selectedlogoprev} data-id={selectedLogo} alt="articles Thumbnail" style={{width: '175px', height: '100px'}} /><span onClick={() =>handleRemove(selectedLogo,'feature-logo-preview')} className="image-remove">X</span></div>}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-12 pt-3">
                                                <button className="btn btn-primary submit-button" type="submit">{ !id ? 'Save' : 'Update'}</button>
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
