import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

const SpecificationEdit = ({
    setSpecificationsData,
    openModalExternally,
    specificationsData,
    handleRemove,
    specification,
    setValueset,
    handleSubmit,
    SpecViewImage,
    setSpecViewImage,
}) => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const [selectedThumb, setSelectedThumb] = useState([]);

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
            prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
        );
    };

    const handleImageSelection = (e, index) => {
        e.preventDefault();
        const selectionId = e.target.getAttribute("data-valueset");
        setValueset(selectionId);
        openModalExternally(e);
    };

    const handleRemovespec = (towerIndex, imageIndex) => {
        setSpecViewImage((prevImages) => {
            if (!prevImages[towerIndex]) return prevImages;
            const updatedTowerImages = [...prevImages[towerIndex]];
            updatedTowerImages.splice(imageIndex, 1);
            return prevImages.map((imgs, i) => (i === towerIndex ? updatedTowerImages : imgs));
        });
    };

    useEffect(() => {
        if (specification?.name && specification?.id) {
            const element = document.querySelector(`[data-previewid="${specification.name}"]`);
            if (element) {
                element.setAttribute("data-valueset", specification.id);
                element.setAttribute("data-path", specification.Path || "");

                const str = specification.name;
                const numMatch = str.match(/\d+$/);
                if (!numMatch) return;

                const num = parseInt(numMatch[0], 10);
                const updateNum = num + 1;

                setSpecificationsData((prev) =>
                    prev.map((item) =>
                        item.id === updateNum
                            ? {
                                  ...item,
                                  images: [...new Set([String(specification.id)])].join(","),
                              }
                            : item
                    )
                );

            }
        }
    }, [specification]);




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
                                    data-valueset={spec.images ?? ""}
                                    className="template-btn btn btn-success open-gallery-sec"
                                    onClick={(e) => handleImageSelection(e, index)}
                                    data-type="multiple"
                                    data-previewid={`specification-banner-preview-${index}`}
                                    data-value="specification"
                                    data-action="edit"
                                    data-path={
                                        SpecViewImage[index] && Array.isArray(SpecViewImage[index])
                                            ? SpecViewImage[index].map((image) => `${apiUrl}${image.file_path}`).join(', ')
                                            : ''
                                    }
                                >
                                    + Select Specification Images
                                </Button>
                                <div id={`specification-banner-preview-${index}`} className="imageListClass">
                                    {SpecViewImage[index] &&
                                        SpecViewImage[index].map((image, imageIndex) => (
                                            <div className="image-preview-single" key={`spec-${index}-img-${imageIndex}`}>
                                                <img
                                                    src={`${apiUrl}${image.file_path}`}
                                                    alt={image.title}
                                                    className="img-thumbnail"
                                                    style={{ width: '175px', height: 'auto' }}
                                                />
                                                <span
                                                    onClick={() => handleRemovespec(index, imageIndex)}
                                                    className="image-remove"
                                                >
                                                    X
                                                </span>
                                            </div>
                                        ))}
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
                    <button type="button" onClick={handleSubmit} className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SpecificationEdit;
