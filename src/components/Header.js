import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

export default function Header () {
  return (
    <>
      <CssBaseline />
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6' color='inherit' noWrap>
            TinyList
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}
