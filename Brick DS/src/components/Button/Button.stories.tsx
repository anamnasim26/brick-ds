import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['Primary', 'Secondary', 'Success', 'Warning', 'Failure', 'Info'],
    },
    size: { control: 'radio', options: ['Small', 'Medium', 'Large'] },
    state: {
      control: 'select',
      options: ['Default', 'Hover', 'Pressed', 'Loading', 'Disabled'],
    },
    label: { control: 'text' },
    showLeftIcon: { control: 'boolean' },
    showRightIcon: { control: 'boolean' },
  },
  args: {
    variant: 'Primary',
    size: 'Medium',
    state: 'Default',
    label: 'Button',
    showLeftIcon: false,
    showRightIcon: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'Primary',
    label: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'Secondary',
    label: 'Secondary',
  },
};

export const Success: Story = {
  args: {
    variant: 'Success',
    label: 'Confirm',
  },
};

export const Warning: Story = {
  args: {
    variant: 'Warning',
    label: 'Caution',
  },
};

export const Failure: Story = {
  args: {
    variant: 'Failure',
    label: 'Delete',
  },
};

export const Loading: Story = {
  args: {
    variant: 'Primary',
    label: 'Loading',
    state: 'Loading',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'Primary',
    label: 'Disabled',
    state: 'Disabled',
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      {(['Primary', 'Secondary', 'Success', 'Warning', 'Failure', 'Info'] as const).map(
        (variant) => (
          <Button key={variant} {...args} variant={variant} label={variant} />
        )
      )}
    </div>
  ),
  args: {
    size: 'Medium',
    state: 'Default',
    showLeftIcon: false,
    showRightIcon: false,
  },
};
