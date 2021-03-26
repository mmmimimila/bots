import getRules from './getRules';

export default [
  () => import('@lskjs/grant/server'),
  {
    getRules,
  },
];
