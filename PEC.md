# PJP PEC 3

En esta PEC se practican las técnicas de programación asíncrona en JavaScript: _callbacks_, promesas y _async/await_, así cómo las diferentes combinaciones entre ellas.

## Competencias

En esta PEC se desarrollan las siguientes competencias del Máster:

- Utilizar de manera adecuada el lenguaje JavaScript y usarlo en el desarrollo de sitios y aplicaciones web, en función de las necesidades del proyecto.
- Adaptarse a las tecnologías web y a los futuros entornos actualizando las competencias profesionales.

## Objetivos

Los objetivos concretos de esta PEC son:

- Aprender los conceptos básicos de promesas en JavaScript.
- Aprender los conceptos básicos de la asincronía en JavaScript.

## Entrega de la PEC

Una vez hayas realizado las actividades prácticas propuestas en este enunciado, **la entrega se realizará de forma doble**:

- Deberás enviar tus cambios al apartado del aula virtual de la UOC.
- Deberás enviar tus cambios al repositorio de GitHub Classroom.

Recuerda que este repositorio lo has clonado del repositorio en GitHub. Cuando trabajes en tu sistema, todos los cambios los harás en tus ficheros locales, los cuales tendrás que añadir y _comitear_ a tu repositorio Git. Estos cambios estarán en tu sistema hasta que hagas _push_ y los envíes al repositorio en GitHub.

Recuerda que debes trabajar en la rama _main_ o _master_ (la que se cree por defecto). Puedes hacer varios envíos.

En el aula virtual encontrarás una _checklist_ que te ayudará a repasar todos los pasos que debes hacer para la entrega de tu PEC.

## Puntuación

El hecho de trabajar con tests para verificar la funcionalidad del código os permitirá tener una idea de vuestra propia nota antes de la entrega.

La puntuación de los ejercicios prácticos se basa en dos criterios: **Funcionalidad** e **implementación**. Se espera que los ejercicios funcionen correctamente (pasen los tests) y que la implementación (el código) tenga una calidad adecuada.

Algunos detalles a tener en cuenta:

- Se penalizará cualquier intento de _hardcodear_ los tests para forzar que pasen. Esta técnica consiste en cambiar la implementación para que devuelva únicamente el valor esperado por el test (cualquier otro test fallaría).
- Los tests automáticos están diseñados para detectar ejercicios erróneos o incompletos para casos concretos. El hecho de que un test pase no garantiza que el ejercicio esté realizado correctamente, es decir, que cubra todos los casos.
- Un ejercicio cuyos tests no pasan se puntuará con un 0 salvo que existan problemas con el test.
- Además de pasar los tests, el profesorado evaluará vuestro código en base a los siguientes criterios:
  - Legibilidad, sencillez y calidad del código.
  - Conocimientos de programación. Por ejemplo, no utilizar las estructuras de control adecuadas, cómo utilizar un bucle para construir una sentencia condicional o viceversa.

## Requisitos mínimos

- Tener instalado Visual Studio Code.
- Conocimientos básicos de Git y GitHub (Actividades 2 y 3 del Reto 1).
- Estudio de la introducción y repaso a JavaScript (Actividad 1 del Reto 2).
- Estudio de los conceptos de JavaScript (Actividades 2 y 3 del Reto 2).
- Estudio de la introducción a la asincronía en JavaScript (Actividad 1 del Reto 3).
- Estudio de los conceptos de asincronía de JavaScript (Actividad 2 del Reto 3).

## Ejercicios prácticos (9 p)

Para realizar los ejercicios prácticos debes dirigirte a la siguiente ruta, dentro del repositorio: `src/pec3/pec3.js`.
En este fichero deberás implementar las funciones que te indicamos en los ejercicios que verás más abajo.

Por otro lado, los tests que te permitirán saber si la solución que propones para los ejercicios es correcta están en el fichero `src/pec3/pec3.spec.js`.
**No debes editar este fichero**.
Ten en cuenta que los tests son condiciones que deben cumplir las funciones que implementarás en los ejercicios, por lo que pueden servirte de ayuda para corregirlos.

### Preparando el entorno

Una vez hecho clone del repositorio, debes instalar las dependencias del proyecto.

```
npm install
```

A continuación, para lanzar los tests debes ejecutar el siguiente comando:

```
npm t
```

La instrucción anterior lanzará los tests cada vez que guardes el fichero `src/pec3/pec3.js`, que es precisamente donde implementarás los ejercicios de esta PEC.

Tal y como te indicamos en la PEC 1, la primera vez que ejecutes `npm t` y se lancen los tests, fallarán todos, ya que no hay ningún ejercicio implementado. Conforme vayas trabajando en los ejercicios y guardes el fichero, puede que algún test lance algún error. Revisa el mensaje de error que se imprime para conocer su formato y entender cómo se notifican los errores.

Si tienes algún problema con los tests, no dudes en preguntar en el foro "Dudas PEC 3 | Dubtes PAC 3" del aula.

### Ejercicio 1 (1,5 p)

#### Enunciado

Implementa la función `generateStats(data, callback)`, que recibe 2 parámetros:

- `data`: un valor nullable, de tipo `Array`, cuyo contenido serán elementos de tipo `String` o valores nulos.
- `callback`: una función que toma dos parámetros:
  - `data`: resultado de la operación o `null` en caso de error.
  - `error`: `null` en caso de éxito o un `String` con un mensaje indicando la causa del error.

La función deberá analizar el contenido de `data` para determinar cuantas veces se repite cada elemento diferente, ignorando los valores nulos. Después, deberá construir un nuevo objeto vacío y añadir tantos atributos cómo valores diferentes se hayan encontrado. Cada atributo así añadido tendrá el mismo nombre que el valor al que representa, y su valor se establecerá al número de apariciones encontradas en `data`.

Por ejemplo, si `data` es `['lion','lion','zebra','giraffe','giraffe','giraffe',null,null]`, el objeto sería `{'lion' : 2, 'zebra' : 1, 'giraffe' : 3}`.

Una vez construido el objeto anterior, habrá que ejecutar la función _callback_ suministrada según estas premisas:

- Si `data` es válido, es decir, es un array de elementos de tipo `String` o nulos; el valor para el parámetro `data` de la función _callback_ será el objeto construido, mientras que el del parámetro `error` será `null`.
- Si `data` es `null` o no es de tipo `Array`, el valor para el parámetro `data` de la función _callback_ será `null`, mientras que el del parámetro `error` será una cadena con el texto: `Invalid input`.

Finalmente, la función deberá devolver el valor retornado durante la ejecución de `callback`.

### Ejercicio 2 (1,5 p)

#### Enunciado

Implementa la función `callbackPromise`, que recibe 3 parámetros:

- `time`: un valor no nulo, de tipo `Number`, que indica una cantidad de milisegundos.
- `info`: un valor de tipo `Array`, no nulo, con un contenido arbitrario.
- `callback`: una función que toma un único argumento de tipo `Array`.
  - En caso de éxito, devolverá un valor de tipo `Array`. El array devuelto tendrá el mismo número de elementos que el argumento de entrada, y cada elemento será del mismo tipo.
  - En caso de error, lanzará una excepción con un código de error de tipo `Number`.

El cometido de la función `callbackPromise` es crear una promesa que ejecute de forma asíncrona y en diferido el `callback` suministrado usando el valor `info` cómo argumento. El valor devuelto por la función _callback_ será utilizado por la promesa para hacer una suma matricial con el valor `info` y devolver el resultado.

De esta forma, se tendrán en cuenta los siguientes requisitos:

- La función deberá devolver una promesa.
- La promesa deberá fallar si algo va mal durante el proceso.
- La promesa no deberá resolverse antes de que transcurran `time` milisegundos.
- Al resolverse, la promesa deberá devolver el resultado de la **suma matricial** entre `info` y el resultado de la ejecución del callback. En otras palabras, deberá retornar un nuevo `Array` donde cada elemento será la suma de los elementos individuales de `info` y el resultado del callback.

> **Nota:** La suma matricial es la operación de sumar dos arrays sumando las componentes o elementos correspondientes. Por ejemplo, dados los arrays `[1, 1, 1]` y `[0, 7, 2]` la suma matricial es `[1, 8, 3]`.

### Ejercicio 3 (1,5 p)

#### Descripción

En este ejercicio veremos cómo usar promesas anidadas para implementar una función de validación de datos (obtenidos de un formulario, por ejemplo) haciendo uso de una función o API asíncrona. En este caso, la función que debes implementar tendrá que verificar que los datos introducidos son válidos y se ajustan a los requisitos exigidos.

Los datos de usuario que habrás de validar están modelados por la clase `UserForm`, que tiene la siguiente estructura:

- `userName`, de tipo `String`
- `password`, de tipo `String`
- `confirmPassword`, de tipo `String`

Uno de los requisitos es que los nombres de usuario no pueden estar duplicados. Para ello, se te facilitará una función `userExists` que comprueba si ya existe en el sistema un usuario registrado con el mismo nombre. Esta función toma un único argumento de tipo `String` con el nombre del usuario que se desea comprobar. Como resultado, devuelve una promesa que:

- En caso de éxito, se resuelve con un valor `Boolean` indicando si el usuario ya existe o no.
- En caso de error, se rechaza con un mensaje de texto indicando qué ha ocurrido.

#### Enunciado

Implementa la función `validateForm(formData,userExists)`, que recibe 2 parámetros:

- `formData` es una instancia de tipo `UserForm`
- `userExists` es una función que determina la existencia de un usuario (ver descripción arriba)

El objetivo de la función `validateForm` es efectuar una validación que consulte un origen de datos asíncrono (representado por la función `userExists`) cómo parte de su lógica. Habrá de cumplir los siguientes objetivos:

- La función efectuará una serie de comprobaciones sobre `formData`:
  - Si `userName` es nulo, generará un error con el mensaje `userName cannot be null`.
  - Si `password` es nulo, generará un error con el mensaje `password cannot be null`.
  - Si `confirmPassword` no coincide con `password`, generará un error con el mensaje `passwords don't match`.
  - Si `userName` ya existe, generará un error con el mensaje `userName already exists`.
- La función devolverá una promesa con las siguientes características:
  - En caso de éxito, se resuelve devolviendo el valor de `userData`.
  - En caso de error en la validación, se rechaza con el mensaje de error capturado.

> Nota: No es necesario crear la clase `UserForm`, fíjate que ya está definida en el archivo `pec3.js`

### Ejercicio 4 (1,5 p)

#### Descripción

En este ejercicio practicaremos el encadenamiento de promesas. Para ello, modelaremos de forma simplificada el proceso de registro de un usuario en un portal web. Los datos que se registrarán están modelados por la clase `UserData`:

- `userName`, de tipo `String`
- `password`, de tipo `String`
- `email`, de tipo `String`

El procedimiento de registro es cómo se describe a continuación:

1. Adquirir los datos del usuario.
2. Validar los datos del usuario.
3. Almacenar los datos del usuario.

Cada uno de los pasos descritos anteriormente se corresponde con una función que encapsula cada etapa del proceso:

- `getUserData()`, una función que recopila los datos del usuario. No toma ningún argumento y devuelve una promesa que:
  - En caso de éxito, se resuelve con un objeto de tipo `UserData`
  - En caso de error, se rechaza con un mensaje de error indicando qué ha ocurrido.
- `validateData(userData)`, una función que valida los datos de un usuario. Toma cómo argumento un objeto de tipo `UserData` y devuelve una promesa:
  - En caso de éxito, se resuelve devolviendo un código numérico.
  - En caso de error, se rechaza con un mensaje de error indicando qué ha ocurrido.
- `saveUserData(userData)`: es una función que guarda los datos de un usuario en una base de datos remota. Toma cómo argumento un objeto de tipo `UserData` y devuelve una promesa que:
  - En caso de éxito, se resuelve con un valor de tipo `String` que refleja el identificador único del usuario recién creado.
  - En caso de error, se rechaza con un mensaje de error indicando qué ha ocurrido.

#### Enunciado

Implementa la función `registrationProcess(getUserData,validateData,saveUserData)`. Los tres argumentos que recibe se corresponden con las funciones descritas con anterioridad.

El objetivo es efectuar la captura de datos, validación y almacenamiento de los datos del usuario, haciendo uso de los valores pasados cómo argumentos. La función debe cumplir los siguientes requisitos:

- La función deberá capturar los datos del usuario usando `getUserData()`.
- La función deberá validar los datos adquiridos usando `validateData()`.
- La función deberá guardar los datos usando `saveUserData()`.
- El resultado de la función será una **promesa**.
  - En caso de éxito, se resolverá devolviendo un `Object` con los siguientes atributos:
    - `userData`: de tipo `UserData`, contendrá los datos del usuario obtenidos del formulario a través de `getUserData()`.
    - `validationCode`: de tipo `Number`, contendrá el código de validación devuelto por la función `validateData()`
    - `userId`: de tipo `String`, contendrá el valor devuelto por la función `saveUserData()`
  - En caso de error, se rechazará devolviendo un mensaje con el texto: `REGISTRATION FAILED: <err>`, donde `<err>` es el mensaje de error capturado.

> Nota: No es necesario crear la clase `UserData`, fíjate que ya está definida en el archivo `pec3.js`

### Ejercicio 5 (1,5 p)

#### Enunciado

En este ejercicio veremos cómo poner en práctica los conceptos aprendidos sobre async/await. Para ello, tendrás que implementar la función `asyncProcess(times,produce,consumer)`, que toma tres argumentos:

- `times`: un valor de tipo `Number` que indica el número de iteraciones que habrá que efectuar.
- `produce`: es una **función asíncrona** que no toma argumentos y retorna un valor de tipo `Array`. En caso de error lanzará una excepción con un mensaje indicando qué ha ocurrido.
- `consume`: es una **función asíncrona** que toma un único argumento arbitrario y devuelve también un argumento arbitrario. En caso de error lanzará una excepción con un mensaje indicando qué ha ocurrido.

La función `asyncProcess` deberá tener las siguientes características:

- Será una función asíncrona, y por tanto habrá de hacer uso de las palabras reservadas **async/await**
- La función llamará a `produce()` tantas veces cómo se haya indicado en el argumento `times`
- Cada elemento obtenido cómo resultado de `produce()` habrá que suministrarlo cómo argumento a `consume()` (_ver nota_)
- La función deberá devolver un `Array` donde se encuentren todos los resultados obtenidos de invocar la función `consume()`
- En caso de error, la función deberá lanzar una excepción de tipo `Error` con el mensaje: `Error on iteration <iteration>: <error>`, donde `<iteration>` es el número de iteración en el que ha fallado la función, y `<error>` el código de error obtenido.

> Nota: `produce()` devuelve un `Array` de resultados, de manera que habrá que invocar `consume()` para cada elemento de la lista obtenida.

### Ejercicio 6 (1,5 p)

#### Enunciado

En este ejercicio se implementará una función capaz de llevar a cabo una tarea en segundo plano, de tal manera que permita conocer el estado de la operación. Para conseguir este objetivo, la función deberá ejecutar de forma asíncrona el proceso y devolver una función que nos proporcionará información sobre dicho proceso cada vez que sea ejecutada.

Implementa la función `backgroundProcess(produce,consumer)`, que toma dos argumentos:

- `produce`: es una función asíncrona con las siguientes características:
  - No recibe ningún argumento
  - Devuelve cómo resultado un `Array` con valores arbitrarios o `null`.
- `consumer` es una función con las siguientes características:
  - Toma un único argumento `product`, un valor arbitrario no nulo de cualquier tipo.
  - Devuelve una promesa que al resolverse devuelve un valor arbitrario no nulo. En caso de error, se rechazará con un código de error de tipo numérico.

La función deberá cumplir con los siguientes requisitos:

- Ejecutará un proceso asíncrono de forma periódica:
  - El tiempo entre llamadas deberá ser de 100 milisegundos.
  - En cada iteración se invocará la función `produce()` para obtener nuevos valores.
  - Si el valor obtenido fuera válido (diferente a `null`), habrá que iterar sobre cada elemento del array devuelto y suministrarlo cómo argumento a la función `consumer()`.
  - Si el valor obtenido no fuera válido (`null`), el proceso habrá de finalizar.
- **Devolverá inmediatamente, cómo resultado, una función** que al ser invocada retornará un objeto con los siguientes atributos:
  - `available` (`Array`): Un array que contiene los elementos producidos y consumidos **desde la última invocación de la función devuelta**
  - `totalProduced` (`Number`): Un valor numérico que indica el total de elementos producidos en segundo plano
  - `status`: (`Number`): `0` Si el proceso no ha empezado aún, `1` si el proceso está en ejecución, `2` si el proceso ha terminado.
