export const envSchema = {
  type: 'object',
  required: ['ENCRYPTION_KEY'],
  properties: {
    ENCRYPTION_KEY: {
      type: 'string',
      //minLength: 32,
      //maxLength: 32, comment out for now because idk how to make the key work
    },
  },
};