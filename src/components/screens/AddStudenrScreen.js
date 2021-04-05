import React, {useEffect, useState} from 'react'
import {useForm} from '../../hooks/useForm'
import {useFetch} from '../../hooks/useFetch'
import axios from 'axios';
import {Modal, TextField, Button, Checkbox} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';


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

export const AddStudenrScreen = () => {
    const styles = useStyles();
    const [data, setData] = useState([]);
    const [formValues, handleInputChange] = useForm({
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        gender: '',
        birth_date: ''
    })
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
    const {first_name, last_name, email, address, gender, birth_date} = formValues;

    useEffect(() => {
        console.log('email cambió');
    }, [email])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
    }
    const handleReset = (e) => {
        selectedStudent.first_name = '';
        console.log(selectedStudent);
    }

    const postData= async() => {
        await axios.post(baseUrl + 'add', selectedStudent).then( res =>{
            console.log('res del post');
            console.log(res);
            setData(data.concat(res.data));
        }).catch(error => {
            console.log(error);
        })
    }

    

    return (
        <form onSubmit={postData} className="animate__animated animate__fadeIn">
            <h1>Add Student </h1>
            <hr/>

            <div className={styles.modal}>
            <h3> Add new student</h3>
            <TextField className={styles.inputMaterial} label='First Name' name='first_name'  onChange={handlechange}/>
            <br/><br/>
            <TextField className={styles.inputMaterial} label='Last Name' name='last_name' onChange={handlechange} />
            <br/><br/>
            <TextField className={styles.inputMaterial} label='Email' name='email' onChange={handlechange} />
            <br/><br/>
            <TextField className={styles.inputMaterial} label='Address' name='address' onChange={handlechange} />
            <br/>
            <span>
                Male
            </span>
            <Checkbox
                name="gender"
                value="Male"
                inputProps={{ 'aria-label': 'Checkbox A' }}
                onChange={handlechange}
                labelPlacement="start"
                />
                <span>
                Female
            </span>
                <Checkbox
                name="gender"
                value="Female"
                inputProps={{ 'aria-label': 'Checkbox A' }}
                onChange={handlechange}
                labelPlacement="end"
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
                <Button type='submit' color='primary' >Submit</Button>
                <Button onClick= {() => handleReset()}>Cancel</Button>

            </div>

        </div>
         
        </form>
    )
}
