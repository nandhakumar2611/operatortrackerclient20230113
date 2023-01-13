import React, {useEffect, useState} from 'react'

import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
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
  CTableRow,
} from '@coreui/react'

import dataService from '../../../tool/dataService';


const Operation = () => {

  let [visibleAlertSuccess, setVisibleAlertSuccess] = useState(false)
  let [visibleAlertFail, setVisibleAlertFail] = useState(false)
  let [addVisible, setAddVisible] = useState(false)
  let [editVisible, setEditVisible] = useState(false)
  let [delVisible, setDelVisible] = useState(false)
  let [formOperationName, setFormOperationName ]= useState(false)
  let [formOperationNo, setFormOperationNo ]= useState(false)

  let [employees, setEmployees] = useState([]);
  let [pageDataTotal, setPageDataTotal]= useState(0)
  let [pageTotal, setPageTotal]= useState(1)
  let [pageNum, setPageNum]= useState(1)
  let [pageSize, setPageSize]= useState(10)

  let [disabledPagePrevious, setDisabledPagePrevious]= useState(false)
  let [disabledPageNext, setDisabledPageNext]= useState(false)


  const ContentAdd = () => {

    const handleSubmit = (event) => {
      event.preventDefault()
      setAddVisible(false)
      const postData ={
        dictOpName:formOperationName
      }
      console.log('Printing postData', postData);
      dataService.exe("dictOperations/add",postData)
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
          <CButton onClick={() => setAddVisible(true)}>Add New Operation</CButton>
          <CModal scrollable visible={addVisible} onClose={() => setAddVisible(false)} alignment="center">
            <CModalHeader>
              <CModalTitle>Add New Operation</CModalTitle>
            </CModalHeader>
            <CForm onSubmit={handleSubmit}>
            <CModalBody>
              <CInputGroup className="mb-3">
                <CInputGroupText>Operation Name</CInputGroupText>
                <CFormInput required name="operationName" onChange={event => setFormOperationName(event.target.value)}/>
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
  const ContentEdit = () => {

    const handleEdit = (event) => {
      event.preventDefault()
      setEditVisible(false)
      const postData ={
        dictOpNo:formOperationNo,
        dictOpName:formOperationName
      }
      dataService.exe("dictOperations/edit",postData)
          .then(response => {
            console.log('Edit successfully', response.data);
            DataAlertShow(response.data)
            initTable();
          })
          .catch(error => {
            console.log('Edit wrong', error);
          })
    }

    return (
        <>
          <CModal scrollable visible={editVisible} onClose={() => setEditVisible(false)} alignment="center">
            <CModalHeader>
              <CModalTitle>Edit Operation</CModalTitle>
            </CModalHeader>
            <CForm onSubmit={handleEdit}>
              <CModalBody>
                <CInputGroup className="mb-3">
                  <CInputGroupText className="col-sm-4">Operation No</CInputGroupText>
                  <CFormInput readOnly value={formOperationNo} disabled />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText className="col-sm-4">Operation Name</CInputGroupText>
                  <CFormInput required value={formOperationName} name="operationName" onChange={event => setFormOperationName(event.target.value)}/>
                </CInputGroup>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setEditVisible(false)}>
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
  const ContentDel = () => {

    const handleDel = (event) => {
      event.preventDefault()
      setDelVisible(false)
      const postData ={
        dictOpNo:formOperationNo
      }
      dataService.exe("dictOperations/del",postData)
          .then(response => {
            console.log('Del successfully', response.data);
            DataAlertShow(response.data)
            initTable();
          })
          .catch(error => {
            console.log('Del wrong', error);
          })
    }

    return (
        <>
          <CModal visible={delVisible} onClose={() => setDelVisible(false)} alignment="center">
            <CModalHeader>
              <CModalTitle>Delete Operation</CModalTitle>
            </CModalHeader>
            <CForm onSubmit={handleDel}>
              <CModalBody>
                <CInputGroup className="mb-3">
                  <CInputGroupText className="col-sm-4">Operation No</CInputGroupText>
                  <CFormInput value={formOperationNo} readOnly disabled />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText className="col-sm-4">Operation Name</CInputGroupText>
                  <CFormInput value={formOperationName} readOnly disabled />
                </CInputGroup>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setDelVisible(false)}>
                  Close
                </CButton>
                <CButton color="primary" type="submit">
                  Delete
                </CButton>
              </CModalFooter>
            </CForm>
          </CModal>
        </>
    )
  }

  const initTable= () => {
    let initData={
      pageSize: pageSize,
      pageNum: pageNum,
      orderByColumn: '',
      isAsc: 'desc',
    }
    setPageNum(pageNum)
    dataService.exe("dictOperations/list",initData)
        .then(response => {
          console.log('Printing employees data', response.data);
          dataPage(response.data)
        })
        .catch(error => {
          console.log('Something went wrong', error);
        })
  }

  function dataPage(resultData) {
    dataService.checkLogin(resultData)
    setEmployees(resultData.rows);
    setPageDataTotal(resultData.total)
    let PageTotal=Math.ceil(resultData.total/pageSize)
    setPageTotal(PageTotal)
    PagePrevious()
    PageNext(PageTotal)
  }


  useEffect(() => {
    initTable();
  }, []);

  const ItemSet=(item)=>{
    setFormOperationNo(item.dictOpNo)
    setFormOperationName(item.dictOpName)
  }

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
              <CCardHeader>Operation Settings</CCardHeader>
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
                  </CTableHead>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell>Operation No</CTableHeaderCell>
                      <CTableHeaderCell>Operation Name</CTableHeaderCell>
                      <CTableHeaderCell>Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {employees.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell>
                            <div className="float-start">
                              <strong>{item.dictOpNo}</strong>
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="clearfix">
                              <div className="float-start">
                                <strong>{item.dictOpName}</strong>
                              </div>
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton color="warning" onClick={() =>ItemSet(item) >setEditVisible(true)}>Edit</CButton>
                            &nbsp;&nbsp;
                            <CButton color="danger" onClick={() =>ItemSet(item) >setDelVisible(true)}>Delete</CButton>
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
        {ContentEdit()}
        {ContentDel()}
      </>
  )
}

export default Operation
