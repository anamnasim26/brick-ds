import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: { control: 'radio', options: ['Primary', 'Negative'] },
    selection: { control: 'radio', options: ['Unchecked', 'Checked', 'Indeterminate'] },
    state: { control: 'radio', options: ['Default', 'Hover', 'Disabled'] },
    size: { control: 'radio', options: ['16', '20'] },
    label: { control: 'boolean' },
    labelText: { control: 'text' },
    caption: { control: 'boolean' },
    captionText: { control: 'text' },
  },
  args: {
    type: 'Primary',
    selection: 'Unchecked',
    state: 'Default',
    size: '20',
    label: true,
    labelText: 'Accept terms and conditions',
    caption: true,
    captionText: 'You agree to our Terms of Service and Privacy Policy.',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selection: 'Unchecked',
    state: 'Default',
  },
};

export const Checked: Story = {
  args: {
    selection: 'Checked',
  },
};

export const Indeterminate: Story = {
  args: {
    selection: 'Indeterminate',
    labelText: 'Select all items',
    captionText: 'Some items in this group are selected.',
  },
};

export const Disabled: Story = {
  args: {
    selection: 'Checked',
    state: 'Disabled',
    labelText: 'This option is unavailable',
  },
};

export const NoCaption: Story = {
  args: {
    selection: 'Unchecked',
    caption: false,
    labelText: 'Subscribe to newsletter',
  },
};
