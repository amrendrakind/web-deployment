import Axios from 'axios'
import { TASK_API_BASE_URL } from './constants'

export const addTask = (description) => Axios.post(`${TASK_API_BASE_URL}`, { description })

export const updateTask = (taskId, description) => Axios.put(`${TASK_API_BASE_URL}/${taskId}`, { description })

export const markTaskComplete = (taskId) => Axios.put(`${TASK_API_BASE_URL}/${taskId}/completed`)

export const markTaskInComplete = (taskId) => Axios.put(`${TASK_API_BASE_URL}/${taskId}/uncompleted`)

export const deleteTask = (taskId) => Axios.delete(`${TASK_API_BASE_URL}/${taskId}`)

export const getTasks = () => Axios.get(`${TASK_API_BASE_URL}`)
