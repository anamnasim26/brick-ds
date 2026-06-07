import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant:              { control: 'select', options: ['general', 'success', 'warning', 'failure', 'info'] },
    heading:              { control: 'text' },
    supportingText:       { control: 'text' },
    showSupportingText:   { control: 'boolean' },
    showActions:          { control: 'boolean' },
    primaryActionLabel:   { control: 'text' },
    secondaryActionLabel: { control: 'text' },
    showCloseIcon:        { control: 'boolean' },
  },
  args: {
    variant:              'general',
    heading:              'Alert message goes here.',
    supportingText:       'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    showSupportingText:   true,
    showActions:          false,
    primaryActionLabel:   'Button',
    secondaryActionLabel: 'Button',
    showCloseIcon:        true,
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Success: Story = { args: { variant: 'success', heading: 'Changes saved successfully.' } };
export const Warning: Story = { args: { variant: 'warning', heading: 'Review before continuing.' } };
export const Failure: Story = { args: { variant: 'failure', heading: 'Something went wrong.' } };
export const Info:    Story = { args: { variant: 'info',    heading: 'Here is some useful information.' } };
export const WithActions: Story = {
  args: { showActions: true, heading: 'Confirm your action.', supportingText: 'This action cannot be undone.' },
};
export const Minimal: Story = {
  args: { showSupportingText: false, showActions: false, showCloseIcon: false },
};
