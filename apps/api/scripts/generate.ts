// @ts-nocheck
import fs from 'fs';
import path from 'path';

const moduleName = process.argv[2];

if (!moduleName) {
  console.error('Please provide a module name');
  process.exit(1);
}

const baseDir = path.join(__dirname, '../src');
const modulesDir = path.join(baseDir, 'modules', moduleName);
const routesDir = path.join(baseDir, 'routes');

// Create module directory
fs.mkdirSync(modulesDir, { recursive: true });

// Generate controller
const controllerContent = `
export default class ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Controller {
  constructor() {}
}
`.trim();

fs.writeFileSync(
  path.join(modulesDir, `${moduleName}.controller.ts`),
  controllerContent,
);

// Generate service
const serviceContent = `
export default class ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Service {
  constructor() {}
}
`.trim();

fs.writeFileSync(
  path.join(modulesDir, `${moduleName}.service.ts`),
  serviceContent,
);

// Generate routes
const routesContent = `
import { Router } from 'express';
import ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Controller from '../modules/${moduleName}/${moduleName}.controller';

const router = Router();
const ${moduleName}Controller = new ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Controller();

export default router;
`.trim();

fs.writeFileSync(
  path.join(routesDir, `${moduleName}.routes.ts`),
  routesContent,
);

// Register routes in app.ts
const appFilePath = path.join(baseDir, 'app.ts');
const appContent = fs.readFileSync(appFilePath, 'utf-8');

// Find the last route import
const lastImportIndex = appContent.lastIndexOf('import');
const insertIndex = appContent.indexOf('\n', lastImportIndex);

// Add new route import
const routeImport = `import ${moduleName}Routes from './routes/${moduleName}.routes';`;
let newContent =
  appContent.slice(0, insertIndex) +
  '\n' +
  routeImport +
  appContent.slice(insertIndex);

// Find where routes are registered
const routesIndex = newContent.indexOf('app.use');
const lastRouteIndex = newContent.lastIndexOf('app.use');
const secondLastRouteIndex = newContent.lastIndexOf(
  'app.use',
  lastRouteIndex - 1,
);
const routeEndIndex = newContent.indexOf('\n', secondLastRouteIndex);

// Add new route registration before the last route (error handler)
const routeRegistration = `\napp.use('/api/${moduleName}', ${moduleName}Routes);`;
newContent =
  newContent.slice(0, routeEndIndex) +
  routeRegistration +
  newContent.slice(routeEndIndex);

fs.writeFileSync(appFilePath, newContent);

console.log(`Generated module files for "${moduleName}"`);
