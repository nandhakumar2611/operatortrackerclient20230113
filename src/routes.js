import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//web app
const Manager = React.lazy(() => import('./views/app_admin/users/manager'))
const Operator = React.lazy(() => import('./views/app_admin/users/operator'))
const Operation = React.lazy(() => import('./views/app_admin/operation/operation'))
const Plant = React.lazy(() => import('./views/app_admin/plant/plant'))
const Machine = React.lazy(() => import('./views/app_admin/machine/machine'))
const ManagerTaskNew = React.lazy(() => import('./views/app_task/manager/new'))
const ManagerTaskAssign = React.lazy(() => import('./views/app_task/manager/assign'))
const ManagerTaskList = React.lazy(() => import('./views/app_task/manager/list'))
const OperatorTaskAssigned = React.lazy(() => import('./views/app_task/operator/assigned'))
const OperatorTaskList = React.lazy(() => import('./views/app_task/operator/list'))
const OperatorTime = React.lazy(() => import('./views/app_admin/operatortime/operatortime'))
const OperatorTaskListTable = React.lazy(() => import('./views/app_task/operator/tableviewlist'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/users/manager', name: 'Manager', element: Manager },
  { path: '/users/operator', name: 'Operator', element: Operator },
  { path: '/users/operatortime', name: 'OperatorTime', element: OperatorTime },
  { path: '/operation', name: 'Operation', element: Operation },
  { path: '/plant', name: 'Plant', element: Plant },
  { path: '/machine', name: 'Machine', element: Machine },
  { path: '/task/manager/new', name: 'New Task', element: ManagerTaskNew },
  { path: '/task/manager/assign', name: 'Task Assignment', element: ManagerTaskAssign },
  { path: '/task/manager/list', name: 'Task List', element: ManagerTaskList },
  { path: '/task/operator/assigned', name: 'Task Assigned', element: OperatorTaskAssigned },
  { path: '/task/operator/list', name: 'Task List', element: OperatorTaskList },
  { path: '/task/operator/assignedtable', name: 'Task List', element: OperatorTaskListTable}
]

export default routes
