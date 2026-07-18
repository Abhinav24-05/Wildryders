let rides = [
  { id: 1001, customer: 'Mina', pickup: 'Downtown', dropoff: 'Airport', status: 'completed' },
  { id: 1002, customer: 'Owen', pickup: 'North Gate', dropoff: 'Harbor', status: 'in_progress' }
];

module.exports = (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json({ rides });
    return;
  }

  if (req.method === 'POST') {
    const { customer, pickup, dropoff } = req.body || {};

    if (!customer || !pickup || !dropoff) {
      res.status(400).json({ error: 'customer, pickup, and dropoff are required' });
      return;
    }

    const ride = {
      id: Date.now(),
      customer,
      pickup,
      dropoff,
      status: 'requested'
    };

    rides.unshift(ride);
    res.status(201).json({ ride });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
};
