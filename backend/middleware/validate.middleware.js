const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({ body: req.body, params: req.params });
    next();
  } catch (err) {
    console.log('error message :', err.message);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.message,
    });
  }
};

export default validate;
