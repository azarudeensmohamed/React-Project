import React, { useState, useRef, useCallback,useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { RiLoader3Line } from "react-icons/ri";
import { useDropzone} from 'react-dropzone';
import axios from 'axios';
import PlaceHolder from '../../../../public/assets/placeholder-image.jpg';


function  ModalPop ({ openModal, selectionType, selectionAction, selectionValue, selectedPreviewId, valueset,pathOfImage  })  {
    const [showModal, setModalShow] = useState(false);
    const [showProgress, setshowProgress] = useState(false);
    const [showdetiles, setshowdetiles] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [selectedImages, setSelectedImages] = useState([]);
    const [fetchimg, setFetchimg] = useState([]);
    const [ImgGetID, setImgGetID] = useState(null);
    const [ImgDetails, setImgDetails] = useState({});
    const [hasMoreData, setHasMoreData] = useState(true);
    const [ImgID, setImgID] = useState(true);
    const fileInput = useRef();
    const [monthFilter,setmonthFilter] = useState([]);
    const [monthFilterval,setmonthFilterval] = useState([]);
    const [searchFilter,setsearchFilter] = useState([]);

    const [ImagePreview,setImagePreview] = useState([]);

    const apiUrl = import.meta.env.VITE_API_URL;
    const onDrop = useCallback(async (acceptedFiles) => {

        if (acceptedFiles.length === 0) {
            return;
        }

        const formData = new FormData();
        acceptedFiles.forEach((file) => {
            formData.append('files[]', file);
            formData.append('type', selectionValue);
        });

        await uploadFile(formData);
    }, []);

    const uploadFile = async (file) => {
        try {
            setImgID('');
            setshowProgress(true);
            const response = await axios.post(apiUrl+'api/upload-media-files', file, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                }, onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                      (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(progress);
                  },
            });

            if (response.data.status === 'success') {
                setImgID(response.data.data[0].id);
                setshowProgress(false);
            } else {
                console.error('Error uploading files:', response.data);
            }
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    useEffect(() => {
        const fetchUploadedImages = async () => {
            let GETALLIMGE;

            if (!valueset || valueset == '') {
                GETALLIMGE = `${apiUrl}api/get-uploaded-images/?month=${monthFilterval}&search=${searchFilter}`;
            } else {
                GETALLIMGE = `${apiUrl}api/get-uploaded-images/?valueSetId=${valueset}&month=${monthFilterval}&search=${searchFilter}`;

                if (valueset) {
                    const newValues = valueset.split(",").map(String);
                    setSelectedImages(newValues);
                }

            }

            try {
                const response = await axios.get(GETALLIMGE);
                if (response.data.status === 'success') {
                    setFetchimg(response.data.data);
                    setmonthFilter(response.data.month);
                    setHasMoreData(response.data.data.length > 18);
                } else {
                    console.error('Error fetching images:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchUploadedImages();
    }, [valueset,showProgress,searchFilter,monthFilterval]);




    useEffect(() => {
        const fetchSingleImages = async () => {
            setshowdetiles(true);
            try {
                const response = await axios.get(apiUrl+'api/get-single-images/' + ImgGetID);
                if (response.data.status === 'success') {
                    setshowdetiles(false);
                    setImgDetails(response.data.data);
                } else {
                    console.error('Error fetching images:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        if (ImgGetID) fetchSingleImages();
    }, [ImgGetID,ImgID]);


    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
        },
        multiple: true,
    });

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        const ImgSrc = e.target.dataset.src;

        if (!value || !ImgSrc) {
            return;
        }
        setImgGetID(checked ? value : '');

        if (selectionType === 'single') {
            setSelectedImages(checked ? [value] : []);
            setImagePreview(checked ? [ImgSrc] : []);
        } else {
            const checked = e.target.checked;
            setSelectedImages((prev) => {
                const updated = new Set(prev);
                checked ? updated.add(value) : updated.delete(value);
                return Array.from(updated);
            });
            setImagePreview((prev) => {
                const updated = new Set(prev);
                checked ? updated.add(ImgSrc) : '';
                return Array.from(updated);
            });
        }

    };

    const handleModalChange = (e) => {
        e.stopPropagation();
        const value = e.target.getAttribute('data-id');
        const ImgSrc = e.target.src;

        if (!value || !ImgSrc) {
            console.warn("Missing data-id or image source.");
            return;
        }

        if (selectionType === 'single') {
            // If single selection, replace entire state
            setSelectedImages([value]);
            setImagePreview([ImgSrc]);
        } else {
            setSelectedImages((prev) => {
                const updated = new Set(prev);
                updated.has(value) ? updated.delete(value) : updated.add(value);
                return [...updated];  // Convert Set back to an array
            });

            setImagePreview((prev) => {
                const updated = new Set(prev);
                updated.has(ImgSrc) ? updated.delete(ImgSrc) : updated.add(ImgSrc);
                return [...updated];  // Convert Set back to an array
            });
        }

    };





    const UseImage = () => {
        if (selectionAction) {
          selectionAction(selectedImages,ImagePreview,selectedPreviewId);
        }
        handleClose();
      };


    useEffect(() => {

      if (pathOfImage && pathOfImage.length > 0) {
            const filteredPaths = pathOfImage.filter(path => path.trim() !== '');
            setImagePreview(filteredPaths);
        }

    }, [pathOfImage]);

    const handleShow = () => {
        setSelectedImages(valueset);
        setModalShow(true);
    }

    const handleClose = () => {
        setModalShow(false);
        if(selectionType !== 'single'){
            setSelectedImages('');
            setImagePreview('');
        }
    };

    openModal.current = handleShow;

    const selectFile = () => {
        fileInput.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('files[]', file);
        if (file) {
            uploadFile(formData);
        }
    };

    const handleMedia = (event) => {
        const monthOfValue = event.target.value;
        setmonthFilterval(monthOfValue)
    }

    const formatDate = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        return new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", year: "numeric" }).format(date);
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return "0 KB";
        return `${(bytes / 1024).toFixed(2)} KB`;
    };

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        className='media-upload'
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <button onClick={selectFile} className="btn btn-primary">
              Upload File
            </button>
          </Modal.Title>
          <input type="file"  {...getInputProps()} name="files[]" onChange={handleFileChange} style={{ display: 'none' }} ref={fileInput} />
        </Modal.Header>
        <div className="container">
            <div className='row my-2'>
                <div className='col-3'>
                    <select name="" className='form-select' id=""
                    value={Array.isArray(monthFilterval) ? monthFilterval[0] || "" : monthFilterval}
                    // value={monthFilterval || ''}
                     onChange={handleMedia} >
                        <option value="">Select Month</option>
                        {monthFilter.map((month,index) => (
                            <option key={index} value={month.month_year}>{month.month_year}</option>
                        ))}
                    </select>
                </div>
                <div className='col-3'></div>
                <div className='col-3'></div>
                <div className='col-3'>
                    <input type="text" className='form-control' value={searchFilter || ''} onChange={(e)=>setsearchFilter(e.target.value)} placeholder='Search Something'/>
                </div>
            </div>
        </div>
        <hr />
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12} md={9} className='modal-col-9 dropzone' {...getRootProps()}>
                <div className="uploadimg">
                { fetchimg.map((img) => (
                    <div className="img-container" key={img.id}  onClick={handleModalChange}>
                        <input
                        type="checkbox"
                        value={img.id}
                        className="checkbox checked-images"
                        name="imgData"
                        onChange={handleCheckboxChange}
                        checked={selectedImages.includes(String(img.id))}
                        data-src={img.file_path}
                        onClick={(e) => e.stopPropagation()}
                        />
                        <img src={apiUrl+img.file_path} alt="" data-id={img.id} className="img-thumbnail img-fluid" />
                    </div>
                    ))}
                </div>
                <div className="text-center text-primary cursore">
                {hasMoreData && (
                    <div className="loadmore-images blue loader-s" style={{cursor:'PointerEvent',fontSize: '17px',fontWeight: '600',marginTop: '20px'}}><RiLoader3Line  stye={{fontSize: '25px',marginBottom: '5px'}}/> Load More</div>
                ) }
                        <div className="blue" style={{display: 'none'}}>No More Data Found</div>
                </div>
              </Col>
              <Col xs={6} md={3} className='col-modal-3 sticky-column'>
              {!showdetiles ?
              (<div className="about-img" style={{display: 'block'}}>
                <h5 >Attachment details</h5>
                <div className="img-big">
                    <img src={ ImgDetails.file_path ? apiUrl+ImgDetails.file_path : PlaceHolder }  alt="" className="img-fluid" />
                </div>
                <div className="image-details">
                    <p><b className="image-title">{ImgDetails.title}</b></p>
                    {ImgDetails.created_at != undefined && ( <p className="img-date">  {formatDate(ImgDetails.created_at)}, {formatFileSize(ImgDetails.file_size)} </p>)}
                    <h6><span className="edit-permanently text-primary">Edit image</span> | <span className="delete-permanently text-danger">Delete Permanently</span></h6>
                </div>
                <hr/>
                <div className="alt-box">
                    <label htmlFor="">Alt Text</label>
                    <input type="text" className="form-control alttext" style={{width:'80%'}} value={ImgDetails.alt || ''} readOnly  />
                </div>
             </div>) :
             (
             <div className='loader-div'>
             <p className='loader-text'>Loading...</p>
             </div>
            )
                }
              </Col>
              <div className="progress-div media-progress-div" style={{display: !showProgress ? 'none' : ''}}>
                    <center>
                        <div className="roundbar" role="progressbar" aria-valuenow={uploadProgress} aria-valuemin="0" aria-valuemax="100"  style={{'--value': uploadProgress ,}}></div>
                    </center>
                </div>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <div className='footer-div'>
            <button className="btn btn-danger">Delete File</button>
            <div className='unsel-del'>
                <p className='text-primary'>{selectedImages?.length || 0} File Selected</p>
                <p className='text-danger'>Unselect</p>
            </div>
          </div>
          <Button className="btn-success-1" onClick={UseImage}>Use File</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalPop;
