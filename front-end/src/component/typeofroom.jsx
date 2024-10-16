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
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import $ from "jquery";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import {
  destroyRoomType,
  getRoomTypes,
  createRoomType,
  updateRoomType,
} from "../api/roomType";
import checkAuth from "../hoc/checkAuth";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import "./style.css";

function RoomTypes() {
  const [rows, setRows] = useState([]);
  const [warnings, setWarnings] = useState({});
  const [loading, setLoading] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [editDialog, setEditDialog] = useState(null);

  const [cookies] = useCookies();

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "prices_per_hour", headerName: "Price per Hour", flex: 1 },
    {
      field: "action",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <IconButton
            onClick={() => setEditDialog({ ...params.row })}
            color="warning"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => setDeleteDialog(params.row.id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
      minWidth: 150,
    },
  ];

  const refreshData = () => {
    getRoomTypes(cookies.AUTH_TOKEN).then((res) => {
      if (res?.ok) {
        setRows(res.data);
      } else {
        toast.error(res?.message ?? "Something went wrong");
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
        name: $("#name").val(),
        description: $("#description").val(),
        prices_per_hour: $("#price_per_hour").val(),
      };

      createRoomType(body, cookies.AUTH_TOKEN)
        .then((res) => {
          if (res?.ok) {
            toast.success(res?.message ?? "Room Type has been created");
            setCreateDialog(false);
            setWarnings({});
            refreshData();
          } else {
            toast.error(res?.message ?? "Something went wrong.");
            setWarnings(res?.errors);
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
      destroyRoomType(deleteDialog, cookies.AUTH_TOKEN)
        .then((res) => {
          if (res?.ok) {
            toast.success(res?.message ?? "Room Type has been deleted");
            refreshData();
            setDeleteDialog(null);
          } else {
            toast.error("Something went wrong.");
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
      updateRoomType(
        {
          name: editDialog.name,
          description: editDialog.description,
          prices_per_hour: editDialog.prices_per_hour,
        },
        editDialog.id,
        cookies.AUTH_TOKEN
      )
        .then((res) => {
          if (res?.ok) {
            toast.success(res?.message ?? "Room Type has been updated");
            refreshData();
            setEditDialog(null);
          } else {
            toast.error("Something went wrong.");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Box>
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 2 }}>
          <Typography id="crud-name" variant="h4">Room Types</Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setCreateDialog(true)}>
            Add Room Type
          </Button>
        </Box>

        <DataGrid sx={{ height: "500px", border: "2px solid black" }} columns={columns} rows={rows} />
        <Dialog open={createDialog} onClose={() => setCreateDialog(false)}>
          <DialogTitle sx={{ backgroundColor: "#00FF00" }}>Create Room Type</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              onSubmit={onCreate}
              sx={{ width: 300, mx: "auto" }}
            >
              <Box sx={{ mt: 1 }}>
                <TextField
                  required
                  id="name"
                  fullWidth
                  size="small"
                  label="Name"
                />
                {warnings?.name && (
                  <Typography
                    sx={{ fontSize: 12 }}
                    component="small"
                    color="error"
                  >
                    {warnings.name}
                  </Typography>
                )}
              </Box>
              <Box sx={{ mt: 1 }}>
                <TextField
                  required
                  id="description"
                  fullWidth
                  size="small"
                  label="Description"
                />
                {warnings?.description && (
                  <Typography
                    sx={{ fontSize: 12 }}
                    component="small"
                    color="error"
                  >
                    {warnings.description}
                  </Typography>
                )}
              </Box>
              <Box sx={{ mt: 1 }}>
                <TextField
                  required
                  id="prices_per_hour"
                  fullWidth
                  size="small"
                  label="Price per Hour"
                />
                {warnings?.prices_per_hour && (
                  <Typography
                    sx={{ fontSize: 12 }}
                    component="small"
                    color="error"
                  >
                    {warnings.prices_per_hour}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button onClick={() => setCreateDialog(false)} color="info">
                  Close
                </Button>
                <Button type="submit" disabled={loading} color="primary" sx={{ ml: 2 }}>
                  {loading ? <CircularProgress size={24} /> : "Create"}
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
        <Dialog
          open={Boolean(deleteDialog)}
          onClose={() => setDeleteDialog(null)}
        >
          <DialogTitle>Delete Room Type</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this room type?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={loading}
              onClick={() => setDeleteDialog(null)}
              variant="contained"
              color="inherit"
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              onClick={onDelete}
              variant="contained"
              color="error"
            >
              {loading ? <CircularProgress size={24} /> : "Delete"}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={Boolean(editDialog)}
          onClose={() => setEditDialog(null)}
        >
          <DialogTitle>Edit Room Type</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              onSubmit={onEdit}
              sx={{ width: 300, mx: "auto" }}
            >
              <Box sx={{ mt: 1 }}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  label="Name"
                  value={editDialog?.name ?? ""}
                  onChange={(e) =>
                    setEditDialog((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
                {warnings?.name && (
                  <Typography
                    sx={{ fontSize: 12 }}
                    component="small"
                    color="error"
                  >
                    {warnings.name}
                  </Typography>
                )}
              </Box>
              <Box sx={{ mt: 1 }}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  label="Description"
                  value={editDialog?.description ?? ""}
                  onChange={(e) =>
                    setEditDialog((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
                {warnings?.description && (
                  <Typography
                    sx={{ fontSize: 12 }}
                    component="small"
                    color="error"
                  >
                    {warnings.description}
                  </Typography>
                )}
              </Box>
              <Box sx={{ mt: 1 }}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  label="Price per Hour"
                  value={editDialog?.prices_per_hour ?? ""}
                  onChange={(e) =>
                    setEditDialog((prev) => ({
                      ...prev,
                      prices_per_hour: e.target.value,
                    }))
                  }
                />
                {warnings?.prices_per_hour && (
                  <Typography
                    sx={{ fontSize: 12 }}
                    component="small"
                    color="error"
                  >
                    {warnings.prices_per_hour}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button onClick={() => setEditDialog(null)} color="info">
                  Close
                </Button>
                <Button type="submit" disabled={loading} color="primary" sx={{ ml: 2 }}>
                  {loading ? <CircularProgress size={24} /> : "Submit"}
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}

export default checkAuth(RoomTypes);
