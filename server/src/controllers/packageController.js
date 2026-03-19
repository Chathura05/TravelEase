import Package from '../models/Package.js';

export const getPackages = async (_req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPackageById = async (req, res) => {
  try {
    const travelPackage = await Package.findById(req.params.id);

    if (!travelPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.json(travelPackage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPackage = async (req, res) => {
  try {
    const created = await Package.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
