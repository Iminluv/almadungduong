import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const { mockSendMail } = vi.hoisted(() => ({
  mockSendMail: vi.fn(),
}));

vi.mock('nodemailer', () => {
  return {
    default: {
      createTransport: vi.fn(() => ({
        sendMail: mockSendMail,
      })),
    },
  };
});

// Import email library after mocking nodemailer
import {
  sendWelcomeEmail,
  sendOrderPendingEmail,
  sendOrderConfirmation,
  sendClaimReceivedEmail,
  sendPasswordResetEmail,
  sendLoyaltyTierUpgradeEmail,
  sendAdminPaymentAlert,
  sendAdminClaimAlert,
} from '@/lib/email';

describe('Email Service (Nodemailer Brevo SMTP)', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
    process.env.SMTP_USER = 'almadungduong@gmail.com';
    process.env.SMTP_PASS = 'test_smtp_key';
    process.env.EMAIL_FROM = 'Alma Dungduong <cskh@almadungduong.com>';
    process.env.ADMIN_EMAIL = 'almadungduong@gmail.com';
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('skips email sending if SMTP_PASS is not set', async () => {
    delete process.env.SMTP_PASS;
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await sendWelcomeEmail('user@example.com', 'Test User');

    expect(result).toBeNull();
    expect(mockSendMail).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('SMTP_PASS is not set')
    );

    consoleSpy.mockRestore();
  });

  it('sends welcome email correctly with rich HTML and text', async () => {
    mockSendMail.mockResolvedValueOnce({ messageId: 'test-msg-1' });

    const result = await sendWelcomeEmail('user@example.com', 'Nguyen Van A');

    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.stringContaining('cskh@almadungduong.com'),
        replyTo: 'cskh@almadungduong.com',
        to: 'user@example.com',
        subject: '[Alma Dungduong] Đăng ký tài khoản thành công',
        html: expect.stringContaining('Nguyen Van A'),
        text: expect.stringContaining('Nguyen Van A'),
      })
    );
    expect(result).toEqual({ messageId: 'test-msg-1' });
  });

  it('sends order pending email correctly with rich HTML bank instructions', async () => {
    mockSendMail.mockResolvedValueOnce({ messageId: 'test-msg-2' });

    const pendingOrder = {
      transferCode: 'ALMA123',
      totalAmount: 500000,
      bankName: 'BIDV',
      bankAccount: '96247ALMADUNGDUONG',
      accountName: 'VU THI KIEU MY',
      expiresAt: '2026-07-22T12:00:00Z',
      shippingName: 'Tran Van B',
      items: [
        {
          title: 'Kem dưỡng ẩm',
          price: 250000,
          quantity: 2,
          variant: '50ml',
        },
      ],
    };

    await sendOrderPendingEmail('customer@example.com', pendingOrder);

    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.stringContaining('cskh@almadungduong.com'),
        replyTo: 'cskh@almadungduong.com',
        to: 'customer@example.com',
        subject: '[Alma Dungduong] Xác nhận đơn hàng #ALMA123 đang chờ thanh toán',
        html: expect.stringContaining('BIDV'),
        text: expect.stringContaining('BIDV'),
      })
    );
  });

  it('sends order confirmation HTML email with botanical layout', async () => {
    mockSendMail.mockResolvedValueOnce({ messageId: 'test-msg-3' });

    const confirmedOrder = {
      transferCode: 'ALMA456',
      totalAmount: 300000,
      shippingName: 'Le Thi C',
      shippingAddress: '123 Le Loi, Q1, HCM',
      shippingPhone: '0901234567',
      items: [
        {
          title: 'Serum Sáng Da',
          price: 300000,
          quantity: 1,
        },
      ],
    };

    await sendOrderConfirmation(confirmedOrder, 'customer@example.com');

    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.stringContaining('cskh@almadungduong.com'),
        replyTo: 'cskh@almadungduong.com',
        to: 'customer@example.com',
        subject: '[Alma Dungduong] Xác nhận đơn hàng #ALMA456 thành công',
        html: expect.stringContaining('Serum Sáng Da'),
        text: expect.stringContaining('ALMA456'),
      })
    );
  });

  it('sends claim received email with rich HTML and text', async () => {
    mockSendMail.mockResolvedValueOnce({ messageId: 'test-msg-4' });

    await sendClaimReceivedEmail('customer@example.com', 'ALMA789');

    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.stringContaining('cskh@almadungduong.com'),
        replyTo: 'cskh@almadungduong.com',
        to: 'customer@example.com',
        subject: '[Alma Dungduong] Nhận yêu cầu xác minh giao dịch thủ công #ALMA789',
        html: expect.stringContaining('ALMA789'),
        text: expect.stringContaining('ALMA789'),
      })
    );
  });

  it('sends password reset email with security styling', async () => {
    mockSendMail.mockResolvedValueOnce({ messageId: 'test-msg-5' });

    await sendPasswordResetEmail('user@example.com', 'https://almadungduong.com/reset?token=123');

    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.stringContaining('cskh@almadungduong.com'),
        replyTo: 'cskh@almadungduong.com',
        to: 'user@example.com',
        subject: '[Alma Dungduong] Yêu cầu đặt lại mật khẩu tài khoản',
        html: expect.stringContaining('https://almadungduong.com/reset?token=123'),
        text: expect.stringContaining('https://almadungduong.com/reset?token=123'),
      })
    );
  });

  it('sends loyalty tier upgrade email with VIP celebration', async () => {
    mockSendMail.mockResolvedValueOnce({ messageId: 'test-msg-6' });

    await sendLoyaltyTierUpgradeEmail('user@example.com', 'Hoang D', 'Vàng');

    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.stringContaining('cskh@almadungduong.com'),
        replyTo: 'cskh@almadungduong.com',
        to: 'user@example.com',
        subject: '[Alma Dungduong] Nâng cấp hạng thành viên thành công: Vàng',
        html: expect.stringContaining('Vàng'),
        text: expect.stringContaining('Vàng'),
      })
    );
  });

  it('sends admin payment alert', async () => {
    mockSendMail.mockResolvedValueOnce({ messageId: 'test-msg-7' });

    const alertData = {
      id: 'ord_1',
      transferCode: 'ALMA999',
      totalAmount: 1000000,
      shippingName: 'Pham E',
      shippingPhone: '0987654321',
    };

    await sendAdminPaymentAlert(alertData);

    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.stringContaining('cskh@almadungduong.com'),
        replyTo: 'cskh@almadungduong.com',
        to: 'almadungduong@gmail.com',
        subject: '[Alma Admin] Thanh toán đơn hàng #ALMA999 thành công',
        html: expect.stringContaining('ALMA999'),
        text: expect.stringContaining('ALMA999'),
      })
    );
  });

  it('sends admin claim alert', async () => {
    mockSendMail.mockResolvedValueOnce({ messageId: 'test-msg-8' });

    const claimData = {
      id: 'ord_2',
      transferCode: 'ALMA888',
      totalAmount: 750000,
      shippingName: 'Vu F',
      shippingPhone: '0912345678',
      claimedAt: new Date().toISOString(),
    };

    await sendAdminClaimAlert(claimData);

    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.stringContaining('cskh@almadungduong.com'),
        replyTo: 'cskh@almadungduong.com',
        to: 'almadungduong@gmail.com',
        subject: '[Alma Admin] Yêu cầu xác minh thủ công #ALMA888',
        html: expect.stringContaining('ALMA888'),
        text: expect.stringContaining('ALMA888'),
      })
    );
  });
});
