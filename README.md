Español:

Arquitectura:
(Frontend) WebAPI + motor Typescript -> (Backend) Llamada RestAPI -> Modelo Inyección de Dependencias -> IRequest -> IRequestHandler (Inicializa EFCore) -> DBContext (Uso de EFCore API)

NetCore 6.0 LTS RestAPI + WebAPI que implementa las siguientes características:
- DDD + CQRS.
- Command Handler NetCore 3.0+ .NET format. (Isolación de capas de seguridad controladas por memoria)
- HttpStatus, RestFul, Inyección de dependencia.
- Información parametrizada desde appsetting. 
- Entity Framework Core (genera bases de datos y tablas dinámicamente desde Clases en RestAPI)

Uso:
- Instalar Visual Studio 2022 con componentes REST API
- Instalar SQL Express 2017
- Instalar SQM Management Studio
- Instalar Postman
- Abrir SQM Management Studio. Usar inicio de sesión de Windows en SQL Express, agregar la base de datos "Prueba".
- En SQL Explorer, encima de base de datos "Prueba", pulsar botón derecho del mouse, Nueva Query y luego, copiar y pegar todo el contenido dentro de las comillas (sin incluírlas), seleccionar todo y ejecutar script:

"

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
CREATE PROCEDURE ObtenerClientes_SP 
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [Token]
      ,[Name]
      ,[Password]
      ,[Country]
      ,[Phone]
      ,[Tokenleasetime]
  FROM [Prueba].[dbo].[Clientes]
END
GO

"

- Abrir Postman, cargar el Postman Collection del proyecto, y ejecutar la funcionalidad de API anteriormente descrita:
- Abrir RestAPI, ejecutar en segundo plano y no cerrar.


----------------------------------------------------------- Ejecutar aplicación Angular ------------------------------------------------------------------

////////////////////////////////////////////Instalar Angular + Entorno desarrollo Web (Navegador Edge) :////////////////////////////////////////////

-Instalar VSCode
-Instalar NodeJS (carpeta /instalables/node-v14.18.2-x64.msi)
-Instalar Edge


VSCode instalar las siguientes extensiones:

- Angular Extension Pack
- Angular Essentials (Version 13)
- Angular Language Services
- Angular Snippets (Version 13)
- Angular Files
- Microsoft Edge Tools for VS Code
- Prettier - Code formatter

Luego en VSCode: Ir a Explorer -> Abrir Carpeta -> /ClienteAngular14

Luego ir a pestaña izquierda de VSCode "Depurar y Ejecutar/Run and Debug", escoger "Web App", borrar todo lo que tiene, y agregar el siguiente JSON dentro de las comillas (sin incluír comillas):

"

{
  "configurations": [
    {
      "type": "vscode-edge-devtools.debug",
      "request": "launch",
      "name": "Launch Microsoft Edge and open the Edge DevTools",
      "url": "http://localhost:4200",
      "webRoot": "${workspaceFolder}"
    },
    {
      "type": "pwa-msedge",
      "name": "Launch Microsoft Edge",
      "request": "launch",
      "runtimeArgs": [
        "--remote-debugging-port=9222"
      ],
      "url": "http://localhost:4200", // Provide your project's url to finish configuring
      "presentation": {
        "hidden": true
      }
    },
    {
      "type": "pwa-msedge",
      "name": "Launch Microsoft Edge in headless mode",
      "request": "launch",
      "runtimeArgs": [
        "--headless",
        "--remote-debugging-port=9222"
      ],
      "url": "http://localhost:4200",
        "presentation": {
        "hidden": true
      }
    },
    {
      "type": "vscode-edge-devtools.debug",
      "name": "Open Edge DevTools",
      "request": "attach",
      "url": "http://localhost:4200",
      "presentation": {
        "hidden": true
      }
    }
  ],
  "compounds": [
    {
      "name": "Launch Edge Headless and attach DevTools",
      "configurations": [
        "Launch Microsoft Edge in headless mode",
        "Open Edge DevTools"
      ]
    },
    {
      "name": "Launch Edge and attach DevTools",
      "configurations": [
        "Launch Microsoft Edge",
        "Open Edge DevTools"
      ]
    }
  ]
}

"

-guardar cambios JSON, y cerrar JSON.

-eliminar carpeta /node_modules si existe en /ClienteAngular14

- Ahora abrir una línea de comandos (NodeJS Command Prompt), ir a la carpeta /ClienteAngular14 dentro de la línea de comandos (NodeJS Command Prompt), y ejecutar los siguientes comandos:

npm cache clean --force
npm i
npm start

Y debería ejecutarse correctamente en : http://localhost:4200


- Ahora en VSCode, ir a pestaña izquierda de VSCode "Depurar y Ejecutar/Run and Debug", y seleccionar "Launch Edge and attach DevTools". Ahora se podrá ejecutar la aplicación angular simplemente presionando F5 o botón verde de ícono Play.
  Una ventana de navegador Edge se ejecutará, y ahora puedes utilizar el VSCode "Explorer" en la pestaña izquierda,para abrir un archivo Angular, agregar puntos de interrupción y depurar la aplicación en tiempo real. 

"

////////////////////////////////////////////  ////////////////////////////////////////////

Nota:

1)
El diagrama UML con la arquitectura de la plataforma, se puede visualizar mediante https://app.diagrams.net/?src=about -> Open Existing Diagram y seleccionando el archivo /RestAPISwagger/UML.drawio

2)
Opcionalmente, para testear los servicios, se pueden importar las colecciones en Postman (/RestAPISwagger/UnitTestMicroservicios.postman_collection.json), ya que incluyen pruebas con las APIs utilizadas en la plataforma, junto su respectivos JSON. Se debe ejecutar la aplicación C# de servicios REST en segundo plano antes de llamar las APIs desde Postman.

3)
Por defecto, se utiliza una base de datos SQL Server local, por ende los string de conexión están parametrizados desde un appsetting y no necesitan ser modificados. De todas maneras, se adjunta el string de conexión necesario para ejecutar la plataforma:

Server=localhost\SQLEXPRESS;Database=master;Trusted_Connection=True;
