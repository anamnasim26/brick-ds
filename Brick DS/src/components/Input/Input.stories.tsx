import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    state:              { control: 'select', options: ['Default-Unfilled', 'Hover', 'Filled', 'Focus', 'Error', 'Disabled'] },
    label:              { control: 'boolean' },
    inputLabel:         { control: 'text' },
    placeholder:        { control: 'text' },
    showLeftIcon:       { control: 'boolean' },
    helperText:         { control: 'boolean' },
    helperTextContent:  { control: 'text' },
    helperTextLocation: { control: 'radio', options: ['Left', 'Right'] },
  },
  args: {
    state:             'Default-Unfilled',
    label:             true,
    inputLabel:        'Email address',
    placeholder:       'Enter your email',
    showLeftIcon:      false,
    helperText:        false,
    helperTextContent: 'This is a hint text to help user.',
    helperTextLocation: 'Left',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default:    Story = {};
export const Filled:     Story = { args: { state: 'Filled',    placeholder: 'hello@example.com' } };
export const Focused:    Story = { args: { state: 'Focus' } };
export const Error:      Story = { args: { state: 'Error' } };
export const Disabled:   Story = { args: { state: 'Disabled' } };
export const WithHelper: Story = { args: { helperText: true } };
export const WithIcon:   Story = { args: { showLeftIcon: true } };
