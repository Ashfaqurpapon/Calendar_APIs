import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  default_password: process.env.DEFAULT_PASS,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,

  PAYMENT_URL: process.env.PAYMENT_URL,
  STORE_ID: process.env.STORE_ID,
  SIGNETURE_KEY: process.env.SIGNETURE_KEY,
  PAYMENT_VERIFY_URL: process.env.PAYMENT_VERIFY_URL,

  BASE_API: process.env.BASE_API,
  Frontent_API: process.env.Frontent_API,
  Frontent_API_Home: process.env.Frontent_API_Home,
};
////
