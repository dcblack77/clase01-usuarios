const Users = require('../models/users.model');
const { hashSync } = require('bcrypt');

async function getUsers(req, res) {
  try {
    const users = await Users.find({ deleted_at: null });
    return res.status(200).json({
      users
    });
  } catch (error) {
    return res.status(501).json({
      users: null,
      error
    });
  }
}

async function createUser(req, res) {
  try {
    const { body } = req;
    body.password = hashSync(body.password, 8);
    const newUser = await Users.create(body);

    return res.status(201).json({
      user: newUser,
      created: true
    })
  } catch (error) {
    return res.status(503).json({
      error,
      user: null
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await Users.findByIdAndUpdate(id, { deleted_at: new Date() });

    return res.status(200).json({
      user: id
    });
  } catch (error) {
    return res.status(501).json({
      users: null,
      error
    });
  }
};

const destroyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const destroyedUser = await Users.findByIdAndDelete(id);
  
    return res.status(200).json({
      user: destroyedUser
    });
  } catch (error) {
    return res.status(501).json({
      users: null,
      error
    });
  }
}

async function updateUser(req, res) {
  try {
    const { id: _id } = req.params;
    const { body } = req;
    const userUpdated = await Users.updateOne({ _id }, body);
    
    if (userUpdated.modifiedCount === 1) {
      return res.status(200).json({
        user: `User ${_id} has been updated`
      });
    }

    throw Error("User can't be update");
  } catch (error) {
    return res.status(500).json({
      user: null,
      error
    });
  }
}

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  destroyUser,
  updateUser
}