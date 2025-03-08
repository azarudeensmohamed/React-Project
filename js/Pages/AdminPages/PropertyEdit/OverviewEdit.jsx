import React,{useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import MultiSelectDropdown from "../MultiSelectDropdown";

const OverviewEdit = ({
    selectedlogo,
    openModalExternally,
    formsData,
    formData,
    setFormData,
    selectedThumb,
    selectedMobile,
    selectedBanner,
    errors,
    selectedBannerPath,
    selectedMobilepath,
    handleSubmit,
    handleRemove,
    setselectedMobile,
    setselectedBanner
}) => {


    const apiUrl = import.meta.env.VITE_API_URL;
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: type === "file" ? files[0] : value
        }));
    };

    const options = [
        { value: "2BHK", label: "2BHK" },
        { value: "2BHK +2T", label: "2BHK" },
        { value: "3BHK", label: "3BHK" },
        { value: "3BHK +3T", label: "3BHK +3T" },
        { value: "3BHK +4T", label: "3BHK +4T" },
        { value: "4BHK", label: "4BHK" },
        { value: "4BHK +2T", label: "4BHK +2T" },
        { value: "5BHK", label: "5BHK" },
        { value: "5BHK +2T", label: "5BHK +2T" },
      ];

      const handleBhkChange = (selectedValues) => {
        setFormData((prevState) => ({
          ...prevState,
          bhk: selectedValues,
        }));
      }

      const handleRemoveOver = (imageId, imgIndex) => {
        setselectedBanner(prevImages => prevImages.filter((_, index) => index !== imgIndex));
    };
      const handleRemoveOverMobile = (imageId, imgIndex) => {
        setselectedMobile(prevImages => prevImages.filter((_, index) => index !== imgIndex));
    };


    useEffect(() => {
        if (selectedMobilepath && Array.isArray(selectedMobilepath.Path) && selectedMobilepath.Path.length > 0) {
            const element = document.querySelector(`[data-previewid="${selectedMobilepath.name}"]`);
            if (element) {
                element.setAttribute('data-path', selectedMobilepath.Path.map(path => path.trim()).join(','));
            }
        }
    }, [selectedMobilepath]);

    useEffect(() => {
        if (selectedBannerPath && Array.isArray(selectedBannerPath.Path) && selectedBannerPath.Path.length > 0) {
            const element = document.querySelector(`[data-previewid="${selectedBannerPath.name}"]`);
            if (element) {
                element.setAttribute('data-path', selectedBannerPath.Path.map(path => path.trim()).join(','));
            }
        }
    }, [selectedBannerPath]);




  return (
    <div className="card card-tap-height">
    <div className="card-header border-bottom border-dashed">
        <h4 className="card-title mb-0">Project Overview</h4>
    </div>
    <div className="card-body">
        <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
                <div className="mb-3">
                    <label htmlFor="property-type" className="form-label">property type</label>
                    <select className="selectpicker form-select" name="property_type" id="property-type" value={formData.property_type} onChange={handleChange}>
                        <option value="">--Select Project Type--</option>
                        <option value="apartment">Apartment</option>
                        <option value="plot">Plot</option>
                    </select>
                    {errors.propertyType && <span className="text-danger">{errors.property_type}</span>}
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
                <div className="mb-3">
                    <label htmlFor="No-of-floor" className="form-label">No.of floor</label>
                    <input type="text" name="no_of_floor" id="No-of-floor" className="form-control" value={formData.no_of_floor} onChange={handleChange} />
                    {errors.no_of_floor && <span className="text-danger">{errors.no_of_floor}</span>}
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
                <div className="mb-3">
                    <label htmlFor="propertyname" className="form-label">Property Name</label>
                    <input type="text" name="property_name" id="propertyname" className="form-control" value={formData.property_name} onChange={handleChange} />
                    {errors.propertyName && <span className="text-danger">{errors.propertyName}</span>}
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
                <div className="mb-3">
                    <label htmlFor="sizerange" className="form-label">Size range</label>
                    <input type="text" name="size_range" id="sizerange" className="form-control" value={formData.size_range} onChange={handleChange} />
                    {errors.sizeRange && <span className="text-danger">{errors.sizeRange}</span>}
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
                <div className="mb-3">
                    <label htmlFor="rera" className="form-label">Type of Rera No</label>
                    <input type="text" className='form-control' id="rera" name="rera" value={formData.rera} onChange={handleChange} />
                    {errors.rera && <span className="text-danger">{errors.rera}</span>}
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
                <div className="mb-3">
                    < MultiSelectDropdown options={options} label={'BHK'} value={typeof formData.bhk === 'string' ? formData.bhk.split(',') : formData.bhk} onChange={handleBhkChange} />
                </div>
                {errors.bhk && <span className="text-danger">{errors.bhk}</span>}
            </div>

            <div className="col-lg-6 col-md-6 col-12">
                <div className="mb-3">
                    <label htmlFor="units" className="form-label">Units</label>
                    <input type="text" className='form-control' id="units" name="units" value={formData.units} onChange={handleChange} />
                    {errors.units && <span className="text-danger">{errors.units}</span>}
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
                <div className="mb-3">
                    <label htmlFor="sqft" className="form-label">Sq.ft</label>
                    <input type="text" className='form-control' name="sqft" id='sqft' value={formData.sqft} onChange={handleChange} />
                    {errors.sqft && <span className="text-danger">{errors.sqft}</span>}
                </div>
            </div>

            <div className="col-lg-6 col-md-6 col-12">
                <div className="mb-3">
                    <label htmlFor="related-product" className="form-label">Location</label>
                    <div className="input-group-btn">
                        <input type="text" name="locationAddress" className="form-control" id="related-product" placeholder='location address' value={formData.locationAddress} onChange={handleChange} />
                        {errors.locationAddress && <span className="text-danger">{errors.locationAddress}</span>}
                    </div>
                </div>
            </div>

            <div className="col-lg-6 col-md-6 col-12">
                <div className="mb-3">
                    <label htmlFor="property-status" className="form-label">Property status</label>
                    <div className="input-group-btn">
                        <select className="selectpicker form-select" name="propertyStatus" id="property-status" value={formData.propertyStatus} onChange={handleChange} >
                            <option value="">--Select Property Status--</option>
                            <option value="Ready To Occupy">Ready To Occupy</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
                            <option value="Upcoming">Upcoming</option>
                            <option value="Under Construction">Under Construction</option>
                        </select>
                        {errors.propertyStatus && <span className="text-danger">{errors.propertyStatus}</span>}
                    </div>
                </div>
            </div>

            <div className="col-lg-6 col-md-6 col-12">
                <div className="mb-3">
                    <label htmlFor="related-product" className="form-label">Area</label>
                    <div className="input-group-btn">
                        <input type="text" name="area" className="form-control" placeholder='location address' value={formData.area} onChange={handleChange}/>
                        {errors.area && <span className="text-danger">{errors.area}</span>}
                    </div>
                </div>
            </div>

            <div className="col-lg-6 col-md-6 col-12">
                <div className="mb-3">
                    <label htmlFor="project-label" className="form-label">Label </label>
                    <div className="input-group-btn">
                        <select className="selectpicker form-select" name="projectlabel" id="project-label" value={formData.projectlabel} onChange={handleChange} >
                            <option value="">--Select Project Status--</option>
                            <option value="New Launch">New Launch</option>
                            <option value="Sold Out">Sold Out</option>
                            <option value="CC Obtained">CC Obtained</option>
                            <option value="Launching Shortly">Launching Shortly</option>
                            <option value="Pre Booking">Pre Booking</option>
                        </select>
                        {errors.projectlabel && <span className="text-danger">{errors.projectlabel}</span>}
                    </div>
                </div>
            </div>

            <div className="col-lg-6 col-md-6 col-12">
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descriptions</label>
                    <div className="input-group-btn">
                        <textarea type="text" name="description" id="description" className="form-control" placeholder='description' value={formData.description} onChange={handleChange} ></textarea>
                        {errors.description && <span className="text-danger">{errors.description}</span>}
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
                <div className="mb-3">
                    <label htmlFor="brochure" className="form-label">Address</label>
                    <textarea type="test" name="address" id="brochure" className="form-control" value={formData.address} onChange={handleChange} ></textarea >
                    {errors.address && <span className="text-danger">{errors.address}</span>}
                </div>
            </div>

            <div className="col-lg-6 col-md-6 col-12">
                <div className="mb-3">
                    <label htmlFor="walkthrough" className="form-label">walkthrough</label>
                    <div className="input-group-btn">
                        <input type="text" name="walkthrough" id="walkthrough" className="form-control" placeholder='walkthrough link' value={formData.walkthrough} onChange={handleChange} />
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
                <div className="mb-3">
                    <label htmlFor="brochure" className="form-label">Brochure</label>
                    <input type="file" name="brochure" id="brochure" className="form-control" value={formData.brochure} onChange={handleChange} />
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
            <div className="mb-3">
              <Button
                type="button"
                className="template-btn btn btn-success open-gallery-sec"
                onClick={openModalExternally}
                data-type="1"
                data-valueset={formsData.property_thumb}
                data-previewid="thumb-preview"
                data-value="thumb"
                data-action="add"
              >
                + Select Thumb
              </Button>
              <div id="thumb-preview" className="imageListClass">
              {selectedThumb && (
                <div className="image-preview-single" >
                    <div>
                        <img
                        src={`${apiUrl}${selectedThumb.file_path}`}
                        alt={selectedThumb.filemame}
                        className="img-thumbnail"
                        style={{ width: '100px', height: 'auto' }}
                        />
                        <span
                        onClick={() =>
                            handleRemove(selectedThumb, 'thumb-preview')
                        }
                        className="image-remove"
                        >
                        X
                        </span>
                    </div>
                </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="mb-3">
              <Button
                type="button"
                onClick={openModalExternally}
                className="template-btn btn btn-success open-gallery-sec"
                data-type="1"
                data-value="logos"
                data-valueset={selectedlogo.id}
                data-previewid="logo-preview"
                data-action="edit"
              >
                + Select Logo
              </Button>
              <div id="logo-preview" className="imageListClass">
              {selectedlogo && (
                <div className="image-preview-single" >
                    <div>
                        <img
                        src={`${apiUrl}${selectedlogo.file_path}`}
                        alt={selectedlogo.filemame}
                        className="img-thumbnail"
                        style={{ width: '100px', height: 'auto' }}
                        />
                        <span
                        onClick={() =>
                            handleRemove(selectedlogo, 'logo-preview')
                        }
                        className="image-remove"
                        >
                        X
                        </span>
                    </div>
                </div>
                )}
            </div>
          </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
                <div className="mb-3">
                <Button
                    type="button"
                    onClick={openModalExternally}
                    className="template-btn btn btn-success open-gallery-sec"
                    data-type="multiple"
                    data-valueset={formsData.mobile_banner ?? selectedMobile.ImgID}
                    data-previewid="mobile-banner-preview"
                    data-value="mobile banner"
                    data-action="edit"
                    data-path={
                        (Array.isArray(selectedMobile)
                            ? selectedMobile
                            : selectedMobile
                                ? [selectedMobile]
                                : []
                        )
                        .map(image => `${apiUrl}${image.file_path}`)
                        .join(', ')
                    }

                >
                    + Select Mobile Banner
                </Button>
                <div id="mobile-banner-preview" className="imageListClass">
                {selectedMobile && (
                        (Array.isArray(selectedMobile)
                        ? selectedMobile
                        : [selectedMobile]
                        ).map((image, imgIndex) => (
                        <div className="image-preview" key={`${selectedMobile.id}-${imgIndex}`}>
                            <img
                            src={`${apiUrl}${image.file_path}`}
                            alt={image.title}
                            className="img-thumbnail"
                            style={{ width: '100px', height: 'auto' }}
                            />
                            <span
                            onClick={() => handleRemoveOverMobile(selectedMobile.id, imgIndex)}
                            className="image-remove"
                            >
                            X
                            </span>
                        </div>
                        ))
                    )}
                    </div>
                </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="mb-3">
              <Button
                type="button"
                onClick={openModalExternally}
                className="template-btn btn btn-success open-gallery-sec"
                data-type="multiple"
                data-valueset={formsData.property_banner ?? selectedBanner.ImgID}
                data-previewid="banner-image-preview"
                data-action="edit"
                data-value="banner"
                data-path={
                    (Array.isArray(selectedBanner)
                        ? selectedBanner
                        : selectedBanner
                            ? [selectedBanner]
                            : []
                    )
                    .map(image => `${apiUrl}${image.file_path}`)
                    .join(', ')
                }

              >
                + Select Banner Image
              </Button>
              <div id="banner-image-preview" className="imageListClass">
              {(Array.isArray(selectedBanner) ? selectedBanner : selectedBanner ? [selectedBanner] : []).map((image, imgIndex) => (
                <div className="image-preview" key={`${image.id}-${imgIndex}`} data-id={image.id}>
                    <img
                    src={`${apiUrl}${image.file_path}`}
                    alt={image.title}
                    className="img-thumbnail"
                    style={{ width: "100px", height: "auto" }}
                    />
                    <span
                    onClick={() => handleRemoveOver(image.id, imgIndex)}
                    className="image-remove"
                    >
                    X
                    </span>
                </div>
                ))}
                </div>
            </div>
          </div>
            <div className="col-lg-4 col-md-4 col-12">
                <div className="mb-3">
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>submit</button>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default OverviewEdit
