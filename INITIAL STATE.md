# Initial stage of bot
### Based on [LSK.js — BotKit](https://git.isuvorov.com/lskjs/bot-kit)
## Подготовка
1. Создать репозиторий на git.isuvorov.com (запросить у ПМ)
2. Создать БД (запросить у Игоря)
3. Зарегистрировать бота. Запросить у ПМ, либо использовать BotFather. 
Настроить параметры конфиденциальности у бота:

`/mybots` => **bot_name** => Bot Settings => 

1) => Allow Groups? => *"Groups are currently **enabled** for bot_name.."*

2) => Group Privacy => *"Privacy mode (https://core.telegram.org/bots#privacy-mode) is **disabled for** bot_name.."*
4. Добавить бота в чат

## Подготовка репозитория

1. Склонировать бот-кит открыть его директорию

`git clone ssh://git@git.isuvorov.com:222/lskjs/bot-kit.git` 
`cd bot-kit/`

2. Удалить привязку к гиту бот-кита 

`sudo rm -rf .git`

3. Инициализировать гит в проекте 

`git init` 

`git remote add origin ssh://git... (тут должен быть гитовский путь до репо к которому привязываем)`

4. Создать конфиг файл и заполнить его 

`touch .env.js`

 Содержимое файла `.env.js` заполнить кредами полученными на предыдущем этапе:

```js
module.exports = {
  db: {
    uri: 'mongodb://lsk:tratata@mongo.isuvorov.com:27000/lsk',
  },
  bots: {
    providers: {
      telegram: {
        provider: 'telegram',
        token: '1171614629:tratata',
        username: 'lskitbot',
      },
    }
  }
}
```

5. `npm i` — установить пакеты 
6. `npm run bootstrap` — установить зависимости 
7. `npm run dev` — запустить в режиме разработки. Должна открыться админ.панель в браузере на localhost:3000
8. В файле `.gitlab-ci.yml` указать домен (из карточки трелло):

```js
include:
  - project: devops/test
    file: /lskjs/workflow-dev.yml

build:
  variables:
    NODE_OPTIONS: --max_old_space_size=8000

.deploy-dev:
  variables:
    VIRTUAL_HOST: Host('ваш-bot.isuvorov.ru' )
  environment:
    name: dev
    url: https://ваш-bot.isuvorov.ru
```

## Deployment

1. Создать конфиг в репо. В Settings -> CI/CD -> Variables -> Expand -> Add Variable
```
 Key: dev_env_js
 Value: скопировать содержимое файла .env.js
 Type: File
 ```
2. Запушить код в репозиторий

3. В чате с ботом использовать команду /chatid, если отдает ChatId, то готово!

## Trouble Shooting

#### В случае ошибок с DebugPlugin

```
cd packages/app
npm run update
```
 ### Создание недостающей папки при ошибках запуска 

```
mkdir ../public/assets
```
### Ошибки билда

В `packages/app/package.json` из **devDependencies** в **dependencies** перенести `react-icons2` и снова запушить

### Бот в чате не реагирует на команду

После изменений его настроет удалить и добавить его в чат 