import { Button, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { addItem, editItem } from '../services/api';

const AddEditForm = ({ selectedItem, onFormSubmit }) => {
    const [formData, setFormData] = useState({ title: '' });

    useEffect(() => {
        if (selectedItem) {
            setFormData(selectedItem);
        } else {
            setFormData({ title: '' });
        }
    }, [selectedItem]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedItem) {
            await editItem(selectedItem.id, formData);
        } else {
            await addItem(formData);
        }
        onFormSubmit();
        setFormData({ title: '' })
    }


  return (
    <Paper style={{ padding: 20, marginBottom: 20 }} >
        <form onSubmit={handleSubmit}>
            <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                margin='normal'
            />
            <Button type='submit' varient="contained" color='primary'>
                {selectedItem ? 'Update' : 'Add'}
            </Button>
        </form>
    </Paper>
  );
}

export default AddEditForm

// rafce 