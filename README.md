# @kz-rush/site-ui

Reusable React UI components for KZ-Rush projects.

This package publishes a small set of composable primitives for React applications, with styling bundled for easy consumption in other projects.

## Features

- React 19-compatible components
- TypeScript support with exported prop types
- Bundled stylesheet export for fast integration
- Storybook setup for local component development

## Installation

Install from GitHub Packages:

```bash
npm install @kz-rush/site-ui
```

If GitHub Packages is not configured for your environment, add the registry to your npm config:

```bash
npm config set @kz-rush:registry https://npm.pkg.github.com
```

## Usage

```tsx
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Checkbox,
  CopyButton,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
  FormattedDateTime,
  FormField,
  Input,
  RushToastContainer,
  showToast,
  Spinner,
  Switch,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@kz-rush/site-ui';

import '@kz-rush/site-ui/styles.css';

export function Example() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Rush UI</CardTitle>
          <CardDescription>Reusable building blocks for product UI.</CardDescription>
          <Badge variant="success">Connected</Badge>
        </CardHeader>

        <CardContent>
          <Alert variant="info">
            <AlertTitle>Profile updated</AlertTitle>
            <AlertDescription>
              Last saved{' '}
              <FormattedDateTime value="2026-08-01T17:30:00+05:00" format="YYYY-MM-DD HH:mm" />.
            </AlertDescription>
          </Alert>

          <FormField id="email" label="Email">
            {(controlProps) => (
              <Input {...controlProps} type="email" placeholder="you@example.com" />
            )}
          </FormField>

          <FormField id="newsletter" label="Subscribe to newsletter">
            {(controlProps) => <Checkbox {...controlProps} />}
          </FormField>

          <FormField id="notifications" label="Notifications">
            {(controlProps) => <Switch {...controlProps} defaultChecked />}
          </FormField>

          <Tooltip>
            <TooltipTrigger<HTMLButtonElement>
              render={(triggerProps) => (
                <Button {...triggerProps} variant="ghost">
                  Hover me
                </Button>
              )}
            />
            <TooltipContent>Tooltip text</TooltipContent>
          </Tooltip>

          <Drawer>
            <DrawerTrigger>Open details</DrawerTrigger>
            <DrawerContent side="right">
              <DrawerTitle>Details</DrawerTitle>
              <DrawerClose>Close</DrawerClose>
            </DrawerContent>
          </Drawer>
        </CardContent>

        <CardFooter>
          <Button variant="default">Continue</Button>
          <CopyButton value="https://kz-rush.com" />
          <Button onClick={() => showToast('Settings saved.', { type: 'success' })}>
            Show notification
          </Button>
          <Spinner size="sm" />
        </CardFooter>
      </Card>

      <RushToastContainer />
    </>
  );
}
```

### Country flags

Flags are decorative by default. Add a `label` when the flag itself needs an accessible name, or use `fallback="none"` when an unsupported code should render nothing.

```tsx
import { CountryFlag } from '@kz-rush/site-ui';

<CountryFlag code="kz" />
<CountryFlag code="ca" label="Canada" />
<CountryFlag code={countryCode} fallback="none" />
```

## Layout examples

### Standalone layout

Use `StandaloneLayout` for focused pages such as authentication, error, and maintenance screens.

```tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FormField,
  Input,
  StandaloneLayout,
  StandaloneLayoutContent,
  StandaloneLayoutFooter,
  StandaloneLayoutHeader,
} from '@kz-rush/site-ui';

export function SignInPage() {
  return (
    <StandaloneLayout>
      <StandaloneLayoutHeader>KZ-Rush</StandaloneLayoutHeader>

      <StandaloneLayoutContent>
        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField id="email" label="Email">
              {(controlProps) => <Input {...controlProps} type="email" />}
            </FormField>
          </CardContent>
        </Card>
      </StandaloneLayoutContent>

      <StandaloneLayoutFooter>Copyright 2026</StandaloneLayoutFooter>
    </StandaloneLayout>
  );
}
```

### Blog layout

Use `BlogLayout` for long-form pages with optional navigation and supporting content.

```tsx
import { BlogLayout } from '@kz-rush/site-ui';

export function ArticlePage() {
  return (
    <BlogLayout
      header={<header>Site name</header>}
      navigation={
        <nav>
          <a href="#introduction">Introduction</a>
          <a href="#summary">Summary</a>
        </nav>
      }
      aside={<nav>On this page</nav>}
      footer={<footer>Copyright 2026</footer>}
      contentWidth="md"
    >
      <article>
        <h1 id="introduction">Article title</h1>
        <p>Article content goes here.</p>
        <h2 id="summary">Summary</h2>
      </article>
    </BlogLayout>
  );
}
```

### Dashboard layout

Use `DashboardLayout` for an application shell with a collapsible navigation panel. Its toggle controls must be rendered inside the layout.

```tsx
import {
  DashboardLayout,
  DashboardMobileSidebarToggle,
  DashboardSidebarToggle,
} from '@kz-rush/site-ui';

export function DashboardPage() {
  return (
    <DashboardLayout
      sidebar={
        <nav>
          <DashboardSidebarToggle />
          <a href="#overview">Overview</a>
          <a href="#records">Records</a>
        </nav>
      }
      header={
        <header>
          <DashboardMobileSidebarToggle />
          <strong>Dashboard</strong>
        </header>
      }
    >
      <h1 id="overview">Overview</h1>
      <p>Dashboard content goes here.</p>
    </DashboardLayout>
  );
}
```

### Workspace layout

Use `WorkspaceLayout` when the main workspace needs both navigation and an independently collapsible details panel.

```tsx
import {
  WorkspaceAsideToggle,
  WorkspaceLayout,
  WorkspaceMobileAsideToggle,
  WorkspaceMobileSidebarToggle,
  WorkspaceSidebarToggle,
} from '@kz-rush/site-ui';

export function WorkspacePage() {
  return (
    <WorkspaceLayout
      sidebar={
        <nav>
          <WorkspaceSidebarToggle />
          <a href="#files">Files</a>
          <a href="#activity">Activity</a>
        </nav>
      }
      aside={
        <section>
          <WorkspaceAsideToggle />
          <h2>Details</h2>
          <p>Selected item metadata.</p>
        </section>
      }
      header={
        <header>
          <WorkspaceMobileSidebarToggle />
          <strong>Workspace</strong>
          <WorkspaceMobileAsideToggle />
        </header>
      }
    >
      <h1 id="files">Files</h1>
      <p>Select an item to view its details.</p>
    </WorkspaceLayout>
  );
}
```

## Available components

- Accordion, AccordionContent, AccordionItem, AccordionTrigger
- Alert, AlertTitle, AlertDescription, AlertList
- Avatar
- Badge
- Breadcrumbs, BreadcrumbItem
- Button
- Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- Checkbox
- ConfirmDialog
- CopyButton
- CountryFlag
- DataTable, DataTableColumnVisibility, DataTableToolbar
- Description
- Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose
- Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerClose
- Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownCheckboxItem, DropdownSeparator
- EmptyState
- FormattedDateTime
- FormField
- Input
- Label
- Link
- LoadingOverlay
- NumberDiff
- PageHeader
- Pagination
- Popover, PopoverTrigger, PopoverContent, PopoverClose
- Progress
- Result
- Select
- Separator
- SidebarNavigation, SidebarNavigationGroup, SidebarNavigationItem, SidebarNavigationSeparator
- Skeleton
- Spinner
- Statistic
- Switch
- Table, TableContainer, TableHeader, TableHead, TableBody, TableRow, TableCell, TableFooter, TableCaption
- Tabs, TabsList, TabsTrigger, TabsContent
- Textarea
- Tooltip, TooltipTrigger, TooltipContent
- RushToastContainer and showToast
- BlogLayout
- DashboardLayout, DashboardSidebarToggle, and DashboardMobileSidebarToggle
- StandaloneLayout, StandaloneLayoutHeader, StandaloneLayoutContent, and StandaloneLayoutFooter
- WorkspaceLayout, WorkspaceAsideToggle, WorkspaceSidebarToggle, WorkspaceMobileAsideToggle, and WorkspaceMobileSidebarToggle

## Styling

Import the package stylesheet once in your app entrypoint:

```ts
import '@kz-rush/site-ui/styles.css';
```

## Development

### Scripts

- `npm run dev` - start the Vite development server
- `npm run build` - type-check and build the library
- `npm run typecheck` - run TypeScript checks
- `npm run test` - run the Vitest test suite
- `npm run test:unit` - run unit tests
- `npm run test:storybook` - run Storybook interaction tests
- `npm run test:all` - run all Vitest projects
- `npm run storybook` - start Storybook on port 6006
- `npm run build-storybook` - build a static Storybook site
- `npm run lint` - run JavaScript/TypeScript and SCSS linters
- `npm run format:check` - verify Prettier formatting
- `npm run check` - run linters, formatting checks, and unit tests

### Local workflow

Use the Node.js version declared in `.nvmrc` before installing dependencies:

```bash
nvm use
npm ci
npm run build
npm run test
```

After updating dependencies, regenerate and validate the lockfile with the same toolchain:

```bash
npm update
npm install --package-lock-only
npm ci --dry-run
```

## Release workflow

Releases are published to GitHub Packages by [`.github/workflows/release.yml`](.github/workflows/release.yml). The workflow is started manually from GitHub Actions after a release pull request has been merged into `main`.

Prepare the release on a branch with a clean working tree. The helper updates `package.json` and `package-lock.json` and creates the release commit; it intentionally refuses to run directly on `main`.

```bash
git switch -c release/0.18.0
npm run prepare-release -- 0.18.0
git push -u origin release/0.18.0
```

Open and merge the pull request into `main`, then go to **GitHub → Actions → Release package → Run workflow**, select `main`, and enter the same version without the `v` prefix (for example, `0.18.0`).

The workflow verifies that it is running from `main` and that the requested version matches `package.json`. It then installs dependencies, runs formatting and lint checks, executes unit and Storybook tests, builds the package, verifies its contents with `npm pack --dry-run`, creates the annotated `vMAJOR.MINOR.PATCH` tag, and publishes using the workflow-scoped `GITHUB_TOKEN`. Do not create or push the release tag manually.

## Security

Do not commit credentials, access tokens, private keys, or local `.env` files. Environment files are ignored by Git, except for intentionally committed `.env.example` templates.

Please report suspected vulnerabilities privately as described in [`SECURITY.md`](SECURITY.md). Do not include sensitive vulnerability details in a public issue.

## AI-assisted development

This project uses AI-assisted development tools for tasks such as implementation, refactoring, documentation, testing, and code review. AI-generated or AI-suggested changes are reviewed and validated before they are accepted. The maintainers remain responsible for the code, releases, security decisions, and licensing compliance.

## Peer dependencies

- `react` `^19.0.0`
- `react-dom` `^19.0.0`
- `moment` `^2.30.0`
- `react-toastify` `^11.0.0`

## License

MIT
