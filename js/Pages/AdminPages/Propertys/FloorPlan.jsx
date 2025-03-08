import React, { useState ,useEffect  } from 'react';
import Button from 'react-bootstrap/Button';

const FloorPlan = ({
    floorTowers,
    openModalExternally,
    setFloorTowers,
    selectionAction,
    floorimage,
    selectionValue,
    handleSubmit,
}) => {


      const [activeFloorTower, setActiveFloorTower] = useState(1);

      const addTower = () => {
        const newId = floorTowers.length + 1;
        const newTower = {
          id: newId,
          floorName: '',
          floortitle: '',
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

      useEffect(() => {
        if (floorimage && floorimage.name && floorimage.id) {
          // Find the preview element by its unique id.
          const element = document.querySelector(
            `[data-previewid="${floorimage.name}"]`
          );
          if (element) {
            element.setAttribute('data-valueset', floorimage.id);
            element.setAttribute('data-path', floorimage.Path || '');
          }
          // Update state only for the active floor tower.
          setFloorTowers((prevTowers) =>
            prevTowers.map((floor) =>
              floor.id === activeFloorTower
                ? {
                    ...floor,
                    floorID: Array.isArray(floorimage.id)
                      ? floorimage.id
                      : [floorimage.id],
                  }
                : floor
            )
          );
        }
      }, [floorimage, activeFloorTower]);

    //   console.log(floorTowers);

  return (
    <div className="card card-tap-height">
    <div className="card-header border-bottom border-dashed">
      <h4 className="card-title mb-0">Project FloorPlan</h4>
      <button className="btn btn-success float-end" type="button" onClick={addTower}>
        +
      </button>
    </div>
    <div className="card-body">
      <div id="Floor-Plan">
        <div className="row mb-3">
          <label htmlFor='tower-lenght-floor' className="col-2">FloorPlan Status tabs</label>
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
                  Block {String.fromCharCode(64 + tower.id)}
                </a>
              </li>
            ))}
          </ul>
          {/* Tab Content */}
          <div className="tab-content">
            {floorTowers.map((tower) => (
              <div
                key={tower.id}
                className={`tab-pane fade ${activeFloorTower === tower.id ? 'active show' : ''}`}
                role="tabpanel"
              >
                <div className="col-lg-12 mb-2">
                  <div className="form-group mb-2">
                    <label htmlFor={`block-name${tower.id}`} className="text-label">Block Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id={`block-name${tower.id}`}
                      value={tower.towerName}
                      onChange={(e) =>
                        handleTowerChange(tower.id, 'floorName', e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor={`floor-title${tower.id}`} className="text-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={tower.title}
                      id={`floor-title${tower.id}`}
                      onChange={(e) =>
                        handleTowerChange(tower.id, 'floortitle', e.target.value)
                      }
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 ">
                    <div className="mb-3">
                      <input type="hidden" name="floor_img" id={`floor-image${tower.id}`} />
                      <Button
                        type="button"
                        className="template-btn btn btn-success open-gallery-sec"
                        data-value="fllorpaln"
                        data-type="multiple"
                        onClick={(e) => openModalExternally(e)}
                        data-valueset=""
                        data-previewid={`floor-image-preview${tower.id}`}
                        data-action="add"
                      >
                        + Select gallery Image
                      </Button>
                      <div
                        id={`floor-image-preview${tower.id}`}
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
  )
}

export default FloorPlan
