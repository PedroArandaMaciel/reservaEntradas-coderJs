# ReservaEntradas

Pagina de reserva de entradas hecho como proyecto final para el curso de JavaScript en Coder House. La idea es plasmar algunas de las funcionalidades basicas de un sistema de reserva de entradas con sus condicionales de errores y succes.

# Que funciones posee

Desde el Home se encuentra la seccion de reservas de entradas en donde podemos ir agregando reservas al carrito, abajo de esta seccion se encuentra "Proximos Estrenos" que utiliza fetch para consumir datos de un json y mediante una funcion pintar las cards en el DOM.

En la seccion Crear Cuenta podemos ver un formulario de registro que crea usuarios nuevos utilizando el localStorage como Data Base, posee condiciones en js en donde valida que no se ingresen caracteres numericos en "nombre" y "apellido", ademas de revisar que no se envie un campo vacio en caso de editar el HTML (el "required").
Mediante un evento se captan los datos y se los envian al localStorage en donde seran consultados en la seccion "Iniciar Sesion" para la validacion de ingreso.

En la seccion Iniciar Sesion escribimos las credenciales para ingresar en sesion y asi poder finalizar compra desde la seccion Carrito en donde se nos habilita un boton de "Finalizar Compra" y ademas otro de "Cerrar Sesion" en la parte superior derecha, ademas se deshabilitan las secciones de crear cuenta y sesion dado que ya se encuentra registrado y con sesion habilitada. 

En la seccion Carrito podemos ver nuestras reservas, podemos quitar una por una o borrar todas, con la sesion iniciada se habilita el boton de finalizar compra.