import React, {useEffect, useState} from 'react'

import {
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
} from '@coreui/react'

import dataService from '../../../tool/dataService';
import moment from "moment";


const OperatorAssignedList = () => {

  let [employees, setEmployees] = useState([]);
  let [pageTotal, setPageTotal]= useState(1)
  let [pageNum, setPageNum]= useState(1)
  let pageSize= 1

  let [disabledPagePrevious, setDisabledPagePrevious]= useState(false)
  let [disabledPageNext, setDisabledPageNext]= useState(false)

  const initTable= () => {
    let initData={
      pageSize: pageSize,
      pageNum: pageNum,
      orderByColumn: 'taskAsNo',
      isAsc: 'desc',
      assignmentState:'done'
    }
    setPageNum(pageNum)
    dataService.exe("taskAssignment/listOperatorAll",initData)
        .then(response => {
          console.log('Printing employees data', response.data);
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
              <CCardHeader>Operator - Task List - <strong>Done</strong></CCardHeader>
              <CCardBody>
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead>
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
                              <CInputGroupText className="col-sm-4">Description</CInputGroupText>
                              <CFormTextarea value={item.operationDescription} disabled id="operationDescription" rows="7" />
                            </CInputGroup>
                          </CTableDataCell>
                          <CTableDataCell className="text-center" align={"top"}>

                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-4">Qty Done</CInputGroupText>
                              <CFormInput id={"qtyDone"} required value={item.qtyDone} disabled />
                            </CInputGroup>

                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-4">Remarks</CInputGroupText>
                              <CFormTextarea rows="5" value={item.remarks} disabled />
                            </CInputGroup>
                            <CInputGroup className="mb-2">
                              <CInputGroupText className="col-sm-4">Submit Time</CInputGroupText>
                              <CFormInput value={moment(item.submitTime).format("MM/DD/YYYY")} disabled />
                            </CInputGroup>
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
      </>
  )
}

export default OperatorAssignedList
