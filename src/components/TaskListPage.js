import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'

import TaskAdditionInput from './TaskAdditionInputHandler'
import TaskList from './TaskList'

import { getTasks, deleteTask, updateTask, markTaskComplete, markTaskInComplete } from '../utils/api'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    marginTop: '50px'
  }
}))

const modifyResponseData = (data) => {
  const updatedTaskList = data.map(task => {
    const { completed_at: completedAt, ...taskProps } = task

    return {
      ...taskProps,
      isCompleted: !!completedAt
    }
  })

  const completedTasks = updatedTaskList.filter((task) => task.isCompleted)
  const incompletedTasks = updatedTaskList.filter((task) => !task.isCompleted)

  completedTasks.sort((task1, task2) => new Date(task1.updated_at) - new Date(task2.updated_at))
  incompletedTasks.sort((task1, task2) => new Date(task2.updated_at) - new Date(task1.updated_at))

  return [].concat(incompletedTasks).concat(completedTasks)
}

export default function TaskListPage () {
  const classes = useStyles()

  const [tasks, updateTaskList] = useState([])
  const [isLoading, setLoaderState] = useState(false)
  const [isUpdateListCalled, triggerListUpdateCall] = useState(true)

  useEffect(() => {
    try {
      if (isUpdateListCalled) {
        setLoaderState(true)
        getTasks().then((response) => {
          const updatedTaskList = modifyResponseData(response.data)
          updateTaskList(updatedTaskList)
          setLoaderState(false)
          triggerListUpdateCall(false)
        })
      }
    } catch (ex) {
      console.log(ex)
      window.alert('Something went wrong, try again!')
    }
  }, [isUpdateListCalled])

  const onTaskStatusUpdate = async (taskId, isChecked) => {
    try {
      const statusUpdateHandler = isChecked ? markTaskComplete : markTaskInComplete
      await statusUpdateHandler(taskId)
      triggerListUpdateCall(true)
    } catch (ex) {
      console.log(ex)
      window.alert('Something went wrong, try again!')
    }
  }

  const onDeleteItem = async (taskId) => {
    try {
      await deleteTask(taskId)
      triggerListUpdateCall(true)
    } catch (ex) {
      console.log(ex)
      window.alert('Something went wrong, try again!')
    }
  }

  const onDescriptionUpdate = async (taskId, description) => {
    try {
      await updateTask(taskId, description)
      triggerListUpdateCall(true)
    } catch (ex) {
      console.log(ex)
      window.alert('Something went wrong, try again!')
    }
  }

  return (
    <main>
      <div className={classes.container}>
        <Container maxWidth='sm'>
          <Grid container spacing={2} justify='center'>
            <Grid item md>
              <TaskAdditionInput triggerListUpdateCall={triggerListUpdateCall} />
              {isLoading
                ? <CircularProgress />
                : <TaskList
                  tasks={tasks}
                  onTaskStatusUpdate={onTaskStatusUpdate}
                  onDeleteItem={onDeleteItem}
                  onDescriptionUpdate={onDescriptionUpdate}
                />}
            </Grid>
          </Grid>
        </Container>
      </div>
    </main>)
}
