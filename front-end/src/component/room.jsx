import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { destroyRoom, indexRooms, storeRoom, updateRoom } from '../api/room';
import checkAuth from '../hoc/checkAuth';
import Icon from '../icon/addicon.png';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './style.css';

function Rooms() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [warnings, setWarnings] = useState({});
  const [createDialog, setCreateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [editDialog, setEditDialog] = useState(null);
  const [cookies] = useCookies();
  const user = useSelector((state) => state.auth.user);

  const [newRoom, setNewRoom] = useState({
    type_of_room_id: '',
    room_number: '',
    status: '',
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'room_type_id', headerName: 'Room Type ID', width: 150 },
    { field: 'room_number', headerName: 'Room Number', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Button onClick={() => setEditDialog({ ...params.row })} variant="contained" color="warning" startIcon={<EditIcon />}>
            Edit
          </Button>
          <Button
            onClick={() => setDeleteDialog(params.row.id)}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Box>
      ),
      width: 250,
      hideable: false,
    },
  ];

  const refreshData = () => {
    indexRooms(cookies.AUTH_TOKEN).then((res) => {
      if (res?.ok) {
        setRows(res.data);
      } else {
        toast.error(res?.message ?? 'Something went wrong');
      }
    });
  };

  useEffect(() => {
    refreshData();
  }, []);

  const onCreate = (e) => {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
      const body = {
        type_of_room_id: newRoom.type_of_room_id,
        room_number: newRoom.room_number,
        status: newRoom.status,
      };

      storeRoom(body, cookies.AUTH_TOKEN)
        .then((res) => {
          if (res?.ok) {
            toast.success(res?.message ?? 'Room has been created');
            setCreateDialog(false);
            setNewRoom({ type_of_room_id: '', room_number: '', status: '' });
            refreshData();
          } else {
            toast.error(res?.message ?? 'Something went wrong');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onDelete = () => {
    if (!loading) {
      setLoading(true);
      destroyRoom(deleteDialog, cookies.AUTH_TOKEN)
        .then((res) => {
          if (res?.ok) {
            toast.success(res?.message ?? 'Room has been deleted');
            refreshData();
            setDeleteDialog(null);
          } else {
            toast.error('Something went wrong');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onEdit = (e) => {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
      const updatedRoom = {
        type_of_room_id: editDialog.type_of_room_id,
        room_number: editDialog.room_number,
        status: editDialog.status,
      };

      updateRoom(updatedRoom, editDialog.id, cookies.AUTH_TOKEN)
        .then((res) => {
          if (res?.ok) {
            toast.success(res?.message ?? 'Room has been updated');
            refreshData();
            setEditDialog(null);
          } else {
            toast.error('Something went wrong');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Box>
      {user && (
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'start', py: 2, alignItems: 'center' }}>
            <Typography id="crud-name" variant="h4" sx={{ justifyContent: 'start' }}>
              Rooms
            </Typography>
            <Button sx={{ ml: 'auto' }} onClick={() => setCreateDialog(true)}>
              <img id="icon-img" src={Icon} alt="Add Icon" />
            </Button>
          </Box>

          <DataGrid
            columns={columns}
            rows={rows}
            sx={{ height: '500px', border: '2px solid black' }}
          />

          {/* Create Room Dialog */}
          <Dialog open={createDialog} onClose={() => setCreateDialog(false)}>
            <DialogTitle sx={{ backgroundColor: '#00FF00' }}>Create Room</DialogTitle>
            <DialogContent>
              <form onSubmit={onCreate} sx={{ width: 300, mx: 'auto' }}>
                <TextField
                  required
                  id="type_of_room_id"
                  fullWidth
                  size="small"
                  label="Type of Room ID"
                  value={newRoom.type_of_room_id}
                  onChange={(e) =>
                    setNewRoom((prev) => ({
                      ...prev,
                      type_of_room_id: e.target.value,
                    }))
                  }
                />
                <TextField
                  required
                  id="room_number"
                  fullWidth
                  size="small"
                  label="Room Number"
                  value={newRoom.room_number}
                  onChange={(e) =>
                    setNewRoom((prev) => ({
                      ...prev,
                      room_number: e.target.value,
                    }))
                  }
                />
                <TextField
                  required
                  id="status"
                  fullWidth
                  size="small"
                  label="Status"
                  value={newRoom.status}
                  onChange={(e) =>
                    setNewRoom((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                />
                <DialogActions sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                  <Button onClick={() => setCreateDialog(false)} color="info">
                    Close
                  </Button>
                  <Button type="submit" disabled={loading}>
                    Create
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>

          {/* Delete Room Dialog */}
          <Dialog open={Boolean(deleteDialog)} onClose={() => setDeleteDialog(null)}>
            <DialogTitle>Delete Room</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete this room?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button disabled={loading} onClick={() => setDeleteDialog(null)} variant="contained" color="inherit">
                Cancel
              </Button>
              <Button disabled={loading} onClick={onDelete} variant="contained" color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          {/* Edit Room Dialog */}
          <Dialog open={Boolean(editDialog)} onClose={() => setEditDialog(null)}>
            <DialogTitle>Edit Room</DialogTitle>
            <DialogContent>
              <form onSubmit={onEdit} sx={{ width: 300, mx: 'auto' }}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  label="Type of Room ID"
                  value={editDialog?.type_of_room_id ?? ''}
                  onChange={(e) =>
                    setEditDialog((prev) => ({
                      ...prev,
                      type_of_room_id: e.target.value,
                    }))
                  }
                />
                <TextField
                  required
                  fullWidth
                  size="small"
                  label="Room Number"
                  value={editDialog?.room_number ?? ''}
                  onChange={(e) =>
                    setEditDialog((prev) => ({
                      ...prev,
                      room_number: e.target.value,
                    }))
                  }
                />
                <TextField
                  required
                  fullWidth
                  size="small"
                  label="Status"
                  value={editDialog?.status ?? ''}
                  onChange={(e) =>
                    setEditDialog((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                />
                <DialogActions sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                  <Button onClick={() => setEditDialog(null)}>
                    Close
                  </Button>
                  <Button type="submit" disabled={loading}>
                    Submit
                  </Button>
                </DialogActions>
             
                </form>
            </DialogContent>
          </Dialog>
        </Box>
      )}
    </Box>
  );
}

export default checkAuth(Rooms);
