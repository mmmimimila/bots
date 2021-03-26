import Module from '@lskjs/upload/client';
import Promise from 'bluebird';

export default class UploadClientModule extends Module {

  async uploadFiles(files) {
    if (typeof window === 'undefined') throw '!FormData';
    console.log({files});
    
    return Promise.map(files, file => this.uploadFile(file));
  }
  async uploadFile(file) {
    if (typeof window === 'undefined') return false;
    const { FormData } = window;
    const data = new FormData();
    data.append('file', file);
    console.log('this.app.apiq', this.app.apiq);
    console.log('this.app', this.app);
    
    const res = await this.app.apiq.post('/api/upload/file', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  }
}
