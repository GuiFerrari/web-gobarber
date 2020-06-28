import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input Component', () => {
  it('should be able to render input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElemenet = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await wait(() => {
      expect(containerElemenet).toHaveStyle('border-color: #ff9000');
      expect(containerElemenet).toHaveStyle('color: #ff9000');
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElemenet).not.toHaveStyle('border-color: #ff9000');
      expect(containerElemenet).not.toHaveStyle('color: #ff9000');
    });
  });

  it('should keep input border highlight when input filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElemenet = getByTestId('input-container');

    fireEvent.change(inputElement, {
      target: {
        value: 'johndoe@email.com',
      },
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElemenet).toHaveStyle('color: #ff9000');
    });
  });
});
