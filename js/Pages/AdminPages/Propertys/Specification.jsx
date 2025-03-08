import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

const Specification = ({
    setSpecificationsData,
    openModalExternally,
    specificationsData,
    selectionAction,
    specification,
    setValueset,
    handleSubmit,
}) => {


    const addSpecification = () => {
        setSpecificationsData((prev) => [
            ...prev,
            { id: `specification-banner-preview-${prev.length}`, title: "", content: "", image: null }
        ]);
    };

    const removeSpecification = (index) => {
        setSpecificationsData((prev) => prev.filter((_, i) => i !== index));
    };

    const handleInputChange = (index, field, value) => {
        setSpecificationsData((prev) =>
            prev.map((item, i) => i === index ? { ...item, [field]: value } : item)
        );
    };

    const handleImageSelection = (e, index) => {
        e.preventDefault();
        const selectionId = e.target.getAttribute("data-valueset");
        setValueset(selectionId);
        openModalExternally(e);
    };

    useEffect(() => {
        if (specification?.name && specification?.id) {
            const element = document.querySelector(`[data-previewid="${specification.name}"]`);

            if (element) {
                element.setAttribute("data-valueset", specification.id);
                element.setAttribute("data-path",specification.Path)
                setSpecificationsData((prev) =>
                    prev.map((spec) =>
                        spec.id === specification.name ? { ...spec, image: specification.id } : spec
                    )
                );
            } else {
                console.warn(`Element with data-previewid="${specification.name}" not found.`);
            }
        }
    }, [specification]);

    console.log(specificationsData);

    return (
        <div className="card card-tap-height">
            <div className="card-header border-bottom border-dashed">
                <h4 className="card-title mb-0">Project Specification</h4>
            </div>
            <div className="card-body">
                {specificationsData.map((spec, index) => (
                    <div key={index} className="row mb-2">
                        <div className="col-md-12 text-right">
                            <button
                                type="button"
                                className="btn btn-danger remove float-end"
                                onClick={() => removeSpecification(index)}
                            >
                                X
                            </button>
                        </div>
                        <div className="col-md-12 mb-2">
                            <div className="form-group">
                                <h4>Section Title</h4>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={spec.title}
                                    onChange={(e) => handleInputChange(index, "title", e.target.value)}
                                    placeholder="Title"
                                />
                            </div>
                        </div>
                        <div className="col-md-12 mb-2">
                            <div className="form-group">
                                <h4>Section Content</h4>
                                <textarea
                                    className="form-control"
                                    value={spec.content}
                                    onChange={(e) => handleInputChange(index, "content", e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="mb-3">
                                <input type="hidden" name="mobile_banner" />
                                <Button
                                    type="button"
                                    data-valueset={spec.image || ""}
                                    className="template-btn btn btn-success open-gallery-sec"
                                    onClick={(e) => handleImageSelection(e, index)}
                                    data-type="multiple"
                                    data-previewid={`specification-banner-preview-${index}`}
                                    data-value="specification"
                                    data-action="add"
                                >
                                    + Select Mobile Banner
                                </Button>
                                <div id={`specification-banner-preview-${index}`} className="imageListClass">
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="row">
                    <div className="col-md-12 text-right">
                        <button type="button" className="btn btn-success addMore float-end" onClick={addSpecification}>
                            +
                        </button>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-12 mt-3">
                    <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default Specification;
