import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  destroybooking,
  indexbooking,
  storebooking,
  updatebooking,
} from "../api/bookings";
import checkAuth from "../hoc/checkAuth";
import "./style.css";

function Bookings() {
  const [rows, setRows] = useState([]);
  const [warnings, setWarnings] = useState({});
  const [loading, setLoading] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [editDialog, setEditDialog] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const [cookies] = useCookies();

  const columns = [
    { field: "id", headerName: "ID", minWidth: 50 },
    { field: "profile_id", headerName: "Profile ID", minWidth: 50 },
    { field: "room_id", headerName: "Room ID", minWidth: 100 },
    {
      field: "payment_type_name",
      headerName: "Payment Type",
      minWidth: 150,
    },
    {
      field: "payment_status_name",
      headerName: "Payment Status",
      minWidth: 150,
    },
    {
      field: "check_in_date",
      headerName: "Check-in Date",
      minWidth: 150,
    },
    {
      field: "check_out_date",
      headerName: "Check-out Date",
      minWidth: 150,
    },
    {
      field: "action",
      headerName: "",
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
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => setDeleteDialog(params.row.id)}
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
      minWidth: 150,
      hideable: false,
    },
  ];

  const refreshData = () => {
    indexbooking(cookies.AUTH_TOKEN).then((res) => {
      if (res?.ok) {
        setRows(res.data);
      } else {
        toast.error(res?.message ?? "Something went wrong.");
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
        profile_id: document.getElementById("profile_id").value,
        room_id: document.getElementById("room_id").value,
        payment_type: document.getElementById("payment_type").value,
        payment_status: document.getElementById("payment_status").value,
        check_in_date: document.getElementById("check_in_date").value,
        check_out_date: document.getElementById("check_out_date").value,
      };

      storebooking(body, cookies.AUTH_TOKEN)
        .then((res) => {
          if (res?.ok) {
            toast.success(res?.message ?? "Booking has been created");
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
      destroybooking(deleteDialog, cookies.AUTH_TOKEN)
        .then((res) => {
          if (res?.ok) {
            toast.success(res?.message ?? "Booking has been deleted");
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
      updatebooking(
        {
          profile_id: editDialog.profile_id,
          room_id: editDialog.room_id,
          payment_type: editDialog.payment_type,
          payment_status: editDialog.payment_status,
          check_in_date: editDialog.check_in_date,
          check_out_date: editDialog.check_out_date,
        },
        editDialog.id,
        cookies.AUTH_TOKEN
      )
        .then((res) => {
          if (res?.ok) {
            toast.success(res?.message ?? "Booking has been updated");
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
      {user ? (
        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              border: "1px solid black",
              display: "flex",
              justifyContent: "flex",
              alignItems: "center",
              py: 2,
              backgroundColor: "#03A285",
              width: "100%",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              Bookings
            </Typography>
            <Button
              sx={{ marginLeft: "8px" }}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setCreateDialog(true)}
            >
              Add Booking
            </Button>
          </Box>
          <DataGrid
            sx={{ height: 500, width: "100%" }}
            columns={columns}
            rows={rows}
          />
          <Dialog open={createDialog} onClose={() => setCreateDialog(false)}>
            <DialogTitle>Create Booking</DialogTitle>
            <DialogContent>
              <Box
                component="form"
                onSubmit={onCreate}
                sx={{ width: 300, mx: "auto" }}
              >
                <TextField
                  required
                  id="profile_id"
                  label="Profile ID"
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
                {warnings?.profile_id && (
                  <Typography sx={{ fontSize: 12, mt: 1 }} color="error">
                    {warnings.profile_id}
                  </Typography>
                )}
                <TextField
                  required
                  id="room_id"
                  label="Room ID"
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
                {warnings?.room_id && (
                  <Typography sx={{ fontSize: 12, mt: 1 }} color="error">
                    {warnings.room_id}
                  </Typography>
                )}
                <TextField
                  required
                  id="payment_type"
                  label="Payment Type"
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
                {warnings?.payment_type && (
                  <Typography sx={{ fontSize: 12, mt: 1 }} color="error">
                    {warnings.payment_type}
                  </Typography>
                )}
                <TextField
                  required
                  id="payment_status"
                  label="Payment Status"
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
                {warnings?.payment_status && (
                  <Typography sx={{ fontSize: 12, mt: 1 }} color="error">
                    {warnings.payment_status}
                  </Typography>
                )}
                <TextField
                  required
                  id="check_in_date"
                  label="Check-in Date"
                  type="date"
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
                {warnings?.check_in_date && (
                  <Typography sx={{ fontSize: 12, mt: 1 }} color="error">
                    {warnings.check_in_date}
                  </Typography>
                )}
                <TextField
                  required
                  id="check_out_date"
                  label="Check-out Date"
                  type="date"
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
                {warnings?.check_out_date && (
                  <Typography sx={{ fontSize: 12, mt: 1 }} color="error">
                    {warnings.check_out_date}
                  </Typography>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2,
                    gap: 1,
                  }}
                >
                  <Button
                    onClick={() => setCreateDialog(false)}
                    color="secondary"
                  >
                    Close
                  </Button>
                  <Button type="submit" disabled={loading} color="primary">
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
            <DialogTitle>Delete Booking</DialogTitle>
            <DialogActions>
              <Button onClick={() => setDeleteDialog(null)} color="secondary">
                Cancel
              </Button>
              <Button onClick={onDelete} color="error" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Delete"}
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={Boolean(editDialog)}
            onClose={() => setEditDialog(null)}
          >
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogContent>
              <Box
                component="form"
                onSubmit={onEdit}
                sx={{ width: 300, mx: "auto" }}
              >
                <TextField
                  required
                  id="profile_id"
                  label="Profile ID"
                  value={editDialog?.profile_id || ""}
                  onChange={(e) =>
                    setEditDialog({ ...editDialog, profile_id: e.target.value })
                  }
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
                {warnings?.profile_id && (
                  <Typography sx={{ fontSize: 12, mt: 1 }} color="error">
                    {warnings.profile_id}
                  </Typography>
                )}
                <TextField
                  required
                  id="room_id"
                  label="Room ID"
                  value={editDialog?.room_id || ""}
                  onChange={(e) =>
                    setEditDialog({ ...editDialog, room_id: e.target.value })
                  }
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
                {warnings?.room_id && (
                  <Typography sx={{ fontSize: 12, mt: 1 }} color="error">
                    {warnings.room_id}
                  </Typography>
                )}
                <Select
                  id="payment_type"
                  value={editDialog?.payment_type || ""}
                  onChange={(e) =>
                    setEditDialog({
                      ...editDialog,
                      payment_type: e.target.value,
                    })
                  }
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                >
                  <MenuItem value="0">G Cash</MenuItem>
                  <MenuItem value="1">Cash on Site</MenuItem>
                  <MenuItem value="2">Credit Card</MenuItem>
                </Select>
                {warnings?.payment_type && (
                  <Typography sx={{ fontSize: 12, mt: 1 }} color="error">
                    {warnings.payment_type}
                  </Typography>
                )}
                <Select
                  id="payment_status"
                  value={editDialog?.payment_status || ""}
                  onChange={(e) =>
                    setEditDialog({
                      ...editDialog,
                      payment_status: e.target.value,
                    })
                  }
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                >
                  <MenuItem value="0">Pending</MenuItem>
                  <MenuItem value="1">Paid</MenuItem>
                  <MenuItem value="2">Failed</MenuItem>
                  <MenuItem value="3">Refunded</MenuItem>
                </Select>
                {warnings?.payment_status && (
                  <Typography sx={{ fontSize: 12, mt: 1 }} color="error">
                    {warnings.payment_status}
                  </Typography>
                )}
                <TextField
                  required
                  id="check_in_date"
                  label="Check-in Date"
                  type="date"
                  value={editDialog?.check_in_date || ""}
                  onChange={(e) =>
                    setEditDialog({
                      ...editDialog,
                      check_in_date: e.target.value,
                    })
                  }
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
                {warnings?.check_in_date && (
                  <Typography sx={{ fontSize: 12, mt: 1 }} color="error">
                    {warnings.check_in_date}
                  </Typography>
                )}
                <TextField
                  required
                  id="check_out_date"
                  label="Check-out Date"
                  type="date"
                  value={editDialog?.check_out_date || ""}
                  onChange={(e) =>
                    setEditDialog({
                      ...editDialog,
                      check_out_date: e.target.value,
                    })
                  }
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
                {warnings?.check_out_date && (
                  <Typography sx={{ fontSize: 12, mt: 1 }} color="error">
                    {warnings.check_out_date}
                  </Typography>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2,
                    gap: 1,
                  }}
                >
                  <Button onClick={() => setEditDialog(null)} color="secondary">
                    Close
                  </Button>
                  <Button type="submit" disabled={loading} color="primary">
                    {loading ? <CircularProgress size={24} /> : "Update"}
                  </Button>
                </Box>
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
      ) : (
        null
      )}
    </Box>
  );
}

export default checkAuth(Bookings);
