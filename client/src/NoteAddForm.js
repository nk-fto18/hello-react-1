import React from 'react';

const NoteAddForm = (props) => {
  return (
    <form>
      <input type="text" />
      <br />
      <textarea></textarea>
      <br />
      <input type="submit" value="Guardar"/>
    </form>
  );
};

export default NoteAddForm;
