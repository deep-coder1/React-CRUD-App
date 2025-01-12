import { Container } from '@mui/material';
import './App.css';
import Navbar from './components/Navbar';
import ItemList from './components/ItemList';
import { useState } from 'react';
import AddEditForm from './components/AddEditForm';

function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEdit = (item) => {
    setSelectedItem(null);
  };

  const handleFormSubmit = () => {
    setSelectedItem(null);
  };
  
  return (
    <div className="App">
      <Navbar />
      <Container style={{ marginTop: 20 }}>
        <AddEditForm
          selectedItem={selectedItem}
          onFormSubmit={handleFormSubmit}
        />
        <ItemList onEdit={handleEdit} />
      </Container>
    </div>
  );
}

export default App;
