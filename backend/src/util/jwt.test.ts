import { signJwt, verifyJwt } from './jwt';

describe('jwt util', () => {
  it('signs and verifies', () => {
    const token = signJwt({ userId: 1, email: 'a@b.com' }, '1h');
    const payload = verifyJwt<{ userId: number; email: string }>(token);
    expect(payload.userId).toBe(1);
    expect(payload.email).toBe('a@b.com');
  });
});
