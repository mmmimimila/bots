import sample from 'lodash/sample';
import BaseBotPlugin from '@lskjs/bots/plugins/BaseBotPlugin';

const azazaMessages = [
  'очень весело',
  ')))))))))))))))))))))))))))))))))))))))))))))))',
  'ахаха ахаха ахаха',
  '😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂',
  'азаза просто',
  ':DDDDDDDDDDDDDDDDDDDDDDDDDDD',
  'x-DDDDDDDDDDDDDDDDDDDDDDDDDDD',
];

const antonsMessages = [
  'Борисович',
  'криптобаронс',
  'странствующий программист',
  'поменяй A и B без переменной',
  'пиши в двух словах "s" - так надежнее',
  'ел. Охуеные фисташки, прямо заебись',
  'Короче, здесь весело. Можно послушать охуенные аудиоспектакли, послушать охуенные истории Антонса @antouhou про то как какая-то телка брила свою пизду в лесу и смотрела на него, про всякие NDA о которых ничего не известно, про шестизначные зарплаты, и тому подобное, про bem + react, про миллионные выборки из mysql баз и не только, про то что mongo это говно которое на надо использовать, и еще куча, куча, КУЧА ИНТЕРЕСНОСТЕЙ.\
\
НЕ ПЕРЕКЛЮЧАЙТЕСЬ.',
];

const boobsMessages = ['BQADAgADAgIAAhC6EgABOZ7L55JaKysC'];

const babayanMessages = [
  'зачем это здесь?',
  'БАЯН!',
  'В прошлом веке кидали уже',
  'Кого ты этим хотел удивить?',
  'Все уже видели',
  'Зачем такое вообще постить?',
  'Смщная картинка? Чот не весело...',
  'КГ/АМ',
  'аффтар жжошь',
  'баянище',
  'ну это ваще баян',
  'За тобой уже выехали...',
];

const bratishkaMessages = [
  'да-да?',
  'кто меня звал?',
  'да чего сразу братишка?',
  'да, я крутой',
  'не братишка ты мне, петух',
];

const percentProbability = (a) => Math.random() * 100 < a;

const jsMessages = [
  'CAADAQAD_gIAAnTnKwIX_7XQo_4iNAI',
  'CAADAQADGgMAAnTnKwLmqhhn5jh30QI',
  'CAADAgADhQADEAcEAAFWHmZsoJ1P9AI',
  'CAADAgADgwADEAcEAAHJD8rBoTPxnAI',
  'CAADAQAD0gIAAnTnKwIbvHBCcCfnaAI',
  'CAADAQADXgIAAnTnKwLZQrbwbrLO_gI',
  'CAADAQADdAIAAnTnKwKks-io2cdZYwI',
  'CAADAQADhwIAAnTnKwJXVA0poaqG4wI',
  'CAADAQADVgIAAnTnKwIvX-j-bpQTmwI',
  'CAADAgADSAMAAswJPAb82xsr_NCvTQI',
  'CAADAgADRgMAAswJPAaflgVlsoibuAI',
];

const satanStickers = [
  'CAADAgAD5AIAAn-zKAvIZj1nxOWI3gI',
  'CAADAgADDQADFgqsEBPksgi8lxcaAg',
  'CAADAgAD8wADnNbnCipVHrwYCu1SAg',
  'CAADAgADiAADT4F2CUt4D5jwz-QOAg',
  'CAADAQADagwAAtpxZgeliZcVA8gcEQI',
  'CAADAQADYgwAAtpxZgeDcN_gTrVjvQI',
  'CAADAQADRAwAAtpxZgeTJuYR-0zD4wI',
  'CAADAQADUgwAAtpxZgdR49O4lUJEXwI',
  'CAADAQADXAwAAtpxZgcSyCEgE1sSEQI',
  'CAADAQADWAwAAtpxZgdICwOXTwE3OwI',
  'CAADAQADbAwAAtpxZgcRT2e3vbMuWAI',
  'CAADAgADKwEAApzW5wp__qM67wEz8gI',
  'CAADAgADOwMAAn-zKAtsON4qTs3_zwI',
  'CAADAgAD5gIAAn-zKAtJNzjmq1a9mwI',
  'CAADAgADNQMAAn-zKAsLna_yt9NFPwI',
  'CAADAgAD6AIAAn-zKAvjFJLTH-_T8AI',
  'CAADAgAD1gIAAn-zKAtDnjywFSLe_QI',
];

const satanMessages = [
  'ВО СЛАВУ САТАНЕ, КОНЕЧНО!',
  'ВО СЛАВУ АЛЛАХА, КОНЕЧНО!',
  'ВО СЛАВУ ИИСУСА, КОНЕЧНО!',
  'ВО СЛАВУ БУДДЫ, КОНЕЧНО!',
];

const gayMessages = [
  // Взял гифки из логов, хз что там в них
  'CgACAgIAAxkBAAPuX3X4O9WVmgj-Pi3u62eZLk85ttsAAjADAALf4XlKsHszEIpw-XQbBA',
  'CgACAgQAAxkBAAPvX3X4YUsVwb4tKJKCi3lzlIV0dyEAAlAYAAIeGWQHutzIMmhk56obBA',
  'CgACAgQAAxkBAAPwX3X4dvab3EgzeSR7alDkv0FTn3wAAhoFAALGF2QHWSdNopXVBWUbBA',
  'CgACAgIAAxkBAAPzX3X4piFjSdJNZMLoA__1i98xp0cAAqICAALyzwhISzoqurIK2iobBA',

  // 'CgADAgADogIAAvLPCEhv8LYMDZzZHQI',
  // 'CgADBAADzKkAAt4cZAfc21j3XfislgI',
  // 'CgADBAADyGIAAiMZZAcdNDAPXJUK9QI',
  // 'CgADAgADwgMAAkRpMUhMVDHg1UOsqAI',
  // 'CgADBAADqAADdy0EUpJ6qP7lnNhwAg',
  // 'CgADAgADwwEAAliJeUsa1NZsh1pZMgI',
  // 'CgADBAADGgUAAsYXZAe9x3bykoXNwgI',
  // 'CgADAgADoAIAAvLPCEjhMDHWvwbHDAI',
  // 'CgADAgADnwIAAvLPCEiDVzs9IxYcaQI',
];

const girlsMessages = [
  'CgACAgIAAxkBAAPqX3X3vqg9ShZqLws5MGbFAAEqBqWxAALDAQACWIl5SxEtXGPaloQnGwQ',
  'CgACAgIAAxkBAAPpX3X3u51WcVXX8vf11TIegOJv9DsAAp8CAALyzwhIMuZq2UuKmAMbBA',
  'CgACAgIAAxkBAAPoX3X3t3SvwZQPCRwE4CEe2-Iyg5gAAqACAALyzwhIFXlrst1RBL0bBA',
  'CgACAgIAAxkBAAPyX3X4jGDKoiaaSJjU2fR0M5H3_aUAAkQCAAIWjiFL7Nk9DpRw584bBA',
];
const ferretsMessages = [
  'CgACAgQAAxkBAAPsX3X3ypgnYoXhVhunTWnbkwacw-MAAsFhAAJbHGQHqcPTxCFJP4wbBA',
  'CgACAgQAAxkBAAP2X3X4_Ba7-Br6ZNhSEcPNOz3SUEAAAshiAAIjGWQHb3fa3lScW4cbBA',
];
const memsMessages = [
  'CgACAgIAAxkBAAPrX3X3xB0bOF_8RQHe4jtbIv6XTl4AAgUCAAJExqFIARJaAj1VpskbBA',
  'CgACAgQAAxkBAAPtX3X4JYNaq573dULDKpTjwLSR5WQAAuGfAAL2F2QH5ZX-AShGzLQbBA',
];

// const wordBoundary = (text, word) => {
//   const nonLetter = '[^a-zA-Zа-яА-ЯёЁ0-9]';
//   text.toLowerCase();
//   const regExp = new RegExp(`\\s${word}\\s`, 'g');
//   text = text.replace(new RegExp(this.nonLetter, 'g'), ' ');
//   text = ` ${text} `;
//   return text.match(regExp);
// };

export default class BratishkaPlugin extends BaseBotPlugin {
  providers = ['telegram', 'discord'];
  runBot(bot) {
    bot.on('message', async (message) => {
      if (bot.getMessageType(message) === 'photo') {
        if (percentProbability(5)) {
          bot.sendMessage(message, sample(babayanMessages));
          return bot.sendSticker(message, 'CAADAgADcAUAAhC6EgABord0yKqaTVUC');
        }
      }
      if (bot.isMessageContains(message, /братишк(а|и)/)) {
        return bot.sendMessage(message, sample(bratishkaMessages));
      }
      if (bot.isMessageContains(message, /бра(т|тан|тишка)/)) {
        if (bot.isMessageContains(message, 'братан')) {
          return bot.sendMessage(message, 'Братишка');
        }
        if (bot.isMessageContains(message, 'брат')) {
          // wordBoundary(text, 'брат')
          return bot.sendMessage(message, 'Братан братишка');
        }
      }
      if (bot.isMessageContains(message, /mobx|typescript|backbone|angular|erlang/) && percentProbability(50)) {
        return bot.sendSticker(message, sample(jsMessages));
      }
      if (bot.isMessageContains(message, /пидора ответ/)) {
        return bot.sendMessage(message, sample(['Шлюха.']));
      }
      if (bot.isMessageContains(message, /гей|пидор|pidor|секс|хуй|стоял/)) {
        return bot.sendDocument(message, sample(gayMessages));
      }
      if (bot.isMessageContains(message, /хорь|хорёк|хорек/)) {
        return bot.sendDocument(message, sample(ferretsMessages));
      }
      if (bot.isMessageContains(message, /антонс/)) {
        return bot.sendMessage(message, sample(antonsMessages));
      }
      if (bot.isMessageContains(message, /сис(ек|ьки|ечки|и|яндры)/)) {
        return bot.sendSticker(message, sample(boobsMessages));
      }
      if (bot.isMessageContains(message, /бабы/)) {
        return bot.sendDocument(message, sample(girlsMessages));
      }
      if (bot.isMessageContains(message, /\){4,}/)) {
        if (percentProbability(50)) {
          return bot.sendDocument(message, sample(memsMessages));
        }
        return bot.sendMessage(message, sample(azazaMessages));
      }
      if (bot.isMessageContains(message, /(день|завтра)/) && bot.getMessageDate(message).getDay(1)) {
        return bot.sendMessage(message, 'О! Да завтра же вторник! ПОШЛИТЕ БУХАТЬ!');
      }
      if (bot.isMessageContains(message, /(день|сегодня)/) && bot.getMessageDate(message).getDay(2)) {
        bot.sendDocument(message, 'CgACAgQAAxkBAAP1X3X4xdDbRrECLe5EM_IkODyLSFAAAu4BAAL7d-VRgKZs7LIkdeobBA');
        return bot.sendMessage(message, 'О! Да сегодня же вторник! ИДЕМ БУХАТЬ!');
      }
      if (bot.isMessageContains(message, /вторник/)) {
        return bot.sendMessage(message, 'О! идем бухать!');
      }
      if (bot.isMessageContains(message, /пизда/)) {
        return bot.sendDocument(message, 'CgACAgIAAxkBAAP3X3X5PSVraOmV1riiXfe0Fdd_pb8AAgICAALC8qlI2bbqWKuV52EbBA');
      }
      if (bot.isMessageContains(message, /(проиграл)/)) {
        return bot.sendMessage(message, 'а я выиграл');
      }
      if (bot.isMessageContains(message, /(выиграл)/)) {
        return bot.sendMessage(message, 'иди нахуй');
      }
      if (bot.isMessageContains(message, /зачем/) && percentProbability(50)) {
        bot.sendMessage(message, sample(satanMessages));
        return bot.sendSticker(message, sample(satanStickers));
      }
      if (bot.isMessageContains(message, / да /)) {
        return bot.sendMessage(message, sample(['Нет.', 'нет']));
      }
    });
  }
}
