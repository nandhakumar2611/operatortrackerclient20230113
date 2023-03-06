import React, {useEffect, useState} from 'react'
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader, 
  CCol,
  CFormInput, CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CPagination, CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableFoot,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CForm,
  CModalBody,
  CModalFooter
} from '@coreui/react'

import dataService from '../../../tool/dataService';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const OperatorAssigned = () => {

  let [visibleAlertSuccess, setVisibleAlertSuccess] = useState(false)
  let [visibleAlertFail, setVisibleAlertFail] = useState(false)
  
  let [resetVisible, setRestVisible] = useState(false)

  let [addVisible, setAddVisible] = useState(false)
  let [machineName, setMachineName]=useState('')

  let [taskNo, setTaskNo]=useState('')

  let [startTime, setStartTime]=useState( setHours(setMinutes(new Date(), 30), 16))
  let [endTime, setEndTime]=useState( setHours(setMinutes(new Date(), 30), 16))

  let [taskReport, setTaskReport]= useState([])
  let [taskList, setTaskList]= useState([])

  let [reportQtyDone, setReportQtyDone ]= useState('');
  let [reportRemarks, setReportRemarks ]= useState('');

  let [employees, setEmployees] = useState([]);
  let [pageTotal, setPageTotal]= useState(1)
  let [pageNum, setPageNum]= useState(1)
  let pageSize= 1
  // let date = new Date().toLocaleDateString();

  let [disabledPagePrevious, setDisabledPagePrevious]= useState(false)
  let [disabledPageNext, setDisabledPageNext]= useState(false)


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
                            <CTableHeaderCell>Remarks</CTableHeaderCell>
                            <CTableHeaderCell>Submit Time</CTableHeaderCell>
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
                                <CTableHeaderCell>{item.remarks}</CTableHeaderCell>
                                <CTableHeaderCell>{item.submitTime && moment(item.submitTime).format("HH:mm:ss DD/MM/YYYY")}</CTableHeaderCell>
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
 

  const ContentAdd = () => {

    const initData = () => {
      // setMachineName('')
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      setAddVisible(false)
      const postData ={
        taskStartTime:moment(startTime).format('YYYY/MM/DD HH:mm:ss'),
        taskEndTime:moment(endTime).format('YYYY/MM/DD HH:mm:ss')
      }
      console.log('Printing postData', postData);
      dataService.exe("operatorTime/add",postData)
          .then(response => {
            console.log('add successfully', response.data);
            DataAlertShow(response.data)
            initTable();
          })
          .catch(error => {
            console.log('Something wrong', error);
          })
    }

    return (
        <>
          <CModal scrollable visible={addVisible} onClose={() => setAddVisible(false)} alignment="center">
            <CModalHeader>
              <CModalTitle>Add Operation Time</CModalTitle>
            </CModalHeader>
            <CForm onSubmit={handleSubmit} >
              <CModalBody style={{height:'25pc'}}>
                <CInputGroup className="mb-3">
                  <CInputGroupText className="col-sm-4">Start Time</CInputGroupText>
                    <CRow>
                      <CCol>
                        <DatePicker
                            value={startTime}
                            selected={startTime}
                            onSelect={(date) => setStartTime(date)}
                            onChange={(date) => setStartTime(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            injectTimes={[
                              setHours(setMinutes(new Date(), 1), 0),
                              setHours(setMinutes(new Date(), 5), 12),
                              setHours(setMinutes(new Date(), 59), 23),
                            ]}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="col-form-label"
                            required
                        />
                      </CCol>
                    </CRow>
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText className="col-sm-4">End Time</CInputGroupText>
                  <CRow>
                      <CCol>
                        <DatePicker
                            value={endTime}
                            selected={endTime}
                            onSelect={(date) => setEndTime(date)}
                            onChange={(date) => setEndTime(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            injectTimes={[
                              setHours(setMinutes(new Date(), 1), 0),
                              setHours(setMinutes(new Date(), 5), 12),
                              setHours(setMinutes(new Date(), 59), 23),
                            ]}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="col-form-label"
                            required
                        />
                      </CCol>
                    </CRow>
                </CInputGroup>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setAddVisible(false)}>
                  Close
                </CButton>
                <CButton color="primary" type="submit">
                  Save
                </CButton>
              </CModalFooter>
            </CForm>
          </CModal>
        </>
    )
  }

  const ItemSet=(item)=>{
    setTaskNo(item.taskNo)
    // setUserNo(item.userNo)
    // setUserLoginName(item.userLoginName)
    // setUserTrueName(item.userTrueName)
  }

  const TaskReport=(item,taskState)=>{
    let postData={
      taskAsNo:item.taskAsNo,
      taskReportNo:item.taskReportNo,
      qtyDone: reportQtyDone,
      remarks: reportRemarks,
      taskState: taskState
    }
    console.log('Printing postData', postData);
    dataService.exe("taskReport/addReport",postData)
        .then(response => {
          console.log('add successfully', response.data);
          DataAlertShow(response.data)
          document.getElementById("qtyDone").value=''
          document.getElementById("remarks").value=''
          initTable();
        })
        .catch(error => {
          console.log('Something wrong', error);
        })
  }

  const TaskView=(item)=>{
    let initData={
      taskNo:item.taskNo
    }
    console.log(initData)
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
          console.log('Printing employees data', response.data);
          dataPage(response.data)
          console.log("Data",response.data.total);
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
              <CCardHeader>Operator - My Task - <strong>Report Back</strong></CCardHeader>
              <CCardBody>
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell colSpan="3" className="text-right">
                        <CAlert color="success" dismissible visible={visibleAlertSuccess} onClose={() => setVisibleAlertSuccess(false)} className="text-center">Success!</CAlert>
                        <CAlert color="danger" dismissible visible={visibleAlertFail} onClose={() => setVisibleAlertFail(false)} className="text-center">Failed!</CAlert>
                        <div>{ContentAdd()}</div>                      
                      </CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell colSpan="3">
                        <CPagination align="center" aria-label="Page navigation">
                          <CPaginationItem disabled={disabledPagePrevious} onClick={()=>setPageNum(pageNum--)>initTable()}>Previous</CPaginationItem>
                          <CPaginationItem>{pageNum}/{pageTotal}</CPaginationItem>
                          <CPaginationItem disabled={disabledPageNext} onClick={()=>setPageNum(pageNum++)>initTable()}>Next</CPaginationItem>
                        </CPagination>
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell>Task</CTableHeaderCell>
                      <CTableHeaderCell>Target</CTableHeaderCell>
                      <CTableHeaderCell>Report</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {employees.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell align={"top"}>
                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-5">Task No</CInputGroupText>
                              <CFormInput value={item.taskNo} disabled />
                            </CInputGroup>
                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-5">Finsize</CInputGroupText>
                              <CFormInput value={item.finsize} disabled />
                            </CInputGroup>
                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-5">Order Date</CInputGroupText>
                              <CFormInput value={moment(item.orderDate).format("MM/DD/YYYY")} disabled />
                            </CInputGroup>
                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-5">Item</CInputGroupText>
                              <CFormInput value={item.item} disabled />
                            </CInputGroup>
                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-5">Assembly</CInputGroupText>
                              <CFormInput value={item.assembly} disabled />
                            </CInputGroup>
                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-5">Delivery Date</CInputGroupText>
                              <CFormInput value={moment(item.deliveryDate).format("MM/DD/YYYY")} disabled />
                            </CInputGroup>
                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-5">Part No</CInputGroupText>
                              <CFormInput value={item.partNo} disabled />
                            </CInputGroup>
                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-5">Purchase Order Qty</CInputGroupText>
                              <CFormInput value={item.purchaseOrderQty} type="number" disabled />
                            </CInputGroup>
                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-5">Production Qty</CInputGroupText>
                              <CFormInput value={item.productionQty} disabled />
                            </CInputGroup>
                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-5">Purchase Order No</CInputGroupText>
                              <CFormInput value={item.purchaseOrderNo} disabled />
                            </CInputGroup>
                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-5">Purchase Order Date</CInputGroupText>
                              <CFormInput value={moment(item.purchaseOrderDate).format("MM/DD/YYYY")} disabled />
                            </CInputGroup>
                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-5">Issue Date</CInputGroupText>
                              <CFormInput value={moment(item.issueDate).format("MM/DD/YYYY")} disabled />
                            </CInputGroup>
                          </CTableDataCell>
                          <CTableDataCell align={"top"}>
                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-4">Plant</CInputGroupText>
                              <CFormInput value={item.plantName} disabled />
                            </CInputGroup>
                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-4">Machine</CInputGroupText>
                              <CFormInput value={item.machineName} disabled />
                            </CInputGroup>
                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-4">Operation</CInputGroupText>
                              <CFormInput value={item.dictOpName} disabled />
                            </CInputGroup>
                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-4">From</CInputGroupText>
                              <CFormInput value={moment(item.fromDate).format("MM/DD/YYYY")} disabled />
                            </CInputGroup>
                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-4">To</CInputGroupText>
                              <CFormInput value={moment(item.toDate).format("MM/DD/YYYY")} disabled />
                            </CInputGroup>
                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-4">Target Qty</CInputGroupText>
                              <CFormInput value={item.targetQty} disabled id="targetQty"  />
                            </CInputGroup>
                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-4">Priority</CInputGroupText>
                              <CFormInput value={item.priority} disabled id="targetQty"  />
                            </CInputGroup>
                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-4">Description</CInputGroupText>
                              <CFormTextarea value={item.operationDescription} disabled id="operationDescription" rows="7" />
                            </CInputGroup>
                          </CTableDataCell>
                          <CTableDataCell className="text-center" align={"top"}>

                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-4">Qty Done</CInputGroupText>
                              <CFormInput disabled value={item.qtyDone} />
                            </CInputGroup>

                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-4">Remarks</CInputGroupText>
                              <CFormTextarea rows="5" disabled value={item.remarks}/>
                            </CInputGroup>
                            <CCard>
                              <CCardHeader><strong>New Report</strong></CCardHeader>
                              <CCardBody>
                                <CInputGroup className="mb-2">
                                  <CInputGroupText className="col-sm-4">Qty Done</CInputGroupText>
                                  <CFormInput type="number" id={"qtyDone"} required onChange={event => setReportQtyDone(event.target.value)} />
                                </CInputGroup>
                                <CInputGroup className="mb-2">
                                  <CInputGroupText className="col-sm-4">Remarks</CInputGroupText>
                                  <CFormTextarea rows="5" id={"remarks"} required onChange={event => setReportRemarks(event.target.value)} />
                                </CInputGroup>
                                <CButton color="primary" onClick={()=>TaskView(item)>setRestVisible(true)}>View</CButton>
                                &nbsp;&nbsp;
                                <CButton color="primary" onClick={()=>TaskReport(item,0)}>Report</CButton>
                                &nbsp;&nbsp;
                                <CButton color="primary" onClick={()=>TaskReport(item,1)}>Task Done</CButton>
                                &nbsp;&nbsp;
                                <CButton color="primary" onClick={()=>ItemSet(item)>setAddVisible(true)}>Time</CButton>
                                
                              </CCardBody>
                            </CCard>
                          </CTableDataCell>
                        </CTableRow>
                    ))
                    }
                  </CTableBody>
                  <CTableFoot>
                    <CTableRow>
                      <CTableHeaderCell colSpan="3">
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
      </>
  )
}


export default OperatorAssigned
