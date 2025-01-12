import React, { useState, useEffect } from 'react';
import { getItems, deleteItem, editItem } from '../services/api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await getItems();
    setItems(response.data);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteItem(id);
        fetchItems();
        Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
      }
    });
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditTitle(item.title);
  };

  const handleSave = async (id) => {
    await editItem(id, { title: editTitle });
    setEditId(null);
    fetchItems();
    Swal.fire('Updated!', 'Your item has been updated.', 'success');
  };

  const handleCancel = () => {
    setEditId(null);
    setEditTitle('');
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                {editId === item.id ? (
                  <TextField
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    fullWidth
                  />
                ) : (
                  item.title
                )}
              </TableCell>
              <TableCell>
                {editId === item.id ? (
                  <>
                    <IconButton onClick={() => handleSave(item.id)}>
                      <CheckIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={handleCancel}>
                      <CloseIcon color="error" />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton onClick={() => handleEdit(item)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemList;
