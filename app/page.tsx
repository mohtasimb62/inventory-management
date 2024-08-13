'use client'

import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import { firestore } from '../firebase'

import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}




export default function Home() {
  
  const [inventory, setInventory] = useState<any[]>([])
  const [openAdd, setOpenAdd] = useState(false)
  const [openRemove, setOpenRemove] = useState(false)

  const [itemName, setItemName] = useState('')


  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList: any = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }
  
  useEffect(() => {
    updateInventory()
  }, [])

  const addItem = async (item: any) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updateInventory()
  }
  
  const removeItem = async (item: any) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }

  return (
    <div>
    {/* <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
    >
      <Modal
        open={openAdd}
        onClose={() => { setOpenAdd(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                setOpenAdd(false)
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={() => { setOpenAdd(true) }}>
        Add New Item
      </Button>
      <Box border={'1px solid #333'}>
        <Box
          width="800px"
          height="100px"
          bgcolor={'#ADD8E6'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
            Inventory Items
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
          {inventory.map(({name, quantity}) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              bgcolor={'#f0f0f0'}
              paddingX={5}
            >
              <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                Quantity: {quantity}
              </Typography>
              <Button variant="contained" onClick={() => removeItem(name)}>
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box> */}
    {/* ---------------------- */}
    <Modal open={openAdd} onClose={() => { setOpenAdd(false) }}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Item
        </Typography>
        <Stack width="100%" direction={'row'} spacing={2}>
          <TextField
            id="outlined-basic"
            label="Item"
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Button
            variant="outlined"
            onClick={() => {
              addItem(itemName)
              setItemName('')
              setOpenAdd(false)
            }}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </Modal>

    <Modal open={openRemove} onClose={() => { setOpenRemove(false) }}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Remove Item
        </Typography>
        <Stack sx={style} spacing={2} overflow={'scroll'} height={'400px'}>
          {inventory.map(({name, quantity}) => (
            <Box
              key={name}
              width="auto"
              height="900px"
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              bgcolor={'#f0f0f0'}
              
            >
              <Typography variant={'h6'} color={'#333'} textAlign={'center'}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant={'h6'} color={'#333'} textAlign={'center'}>
                Quantity: {quantity}
              </Typography>
              <Button variant="contained" onClick={() => removeItem(name)}>
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Modal>

    <Box display={'flex'} justifyContent={'center'}>
      <Box bgcolor={'white'} width={'950px'} height={'1000px'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
        <Box bgcolor={'white'} width={'900px'} height={'550px'} boxShadow={'5px 5px 10px gray'} marginTop={'20px'}>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'flex-start'}>
            <Typography variant={'h4'}>Your Items</Typography>
            <Box>
              <Button onClick={() => { setOpenAdd(true) }}>Add</Button>
              <Button onClick={() => { setOpenRemove(true) }}>Remove</Button>
            </Box>
          </Box>
            

          <Stack spacing={2} overflow={'auto'} height={'500px'}>
            {inventory.map(({name, quantity}) => (
              <Box
                key={name}
                width="auto"
                height="auto"
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                paddingX={5}
              >
                <Typography variant={'h5'} color={'#333'} textAlign={'center'}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant={'h5'} color={'#333'} textAlign={'center'}>
                  Quantity: {quantity}
                </Typography>
              </Box>
            ))}
          </Stack>


        </Box>

        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'900px'} height={'550px'} marginBottom={'20px'}>

          <Box bgcolor={'white'} width={'425px'} height={'380px'} boxShadow={'5px 5px 10px gray'}>
            <Typography variant='h5'>Recipe (Coming soon)</Typography>
          </Box>

          <Box bgcolor={'white'} width={'425px'} height={'380px'} boxShadow={'5px 5px 10px gray'}>
            <Typography variant='h5'>Nutrition (Coming Soon)</Typography>
          </Box>

        </Box>

      </Box>
    </Box>
  </div>
  )
}