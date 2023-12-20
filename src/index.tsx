import React from 'react'
import { Provider } from 'react-redux'

import ReactDOM from 'react-dom/client'

import 'styles/index.scss'

import { App } from './App'
import reportWebVitals from './reportWebVitals'
import { store } from './store'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

/*
Разработать одностраничное приложение на React.js (SPA): текстовый редактор заметок с тегами.

Функционал:
1. Создание, редактирование, удаление заметок;
2. Просмотр списка заметок;
3. Во время создания и редактирования заметки пользователь может создавать теги,
используя символ # (Например, пользователь вводит текст “I wanna go to #shop tomorrow”.
По мере ввода должен создаться соответствующий тег и отобразиться в списке под текстовым полем.
 При редактировании заметки все слова, соответствующие тегам, должны подсвечиваться, т.e. “I wanna go to #shop tomorrow”);
4. Фильтр заметок по тегу - пользователь должен иметь возможность выбрать один или несколько тегов из существующих и по ним отфильтровать список заметок;
5. При перезагрузке страницы заметки должны сохраняться (Например, хранить в IndexedDb).

Технические требования:
1. React.js hooks;
2. Использование TypeScript;
3. Использование UI библиотек (Например, Material UI, Ant design);
4. Использовать стейт менеджер (Например, Redux, MobX, прочее);
5. Залить на гит (Публичный репозиторий);
6. Залить на хост (Netlify, Github pages, прочее).

 */
