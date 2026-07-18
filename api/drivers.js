const drivers = [
  { id: 1, name: 'Ava', vehicle: 'Tesla Model 3', rating: 4.9 },
  { id: 2, name: 'Noah', vehicle: 'Honda Civic', rating: 4.8 }
];

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  res.status(200).json({ drivers });
};
