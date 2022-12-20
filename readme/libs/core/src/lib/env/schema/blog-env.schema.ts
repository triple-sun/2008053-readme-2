import * as Joi from 'joi';

export default Joi.object({
  UPLOAD_DIR: Joi
    .string()
    .required(),
});
