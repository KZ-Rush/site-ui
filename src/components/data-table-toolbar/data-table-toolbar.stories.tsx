import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button';

import { Input } from '../input';

import { Select } from '../select';

import { DataTableToolbar } from './data-table-toolbar';

const meta = {
  title: 'Components/DataTableToolbar',
  component: DataTableToolbar,

  tags: ['autodocs'],

  parameters: {
    layout: 'padded',
  },

  argTypes: {
    start: {
      control: false,
    },

    selection: {
      control: false,
    },

    end: {
      control: false,
    },
  },
} satisfies Meta<typeof DataTableToolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    start: <span>Records</span>,

    end: <Button>Add record</Button>,
  },
};

export const WithSearch: Story = {
  render: () => (
    <DataTableToolbar
      start={
        <div
          style={{
            width: '18rem',
          }}
        >
          <Input type="search" placeholder="Search records..." aria-label="Search records" />
        </div>
      }
    />
  ),
};

export const WithFilters: Story = {
  render: () => (
    <DataTableToolbar
      start={
        <>
          <div
            style={{
              width: '18rem',
            }}
          >
            <Input type="search" placeholder="Search records..." aria-label="Search records" />
          </div>

          <div
            style={{
              width: '10rem',
            }}
          >
            <Select aria-label="Record type" defaultValue="">
              <option value="">All types</option>

              <option value="pro">PRO</option>

              <option value="nub">NUB</option>
            </Select>
          </div>

          <div
            style={{
              width: '12rem',
            }}
          >
            <Select aria-label="Status" defaultValue="">
              <option value="">All statuses</option>

              <option value="approved">Approved</option>

              <option value="pending">Pending</option>

              <option value="rejected">Rejected</option>
            </Select>
          </div>
        </>
      }

      end={<Button variant="outline">Export</Button>}
    />
  ),
};

export const Selection: Story = {
  args: {
    start: <Input type="search" placeholder="Search records..." />,

    selection: <span>3 records selected</span>,

    end: (
      <>
        <Button variant="outline">Approve</Button>

        <Button variant="destructive">Delete</Button>
      </>
    ),
  },
};

export const InteractiveSelection: Story = {
  render: () => {
    const [selectedCount, setSelectedCount] = useState(0);

    return (
      <div
        style={{
          display: 'grid',
          gap: '1rem',
        }}
      >
        <DataTableToolbar
          start={
            <>
              <div
                style={{
                  width: '18rem',
                }}
              >
                <Input type="search" placeholder="Search records..." />
              </div>

              <Select aria-label="Type" defaultValue="">
                <option value="">All types</option>

                <option value="pro">PRO</option>

                <option value="nub">NUB</option>
              </Select>
            </>
          }

          selection={selectedCount > 0 ? <span>{selectedCount} selected</span> : undefined}

          end={
            selectedCount > 0 ? (
              <Button
                variant="destructive"
                onClick={() => {
                  setSelectedCount(0);
                }}
              >
                Delete selected
              </Button>
            ) : (
              <Button>Add record</Button>
            )
          }
        />

        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
          }}
        >
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCount((count) => count + 1);
            }}
          >
            Simulate selection
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setSelectedCount(0);
            }}
          >
            Clear
          </Button>
        </div>
      </div>
    );
  },
};
