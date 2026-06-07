import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    colour: { control: 'radio', options: ['Brand', 'Black'] },
    arrowPosition: {
      control: 'select',
      options: [
        'Bottom Left',
        'Bottom Center',
        'Bottom Right',
        'Top Left',
        'Top Center',
        'Top Right',
        'Left',
        'Right',
      ],
    },
    label: { control: 'boolean' },
    labelText: { control: 'text' },
    caption: { control: 'boolean' },
    captionText: { control: 'text' },
    showCloseIcon: { control: 'boolean' },
  },
  args: {
    colour: 'Brand',
    arrowPosition: 'Bottom Center',
    label: true,
    labelText: 'Tooltip label',
    caption: false,
    captionText: 'Additional context for the tooltip.',
    showCloseIcon: true,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brand: Story = {
  args: {
    colour: 'Brand',
    labelText: 'Brand tooltip',
    arrowPosition: 'Bottom Center',
  },
};

export const Black: Story = {
  args: {
    colour: 'Black',
    labelText: 'Black tooltip',
    arrowPosition: 'Bottom Center',
  },
};

export const WithCaption: Story = {
  args: {
    colour: 'Brand',
    labelText: 'Helpful tip',
    caption: true,
    captionText: 'This action cannot be undone once confirmed.',
    arrowPosition: 'Bottom Center',
  },
};

export const NoCloseIcon: Story = {
  args: {
    colour: 'Brand',
    labelText: 'Persistent tooltip',
    showCloseIcon: false,
    arrowPosition: 'Top Center',
  },
};

export const AllPositions: Story = {
  render: (args) => {
    const positions = [
      'Top Left',
      'Top Center',
      'Top Right',
      'Bottom Left',
      'Bottom Center',
      'Bottom Right',
      'Left',
      'Right',
    ] as const;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, auto)',
          gap: '32px',
          alignItems: 'center',
          justifyItems: 'center',
        }}
      >
        {positions.map((position) => (
          <Tooltip
            key={position}
            {...args}
            arrowPosition={position}
            labelText={position}
          />
        ))}
      </div>
    );
  },
  args: {
    colour: 'Brand',
    label: true,
    caption: false,
    showCloseIcon: false,
  },
};
