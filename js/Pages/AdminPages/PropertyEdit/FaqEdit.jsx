import React, { useState } from "react";
import { FaPlusCircle, FaEdit, FaSave } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const FaqEdit = ({ Faq, setfaqsData, handleSubmit }) => {
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [editingFaqId, setEditingFaqId] = useState(null);

  // Handle adding new FAQ
  const addFaq = () => {
    if (newFaq.question.trim() && newFaq.answer.trim()) {
      const faqToAdd = { id: Date.now().toString(), question: newFaq.question, answer: newFaq.answer };
      setfaqsData((prev) => [...prev, faqToAdd]);
      setNewFaq({ question: "", answer: "" });
    }
  };

  // Handle removing FAQ
  const removeFaq = (id) => {
    setfaqsData((prev) => prev.filter((faq) => faq.id !== id));
    if (editingFaqId === id) setEditingFaqId(null);
  };

  // Handle updating FAQ
  const updateFaq = (id, field, value) => {
    setfaqsData((prev) =>
      prev.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq))
    );
  };

  // Save the edited FAQ
  const saveFaq = () => {
    setEditingFaqId(null);
  };

  // Handle drag and drop
  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const reordered = Array.from(Faq);
    const [movedItem] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, movedItem);

    setfaqsData(reordered);
  };

  return (
    <div className="card card-tap-height">
      {/* New FAQ Form */}
      <div className="card-header border-bottom border-dashed d-flex justify-content-between">
        <h4 className="card-title mb-0">Project Features</h4>
        <button className="btn btn-primary" type="button" onClick={addFaq}>
          <FaPlusCircle /> Add Feature
        </button>
      </div>

      <div className="card-body row">
        {["question", "answer"].map((field) => (
          <div key={field} className="form-group col-6">
            <label className="text-label">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <textarea
              className="form-control"
              value={newFaq[field]}
              onChange={(e) => setNewFaq((prev) => ({ ...prev, [field]: e.target.value }))}
            />
          </div>
        ))}

        {/* Drag and Drop List */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="features" direction="vertical">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="col-12">
                {Faq.map((faq, index) => (
                  <Draggable key={faq.id} draggableId={String(faq.id)} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`col-12 mt-2 draggable-item ${snapshot.isDragging ? "dragging" : ""}`}
                      >
                        <div className="row align-items-center">
                          <div className="col-md-6">
                            <label className="text-label">Question</label>
                            <textarea
                              className="form-control"
                              value={faq.question}
                              onChange={(e) => updateFaq(faq.id, "question", e.target.value)}
                              disabled={editingFaqId !== faq.id}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="text-label">Answer</label>
                            <textarea
                              className="form-control"
                              value={faq.answer}
                              onChange={(e) => updateFaq(faq.id, "answer", e.target.value)}
                              disabled={editingFaqId !== faq.id}
                            />
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ position: "absolute", top: "4px", right: "4px" }}>
                          {editingFaqId === faq.id ? (
                            <button className="btn btn-sm btn-success me-2" type="button" onClick={saveFaq}>
                              <FaSave />
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-sm btn-warning me-2"
                              onClick={() => setEditingFaqId(faq.id)}
                            >
                              <FaEdit />
                            </button>
                          )}
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => removeFaq(faq.id)}
                          >
                            <IoClose />
                          </button>
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
        <button className="btn btn-primary" onClick={handleSubmit} type="button">
          Submit
        </button>
      </div>

      {/* Smooth Dragging CSS */}
      <style>
        {`
          .draggable-item {
            position: relative;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 8px;
            background: #fff;
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          }

          .draggable-item.dragging {
            transform: scale(1.05);
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </div>
  );
};

export default FaqEdit;
