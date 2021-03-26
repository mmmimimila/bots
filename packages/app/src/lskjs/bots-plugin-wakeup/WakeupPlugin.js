import BaseBotPlugin from '@lskjs/bots/plugins/BaseBotPlugin';
import useForm from '@lskjs/bots/utils/useForm';

const formSchema = {
  title: 'Регистрация на мероприятие',
  controls: {
    name: {
      // title: 'Имя',
      // placeholder: 'Введите свое имя',
    },
    time: {
      title: 'Время',
      placeholder: 'Введите время (МСК), до которого вы хотите проснуться в формате HH:MM',
      format: (str) => {
        if (typeof str === 'string') {
          const [hours, minutes] = str.split(':');
          return Number(hours) * 60 + Number(minutes);
        }
        return Number(str);
      },
      validate: (value) => value >= 0 && value < 24 * 60,
    },
    price: {
      title: 'Цена слова',
      placeholder: 'Введите ЦС (цену слова в рублях руб) в формате XXXXX',
      format: Number,
      validate: (value) => value > 0 && value < 10000,
    },
  },
  // fields: ['name'],
  fields: ['name', 'time', 'price'],
};

export default class WakeupPlugin extends BaseBotPlugin {
  providers = ['telegram'];
  getRoutes() {
    return [
      {
        path: '/checkin',
        action: async ({ req }) => {
          return useForm({
            req,
            ...formSchema,
            onSubmit: async (values) => {
              console.log({ values });
            },
          });
        },
      },
      {
        path: '/checkout',
        action({ bot, ctx }) {
          bot.reply(ctx, 'Спасибо что были с нами');
        },
      },
    ];
  }
}
