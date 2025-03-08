import React, { useState,useEffect  } from 'react';
import Button from 'react-bootstrap/Button';

const CurrentStatus = ({
    towers,
    openModalExternally,
    setTowers,
    selectionAction,
    currentStatus,
    selectionValue,
    handleSubmit,
}) => {

      const [activeTower, setActiveTower] = useState(1);

      // Function to add a new tower.
      const addTower = () => {
        const newId = towers.length + 1;
        const newTower = {
          id: newId,
          currentTitle: '',
          date: '',
          ImageID: [],
        };
        setTowers([...towers, newTower]);
        setActiveTower(newId);
      };

      // Handler to update tower properties.
      const handleTowerChange = (id, field, value) => {
        setTowers(
          towers.map((tower) =>
            tower.id === id ? { ...tower, [field]: value } : tower
          )
        );
      };

      useEffect(() => {
        if (currentStatus && currentStatus.name && currentStatus.id) {
          const element = document.querySelector(
            `[data-previewid="${currentStatus.name}"]`
          );
          if (element) {
            element.setAttribute('data-valueset', currentStatus.id);
            element.setAttribute('data-path', currentStatus.Path || '');
          }
          setTowers((prevTowers) =>
            prevTowers.map((tower) =>
              tower.id === activeTower
                ? {
                    ...tower,
                    ImageID: Array.isArray(currentStatus.id)
                      ? currentStatus.id
                      : [currentStatus.id],
                  }
                : tower
            )
          );
        }
      }, [currentStatus, activeTower]);

  return (
    <div className="card card-tap-height">
      <div className="card-header border-bottom border-dashed">
        <h4 className="card-title mb-0">Project Current Status</h4>
        <button className="btn btn-success float-end" type="button" onClick={addTower}>
          +
        </button>
      </div>
      <div className="card-body">
        <div id="Floor-Plan">
          <div className="row mb-3">
            <label htmlFor="current-status-lenght" className="col-2">Current Status tabs</label>
            <input
              type="number"
              className="form-control col-4"
              name="tab-count"
              min="1"
              value={towers.length}
              id="current-status-lenght"
              readOnly
              style={{ width: '20%' }}
            />
          </div>
          <div className="default-tab">
            <ul className="nav nav-tabs" role="tablist">
              {towers.map((tower) => (
                <li key={tower.id} className="nav-item">
                  <a
                    className={`nav-link ${activeTower === tower.id ? 'active' : ''}`}
                    onClick={() => setActiveTower(tower.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    Block {String.fromCharCode(64 + tower.id)}
                  </a>
                </li>
              ))}
            </ul>
            {/* Tab Content */}
            <div className="tab-content">
              {towers.map((tower) => (
                <div
                  key={tower.id}
                  className={`tab-pane fade ${activeTower === tower.id ? 'active show' : ''}`}
                  role="tabpanel"
                >
                  <div className="col-lg-12 mb-2">
                    <div className="form-group mb-2">
                      <label htmlFor={`current-status${tower.id}`} className="text-label">Current status Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={tower.currentTitle}
                        id={`current-status${tower.id}`}
                        name="currentTitle"
                        onChange={(e) =>
                          handleTowerChange(tower.id, 'currentTitle', e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor={`date${tower.id}`} className="text-label">Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={tower.date}
                        id={`date${tower.id}`}
                        name="date"
                        onChange={(e) =>
                          handleTowerChange(tower.id, 'date', e.target.value)
                        }
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 col-12 ">
                      <div className="mb-3">
                        <input type="hidden" name="current_status" id={`current-status${tower.id}`} />
                        <Button
                          type="button"
                          className="template-btn btn btn-success open-gallery-sec"
                          data-value="current status"
                          data-type="multiple"
                          onClick={(e) => openModalExternally(e)}
                          data-valueset=""
                          data-previewid={`current-status-preview${tower.id}`}
                          data-action="add"
                        >
                          + Select gallery Image
                        </Button>
                        <div
                          id={`current-status-preview${tower.id}`}
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

export default CurrentStatus
