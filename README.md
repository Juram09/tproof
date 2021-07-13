
# BlueSoft prueba tecnica

Readme.md de la prueba tecnica propuesta por BlueSoft Technology



### Instrucciones para ejecutar la aplicacion en un ambiente local
Lo principal es tener instalado y configurado postreSQL en el puerto 5432, java 11 y angular 12,
la aplicacion está separada en backend y frontend, por lo que es necesarop tener un IDE
para correr el archivo que se encuentra en backend\src\main\java\com\bluesoft\bluebank\tproof 
con el nombre de TproofApplication.java, esto pondra a correr el backend si la conexion
con la base de datos está hecha de manera correcta. Para correr el frontend lo unico que hace
falta es abrir la consola en la carpeta frontend y correr "ng serve", la aplicacion estará
corriendo en localhost:4200.

### Supuestos de negocio y tecnología para solucionar el problema
El problema era una renovacion de sistema financiero de BlueBank, y realizar ciertos
requerimientos basicos como creacion de una nueva cuenta, consignacion, retiro y consulta
de saldo, por lo que he desarrollado una pagina web capaz de hacer esto, para las cuentas de 
banco se utilizaron una serie de numeros justo como lo dispone la ley, los primeros dos numeros 
es el codigo del banco (en este caso uno ficticio, es decir 75), los siguientes 4 digitos son el
numero de la oficina donde esta cuenta fue abierta (en este caso uno ficticio, es decir 0286),
los proximos 4 numeros son del tipo de cuenta (en este caso de ahorros, es decir 0200) y 
los ultimos 7 digitos el numero de cuenta como tal que van del 1 al 9999999 ordenadamente.

### Explicacion de la arquitectura planeada para resolver el problema
El problema fue realizado bajo la arquitectura REST basada en HTTP, esto para relacionar 
backend y frontend y asi mismo realizar un CRUD con las herramientas utilizadas, utilizando 
metodos HTML como GET, POST y PUT para obtener los datos de la base de datos, realizar 
la introduccion de datos en la base de datos, y actualizar estos mismos datos para cada 
funcionalidad propuesta, ademas de algunas pruebas unitarias tanto en el frontend como
en el backend para lograr una aplicacion mas robusta y un mecanismo de auditoría a base
de archivos de texto alojados en la nube.

### Explicación de las tecnologías seleccionadas para resolver el problema
El problema se abordó utilizando una base de datos local con postreSQL, el backend
para la conexion de está fue realizada con Java Spring Boot con Java 11 y Gradle, para las 
pruebas unitarias del backend se utilizó la herramienta de JUnitTest que proporciona el 
Java Spring Boot, para el frontend se utilizó angular 12 junto con Bootstrap para la responsividad
y material para el diseño, para las pruebas unitarias del frontend se utilizó Karma 6 
y Jasmine 3, para los mecanismos de auditoría a base de archivos de text se utilizó Sentry,
esta notifica cuando hay algun error y tiene una pagina web completa para revisar estos, y
por ultimo se utilizó postman para verificar que de los servicios del backend estuvieran 
funcionando al 100%

### Qué haría mejor o como podría atacar mejor el problema si tuviera más tiempo
Siento que si tuviera mas tiempo hubiera hecho la implementacion con Docker, es una herramienta
que nunca he usado, pero quiero aprender a utilizarla, entonces haria la implementacion, 
ademas de desarrollar mejor los diseños del frontend, desplegar la aplicacion en la nube, 
probablemente en aws, si tuviera que rehacerla probablemente usaría Django, es una tecnología
que estoy aprendiendo y no he tenido la suerte de poder implementarla en algun proyecto.
