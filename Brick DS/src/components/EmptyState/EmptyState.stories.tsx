import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    type:              { control: 'radio',  options: ['Default', 'Outlined'] },
    illustrationType:  { control: 'select', options: ['No Data', 'No Results', 'Error_404'] },
    showIllustration:  { control: 'boolean' },
    showHeading:       { control: 'boolean' },
    headingText:       { control: 'text' },
    showHelperText:    { control: 'boolean' },
    helperText:        { control: 'text' },
    showActionButtons: { control: 'boolean' },
    primaryLabel:      { control: 'text' },
    secondaryLabel:    { control: 'text' },
  },
  args: {
    type:              'Default',
    illustrationType:  'No Data',
    showIllustration:  true,
    showHeading:       true,
    headingText:       'Nothing here yet',
    showHelperText:    true,
    helperText:        'Get started by creating your first item.',
    showActionButtons: true,
    primaryLabel:      'Create item',
    secondaryLabel:    'Learn more',
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default:         Story = {};
export const Outlined:        Story = { args: { type: 'Outlined' } };
export const NoResults:       Story = { args: { illustrationType: 'No Results', headingText: 'No results found', helperText: 'Try adjusting your search or filters.' } };
export const Error404:        Story = { args: { illustrationType: 'Error_404', headingText: 'Page not found', helperText: 'The page you are looking for does not exist.' } };
export const NoIllustration:  Story = { args: { showIllustration: false } };
