import React from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilPencil, cilPeople, cilSettings, cilRowing, cilContact,
    cilSpeedometer, cilCalendar,
} from '@coreui/icons'
import { CNavItem, CNavTitle,CNavGroup } from '@coreui/react'

import dataService from "./tool/dataService";

const menu0=[
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
        component: CNavTitle,
        name: 'Admin',
    },
    {
        component: CNavGroup,
        name: 'Users',
        to: '/users',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'Manager',
                to: '/users/manager',
                icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
            },
            {
                component: CNavItem,
                name: 'Operator',
                to: '/users/operator',
                icon: <CIcon icon={cilRowing} customClassName="nav-icon" />,
            },
        ],
    },
    {
        component: CNavItem,
        name: 'Operation',
        to: '/operation',
        icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Plant',
        to: '/plant',
        icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Machine',
        to: '/machine',
        icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'OperatorTime',
        to: '/users/operatortime',
        icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    }
]


const menu1=[
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
        component: CNavTitle,
        name: 'Manager',
    },
    {
        component: CNavItem,
        name: 'New Task',
        to: '/task/manager/new',
        icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Assign Task',
        to: '/task/manager/assign',
        icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Task List',
        to: '/task/manager/list',
        icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'OperatorTime',
        to: '/users/operatortime',
        icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    }
]


const menu2=[
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
        component: CNavTitle,
        name: 'Operator',
    },
    {
        component: CNavItem,
        name: 'My Task',
        to: '/task/operator/assigned',
        icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Task List',
        to: '/task/operator/list',
        icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Assign Task',
        to: '/task/manager/assign',
        icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    }
]
const menu_nav =()=>{

    if(dataService.getLoggedUserRole()==='0'){
        return menu0;
    }
    if(dataService.getLoggedUserRole()==='1'){
        return menu1;
    }
    if(dataService.getLoggedUserRole()==='2'){
        return menu2;
    }
}

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Admin',
  },
  {
    component: CNavGroup,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      items: [
          {
              component: CNavItem,
              name: 'Manager',
              to: '/users/manager',
              icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
          },
          {
              component: CNavItem,
              name: 'Operator',
              to: '/users/operator',
              icon: <CIcon icon={cilRowing} customClassName="nav-icon" />,
          },
      ],
  },
  {
    component: CNavItem,
    name: 'Operation',
    to: '/operation',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Manager',
  },
    {
        component: CNavItem,
        name: 'New Task',
        to: '/task/manager/new',
        icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Assign Task',
        to: '/task/manager/assign',
        icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Task List',
        to: '/task/manager/list',
        icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    },
  {
    component: CNavTitle,
    name: 'Operator',
  },
    {
        component: CNavItem,
        name: 'My Task',
        to: '/task/operator/assigned',
        icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Task List',
        to: '/task/operator/list',
        icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    },
]



export default {menu_nav}
