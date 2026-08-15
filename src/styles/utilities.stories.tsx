import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

import './utilities.stories.scss';

const spacingValues = [
  { name: 0, value: '0' },
  { name: 1, value: '0.25rem' },
  { name: 2, value: '0.5rem' },
  { name: 3, value: '0.75rem' },
  { name: 4, value: '1rem' },
  { name: 5, value: '1.25rem' },
  { name: 6, value: '1.5rem' },
  { name: 8, value: '2rem' },
  { name: 10, value: '2.5rem' },
  { name: 12, value: '3rem' },
  { name: 16, value: '4rem' },
] as const;

const meta = {
  title: 'Utilities',
  tags: [
    'autodocs',
  ],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

interface SectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

function Section({ title, description, children }: SectionProps) {
  return (
    <section className="utilities-story__section">
      <div>
        <h2 className="utilities-story__heading">{title}</h2>

        {description != null && <p className="utilities-story__description">{description}</p>}
      </div>

      {children}
    </section>
  );
}

interface ExampleProps {
  label: string;
  children: ReactNode;
}

function Example({ label, children }: ExampleProps) {
  return (
    <div className="utilities-story__example">
      <code className="utilities-story__label">{label}</code>

      {children}
    </div>
  );
}

function Box({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`utilities-story__box ${className ?? ''}`}>{children}</div>;
}

export const SpacingScale: Story = {
  render: () => (
    <div className="utilities-story">
      <Section
        title="Spacing scale"
        description="Shared spacing tokens used by utility classes and components."
      >
        <table className="utilities-story__spacing-table">
          <thead>
            <tr>
              <th>Scale</th>
              <th>Token</th>
              <th>Value</th>
              <th>Preview</th>
            </tr>
          </thead>

          <tbody>
            {spacingValues.map(({ name, value }) => (
              <tr key={name}>
                <td>{name}</td>

                <td>
                  <code>--rush-spacing-{name}</code>
                </td>

                <td>
                  <code>{value}</code>
                </td>

                <td>
                  <div
                    className="utilities-story__spacing-preview"
                    style={{
                      width: `var(--rush-spacing-${name})`,
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  ),
};

export const Padding: Story = {
  render: () => (
    <div className="utilities-story">
      <Section title="Padding" description="Padding utilities use the shared spacing scale.">
        <div className="utilities-story__examples">
          {spacingValues.map(({ name }) => (
            <Example key={name} label={`rush-p-${name}`}>
              <div className={`utilities-story__demo rush-p-${name}`}>
                <div className="utilities-story__content">Content</div>
              </div>
            </Example>
          ))}
        </div>
      </Section>

      <Section title="Inline padding">
        <div className="utilities-story__examples">
          {spacingValues.map(({ name }) => (
            <Example key={name} label={`rush-px-${name}`}>
              <div className={`utilities-story__demo rush-px-${name}`}>
                <div className="utilities-story__content">Content</div>
              </div>
            </Example>
          ))}
        </div>
      </Section>

      <Section title="Block padding">
        <div className="utilities-story__examples">
          {spacingValues.map(({ name }) => (
            <Example key={name} label={`rush-py-${name}`}>
              <div className={`utilities-story__demo rush-py-${name}`}>
                <div className="utilities-story__content">Content</div>
              </div>
            </Example>
          ))}
        </div>
      </Section>
    </div>
  ),
};

export const Margin: Story = {
  render: () => (
    <div className="utilities-story">
      <Section
        title="Margin"
        description="The surrounding border makes the applied margin visible."
      >
        <div className="utilities-story__examples">
          {spacingValues.map(({ name }) => (
            <Example key={name} label={`rush-m-${name}`}>
              <div className="utilities-story__logical-example">
                <Box className={`rush-m-${name}`}>Content</Box>
              </div>
            </Example>
          ))}
        </div>
      </Section>
    </div>
  ),
};

export const Gap: Story = {
  render: () => (
    <div className="utilities-story">
      <Section title="Gap" description="Gap works with flex and grid containers.">
        <div className="utilities-story__examples">
          {spacingValues.map(({ name }) => (
            <Example key={name} label={`rush-gap-${name}`}>
              <div className={`rush-flex rush-flex-wrap rush-gap-${name}`}>
                <Box>A</Box>
                <Box>B</Box>
                <Box>C</Box>
              </div>
            </Example>
          ))}
        </div>
      </Section>
    </div>
  ),
};

export const Display: Story = {
  render: () => (
    <div className="utilities-story">
      <Section title="Display">
        <div className="utilities-story__examples">
          <Example label="rush-block">
            <Box className="rush-block">Block</Box>
          </Example>

          <Example label="rush-inline-block">
            <div>
              <Box className="rush-inline-block">A</Box> <Box className="rush-inline-block">B</Box>
            </div>
          </Example>

          <Example label="rush-flex">
            <div className="rush-flex rush-gap-2">
              <Box>A</Box>
              <Box>B</Box>
              <Box>C</Box>
            </div>
          </Example>

          <Example label="rush-grid">
            <div className="rush-grid rush-gap-2">
              <Box>A</Box>
              <Box>B</Box>
              <Box>C</Box>
            </div>
          </Example>
        </div>
      </Section>
    </div>
  ),
};

export const Flex: Story = {
  render: () => (
    <div className="utilities-story">
      <Section title="Flex direction">
        <Example label="rush-flex rush-flex-row">
          <div className="rush-flex rush-flex-row rush-gap-2">
            <Box>A</Box>
            <Box>B</Box>
            <Box>C</Box>
          </div>
        </Example>

        <Example label="rush-flex rush-flex-col">
          <div className="rush-flex rush-flex-col rush-gap-2">
            <Box>A</Box>
            <Box>B</Box>
            <Box>C</Box>
          </div>
        </Example>
      </Section>

      <Section title="Grow">
        <Example label="rush-grow">
          <div className="rush-flex rush-gap-2">
            <Box>Fixed</Box>
            <Box className="rush-grow">Grow</Box>
            <Box>Fixed</Box>
          </div>
        </Example>
      </Section>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="utilities-story">
      <Section title="Align items">
        <div className="utilities-story__examples">
          {(['start', 'center', 'end', 'stretch'] as const).map((alignment) => (
            <Example key={alignment} label={`rush-items-${alignment}`}>
              <div
                className={`utilities-story__alignment-area rush-flex rush-items-${alignment} rush-gap-2`}
              >
                <Box>A</Box>
                <Box className="rush-py-6">B</Box>
                <Box>C</Box>
              </div>
            </Example>
          ))}
        </div>
      </Section>

      <Section title="Justify content">
        <div className="utilities-story__examples">
          {(['start', 'center', 'end', 'between'] as const).map((alignment) => (
            <Example key={alignment} label={`rush-justify-${alignment}`}>
              <div
                className={`utilities-story__alignment-area rush-flex rush-items-center rush-justify-${alignment} rush-gap-2`}
              >
                <Box>A</Box>
                <Box>B</Box>
                <Box>C</Box>
              </div>
            </Example>
          ))}
        </div>
      </Section>
    </div>
  ),
};

export const Sizing: Story = {
  render: () => (
    <div className="utilities-story">
      <Section title="Width">
        <Example label="rush-w-full">
          <div className="utilities-story__sizing-area">
            <Box className="rush-w-full">100% width</Box>
          </div>
        </Example>
      </Section>

      <Section
        title="Minimum size"
        description="min-width: 0 and min-height: 0 are useful for overflow handling in flex and grid layouts."
      >
        <Example label="rush-min-w-0">
          <div className="rush-flex">
            <Box className="rush-grow rush-min-w-0">Flexible content</Box>
          </div>
        </Example>
      </Section>
    </div>
  ),
};

export const LogicalSpacing: Story = {
  render: () => (
    <div className="utilities-story">
      <Section
        title="Logical spacing"
        description="Start and end utilities follow the document writing direction instead of assuming left and right."
      >
        <Example label="rush-ms-6">
          <div className="utilities-story__logical-grid">
            <div dir="ltr" className="utilities-story__logical-example">
              <div className="utilities-story__logical-title">LTR — inline start is left</div>

              <Box className="rush-ms-6">rush-ms-6</Box>
            </div>

            <div dir="rtl" className="utilities-story__logical-example">
              <div className="utilities-story__logical-title">RTL — inline start is right</div>

              <Box className="rush-ms-6">rush-ms-6</Box>
            </div>
          </div>
        </Example>

        <Example label="rush-me-6">
          <div className="utilities-story__logical-grid">
            <div dir="ltr" className="utilities-story__logical-example">
              <div className="utilities-story__logical-title">LTR — inline end is right</div>

              <Box className="rush-me-6">rush-me-6</Box>
            </div>

            <div dir="rtl" className="utilities-story__logical-example">
              <div className="utilities-story__logical-title">RTL — inline end is left</div>

              <Box className="rush-me-6">rush-me-6</Box>
            </div>
          </div>
        </Example>
      </Section>
    </div>
  ),
};
