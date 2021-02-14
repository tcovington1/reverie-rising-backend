import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import { createAuth } from '@keystone-next/auth';
import { User } from './schemas/User'


const databaseURL = process.env.DATABASE_URL;

const sessionConfig = {
  // how long does user stay signed in?
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.CCOOKIE_SECRET
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO add in initial roles here
  }
})

export default withAuth(config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,

    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    // TODO add seeding data here
  },
  lists: createSchema({
    // Schema items go here
    User
  }),
  ui: {
    // How UI for anyone who passes this test
    isAccessAllowed: ({ session }) => {
      console.log(session);
      return !!session?.data;
    },
  },
  session: withItemData(statelessSessions(sessionConfig), {
    User: 'id',
  })
}));
