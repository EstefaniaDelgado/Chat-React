import * as React from 'react';
/* import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'; */
import Swal from 'sweetalert2';
import { ChatContext } from "../context/ChatContext";
import { useContext } from 'react';
import { db } from '../firebase';
import { doc, updateDoc } from "firebase/firestore";


export default function OptionsChat() {

  const { data } = useContext(ChatContext);

  const [open, setOpen] = React.useState(false);


  const handleChange = (event) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = async (id) => {
   // console.log("funciona!!")

    setOpen(true);  
  Swal.fire({
    title: 'Are you sure to delete this chat?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  
  }).then( async (result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your chat has been deleted.',
        'success'
      )
 const chatRef = doc(db, 'chats', id);

// Remove the 'capital' field from the document
await updateDoc(chatRef, {
    messages: []
});
    }
    
  }) 

 
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };


  return (
    <div>
      <i className="large material-icons" onClick={()=>handleClickOpen(data.chatId)}> more_horiz</i> 
    </div>
  );
}




