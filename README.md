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
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Checkbox,
  CopyButton,
  Label,
  FormField,
} from '@kz-rush/site-ui';

import '@kz-rush/site-ui/styles.css';

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rush UI</CardTitle>
        <CardDescription>Reusable building blocks for product UI.</CardDescription>
      </CardHeader>

      <CardContent>
        <FormField>
          <Label htmlFor="newsletter">Email</Label>
          <Checkbox id="newsletter">Subscribe me</Checkbox>
        </FormField>
      </CardContent>

      <CardFooter>
        <Button variant="default">Continue</Button>
        <CopyButton value="https://kz-rush.com" />
      </CardFooter>
    </Card>
  );
}
```

## Available components

- Button
- Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- Checkbox
- CopyButton
- FormField
- Label
- NumberDiff
- Progress

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

## Peer dependencies

- `react` `^19.0.0`
- `react-dom` `^19.0.0`

## License

MIT
