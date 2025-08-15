import { Router } from 'express';
import { prisma } from '../util/prisma.js';
import { z } from 'zod';
import { requireAuth, AuthedRequest } from '../middleware/requireAuth.js';

const router = Router();
router.use(requireAuth);

const taskSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().max(1000).optional(),
  completed: z.boolean().optional()
});

router.get('/', async (req: AuthedRequest, res) => {
  const tasks = await prisma.task.findMany({
    where: { userId: req.user!.userId },
    orderBy: { createdAt: 'desc' }
  });
  res.json(tasks);
});

router.post('/', async (req: AuthedRequest, res) => {
  const parsed = taskSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.format() });

  const task = await prisma.task.create({
    data: { ...parsed.data, userId: req.user!.userId }
  });
  res.status(201).json(task);
});

router.put('/:id', async (req: AuthedRequest, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: 'Invalid id' });

  const parsed = taskSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.format() });

  const existing = await prisma.task.findFirst({ where: { id, userId: req.user!.userId } });
  if (!existing) return res.status(404).json({ message: 'Task not found' });

  const updated = await prisma.task.update({ where: { id }, data: parsed.data });
  res.json(updated);
});

router.delete('/:id', async (req: AuthedRequest, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: 'Invalid id' });

  const existing = await prisma.task.findFirst({ where: { id, userId: req.user!.userId } });
  if (!existing) return res.status(404).json({ message: 'Task not found' });

  await prisma.task.delete({ where: { id } });
  res.status(204).send();
});

export default router;
