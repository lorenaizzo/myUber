import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DriverForm from './components/driver-form/Driverform';
import { render, fireEvent, wait, getByPlaceholderText, getByTestId } from '@testing-library/react';
import mockAxios from "axios";
jest.mock('axios');

describe('Test del formulario', ()=>{

  /**
   * Existencia de todos los elementos
   */
  it("Existencia de todos los elementos", ()=>{

    const {getByTestId, getByPlaceholderText} = render(<DriverForm/>);

    expect(getByTestId('driver-name')).toBeInTheDocument();
    expect(getByTestId('driver-lastName')).toBeInTheDocument();
    expect(getByTestId('driver-age')).toBeInTheDocument();
    expect(getByTestId('driver-telephone')).toBeInTheDocument();
    expect(getByTestId('driver-email')).toBeInTheDocument();
    expect(getByTestId('driver-brand')).toBeInTheDocument();
    expect(getByTestId('driver-model')).toBeInTheDocument();
    expect(getByTestId('driver-plate')).toBeInTheDocument();
    expect(getByPlaceholderText('yearDP')).toBeInTheDocument();
    
  });

  /**
   * Validaciones de nombre
   * 1. Se cambia de campo sin nombre
   * 2. El nombre es mas grande
   * 3. El nombre es mas chico
   */
  it("Sin nombre", async ()=>{
    const {getByTestId} = render(<DriverForm/>);

    let name = getByTestId('driver-name');

    await wait(()=>{
      fireEvent.blur(name)
    });

    expect(getByTestId('driver-name-error').innerHTML).toBe("El nombre es obligatorio");

  });

  it("Name es más grande", async ()=>{
    const {getByTestId} = render(<DriverForm/>);

    let name = getByTestId('driver-name');

    await wait(()=>{
      fireEvent.change(name, {
        target: {
          value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        }
      })
      fireEvent.blur(name)
    });

    expect(getByTestId('driver-name-error').innerHTML).toBe("Demasiado largo! Máximo 255 letras.");

  });


  it("Name es más chico", async ()=>{
    const {getByTestId} = render(<DriverForm/>);

    let name = getByTestId('driver-name');

    await wait(()=>{
      fireEvent.change(name, {
        target: {
          value: "XX"
        }
      })
      fireEvent.blur(name)
    });

    expect(getByTestId('driver-name-error').innerHTML).toBe("Al menos 3 letras!");

  });

  /**
   * Validaciones de apellido
   * 1. Se cambia de campo sin apellido
   * 2. El apellido es mas grande
   * 3. El apellido es mas chico
   */
  it("Sin apellido", async ()=>{
    const {getByTestId} = render(<DriverForm/>);

    let lastName = getByTestId('driver-lastName');

    await wait(()=>{
      fireEvent.blur(lastName)
    });

    expect(getByTestId('driver-lastName-error').innerHTML).toBe("El apellido es obligatorio");

  });

  it("Apellido es más grande", async ()=>{
    const {getByTestId} = render(<DriverForm/>);

    let lastName = getByTestId('driver-lastName');

    await wait(()=>{
      fireEvent.change(lastName, {
        target: {
          value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        }
      })
      fireEvent.blur(lastName)
    });

    expect(getByTestId('driver-lastName-error').innerHTML).toBe("Demasiado largo! Máximo 255 letras.");

  });


  it("Apellido es más chico", async ()=>{
    const {getByTestId} = render(<DriverForm/>);

    let lastName = getByTestId('driver-lastName');

    await wait(()=>{
      fireEvent.change(lastName, {
        target: {
          value: "XX"
        }
      })
      fireEvent.blur(lastName)
    });

    expect(getByTestId('driver-lastName-error').innerHTML).toBe("Al menos 3 letras!");

  });

  /**
   * Validaciones de edad
   * 1. Se cambia de campo sin edad
   * 2. Edad < 16
   * 3. Edad > 120
   * 4. Edad tiene decimales
   */
  it("Sin edad", async ()=>{
    const {getByTestId} = render(<DriverForm/>);

    let age = getByTestId('driver-age');

    await wait(()=>{
      fireEvent.blur(age)
    });

    expect(getByTestId('driver-age-error').innerHTML).toBe("La edad es obligatoria");

  });

  it("Edad < 16", async ()=>{
    const {getByTestId} = render(<DriverForm/>);

    let age = getByTestId('driver-age');

    await wait(()=>{
      fireEvent.change(age, {
        target: {
          value: 10
        }
      })
      fireEvent.blur(age)
    });

    expect(getByTestId('driver-age-error').innerHTML).toBe("La edad mínima es 18 años");

  });


  it("Edad > 120", async ()=>{
    const {getByTestId} = render(<DriverForm/>);

    let age = getByTestId('driver-age');

    await wait(()=>{
      fireEvent.change(age, {
        target: {
          value: 150
        }
      })
      fireEvent.blur(age)
    });

    expect(getByTestId('driver-age-error').innerHTML).toBe("La edad máxima es 120 años.");

  });

  it("Edad no es entera", async ()=>{
    const {getByTestId} = render(<DriverForm/>);

    let age = getByTestId('driver-age');

    await wait(()=>{
      fireEvent.change(age, {
        target: {
          value: 15.5
        }
      })
      fireEvent.blur(age)
    });

    expect(getByTestId('driver-age-error').innerHTML).toBe("No puede contener decimales");

  });

  /**
   * Validaciones de telefono
   * 1. Sin datos
   * 2. Contiene caracteres que no son numeros
   */
  it("Sin datos", async ()=>{
    const {getByTestId} = render(<DriverForm/>);

    let telephone = getByTestId('driver-telephone');

    await wait(()=>{
      fireEvent.blur(telephone)
    });

    expect(getByTestId('driver-telephone-error').innerHTML).toBe("El teléfono es obligatorio");

  });

  it("Contiene caracteres extraños", async ()=>{
    const {getByTestId} = render(<DriverForm/>);

    let telephone = getByTestId('driver-telephone');

    await wait(()=>{
      fireEvent.change(telephone, {
        target: {
          value: "x 1255555 a"
        }
      })
      fireEvent.blur(telephone)
    });

    expect(getByTestId('driver-telephone-error').innerHTML).toBe("Solo números");

  });

  /**
   * Validaciones de email
   * 1. Sin datos
   * 2. No tiene formato mail
   */
  it("Sin datos", async ()=>{
    const {getByTestId} = render(<DriverForm/>);

    let email = getByTestId('driver-email');

    await wait(()=>{
      fireEvent.blur(email)
    });

    expect(getByTestId('driver-email-error').innerHTML).toBe("El email es obligatorio");

  });

  it("No tiene formato mail", async ()=>{
    const {getByTestId} = render(<DriverForm/>);

    let email = getByTestId('driver-email');

    await wait(()=>{
      fireEvent.change(email, {
        target: {
          value: "blablabla"
        }
      })
      fireEvent.blur(email)
    });

    expect(getByTestId('driver-email-error').innerHTML).toBe("Ese email no parece correcto!");

  });


  /**
   * Validaciones de patete
   * 1. Sin datos
   * 2. No tiene formato patete
   */
  it("Sin datos", async ()=>{
    const {getByTestId} = render(<DriverForm/>);

    let plate = getByTestId('driver-plate');

    await wait(()=>{
      fireEvent.blur(plate)
    });

    expect(getByTestId('driver-plate-error').innerHTML).toBe("La patente es obligatoria");

  });

  it("No tiene el formato de patente", async ()=>{
    const {getByTestId} = render(<DriverForm/>);

    let plate = getByTestId('driver-plate');

    await wait(()=>{
      fireEvent.change(plate, {
        target: {
          value: "B5236658"
        }
      })
      fireEvent.blur(plate)
    });

    expect(getByTestId('driver-plate-error').innerHTML).toBe("La patente debe ser XX000XX o XXX000");

  });

  /**
   * Validaciones de marca
   * 1. Sin datos
   */
  it("Sin datos", async ()=>{
    const {getByTestId} = render(<DriverForm/>);

    let brand = getByTestId('driver-brand');

    await wait(()=>{
      fireEvent.blur(brand)
    });

    expect(getByTestId('driver-brand-error').innerHTML).toBe("La marca es obligatoria");

  });

  /**
   * Validaciones de modelo
   * 1. Sin datos
   */
  
  it("Sin datos", async ()=>{
    const {getByTestId} = render(<DriverForm/>);

    let model = getByTestId('driver-model');

    await wait(()=>{
      fireEvent.blur(model)
    });

    expect(getByTestId('driver-model-error').innerHTML).toBe("El modelo es obligatorio");

  });
  

  /**
   * Validacion de conexion enviando datos correctos desde el formulario
   * Servidor responde ok
   */
  it('Validacion conexion con servidor', async () => {
    const {getByTestId, getByPlaceholderText} = render(<DriverForm/>);

    mockAxios.post.mockImplementationOnce(() => {
        return Promise.resolve({
            data: { status: "ok" }
        })
    })
    // Enviar el formulario
    const submitButton = getByTestId('driver-button-submit');

    let name = getByTestId('driver-name');
    let lastName = getByTestId('driver-lastName');
    let age = getByTestId('driver-age');
    let telephone = getByTestId('driver-telephone');
    let email = getByTestId('driver-email');
    let plate = getByTestId('driver-plate');
    let brand = getByTestId('driver-brand');
    let model = getByTestId('driver-model');
    let year = getByPlaceholderText('yearDP');

    await wait(()=>{
      fireEvent.change(name, {
        target: {
          value: "Juan"
        }
      })
      fireEvent.change(lastName, {
        target: {
          value: "Oliva"
        }
      })
      fireEvent.change(age, {
        target: {
          value: "23"
        }
      })
      fireEvent.change(telephone, {
        target: {
          value: "15666879542"
        }
      })
      fireEvent.change(email, {
        target: {
          value: "juan.oliva@mimail.com.ar"
        }
      })
      fireEvent.change(plate, {
        target: {
          value: "XXX000"
        }
      })
      fireEvent.change(brand, {
        target: {
          value: "Chery"
        }
      })
      fireEvent.change(model, {
        target: {
          value: "Tiggo"
        }
      })
      fireEvent.change(year, {
        target: {
          value: 2018
        }
      })
    });

    await wait(() => {
        fireEvent.submit(submitButton, {})
    })
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
        "https://httpbin.org/post",
        {
            name: "Juan",
            lastName: "Oliva",
            age: "23",
            telephone: "15666879542",
            email: "juan.oliva@mimail.com.ar",
            plate: "XXX000",
            brand: "Chery",
            model: "Tiggo",
            year: 2018
        }
    )
  })

  /**
   * Validacion de conexion enviando datos correctos desde el formulario
   * Servidor responde con error
   */
  it('Validacion conexion con servidor, error del server', async () => {
    const {getByTestId, getByPlaceholderText} = render(<DriverForm/>);

    mockAxios.post.mockImplementationOnce(() => {
        return Promise.reject({
            status: 403
        })
    })
    // Enviar el formulario
    const submitButton = getByTestId('driver-button-submit');

    let name = getByTestId('driver-name');
    let lastName = getByTestId('driver-lastName');
    let age = getByTestId('driver-age');
    let telephone = getByTestId('driver-telephone');
    let email = getByTestId('driver-email');
    let plate = getByTestId('driver-plate');
    let brand = getByTestId('driver-brand');
    let model = getByTestId('driver-model');
    let year = getByPlaceholderText('yearDP');

    await wait(()=>{
      fireEvent.change(name, {
        target: {
          value: "Juan"
        }
      })
      fireEvent.change(lastName, {
        target: {
          value: "Oliva"
        }
      })
      fireEvent.change(age, {
        target: {
          value: "23"
        }
      })
      fireEvent.change(telephone, {
        target: {
          value: "15666879542"
        }
      })
      fireEvent.change(email, {
        target: {
          value: "juan.oliva@mimail.com.ar"
        }
      })
      fireEvent.change(plate, {
        target: {
          value: "XXX000"
        }
      })
      fireEvent.change(brand, {
        target: {
          value: "Chery"
        }
      })
      fireEvent.change(model, {
        target: {
          value: "Tiggo"
        }
      })
      fireEvent.change(year, {
        target: {
          value: 2018
        }
      })
    });

    await wait(() => {
        fireEvent.submit(submitButton, {})
    })
    expect(mockAxios.post).toHaveBeenCalledWith(
        "https://httpbin.org/post",
        {
            name: "Juan",
            lastName: "Oliva",
            age: "23",
            telephone: "15666879542",
            email: "juan.oliva@mimail.com.ar",
            plate: "XXX000",
            brand: "Chery",
            model: "Tiggo",
            year: 2018
        }
    )
})

});


