import React, {useEffect, useState} from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput, CFormSelect, CFormTextarea,
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
  CTableRow,
} from '@coreui/react'

import dataService from '../../../tool/dataService';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const DashboardManagerAssign = () => {

  let [visibleAlertSuccess, setVisibleAlertSuccess] = useState(false)
  let [visibleAlertFail, setVisibleAlertFail] = useState(false)
  let [assignVisible, setAssignVisible] = useState(false)
  let [assignedVisible, setAssignedVisible] = useState(false)

  let [taskNo, setTaskNo ]= useState()
  let [fromDate, setFromDate ]= useState(new Date())
  let [toDate, setToDate ]= useState(new Date())
  let [userNoOperator, setUserNoOperator ]= useState()
  let [taskOperation, setTaskOperation ]= useState()
  let [operationDescription, setOperationDescription ]= useState()
  let [targetQty, setTargetQty ]= useState(0)
  let [employees, setEmployees] = useState([]);
  let [pageTotal, setPageTotal]= useState(1)
  let [pageNum, setPageNum]= useState(1)
  let pageSize= 10

  let [machineNo, setMachineNo ]= useState()

  let [disabledPagePrevious, setDisabledPagePrevious]= useState(false)
  let [disabledPageNext, setDisabledPageNext]= useState(false)

  let [listOperator, setListOperator] = useState([]);
  let [listDictOperation, setListDictOperation] = useState([]);
  let [listMachine, setListMachine] = useState([]);
  let [listAssigned, setListAssigned] = useState([]);

  const ItemSet=(item)=>{
    setTaskNo(item.taskNo)
    initMachine(item.plantNo)
  }

  const ContentAssign = () => {

    const handleAssign = (event) => {
      event.preventDefault()
      setAssignVisible(false)
      const postData ={
        taskNo:taskNo,
        userNoOperator:userNoOperator,
        dictOpNo:taskOperation,
        fromDate:moment(fromDate).format('MM/DD/YYYY'),
        toDate:moment(toDate).format('MM/DD/YYYY'),
        operationDescription:operationDescription,
        targetQty:targetQty,
        machineNo:machineNo
      }
      dataService.exe("taskAssignment/add",postData)
          .then(response => {
            console.log('Assign successfully', response.data);
            DataAlertShow(response.data)
            initTable();
          })
          .catch(error => {
            console.log('Assign wrong', error);
          })
    }

    const handleSelect1 = (e) => {
      setTaskOperation(e.target.value)
    }
    const handleSelect2 = (e) => {
      setUserNoOperator(e.target.value)
    }
    const handleSelect3 = (e) => {
      setMachineNo(e.target.value)
    }

    return (
        <>
          <CModal scrollable visible={assignVisible} onClose={() => setAssignVisible(false)} alignment="center">
            <CModalHeader>
              <CModalTitle>Assign</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm onSubmit={handleAssign} id="formSubA">
              <CInputGroup className="mb-3">
                <CInputGroupText className="col-sm-4">Task No</CInputGroupText>
                <CFormInput value={taskNo} readOnly disabled />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText className="col-sm-4">Select Machine</CInputGroupText>
                <CFormSelect multiple onChange={(e)=>handleSelect3(e)} required>
                  {listMachine.map((item,index) => (
                      <option value={item.machineNo} key={index}>{item.machineName}</option>
                  ))
                  }
                </CFormSelect>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText className="col-sm-4">Select Operation</CInputGroupText>
                <CFormSelect multiple onChange={(e)=>handleSelect1(e)} required>
                  {listDictOperation.map((item,index) => (
                      <option value={item.dictOpNo} key={index}>{item.dictOpName}</option>
                  ))
                  }
                </CFormSelect>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText className="col-sm-4">Select Operator</CInputGroupText>
                <CFormSelect multiple onChange={(e)=>handleSelect2(e)} required>
                  {listOperator.map((item,index) => (
                      <option value={item.userNoOperator} key={index} >{item.userOperatorTrueName}</option>
                  ))
                  }
                </CFormSelect>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText className="col-sm-4">From</CInputGroupText>
                <CRow>
                  <CCol>
                    <DatePicker
                        value={fromDate}
                        selected={fromDate}
                        onSelect={(date) => setFromDate(date)}
                        onChange={(date) => setFromDate(date)}
                        className="col-form-label"
                        required
                    />
                  </CCol>
                </CRow>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText className="col-sm-4">To</CInputGroupText>
                <CRow>
                  <CCol>
                    <DatePicker
                        value={toDate}
                        selected={toDate}
                        onSelect={(date) => setToDate(date)}
                        onChange={(date) => setToDate(date)}
                        className="col-form-label"
                        required
                    />
                  </CCol>
                </CRow>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText className="col-sm-4">Target Qty</CInputGroupText>
                <CFormInput type="number" id="targetQty" required onChange={(event)=>setTargetQty(event.target.value)} />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText className="col-sm-4">Description</CInputGroupText>
                <CFormTextarea id="operationDescription" rows="3" onChange={(event)=>setOperationDescription(event.target.value)} />
              </CInputGroup>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setAssignVisible(false)}>
                    Close
                  </CButton>
                  <CButton color="primary" type="submit">
                    Save
                  </CButton>
                </CModalFooter>
            </CForm>
            </CModalBody>
          </CModal>
        </>
    )
  }

  const ContentAssigned = () => {
    return (
        <>
          <CModal scrollable visible={assignedVisible} onClose={() => setAssignedVisible(false)} alignment="center" fullscreen>
            <CModalHeader>
              <CModalTitle>Assigned</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Task No</CTableHeaderCell>
                    <CTableHeaderCell>Operator</CTableHeaderCell>
                    <CTableHeaderCell>Operation</CTableHeaderCell>
                    <CTableHeaderCell>From</CTableHeaderCell>
                    <CTableHeaderCell>To</CTableHeaderCell>
                    <CTableHeaderCell>Target Qty</CTableHeaderCell>
                    <CTableHeaderCell>Description</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {listAssigned.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell>
                          <strong>{item.taskNo}</strong>
                        </CTableDataCell>
                        <CTableDataCell>
                          <strong>{item.userOperatorName}</strong>
                        </CTableDataCell>
                        <CTableDataCell>
                          <strong>{item.dictOpName}</strong>
                        </CTableDataCell>
                        <CTableDataCell>
                          <strong>{moment(item.fromDate).format('MM/DD/YYYY')}</strong>
                        </CTableDataCell>
                        <CTableHeaderCell>
                          <strong>{moment(item.toDate).format('MM/DD/YYYY')}</strong>
                        </CTableHeaderCell>
                        <CTableDataCell>
                          <div>{item.targetQty}</div>
                        </CTableDataCell>
                        <CTableHeaderCell className="col-sm-4">
                          {item.operationDescription}
                        </CTableHeaderCell>
                      </CTableRow>
                  ))
                  }
                </CTableBody>
              </CTable>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setAssignedVisible(false)}>
                Close
              </CButton>
            </CModalFooter>
          </CModal>
        </>
    )
  }

  const initOperation= () => {
    let initData={
      pageSize: pageSize,
      pageNum: pageNum,
      orderByColumn: '',
      isAsc: 'desc',
    }
    dataService.exe("dictOperations/list",initData)
        .then(response => {
          console.log('Printing employees/Operation data', response.data);
          setListDictOperation(response.data.rows)
        })
        .catch(error => {
          console.log('Something went wrong', error);
        })
  }

  const initTable= () => {
    let initData={
      pageSize: pageSize,
      pageNum: pageNum,
      orderByColumn: 'taskNo',
      isAsc: 'desc'
    }
    setPageNum(pageNum)
    dataService.exe("taskList/listAss",initData)
        .then(response => {
          console.log('Printing employees data', response.data);
          dataPage(response.data)
        })
        .catch(error => {
          console.log('Something went wrong', error);
        })
  }

  const initOperator = () => {
    let initData={
      userNoManager:0
    }
    dataService.exe("managementOperator/listName",initData)
        .then(response => {
          console.log('Printing employees/Operator data', response.data);
          setListOperator(response.data.rows)
        })
        .catch(error => {
          console.log('Something went wrong', error);
        })
  }

  const initMachine = (plantNo) => {
    let initData={
        appPlantNo:plantNo
    }
    dataService.exe("managementMachine/listPlant",initData)
        .then(response => {
          console.log('Printing employees/Plant data', response.data);
          setListMachine(response.data.rows)
        })
        .catch(error => {
          console.log('Something went wrong', error);
        })
  }

  const initAssigned = (taskNo) => {
    let initData={
      taskNo:taskNo
    }
    dataService.exe("taskAssignment/listName",initData)
        .then(response => {
          console.log('Printing employees/Assgined data', response.data);
          setListAssigned(response.data.rows)
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
    initOperation();
    initOperator();
    initAssigned();
    initMachine()
  }, []);

  function DataAlertShow(resultData) {
    if(resultData.code===0){
      setVisibleAlertFail(true)
      setVisibleAlertSuccess(false)
    }
    if(resultData.code===1){
      setVisibleAlertSuccess(true)
      setVisibleAlertFail(false)
    }
  }
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
              <CCardHeader>Manager - Assign Tasks</CCardHeader>
              <CCardBody>
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell colSpan="8" className="text-right">
                        <CAlert color="success" dismissible visible={visibleAlertSuccess} onClose={() => setVisibleAlertSuccess(false)} className="text-center">Success!</CAlert>
                        <CAlert color="danger" dismissible visible={visibleAlertFail} onClose={() => setVisibleAlertFail(false)} className="text-center">Failed!</CAlert>
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell>Task No</CTableHeaderCell>
                      <CTableHeaderCell>Finsize</CTableHeaderCell>
                      <CTableHeaderCell>Order Date</CTableHeaderCell>
                      <CTableHeaderCell>Item</CTableHeaderCell>
                      <CTableHeaderCell>Assembly</CTableHeaderCell>
                      <CTableHeaderCell>Delivery Date</CTableHeaderCell>
                      <CTableHeaderCell>Plant Name</CTableHeaderCell>
                      <CTableHeaderCell>Assigned</CTableHeaderCell>
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
                            <strong>{item.plantName}</strong>
                          </CTableHeaderCell>
                          <CTableHeaderCell>
                            <CButton color="primary" variant="ghost" onClick={() =>initAssigned(item.taskNo)> setAssignedVisible(true)}>{item.assNum}</CButton>
                          </CTableHeaderCell>
                          <CTableDataCell>
                            <CButton color="primary" onClick={() => ItemSet(item)>setAssignVisible(true)}>Assign</CButton>
                          </CTableDataCell>
                        </CTableRow>
                    ))
                    }
                  </CTableBody>
                  <CTableFoot>
                    <CTableRow>
                      <CTableHeaderCell colSpan="8">
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
        {ContentAssign()}
        {ContentAssigned()}
      </>
  )
}

export default DashboardManagerAssign
