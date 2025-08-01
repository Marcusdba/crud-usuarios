const User = require('../models/User');

// Criar usuário
exports.createUser = async (req, res) => {
  try {
    const novoUsuario = new User(req.body);
    await novoUsuario.save();
    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar usuário: ' + err.message });
  }
};

// Listar usuários
exports.getUsers = async (req, res) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários: ' + err.message });
  }
};

// Buscar usuário por ID
exports.getUserById = async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: 'ID inválido ou erro na busca: ' + err.message });
  }
};

// Atualizar usuário
exports.updateUser = async (req, res) => {
  try {
    const usuarioAtualizado = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!usuarioAtualizado) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(usuarioAtualizado);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar usuário: ' + err.message });
  }
};

// Deletar usuário
exports.deleteUser = async (req, res) => {
  try {
    const usuarioDeletado = await User.findByIdAndDelete(req.params.id);
    if (!usuarioDeletado) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json({ message: 'Usuário deletado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar usuário: ' + err.message });
  }
};
