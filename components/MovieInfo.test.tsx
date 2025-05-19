import { render } from '@testing-library/react-native';
import MovieInfo from './MovieInfo';

describe('MovieInfo component', () => {
  it('renders the label text', () => {
    const { getByText } = render(<MovieInfo label="Release Date" value="2023" />);
    expect(getByText('Release Date')).toBeTruthy();
    expect(getByText('2023')).toBeTruthy();
  });

  it('renders the value when provided', () => {
    const { getByText } = render(<MovieInfo label="Rating" value={8.5} />);
    expect(getByText('8.5')).toBeTruthy();
  });

  it('renders "N/A" when value is null or undefined', () => {
    const { getByText, rerender } = render(<MovieInfo label="Genre" value={null} />);
    expect(getByText('N/A')).toBeTruthy();

    rerender(<MovieInfo label="Genre" value={undefined} />);
    expect(getByText('N/A')).toBeTruthy();

    rerender(<MovieInfo label="Genre" />);
    expect(getByText('N/A')).toBeTruthy();
  });
});
