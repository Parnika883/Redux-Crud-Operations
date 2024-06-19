import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, editItem, deleteItem, setItems } from './itemsSlice';

const App = () => {
  const items = useSelector((state) => state.items.items);
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState({ name: '', brand: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = newItem.id || new Date().getTime(); // For demo purposes, using timestamp as ID
    if (newItem.id) {
      dispatch(editItem({ ...newItem, id }));
    } else {
      dispatch(addItem({ ...newItem, id }));
    }
    setNewItem({ name: '', brand: '' });
  };

  const handleEdit = (item) => {
    setNewItem(item);
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.brand}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleInputChange}
          placeholder="Item Name"
        />
        <input
          type="text"
          name="brand"
          value={newItem.brand}
          onChange={handleInputChange}
          placeholder="Brand"
        />
        <button type="submit">{newItem.id ? 'Edit' : 'Add'} Item</button>
      </form>
    </div>
  );
};

export default App;