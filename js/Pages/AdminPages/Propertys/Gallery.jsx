import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const Gallery = ({
    galleryTowers,
    openModalExternally,
    setGalleryTowers,
    selectionAction,
    galleryImage,
    selectionValue,
    handleSubmit,
}) => {


      const [activeGalleryTower, setActiveGalleryTower] = useState(1);

      const addTower = () => {
        const newId = galleryTowers.length + 1;
        const newTower = {
          id: newId,
          galleryName: '',
          gallerytitle: '',
          galleryID: [],
        };
        setGalleryTowers([...galleryTowers, newTower]);
        setActiveGalleryTower(newId);
      };

      const handleTowerChange = (id, field, value) => {
        setGalleryTowers(
          galleryTowers.map((gallery) =>
            gallery.id === id ? { ...gallery, [field]: value } : gallery
          )
        );
      };

      useEffect(() => {
        if (galleryImage && galleryImage.name && galleryImage.id) {
          // Use the active tab's preview element (assumed unique)
          const element = document.querySelector(
            `[data-previewid="${galleryImage.name}"]`
          );
          if (element) {
            element.setAttribute('data-valueset', galleryImage.id);
            element.setAttribute('data-path', galleryImage.Path || '');
          }
          // Update state only for the active gallery tower
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
      }, [galleryImage]);

  return (
    <div className="card card-tap-height">
      <div className="card-header border-bottom border-dashed">
        <h4 className="card-title mb-0">Project Gallery</h4>
        <button className="btn btn-success float-end" type="button" onClick={addTower}>
          +
        </button>
      </div>
      <div className="card-body">
        <div id="Floor-Plan">
          <div className="row mb-3">
            <label htmlFor='tower-lenght' className="col-2">Gallery Status tabs</label>
            <input
              type="number"
              className="form-control col-4"
              name="tab-count"
              min="1"
              value={galleryTowers.length}
              id="tower-lenght"
              readOnly
              style={{ width: '20%' }}
            />
          </div>
          <div className="default-tab">
            <ul className="nav nav-tabs" role="tablist">
              {galleryTowers.map((gallery) => (
                <li key={gallery.id} className="nav-item">
                  <a
                    className={`nav-link ${activeGalleryTower === gallery.id ? 'active' : ''}`}
                    onClick={() => setActiveGalleryTower(gallery.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    Block {String.fromCharCode(64 + gallery.id)}
                  </a>
                </li>
              ))}
            </ul>

            <div className="tab-content">
              {galleryTowers.map((gallery) => (
                <div
                  key={gallery.id}
                  className={`tab-pane fade ${activeGalleryTower === gallery.id ? 'active show' : ''}`}
                  role="tabpanel"
                >
                  <div className="col-lg-12 mb-2">
                    <div className="form-group mb-2">
                      <label className="text-label">Block Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={gallery.galleryName}
                        onChange={(e) =>
                          handleTowerChange(gallery.id, 'galleryName', e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor={`gallery-title${gallery.id}`} className="text-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={gallery.gallerytitle}
                        id={`gallery-title${gallery.id}`}
                        onChange={(e) =>
                          handleTowerChange(gallery.id, 'gallerytitle', e.target.value)
                        }
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 col-12 ">
                      <div className="mb-3">
                        <input type="hidden" name="gallery_img" id={`gallery-image${gallery.id == undefined ? '1' : gallery.id}`} />
                       <Button
                        type="button"
                        className="template-btn btn btn-success open-gallery-sec"
                        data-type="multiple"
                        data-valuesetid="galllery-banner"
                        data-previewid={`gallery-image-preview${gallery.id}`}
                        onClick={(e) => openModalExternally(e)}
                        data-action="add"
                        data-value="gallery"
                        >
                        + Select gallery Image
                        </Button>

                        <div
                        id={`gallery-image-preview${gallery.id}`}
                        className="imageListClass"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
        <div className="col-lg-4 col-md-4 col-12">
            <div className="mb-3">
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>submit</button>
            </div>
        </div>
    </div>
  );
};

export default Gallery;
