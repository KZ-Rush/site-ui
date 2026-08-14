import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../../components/button';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/card';

import { EmptyState } from '../../components/empty-state';

import { FormField } from '../../components/form-field';

import { Input } from '../../components/input';

import {
  StandaloneLayout,
  StandaloneLayoutContent,
  StandaloneLayoutFooter,
  StandaloneLayoutHeader,
} from './standalone-layout';

const meta = {
  title: 'Layouts/StandaloneLayout',
  component: StandaloneLayout,

  tags: ['autodocs'],

  parameters: {
    layout: 'fullscreen',
  },

  args: {
    children: null,
  },

  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof StandaloneLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <StandaloneLayout>
      <StandaloneLayoutHeader>
        <div
          style={{
            fontWeight: 700,
          }}
        >
          KZ-Rush
        </div>
      </StandaloneLayoutHeader>

      <StandaloneLayoutContent>
        <div>Standalone content</div>
      </StandaloneLayoutContent>

      <StandaloneLayoutFooter>
        <div
          style={{
            fontSize: '0.875rem',
            color: 'var(--rush-color-muted-foreground)',
          }}
        >
          © KZ-Rush
        </div>
      </StandaloneLayoutFooter>
    </StandaloneLayout>
  ),
};

export const Authentication: Story = {
  render: () => (
    <StandaloneLayout>
      <StandaloneLayoutHeader>
        <div
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
          }}
        >
          KZ-Rush
        </div>
      </StandaloneLayoutHeader>

      <StandaloneLayoutContent>
        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>

            <CardDescription>Sign in with your KZ-Rush account to continue.</CardDescription>
          </CardHeader>

          <CardContent>
            <form
              style={{
                display: 'grid',
                gap: '1rem',
              }}
            >
              <FormField id="standalone-auth-email" label="Email">
                {(controlProps) => (
                  <Input {...controlProps} type="email" placeholder="you@example.com" />
                )}
              </FormField>

              <FormField id="standalone-auth-password" label="Password">
                {(controlProps) => <Input {...controlProps} type="password" />}
              </FormField>

              <Button type="submit">Sign in</Button>
            </form>
          </CardContent>

          <CardFooter>
            <span
              style={{
                fontSize: '0.875rem',
                color: 'var(--rush-color-muted-foreground)',
              }}
            >
              Forgot your password?
            </span>
          </CardFooter>
        </Card>
      </StandaloneLayoutContent>

      <StandaloneLayoutFooter>
        <div
          style={{
            fontSize: '0.875rem',
            color: 'var(--rush-color-muted-foreground)',
          }}
        >
          © KZ-Rush
        </div>
      </StandaloneLayoutFooter>
    </StandaloneLayout>
  ),
};

export const Error404: Story = {
  render: () => (
    <StandaloneLayout>
      <StandaloneLayoutContent>
        <EmptyState title="404" description="The requested page could not be found.">
          <Button>Go back</Button>
        </EmptyState>
      </StandaloneLayoutContent>
    </StandaloneLayout>
  ),
};

export const AccessDenied: Story = {
  render: () => (
    <StandaloneLayout>
      <StandaloneLayoutContent>
        <EmptyState
          title="Access denied"
          description="You do not have permission to access this page."
        >
          <Button variant="outline">Return to dashboard</Button>
        </EmptyState>
      </StandaloneLayoutContent>
    </StandaloneLayout>
  ),
};

export const Maintenance: Story = {
  render: () => (
    <StandaloneLayout>
      <StandaloneLayoutHeader>
        <div
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
          }}
        >
          KZ-Rush
        </div>
      </StandaloneLayoutHeader>

      <StandaloneLayoutContent>
        <EmptyState
          title="Maintenance in progress"
          description="The service is temporarily unavailable while maintenance is being performed."
        />
      </StandaloneLayoutContent>

      <StandaloneLayoutFooter>
        <div
          style={{
            fontSize: '0.875rem',
            color: 'var(--rush-color-muted-foreground)',
          }}
        >
          Please try again later.
        </div>
      </StandaloneLayoutFooter>
    </StandaloneLayout>
  ),
};

export const ContentOnly: Story = {
  render: () => (
    <StandaloneLayout>
      <StandaloneLayoutContent>
        <Card>
          <CardHeader>
            <CardTitle>Standalone page</CardTitle>

            <CardDescription>This layout also works without a header or footer.</CardDescription>
          </CardHeader>

          <CardContent>
            <p
              style={{
                margin: 0,
              }}
            >
              Only the main content region is required.
            </p>
          </CardContent>
        </Card>
      </StandaloneLayoutContent>
    </StandaloneLayout>
  ),
};

export const ContentOnlyCentered: Story = {
  render: () => (
    <StandaloneLayout centered>
      <StandaloneLayoutContent>
        <Card>
          <CardHeader>
            <CardTitle>Standalone page</CardTitle>

            <CardDescription>This layout also works without a header or footer.</CardDescription>
          </CardHeader>

          <CardContent>
            <p
              style={{
                margin: 0,
              }}
            >
              Only the main content region is required.
            </p>
          </CardContent>
        </Card>
      </StandaloneLayoutContent>
    </StandaloneLayout>
  ),
};

export const CustomRegions: Story = {
  render: () => (
    <StandaloneLayout className="standalone-layout-example">
      <StandaloneLayoutHeader
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <strong>KZ-Rush</strong>

        <Button variant="unstyled">Help</Button>
      </StandaloneLayoutHeader>

      <StandaloneLayoutContent>
        <Card>
          <CardHeader>
            <CardTitle>Flexible composition</CardTitle>

            <CardDescription>
              Header, content and footer remain fully controlled by the consumer.
            </CardDescription>
          </CardHeader>

          <CardContent>The layout only provides page structure and positioning.</CardContent>
        </Card>
      </StandaloneLayoutContent>

      <StandaloneLayoutFooter
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.875rem',
          color: 'var(--rush-color-muted-foreground)',
        }}
      >
        <span>© KZ-Rush</span>

        <span>Privacy</span>
      </StandaloneLayoutFooter>
    </StandaloneLayout>
  ),
};
