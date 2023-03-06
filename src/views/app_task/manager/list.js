import React, {useEffect, useState} from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
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


const ManagerTaskList = () => {

  let [resetVisible, setRestVisible] = useState(false)
  let [delVisible, setDelVisible] = useState(false)
  let [taskReport, setTaskReport]= useState([])
  let [taskList, setTaskList]= useState([])
  let [taskNo, setTaskNo]=useState('')
  let [taskAsNo, setTaskAsNo]=useState('')
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

  const ItemSet=(item)=>{
    setTaskNo(item.taskNo)
    setTaskAsNo(item.taskAsNo)
    // setUserNo(item.userNo)
    // setUserLoginName(item.userLoginName)
    // setUserTrueName(item.userTrueName)
  }

  const ContentDel = () => {

    const initDeletetask = (taskAsNo,taskNo) => {
      setDelVisible(false);
      let initData={
        taskAsNo:taskAsNo
      }
      console.log('Task As NO', taskAsNo);
      dataService.exe("taskAssignment/del",initData)
          .then(response => {
            console.log('Printing employees data/ delete ', response.data);
            initReports(taskNo);
          })
          .catch(error => {
            console.log('Something went wrong', error);
          })
    }

    // const handleDel = (event) => {
    //   event.preventDefault()
    //   setDelVisible(false)
    //   const postData ={
    //     managementOperatorNo:userNo
    //   }
    //   dataService.exe("managementOperator/del",postData)
    //       .then(response => {
    //         console.log('Del successfully', response.data);
    //         DataAlertShow(response.data)
    //         initTable();
    //       })
    //       .catch(error => {
    //         console.log('Del wrong', error);
    //       })
    // }

    return (
        <>
          <CModal visible={delVisible} onClose={() => setDelVisible(false)} alignment="center">
            <CModalHeader>
              <CModalTitle>Delete List</CModalTitle>
            </CModalHeader>
            {/* <CForm onSubmit={handleDel}> */}
              <CModalBody>
                <CInputGroup className="mb-3">
                  <CInputGroupText >Are You Sure you want to delete task?</CInputGroupText>
                  {/* <CFormInput value={taskAsNo} readOnly disabled /> */}
                </CInputGroup>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" >
                  Close
                </CButton>
                <CButton color="primary" onClick={() => initDeletetask(taskAsNo,taskNo)>setDelVisible(false)}>
                  Delete
                </CButton>
              </CModalFooter>
            {/* </CForm> */}
          </CModal>
        </>
    )
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

  const ContentReports = () => {

    return (
        <>
          <CModal scrollable visible={resetVisible} onClose={() => setRestVisible(false)} alignment="center" fullscreen>
            <CModalHeader>
              <CModalTitle>Task Report</CModalTitle>
            </CModalHeader>
            <CModalBody>
                  <CCard className="mb-2">
                    <CCardHeader><strong>Task</strong></CCardHeader>
                    <CCardBody>
                      <CInputGroup className="mb-2">
                        <CInputGroupText className="col-sm-2">Task No</CInputGroupText>
                        <CFormInput className="me-2" value={taskList.taskNo || ''} disabled />
                        <CInputGroupText className="col-sm-2">Finsize</CInputGroupText>
                        <CFormInput value={taskList.finsize || ''} disabled className="me-2"/>
                        <CInputGroupText className="col-sm-2">Order Date</CInputGroupText>
                        <CFormInput className="me-2" value={moment(taskList.orderDate || '').format("DD/MM/YYYY")} disabled />
                      </CInputGroup>
                      <CInputGroup className="mb-2">
                        <CInputGroupText className="col-sm-2">Item</CInputGroupText>
                        <CFormInput className="me-2" value={taskList.item || ''} disabled />
                        <CInputGroupText className="col-sm-2">Assembly</CInputGroupText>
                        <CFormInput className="me-2" value={taskList.assembly || ''} disabled />
                        <CInputGroupText className="col-sm-2">Delivery Date</CInputGroupText>
                        <CFormInput className="me-2" value={moment(taskList.deliveryDate || '').format("DD/MM/YYYY")} disabled />
                      </CInputGroup>
                      <CInputGroup className="mb-2">
                        <CInputGroupText className="col-sm-2">Part No</CInputGroupText>
                        <CFormInput className="me-2" value={taskList.partNo || ''} disabled />
                        <CInputGroupText className="col-sm-2">Purchase Order Qty</CInputGroupText>
                        <CFormInput className="me-2" value={taskList.purchaseOrderQty || ''} disabled />
                        <CInputGroupText className="col-sm-2">Production Qty</CInputGroupText>
                        <CFormInput className="me-2" value={taskList.productionQty || ''} disabled />
                      </CInputGroup>
                      <CInputGroup className="mb-2">
                        <CInputGroupText className="col-sm-2">Purchase Order No</CInputGroupText>
                        <CFormInput className="me-2" value={taskList.purchaseOrderNo || ''} disabled />
                        <CInputGroupText className="col-sm-2">Purchase Order Date</CInputGroupText>
                        <CFormInput className="me-2" value={moment(taskList.purchaseOrderDate || '').format("DD/MM/YYYY")} disabled />
                        <CInputGroupText className="col-sm-2">Issue Date</CInputGroupText>
                        <CFormInput className="me-2" value={moment(taskList.issueDate || '').format("DD/MM/YYYY")} disabled />
                      </CInputGroup>
                    </CCardBody>
                  </CCard>
                  <CCard className="mb-2">
                    <CCardHeader><strong>Report</strong></CCardHeader>
                    <CCardBody>
                      <CTable align="middle" className="mb-0 border" hover responsive>
                        <CTableHead color="light">
                          <CTableRow>
                            <CTableHeaderCell>Operator</CTableHeaderCell>
                            <CTableHeaderCell>Operation</CTableHeaderCell>
                            <CTableHeaderCell>Machine</CTableHeaderCell>
                            <CTableHeaderCell>From</CTableHeaderCell>
                            <CTableHeaderCell>To</CTableHeaderCell>
                            <CTableHeaderCell>Assignment Time</CTableHeaderCell>
                            <CTableHeaderCell>Description</CTableHeaderCell>
                            <CTableHeaderCell>Target Qty</CTableHeaderCell>
                            <CTableHeaderCell>State</CTableHeaderCell>
                            <CTableHeaderCell>Qty Done</CTableHeaderCell>
                            <CTableHeaderCell>Priority</CTableHeaderCell>
                            <CTableHeaderCell>Remarks</CTableHeaderCell>
                            <CTableHeaderCell>Submit Time</CTableHeaderCell>
                            <CTableHeaderCell>Action</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {taskReport.map((item, index) => (
                              <CTableRow v-for="item in tableItems" key={index}>
                                <CTableHeaderCell>{item.userOperatorName}</CTableHeaderCell>
                                <CTableHeaderCell>{item.dictOpName}</CTableHeaderCell>
                                <CTableHeaderCell>{item.machineName}</CTableHeaderCell>
                                <CTableHeaderCell>{item.fromDate && moment(item.fromDate).format("DD/MM/YYYY")}</CTableHeaderCell>
                                <CTableHeaderCell>{item.toDate && moment(item.toDate).format("DD/MM/YYYY")}</CTableHeaderCell>
                                <CTableHeaderCell>{moment(item.assignmentTime).format("HH:mm:ss DD/MM/YYYY")}</CTableHeaderCell>
                                <CTableHeaderCell>{item.operationDescription}</CTableHeaderCell>
                                <CTableHeaderCell>{item.targetQty}</CTableHeaderCell>
                                <CTableHeaderCell>{statCheck(item.assignmentState,item.qtyDone)}</CTableHeaderCell>
                                <CTableHeaderCell>{item.qtyDone}</CTableHeaderCell>
                                <CTableHeaderCell>{item.priority}</CTableHeaderCell>
                                <CTableHeaderCell>{item.remarks}</CTableHeaderCell>
                                <CTableHeaderCell>{item.submitTime && moment(item.submitTime).format("HH:mm:ss DD/MM/YYYY")}</CTableHeaderCell>
                                <CTableHeaderCell>
                                  <CButton color="danger" onClick={() => ItemSet(item)>setDelVisible(true)}>Delete</CButton>
                                </CTableHeaderCell>
                              </CTableRow>
                          ))
                          }
                        </CTableBody>
                      </CTable>
                    </CCardBody>
                  </CCard>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setRestVisible(false)}>
                Close
              </CButton>
            </CModalFooter>
          </CModal>
        </>
    )
  }

  const initTable= () => {
    let initData={
      pageSize: pageSize,
      pageNum: pageNum,
      orderByColumn: 'task_no',
      isAsc: 'desc',
    }
    setPageNum(pageNum)
    dataService.exe("taskList/list",initData)
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
                      <CTableHeaderCell>Finsize</CTableHeaderCell>
                      <CTableHeaderCell>Order Date</CTableHeaderCell>
                      <CTableHeaderCell>Item</CTableHeaderCell>
                      <CTableHeaderCell>Assembly</CTableHeaderCell>
                      <CTableHeaderCell>Delivery Date</CTableHeaderCell>
                      <CTableHeaderCell>Part No</CTableHeaderCell>
                      <CTableHeaderCell>Purchase Order Qty</CTableHeaderCell>
                      <CTableHeaderCell>Production Qty</CTableHeaderCell>
                      <CTableHeaderCell>Purchase Order No</CTableHeaderCell>
                      <CTableHeaderCell>Purchase Order Date</CTableHeaderCell>
                      <CTableHeaderCell>Issue Date</CTableHeaderCell>
                      <CTableHeaderCell colSpan={2}>Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {employees.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell>
                            <strong>{item.taskNo}</strong>
                          </CTableDataCell>
                          <CTableDataCell>
                            <strong>{item.finsize}</strong>
                          </CTableDataCell>
                          <CTableDataCell>
                            <strong>{moment(item.orderDate).format('MM/DD/YYYY')}</strong>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.item}</div>
                          </CTableDataCell>
                          <CTableHeaderCell>
                            <strong>{item.assembly}</strong>
                          </CTableHeaderCell>
                          <CTableHeaderCell>
                            <strong>{moment(item.deliveryDate).format('MM/DD/YYYY')}</strong>
                          </CTableHeaderCell>
                          <CTableHeaderCell>
                            <strong>{item.partNo}</strong>
                          </CTableHeaderCell>
                          <CTableHeaderCell>
                            <strong>{item.purchaseOrderQty}</strong>
                          </CTableHeaderCell>
                          <CTableHeaderCell>
                            <strong>{item.productionQty}</strong>
                          </CTableHeaderCell>
                          <CTableHeaderCell>
                            <strong>{item.purchaseOrderNo}</strong>
                          </CTableHeaderCell>
                          <CTableHeaderCell>
                            <strong>{moment(item.purchaseOrderDate).format('MM/DD/YYYY')}</strong>
                          </CTableHeaderCell>
                          <CTableHeaderCell>
                            <strong>{moment(item.issueDate).format('MM/DD/YYYY')}</strong>
                          </CTableHeaderCell>
                          <CTableDataCell>
                            <CButton color="primary" onClick={() => initReports(item.taskNo)>setRestVisible(true)}>Reports</CButton>
                          </CTableDataCell>
                          <CTableDataCell>  
                            <CButton color="danger" onClick={() => initDelete(item.taskNo)}>Delete</CButton>
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
        {ContentReports()}
        {ContentDel()}
      </>
  )
}

export default ManagerTaskList
