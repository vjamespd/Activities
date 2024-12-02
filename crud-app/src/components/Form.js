import React, { useState, useEffect } from 'react';

const Form = ({ addItem, editItem, currentItem }) => {
  const [item, setItem] = useState({ name: '', age: '' });

  useEffect(() => {
    if (currentItem.id) {
      setItem(currentItem);
    } else {
      setItem({ name: '', age: '' });
    }
  }, [currentItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentItem.id) {
      editItem(item);
    } else {
      addItem(item);
    }
    setItem({ name: '', age: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={item.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={item.age}
        onChange={handleChange}
        required
      />
      <button type="submit">{currentItem.id ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default Form;
