1. Когда появились функциональные компоненты

Функциональные компоненты (stateless functional components) существовали ещё с React 0.14 (2015) — но тогда они были просто «тупыми» компонентами без состояния и без хуков.

Хуки (которые сделали функциональные компоненты полноценной заменой классов) появились в React 16.8 (февраль 2019).

Именно с хуков (useState, useEffect, useContext и т.д.) функциональные компоненты стали способными управлять состоянием и жизненным циклом, т.е. полноценной альтернативой классам.

🧠 2. Почему появились функциональные компоненты

Причины появления — упрощение, производительность, читаемость и переиспользуемость логики.

Классовые компоненты были громоздкими:

this, constructor, bind, lifecycle methods (componentDidMount, componentWillUnmount, и т.п.)

Трудно делиться логикой между компонентами (нужны HOC или render props).

Функциональные компоненты:

Компактнее и проще в синтаксисе.

Не нужно this.

С хуками стало легко делиться логикой состояния — через кастомные хуки.

Проще для компиляции и оптимизации React'ом (особенно с React Compiler / concurrent features).

⚖️ 3. Плюсы и минусы классовых vs функциональных компонентов
💡 Критерий	🧱 Классовые	⚙️ Функциональные
Состояние	Через this.state и setState()	Через useState и др. хуки
Жизненный цикл	componentDidMount, componentDidUpdate, componentWillUnmount	useEffect объединяет весь lifecycle
this	Нужно биндинг и понимание контекста	this нет вообще
Реиспользуемость логики	HOC / Render props (громоздко)	Кастомные хуки (чисто и удобно)
Производительность	Сложнее оптимизировать, но стабилен	Быстрее при ререндере, но возможны ловушки с хуками
Обратная совместимость	Старый код часто на классах	Новый код — почти весь на функциях
Поддержка React будущего (RSC, concurrent)	Ограниченная	Полная

Минусы функциональных:

Возможны бесконечные ререндеры при неправильных зависимостях useEffect.

Замыкания (closures) могут привести к «устаревшим значениям» (stale state).

Хуки требуют дисциплины и понимания правил (Rules of Hooks).

⚛️ 4. React Server Components (RSC)
💥 Что это вообще

React Server Components (RSC) — это новый тип компонентов, которые выполняются на сервере, а не в браузере.
Введены в React 18 и Next.js 13+ (App Router).

📍 Основные принципы

RSC не попадают в бандл браузера → уменьшают размер JS.

Они могут напрямую читать из БД или API без fetch.

Могут рендерить клиентские компоненты внутри себя.

Не имеют состояния, эффектов и браузерных API (DOM недоступен).

Обновляются частично (streaming / selective hydration).

📘 Пример
// app/page.tsx (Server Component)
import { getUser } from '@/lib/db';
import UserProfile from './UserProfile';

export default async function Page() {
  const user = await getUser();
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <UserProfile user={user} /> {/* Client Component */}
    </div>
  );
}

// app/UserProfile.tsx (Client Component)
'use client';

import { useState } from 'react';

export default function UserProfile({ user }) {
  const [likes, setLikes] = useState(0);
  return (
    <div>
      <p>{user.email}</p>
      <button onClick={() => setLikes(likes + 1)}>👍 {likes}</button>
    </div>
  );
}

🔄 Как они работают под капотом

RSC рендерится на сервере → React отправляет дерево JSON-описаний компонентов клиенту.

Клиент React восстанавливает дерево, объединяя серверные и клиентские компоненты.

RSC не блокируют интерактивность — всё можно стримить частями (React Streaming).

💬 Частые вопросы про RSC
❓ Вопрос	✅ Краткий ответ
Где выполняются RSC?	На сервере (Node.js, edge и т.д.)
Можно ли в RSC использовать useState или useEffect?	Нет, только в client-компонентах
Как обозначить client-компонент?	'use client' в первой строке
Можно ли вызывать API прямо из RSC?	Да, даже из БД напрямую
Как смешивать серверные и клиентские?	Серверные могут импортировать клиентские, но не наоборот
Как передаются пропсы клиентским компонентам?	Через сериализацию в JSON
Как RSC ускоряют приложение?	Меньше JS в браузере, SSR + Streaming + меньше fetch'ей
🌐 5. Всё, что нужно знать о Next.js (актуально для senior собеса)
🔧 Архитектура Next.js

SSR (Server-Side Rendering) — страница рендерится на сервере каждый раз при запросе.

Функция: getServerSideProps.

Используется для часто меняющихся данных (новости, личные кабинеты).

SSG (Static Site Generation) — страница собирается один раз при билде.

Функция: getStaticProps.

Подходит для статичных страниц (блог, документация).

ISR (Incremental Static Regeneration) — гибрид между SSR и SSG.

Страница генерируется как статическая, но может перегенерироваться каждые N секунд.

Параметр: revalidate: 60.

RSC + App Router (Next 13+)

app/ директория — это новый способ маршрутизации с React Server Components.

Больше не нужны getStaticProps и getServerSideProps — данные берутся напрямую в async-компонентах.

⚙️ Примеры

SSR (pages/):

export async function getServerSideProps() {
  const data = await fetch('https://api.example.com/data').then(r => r.json());
  return { props: { data } };
}


SSG (pages/):

export async function getStaticProps() {
  const data = await fetch('https://api.example.com/data').then(r => r.json());
  return { props: { data }, revalidate: 60 }; // ISR
}


App Router (Next 13+):

// app/page.tsx
export default async function Page() {
  const data = await fetch('https://api.example.com/data', { cache: 'no-store' });
  return <div>{data.title}</div>;
}

💬 Частые вопросы на собесе по Next.js
❓ Вопрос	✅ Ответ
В чём отличие SSR от SSG?	SSR — рендер на каждый запрос; SSG — рендер один раз при билде
Что делает ISR?	Позволяет обновлять статические страницы по расписанию
Что делает getServerSideProps?	Выполняется на сервере при каждом запросе, возвращает props
Где выполняется getStaticProps?	На сервере при билде
Как кешировать fetch в App Router?	Через опции cache, revalidate, next: { revalidate }
Можно ли использовать RSC с API?	Да, напрямую, без fetch к API-роутам
Что такое Layouts и как они работают?	Layouts — persist layout между страницами, могут быть server components
Чем App Router лучше Pages Router?	RSC, стриминг, nested layouts, no getStatic/ServerSideProps, гибкость