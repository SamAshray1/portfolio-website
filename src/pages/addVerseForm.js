import React, { useState } from 'react';

function AddVerseForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    book: '',
    chapter: '',
    verse: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch('http://localhost:8080/add-verse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Form submitted successfully:', data);
          // Reset form state if needed
          setFormData({ name: '', email: '' });
        } else {
          console.error('Error submitting form:', response.statusText);
          // Handle errors as needed
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle errors as needed
      }
  };

  return (
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddVerseForm;