import React, { useEffect, useState } from 'react'

import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput, CFormSelect,
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

const OperatorTime = () => {

  let [visibleAlertSuccess, setVisibleAlertSuccess] = useState(false)
  let [visibleAlertFail, setVisibleAlertFail] = useState(false)

  let [operatorTime, setOperatorTime] = useState([]);

  let [pageDataTotal, setPageDataTotal] = useState(0)
  let [pageTotal, setPageTotal] = useState(1)
  let [pageNum, setPageNum] = useState(1)
  let [pageSize, setPageSize] = useState(10)

  let [disabledPagePrevious, setDisabledPagePrevious] = useState(false)
  let [disabledPageNext, setDisabledPageNext] = useState(false)



  const initTable = () => {
    let initData = {
      pageSize: pageSize,
      pageNum: pageNum,
      orderByColumn: '',
      isAsc: ''
    }
    setPageNum(pageNum)
    dataService.exe("operatorTime/listUser", initData)
      .then(response => {
        console.log('Printing employees data', response.data);
        dataPage(response.data)
      })
      .catch(error => {
        console.log('Something went wrong', error);
      })
  }

  function dataPage(resultData) {
    //setEmployees(resultData.rows);
    setOperatorTime(resultData.rows);
    setPageDataTotal(resultData.total)
    let PageTotal = Math.ceil(resultData.total / pageSize)
    setPageTotal(PageTotal)
    PagePrevious()
    PageNext(PageTotal)
  }

  useEffect(() => {
    initTable();
  }, []);

  function DataAlertShow(resultData) {
    if (resultData.code === 0) {
      setVisibleAlertFail(true)
      setVisibleAlertSuccess(false)
    }
    if (resultData.code === 1) {
      setVisibleAlertSuccess(true)
      setVisibleAlertFail(false)
    }
  }
  const PagePrevious = () => {
    if (pageNum > 1) {
      setDisabledPagePrevious(false)
    } else {
      setDisabledPagePrevious(true)
    }
  }
  const PageNext = (pTotal) => {
    if (pageNum < pTotal) {
      setDisabledPageNext(false)
    } else {
      setDisabledPageNext(true)
    }
  }
  function myFunction(date1,date2)
  {
    console.log(date1)
    console.log(date2)
    var from=new Date(date1);
    var to=new Date(date2);
    if (to < from) 
    {
      to.setDate(to.getDate() + 1);
    }
    var diff = to - from;
    console.log(diff)
    var hours = Math.floor(diff / 1000 / 60 / 60);
    var minutes = Math.floor(diff / 60000) % 60;
    console.log(hours)
    var hours_minutes=hours+":"+minutes;
    return (hours_minutes)
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>App Users - Operator</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell colSpan="6" className="text-right">
                      <CAlert color="success" dismissible visible={visibleAlertSuccess} onClose={() => setVisibleAlertSuccess(false)} className="text-center">Success!</CAlert>
                      <CAlert color="danger" dismissible visible={visibleAlertFail} onClose={() => setVisibleAlertFail(false)} className="text-center">Failed!</CAlert>
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>SI.No</CTableHeaderCell>
                    <CTableHeaderCell>User Name</CTableHeaderCell>
                    <CTableHeaderCell>Start Time</CTableHeaderCell>
                    <CTableHeaderCell>End Time</CTableHeaderCell>
                    <CTableHeaderCell>Hours</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {operatorTime.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <strong>{item.operatorTimeNo}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{item.userName}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{moment(item.startTime).format('MM/DD/YYYY hh:mm:ss')}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{moment(item.endTime).format('MM/DD/YYYY hh:mm:ss')}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{myFunction(moment(item.startTime).format('MM/DD/YYYY hh:mm:ss'),moment(item.endTime).format('MM/DD/YYYY hh:mm:ss'))}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                  }
                </CTableBody>
                <CTableFoot>
                  <CTableRow>
                    <CTableHeaderCell colSpan="6">
                      <CPagination align="center" aria-label="Page navigation">
                        <CPaginationItem disabled={disabledPagePrevious} onClick={() => setPageNum(pageNum--) > initTable()}>Previous</CPaginationItem>
                        <CPaginationItem>{pageNum}/{pageTotal}</CPaginationItem>
                        <CPaginationItem disabled={disabledPageNext} onClick={() => setPageNum(pageNum++) > initTable()}>Next</CPaginationItem>
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

export default OperatorTime
