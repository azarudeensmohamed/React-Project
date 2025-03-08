import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Faq = ({ Faq, setFeatures,handleSubmit }) => {
  const [tower, setTower] = useState({ question: "", answer: "" });

  const handleTowerChange = (field, value) => {
    setTower((prev) => ({ ...prev, [field]: value }));
  };

  const addFaq = () => {
    if (tower.question.trim() && tower.answer.trim()) {
      const newFeature = { id: Date.now(), question: tower.question, answer: tower.answer };
      setFeatures((prev) => [newFeature, ...prev]);
      setTower({ question: "", answer: "" });
    }
  };

  const removeFaq = (id) => {
    setFeatures((prev) => prev.filter((feature) => feature.id !== id));
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    const reordered = [...Faq];
    const [removed] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, removed);
    setFeatures(reordered);
  };

  return (
    <div className="card card-tap-height">
      <div className="card-header border-bottom border-dashed d-flex justify-content-between">
        <h4 className="card-title mb-0">Project Features</h4>
        <button className="btn btn-primary" type="button" onClick={addFaq}>
          <FaPlusCircle /> Add Feature
        </button>
      </div>

      <div className="card-body row">
        {["question", "answer"].map((field) => (
          <div key={field} className="form-group col-6">
            <label className="text-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <textarea
              className="form-control"
              value={tower[field]}
              onChange={(e) => handleTowerChange(field, e.target.value)}
            />
          </div>
        ))}

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="features" direction="vertical">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="col-12">
                {Faq.map((faq, index) => (
                  <Draggable key={faq.id} draggableId={String(faq.id)} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="col-12 mt-2"
                      >
                        <div className="row align-items-center p-2 border rounded" style={{position:'relative'}}>
                          <div className="col-md-6">
                            <label className="text-label">Question</label>
                            <textarea className="form-control" value={faq.question} disabled />
                          </div>
                          <div className="col-md-6">
                            <label className="text-label">Answer</label>
                            <textarea className="form-control" value={faq.answer} disabled />
                          </div>
                          <div className="text-end" style={{position:'absolute',top:"4px",left:'5px'}}>
                            <button className="btn btn-sm btn-danger" onClick={() => removeFaq(faq.id)}>
                              <IoClose />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="card-footer">
        <button className="btn btn-primary" onClick={handleSubmit} type="button">Submit</button>
      </div>
    </div>
  );
};

export default Faq;
