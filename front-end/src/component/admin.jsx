import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import $ from "jquery";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { destroy, index, store, update } from "../api/user";
import checkAuth from "../hoc/checkAuth";
import Booking from "./bookings";
import Rating from "./rating";
import Room from "./room";
import Typeofroom from "./typeofroom";

function Admin() {
  const [rows, setRows] = useState([]);
  const [warnings, setWarnings] = useState({});
  const [loading, setLoading] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [editDialog, setEditDialog] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [cookies] = useCookies();

  const columns = [
    { field: "id", headerName: "ID", fontWeight: "bold" },
    { field: "name", headerName: "Username" },
    { field: "email", headerName: "Email", minWidth: 200, fontWeight: "bold" },
    { field: "first_name", headerName: "First Name", fontWeight: "bold" },
    { field: "middle_name", headerName: "Middle Name", fontWeight: "bold" },
    { field: "last_name", headerName: "Last Name", fontWeight: "bold" },
    { field: "birth_date", headerName: "Birth Date" },
    { field: "role", headerName: "Role" },
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
    index(cookies.AUTH_TOKEN).then((res) => {
      if (res?.ok) {
        const formattedData = res.data.map((d) => ({
          ...d,
          ...d.profile,
        }));
        setRows(formattedData);
      } else {
        toast.error(res?.message ?? "Something is wrong");
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
        email: $("#email").val(),
        password: $("#password").val(),
        password_confirmation: $("#password_confirmation").val(),
        first_name: $("#first_name").val(),
        middle_name: $("#middle_name").val(),
        last_name: $("#last_name").val(),
        birth_date: $("#birth_date").val(),
      };

      store(body, cookies.AUTH_TOKEN)
        .then((res) => {
          if (res?.ok) {
            toast.success(res?.message ?? "Account has been registered");
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
      destroy(deleteDialog, cookies.AUTH_TOKEN)
        .then((res) => {
          if (res?.ok) {
            toast.success(res?.message ?? "User has been deleted");
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
      update(
        {
          email: editDialog.email,
          password: editDialog.password,
          password_confirmation: editDialog.password_confirmation,
          first_name: editDialog.first_name,
          middle_name: editDialog.middle_name,
          last_name: editDialog.last_name,
          birth_date: editDialog.birth_date,
          role: editDialog.role,
        },
        editDialog.id,
        cookies.AUTH_TOKEN
      )
        .then((res) => {
          if (res?.ok) {
            toast.success(res?.message ?? "User has been updated");
            refreshData();
            setEditDialog(null);
          } else {
            toast.error("Something went wrong.");
            setWarnings(res?.errors);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {user ? (
        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              py: 2,
              border: "1px solid black",
              backgroundColor: "#03A285",
              width: "100%",
            }}
          >
            <DescriptionIcon sx={{ fontSize: "40px", color: "black" }} />{" "}
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              User
            </Typography>
            <Button
              sx={{ marginLeft: "8px" }}
              variant="contained"
              color="primary"
              onClick={() => setCreateDialog(true)}
            >
              Create User
            </Button>
          </Box>

          <DataGrid
            sx={{ height: 500 }}
            columns={columns}
            rows={rows}
            disableSelectionOnClick
          />
          <Dialog open={createDialog} onClose={() => setCreateDialog(false)}>
            <DialogTitle>Create User</DialogTitle>
            <DialogContent>
              <Box
                component="form"
                onSubmit={onCreate}
                sx={{ width: 300, mx: "auto" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      required
                      id="first_name"
                      fullWidth
                      size="small"
                      label="First Name"
                      sx={{ mt: 2 }}
                    />
                    {warnings?.first_name && (
                      <Typography sx={{ fontSize: 12 }} color="error">
                        {warnings.first_name}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      id="last_name"
                      fullWidth
                      size="small"
                      label="Last Name"
                      sx={{ mt: 2 }}
                    />
                    {warnings?.last_name && (
                      <Typography sx={{ fontSize: 12 }} color="error">
                        {warnings.last_name}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <TextField
                  required
                  id="name"
                  fullWidth
                  size="small"
                  label="Username"
                  sx={{ mt: 2 }}
                />
                {warnings?.name && (
                  <Typography sx={{ fontSize: 12 }} color="error">
                    {warnings.name}
                  </Typography>
                )}
                <TextField
                  required
                  id="email"
                  fullWidth
                  size="small"
                  label="Email"
                  type="email"
                  sx={{ mt: 2 }}
                />
                {warnings?.email && (
                  <Typography sx={{ fontSize: 12 }} color="error">
                    {warnings.email}
                  </Typography>
                )}
                <TextField
                  required
                  id="password"
                  fullWidth
                  size="small"
                  label="Password"
                  type="password"
                  sx={{ mt: 2 }}
                />
                {warnings?.password && (
                  <Typography sx={{ fontSize: 12 }} color="error">
                    {warnings.password}
                  </Typography>
                )}
                <TextField
                  required
                  id="password_confirmation"
                  fullWidth
                  size="small"
                  label="Repeat Password"
                  type="password"
                  sx={{ mt: 2 }}
                />
                <TextField
                  id="middle_name"
                  fullWidth
                  size="small"
                  label="Middle Name"
                  sx={{ mt: 2 }}
                />
                {warnings?.middle_name && (
                  <Typography sx={{ fontSize: 12 }} color="error">
                    {warnings.middle_name}
                  </Typography>
                )}
                <TextField
                  required
                  id="birth_date"
                  fullWidth
                  size="small"
                  type="date"
                  sx={{ mt: 2 }}
                />
                {warnings?.birth_date && (
                  <Typography sx={{ fontSize: 12 }} color="error">
                    {warnings.birth_date}
                  </Typography>
                )}
                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Button
                    id="submit_btn"
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    sx={{ display: loading ? "flex" : "block" }}
                  >
                    {loading ? <CircularProgress size={24} /> : "Create"}
                  </Button>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setCreateDialog(false)} color="secondary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={!!deleteDialog}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
              <Typography>
                Do you want to delete this user with ID: {deleteDialog}?
              </Typography>
            </DialogContent>
            <DialogActions sx={{ display: !!deleteDialog ? "flex" : "none" }}>
              <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
              <Button disabled={loading} onClick={onDelete} color="error">
                {loading ? <CircularProgress size={24} /> : "Confirm"}
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={!!editDialog} onClose={() => setEditDialog(null)}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={onEdit} sx={{ p: 1 }}>
          <TextField
            onChange={(e) =>
              setEditDialog({
                ...editDialog,
                email: e.target.value,
              })
            }
            value={editDialog?.email ?? ""}
            size="small"
            fullWidth
            label="Email"
            type="email"
            sx={{ mt: 2 }}
          />
          {warnings?.email && (
            <Typography sx={{ fontSize: 12 }} color="error">
              {warnings.email}
            </Typography>
          )}
          <TextField
            required
            id="password"
            fullWidth
            size="small"
            label="Password"
            type="password"
            sx={{ mt: 2 }}
          />
          {warnings?.password && (
            <Typography sx={{ fontSize: 12 }} color="error">
              {warnings.password}
            </Typography>
          )}
          <TextField
            required
            id="password_confirmation"
            fullWidth
            size="small"
            label="Repeat Password"
            type="password"
            sx={{ mt: 2 }}
          />
          {warnings?.password_confirmation && (
            <Typography sx={{ fontSize: 12 }} color="error">
              {warnings.password_confirmation}
            </Typography>
          )}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                onChange={(e) =>
                  setEditDialog({
                    ...editDialog,
                    first_name: e.target.value,
                  })
                }
                value={editDialog?.first_name ?? ""}
                size="small"
                fullWidth
                label="First Name"
                sx={{ mt: 2 }}
              />
              {warnings?.first_name && (
                <Typography sx={{ fontSize: 12 }} color="error">
                  {warnings.first_name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) =>
                  setEditDialog({
                    ...editDialog,
                    last_name: e.target.value,
                  })
                }
                value={editDialog?.last_name ?? ""}
                size="small"
                fullWidth
                label="Last Name"
                sx={{ mt: 2 }}
              />
              {warnings?.last_name && (
                <Typography sx={{ fontSize: 12 }} color="error">
                  {warnings.last_name}
                </Typography>
              )}
            </Grid>
          </Grid>
          <TextField
            onChange={(e) =>
              setEditDialog({
                ...editDialog,
                middle_name: e.target.value,
              })
            }
            value={editDialog?.middle_name ?? ""}
            size="small"
            fullWidth
            label="Middle Name"
            sx={{ mt: 2 }}
          />
          {warnings?.middle_name && (
            <Typography sx={{ fontSize: 12 }} color="error">
              {warnings.middle_name}
            </Typography>
          )}
          <TextField
            onChange={(e) =>
              setEditDialog({
                ...editDialog,
                birth_date: e.target.value,
              })
            }
            value={editDialog?.birth_date ?? ""}
            size="small"
            fullWidth
            type="date"
            sx={{ mt: 2 }}
          />
          {warnings?.birth_date && (
            <Typography sx={{ fontSize: 12 }} color="error">
              {warnings.birth_date}
            </Typography>
          )}
          <Select
            onChange={(e) =>
              setEditDialog({
                ...editDialog,
                role: e.target.value,
              })
            }
            value={editDialog?.role ?? ""}
            size="small"
            fullWidth
            label="Role"
            sx={{ mt: 2 }}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
          {warnings?.role && (
            <Typography sx={{ fontSize: 12 }} color="error">
              {warnings.role}
            </Typography>
          )}
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button
              id="edit-btn"
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ display: loading ? "flex" : "block" }}
            >
              {loading ? <CircularProgress size={24} /> : "Update"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setEditDialog(null)} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>    
        </Box>
      ) : null}
      <Booking />
      <Rating />
      <Room/>
      <Typeofroom/>
    </Box>
  );
}

export default checkAuth(Admin);
