import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import MultiSelectDropdown from "../MultiSelectDropdown";

const Overview = ({
    selectedlogo,
    openModalExternally,
    formData,
    setFormData,
    selectedThumb,
    selectedMobile,
    selectedBanner,
    errors,
    handleSubmit,
}) => {

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: type === "file" ? files[0] : value
        }));
    };

    const options = [
        { value: "2BHK", label: "2BHK" },
        { value: "3BHK", label: "3BHK" },
        { value: "4BHK", label: "4BHK" },
        { value: "5BHK", label: "5BHK" },
      ];

      const handleBhkChange = (selectedValues) => {
        setFormData((prevState) => ({
          ...prevState,
          bhk: selectedValues,
        }));
      }


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
                    <select className="selectpicker form-select" name="propertyType" id="property-type" value={formData.propertyType} onChange={handleChange}>
                        <option value="">--Select Project Type--</option>
                        <option value="apartment">Apartment</option>
                        <option value="plot">Plot</option>
                    </select>
                    {errors.propertyType && <span className="text-danger">{errors.propertyType}</span>}
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
                <div className="mb-3">
                    <label htmlFor="No-of-floor" className="form-label">No.of floor</label>
                    <input type="text" name="noOfFloor" id="No-of-floor" className="form-control" value={formData.noOfFloor} onChange={handleChange} />
                    {errors.noOfFloor && <span className="text-danger">{errors.noOfFloor}</span>}
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
                <div className="mb-3">
                    <label htmlFor="propertyname" className="form-label">Property Name</label>
                    <input type="text" name="propertyName" id="propertyname" className="form-control" value={formData.propertyName} onChange={handleChange} />
                    {errors.propertyName && <span className="text-danger">{errors.propertyName}</span>}
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
                <div className="mb-3">
                    <label htmlFor="sizerange" className="form-label">Size range</label>
                    <input type="text" name="sizeRange" id="sizerange" className="form-control" value={formData.sizeRange} onChange={handleChange} />
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
                    < MultiSelectDropdown options={options} label={'BHK'} value={formData.bhk} onChange={handleBhkChange} />
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
                data-valueset={selectedThumb}
                data-previewid="thumb-preview"
                data-value="thumb"
                data-action="add"
              >
                + Select Thumb
              </Button>
              <div id="thumb-preview" className="imageListClass"></div>
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
                data-valueset={selectedlogo}
                data-previewid="logo-preview"
                data-action="add"
              >
                + Select Logo
              </Button>
              <div id="logo-preview" className="imageListClass"></div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="mb-3">
              <Button
                type="button"
                onClick={openModalExternally}
                className="template-btn btn btn-success open-gallery-sec"
                data-type="multiple"
                data-valueset={selectedMobile.ImgID}
                data-previewid="mobile-banner-preview"
                data-path={selectedMobile.Path}
                data-value="mobile banner"
                data-action="add"
              >
                + Select Mobile Banner
              </Button>
              <div id="mobile-banner-preview" className="imageListClass"></div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="mb-3">
              <Button
                type="button"
                onClick={openModalExternally}
                className="template-btn btn btn-success open-gallery-sec"
                data-type="multiple"
                data-valueset={selectedBanner.ImgID}
                data-previewid="banner-image-preview"
                data-path={selectedBanner.Path}
                data-action="add"
                data-value="banner"
              >
                + Select Banner Image
              </Button>
              <div id="banner-image-preview" className="imageListClass"></div>
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

export default Overview
