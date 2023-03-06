import React, {useEffect, useState} from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CModal,
//   CModalBody,
//   CModalFooter,
//   CModalHeader,
//   CModalTitle,
  CPagination, CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableFoot,
  CTableHead,
  CTableHeaderCell,
  CTableRow, CTooltip,
} from '@coreui/react'
import dataService from '../../../tool/dataService';
import moment from "moment";

const Tableviewlist = () => {
    let [resetVisible, setRestVisible] = useState(false)

    let [taskReport, setTaskReport]= useState([])
    let [taskList, setTaskList]= useState([])
  
    let [employees, setEmployees] = useState([]);
    let [pageTotal, setPageTotal]= useState(1)
    let [pageNum, setPageNum]= useState(1)
    let pageSize=10
  
    let [disabledPagePrevious, setDisabledPagePrevious]= useState(false)
    let [disabledPageNext, setDisabledPageNext]= useState(false)
  
  
    const initReports = (taskNo) => {
      let initData={
        taskNo:taskNo
      }
      dataService.exe("taskAssignment/listReport",initData)
          .then(response => {
            console.log('Printing employees data', response.data);
            setTaskList(response.data.data.taskList)
            setTaskReport(response.data.data.list)
          })
          .catch(error => {
            console.log('Something went wrong', error);
          })
    }
  
    const initDelete = (taskNo) => {
      let initData={
        taskNo:taskNo
      }
      dataService.exe("taskList/del",initData)
          .then(response => {
            console.log('Printing employees data/ delete ', response.data);
            initTable();
          })
          .catch(error => {
            console.log('Something went wrong', error);
          })
    }
  
    function Tooltip(txt){
      return (
          <CTooltip content={txt} placement="left">
            <CButton color="secondary">. . .</CButton>
          </CTooltip>
      )
    }
  
    function statCheck(statValue,reportValue) {
      if(!reportValue && statValue==='inProcess'){
        return 'notStarted'
      }
      return statValue
    }
  

  
    const initTable= () => {
      let initData={
        pageSize: pageSize,
        pageNum: pageNum,
        orderByColumn: 'priority',
        isAsc: 'desc',
        assignmentState:'inProcess'
      }
      setPageNum(pageNum)
      dataService.exe("taskAssignment/listOperatorAll",initData)
          .then(response => {
            console.log('Printing employees/new task data', response.data);
            dataPage(response.data)
          })
          .catch(error => {
            console.log('Something went wrong', error);
          })
    }
  
    function dataPage(resultData) {
      setEmployees(resultData.rows)
      let PageTotal=Math.ceil(resultData.total/pageSize)
      setPageTotal(PageTotal)
      PagePrevious()
      PageNext(PageTotal)
    }
  
  
    useEffect(() => {
      initTable();
    }, []);
  
    const PagePrevious = () =>{
      if(pageNum>1) {
        setDisabledPagePrevious(false)
      }else {
        setDisabledPagePrevious(true)
      }
    }
    const PageNext = (pTotal) =>{
      if(pageNum<pTotal){
        setDisabledPageNext(false)
      }else {
        setDisabledPageNext(true)
      }
    }
  return (
        <>
        <CRow>
          <CCol xs>
            <CCard className="mb-4">
              <CCardHeader>Manager - Task List</CCardHeader>
              <CCardBody>
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell>Task No</CTableHeaderCell>
                      <CTableHeaderCell>Order Date</CTableHeaderCell>
                      <CTableHeaderCell>Delivery Date</CTableHeaderCell>
                      <CTableHeaderCell>Item</CTableHeaderCell>
                      <CTableHeaderCell>Finsize</CTableHeaderCell>
                      <CTableHeaderCell>Purchase Order Qty</CTableHeaderCell>
                      <CTableHeaderCell>Priority</CTableHeaderCell>
                      <CTableHeaderCell>Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {employees.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell>
                            <strong>{item.taskNo}</strong>
                          </CTableDataCell>
                          <CTableDataCell>
                            <strong>{moment(item.orderDate).format('MM/DD/YYYY')}</strong>
                          </CTableDataCell>
                          <CTableHeaderCell>
                            <strong>{moment(item.deliveryDate).format('MM/DD/YYYY')}</strong>
                          </CTableHeaderCell>
                          <CTableDataCell>
                            <div>{item.item}</div>
                          </CTableDataCell>
                          <CTableHeaderCell>
                            <strong>{item.finsize}</strong>
                          </CTableHeaderCell>
                          <CTableHeaderCell>
                            <strong>{item.purchaseOrderQty}</strong>
                          </CTableHeaderCell>
                          <CTableHeaderCell>
                            <strong>{item.priority}</strong>
                          </CTableHeaderCell>
                          <CTableDataCell>
                            <CButton color="primary" onClick={() => initReports(item.taskNo)>setRestVisible(true)}>Reports</CButton>
                            {/* <CButton color="danger" onClick={() => initDelete(item.taskNo)}>Delete</CButton> */}
                          </CTableDataCell>
                        </CTableRow>
                    ))
                    }
                  </CTableBody>
                  <CTableFoot>
                    <CTableRow>
                      <CTableHeaderCell colSpan="13">
                        <CPagination align="center" aria-label="Page navigation">
                          <CPaginationItem disabled={disabledPagePrevious} onClick={()=>setPageNum(pageNum--)>initTable()}>Previous</CPaginationItem>
                          <CPaginationItem>{pageNum}/{pageTotal}</CPaginationItem>
                          <CPaginationItem disabled={disabledPageNext} onClick={()=>setPageNum(pageNum++)>initTable()}>Next</CPaginationItem>
                        </CPagination>
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableFoot>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        {/* {ContentReports()} */}
      </>
  )
}

export default Tableviewlist
