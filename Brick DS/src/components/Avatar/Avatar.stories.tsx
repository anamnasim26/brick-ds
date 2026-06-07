import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: { control: 'radio', options: ['24', '32', '40', '56'] },
    type: { control: 'select', options: ['Image', 'Initials', 'Icon'] },
    state: { control: 'select', options: ['Available', 'Away', 'Busy', 'Offline'] },
    showStatus: { control: 'boolean' },
    initials: { control: 'text' },
    src: { control: 'text' },
  },
  args: {
    size: '40',
    type: 'Icon',
    state: 'Available',
    showStatus: false,
    initials: 'AB',
    src: 'https://i.pravatar.cc/150?img=3',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icon: Story = {
  args: {
    type: 'Icon',
    showStatus: false,
  },
};

export const Initials: Story = {
  args: {
    type: 'Initials',
    initials: 'JD',
    showStatus: false,
  },
};

export const WithStatus: Story = {
  args: {
    type: 'Image',
    src: 'https://i.pravatar.cc/150?img=3',
    showStatus: true,
    state: 'Available',
    size: '40',
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      {(['24', '32', '40', '56'] as const).map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
    </div>
  ),
  args: {
    type: 'Initials',
    initials: 'AB',
    showStatus: false,
  },
};
