import session from 'express-session';
import SequelizeStoreImport from 'connect-session-sequelize';
import type { Express } from 'express';
import type { Sequelize } from 'sequelize';

const SequelizeStore = SequelizeStoreImport(session.Store);

export function configureSequelizeSessionMiddleware(app: Express, sequelize: Sequelize) {
  app.use(
    session({
      secret: 'to_be_changed_later',
      store: new SequelizeStore({ db: sequelize }),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false, 
        maxAge: 60 * 60 * 1000, 
      },
    })
  );
}
