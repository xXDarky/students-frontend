import React, {useState, useEffect} from 'react';
import { useFetch } from '../../hooks/useFetch';
import MaterialTable from 'material-table';
import axios from 'axios';
import {Modal, TextField, Button, Checkbox} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const columnas= [
    {
        title: 'Student Name',
        field: 'fullName'
    },
    {
        title: 'Email',
        field: 'email'
    },
    {
        title: 'Gender',
        field: 'gender'
    },
    {
        title: 'Date of Birth',
        field: 'full_birth_date'
    }
    

];

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial:{
        width: '100%'
    }
}));
export const ListStudentScreen = () => {
    const styles = useStyles();

    const [data, setData] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState({
        
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        birth_date: '',
        gender:''
    })
    const handlechange = e => {
        const {name, value}= e.target;
        setSelectedStudent(prevState => ({
            ...prevState,
            [name]:value
        }));
        console.log(selectedStudent);
    }

    const baseUrl = 'http://localhost:3100/api/student/'
    

    const getData = async () => {
        await axios.get(baseUrl + 'list').then(res => {
            let allData=[];
            allData = res.data;
            allData.forEach((row,index) => {
                row.fullName = row.first_name + ' ' + row.last_name;
               
                let date = new Date(row.birth_date);
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let dt = date.getDate();
                
                if (dt < 10) {
                dt = '0' + dt;
                }
                if (month < 10) {
                month = '0' + month;
                }
                row.full_birth_date = month + '-'+ dt+ '-'+year 
            });
            setData(allData);
            console.log(allData);
        }).catch(error => {
            console.log(error);
        })
    }
    const postData= async() => {
        await axios.post(baseUrl + 'add', selectedStudent).then( res =>{
            console.log('res del post');
            console.log(res);
            setData(data.concat(res.data));
            modalStatus();
        }).catch(error => {
            console.log(error);
        })
    }
    const putData= async() => {
        await axios.put(baseUrl + 'update', selectedStudent).then( res =>{
           var newData =  data;
           newData.map(student => {
               if(student._id === selectedStudent._id){
                   student.first_name= selectedStudent.first_name;
                   student.last_name= selectedStudent.last_name;
                   student.email= selectedStudent.email;
                   student.address= selectedStudent.address;
               }
           });
            setData(newData);
            modalStatusEdit();
        }).catch(error => {
            console.log(error);
        })
    }
    const deleteData= async() => {
        await axios.delete(baseUrl+'remove/'+ selectedStudent._id).then(res =>{
            setData(data.filter(student => student._id!==selectedStudent._id));
            modalStatusDelete();
        }).catch(error => {
            console.log(error);
        })
    }
    const selectStudent = (student, type)=> {
        setSelectedStudent(student);
        (type ==="Edit")?modalStatusEdit()
        :
        modalStatusDelete()
    }

    const modalStatus=() => {
        setModalAdd(!modalAdd);
    }
    const modalStatusEdit=() => {
        setModalEdit(!modalEdit);
    }
    const modalStatusDelete=() => {
        setModalDelete(!modalDelete);
    }

    useEffect(() => {
        getData();
    }, []);


    const bodyAdd =(
        <div className={styles.modal}>
            <h3> Add new student</h3>
            <TextField className={styles.inputMaterial} label='First Name' name='first_name' onChange={handlechange}/>
            <br/>
            <TextField className={styles.inputMaterial} label='Last Name' name='last_name' onChange={handlechange} />
            <br/>
            <TextField className={styles.inputMaterial} label='Email' name='email' onChange={handlechange} />
            <br/>
            <TextField className={styles.inputMaterial} label='Address' name='address' onChange={handlechange} />
            
            <span>
                Male
            </span>
            <Checkbox
                name="gender"
                value="Male"
                inputProps={{ 'aria-label': 'Checkbox A' }}
                onChange={handlechange}
                
                />
                <span>
                Female
            </span>
                <Checkbox
                name="gender"
                value="Female"
                inputProps={{ 'aria-label': 'Checkbox A' }}
                onChange={handlechange}
                
                />
            <br/><br/>
            <TextField
                    id="date"
                    label="Date of Birth"
                    type="date"
                    name="birth_date"
                    defaultValue="2021-01-01"
                    className={styles.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={handlechange}
                />
            <br/><br/>
            <div align='right'>
                <Button color='primary' onClick= {() => postData()}>Add</Button>
                <Button onClick= {() => modalStatus()}>Cancel</Button>

            </div>

        </div>
    )
    const bodyEdit =(
        <div className={styles.modal}>
            <h3> Edit student</h3>
            <TextField className={styles.inputMaterial} label='First Name' name='first_name' onChange={handlechange} value={selectedStudent && selectedStudent.first_name}/>
            <br/>
            <TextField className={styles.inputMaterial} label='Last Name' name='last_name' onChange={handlechange} value={selectedStudent && selectedStudent.last_name} />
            <br/>
            <TextField className={styles.inputMaterial} label='Email' name='email' onChange={handlechange} value={selectedStudent && selectedStudent.email} />
            <br/>
            <TextField className={styles.inputMaterial} label='Address' name='address' onChange={handlechange} value={selectedStudent && selectedStudent.address} />
             
            <span>
                Male
            </span>
            <Checkbox
                name="gender"
                value="Male"
                inputProps={{ 'aria-label': 'Checkbox A' }}
                onChange={handlechange}
               
                />
                <span>
                Female
            </span>
                <Checkbox
                name="gender"
                value="Female"
                inputProps={{ 'aria-label': 'Checkbox A' }}
                onChange={handlechange}
                
                />
            <br/><br/>
            <TextField 
                    id="date"
                    label="Date of Birth"
                    type="date"
                    name="birth_date"
                    defaultValue="2021-01-01"
                    className={styles.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={handlechange}
                />
            <br/><br/>
            <div align='right'>
                <Button color='primary' onClick= {() => putData()} >Edit</Button>
                <Button onClick= {() => modalStatusEdit()}>Cancel</Button>

            </div>

        </div>
    )

    const bodyDelete =(
        <div className={styles.modal}>
            <p>Are you sure you want to delete the student <b>{selectedStudent && selectedStudent.fullName}</b>?</p>
            <div align="right">
                <Button color="secondary" onClick= {() => deleteData()}> Yes</Button>
                <Button onClick= {() => modalStatusDelete()}> No</Button>
            </div>
        </div>
    )


    


    return (
        <div  className="animate__animated animate__fadeIn">
            <br/>
            <Button variant="contained" color="primary" onClick= {() => modalStatus()}> Add Student</Button>
            <br/><br/>
            <MaterialTable
                columns={columnas}
                data={data}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit',
                        onClick:(event, rowData)=>selectStudent(rowData, "Edit")
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete',
                        onClick:(event, rowData)=>selectStudent(rowData, "Delete")
                    }
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
                title="Students List"
             />

             <Modal
                open= {modalAdd}
                onClose={modalStatus}
               
              >
                   {bodyAdd}
             </Modal>
             <Modal
                open= {modalEdit}
                onClose={modalStatusEdit}
               
              >
                   {bodyEdit}
             </Modal>
             <Modal
                open= {modalDelete}
                onClose={modalStatusDelete}
               
              >
                   {bodyDelete}
             </Modal>
        </div>
    )
}
