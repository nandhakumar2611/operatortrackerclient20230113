import React, {useEffect, useState} from 'react'

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


const Machine = () => {

  let [visibleAlertSuccess, setVisibleAlertSuccess] = useState(false)
  let [visibleAlertFail, setVisibleAlertFail] = useState(false)
  let [addVisible, setAddVisible] = useState(false)
  let [editVisible, setEditVisible] = useState(false)
  let [delVisible, setDelVisible] = useState(false)
  let [resetVisible, setRestVisible] = useState(false)
  let [assignVisible, setAssignVisible] = useState(false)

  let [resetSubmitDisabled, setResetSubmitDisabled] = useState(true)
  let [addSubmitDisabled, setAddSubmitDisabled] = useState(true)

  let [invalidConfirmPassword, setInvalidConfirmPassword ]= useState(true)

  let [userNo, setUserNo ]= useState()
  let [userLoginName, setUserLoginName ]= useState('')
  let [userPasswd, setUserPasswd ]= useState('')
  let [userTrueName, setUserTrueName ]= useState('')
  let [userNoManager, setUserNoManager ]= useState()

  let [machineNo, setMachineNo]=useState()
  let [plantNo, setPlantNo]=useState()
  let [machineName, setMachineName]=useState('')
  


  let [employees, setEmployees] = useState([]);
  let [machine, setMachine]= useState([]);

  let [pageDataTotal, setPageDataTotal]= useState(0)
  let [pageTotal, setPageTotal]= useState(1)
  let [pageNum, setPageNum]= useState(1)
  let [pageSize, setPageSize]= useState(10)

  let [disabledPagePrevious, setDisabledPagePrevious]= useState(false)
  let [disabledPageNext, setDisabledPageNext]= useState(false)

  let [listManager, setListManager] = useState([]);
  let [listPlant, setListPlant] = useState([]);

  const ItemSet=(item)=>{
    setMachineNo(item.machineNo)
    setMachineName(item.machineName)
    // setUserNo(item.userNo)
    // setUserLoginName(item.userLoginName)
    // setUserTrueName(item.userTrueName)
  }


  const ContentAdd = () => {

    const initData = () => {
      setMachineName('')
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      setAddVisible(false)
      const postData ={
        machineName:machineName
        // userLoginName:userLoginName,
        // userPasswd:userPasswd,
        // userTrueName:userTrueName,
        // userRole:2
      }
      console.log('Printing postData', postData);
      dataService.exe("appMachine/add",postData)
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
          <CButton onClick={() => initData()>setAddVisible(true)}>Add New Machine</CButton>
          <CModal scrollable visible={addVisible} onClose={() => setAddVisible(false)} alignment="center">
            <CModalHeader>
              <CModalTitle>Add New Machine</CModalTitle>
            </CModalHeader>
            <CForm onSubmit={handleSubmit} >
              <CModalBody>
                <CInputGroup className="mb-3">
                  <CInputGroupText className="col-sm-5">Machine Name</CInputGroupText>
                  <CFormInput required onChange={event => setMachineName(event.target.value)}/>
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
        machineNo:machineNo,
        machineName:machineName
        // userNo:userNo,
        // userLoginName:userLoginName,
        // userTrueName:userTrueName
      }
      dataService.exe("appMachine/edit",postData)
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
              <CModalTitle>Edit Operator</CModalTitle>
            </CModalHeader>
            <CForm onSubmit={handleEdit}>
              <CModalBody>
                <CInputGroup className="mb-3">
                  <CInputGroupText className="col-sm-4">Machine No</CInputGroupText>
                  <CFormInput readOnly value={machineNo} disabled />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText className="col-sm-4">Machine Name</CInputGroupText>
                  <CFormInput required value={machineName} onChange={event => setMachineName(event.target.value)}/>
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
        appMachineNo:machineNo
       
      }
      console.log(postData);
      dataService.exe("managementMachine/del",postData)
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
              <CModalTitle>Delete Operator</CModalTitle>
            </CModalHeader>
            <CForm onSubmit={handleDel}>
              <CModalBody>
                <CInputGroup className="mb-3">
                  <CInputGroupText className="col-sm-4">Machine No</CInputGroupText>
                  <CFormInput value={machineNo} readOnly disabled />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText className="col-sm-4">Machine Name</CInputGroupText>
                  <CFormInput required value={machineName} readOnly disabled />
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

  const ContentAssign = () => {

    const handleAssign = (event) => {
      event.preventDefault()
      setAssignVisible(false)
      const postData ={
        // userNoOperator:userNo,
        // userNoManager:userNoManager
        appPlantNo:plantNo,
        appMachineNo:machineNo
      }
      dataService.exe("managementMachine/add",postData)
          .then(response => {
            console.log('Assign successfully', response.data);
            DataAlertShow(response.data)
            initTable();
          })
          .catch(error => {
            console.log('Assign wrong', error);
          })
    }

    const handleSelect = (e) => {
      setPlantNo(e.target.value)
    }

    return (
        <>
          <CModal scrollable visible={assignVisible} onClose={() => setAssignVisible(false)} alignment="center">
            <CModalHeader>
              <CModalTitle>Assign</CModalTitle>
            </CModalHeader>
            <CForm onSubmit={handleAssign}>
              <CModalBody>
                <CInputGroup className="mb-3">
                  <CInputGroupText className="col-sm-4">Machine No</CInputGroupText>
                  <CFormInput value={machineNo} readOnly disabled />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText className="col-sm-4">Machine Name</CInputGroupText>
                  <CFormInput required value={machineName} readOnly disabled />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText className="col-sm-4">Assign Plant</CInputGroupText>
                  <CFormSelect multiple onChange={(e)=>handleSelect(e)}>
                    <option value=''>***No Assign***</option>
                    {listPlant.map((item,index) => (
                        <option value={item.plantNo} key={index}>{item.plantName}</option>
                    ))
                    }
                  </CFormSelect>
                </CInputGroup>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setAssignVisible(false)}>
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

  const initTable= () => {
    let initData={
      pageSize: pageSize,
      pageNum: pageNum,
      orderByColumn: '',
      isAsc: '',
      userRole:2
    }
    setPageNum(pageNum)
    dataService.exe("appMachine/listPlant",initData)
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
    setMachine(resultData.rows);
    setPageDataTotal(resultData.total)
    let PageTotal=Math.ceil(resultData.total/pageSize)
    setPageTotal(PageTotal)
    PagePrevious()
    PageNext(PageTotal)
  }

  const initManager = () => {
    let initData={
      // userRole:1
    }
    dataService.exe("appPlant/list",initData)
        .then(response => {
          console.log('Printing employees data', response.data);
          setListPlant(response.data.rows)
        })
        .catch(error => {
          console.log('Something went wrong', error);
        })
  }

  useEffect(() => {
    initTable();
    initManager();
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
              <CCardHeader>App Users - Operator</CCardHeader>
              <CCardBody>
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell colSpan="6" className="text-right">
                        <CAlert color="success" dismissible visible={visibleAlertSuccess} onClose={() => setVisibleAlertSuccess(false)} className="text-center">Success!</CAlert>
                        <CAlert color="danger" dismissible visible={visibleAlertFail} onClose={() => setVisibleAlertFail(false)} className="text-center">Failed!</CAlert>
                        <div>{ContentAdd()}</div>
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell>Machine No</CTableHeaderCell>
                      <CTableHeaderCell>Machine Name</CTableHeaderCell>
                      <CTableHeaderCell>Plant Name</CTableHeaderCell>
                      <CTableHeaderCell>Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {machine.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell>
                            <strong>{item.machineNo}</strong>
                          </CTableDataCell>
                          <CTableDataCell>
                            <strong>{item.machineName}</strong>
                          </CTableDataCell>
                          <CTableDataCell>
                            <strong>{item.plantName}</strong>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton color="secondary" onClick={() => ItemSet(item)>setAssignVisible(true)}>Assign</CButton>
                            &nbsp;&nbsp;
                            <CButton color="warning" onClick={() => ItemSet(item)>setEditVisible(true)}>Edit</CButton>
                            &nbsp;&nbsp;
                            <CButton color="danger" onClick={() => ItemSet(item)>setDelVisible(true)}>Delete</CButton>

                          </CTableDataCell>
                        </CTableRow>
                    ))
                    }
                  </CTableBody>
                  <CTableFoot>
                    <CTableRow>
                      <CTableHeaderCell colSpan="6">
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
        {ContentEdit()}
        {ContentDel()}
      </>
  )
}

export default Machine
