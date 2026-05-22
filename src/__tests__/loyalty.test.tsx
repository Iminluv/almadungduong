import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import LoyaltyView from '@/app/khach-hang-than-thiet/LoyaltyView';

// Mock fetch
const mockData = {
  success: true,
  data: {
    tiers: [
      {
        name: 'Ươm mầm',
        slug: 'uom-mam',
        icon: '🌱',
        condition: 'Đăng ký thành viên',
        benefits: [
          { label: 'Đăng ký nhận letter qua email', value: '+ 10 giọt' }
        ]
      }
    ],
    config: {
      hero_text: 'TEST HERO TEXT',
      exchange_rate: '1 giọt = 1000 đồng TEST',
      closing_quote: 'TEST QUOTE'
    }
  }
};

global.fetch = vi.fn();

describe('LoyaltyView', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders loading state initially', () => {
    // Make fetch unresolved initially to keep it in loading state
    (global.fetch as any).mockImplementationOnce(() => new Promise(() => {}));
    
    render(<LoyaltyView />);
    // Since we just have a spinner div without role, we can check if it exists in document body
    // The spinner has animate-spin class
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('renders data after fetch', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      json: async () => mockData
    });

    render(<LoyaltyView />);

    await waitFor(() => {
      // Check config is rendered
      expect(screen.getByText('TEST HERO TEXT')).toBeInTheDocument();
      expect(screen.getByText('1 giọt = 1000 đồng TEST')).toBeInTheDocument();
      
      // Check tiers are rendered
      expect(screen.getByText('Ươm mầm')).toBeInTheDocument();
      expect(screen.getByText('Đăng ký nhận letter qua email')).toBeInTheDocument();
      expect(screen.getByText('+ 10 giọt')).toBeInTheDocument();
    });
  });
});
