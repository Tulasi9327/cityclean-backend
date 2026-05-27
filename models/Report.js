const mongoose = require('mongoose');

// Define the blueprint for our Waste Reports collection
const ReportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Reporter name is required']
  },
  contact: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: [true, 'Location address or landmark is required']
  },
  issueType: {
    type: String,
    required: [true, 'Issue type is required'],
    enum: {
      values: ['Overflowing Bin', 'Illegal Dump', 'Uncollected Garbage', 'Hazardous Waste', 'Other'],
      message: '{VALUE} is not a valid issue type'
    }
  },
  severity: {
    type: String,
    required: [true, 'Severity level is required'],
    enum: {
      values: ['Low', 'Medium', 'High', 'Critical'],
      message: '{VALUE} is not a valid severity level'
    }
  },
  description: {
    type: String,
    required: false
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'In Progress', 'Resolved']
  },
  lat: {
    type: Number,
    required: [true, 'Latitude is required to map the issue']
  },
  lng: {
    type: Number,
    required: [true, 'Longitude is required to map the issue']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the model so it can be used in routing files
module.exports = mongoose.model('Report', ReportSchema);