const Interns = require('../model/internSchema');
const Colleges = require('../model/collegeSchema');
const axios = require('axios');


const collegesDocs = async(req,res)=>{
 try {
 const {name,fullName,logoLink} = req.body;
 if(req.body===null) return res.status(400).json({ error: 'No data on the body!' });
 if(!name){
    return res.status(400).json({ error: 'Name is required' });
  }
 if(!fullName){
    return res.status(400).json({ error: 'Full name of college is required' });
  } 
 if(!logoLink){
    return res.status(400).json({ error: 'Logo link of the college is required' });
  } 
 const validUrl = await axios.head(logoLink); 
 if(!(validUrl.status>=200 && validUrl.status<300)) return res.status(400).json({ error: 'invalid logo link!' });
 const data = {name,fullName,logoLink};
 const result = await Colleges.create(data);
 res.status(201).json({status:true,data:result});
 } catch (error) {
 res.status(500).json({status:false,message:error.message.toString()});
 }
};

const internsDocs = async (req, res) => {
  try {
    const { name, mobile, email, collegeId } = req.body;
    
    // Validate name
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Validate mobile number
    if (!mobile) {
      return res.status(400).json({ error: 'Mobile number is required' });
    }
    if (!/^[0-9]{10}$/.test(mobile)) {
      return res.status(400).json({ error: 'Invalid mobile number' });
    }

    // Validate email
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Validate collegeId
    if (!collegeId) {
      return res.status(400).json({ error: 'College ID is required' });
    }

    const college = await Colleges.findById(collegeId);
    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }

    const data = { name, mobile, email, collegeId };
    const result = await Interns.create(data);

    const populatedResult = await result.populate('collegeId');
    res.status(201).json({ status: true, data: populatedResult });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message.toString() });
  }
};

const getInterns = async (req, res) => {
  try {
    const collegeName = req.query.collegeName;

    // Validate collegeName
    if (!collegeName) {
      return res.status(400).json({ error: 'College name is required' });
    }

    const college = await Colleges.findOne({ name: collegeName, isDeleted:false });

    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }
    
    const intern = await Interns.find({collegeId:college._id});
    if(!intern) return res.status(404).json({ error: 'interns not found' });
    res.status(200).json({
      status: true,
      data: {
        name: college.name,
        fullName: college.fullName,
        logoLink: college.logoLink,
        interns: intern
      }
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message.toString() });
  }
};



module.exports = {collegesDocs,internsDocs,getInterns};