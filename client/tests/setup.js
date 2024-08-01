/* import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import { fetchCandidateData } from './__mocks__/fetchCandidateData'; // Importa tu mock

vi.mock('./path/to/your/fetchCandidateData', () => ({
  fetchCandidateData: vi.fn().mockResolvedValue({ /* datos simulados aquí *//*  })
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);

    // Verifica si el texto básico está presente en el documento
    expect(screen.getByText(/Header/i)).toBeDefined();
    expect(screen.getByText(/Footer/i)).toBeDefined();
  });
});  */