import React, { useState } from 'react';

const NoteAddForm = ({ addNote }) => {
  // state hook
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  // handlers
  const handleSubmit = e => {
    e.preventDefault();
    addNote({
      title: title,
      text: text
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <br />
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
      >
      </textarea>
      <br />
      <input type="submit" value="Guardar"/>
    </form>
  );
};

export default NoteAddForm;
