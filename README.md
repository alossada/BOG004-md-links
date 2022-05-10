# MDLINKS

## Indice

- [1. Resumen del proyecto](#1-resumen-del-proyecto)

- [2. Diagramas de flujo](#2-diagramas-de-flujo)

- [3. Instalación y guia de uso de la librería](#3-instalación-y-guia-de-uso-de-la-librería)

- [4. Autora](#5-Autora)

### 1. Resumen del proyecto

Es una librería que sirve para devolver el número de enlaces que contiene un archivo MD, permitiendo ver a su vez estadísticas sobre:

total de links.
links únicos.
links rotos.

### 2. Diagramas de flujo


### 3. Instalación y uso de la librería

#### 3.1 Instalación

`npm i mdlinks-alossada`

#### 3.2 Guia de uso de la librería

- En la terminal ingresamos el comando **md-Links** seguido de la ruta absoluta o relativa de la ubicación del archivo y/o carpeta en la cual se buscaran los links.
  Ejemplo:


- Ingresando el comando **md-Links** seguido de la **ruta** y seguido del comando **--validate**, obtendremos las propiedades de los links encontrados.
  Ejemplo:



- Ingresando el comando **md-Links** seguido de la **ruta** y seguido del comando **--stats**, obtendremos algunos datos estadisticos(total de links y cantidad de links unicos).
  Ejemplo:



- Ingresando el comando **md-Links** seguido de la **ruta** y seguido de los comandos **--stats --validate** o **--validate --stats**, obtendremos la cantidad total de links que encontremos en ese archivo, el total de links unicos encontrados y el total de links rotos.
  Ejemplo:



- Ingresando el comando **md-Links** seguido de la **ruta** y seguido del comando **--help**, obtendremos una tabla con ayuda.
  Ejemplo:

### 4. Autora

- Angelica Losada
