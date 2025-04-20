import Joi from 'joi';

const envSchema = Joi.object({
  MONGODB_URI: Joi.string().required(),
});

const { error, value: envVars } = envSchema.validate(
  {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  { abortEarly: false },
);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  mongoDbUri: envVars.MONGODB_URI,
};
