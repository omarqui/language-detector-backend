## Arquitecta de la solución

Al momento de de seleccionar la arquitectura para esta funcionalidad, he tomado en consideración los siguientes puntos:

1. Esta funcionalidad puede ser utilizada de forma simultanea por una gran cantidad de usuarios
2. Esta funcionalidad inicialmente solo detectara los idiomas: Ingles, Francés y Español, pero es posible que con el tiempo se agreguen nuevos idiomas
3. Es posible que con el tiempo se necesite aumentar la precisión con la que detecta un idioma
4. Es necesario detectar combinación de idiomas
5. Es posible que se deseen cambiar los parámetros que determinan la detección de un idioma

Tomando estos requerimientos la arquitectura seleccionada consiste en:

Al momento de detectar un texto se consultara cada palabra con un base de datos que guardara a cuales lenguajes pertenece dicha palabra y se determinara el idioma según la sumatoria de la cantidad de palabras agrupadas por idioma 

### Modelo de datos

Decidí utilizar MongoDB como motor de base de datos debido a que la funcionalidad que se pide desarrollar no requiere de un modelo relacional y tampoco de un manejo de transacciones por lo que se puede aprovechar la ligereza y rapidez de las bases de datos de documentos

El esquema de la collection que almacenara las palabras es el siguiente:

```json
{
	_id: String, //Palabra
	languages: Array<String> // Lista de idiomas a la que pertenece es palabra
}
```

Decidí utilizar el id para almacenar la palabra debido a que MongoDB posee indices automáticos para el campo _Id y de igual forma posee restricciones para evitar duplicidad de  dicho campo

Como algunas palabras son compartidas por diferentes idiomas el campo **languages** almacenara un arreglo con los idiomas a lo que pertenece cada palabra, también existe la posibilidad de que crear Collections diferentes para cada idioma con sus palabras, pero esta opciones es menos eficiente, pues, para buscar una palabra tendría que definirse una cola de collection y si por ejemplo se busca una que esta en francés y el programa esta definido para buscar primero palabras en ingles, luego español y por ultimo francés, esto mas tardado que solo buscar en una collection con indices.

### Aprovisionamiento de Datos

Considerando que para esta App sera algo recurrente alimentar la base de datos con nuevas palabra y quizás idiomas, decidí crear un proyecto solo con el objetivo de llenar la base de datos con palabras nuevas, la ventaja al extraer este  proyecto realiza una serie de validaciones para:

1. Puede realizar inserciones masivas de palabra al tomarlas de un archivo de texto
2. Solo insertara las  palabras nuevas
3. En caso de que la palabra pertenezca a mas de un idioma solo la actualiza

Este proyecto esta escrito en NodeJs

### Backend

Para el backend decidí utilizar Javascript con NodeJs, de igual forma decidí utilizar la menor cantidad de librerías posible, debido a que esta aplicacion solo necesita un Endpoint, por lo el HttpServer hecho en puro NodeJs (sin Frameworks) y de igual forma decidir crear un muy sencillo motor de plantillas

### Oportunidades de mejora

Por cuestiones de tiempo no pude realizar todas las funcionalidades que deseaba, pero algunos de los puntos que pueden mejorar en esta aplicación son:

1. La app para aprovisionar la base de datos podría recibir como parámetro el archivo que contiene las palabras a insertar y el idioma al que pertenecen esas palabras
2. En el backend se puede implementar una base de datos de Redis como cache
3. Se puede mejorar la interfaz grafica