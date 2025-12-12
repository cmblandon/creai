# Prueba Técnica Creai - Playwright Automation

Proyecto de automatización de pruebas E2E para el sitio web [creai.mx](https://www.creai.mx) utilizando Playwright y TypeScript, siguiendo el patrón Page Object Model (POM) y principios SOLID.

![Playwright Tests](https://img.shields.io/badge/Playwright-1.57.0-45ba4b?logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)
![Node](https://img.shields.io/badge/Node-18+-339933?logo=node.js)

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Ejecución de Pruebas](#-ejecución-de-pruebas)
- [Configuración](#-configuración)
- [Arquitectura](#-arquitectura)
- [Pruebas Implementadas](#-pruebas-implementadas)
- [CI/CD](#-cicd)

## ✨ Características

- ✅ **Page Object Model (POM)**: Arquitectura modular y mantenible
- ✅ **SOLID Principles**: Código limpio y escalable
- ✅ **TypeScript**: Tipado estático para mayor robustez
- ✅ **Multi-browser**: Soporte para Chromium, Firefox, WebKit
- ✅ **Multi-device**: Pruebas en desktop y mobile (Pixel 5, iPhone 14)
- ✅ **CI/CD Ready**: Integración con GitHub Actions
- ✅ **Reportes HTML**: Reportes detallados de ejecución
- ✅ **Selectores Semánticos**: Uso de `getByRole` para accesibilidad

## 📦 Requisitos Previos

- **Node.js**: v18 o superior
- **npm**: v9 o superior
- **Sistema Operativo**: macOS, Windows, o Linux

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd prueba-tecnica-creai
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Instalar navegadores de Playwright**
   ```bash
   npx playwright install
   ```

## 📁 Estructura del Proyecto

```
prueba-tecnica-creai/
├── pages/                          # Page Objects
│   ├── components/                 # Componentes reutilizables
│   │   └── Header.ts              # Componente de navegación
│   ├── selectors/                  # Selectores CSS organizados
│   │   ├── HeaderSelectors.ts
│   │   └── HomePageSelectors.ts
│   ├── BasePage.ts                # Clase base abstracta
│   └── HomePage.ts                # Page Object de la página principal
├── tests/
│   └── specs/
│       └── smoke.spec.ts          # Suite de pruebas smoke
├── .github/
│   └── workflows/
│       └── playwright.yml         # Pipeline CI/CD
├── playwright.config.ts           # Configuración de Playwright
├── package.json
└── README.md
```

## 🧪 Ejecución de Pruebas

### Ejecutar todas las pruebas

```bash
npx playwright test
```

### Ejecutar en un navegador específico

```bash
# Chromium (maximizado)
npx playwright test --project=chromium

# Mobile Chrome (Pixel 5)
npx playwright test --project="Mobile Chrome"

# iPhone 14
npx playwright test --project="iPhone 14"
```

### Ejecutar una prueba específica

```bash
npx playwright test tests/specs/smoke.spec.ts
```

### Ejecutar con filtro por nombre

```bash
npx playwright test --grep "should navigate correctly"
```

### Ver reporte HTML

```bash
npx playwright show-report
```

### Modo debug

```bash
npx playwright test --debug
```

### Modo UI (interactivo)

```bash
npx playwright test --ui
```

## ⚙️ Configuración

### Variables de Entorno

Puedes configurar la URL base mediante variable de entorno:

```bash
BASE_URL=https://www.creai.mx npx playwright test
```

### Configuración de Proyectos

El archivo `playwright.config.ts` define los siguientes proyectos:

| Proyecto | Descripción | Viewport |
|----------|-------------|----------|
| `chromium` | Desktop Chrome maximizado | Ventana completa |
| `Mobile Chrome` | Pixel 5 | 393x851 |
| `iPhone 14` | iPhone 14 Pro Max | 430x932 |

## 🏗️ Arquitectura

### Page Object Model (POM)

El proyecto sigue el patrón POM con las siguientes capas:

#### 1. **BasePage** (Clase Abstracta)
- Responsabilidad única: Funcionalidad común a todas las páginas
- Manejo de navegación
- Manejo de cookie consent modal
- Métodos de espera y utilidades

#### 2. **Page Objects** (HomePage, etc.)
- Encapsulan elementos y acciones de páginas específicas
- Heredan de `BasePage`
- Exponen métodos de alto nivel para las pruebas

#### 3. **Components** (Header, Footer, etc.)
- Componentes reutilizables de la UI
- Independientes y modulares
- Pueden ser usados por múltiples Page Objects

#### 4. **Selectors**
- Selectores CSS organizados por componente/página
- Separación de concerns
- Fácil mantenimiento

### Principios SOLID Aplicados

- **S**ingle Responsibility: Cada clase tiene una responsabilidad única
- **O**pen/Closed: Extensible mediante herencia sin modificar código existente
- **L**iskov Substitution: Las clases derivadas pueden sustituir a sus clases base
- **I**nterface Segregation: Interfaces específicas y cohesivas
- **D**ependency Inversion: Dependencia de abstracciones (BasePage)

### Ejemplo de Uso

```typescript
import { HomePage } from '../pages/HomePage';

test('ejemplo de navegación', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  
  // Usar componente Header
  await homePage.header.clickMenuItem('Success stories');
  
  // Verificar navegación
  expect(page.url()).toContain('success-stories');
});
```

## 📝 Pruebas Implementadas

### Smoke Tests (`smoke.spec.ts`)

| Test | Descripción | Validaciones |
|------|-------------|--------------|
| **should load the page successfully** | Verifica carga correcta de la página | ✓ URL contiene 'creai.mx'<br>✓ Sin errores de consola |
| **should display key elements** | Valida elementos clave visibles | ✓ Logo visible<br>✓ Botón CTA visible<br>✓ Menú de navegación visible<br>✓ Sección de clientes visible<br>✓ Success stories visible |
| **should navigate correctly via menu** | Prueba navegación por menú | ✓ Click en "Success stories"<br>✓ URL cambia correctamente |
| **should display key elements on mobile** | Valida elementos en mobile | ✓ Logo visible en mobile |

## 🔄 CI/CD

El proyecto incluye un workflow de GitHub Actions (`.github/workflows/playwright.yml`) que:

1. ✅ Se ejecuta en cada push y pull request
2. ✅ Instala dependencias y navegadores
3. ✅ Ejecuta todas las pruebas
4. ✅ Genera reportes HTML
5. ✅ Sube reportes como artifacts (disponibles por 30 días)

### Ver Reportes en CI

Después de cada ejecución en GitHub Actions:
1. Ve a la pestaña **Actions**
2. Selecciona el workflow run
3. Descarga el artifact **playwright-report**
4. Extrae y abre `index.html`

## 🛠️ Herramientas y Tecnologías

- **Playwright** v1.57.0 - Framework de automatización
- **TypeScript** v5.x - Lenguaje de programación
- **Node.js** v18+ - Runtime
- **GitHub Actions** - CI/CD

## 📚 Recursos Adicionales

- [Documentación de Playwright](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 👤 Autor

Cristian Blandón

## 📄 Licencia

ISC