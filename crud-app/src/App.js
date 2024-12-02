import React, { useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    id: null,
    name: "",
    age: "",
  });
  const addItem = (item) => {
    setData([...data, { id: Date.now(), ...item }]);
  };
  const editItem = (item) => {
    setData(data.map((d) => (d.id === item.id ? item : d)));
    setCurrentItem({ id: null, name: '', age: '' });
  };
  const deleteItem = (id) => {
    setData(data.filter((d) => d.id !== id));
  };
  const handleEdit = (item) => {
    setCurrentItem(item);
  };
  return (
    <div className="App">
      {" "}
      <h1>React CRUD App</h1>{" "}
      <Form addItem={addItem} editItem={editItem} currentItem={currentItem} />{" "}
      <Table data={data} deleteItem={deleteItem} handleEdit={handleEdit} />{" "}
    </div>
  );
};
export default App;
