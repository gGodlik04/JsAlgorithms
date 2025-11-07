1. Что такое классовый компонент — кратко и по делу

Классовый компонент — это JS-класс, наследующий React.Component (или React.PureComponent), который реализует метод render() и опционально lifecycle-методы. Вёрстка создаётся в render, локальное состояние хранится в this.state, а изменения — через this.setState().

import React from 'react';

class MyComponent extends React.Component {
constructor(props) {
super(props);
this.state = { count: 0 };
this.handleClick = this.handleClick.bind(this);
}

handleClick() {
this.setState((prev) => ({ count: prev.count + 1 }));
}

render() {
return <button onClick={this.handleClick}>{this.state.count}</button>;
}
}

2. Жизненный цикл (lifecycle) — подробная схема и порядок

Важно знать полный порядок вызовов и различия между mount/update/unmount, а также новые (последние) безопасные хуки классов:

Mount:

constructor(props) — инициализация state, биндинг.

static getDerivedStateFromProps(props, state) — статический метод, синхронизация state с props (редко нужен).

render()

componentDidMount() — здесь side-effects, запросы, подписки.

Update (при изменении props или state):

static getDerivedStateFromProps(props, state) — вызывается перед render.

shouldComponentUpdate(nextProps, nextState) — можно вернуть false для пропуска render.

render()

getSnapshotBeforeUpdate(prevProps, prevState) — возвращает «снимок» (например, scroll position).

componentDidUpdate(prevProps, prevState, snapshot) — side-effects после обновления; snapshot доступен.

Unmount:

componentWillUnmount() — очистка подписок, таймеров, отмена запросов.

Ошибки:

componentDidCatch(error, info) + static getDerivedStateFromError(error) — реализация error boundary.

Deprecated / unsafe:

componentWillMount, componentWillReceiveProps, componentWillUpdate — заменены и помечены как UNSAFE\_... (не рекомендованы).

3. constructor, state, setState — тонкости

constructor нужен только если вы инициализируете state или биндите методы.

this.state — обычный объект. setState шаблонно объединяет (shallow merge) новый объект в state: this.setState({ a: 1 }) — не перезаписывает весь state, а объединяет верхний уровень.

setState — асинхронен; используйте функциональную форму при вычислении от предыдущего состояния:

this.setState(prev => ({ count: prev.count + 1 }));

Пакетирование (batching): React может группировать несколько setState в один render. На собесе могут спросить про поведение в event handler vs setTimeout vs lifecycle.

4. Refs — способы и назначение

React.createRef() (современный):

class C extends React.Component {
constructor() {
super();
this.inputRef = React.createRef();
}
focus() { this.inputRef.current.focus(); }
render(){ return <input ref={this.inputRef} />; }
}

Callback refs:

<input ref={el => (this.input = el)} />

findDOMNode — устарел (не для strict mode).

Ref к классовому компоненту даёт экземпляр компонента (this), к DOM — DOM-элемент.

Forwarding refs: для HOC можно пробросить ref через React.forwardRef (чаще в функциональных компонентах), но знать принцип полезно.

5. Context в классах

static contextType = MyContext — удобный доступ this.context.

Или <MyContext.Consumer>{value => ...}</MyContext.Consumer> в render.

Важно: при использовании contextType обновления происходят нормально, но если нужно читать несколько контекстов — используйте Consumer.

6. Error boundaries

Классовые компоненты — единственный способ создавать error boundary:

class ErrorBoundary extends React.Component {
state = { hasError: false };
static getDerivedStateFromError() { return { hasError: true }; }
componentDidCatch(error, info) { /_ логирование _/ }
render() { return this.state.hasError ? <Fallback/> : this.props.children; }
}

7. Производительность и оптимизация

shouldComponentUpdate(nextProps, nextState) — ручная оптимизация (сравнение props/state).

React.PureComponent — реализует поверхностное сравнение (shallow comparison) для props и state.

Избегайте создания новых функций/объектов в render (каждый рендер — новая ссылка — приводит к лишним обновлениям дочерних PureComponent).

key на списках важен для корректного diff; неправильный key — баги в state дочерних.

Мемоизация: кэшируйте вычисления вне render (например, используя поля класса или memo в функциональных).

Virtualize большие списки (react-window/react-virtualized).

forceUpdate() иногда используется, но это «плохой» паттерн — объясните почему.

8. Шаблоны композиции

HOC (Higher-Order Components) — функция, возвращающая компонент, использует рефы и передачу пропсов.

Render props — компонент принимает функцию, возвращающую элементы.

Compound components — управление вложенными компонентами через context.

Controlled vs Uncontrolled компоненты — объяснить разницу, когда использовать refs (uncontrolled), когда state/props (controlled).

9. Взаимодействие с функциями/хуками (interop)

Классовые компоненты не могут использовать хуки напрямую.

Можно смешивать приложение: классовые и функциональные компоненты могут сосуществовать.

Для использования логики hook-стиля в классах: вынести логику в HOC или render prop.

10. Тестирование классовых компонентов

Enzyme (если в проекте) — позволяет инстанциировать компонент, вызывать lifecycle вручную и читать instance().

React Testing Library — тесты ориентированы на поведение, не на реализацию (рекомендуется).

На собесе проверяют: мокирование lifecycle, тесты для error boundaries, проверка вызова side-effects в componentDidMount/componentDidUpdate.

11. Типичные вопросы на собесе (и как отвечать — кратко)

Чем PureComponent отличается от Component?
PureComponent делает поверхностное сравнение props/state в shouldComponentUpdate. Хорош для простых immutable props.

Почему setState асинхронен?
Для производительности React может батчить обновления; поэтому расчёты от предыдущего state должны использовать функциональную форму.

Когда использовать getDerivedStateFromProps?
Редко. Только для синхронизации state с props, когда невозможно выразить через props. Частая альтернатива — вычислять значения в render или использовать controlled-pattern.

Что делает getSnapshotBeforeUpdate?
Возвращает snapshot (например, позицию скролла) перед DOM-обновлением; доступен в componentDidUpdate.

Как реализовать error boundary?
Классовый компонент с getDerivedStateFromError/componentDidCatch.

Что такое «UNSAFE\_» методы?
Старые lifecycle, которые вызывают баги при async rendering — их используют только в legacy коде.

12. Частые ошибки / «ловушки» (примеры)

Использовать this.setState({count: this.state.count + 1}) в цикле — баг при асинхронности; нужно prev => ({count: prev.count + 1}).

Проталкивать большие объекты в state и мутировать их (нарушает соглашение immutable, приводит к багам в PureComponent).

Создавать анонимные функции в render — приводит к лишним рендерам дочерних PureComponent.

Неправильно использовать key в списках (index как key при изменяемых списках — приводит к неверным маппингам).

13. Миграция к функциональным компонентам (на собесе могут спросить)

Основные отличия: хуки дают локальные состояния и эффекты без классов. При миграции нужно обратить внимание на:

componentDidMount → useEffect(..., [])

componentDidUpdate → useEffect с зависимостями

getDerivedStateFromProps — часто устраняется пересчётом в render или useMemo

Error boundaries пока только классовые (но есть сторонние решения)

Важно знать, как переписать class→hooks (особенно сложную логику с множественными lifecycle).

14. Полезные примеры кода (концентрированные, «готовые» фрагменты)

Функциональная форма setState + отмена подписки

class Timer extends React.Component {
state = { seconds: 0 };

componentDidMount() {
this.id = setInterval(() => {
this.setState(prev => ({ seconds: prev.seconds + 1 }));
}, 1000);
}

componentWillUnmount() {
clearInterval(this.id);
}

render() {
return <div>{this.state.seconds}</div>;
}
}

shouldComponentUpdate vs PureComponent

class List extends React.Component {
shouldComponentUpdate(nextProps) {
return nextProps.items !== this.props.items; // сравнение по ссылке
}
}

// или проще:
class ListPure extends React.PureComponent {}

Error boundary
(см. раздел 6 — коротко реализовано там)

15. Подготовка к собесу: чеклист для тренировки

Понимать lifecycle в деталях: mount/update/unmount, порядок вызовов.

Уметь объяснить setState (merge vs replace), functional setState, batching.

Уметь писать/разбирать shouldComponentUpdate и PureComponent.

Писать error boundary и объяснять, почему оно только в классах.

Практиковаться в решении задач: «исправь баг связанный с ключами», «оптимизируй компонент, который ререндерится часто».

Понимать взаимодействие с контекстом и refs.

Уметь аргументировать миграцию в hooks (когда лучше переписать, когда оставить).

16. Примеры вопросов «на подумать» (для тренировки)

Почему getDerivedStateFromProps — плохое место для сетевых запросов?

Объясните поведение двух подряд setState вызовов в event handler и в setTimeout.

Как реализовать debounced input с классом?

Как прокинуть ref через HOC?

Почему componentWillUnmount — хорошее место для очистки, а не componentDidUpdate?

17. Заключение + небольшая шпаргалка

Классы — всё ещё валидная часть React, на собеседованиях часто проверяют базу: lifecycle, setState, refs, context, error boundaries, оптимизация.

На сеньорские интервью важно не только знать синтаксис, но и уметь объяснить trade-offs (почему getDerivedStateFromProps — плохой паттерн vs controlled components; когда PureComponent помогает, а когда вводит баги).

Практикуйся в коротких задачах: рефакторинг багов, оптимизация, добавление error boundary, миграция контролируемого компонента в класс.

---

🧩 1) Почему иногда не используют constructor, а пишут state = {}?

Оба способа валидны.
Разница только в синтаксисе, а не в логике.

Старый способ (ES5/ES6)
class MyComponent extends React.Component {
constructor(props) {
super(props);
this.state = { count: 0 };
}
}

Современный (class fields syntax)
class MyComponent extends React.Component {
state = { count: 0 };
}

📘 Разница:

В современном синтаксисе Babel/TypeScript под капотом всё равно вставляют this.state = ... в начале конструктора.

Если тебе не нужно биндить методы или использовать props в state, можно смело использовать state = {}.

Если тебе нужно this.state и this.handleClick.bind(this) — конструктор обязателен.

🧩 2) Зачем bind в конструкторе?

Когда метод класса передаётся как callback (например, onClick={this.handleClick}), теряется контекст this, потому что this не привязан автоматически в JS-классах.

class Button extends React.Component {
constructor() {
super();
this.state = { count: 0 };
this.handleClick = this.handleClick.bind(this);
}

handleClick() {
this.setState({ count: this.state.count + 1 });
}

render() {
return <button onClick={this.handleClick}>{this.state.count}</button>;
}
}

Без bind → this будет undefined внутри handleClick.

Альтернатива — стрелочная функция как метод класса:
handleClick = () => {
this.setState({ count: this.state.count + 1 });
}

Стрелочные функции сохраняют контекст this автоматически.
Поэтому в современном коде bind почти не используют.

🧩 3) Зачем нужен getDerivedStateFromProps?

Метод синхронизирует state с props.
Но это почти всегда антипаттерн, потому что можно вычислить нужное прямо в render.

Пример (редкий допустимый случай):

class Clock extends React.Component {
state = { timezoneOffset: 0 };

static getDerivedStateFromProps(props, state) {
if (props.timezone !== state.prevTimezone) {
return {
timezoneOffset: props.timezone.offset,
prevTimezone: props.timezone,
};
}
return null;
}
}

Здесь state зависит от props — если props изменились, обновляем state.

⚠️ Антипаттерн — потому что легко создать «несинхронизированное» состояние, когда props поменялись, а ты не обновил state.

Лучше вычислять прямо в render:

render() {
const offset = this.props.timezone.offset;
}

🧩 4) Когда происходит update помимо изменения props или state?

Вызов forceUpdate() (форсит перерендер без изменения state/props).

Обновление context’а, если компонент использует contextType или Consumer.

Если родитель перерендерился, и компонент не оптимизирован (shouldComponentUpdate не блокирует).

🧩 5) Что делает getSnapshotBeforeUpdate

Этот метод вызывается перед тем, как изменения будут отражены в DOM, и позволяет получить «снимок» DOM-состояния.

Пример: сохраняем позицию скролла перед обновлением списка.

class Chat extends React.Component {
getSnapshotBeforeUpdate(prevProps, prevState) {
if (prevProps.messages.length < this.props.messages.length) {
const chat = this.chatRef.current;
return chat.scrollHeight - chat.scrollTop;
}
return null;
}

componentDidUpdate(prevProps, prevState, snapshot) {
if (snapshot !== null) {
const chat = this.chatRef.current;
chat.scrollTop = chat.scrollHeight - snapshot;
}
}

render() {
return <div ref={this.chatRef}>...</div>;
}
}

🧩 6) Batching в классовых компонентах

Batching (группировка обновлений) — React объединяет несколько setState в один render для оптимизации.

До Fiber (React <16)

Batching происходил только внутри синхронных React event handlers.
В setTimeout или Promise обновления выполнялись по одному.

После Fiber (React 16+)

Fiber ввёл асинхронный reconciliation, но batching остался в синхронных event'ах.
Только с React 18 появился automatic batching — теперь batching работает везде, включая async вызовы.

handleClick = () => {
this.setState({ a: 1 });
this.setState({ b: 2 });
console.log(this.state); // старое состояние (batching)
};

В setTimeout до React 18:

setTimeout(() => {
this.setState({ a: 1 });
this.setState({ b: 2 });
// два рендера
});

С React 18 — один render.

🧩 7) Поведение setState в event handler vs setTimeout vs lifecycle
Место вызова batching когда применится state
event handler (React synthetic) ✅ да после выхода из handler
lifecycle метод ✅ да после выхода из метода
setTimeout / Promise ❌ (до 18) / ✅ (с 18) сразу после вызова

Пример вопроса:

Почему console.log(this.state) после this.setState() выводит старое значение?

Ответ: потому что setState асинхронен и React применяет изменения в батче после выполнения event handler.

🧩 8) Что такое findDOMNode

Метод ReactDOM.findDOMNode(this) возвращает DOM-элемент, соответствующий компоненту.
⚠️ Устарел, не работает в Strict Mode.

Пример:

componentDidMount() {
const el = ReactDOM.findDOMNode(this);
console.log(el); // <div>...</div>
}

Лучше использовать ref.

🧩 9) Callback refs

Это старый способ назначить ref:

<input ref={el => (this.input = el)} />

React вызывает функцию дважды:

С el при монтировании

С null при размонтировании

В функциональных компонентах вместо этого — useRef.

🧩 10) Что такое PureComponent

PureComponent — это Component с уже реализованным shouldComponentUpdate, который делает поверхностное сравнение (shallow compare) props и state.

class MyComponent extends React.PureComponent {}

⚠️ Работает только при иммутабельных данных (новая ссылка при изменении).

🧩 11) Почему нельзя создавать новые функции/объекты в render

Потому что при каждом рендере создаётся новая ссылка, и дочерние PureComponent подумают, что prop изменился.

render() {
return <Child onClick={() => this.doSomething()} />;
}

Каждый раз новая функция ⇒ PureComponent-ребёнок ререндерится зря.

✅ Лучше:

handleClick = () => this.doSomething();
render() {
return <Child onClick={this.handleClick} />;
}

🧩 12) Почему forceUpdate() — плохой паттерн

forceUpdate() пропускает shouldComponentUpdate и форсит ререндер.
Это ломает оптимизации и делает компонент непредсказуемым.

Используется только в очень редких случаях (например, интеграция с внешними библиотеками, где React не контролирует state).

🧩 13) Что такое Render Props

Паттерн, когда компонент принимает функцию как дочерний элемент, и вызывает её, передавая данные.

class MouseTracker extends React.Component {
state = { x: 0, y: 0 };
handleMove = e => this.setState({ x: e.clientX, y: e.clientY });

render() {
return (

<div onMouseMove={this.handleMove}>
{this.props.children(this.state)}
</div>
);
}
}

// использование
<MouseTracker>
{({ x, y }) => <h1>Координаты: {x}, {y}</h1>}
</MouseTracker>

🧩 14) Compound components

Паттерн, где компонент экспортирует подкомпоненты и управляет ими через контекст.

class Tabs extends React.Component {
static Tab = ({ children }) => <div>{children}</div>;
static Panel = ({ children }) => <div>{children}</div>;
}

Используется, чтобы пользователи писали декларативный API:

<Tabs>
  <Tabs.Tab>Tab 1</Tabs.Tab>
  <Tabs.Panel>Content 1</Tabs.Panel>
</Tabs>

🧩 15) Controlled vs Uncontrolled компоненты

Controlled — состояние хранится в React:

<input value={this.state.value} onChange={e => this.setState({ value: e.target.value })} />

Uncontrolled — состояние хранится в DOM:

<input defaultValue="init" ref={el => this.input = el} />

Controlled — удобно для валидации/управления.
Uncontrolled — проще, но без доступа к состоянию React.

🧩 16) Что такое Enzyme

Это библиотека тестирования React от Airbnb (до появления React Testing Library).
Позволяет «монтировать» компоненты, вызывать lifecycle вручную, проверять state и props.

🧩 17) Когда использовать getDerivedStateFromProps?

Когда компонент должен «синхронизировать» state с props (редко нужно).
Например, сброс внутреннего состояния при смене id:

static getDerivedStateFromProps(nextProps, prevState) {
if (nextProps.userId !== prevState.prevUserId) {
return { prevUserId: nextProps.userId, inputValue: '' };
}
return null;
}

🧩 18) getSnapshotBeforeUpdate пример

(см. пункт 5 — позиция скролла).
Это не ref, а метод lifecycle, чтобы захватить DOM до обновления.

🧩 19) "Мутировать большие объекты" — почему плохо
this.state.user.age = 30; // ❌ мутация
this.setState({ user: this.state.user });

React не видит изменений, потому что ссылка на user не изменилась.
PureComponent подумает, что ничего не поменялось.

✅ Правильно:

this.setState({ user: { ...this.state.user, age: 30 } });

🧩 20) Анонимные функции в render → лишние ререндеры
<Child onClick={() => this.doSomething()} />

Каждый раз новая функция → Child думает, что prop изменился → лишний render.

✅ Вынести:

handleClick = () => this.doSomething();
<Child onClick={this.handleClick} />

🧩 21) Ответы на вопросы «на подумать»

1. Почему getDerivedStateFromProps нельзя делать сетевые запросы?
   Потому что он должен быть чистым (pure), без side-effects. Он вызывается перед render, даже при SSR.

2. Поведение двух setState подряд

this.setState({ count: this.state.count + 1 });
this.setState({ count: this.state.count + 1 });

→ результат: +1, не +2, потому что batching и используется старое значение.
Используй функциональный вариант:

this.setState(prev => ({ count: prev.count + 1 }));
this.setState(prev => ({ count: prev.count + 1 }));
// теперь +2

3. Debounced input
   Использовать setTimeout + clearTimeout внутри onChange, состояние хранить в React.

4. Прокинуть ref через HOC

const withLogger = (Wrapped) => {
class HOC extends React.Component {
render() {
return <Wrapped ref={this.props.forwardedRef} {...this.props} />;
}
}
return React.forwardRef((props, ref) => <HOC {...props} forwardedRef={ref} />);
};

5. Почему componentWillUnmount лучше для очистки
   Потому что при componentDidUpdate компонент может ещё жить, и очистка будет преждевременной.

🧩 22) Почему getDerivedStateFromProps — плохой паттерн и когда PureComponent вреден

getDerivedStateFromProps плохо, потому что:

создаёт дублирование между props и state;

легко забыть синхронизацию;

сложно дебажить — state не соответствует реальным props.

Лучше использовать controlled компонент: состояние полностью управляется props.

PureComponent вреден, если:

ты мутируешь объекты/массивы (сравнение по ссылке не заметит изменений);

ты создаёшь новые объекты каждый render (всегда будет думать, что prop изменился).

---

🧩 1) Почему мы можем присваивать state = {} прямо в классе?

Класс в JS — это синтаксический сахар над функцией-конструктором.
Начиная с ES2022 (и раньше — через Babel/TypeScript), в JS появились class fields (поля класса).
Это стандартный синтаксис, позволяющий писать:

class MyComponent extends React.Component {
state = { count: 0 };
}

Под капотом (Babel это транспилирует) — вот что происходит:

class MyComponent extends React.Component {
constructor(props) {
super(props);
this.state = { count: 0 };
}
}

То есть state = {...} — просто сокращение.
В JS можно писать и без =, но тогда это просто объявление метода, а не поля.
Поэтому через = создаём поле, через : — нельзя (это синтаксис объектов, не классов).

🧩 2) Что такое getDerivedStateFromProps и зачем "синхронизация"?

Понять можно только на примере реальной задачи.

Пример:

Допустим, у тебя компонент редактирования пользователя:

<UserEditor user={currentUser} />

И внутри:

class UserEditor extends React.Component {
state = { name: this.props.user.name };

onChange = (e) => this.setState({ name: e.target.value });

render() {
return <input value={this.state.name} onChange={this.onChange} />;
}
}

Проблема: если props.user изменится (например, откроешь другого пользователя),
твой state.name останется старым, ведь constructor вызывался один раз.

Чтобы обновить state, когда приходит новый props.user, и придумали getDerivedStateFromProps:

static getDerivedStateFromProps(nextProps, prevState) {
if (nextProps.user.id !== prevState.prevUserId) {
return {
name: nextProps.user.name,
prevUserId: nextProps.user.id
};
}
return null;
}

📘 "Синхронизация" — значит: держать state и props согласованными,
чтобы state обновлялся, если поменялись входные данные (props).

⚠️ Но чаще лучше не хранить дубликат в state, а просто использовать props напрямую:

render() {
return <input value={this.props.user.name} />;
}

Это и есть controlled pattern.
То есть — вычислять всё прямо в render (без промежуточного state) — надёжнее.

🧩 3) Event handler — синхронный или нет? Что с event loop?

Очень крутой вопрос 👇

Важно:

Event handlers React-а (например, onClick, onChange) — это синхронные вызовы.
React оборачивает их в SyntheticEvent, но код твоего обработчика выполняется синхронно в стеке JS, не через event loop.

Пример:

handleClick = () => {
this.setState({ count: this.state.count + 1 });
console.log("after setState", this.state.count);
};

console.log выполнится сразу, синхронно.
Но React не применит state немедленно — он добавит обновление в очередь внутри Fiber,
и применит его после завершения текущего event handler (batching).

Что происходит под капотом:

React создаёт synthetic event.

Твой handler синхронно выполняется.

Все setState в этом обработчике накапливаются в очередь (batched updates).

После выхода из обработчика React делает render+commit фазы.

Event loop тут вообще не участвует — это всё в одном стеке.

Почему путает:

Потому что setState — асинхронен по эффекту, но вызов синхронный.

🧩 4) Зачем нужны Render Props?

Это паттерн переиспользования логики между компонентами до появления хуков.

Пример — компонент, который «отслеживает» положение мыши, но не знает, как это показывать:

class Mouse extends React.Component {
state = { x: 0, y: 0 };

handleMove = (e) => this.setState({ x: e.clientX, y: e.clientY });

render() {
return (
<div style={{ height: '100vh' }} onMouseMove={this.handleMove}>
{this.props.children(this.state)}
</div>
);
}
}

Использование:

<Mouse>
  {({ x, y }) => <h1>Мышка на {x}, {y}</h1>}
</Mouse>

То есть this.props.children — функция, и компонент «рендерит» её,
передавая нужные данные. Это альтернатива HOC.

🧩 5) Как понять <input defaultValue="init" ref={el => this.input = el} />

Разберём по шагам:

ref={...} — это функция, которую React вызывает при монтировании/размонтировании элемента.

Когда элемент монтируется, React вызывает:
el => this.input = el, где el — DOM-элемент (<input>).

this внутри стрелочной функции — это твой компонент (this не теряется, потому что стрелочная функция не создаёт свой контекст).

Итак, под капотом React делает:

this.input = DOMElement;

Позже ты можешь обратиться:

this.input.focus();

А при размонтировании React вызовет ref(null).

🧩 6) Концепция getDerivedStateFromProps — ещё раз, простыми словами

Попробуем метафору 👇

Представь, что props — это данные снаружи, а state — данные внутри компонента.
Иногда внутренние данные зависят от внешних, и должны обновляться, когда props меняются.

Но у компонента constructor вызывается один раз, поэтому без getDerivedStateFromProps state останется старым.

Когда нужен:

При сбросе локального состояния при смене пропа:

static getDerivedStateFromProps(nextProps, prevState) {
if (nextProps.userId !== prevState.prevUserId) {
return { prevUserId: nextProps.userId, draft: '' };
}
return null;
}

Когда не нужен:

Если данные не зависят от props — не используем его вообще.
