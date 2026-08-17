let savedName = null;

async function getName(req, res, next) {
  res.json(savedName);
}

function sendName(req, res, next) {
  const { name } = req.body;

  savedName = name;
  res.json(savedName);
}

export const profileController = {
  getName,
  sendName,
};
