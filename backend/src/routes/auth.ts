import { Router } from 'express';
import { prisma } from '../util/prisma.js';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { signJwt } from '../util/jwt.js';

const router = Router();

const signupSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2).max(80),
  password: z.string().min(8).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
    'Password must be at least 8 chars and include letters, numbers, and a special character')
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

router.post('/signup', async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.format() });

  const { email, fullName, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ message: 'Email already registered' });

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, fullName, password: hash },
    select: { id: true, email: true, fullName: true }
  });

  const token = signJwt({ userId: user.id, email: user.email });
  res.status(201).json({ user, token });
});

router.post('/signin', async (req, res) => {
  const parsed = signinSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.format() });

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signJwt({ userId: user.id, email: user.email });
  res.json({ user: { id: user.id, email: user.email, fullName: user.fullName }, token });
});

export default router;
