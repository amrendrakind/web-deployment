import React, { useState } from 'react'
import Input from '@material-ui/core/Input'
import { makeStyles } from '@material-ui/core/styles'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import CircularProgress from '@material-ui/core/CircularProgress'

import { addTask } from '../utils/api'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '300px',
    textAlign: 'center',
    margin: '25px 0px'
  }
}))

export default function TaskAdditionInput ({ triggerListUpdateCall }) {
  const classes = useStyles()
  const [taskDescription, updateTaskDescription] = useState('')
  const [taskAdditionFormState, updateTaskAdditionFormState] = useState(false)

  const handleAddTask = async (event) => {
    event.preventDefault()

    if (!taskDescription.length) {
      return window.alert('enter atleast 1 character!')
    }

    try {
      updateTaskAdditionFormState(true)
      await addTask(taskDescription)
      updateTaskDescription('')
      updateTaskAdditionFormState(false)
      triggerListUpdateCall(true)
    } catch (ex) {
      updateTaskAdditionFormState(false)
      console.log(ex)
      window.alert('Something went wrong, try again!')
    }
  }

  const handleTaskInputUpdate = (event) => {
    updateTaskDescription(event.target.value)
  }

  return (
    <form className={classes.root} noValidate autoComplete='off' onSubmit={handleAddTask}>
      {taskAdditionFormState && <CircularProgress />}
      <Input
        fullWidth
        id='standard-basic'
        placeholder='Add to list...'
        type='text'
        value={taskDescription}
        onChange={handleTaskInputUpdate}
        disabled={taskAdditionFormState}
        startAdornment={<AddOutlinedIcon color='primary' style={{ marginRight: '10px' }} />}
      />
    </form>
  )
}
