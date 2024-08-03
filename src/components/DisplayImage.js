import React from 'react'
import { Dialog, DialogContent, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const DisplayImage = ({ imgUrl,open,onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <div style={{ position: 'relative' }}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            style={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={imgUrl}
            alt="Displayed"
            style={{ width: '100%', height: 'auto', maxHeight: '80vh' }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DisplayImage
