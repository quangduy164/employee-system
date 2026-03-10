const authService = require("../services/authService");

exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const result = await authService.loginService(email, password);

    res.json(result);

  } catch (error) {

    if (error.message === "Email not found") {
      return res.status(404).json({ message: error.message });
    }

    if (error.message === "Wrong password") {
      return res.status(401).json({ message: error.message });
    }

    res.status(500).json({ error: error.message });
  }
};