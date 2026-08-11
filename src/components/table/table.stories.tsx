import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from '../badge';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

const meta = {
  title: 'Components/Table',
  component: Table,

  tags: ['autodocs'],

  parameters: {
    layout: 'padded',
  },

  args: {
    children: null,
    density: 'default',
    hoverable: true,
    striped: false,
  },

  argTypes: {
    children: {
      control: false,
    },

    density: {
      control: 'select',
      options: ['default', 'compact'],
    },

    striped: {
      control: 'boolean',
    },

    hoverable: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

function ExampleTable({
  striped = false,
  hoverable = true,
  density = 'default',
}: {
  striped?: boolean;
  hoverable?: boolean;
  density?: 'default' | 'compact';
}) {
  return (
    <TableContainer>
      <Table striped={striped} hoverable={hoverable} density={density}>
        <TableCaption>Latest approved KZ-Rush records.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Player</TableHead>

            <TableHead>Map</TableHead>

            <TableHead>Type</TableHead>

            <TableHead align="right">Time</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>PlayerOne</TableCell>

            <TableCell>kz_example</TableCell>

            <TableCell>
              <Badge variant="success">PRO</Badge>
            </TableCell>

            <TableCell align="right">01:23.45</TableCell>
          </TableRow>

          <TableRow selected>
            <TableCell>PlayerTwo</TableCell>

            <TableCell>kz_longmap</TableCell>

            <TableCell>
              <Badge variant="secondary">NUB</Badge>
            </TableCell>

            <TableCell align="right">02:14.88</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>PlayerThree</TableCell>

            <TableCell>kz_climb</TableCell>

            <TableCell>
              <Badge variant="success">PRO</Badge>
            </TableCell>

            <TableCell align="right">00:58.32</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const Default: Story = {
  render: (args) => (
    <ExampleTable striped={args.striped} hoverable={args.hoverable} density={args.density} />
  ),
};

export const Striped: Story = {
  args: {
    striped: true,
  },

  render: (args) => (
    <ExampleTable striped={args.striped} hoverable={args.hoverable} density={args.density} />
  ),
};

export const Compact: Story = {
  args: {
    density: 'compact',
  },

  render: (args) => (
    <ExampleTable striped={args.striped} hoverable={args.hoverable} density={args.density} />
  ),
};

export const WithoutHover: Story = {
  args: {
    hoverable: false,
  },

  render: (args) => (
    <ExampleTable striped={args.striped} hoverable={args.hoverable} density={args.density} />
  ),
};

export const WithFooter: Story = {
  render: () => (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>

            <TableHead align="right">Count</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>Approved</TableCell>

            <TableCell align="right">128</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Pending</TableCell>

            <TableCell align="right">12</TableCell>
          </TableRow>
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>

            <TableCell align="right">140</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  ),
};

export const WideTable: Story = {
  render: () => (
    <div
      style={{
        maxWidth: '36rem',
      }}
    >
      <TableContainer>
        <Table
          style={{
            minWidth: '60rem',
          }}
        >
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>

              <TableHead>Map</TableHead>

              <TableHead>Country</TableHead>

              <TableHead>Weapon</TableHead>

              <TableHead>Type</TableHead>

              <TableHead>Date</TableHead>

              <TableHead align="right">Time</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>PlayerOne</TableCell>

              <TableCell>kz_very_long_map_name</TableCell>

              <TableCell>Kazakhstan</TableCell>

              <TableCell>Knife</TableCell>

              <TableCell>PRO</TableCell>

              <TableCell>2026-08-09</TableCell>

              <TableCell align="right">01:23.45</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ),
};
