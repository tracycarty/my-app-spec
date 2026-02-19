# Application Creation Prompt

Create a new NestJS application project according to the following requirements:

1. **Project Name:** `alcero-app`
2. **Language:** TypeScript
3. **Application Scaffold:**
   - `main.ts` to bootstrap the app
   - `app.module.ts` as the main module
   - `app.controller.ts` with a default "Hello World!" route
   - `app.service.ts` providing the `getHello()` method
4. **Port:** Application must start on port 3000
5. **Routes:** All undefined routes should return 404
6. **Dependencies:** Minimal required dependencies for NestJS; no database or extra modules
7. **Structure:** Keep project modular and ready for future expansion (REST APIs, modules, Swagger)
8. **Configuration:** Include working `package.json` and `tsconfig.json` for TypeScript/NestJS
9. **Goal:** Produce a minimal, clean NestJS application scaffold that is functional immediately after setup
