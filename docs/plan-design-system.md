# Bookmark Manager — Design System Plan

## Stack actual
- **Framework**: Angular 21.2 (standalone components, signals)
- **Estilos**: Tailwind CSS 4.x con PostCSS
- **Testing**: Vitest + jsdom
- **Lenguaje**: TypeScript 5.9
- **Build**: @angular/build (esbuild)

---

## Sistema de Diseño Personalizado

### 1. Design Tokens (`src/styles/`)

Tokens definidos como CSS custom properties dentro de bloques `@theme` de Tailwind 4,
distribuidos en archivos separados e importados desde `styles.css`.

```
src/styles/
├── tokens/
│   ├── colors.css       ← paleta completa + colores semánticos
│   ├── typography.css   ← familia Manrope, pesos, text-presets
│   ├── spacing.css      ← escala de espaciado (025–1800)
│   ├── radii.css        ← border-radius (radius-4 a radius-full)
│   └── shadows.css      ← box-shadow (sm / md / lg / card)
└── base.css             ← reset + surface tokens semánticos + clases .text-preset-*
```

**Patrón en `styles.css`**:
```css
@import 'tailwindcss';
@import './styles/tokens/colors.css';
/* ... resto de tokens ... */
@import './styles/base.css';
```

---

### 2. Paleta de Colores

#### Neutral (Light mode)
| Token | Valor |
|---|---|
| `--color-neutral-900` | `#051513` |
| `--color-neutral-800` | `#4C5C59` |
| `--color-neutral-500` | `#899492` |
| `--color-neutral-400` | `#C0CFCC` |
| `--color-neutral-300` | `#DDE9E7` |
| `--color-neutral-100` | `#E8F0EF` |
| `--color-neutral-0`   | `#FFFFFF` |

#### Neutral (Dark mode)
| Token | Valor |
|---|---|
| `--color-neutral-dark-900` | `#001414` |
| `--color-neutral-dark-800` | `#001F1F` |
| `--color-neutral-dark-600` | `#002E2D` |
| `--color-neutral-dark-500` | `#004241` |
| `--color-neutral-dark-400` | `#004746` |
| `--color-neutral-dark-300` | `#00706E` |
| `--color-neutral-dark-100` | `#B1B9B9` |

#### Teal (acción principal)
| Token | Valor |
|---|---|
| `--color-teal-700` | `#014745` |
| `--color-teal-800` | `#013C3B` |

#### Red (destructiva)
| Token | Valor |
|---|---|
| `--color-red-600` | `#FD4740` |
| `--color-red-800` | `#CB0A04` |

#### Semánticos (en `@theme`)
```css
--color-primary:       #014745   /* teal-700 */
--color-primary-hover: #013C3B   /* teal-800 */
--color-danger:        #FD4740   /* red-600 */
--color-danger-hover:  #CB0A04   /* red-800 */
```

#### Surface tokens (en `:root`, reactivos a dark mode — en `base.css`)
```css
--surface-bg        → neutral-0 / dark-neutral-900
--surface-raised    → neutral-100 / dark-neutral-800
--surface-overlay   → neutral-300 / dark-neutral-600
--surface-sidebar   → neutral-100 / dark-neutral-800
--text-primary      → neutral-900 / neutral-0
--text-secondary    → neutral-800 / dark-neutral-100
--text-tertiary     → neutral-500 / dark-neutral-300
--border-default    → neutral-300 / dark-neutral-500
--border-subtle     → neutral-100 / dark-neutral-600
```

---

### 3. Tipografía

**Familia**: `Manrope` (Google Fonts) — pesos 500, 600, 700  
Cargada en `index.html` con `preconnect` y `display=swap`.

**Nota**: El reto usa Manrope, no Rubik.

#### Pesos
| Token | Valor |
|---|---|
| `--font-weight-medium`   | `500` |
| `--font-weight-semibold` | `600` |
| `--font-weight-bold`     | `700` |

#### Text Presets
Los presets combinan tamaño + line-height + peso. Disponibles como **clases utilitarias**
definidas en `@layer utilities` dentro de `base.css`:

| Clase | Tamaño | Line Height | Peso |
|---|---|---|---|
| `.text-preset-1`         | 24px | 140% | Bold |
| `.text-preset-2`         | 20px | 120% | Bold |
| `.text-preset-2-semibold`| 20px | 120% | SemiBold |
| `.text-preset-3`         | 16px | 140% | SemiBold |
| `.text-preset-3-medium`  | 16px | 130% | Medium |
| `.text-preset-4`         | 14px | 140% | SemiBold |
| `.text-preset-4-medium`  | 14px | 150% | Medium |
| `.text-preset-5`         | 12px | 140% | Medium |

Tokens en `@theme` (para texto primitivo de Tailwind):
```css
--text-preset-1: 1.5rem;   --text-preset-1--line-height: 1.4;
--text-preset-2: 1.25rem;  --text-preset-2--line-height: 1.2;
--text-preset-3: 1rem;     --text-preset-3--line-height: 1.4;
--text-preset-4: 0.875rem; --text-preset-4--line-height: 1.4;
--text-preset-5: 0.75rem;  --text-preset-5--line-height: 1.4;
```

---

### 4. Espaciado

Escala custom definida como `--spacing-*` en `@theme` (genera utilidades de Tailwind):

| Token | px |
|---|---|
| `--spacing-025`  | 2px   |
| `--spacing-050`  | 4px   |
| `--spacing-075`  | 6px   |
| `--spacing-100`  | 8px   |
| `--spacing-125`  | 10px  |
| `--spacing-150`  | 12px  |
| `--spacing-200`  | 16px  |
| `--spacing-250`  | 20px  |
| `--spacing-300`  | 24px  |
| `--spacing-400`  | 32px  |
| `--spacing-500`  | 40px  |
| `--spacing-600`  | 48px  |
| `--spacing-800`  | 64px  |
| `--spacing-1000` | 80px  |
| `--spacing-1200` | 96px  |
| `--spacing-1400` | 112px |
| `--spacing-1600` | 128px |
| `--spacing-1800` | 140px |

Uso en templates: `p-100`, `gap-200`, `mt-300`, etc.

---

### 5. Border Radius

| Token | px |
|---|---|
| `--radius-0`    | 0px   |
| `--radius-4`    | 4px   |
| `--radius-6`    | 6px   |
| `--radius-8`    | 8px   |
| `--radius-10`   | 10px  |
| `--radius-12`   | 12px  |
| `--radius-16`   | 16px  |
| `--radius-20`   | 20px  |
| `--radius-24`   | 24px  |
| `--radius-full` | 999px |

Uso en templates: `rounded-8`, `rounded-16`, `rounded-full`, etc.

---

### 6. Sombras

| Token | Descripción |
|---|---|
| `--shadow-sm`   | Sutil, para elementos inline |
| `--shadow-md`   | Dropdowns, tooltips |
| `--shadow-lg`   | Modales |
| `--shadow-card` | Tarjetas de bookmark |

---

### 7. Arquitectura de Carpetas

```
src/
├── styles/
│   ├── tokens/          ← design tokens (cada uno con @theme {})
│   └── base.css         ← reset + surface vars + .text-preset-*
├── app/
│   ├── core/
│   │   ├── models/      ← interfaces TypeScript (Bookmark, Tag, etc.)
│   │   └── services/    ← BookmarkService, TagService
│   ├── shared/
│   │   └── ui/          ← biblioteca de componentes atómicos
│   │       ├── button/
│   │       ├── input/
│   │       ├── badge/
│   │       ├── card/
│   │       ├── modal/
│   │       └── empty-state/
│   └── features/
│       ├── bookmarks/   ← lista + detalle
│       └── tags/        ← gestión de etiquetas
```

---

### 8. Componentes UI (Atomic Design)

#### Átomos
| Componente | Selector | Variantes |
|---|---|---|
| Button | `app-button` | `primary`, `ghost`, `danger` + sizes `sm/md/lg` |
| Input | `app-input` | con label, error state, icono |
| Badge | `app-badge` | colores dinámicos por tag |
| Icon | `app-icon` | wrapper SVG con tamaño controlado |

#### Moléculas
| Componente | Selector | Descripción |
|---|---|---|
| SearchBar | `app-search-bar` | Input + icono lupa + clear |
| TagPicker | `app-tag-picker` | Multi-select de badges |
| ConfirmDialog | `app-confirm-dialog` | Modal para confirmar destructivas |

#### Organismos
| Componente | Selector | Descripción |
|---|---|---|
| BookmarkCard | `app-bookmark-card` | Tarjeta con favicon, título, URL, tags |
| BookmarkForm | `app-bookmark-form` | Form para crear/editar bookmark |
| Sidebar | `app-sidebar` | Navegación + filtros por tag |
| BookmarkGrid | `app-bookmark-grid` | Grid responsivo de cards |
| EmptyState | `app-empty-state` | Ilustración + CTA cuando no hay resultados |

---

### 9. Patrones Técnicos de Angular

- **Standalone components** en todos los componentes del design system
- **Signals** (`input()`, `output()`, `computed()`) para todas las props reactivas — no `@Input`/`@Output` decorators
- **`@for` y `@if`** (nueva sintaxis de control flow, no `*ngFor`/`*ngIf`)
- **`inject()`** en lugar de constructor injection
- **`ChangeDetectionStrategy.OnPush`** en todos los componentes del design system
- **CSS encapsulado** con `:host` + clases utilitarias de Tailwind dentro del template
- **Tokens semánticos** (`--surface-*`, `--text-*`) en CSS del componente; nunca valores hardcodeados

#### Patrón de variantes con `input()`

```ts
type ButtonVariant = 'primary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  disabled = input(false);

  protected classes = computed(() => ({
    'btn-primary': this.variant() === 'primary',
    'btn-ghost': this.variant() === 'ghost',
    'btn-danger': this.variant() === 'danger',
    'btn-sm': this.size() === 'sm',
    'btn-lg': this.size() === 'lg',
  }));
}
```

---

### 10. Modelos de Datos

```ts
// core/models/bookmark.model.ts
export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description?: string;
  tags: Tag[];
  favicon?: string;
  createdAt: Date;
}

// core/models/tag.model.ts
export interface Tag {
  id: string;
  name: string;
  color: string;  // hex para badge
}
```

---

### 11. Convenciones de Estilo

- Clases utilitarias de Tailwind en el **template HTML**, no en el CSS del componente
- CSS del componente solo para estilos que Tailwind no puede expresar (animaciones, `:host`)
- Tokens globales siempre via CSS custom properties, nunca valores hardcodeados
- Surface/text tokens semánticos (sin modo) en CSS de componente para dark mode automático
- Sin comentarios en el código salvo para lógica no obvia

---

### 12. Orden de Implementación

1. [x] Configurar design tokens en `src/styles/` con valores reales del reto
2. [x] Actualizar `index.html` con Manrope (Google Fonts, pesos 500/600/700)
3. [ ] Limpiar el placeholder del `app.html`
4. [ ] Definir modelos TypeScript en `core/models/`
5. [ ] Implementar `BookmarkService` con estado vía signals
6. [ ] Construir átomos: Button, Input, Badge
7. [ ] Construir moléculas: SearchBar, TagPicker
8. [ ] Construir organismos: BookmarkCard, Sidebar
9. [ ] Ensamblar feature `bookmarks/` con routing
10. [ ] Añadir persistencia (localStorage)
11. [ ] Responsivo mobile-first y pulido visual
