# My Uber

Pequeña aplicación de carga de datos de conductores.
Se ingresas datos personales del conductor y de su vehículo.

### Componentes

Se creó la siguiente estructura de carpetas dentro de src

components
    api         -> Driver.js <br/><br/>
    driver-form -> Driverform.js<br/>
                

#### api -> Driver.js

Este archivo contiene la logica de conexión con el servidor.
Se utiliza la biblioteca axios para conexión.
El método para el manejo de asincronismo es async/await

#### driver-form -> Driverform.js

Este archivo contiene el formulario en si.
Para la creación del formulario se utilizó Formik. (https://formik.org/)
Para la validación del formulario se utilizó Yup. (https://github.com/jquense/yup)

Algunas expresiones regulares fueron utilizadas para la validación del número de teléfono y patente. En el caso de la patente se verifica según esquema de patentes vigentes en la actualidad en Argentina.


### Otros datos

- Se utilizo bootstrap para el diseño. (https://reactstrap.github.io/)

- Se redefinieron algunos estilos de bootstrap mediante css.

- Para los íconos de "Social Media" se utilizó FontAwasome (https://fontawesome.com/)


<br/>
</br>
## Ejecución

Este proyecto fue creado con [Create React App](https://github.com/facebook/create-react-app).

### Antes de comenzar

En la carpeta de la aplicación ejecutar por línea de comandos:

`npm install`

Este comando instalará las dependencias que el sistema necesita para funcionar.

### Para ejecutar la aplicación

En la carpeta de la aplicación ejecutar por línea de comandos:

`npm start`

Esto ejecutará la aplicación en modo desarrollo.
Abrir en el navegador [http://localhost:3000](http://localhost:3000)

### Test

En la carpeta de la aplicación ejecutar por línea de comandos:

`npm test`

Lo cual ejecutará los testeos de la aplicación.

