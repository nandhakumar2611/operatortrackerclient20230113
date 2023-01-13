import React, { useEffect,useState } from 'react'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

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
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableFoot,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import dataService from "../../../tool/dataService";


const ManagerTaskCreate = () => {

  let [visibleAlertSuccess, setVisibleAlertSuccess] = useState(false)
  let [visibleAlertFail, setVisibleAlertFail] = useState(false)
  let [listPlant, setListPlant] = useState([]);

  const [orderDate, setOrderDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [purchaseOrderDate, setPurchaseOrderDate] = useState(new Date());
  const [issueDate, setIssueDate] = useState(new Date());
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const postData = {
      finsize: document.getElementById("finsize").value,
      orderDate: moment(orderDate).format('MM/DD/YYYY'),
      item: document.getElementById("item").value,
      assembly: document.getElementById("assembly").value,
      deliveryDate: moment(deliveryDate).format('MM/DD/YYYY'),
      partNo: document.getElementById("partNo").value,
      purchaseOrderQty: document.getElementById("purchaseOrderQty").value,
      productionQty: document.getElementById("productionQty").value,
      purchaseOrderNo: document.getElementById("purchaseOrderNo").value,
      purchaseOrderDate: moment(purchaseOrderDate).format('MM/DD/YYYY'),
      issueDate: moment(issueDate).format('MM/DD/YYYY'),
      plantNo: document.getElementById("plantNo").value
    }
    console.log('Printing postData', postData);
    dataService.exe("taskList/add", postData)
      .then(response => {
        console.log('add successfully', response.data);
        DataAlertShow(response.data)
      })
      .catch(error => {
        console.log('Something wrong', error);
      })
  }

  function DataAlertShow(resultData) {
    if (resultData.code === 0) {
      setVisibleAlertFail(true)
      setVisibleAlertSuccess(false)
    }
    if (resultData.code === 1) {
      setVisibleAlertSuccess(true)
      setVisibleAlertFail(false)
      document.getElementById("resetButton").click()
    }
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
    initManager();
  }, []);

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Manager - Add New Task</CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit} >
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell className="text-center">
                        <CAlert color="success" dismissible visible={visibleAlertSuccess} onClose={() => setVisibleAlertSuccess(false)} className="text-center">Success!</CAlert>
                        <CAlert color="danger" dismissible visible={visibleAlertFail} onClose={() => setVisibleAlertFail(false)} className="text-center">Failed!</CAlert>
                        <h3>Task Form</h3>
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell>
                        <CInputGroup className="mb-3">
                          <CInputGroupText className="col-sm-4">Finsize</CInputGroupText>
                          <CFormInput id="finsize" required />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText className="col-sm-4">Order Date</CInputGroupText>
                          <CRow>
                            <CCol>
                              <DatePicker
                                value={orderDate}
                                selected={orderDate}
                                onSelect={(date) => setOrderDate(date)}
                                onChange={(date) => setOrderDate(date)}
                                className="col-form-label"
                                required
                              />
                            </CCol>
                          </CRow>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText className="col-sm-4">Item</CInputGroupText>
                          <CFormInput id="item" required />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText className="col-sm-4">Assembly</CInputGroupText>
                          <CFormInput id="assembly" required />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText className="col-sm-4">Delivery Date</CInputGroupText>
                          <CRow>
                            <CCol>
                              <DatePicker
                                value={deliveryDate}
                                selected={deliveryDate}
                                onSelect={(date) => setDeliveryDate(date)}
                                onChange={(date) => setDeliveryDate(date)}
                                className="col-form-label"
                                required
                              />
                            </CCol>
                          </CRow>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText className="col-sm-4">Part No</CInputGroupText>
                          <CFormInput id="partNo" required />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText className="col-sm-4">Purchase Order Qty</CInputGroupText>
                          <CFormInput id="purchaseOrderQty" type="number" required />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText className="col-sm-4">Production Qty</CInputGroupText>
                          <CFormInput id="productionQty" type="number" required />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText className="col-sm-4">Purchase Order No</CInputGroupText>
                          <CFormInput id="purchaseOrderNo" required />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText className="col-sm-4">Plant Name</CInputGroupText>
                          <CFormSelect multiple id="plantNo">
                            <option value=''>***No Assign***</option>
                            {listPlant.map((item, index) => (
                              <option value={item.plantNo} key={index}>{item.plantName}</option>
                            ))
                            }
                          </CFormSelect>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText className="col-sm-4">Purchase Order Date</CInputGroupText>
                          <CRow>
                            <CCol>
                              <DatePicker
                                value={purchaseOrderDate}
                                selected={purchaseOrderDate}
                                onSelect={(date) => setPurchaseOrderDate(date)}
                                onChange={(date) => setPurchaseOrderDate(date)}
                                className="col-form-label"
                                required
                              />
                            </CCol>
                          </CRow>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText className="col-sm-4">Issue Date</CInputGroupText>
                          <CRow>
                            <CCol>
                              <DatePicker
                                value={issueDate}
                                selected={issueDate}
                                onSelect={(date) => setIssueDate(date)}
                                onChange={(date) => setIssueDate(date)}
                                className="col-form-label"
                                required
                              />
                            </CCol>
                          </CRow>
                        </CInputGroup>
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                  </CTableBody>
                  <CTableFoot>
                    <CTableRow>
                      <CTableHeaderCell className="text-center">
                        <CButton color="secondary" id="resetButton" type="reset" className="col-sm-1">
                          Reset
                        </CButton>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <CButton color="primary" type="submit" className="col-sm-1">
                          Submit
                        </CButton>
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableFoot>
                </CTable>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ManagerTaskCreate
