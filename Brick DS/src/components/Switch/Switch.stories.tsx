import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    pressed: { control: 'boolean' },
    state: { control: 'radio', options: ['Default', 'Disabled'] },
    label: { control: 'boolean' },
    labelText: { control: 'text' },
  },
  args: {
    pressed: false,
    state: 'Default',
    label: true,
    labelText: 'Enable notifications',
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {
  args: {
    pressed: false,
    labelText: 'Dark mode',
  },
};

export const On: Story = {
  args: {
    pressed: true,
    labelText: 'Dark mode',
  },
};

export const Disabled: Story = {
  args: {
    pressed: false,
    state: 'Disabled',
    labelText: 'Unavailable feature',
  },
};

export const NoLabel: Story = {
  args: {
    pressed: false,
    label: false,
  },
};
