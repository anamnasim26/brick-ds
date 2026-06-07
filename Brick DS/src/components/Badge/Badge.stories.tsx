import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: { control: 'select', options: ['Primary', 'Success', 'Failure', 'Warning', 'Info'] },
    text: { control: 'text' },
    showLeftIcon: { control: 'boolean' },
    showRightIcon: { control: 'boolean' },
  },
  args: {
    type: 'Primary',
    text: 'Badge',
    showLeftIcon: true,
    showRightIcon: false,
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'Primary',
    text: 'Primary',
  },
};

export const Success: Story = {
  args: {
    type: 'Success',
    text: 'Success',
  },
};

export const Failure: Story = {
  args: {
    type: 'Failure',
    text: 'Failure',
  },
};

export const Warning: Story = {
  args: {
    type: 'Warning',
    text: 'Warning',
  },
};

export const Info: Story = {
  args: {
    type: 'Info',
    text: 'Info',
  },
};

export const NoIcons: Story = {
  args: {
    type: 'Primary',
    text: 'No Icons',
    showLeftIcon: false,
    showRightIcon: false,
  },
};
