// import React, { useEffect, useState } from 'react';
// import { getItems, deleteItem } from '../services/api';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   IconButton,
//   Pagination,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import Swal from 'sweetalert2';

// const ItemList = ({ onEdit }) => {
//   const [items, setItems] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5); // Items per page
//   const [editId, setEditId] = useState(null);
//   const [editTitle, setEditTitle] = useState('');

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     const response = await getItems();
//     setItems(response.data);
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You won\'t be able to revert this!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete it!',
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         await deleteItem(id);
//         fetchItems();
//         Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
//       }
//     });
//   };

//   // Get current items for the page
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   return (
//     <div>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Title</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {currentItems.map((item) => (
//               <TableRow key={item.id}>
//                 <TableCell>{item.id}</TableCell>
//                 <TableCell>{item.title}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => onEdit(item)}>
//                     <EditIcon color="primary" />
//                   </IconButton>
//                   <IconButton onClick={() => handleDelete(item.id)}>
//                     <DeleteIcon color="error" />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination */}
//       <Pagination
//         count={Math.ceil(items.length / itemsPerPage)}
//         page={currentPage}
//         onChange={handlePageChange}
//         style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}
//       />
//     </div>
//   );
// };

// export default ItemList;



import React, { useState, useEffect } from 'react';
// import { getItems, deleteItem, updateItem } from '../services/api';
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
  Pagination,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
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
            {currentItems.map((item) => (
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

      {/* Pagination Component */}
      <Pagination
        count={Math.ceil(items.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
};

export default ItemList;
