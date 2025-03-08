import React, { useEffect,useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import { handleApiRequestPost } from "../../Helper/HelperFunction";
import { handleApiRequestGet } from "../../Helper/HelperGetFunction";
import apiClient from '../../Components/apiClient';
import SpecificationEdit from './SpecificationEdit';
import CurrentStatusEdit from './CurrentStatusEdit';
import ModalPop from '../../Components/Modal';
import Sidebar from '../../layout/sidebar';
import Header from '../../layout/Header';
import Footr from '../../layout/Footr';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import FloorPlanEdit from './FloorPlanEdit';
import OverviewEdit from './OverviewEdit';
import GalleryEdit from './GalleryEdit';
import FeatureEdit from './FeatureEdit';
import FaqEdit from './FaqEdit';


export const PropertyEdit = () => {
    const { id } = useParams();
    const modalRef = useRef();
    const [selectionType, setSelectionType] = useState('single');
    const [selectionValue, setselectionValue] = useState('');
    const [selectedPreviewId, setselectedPreviewId] = useState('');

    const [faqsData, setfaqsData] = useState([]);
    const [feature,setfeature] = useState([]);
    const [specificationsData, setSpecificationsData] = useState([]);

    const [selectedThumb, setselectedThumb] = useState([]);
    const [selectedBanner, setselectedBanner] = useState({ ImgID: '', Path: [] });
    const [selectedBannerPath, setselectedBannerPath] = useState({name:'selectedPreviewId',ImgID: [], Path: []});
    const [selectedMobilepath, setselectedMobilepath] = useState({name:'selectedPreviewId',ImgID: [], Path: []});
    const [selectedMobile, setselectedMobile] = useState({ ImgID: '', Path: [] });
    const [selectedlogo, setselectedlogo] = useState('');

    const [specification,setspecification] = useState([]);
    const [floorImages, setfloorImages] = useState([]);
    const [galleryImage,setgallryImage] = useState([]);
    const [currentStatus,setcurrentStatus] = useState([]);
    const [selectedFeatures,setSelectedFeatures] = useState([]);

    const [SpecViewImage, setSpecViewImage] = useState([]);

    const [valueset, setValueset] = useState([]);
    const [pathOfImage, setpathOfImage] = useState([]);

    const [errors, setErrors] = useState({});


    useEffect(() => {
        if (!id) return;
        const Geturl =`property-get/${id}`;
        handleApiRequestGet(
            apiClient,
            Geturl,
            (data) => {
                if (data.status === "success") {

                    setSpecificationsData(data.specChild);
                    setSpecViewImage(data.specImages);
                    const selectedFeaturesData = data.data.feature;
                    const fixedSelectedFeatures = selectedFeaturesData.split(',').map(Number);
                    setSelectedFeatures(fixedSelectedFeatures);
                    setFormData(prev => ({ ...prev, ...data.data }));
                    setFormsData(prev => ({ ...prev, ...data.data }))
                    setselectedlogo(data.data.property_logo);
                    setselectedThumb(data.data.property_thumbs);
                    setselectedBanner(data.bannerImages);
                    setselectedMobile(data.MobilebannerImages);
                    setFloorTowers(data.data.property_floor_plan_details.f_loor_details);
                    setfloorImages(data.floorimage);
                    setTowers(data.data.property_current_status_details);
                    setcurrentStatus(data.currentimage);
                    setGalleryTowers(data.gallerydetails);
                    setgallryImage(data.galleryimage);
                    setfaqsData(data.data.property_faq_details);


                } else {
                    console.log("Unexpected response status");
                }
            },
            (error) => {
                console.error("Data fetch failed:", error?.response?.data || error);
            }
        );
    }, [id]);



    const [FromsData, setFormsData] = useState({
            property_thumb: '',
            mobile_banner: [],
            property_banner: [],
            logo: '',
            status: ''
        });

     const [galleryTowers, setGalleryTowers] = useState([
        {
            id: 1,
            galleryName: '',
            gallerytitle: '',
            imageId: [],
        },
        ]);

    const [floorTowers, setFloorTowers] = useState([
        {
            id: 1,
            title: '',
            floorID: [],
        },
        ]);

    const [towers, setTowers] = useState([
        {
            id: 1,
            current: '',
            date: '',
            ImageID: [],
        },
        ]);

        const [formData, setFormData] = useState({
            property_type: '',
            no_of_floor: '',
            property_name: '',
            size_range: '',
            rera: '',
            bhk: [],
            units: '',
            sqft: '',
            description:'',
            address:'',
            locationAddress: '',
            propertyStatus: '',
            area: '',
            projectlabel: '',
            walkthrough: '',
            brochure: '',
        });

        const validateForm = () => {
            const newErrors = {};
            if (!formData.property_type) newErrors.property_type = "Property type is required";
            if (!formData.no_of_floor) newErrors.no_of_floor = "Number of floors is required";
            if (!formData.property_name) newErrors.property_name = "Property name is required";
            if (!formData.size_range) newErrors.size_range = "Size range is required";
            if (!formData.rera) newErrors.rera = "RERA number is required";
            if (!formData.bhk || formData.bhk.length === 0) newErrors.bhk = "Please select at least one BHK option";
            if (!formData.units) newErrors.units = "Units are required";
            if (!formData.sqft) newErrors.sqft = "Sq.ft is required";
            if (!formData.locationAddress) newErrors.locationAddress = "Location is required";
            if (!formData.propertyStatus) newErrors.propertyStatus = "Property status is required";
            if (!formData.area) newErrors.area = "Area is required";
            if (!formData.projectlabel) newErrors.projectlabel = "Project label is required";
            if (!formData.description) newErrors.description = "Description is required";
            if (!formData.address) newErrors.address = "Address is required";
            return newErrors;
          };



    const handleSubmit = async (e) => {

        e.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }


        const Newurl = `property-edit/${id}`;
        const formDataToSend = new FormData();

        console.log(specificationsData);
        return false;
        formDataToSend.append("overview", JSON.stringify(formData));
        formDataToSend.append("overviewimages", JSON.stringify(FromsData));
        formDataToSend.append("specification", JSON.stringify(specificationsData));
        formDataToSend.append("floorimage", JSON.stringify(floorTowers)); // If floorimage is a file, don't stringify it.
        formDataToSend.append("galleryImage", JSON.stringify(galleryTowers)); // If this isn't a file.
        formDataToSend.append("currentStatus", JSON.stringify(towers));
        formDataToSend.append("faqsData", JSON.stringify(faqsData));
        formDataToSend.append("selectedFeatures", JSON.stringify(selectedFeatures));


        try {
          handleApiRequestPost(
            apiClient,
            formDataToSend,
            Newurl,
            (data) => {
              if (data?.status === "error") {
                toast.warning(data?.message || "Something went wrong");
              } else if (data?.status === "success") {
                const message =
                  data?.message ||
                  (formData.id ? "Datas Updated Successfully" : "Datas Added Successfully");
                toast.success(message);
              } else {
                toast.error("Something went wrong");
              }
            },
            (error) => {
              console.error("Request failed:", error?.response?.data || error);
            }
          );
        } catch (error) {
          console.error("Form submission error:", error);
        }
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

        const dataPath = e.target.getAttribute('data-path');

        if(dataPath){
            const imagePaths = dataPath.split(',');
            setpathOfImage(imagePaths);
        }

      };

    let selectedPath = [];
    let selectedIds = [];

    const handleSelectionAction = (newSelectedIds, newSelectedPath, selectedDiv) => {

        selectedIds = newSelectedIds;
        selectedPath = newSelectedPath;


        const match = String(selectedDiv).match(/specification-banner-preview(?:-copy(\d+))?/);
        const id = match && match[1] ? parseInt(match[1], 10) : 0;

        const floormatch = selectedDiv.match(/floor-image-preview(?:-copy(\d+))?/);
        const floorid = match && match[1] ? parseInt(match[1], 10) : 0;

        const gallerymatch = selectedDiv.match(/gallery-image-preview(?:-copy(\d+))?/);
        const galleryid = match && match[1] ? parseInt(match[1], 10) : 0;

        const currentmatch = selectedDiv.match(/current-status-preview(?:-copy(\d+))?/);
        const currentmatchid = match && match[1] ? parseInt(match[1], 10) : 0;

         if (selectedDiv === "logo-preview") {
            setselectedlogo(newSelectedIds);
            setFormsData    ((prev) => ({
                ...prev,
                logo: selectedIds
            }));
        } else if (selectedDiv === "thumb-preview") {
            setselectedThumb(newSelectedIds);
            setFormsData((prev) => ({
                ...prev,
                property_thumb: selectedIds
            }));
        } else if (selectedDiv === "banner-image-preview") {
            setselectedBannerPath({ name:selectedPreviewId,ImgID: newSelectedIds, Path: selectedPath });
            setFormsData((prev) => ({
                ...prev,
                property_banner: selectedIds
            }));
        } else if (selectedDiv === "mobile-banner-preview") {
            setselectedMobilepath({ name:selectedPreviewId,ImgID: newSelectedIds, Path: selectedPath });
            setFormsData((prev) => ({
                ...prev,
                mobile_banner: selectedIds
            }));
        }else if (match) {
            setspecification((prev) => ({
                ...prev,
                name: selectedPreviewId,
                Path: selectedPath,
                id: selectedIds
            }));
        }else if(floormatch){
            setfloorImages((prev) => ({
                ...prev,
                name: selectedPreviewId,
                Path:selectedPath,
                id: selectedIds
            }));
        }else if(gallerymatch){
            setgallryImage((prev) => ({
                ...prev,
                name: selectedPreviewId,
                Path:selectedPath,
                id: selectedIds
            }));
        }else if(currentmatch){
            setcurrentStatus((prev) => ({
                ...prev,
                name: selectedPreviewId,
                Path:selectedPath,
                id: selectedIds
            }));
        }

        const targetDiv = document.getElementById(selectedDiv);
        if (targetDiv) {

            targetDiv.innerHTML = '';

            selectedPath.forEach((img, index) => {
                const id = selectedIds[index]?.trim();

                if (!id && !img.includes("assets/admin/uploads/media-files/")) return;

                const imgDiv = document.createElement('div');
                imgDiv.className = 'image-preview';

                const imgElement = document.createElement('img');
                imgElement.src = img;
                imgElement.alt = `Image ${id}`;
                imgElement.className = 'img-thumbnail';
                imgElement.style.width = '100px';
                imgElement.style.height = 'auto';

                const removeButton = document.createElement('span');
                removeButton.className = 'image-remove';
                removeButton.textContent = 'X';
                removeButton.addEventListener('click', () => handleRemove(id, selectedDiv));

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

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2 col-side-bar d-none d-sm-block">
                        <Sidebar />
                    </div>
                    <div className="col-12 col-sm-10 col-bg-color-2 px-2">
                        <Header />
                        <div className="page-title-blog d-flex align-items-sm-center flex-sm-row flex-column gap-2">
                            <div className="flex-grow-1">
                                <h4 className="fs-18 fw-semibold mb-0">Add Property</h4>
                            </div>
                        </div>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="projectview">
                            <div className="container">
                                <form className="add-product-froms">
                                    <Row>
                                        <Col sm={2} className="card card-tap-height-side">
                                            <div className="position-relative">
                                                <Nav variant="pills" className="flex-column">
                                                    <Nav.Item className='nav-item-padding'>
                                                        <Nav.Link className='nav-link-padding' eventKey="projectview">Project Overview</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item className='nav-item-padding'>
                                                        <Nav.Link className='nav-link-padding' eventKey="specification">Specifications</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item className='nav-item-padding'>
                                                        <Nav.Link className='nav-link-padding' eventKey="features">Features</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item className='nav-item-padding'>
                                                        <Nav.Link className='nav-link-padding' eventKey="floorplan">Floor Plan</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item className='nav-item-padding'>
                                                        <Nav.Link className='nav-link-padding' eventKey="gellery">Gallery</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item className='nav-item-padding'>
                                                        <Nav.Link className='' eventKey="currentstatus">Current Status</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item className='nav-item-padding'>
                                                        <Nav.Link className='nav-link-padding' eventKey="faq">FAQ</Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </div>
                                        </Col>
                                        <Col sm={10}>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="projectview">
                                                    <OverviewEdit
                                                    selectedlogo={selectedlogo}
                                                    openModalExternally={openModalExternally}
                                                    formsData={FromsData}
                                                    formData={formData}
                                                    setFormData={setFormData}
                                                    selectionAction={handleSelectionAction}
                                                    selectedMobile={selectedMobile}
                                                    selectedBanner={selectedBanner}
                                                    selectedThumb={selectedThumb}
                                                    errors={errors}
                                                    selectedBannerPath={selectedBannerPath}
                                                    selectedMobilepath={selectedMobilepath}
                                                    handleSubmit={handleSubmit}
                                                    handleRemove={handleRemove}
                                                    setselectedMobile={setselectedMobile}
                                                    setselectedBanner={setselectedBanner}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="specification">
                                                    <SpecificationEdit
                                                    setSpecificationsData={setSpecificationsData}
                                                    openModalExternally={openModalExternally}
                                                    specificationsData={specificationsData}
                                                    handleRemove={handleRemove}
                                                    specification={specification}
                                                    setValueset={setValueset}
                                                    SpecViewImage={SpecViewImage}
                                                    setSpecViewImage={setSpecViewImage}
                                                    handleSelectionAction={handleSelectionAction}
                                                     />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="features">
                                                   <FeatureEdit
                                                   setfeature={setfeature}
                                                   feature={feature}
                                                   selectedFeatures={selectedFeatures}
                                                   setSelectedFeatures={setSelectedFeatures}
                                                   handleSubmit={handleSubmit}
                                                   handleSelectionAction={handleSelectionAction}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="floorplan">
                                                    <FloorPlanEdit floorTowers={floorTowers}
                                                    openModalExternally={openModalExternally}
                                                    setFloorTowers={setFloorTowers}
                                                    setfloorImages={setfloorImages}
                                                    floorImages={floorImages}
                                                    handleRemove={handleRemove}
                                                    handleSubmit={handleSubmit}
                                                    handleSelectionAction={handleSelectionAction}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="gellery">
                                                    <GalleryEdit galleryTowers={galleryTowers}
                                                    openModalExternally={openModalExternally}
                                                    setGalleryTowers={setGalleryTowers}
                                                    setgallryImage={setgallryImage}
                                                    galleryImage={galleryImage}
                                                    selectionValue={selectionValue}
                                                    handleSubmit={handleSubmit}
                                                    handleSelectionAction={handleSelectionAction}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="currentstatus">
                                                    <CurrentStatusEdit
                                                    towers={towers}
                                                     openModalExternally={openModalExternally}
                                                     setTowers={setTowers}
                                                     setcurrentStatus={setcurrentStatus}
                                                     currentStatus={currentStatus}
                                                     selectionValue={selectionValue}
                                                     handleSubmit={handleSubmit}
                                                     handleSelectionAction={handleSelectionAction}
                                                     />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="faq">
                                                    <FaqEdit  Faq={faqsData} setfaqsData={setfaqsData} handleSubmit={handleSubmit} />
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </form>
                            </div>
                        </Tab.Container>
                    </div>
                    <Footr />
                </div>
                <ModalPop openModal={modalRef}  selectionType={selectionType} selectionAction={handleSelectionAction}
                selectedPreviewId={selectedPreviewId} selectionValue={selectionValue} valueset={valueset} pathOfImage={pathOfImage} />
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
