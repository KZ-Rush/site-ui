# @kz-rush/site-ui

Reusable React UI components for KZ-Rush projects.

## Features

- Typed React 19 components
- Lightweight, composable primitives
- Bundled stylesheet export for fast integration
- Storybook setup for local component development

## Installation

Install from GitHub Packages:

```bash
npm install @kz-rush/site-ui
```

If your environment is not already configured for GitHub Packages, add this to your `.npmrc`:

```ini
@kz-rush:registry=https://npm.pkg.github.com
```

## Usage

```tsx
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
	Checkbox,
	CopyButton,
	Label,
} from '@kz-rush/site-ui';

import '@kz-rush/site-ui/styles.css';

export function Example() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Rush Card</CardTitle>
				<CardDescription>Reusable UI building block</CardDescription>
			</CardHeader>

			<CardContent>
				<Label htmlFor="newsletter">Newsletter</Label>
				<Checkbox id="newsletter">Subscribe me</Checkbox>
			</CardContent>

			<CardFooter>
				<CopyButton value="https://kz-rush.com" />
			</CardFooter>
		</Card>
	);
}
```

## Exported API

### Components

- `Card`
- `CardHeader`
- `CardTitle`
- `CardDescription`
- `CardContent`
- `CardFooter`
- `Checkbox`
- `CopyButton`
- `Label`

### Type exports

- `CardProps`
- `CardHeaderProps`
- `CardTitleProps`
- `CardDescriptionProps`
- `CardContentProps`
- `CardFooterProps`
- `CheckboxProps`
- `CopyButtonProps`
- `LabelProps`

## Styling

The package exports a stylesheet at:

- `@kz-rush/site-ui/styles.css`

This maps to the built CSS bundle generated during library build.

## Development

### Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - type-check and build library
- `npm run typecheck` - run TypeScript checks
- `npm run storybook` - start Storybook on port 6006
- `npm run build-storybook` - build static Storybook

### Local workflow

```bash
npm install
npm run build
```

## Peer dependencies

- `react` `^19.0.0`
- `react-dom` `^19.0.0`

## Notes

- The package is published as ESM.
- CSS files are marked as side effects to avoid accidental style tree-shaking.

## License

MIT
