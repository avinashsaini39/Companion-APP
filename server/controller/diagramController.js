import { Diagram } from '../model/diagramModel.js';

export const createDiagram = async (req, res) => {
  try {
    const { title, elements, userId } = req.body;

    // Validate required fields
    if (!title || !elements || !userId) {
      return res.status(400).json({ message: 'Title, elements, and userId are required.' });
    }

    const newDiagram = new Diagram({ title, elements, user: userId });
    await newDiagram.save();

    res.status(201).json(newDiagram);
  } catch (error) {
    console.error('Error creating diagram:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getDiagrams = async (req, res) => {
  try {
    const diagrams = await Diagram.find({ user: req.user.id });
    res.status(200).json(diagrams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDiagram = async (req, res) => {
  try {
    const { diagramId } = req.params; // Diagram ID from URL params
    const { title, elements } = req.body; // Data from the request body

    if (!diagramId) {
      return res.status(400).json({ message: 'Diagram ID is required.' });
    }

    const updatedDiagram = await Diagram.findByIdAndUpdate(
      diagramId,
      { title, elements },
      { new: true } // Return the updated document
    );

    if (!updatedDiagram) {
      return res.status(404).json({ message: 'Diagram not found.' });
    }

    res.status(200).json(updatedDiagram);
  } catch (error) {
    console.error('Error updating diagram:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};




export const deleteDiagram = async (req, res) => {
  try {
    const { diagramId } = req.params;

    const deletedDiagram = await Diagram.findByIdAndDelete(diagramId);

    if (!deletedDiagram) return res.status(404).json({ message: 'Diagram not found' });

    res.status(200).json({ message: 'Diagram deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
