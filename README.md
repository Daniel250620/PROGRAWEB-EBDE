2da tarea apartir de la linea 48

Estructura del componente: users.component (tabla)
Imports:

Se importan módulos de Angular necesarios, como CommonModule (para características comunes como ngIf y ngFor) y el servicio UserService que se utiliza para obtener los usuarios.
También se importa la interfaz UserInterface que define la estructura de los objetos de usuario.
Template:

El componente contiene una plantilla HTML con varias secciones:
Esqueleto de carga: Cuando los datos de los usuarios aún están cargando (loading es true), se muestra una serie de elementos de carga (esqueletos) para simular la carga de los datos.
Tabla de usuarios: Cuando los datos están listos, se muestra una tabla con los datos de los usuarios, que incluye las columnas: ID, Nombre, Email, Rol y Avatar.
Paginación: Se incluyen botones para navegar entre las páginas de la tabla (anterior y siguiente), y se muestra cuántos usuarios están siendo visualizados y el total de entradas.
Estilos:

Los estilos definen la apariencia de la tabla, el card que la contiene, los botones de paginación y los esqueletos de carga. Incluye detalles de diseño como sombras, bordes, colores, y disposición de los elementos.
Lógica del componente:
Propiedades:

users: Contiene todos los usuarios obtenidos del servicio.
displayedUsers: Contiene solo los usuarios que se deben mostrar en la página actual.
loading: Un indicador de si los datos aún se están cargando.
currentPage: La página actual de la tabla.
pageSize: El número de usuarios que se muestran por página.
Métodos:

ngOnInit: Este método se ejecuta cuando el componente se inicializa. Llama al método loadUsers para obtener los usuarios.
loadUsers: Obtiene los usuarios del servicio UserService y actualiza la lista users. Al finalizar la carga, desactiva el indicador loading y llama a updateDisplayedUsers para actualizar los usuarios que se deben mostrar en la página.
updateDisplayedUsers: Calcula qué usuarios se deben mostrar en la página actual en función de currentPage y pageSize, y actualiza displayedUsers.
nextPage y previousPage: Métodos que cambian la página actual y actualizan los usuarios mostrados.
trackByUserId: Se utiliza para optimizar el renderizado de los elementos en la tabla, usando el id del usuario como identificador único.
Getters:

startIndex y endIndex: Calculan los índices de inicio y fin para la paginación, es decir, qué rango de usuarios se debe mostrar.
Funcionalidad de paginación:
La paginación permite dividir los usuarios en varias páginas, mostrando solo un número limitado de ellos por página (definido por pageSize).
Los botones "Anterior" y "Siguiente" permiten al usuario navegar entre las páginas de la tabla.
Se muestra el rango de usuarios que están siendo visualizados en la página actual.

Preguntas de Reflexión
¿Qué ventajas tiene el uso de servicios en Angular para el consumo de APIs? Los servicios permiten centralizar la lógica de negocio, como la gestión de peticiones HTTP, lo que facilita el mantenimiento y reutilización del código en diferentes componentes.

¿Por qué es importante separar la lógica de negocio de la lógica de presentación? Separar estas dos lógicas permite una mejor organización y escalabilidad del código, facilitando el mantenimiento y las futuras modificaciones sin afectar la interfaz de usuario.

¿Qué otros tipos de datos o APIs podrías integrar en un proyecto como este? Se podrían integrar APIs de productos, clima, noticias, o cualquier otro tipo de dato estructurado que pueda ser consumido mediante HTTP.


----------------------------------------------------------------------------------------------------Ejercicio Login  - Consumir APIS de terceros

1. Interfaz UserInterface
Esta interfaz define la estructura esperada de los objetos de usuario que se manejan en el sistema. 
2. Servicio UserService
El UserService es el encargado de obtener los datos de los usuarios desde una fuente (API o archivo).
3. Componente LoginComponent
El LoginComponent conecta la lógica del servicio con la interfaz de usuario. Sus principales características son:

Propiedades:

inputUsername: Almacena el nombre de usuario ingresado.
inputPassword: Almacena la contraseña ingresada.
error: Mensaje de error predeterminado para credenciales incorrectas.
Método onSubmit():

Llama al servicio getUsers para obtener la lista de usuarios.
Busca un usuario con el nombre y la contraseña proporcionados.
Si encuentra un usuario coincidente:
Redirige al usuario a la ruta /home.
Si no lo encuentra:
Muestra un mensaje de error mediante showAlert().
Método privado showAlert(message: string):

Muestra una alerta en pantalla con el mensaje recibido como parámetro.
4. Recursos Importados
FormsModule y NgIf:
Utilizados para manejar formularios y condiciones en el template del componente.
Router:
Permite la navegación entre diferentes vistas de la aplicación.
UserService:
Gestiona los datos de los usuarios.
5. Flujo del Método onSubmit()
El usuario ingresa su nombre de usuario y contraseña.
El método onSubmit() se activa al enviar el formulario.
Se consulta la lista de usuarios mediante el servicio.
Se valida si las credenciales ingresadas coinciden con algún usuario registrado:
Coincidencia encontrada: Redirige a /home.
Sin coincidencia: Muestra el mensaje de error Credenciales incorrectas.
Si ocurre un error en la solicitud, muestra un mensaje indicando problemas de conexión.
