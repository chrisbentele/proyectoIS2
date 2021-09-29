/**
 * @file App.test.js
 * @brief Página para testing
 */
//! Componentes para el testing.
import { render, screen } from '@testing-library/react';
//! Página principal
import App from './App';

/**
 * Función de testing de la página principal
 * @param ninguno
 */
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
