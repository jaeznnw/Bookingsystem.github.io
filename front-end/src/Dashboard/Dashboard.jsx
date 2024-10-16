import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Paper,
  Grid,
  TextField,
  Slider,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Hotel as HotelIcon,
  CalendarToday as CalendarTodayIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import LineChartComponent from "./LineChartComponent";
import DonutChartComponent from "./DonutChartComponent";
import BarChartComponent from "./BarChartComponent";
import Explore from "../pages/explore";

import Admin from "../component/admin";
import Logo from "../image/staycation_logo_s.png";
import { logout } from "../redux/authSlice";
import checkAuth from "../hoc/checkAuth";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { indexbooking } from '../api/bookings';
import { index as fetchUsers } from '../api/user';
import NotFound from "./NotFound";





function Dashboard() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showRoomDrawer, setShowRoomDrawer] = useState(false);
  const [showBookingComponent, setShowBookingComponent] = useState(false);
  const [showAdminComponent, setShowAdminComponent] = useState(false);
  const [brightnessValue, setBrightnessValue] = useState(50);
  const [contrastValue, setContrastValue] = useState(50);
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [checkInCount, setCheckInCount] = useState(0);
  const [checkOutCount, setCheckOutCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("")
  const token = cookies.AUTH_TOKEN;

  useEffect(() => {
    const fetchBookingCount = async () => {
      try {
        const response = await indexbooking(token);
        if (response && response.data) {
          setBookingCount(response.data.length);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    if (token) {
      fetchBookingCount();
    }
  }, [token]);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetchUsers(token);
        if (response && response.data) {
          setUserCount(response.data.length);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (token) {
      fetchUserCount();
    }
  }, [token]);

  useEffect(() => {
    const fetchCheckInCount = async () => {
      try {
        const response = await indexbooking(token);
        if (response && response.data) {
          const today = new Date().toISOString().split('T')[0];
          const count = response.data.filter(booking => booking.check_in_date === today).length;
          setCheckInCount(count);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    if (token) {
      fetchCheckInCount();
    }
  }, [token]);

  useEffect(() => {
    const fetchCheckOutCount = async () => {
      try {
        const response = await indexbooking(token);
        if (response && response.data) {
          const today = new Date().toISOString().split('T')[0];
          const count = response.data.filter(booking => booking.check_out_date === today).length;
          setCheckOutCount(count);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    if (token) {
      fetchCheckOutCount();
    }
  }, [token]);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    setShowRoomDrawer(index === 1);
    setShowBookingComponent(index === 2);
    setShowAdminComponent(index === 3);
  };

  const handleBrightnessChange = (event, newValue) => {
    setBrightnessValue(newValue);
  };

  const handleContrastChange = (event, newValue) => {
    setContrastValue(newValue);
  };

  const exploreContent = (
    <div style={{ width: "200vh"}}>
      <Explore onClose={() => setShowRoomDrawer(false)} />
    </div>
  );

  const bookingContent = <BarChartComponent sx={{ width: '300px', height: '200px' }}/>;

  const adminContent = <Admin />;

  const handleLogout = () => {
    setLogoutDialog(true);
  };

  if(user?.role!== "admin"){
    return <NotFound />
  }

  const handleSearch = () => {
    if (searchQuery) {
      // Implement search logic here, e.g., navigate to a search results page
      console.log("Search query:", searchQuery);
    }
  };
  

  const confirmLogout = () => {
    removeCookie("AUTH_TOKEN");
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
    setLogoutDialog(false);
  };

  const dashboardContent = (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <AppBar
        position="static"
        sx={{ boxShadow: "none", backgroundColor: "#f8f8f2", color: "#282a36" }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
         
        
          <Typography variant="p">{user?.profile?.first_name} {user?.profile?.last_name}</Typography>
          <Link to="/">
            <IconButton color="inherit">
              <ExitToAppIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#6272a4",
              color: "#f8f8f2",
            }}
          >
            <Typography variant="h6">{bookingCount}</Typography>
            <Typography>New Booking</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#50fa7b",
              color: "#282a36",
            }}
          >
            <Typography variant="h6">{userCount}</Typography>
            <Typography>New User</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#ffb86c",
              color: "#282a36",
            }}
          >
            <Typography variant="h6">{checkInCount}</Typography>
            <Typography>Check In</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#ff5555",
              color: "#f8f8f2",
            }}
          >
            <Typography variant="h6">{checkOutCount}</Typography>
            <Typography>Check Out</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, height: "100%" }}>
            <LineChartComponent />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, height: "100%" }}>
            <DonutChartComponent />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <BarChartComponent />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "white" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#03A285",
            color: "#f8f8f2",
          },
        }}
      >
        <List>
          <Typography sx={{ width: "100%", height: "70px", alignContent: "center" }}>
            <Link to="/">
              <img src={Logo} alt="Logo" style={{ width: "100px", height: "70px", marginLeft: "50px" }} />
            </Link>
          </Typography>
          <ListItem
            button
            selected={selectedIndex === 0}
            onClick={() => handleListItemClick(0)}
          >
            <ListItemIcon sx={{ color: "black" }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={() => handleListItemClick(1)}
          >
            <ListItemIcon sx={{ color: "#black" }}>
            <HotelIcon />
            </ListItemIcon>
            <ListItemText primary="Rooms" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 2}
            onClick={() => handleListItemClick(2)}
          >
            <ListItemIcon sx={{ color: "#black" }}>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText primary="Booking" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 3}
            onClick={() => handleListItemClick(3)}
          >
            <ListItemIcon sx={{ color: "#black" }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="User" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 4}
            onClick={() => handleListItemClick(4)}
          >
            <ListItemIcon sx={{ color: "black" }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem
            onClick={handleLogout}
            sx={{ marginTop: "120%" }}
          >
            <ListItemIcon sx={{ color: "black" }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      {showRoomDrawer ? exploreContent : showBookingComponent ? bookingContent : showAdminComponent ? adminContent : dashboardContent}
      <Drawer
        anchor="right"
        open={selectedIndex === 4}
        onClose={() => handleListItemClick(-1)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 320,
            boxSizing: "border-box",
            padding: 3,
          },
        }}
      >
        <Typography variant="h6">Settings</Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">Brightness</Typography>
          <Slider
            value={brightnessValue}
            onChange={handleBrightnessChange}
            aria-labelledby="brightness-slider"
            sx={{ mt: 1 }}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">Contrast</Typography>
          <Slider
            value={contrastValue}
            onChange={handleContrastChange}
            aria-labelledby="contrast-slider"
            sx={{ mt: 1 }}
          />
        </Box>
      </Drawer>
      <Dialog
        open={logoutDialog}
        onClose={() => setLogoutDialog(false)}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialog(false)}>Cancel</Button>
          <Button onClick={confirmLogout} autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default checkAuth(Dashboard);
