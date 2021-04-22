import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import InlineEdit from './InlineEdit'
import {
  isBrowser,
  isMobile
} from 'react-device-detect'

const useStyles = makeStyles((theme) => ({
  list: {
    listStyle: 'none',
    padding: '10px 5px',
    fontSize: '16px'
  },
  listItems: {
    margin: '10px 0'
  },
  completedListItem: {
    textDecoration: 'line-through',
    color: '#989898'
  },
  deleteBtn: {
    color: 'black',
    height: 20,
    float: 'right',
    position: 'relative',
    cursor: 'pointer'
  },
  checkbox: {
    width: '14px',
    height: '14px',
    marginRight: '30px'
  }
}))

const TodoItem = ({ taskId, description, isCompleted, onTaskStatusUpdate, onDeleteItem, onDescriptionUpdate }) => {
  const classes = useStyles()

  const [isMouseInside, setMousePositionState] = useState(false)

  const mouseEnter = () => { setMousePositionState(true) }
  const mouseLeave = () => { setMousePositionState(false) }

  return (
    <li className={classes.listItems} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>

      <input type='checkbox' className={classes.checkbox} checked={isCompleted} onChange={(e) => onTaskStatusUpdate(taskId, e.target.checked)} />
      <label className={isCompleted ? classes.completedListItem : ''}>
        <InlineEdit
          text={description}
          onSetText={description => { description.length && onDescriptionUpdate(taskId, description) }}
        />
      </label>
      {((isMouseInside && isBrowser) || isMobile) && <DeleteOutline onClick={() => onDeleteItem(taskId)} className={classes.deleteBtn} />}
    </li>
  )
}

export default function TaskList ({ tasks, onTaskStatusUpdate, onDeleteItem, onDescriptionUpdate }) {
  const classes = useStyles()

  return (
    <ul className={classes.list}>
      {tasks.map(({ id, description, isCompleted }, idx) =>
        <TodoItem
          key={idx}
          taskId={id}
          description={description}
          isCompleted={isCompleted}
          onDeleteItem={onDeleteItem}
          onTaskStatusUpdate={onTaskStatusUpdate}
          onDescriptionUpdate={onDescriptionUpdate}
        />)}
    </ul>)
}
