import Professional from "../../Models/professionalSchema.js";

export const add_Professionals = async (req, res) => {
  try {
    const { name, phone, age, gender, specialization, experience, business } = req.body;

    // Check all required fields
    if (!name || !phone || !age || !gender || !specialization || !experience || !business) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if phone already exists
    const existing = await Professional.findOne({ phone });
    if (existing) {
      return res.status(400).json({ message: "Professional with this phone already exists" });
    }

    // Create new professional
    const newProfessional = await Professional.create({
      name,
      phone,
      age,
      gender,
      specialization,
      experience,
      business,
    });

    return res.status(201).json({ message: "Professional added successfully", professional: newProfessional });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const add_Shift_Professionals=async (req,res)=>{
    
}

export const add_TimeOff=async (req,res)=>{
    
}


export const set_Shedule_Professionals=async (req,res)=>{
    
}

