import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: { control: 'radio', options: ['Default', 'Selected', 'Disabled'] },
    label: { control: 'boolean' },
    labelText: { control: 'text' },
    caption: { control: 'boolean' },
    captionText: { control: 'text' },
  },
  args: {
    type: 'Default',
    label: true,
    labelText: 'Option A',
    caption: true,
    captionText: 'Choose this option if it best describes your use case.',
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'Default',
    labelText: 'Unselected option',
  },
};

export const Selected: Story = {
  args: {
    type: 'Selected',
    labelText: 'Selected option',
    captionText: 'This option is currently active.',
  },
};

export const Disabled: Story = {
  args: {
    type: 'Disabled',
    labelText: 'Unavailable option',
    captionText: 'This option is not available in your current plan.',
  },
};

export const NoCaption: Story = {
  args: {
    type: 'Default',
    labelText: 'Simple option',
    caption: false,
  },
};
