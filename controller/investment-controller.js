const Investment = require('../model/investements');


exports.getInvestmentsByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId; 
    const investments = await Investment.find({ user: userId }).populate('project'); 
    res.json({ success: true, data: investments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


exports.addInvestment = async (req, res, next) => {
    try {
      const { amount, project, user } = req.body; // Assuming amount, projectId, and userId are passed in the request body
      const investment = new Investment({
        amount,
        project,
        user
      });
      await investment.save();
      res.json({ success: true, data: investment });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };

