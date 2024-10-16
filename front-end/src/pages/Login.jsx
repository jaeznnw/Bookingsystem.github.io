import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login as loginAPI } from '../api/auth'
import { login } from '../redux/authSlice';
import Logo from '../image/staycation_logo_s.png'
import LoginPic from '../image/Loginpic.png'
import './Login.css'

export default function Login() {

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [cookies, setCookie, removeCookie] = useCookies()
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault()
    loginAPI({
       name,
       password,
       })
      .then(res => {
        if (res?.ok) {
          setCookie("AUTH_TOKEN", res.data.token)
          dispatch(login(res.data))
          navigate("/")
          toast.success(res?.message ?? "Logged in successfully")
        } else {
          toast.error(res?.message ?? "Something went wrong")
        }
      })
  }

  return (
    <Box  sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white', p: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, boxShadow: 'black 0px 0px 20px', borderRadius: 5, overflow: 'hidden', maxWidth: 800, width: '100%' }}>
        <Box sx={{ backgroundColor: 'white', padding: 4, width: { xs: '100%', sm: '50%' } }}>
          <Typography variant='h4' sx={{ textAlign: 'center', mb: 2, color: '#BE9B25' }}>
            <img id="logo-login" src={Logo} alt="" />
          </Typography>
          <Typography sx={{ textAlign: 'center', mb: 4, color: '#BE9B25' }}>
            Sign into your account
          </Typography>
          <Box component="form" onSubmit={onSubmit} sx={{ width: '100%' }}>
            <TextField
              onChange={(e) => setName(e.target.value)}
              value={name}
              fullWidth
              size="small"
              label="Username"
              sx={{ mb: 2 }}
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              fullWidth
              size="small"
              label="Password"
              type='password'
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={<Checkbox name="remember" color="primary" sx={{ color: '#BE9B25', '&.Mui-checked': { color: '#BE9B25' } }} />}
              label="Remember me"
              sx={{ mb: 2 }}
            />
            <Button type='submit' variant='contained' fullWidth sx={{ backgroundColor: '#BE9B25', '&:hover': { backgroundColor: '#9B7A1E' } }}>
              Login
            </Button>
            <Typography sx={{ textAlign: 'center', mt: 2 }}>
              <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#BE9B25' }}>Forgot password?</Link>
            </Typography>
          </Box>
          <Typography sx={{ textAlign: 'center', mt: 2, color: '#BE9B25' }}>
            Don't have an account? <Link to="/register" style={{ textDecoration: 'none', color: '#01165A' }}>Create</Link>
          </Typography>
        </Box>
        <Box sx={{ padding: 4, width: { xs: '100%', sm: '50%' }, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <img id="Loginpic1" src={LoginPic} alt="" style={{ width: '100%', height: 'auto' }} />
        </Box>
      </Box>
    </Box>
  )
}
