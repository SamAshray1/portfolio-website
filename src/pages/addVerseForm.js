import React, { useState } from 'react';

function AddVerseForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    book: '',
    chapter: '',
    verse: '',
    key: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/references/add-verse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${formData.key}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Check for errors in the response body (assuming an "error" field)
        if (data.error) {
          console.error('Error submitting form:', data.error);
          setResponseMessage(data.error); // Update message with backend error
        } else {
          console.log('Form submitted successfully:', data);
          setFormData({ book: '', chapter: '', verse: '', key: '' });
          setResponseMessage(data.message); // Update message with success message
        }
      } else {
        const errorData = await response.json();
        console.error('Error submitting form:', errorData.message);
        setResponseMessage(errorData.message); // Update message with generic error
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponseMessage('Error: ' + error.message); // Update message with generic error
    }
  };
  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Book:
          <input type="text" name="book" value={formData.book} onChange={handleChange} />
        </label>
        <label>
          Chapter:
          <input type="text" name="chapter" value={formData.chapter} onChange={handleChange} />
        </label>
        <label>
          Verse:
          <input type="text" name="verse" value={formData.verse} onChange={handleChange} />
        </label>
        <label>
          Key:
          <input type="text" name="key" value={formData.key} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </>
  );
}

export default AddVerseForm;
