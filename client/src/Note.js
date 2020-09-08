import React, { useState } from 'react';

const Note = ({ index, title, text, removeNote, updateNote }) => {
  // editable state
  const [editable, setEditable] = useState(false);
  // edit handler
  const handleEdit = () => {
    console.log(editable); // DEBUG
    setEditable(!editable);
  };
  // save handler
  const handleSave = () => {
    updateNote(index, title, text);
    setEditable(!editable);
  };
  // render JSX
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title" contentEditable={editable}>{title}</h5>
        <p className="card-text" contentEditable={editable}>{text}</p>
        <button className="btn" hidden={editable} onClick={handleEdit}>
          <i className="text-secondary fa fa-pencil fa-lg"></i>
        </button>
        <button className="btn" hidden={!editable} onClick={handleSave}>
          <i className="text-secondary fa fa-save fa-lg"></i>
        </button>
        <button className="btn" onClick={() => removeNote(index)}>
          <i className="text-danger fa fa-trash fa-lg"></i>
        </button>
      </div>
    </div>
  );
};

export default Note;
