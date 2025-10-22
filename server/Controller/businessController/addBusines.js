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
    try {
      const {professionalId, schedule}=req.body;

      if (!professionalId || !schedule || !Array.isArray(schedule)) {
        return res.status(400).json({ message: "Professional ID and valid schedule are required" });
      }
  
      const professional = await Professional.findById(professionalId);
      if (!professional) return res.status(404).json({ message: "Professional not found" });
  
      schedule.forEach((entry) => {
        professional.schedule.push(entry);
      });

      await professional.save();
      res.status(200).json({
        message:"weekly shedule added succcessfully",
        
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
}

export const add_TimeOff=async (req,res)=>{
  try {
    const { professionalId, timeOff } = req.body;

    if (!professionalId || !Array.isArray(timeOff) || timeOff.length === 0) {
      return res.status(400).json({ message: "Professional ID and valid timeOff array are required." });
    }

    const professional = await Professional.findById(professionalId);
    if (!professional) return res.status(404).json({ message: "Professional not found" });

    // --- Overlap check ---
    for (const entry of timeOff) {
      const exists = professional.timeOff.some(
        (t) => new Date(t.date).toDateString() === new Date(entry.date).toDateString()
      );
      if (exists) {
        return res.status(400).json({ message: `Time-off for ${entry.date} already exists` });
      }
    }

    // --- Add time-off entries ---
    professional.timeOff.push(...timeOff);
    await professional.save();

    // --- Process existing appointments ---
    const affectedAppointments = await Appointment.find({
      professional: professionalId,
      date: { $in: timeOff.map(t => new Date(t.date)) },
      status: { $in: ["pending", "confirmed"] }
    });

    const needsReschedule = [];

    for (const appt of affectedAppointments) {
      // Try to reassign to another available professional
      const availablePro = await Professional.findOne({
        business: professional.business,
        isActive: true,
        _id: { $ne: professionalId }
      });

      if (availablePro) {
        // Auto reassign
        appt.professional = availablePro._id;
        appt.rescheduleHistory.push({
          oldDate: appt.date,
          oldStartTime: appt.startTime,
          newDate: appt.date,
          newStartTime: appt.startTime,
          reason: "Auto-reassigned due to time-off",
        });
        await appt.save();
      } else {
        // Mark for reschedule
        appt.status = "needs_reschedule";
        appt.customerNotification = true;
        await appt.save();
        needsReschedule.push(appt._id);
      }
    }

    return res.status(200).json({
      message: "Time-off added successfully",
      totalAppointmentsAffected: affectedAppointments.length,
      reassigned: affectedAppointments.length - needsReschedule.length,
      needsRescheduleCount: needsReschedule.length,
    });

  } catch (error) {
    console.error("Error in add_TimeOff:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}


export const add_breaks_Professionals=async (req,res)=>{
    try {
      const {professionalId, breaks}=req.body;

      if (!professionalId || !Array.isArray(breaks) || breaks.length === 0) {
        return res.status(400).json({ message: "Professional ID and valid breaks array are required." });
      }
  
      const professional = await Professional.findById(professionalId);
      if (!professional) {
        return res.status(404).json({ message: "Professional not found." });
      }

      for(const brk of breaks){
        if(
          brk.dayOfWeek===undefined || !brk.startTime || !!brk.endTime
        ){
          return res.status(400).json({ message: "Each break must include dayOfWeek, startTime, and endTime." });
        }

        const alreadyExists=professional.breaks.some(
          (b)=> b.dayOfWeek ===  brk.dayOfWeek && b.label === (brk.label || "Lunch")
        );
        if(alreadyExists){
          return res.status(400).json({ message: `Break for day ${brk.dayOfWeek} already exists.` });
        }

        professional.breaks.push({
          dayOfWeek:brk.dayOfWeek,
          startTime: brk.startTime,
          endTime:brk.endTime,
          label:brk.label,
        });
      };
        await professional.save();

        return res.status(200).json({
          message: `${brk.label} added successfully.`,
          breaks: professional.breaks,
        });
      
     } catch (error) {
        console.error("Error adding lunch breaks:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
      }
  }
   


