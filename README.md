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
  Label,
  FormField,
  RushToastContainer,
  showToast,
  Switch,
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
              Last saved <FormattedDateTime value="2026-08-01T17:30:00+05:00" format="YYYY-MM-DD HH:mm" />.
            </AlertDescription>
          </Alert>

          <FormField>
            <Label htmlFor="newsletter">Email</Label>
            <Checkbox id="newsletter">Subscribe me</Checkbox>
          </FormField>

          <FormField>
            <Label htmlFor="notifications">Notifications</Label>
            <Switch id="notifications" defaultChecked />
          </FormField>

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
        </CardFooter>
      </Card>

      <RushToastContainer />
    </>
  );
}
```

## Available components

- Alert, AlertTitle, AlertDescription, AlertList
- Badge
- Button
- Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- Checkbox
- CopyButton
- Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerClose
- FormattedDateTime
- FormField
- Label
- NumberDiff
- Progress
- Switch
- RushToastContainer and showToast
- BlogLayout
- DashboardLayout and DashboardSidebarToggle
- WorkspaceLayout, WorkspaceAsideToggle, and WorkspaceSidebarToggle

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
- `npm run storybook` - start Storybook on port 6006
- `npm run build-storybook` - build a static Storybook site

### Local workflow

```bash
npm install
npm run build
npm run test
```

## Release workflow

Releases are published to GitHub Packages by [`.github/workflows/publish.yml`](.github/workflows/publish.yml). The workflow starts when a tag matching `vMAJOR.MINOR.PATCH` is pushed.

Before creating the tag, update the version in `package.json` and ensure the changes are merged to the release commit. The tag version must exactly match the package version; for example, version `0.2.0` requires tag `v0.2.0`.

```bash
npm version 0.2.0 --no-git-tag-version
git add package.json package-lock.json
git commit -m "chore: release v0.2.0"
git tag v0.2.0
git push origin main --follow-tags
```

The workflow installs dependencies, verifies the tag and package versions match, runs unit and Storybook tests, builds the package, verifies its contents with `npm pack --dry-run`, and publishes using `GITHUB_TOKEN`.

## Peer dependencies

- `react` `^19.0.0`
- `react-dom` `^19.0.0`
- `moment` `^2.30.0`
- `react-toastify` `^11.0.0`

## License

MIT
