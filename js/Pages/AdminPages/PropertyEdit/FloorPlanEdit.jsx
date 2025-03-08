import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const FloorPlanEdit = ({
  floorTowers,
  openModalExternally,
  setFloorTowers,
  setfloorImages,
  floorImages,
  handleRemove,
  handleSubmit,
}) => {

  const [activeFloorTower, setActiveFloorTower] = useState(1);
  const apiUrl = import.meta.env.VITE_API_URL;

  const addTower = () => {
    const newId = floorTowers.length + 1;
    const newTower = {
      id: newId,
      title: '',
      floorID: [],
    };
    setFloorTowers([...floorTowers, newTower]);
    setActiveFloorTower(newId);
  };

  const handleTowerChange = (id, field, value) => {
    setFloorTowers(
      floorTowers.map((floor) =>
        floor.id === id ? { ...floor, [field]: value } : floor
      )
    );
  };


  const handleRemoveset = (towerIndex, imageIndex) => {
    setfloorImages((prevImages) => {
      const updatedTowerImages = [...prevImages[towerIndex]];
      updatedTowerImages.splice(imageIndex, 1);
      const newState = [...prevImages];
      newState[towerIndex] = updatedTowerImages;
      return newState;
    });
  };


  useEffect(() => {
    if (floorImages && floorImages.name && floorImages.id) {
      const element = document.querySelector(`[data-previewid="${floorImages.name}"]`);
      if (element) {
        element.setAttribute('data-valueset', floorImages.id);
        element.setAttribute('data-path', floorImages.Path || '');
      }

      setFloorTowers((prevTowers) =>
        prevTowers.map((floor) =>
          floor.id === activeFloorTower
            ? {
                ...floor,
                floorID: Array.isArray(floorImages.id) ? floorImages.id : [floorImages.id],
              }
            : floor
        )
      );
    }
  }, [floorImages, activeFloorTower]);

  return (
    <div className="card card-tap-height">
      <div className="card-header border-bottom border-dashed">
        <h4 className="card-title mb-0">Project FloorPlan</h4>
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
            <label htmlFor="tower-lenght-floor" className="col-2">
              FloorPlan Status tabs
            </label>
            <input
              type="number"
              className="form-control col-4"
              name="tab-count"
              min="1"
              id="tower-lenght-floor"
              value={floorTowers.length}
              readOnly
              style={{ width: '20%' }}
            />
          </div>
          <div className="default-tab">
            <ul className="nav nav-tabs" role="tablist">
              {floorTowers.map((tower) => (
                <li key={tower.id} className="nav-item">
                  <a
                    className={`nav-link ${activeFloorTower === tower.id ? 'active' : ''}`}
                    onClick={() => setActiveFloorTower(tower.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {tower.title ?? 'Block'}
                  </a>
                </li>
              ))}
            </ul>
            {/* Tab Content */}
            <div className="tab-content">
              {floorTowers.map((tower,towerIndex) => (
                <div
                  key={tower.id}
                  className={`tab-pane fade ${activeFloorTower === tower.id ? 'active show' : ''}`}
                  role="tabpanel"
                >
                  <div className="col-lg-12 mb-2">
                    <div className="form-group mb-2">
                      <label htmlFor={`floor-title${tower.id}`} className="text-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={tower.title}
                        id={`floor-title${tower.id}`}
                        onChange={(e) =>
                          handleTowerChange(tower.id, 'title', e.target.value)
                        }
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="mb-3">
                        <input
                          type="hidden"
                          name="floor_img"
                          id={`floor-image${tower.id}`}
                        />
                        <Button
                          type="button"
                          className="template-btn btn btn-success open-gallery-sec"
                          data-value="floorplan"
                          data-type="multiple"
                          onClick={(e) => openModalExternally(e)}
                          data-valueset={tower.images}
                          data-previewid={`floor-image-preview${tower.id}`}
                          data-action="edit"
                          data-path={
                            floorImages[towerIndex] && Array.isArray(floorImages[towerIndex])
                              ? floorImages[towerIndex]
                                  .map(image => `${apiUrl}${image.file_path}`)
                                  .join(', ')
                              : ''
                          }

                        >
                          + Select gallery Image
                        </Button>
                        <div id={`floor-image-preview${tower.id}`} className="imageListClass">
                        {floorImages && floorImages[towerIndex] && (
                            (Array.isArray(floorImages[towerIndex])
                            ? floorImages[towerIndex]
                            : [floorImages[towerIndex]]
                            ).map((image, imgIndex) => (
                            <div className="image-preview" key={`${towerIndex}-${imgIndex}`}>
                                <img
                                src={`${apiUrl}${image.file_path}`}
                                alt={image.title}
                                className="img-thumbnail"
                                style={{ width: '175px', height: 'auto' }}
                                />
                                <span
                                onClick={() => handleRemoveset(towerIndex, imgIndex)}
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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

export default FloorPlanEdit;
