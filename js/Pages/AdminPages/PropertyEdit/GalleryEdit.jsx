import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

const GalleryEdit = ({
  galleryTowers,
  openModalExternally,
  setGalleryTowers,
  setGalleryImage,
  galleryImage,
  selectionValue,
  handleSubmit,
}) => {
  const [activeGalleryTower, setActiveGalleryTower] = useState(1);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Add New Tower
  const addTower = () => {
    const towersArray = Array.isArray(galleryTowers) ? galleryTowers : [];
    const newId = towersArray.length + 1;
    const newTower = {
      id: newId,
      gallery_name: "",
      gallery_title: "",
      image_id: [],
    };
    setGalleryTowers([...towersArray, newTower]);
    setActiveGalleryTower(newId);
  };

  // Handle Input Changes in Towers
  const handleTowerChange = (id, field, value) => {
    setGalleryTowers((prevTowers) =>
      prevTowers.map((gallery) =>
        gallery.id === id ? { ...gallery, [field]: value } : gallery
      )
    );
  };

  // Remove Image from Gallery
  const handleRemovegallery = (towerIndex, imageIndex) => {
    setGalleryImage((prevImages) => {
      const updatedTowerImages = [...prevImages];
      updatedTowerImages[towerIndex] = updatedTowerImages[towerIndex].filter(
        (_, idx) => idx !== imageIndex
      );
      return updatedTowerImages;
    });
  };

  // Effect to Handle Image Selection
  useEffect(() => {
    if (galleryImage && galleryImage.name && galleryImage.id) {
      const element = document.querySelector(
        `[data-previewid="${galleryImage.name}"]`
      );
      if (element) {
        element.setAttribute("data-valueset", galleryImage.id);
        element.setAttribute("data-path", galleryImage.Path || "");
      }

      setGalleryTowers((prevTowers) =>
        prevTowers.map((gallery) =>
          gallery.id === activeGalleryTower
            ? {
                ...gallery,
                galleryID: Array.isArray(galleryImage.id)
                  ? galleryImage.id
                  : [galleryImage.id],
              }
            : gallery
        )
      );
    }
  }, [galleryImage, activeGalleryTower]);

  return (
    <div className="card card-tap-height">
      <div className="card-header border-bottom border-dashed">
        <h4 className="card-title mb-0">Project Gallery</h4>
        <button
          className="btn btn-success float-end"
          type="button"
          onClick={addTower}
        >
          +
        </button>
      </div>

      <div className="card-body">
        <div id="Floor-Plan">
          <div className="row mb-3">
            <label htmlFor="tower-length" className="col-2">
              Gallery Status Tabs
            </label>
            <input
              type="number"
              className="form-control col-4"
              name="tab-count"
              min="1"
              value={galleryTowers.length}
              id="tower-length"
              readOnly
              style={{ width: "20%" }}
            />
          </div>

          <div className="default-tab">
            {/* Tab Navigation */}
            <ul className="nav nav-tabs" role="tablist">
              {galleryTowers.map((gallery) => (
                <li key={gallery.id} className="nav-item">
                  <a
                    className={`nav-link ${
                      activeGalleryTower === gallery.id ? "active" : ""
                    }`}
                    onClick={() => setActiveGalleryTower(gallery.id)}
                    style={{ cursor: "pointer" }}
                  >
                    Block {String.fromCharCode(64 + gallery.id)}
                  </a>
                </li>
              ))}
            </ul>

            {/* Tab Content */}
            <div className="tab-content">
              {galleryTowers.map((gallery, towerIndex) => (
                <div
                  key={gallery.id}
                  className={`tab-pane fade ${
                    activeGalleryTower === gallery.id ? "active show" : ""
                  }`}
                  role="tabpanel"
                >
                  <div className="col-lg-12 mb-2">
                    {/* Block Name Input */}
                    <div className="form-group mb-2">
                      <label className="text-label">Block Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={gallery.gallery_name}
                        onChange={(e) =>
                          handleTowerChange(
                            gallery.id,
                            "gallery_name",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    {/* Title Input */}
                    <div className="form-group mb-2">
                      <label
                        htmlFor={`gallery-title${gallery.id}`}
                        className="text-label"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={gallery.gallery_title}
                        id={`gallery-title${gallery.id}`}
                        onChange={(e) =>
                          handleTowerChange(
                            gallery.id,
                            "gallery_title",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    {/* Gallery Image Selection */}
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="mb-3">
                        <input
                          type="hidden"
                          name="gallery_img"
                          id={`gallery-image${gallery.id}`}
                        />

                        {/* Image Selection Button */}
                        <Button
                          type="button"
                          className="template-btn btn btn-success open-gallery-sec"
                          data-type="multiple"
                          data-valueset={gallery.image_id}
                          data-previewid={`gallery-image-preview${gallery.id}`}
                          onClick={(e) => openModalExternally(e)}
                          data-action="edit"
                          data-value="gallery"
                          data-path={
                            galleryImage[towerIndex] &&
                            Array.isArray(galleryImage[towerIndex])
                              ? galleryImage[towerIndex]
                                  .map((image) => `${apiUrl}${image.file_path}`)
                                  .join(", ")
                              : ""
                          }
                        >
                          + Select Gallery Image
                        </Button>

                        {/* Image Preview */}
                        <div
                          id={`gallery-image-preview${gallery.id}`}
                          className="imageListClass"
                        >
                          {galleryImage &&
                            galleryImage[towerIndex] &&
                            galleryImage[towerIndex].length > 0 &&
                            galleryImage[towerIndex].map((image, imgIndex) => (
                              <div
                                className="image-preview"
                                key={`${towerIndex}-${imgIndex}`}
                              >
                                <img
                                  src={`${apiUrl}${image.file_path}`}
                                  alt={image.title}
                                  className="img-thumbnail"
                                  style={{ width: "175px", height: "auto" }}
                                />
                                <span
                                  onClick={() =>
                                    handleRemovegallery(towerIndex, imgIndex)
                                  }
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="col-lg-4 col-md-4 col-12">
        <div className="mb-3">
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryEdit;
