import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { indexRating, storeRating, destroyRating, updateRating } from '../api/rating';
import checkAuth from '../hoc/checkAuth';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function Rating() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [editDialog, setEditDialog] = useState(null);
  const [warnings, setWarnings] = useState({});

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    indexRating()
      .then((res) => {
        if (res.ok) {
          setRows(res.data);
        } else {
          toast.error(res.message ?? 'Failed to fetch ratings.');
        }
      })
      .catch((error) => {
        console.error('Failed to fetch ratings:', error.message);
        toast.error('Failed to fetch ratings.');
      });
  };

  const onCreate = (e) => {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
      const body = {
        type_of_room_id: parseInt(document.getElementById('type_of_room_id').value),
        rate: parseInt(document.getElementById('rate').value),
        comment: document.getElementById('comment').value,
      };

      storeRating(body)
        .then((res) => {
          if (res.ok) {
            toast.success(res.message ?? 'Rating has been created');
            setCreateDialog(false);
            setWarnings({});
            refreshData();
          } else {
            toast.error(res.message ?? 'Failed to create rating.');
            setWarnings(res.errors ?? {});
          }
        })
        .catch((error) => {
          console.error('Failed to store rating:', error.message);
          toast.error('Failed to create rating.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onDelete = () => {
    if (!loading && deleteDialog) {
      setLoading(true);
      destroyRating(deleteDialog)
        .then((res) => {
          if (res.ok) {
            toast.success(res.message ?? 'Rating has been deleted');
            refreshData();
            setDeleteDialog(null);
          } else {
            toast.error('Failed to delete rating.');
          }
        })
        .catch((error) => {
          console.error('Failed to delete rating:', error.message);
          toast.error('Failed to delete rating.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onEdit = (e) => {
    e.preventDefault();
    if (!loading && editDialog) {
      setLoading(true);
      updateRating(
        {
          type_of_room_id: editDialog.type_of_room_id,
          rate: editDialog.rate,
          comment: editDialog.comment,
        },
        editDialog.id
      )
        .then((res) => {
          if (res.ok) {
            toast.success(res.message ?? 'Rating has been updated');
            refreshData();
            setEditDialog(null);
          } else {
            toast.error('Failed to update rating.');
          }
        })
        .catch((error) => {
          console.error('Failed to update rating:', error.message);
          toast.error('Failed to update rating.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'type_of_room_id', headerName: 'Type of Room ID', width: 150 },
    { field: 'rate', headerName: 'Rate', width: 120 },
    { field: 'comment', headerName: 'Comment', width: 340 },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <IconButton onClick={() => setEditDialog({ ...params.row })} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => setDeleteDialog(params.row.id)} color="secondary">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  

  return (
    <Box>
      <Box sx={{ mt: 2 }}>
        <Box    sx={{
          border: "1px solid black",
              display: "flex",
              justifyContent: "flex",
              alignItems: "center",
              py: 2,
              backgroundColor: "#03A285",
              width: "100%",
            }}>
          <Typography  variant="h4" sx={{ fontWeight: "bold", color: "white" }}>Ratings</Typography>
          <Button  sx={{marginLeft: "8px"}} variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setCreateDialog(true)}>
            Add Rating
          </Button>
        </Box>

        <DataGrid
          columns={columns}
          rows={rows}
          autoHeight
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          
        />

        {/* Create Rating Dialog */}
        <Dialog open={createDialog} onClose={() => setCreateDialog(false)}>
          <DialogTitle>Create Rating</DialogTitle>
          <DialogContent>
            <form onSubmit={onCreate} style={{ minWidth: 300 }}>
              <TextField required id="type_of_room_id" fullWidth size="small" label="Type of Room ID" />
              {warnings?.type_of_room_id && (
                <Typography sx={{ fontSize: 12 }} component="small" color="error">
                  {warnings.type_of_room_id}
                </Typography>
              )}
              <TextField required id="rate" fullWidth size="small" label="Rate" />
              {warnings?.rate && (
                <Typography sx={{ fontSize: 12 }} component="small" color="error">
                  {warnings.rate}
                </Typography>
              )}
              <TextField id="comment" fullWidth size="small" label="Comment" />
              <DialogActions sx={{ justifyContent: 'flex-end', mt: 2 }}>
                <Button onClick={() => setCreateDialog(false)} color="info">
                  Close
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create'}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Rating Dialog */}
        <Dialog open={Boolean(editDialog)} onClose={() => setEditDialog(null)}>
          <DialogTitle>Edit Rating</DialogTitle>
          <DialogContent>
            <form onSubmit={onEdit} style={{ minWidth: 300 }}>
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
                label="Rate"
                value={editDialog?.rate ?? ''}
                onChange={(e) =>
                  setEditDialog((prev) => ({
                    ...prev,
                    rate: e.target.value,
                  }))
                }
              />
              <TextField
                fullWidth
                size="small"
                label="Comment"
                value={editDialog?.comment ?? ''}
                onChange={(e) =>
                  setEditDialog((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }
              />
              <DialogActions sx={{ justifyContent: 'flex-end', mt: 2 }}>
                <Button onClick={() => setEditDialog(null)} color="info">
                  Close
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Updating...' : 'Update'}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Rating Dialog */}
        <Dialog open={Boolean(deleteDialog)} onClose={() => setDeleteDialog(null)}>
          <DialogTitle>Delete Rating</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this rating?</Typography>
          </DialogContent>
          <DialogActions>
            <Button disabled={loading} onClick={() => setDeleteDialog(null)} variant="contained" color="inherit">
              Cancel
            </Button>
            <Button disabled={loading} onClick={onDelete} variant="contained" color="error">
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default checkAuth(Rating);
