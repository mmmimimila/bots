import adminPages from './admin';
import authPages from './auth';
import cabinetPages from './cabinet';
import homePages from './home';

export default {
  ...adminPages,
  ...authPages,
  ...cabinetPages,
  ...homePages,
};
