jest.mock('expo-router'); 

import { render, fireEvent } from '@testing-library/react-native';
import BackButton from './BackButton';
import { router } from 'expo-router';

describe('BackButton component', () => {
  it('renders the Go back text', () => {
    const { getByText } = render(<BackButton />);
    expect(getByText('Go back')).toBeTruthy();
  });

  it('calls router.back when pressed', () => {
    const { getByText } = render(<BackButton />);
    fireEvent.press(getByText('Go back'));
    expect(router.back).toHaveBeenCalled();
  });
});
