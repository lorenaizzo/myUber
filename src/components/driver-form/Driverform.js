import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import DatePicker from "react-datepicker"
import { FormGroup, Button, Label } from 'reactstrap';
import { saveDriver } from '../api/Driver';
import "react-datepicker/dist/react-datepicker.css";
import './driver.css';

export default function DriverForm() {

    // Expresiones regulares para validacion
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const plateRegExp = /^([A-Z]{2}[0-9]{3}[A-Z]{2})|([A-Z]{3}[0-9]{3})$/
    
    // Guardo año actual para validacion en Yup
    const currentYear = (new Date()).getFullYear();
    
    // YearDP para el DatePicker
    var [ yearDP, setYearDP ] = useState(new Date());

    // Mensaje que se muestra al lado del boton al guardar
    var [ message, setMessage ] = useState('');
    

    // Esquema para validacion en Yup
    // este esquema se pasa al Formik para que 
    // valide automaticamente las entradas de los input
    const formSchema = Yup.object().shape({
        name: Yup.string()
            .typeError('El nombre debe contener letras')
            .min(3, 'Al menos 3 letras!')
            .max(255, 'Demasiado largo! Máximo 255 letras.')
            .required('El nombre es obligatorio'),
        lastName: Yup.string()
            .typeError('El apellido debe contener letras')
            .min(3, 'Al menos 3 letras!')
            .max(255, 'Demasiado largo! Máximo 255 letras.')
            .required('El apellido es obligatorio'),
        age: Yup.number()
            .typeError('La edad debe ser un número entero entre 16 y 120!')
            .integer('No puede contener decimales')
            .min(16, 'La edad mínima es 18 años')
            .max(120, 'La edad máxima es 120 años.')
            .required('La edad es obligatoria'),
        telephone: Yup.string()
            .matches(phoneRegExp, 'Solo números')
            .required('El teléfono es obligatorio'),
        email: Yup.string()
            .email('Ese email no parece correcto!')
            .required('El email es obligatorio'),
        plate: Yup.string()
            .matches(plateRegExp, 'La patente debe ser XX000XX o XXX000')
            .required('La patente es obligatoria'),
        brand: Yup.string()
            .required('La marca es obligatoria'),
        model: Yup.string()
            .required('El modelo es obligatorio'),
        year: Yup.number()
            .typeError('El año debe ser un numero entre 1970 y el año actual')
            .min(1970, 'Año mínimo es 1970')
            .max((currentYear), 'Año máximo '+currentYear)
            .required('El año es obligatorio')       
    });


    //Agrego el conductor si pasa las validaciones de Yup
    //Luego borro el formulario
    async function handleAdd(value, {resetForm}){
        
        let driver = {
            name: value.name,
            lastName: value.lastName,
            age: value.age,
            telephone: value.telephone,
            email: value.email,
            plate: value.plate.toUpperCase(),
            brand: value.brand,
            model: value.model,
            year: value.year
        }           

        let response = await saveDriver(driver);

        if(response){
            setMessage('Se guardo correctamente');
            setTimeout(()=>{
                setMessage('')
                setYearDP(new Date());
                resetForm();                
            },3000);            

        }
        else {
            setMessage('No se pudo guardar');
            setTimeout(()=>{
                setMessage('')
            },3000);            
        }

    }

    return (
        <React.Fragment>
                <Formik
                    initialValues={{
                        name: '',
                        lastName: '',
                        age: '',
                        telephone: '',
                        email: '' ,
                        plate: '',
                        brand: '',
                        model: '',
                        year: 2020     
                    }}
                    validationSchema={formSchema}
                    onSubmit={(values, {resetForm}) => handleAdd(values, {resetForm})}
                >
                    {({ handleChange, values }) => (
                    <Form className="container-form">
                        <div className="personal">
                            <h2>Datos Personales</h2>
                            <FormGroup>
                                <Label htmlFor="name">Nombre</Label>
                                <Field
                                    className = "form-control"
                                    name = "name"
                                    placeholder = "Nombre"
                                    type = "text"
                                    data-testid="driver-name"
                                                        
                                />
                                <div className="error" id="error">
                                    <ErrorMessage
                                        name = "name"
                                        component = "div"
                                        className = "field-error text-danger my-error"
                                        data-testid="driver-name-error"
                                    />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="lastName">Apellido</Label>
                                <Field
                                    className = "form-control"
                                    name = "lastName"
                                    placeholder = "Apellido"
                                    type = "text"
                                    data-testid="driver-lastName"
                                    
                                />
                                <div className="error">
                                    <ErrorMessage
                                        name = "lastName"
                                        component = "div"
                                        className = "field-error text-danger my-error"
                                        data-testid="driver-lastName-error"
                                    />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="age">Edad</Label>
                                <Field
                                    className = "form-control"
                                    name = "age"
                                    placeholder = "25"
                                    type = "text"
                                    data-testid="driver-age"
                                />
                                <div className="error">
                                    <ErrorMessage
                                        name = "age"
                                        component = "div"
                                        className = "field-error text-danger my-error"
                                        data-testid="driver-age-error"
                                    />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="telephone">Telefono</Label>
                                <Field
                                    className = "form-control"
                                    name = "telephone"
                                    placeholder = "1120615687"
                                    type = "text"
                                    data-testid="driver-telephone"
                                    
                                />
                                <div className="error">
                                    <ErrorMessage
                                        name = "telephone"
                                        component = "div"
                                        className = "field-error text-danger my-error"
                                        data-testid="driver-telephone-error"
                                    />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="email">E-mail</Label>
                                <Field
                                    className = "form-control"
                                    name = "email"
                                    placeholder = "nombre@dominio.com.ar"
                                    type = "text"
                                    data-testid="driver-email"
                                />
                                <div className="error">
                                    <ErrorMessage
                                        name = "email"
                                        component = "div"
                                        className = "field-error text-danger my-error"
                                        data-testid="driver-email-error"
                                    />
                                </div>
                            </FormGroup>
                        </div>
                        <div className="car">
                            <h2>Vehículo</h2>
                            <FormGroup>
                                <Label htmlFor="plate">Patente</Label>
                                <Field
                                    className = "form-control"
                                    name = "plate"
                                    placeholder = "AA000BB o AAA000"
                                    type = "text"
                                    onChange={(e)=>{
                                        let value = e.target.value.toUpperCase();
                                        e.target.value = value;
                                        handleChange(e);
                                    }}
                                    data-testid="driver-plate"
                                />
                                <div className="error">
                                    <ErrorMessage
                                        name = "plate"
                                        component = "div"
                                        className = "field-error text-danger my-error"
                                        data-testid="driver-plate-error"
                                    />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="brand">Marca</Label>
                                <Field
                                    className = "form-control"
                                    name = "brand"
                                    placeholder = "Marca"
                                    type = "text"
                                    data-testid="driver-brand"
                                    
                                />
                                <div className="error">
                                    <ErrorMessage
                                        name = "brand"
                                        component = "div"
                                        className = "field-error text-danger my-error"
                                        data-testid="driver-brand-error"
                                    />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="model">Modelo</Label>
                                <Field
                                    className = "form-control"
                                    name = "model"
                                    placeholder = "Modelo"
                                    type = "text"
                                    data-testid="driver-model"
                                    
                                />
                                <div className="error">
                                    <ErrorMessage
                                        name = "model"
                                        component = "div"
                                        className = "field-error text-danger my-error"
                                        data-testid="driver-model-error"
                                    />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="year">Año</Label>
                                <Field 
                                    name='year'
                                    placeholder="2020"                                
                                >
                                    {({form})=>(
                                        <DatePicker 
                                            selected= {yearDP}
                                            dateFormat="yyyy"
                                            className="form-control"
                                            name="year"
                                            showYearPicker
                                            onChange={date =>{
                                                values.year = date.getFullYear();
                                                setYearDP(date);}}
                                            placeholderText="yearDP"
                                        />
                                    )}
                                </Field>
                                <div className="error">
                                    <ErrorMessage
                                        name = "year"
                                        component = "div"
                                        className = "field-error text-danger my-error"
                                        data-testid="driver-year-error"
                                    />
                                </div>
                        </FormGroup>
                            <div className="button-zone">
                                <Button
                                    className='button'
                                    type='submit'
                                    size="lg"
                                    data-testid="driver-button-submit"
                                >
                                    Guardar
                                </Button>
                                <div className="message">{message}</div>
                            </div>
                    </div>   
                    </Form>
                    )}
                </Formik>
        </React.Fragment>
    );
}