import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

// GET /api/usuarios - lista todos los usuarios
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nombre, correo, identificacion, estado, ultima_actividad, almacenamiento_total, espacio_usado FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// PUT /api/usuarios/:id - actualizar un usuario (solo clientes)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, identificacion, estado, almacenamiento_total } = req.body;

    // Validar que el usuario existe y es cliente (rol_id = 2)
    const [usuario] = await pool.query('SELECT rol_id FROM usuarios WHERE id = ?', [id]);
    
    if (usuario.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar que no sea admin (rol_id = 1)
    if (usuario[0].rol_id === 1) {
      return res.status(403).json({ error: 'No se puede editar administradores' });
    }

    // Validar campos requeridos
    if (!nombre || !correo || !identificacion) {
      return res.status(400).json({ error: 'Nombre, correo e identificación son requeridos' });
    }

    // Validar formato de correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      return res.status(400).json({ error: 'Formato de correo inválido' });
    }

    // Actualizar usuario
    await pool.query(
      'UPDATE usuarios SET nombre = ?, correo = ?, identificacion = ?, estado = ?, almacenamiento_total = ? WHERE id = ?',
      [nombre, correo, identificacion, estado, almacenamiento_total, id]
    );

    res.json({ mensaje: 'Usuario actualizado correctamente', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

// PATCH /api/usuarios/:id/bloquear - bloquear un usuario (solo clientes)
router.patch('/:id/bloquear', async (req, res) => {
  try {
    const { id } = req.params;

    // Validar que el usuario existe
    const [usuario] = await pool.query('SELECT rol_id, estado FROM usuarios WHERE id = ?', [id]);
    
    if (usuario.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar que no sea admin
    if (usuario[0].rol_id === 1) {
      return res.status(403).json({ error: 'No se puede bloquear administradores' });
    }

    // Actualizar estado a inactivo
    await pool.query('UPDATE usuarios SET estado = ? WHERE id = ?', ['inactivo', id]);

    res.json({ mensaje: 'Usuario bloqueado correctamente', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al bloquear usuario' });
  }
});

// PATCH /api/usuarios/:id/desbloquear - desbloquear un usuario
router.patch('/:id/desbloquear', async (req, res) => {
  try {
    const { id } = req.params;

    // Validar que el usuario existe
    const [usuario] = await pool.query('SELECT rol_id FROM usuarios WHERE id = ?', [id]);
    
    if (usuario.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar que no sea admin
    if (usuario[0].rol_id === 1) {
      return res.status(403).json({ error: 'No se puede desbloquear administradores' });
    }

    // Actualizar estado a activo
    await pool.query('UPDATE usuarios SET estado = ? WHERE id = ?', ['activo', id]);

    res.json({ mensaje: 'Usuario desbloqueado correctamente', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al desbloquear usuario' });
  }
});

export default router;