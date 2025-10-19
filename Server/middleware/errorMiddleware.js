export const errorMiddleware= (err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
  

    res.status(statusCode || 500).json({
        success:false,
        statusCode,
        message: err.message || "Internal Server Error",
    });
};

export const notFound = (req, res, next) => {
    res.status(404).json({
      success: false,
      message: `Not Found - ${req.originalUrl}`,
    });
  };