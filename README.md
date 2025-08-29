# Api rest de sistema de producto

Este proyecto es un backend desarrollado con **NestJS**, que implementa autenticación **JWT**, roles de usuario, y clases genéricas para generar CRUD de manera rapida para las tablas de la base de datos.

---

## Características

Este proyecto aplica varias funcionalidades y buenas prácticas en NestJS:

✅ **JWT para autenticación:** Seguridad de endpoints con tokens.

✅ **Uso de TypeScript** para tipado seguro y mantenimiento más sencillo.

✅ **TypeORM** para mapeo de objetos-relacional y manejo de la base de datos.

✅ **Roles de usuario:** Control de acceso a rutas según permisos.

✅ **Uso de decoradores** de NestJS y TypeScript validación y control de rutas por el rol del usuario.

✅ **Clases genéricas**: CRUD completo de cualquier tabla con clases reutilizables.

✅ **Interceptor para respuestas genéricas:** Formato uniforme de las respuestas de la API.

✅ **Manejo de errores** controlados y no controlados: Captura y respuesta consistente de errores.

✅ **Validaciones con class-validator:** Validación de DTOs para garantizar integridad de datos.

✅ **Contraseña encriptada:** Seguridad en almacenamiento de contraseñas.

✅ **Uso de DTOs:** Transferencia de datos consistente entre capas.

✅ **Paginación en listas:** lista de productos con API paginada.

✅ **Swagger para documentación de API:** Generación automática de documentación interactiva.

## Funcionalidades

Actualmente el proyecto cuenta con las siguientes funcionalidades:

✅ Autenticación de usuarios con JWT.

✅ Listar productos paginados desde la base de datos: Accesible tanto para usuarios con rol **admin** como **user**.

✅ Obtener un producto {id} : Accesible tanto para usuarios con rol **admin** como **user**.

✅ Crear productos mediante endpoint seguro: Solo accesible para usuarios con rol **admin**.

✅ Actualizar producto mediante endpoint seguro: Solo accesible para usuarios con rol **admin**.

✅ Eliminar producto {id} mediante endpoint seguro: Solo accesible para usuarios con rol **admin**.

## Posibles mejoras del sistema

1. Configurar CORS para permitir únicamente orígenes autorizados y así prevenir que sitios maliciosos accedan a las APIs.
2. Implementar logs centralizados para registrar solicitudes, respuestas y errores,
   Esto permite solucionar bugs más rápidamente y analizar el comportamiento del sistema en producción.
3. Agregar Excepciones personalizadas que permitan diferenciar errores de validación, autorización, base de datos, etc., y mejorar la experiencia de desarrollo y usuario.

## Requisitos

- Node.js >= 20.x
- npm o Yarn
- PostgreSQL
- Git

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/alan2797/api-sistema-producto.git
cd api-sistema-producto
```

Instalar dependencias:

```bash
npm install
# o
yarn install
```

---

## Variables de entorno

```env
PORT=5000
DATABASE_URL=URL_DATABASE
DATABASE_PORT=5432
DATABASE_HOST=RUL_HOST
DATABASE_USERNAME=DATABASE_USERNAME
DATABASE_PASSWORD=DATABASE_PASSWORD
DATABASE_NAME=DATABASE_NAME
JWT_SECRET=asdasdsadasd
WEBPUBLIC=http://localhost:3001
NODE_ENV=env
```

## Levantar la aplicación

Modo desarrollo:

```bash
npm run start:dev
```

Servidor disponible en [http://localhost:3000](http://localhost:3000).

---

## Estructura del proyecto

```
src/
├── main.ts             # Entry point
├── app.module.ts       # Módulo raíz
├── modules/            # Módulos de la app
│   ├── auth/           # Autenticación y JWT
│   ├── users/          # Usuarios y roles
│   └── product         # Producto
├── constants/          # Constantes globales
├── database/           # Configuracion de conexion a base de datos y migraciones
├── shared/             # configuracion/services/controller/clases genericas/interceptores/decoradores
```

---

## Seguridad

- **JWT** para autenticación de usuarios.
- **Roles**: Control de acceso a rutas según permisos.
- Implementado usando **Guards** de NestJS: `AuthGuard`, `RolesGuard`.

Ejemplo de uso en un controlador:

```ts
  @Post('create')
  @Roles('ADMIN')
  @ApiObjResponse(Product)
  @SuccessMessage(MessageResponse.CREATE)
  createProduct(@Body() data: CreateProductDto, @Users() user: User) {
    data.userId = user.id;
    return super.create(data);
  }
```

---

## CRUD genérico

Se utilizan **clases genéricas** para:

- Crear, leer, actualizar y eliminar registros de cualquier tabla.
- Reducir código repetitivo en servicios y controladores.
- Funciona con DTOs y entidades de TypeORM.

Ejemplo de uso:

```ts
@Injectable()
export class UserService extends GenericService<User> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
}
```

Esto permite tener un **CRUD completo** sin escribir todos los métodos para cada tabla.

---

## Comandos útiles

- `npm run start` → Levanta la app compilada.
- `npm run start:dev` → Levanta la app en modo desarrollo con hot reload.
- `npm run build` → Compila para producción.

---

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
