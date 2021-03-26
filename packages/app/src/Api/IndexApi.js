import AuthApi from '@lskjs/auth/Api';
import GrantApi from '@lskjs/grant/Api';
import PermitApi from '@lskjs/permit/Api';
import BaseIndexApi from '@lskjs/server-api/IndexApi';
import TestApi from '@lskjs/server-api/TestApi';
import UploadApi from '@lskjs/upload/Api';
import Err from '@lskjs/utils/Err';

// import BotsApi from '../lskjs/bots/api';
import AdminApi from './AdminApi';
import UserApi from './UserApi';

export default class IndexApi extends BaseIndexApi {
  getRoutes() {
    return {
      ...super.getRoutes(),
      '/test': TestApi,
      // '/auth': AuthApi,
      // '/grant': GrantApi,
      // '/upload': UploadApi,
      // '/permit': PermitApi,
      // //
      '/users?': UserApi,
      // '/admin': AdminApi,
      // '/bots': BotsApi,
      '*': (req) => {
        throw new Err('E_404', {
          status: 404,
          message: `Not found path ${req.path}`,
          path: req.path,
        });
      },
    };
  }
}
