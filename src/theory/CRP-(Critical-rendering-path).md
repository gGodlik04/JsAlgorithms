Краткая схема (что происходит в целом)

Браузер превращает HTML/CSS/JS в пиксели через последовательность этапов: парсинг → создание DOM и CSSOM → построение render tree → style calculation → layout (reflow) → paint (раскраска / display list) → rasterization → compositing (слои → GPU). Эти шаги ещё называют critical rendering path.
MDN Web Docs

Ниже пройдёмся по каждому шагу очень подробно, укажу где происходят тяжёлые операции и какие изменения в стиле/DOM приводят к reflow/repaint/ре-композиту.

1. Парсинг: HTML → DOM, CSS → CSSOM

HTML токенизируется и парсится в DOM-дерево. Парсинг может быть приостановлен <script>-ом, если он не async/defer, потому что скрипт может модифицировать DOM во время выполнения.

CSS-файлы и inline-стили парсятся в CSSOM. Внешние CSS-файлы блокируют визуализацию (пока CSSOM не готов, нельзя корректно вычислить размеры/стили элементов).
MDN Web Docs
+1

2. Построение render tree и расчёт стилей

Когда есть DOM + CSSOM, браузер строит render tree — структуру, содержащую только визуальные узлы (исключаются display:none, теги в <head> и т. п.) с вычисленными стилями.

Recalculate style — этап применения каскадных стилей к узлам. Если поменялась CSSOM (подключили/удалили stylesheet или изменился inline-style), то нужно пересчитать стили. Это может быть дорого, особенно для большого дерева.
MDN Web Docs
+1

3. Layout (reflow) — вычисление геометрии

Layout / reflow — браузер вычисляет точные размеры и позиции каждого визуального узла (например: ширина, высота, offsetTop/Left, положение в потоке, расчёт flex/grid и т.д.). Это рекурсивный процесс: родитель зависит от детей и наоборот.

Reflow — одна из самых тяжёлых операций. Изменения CSS-свойств, влияющих на геометрию (width/height, margin, padding, top/left, display, position и т. п.) → приводят к reflow. Reflow часто влечёт за собой repaint и последующий compositing.
web.dev
+1

Примеры причин полного vs частичного reflow:

Добавление/удаление узлов в DOM или изменение размеров изображения без указанных размеров → возможен глобальный reflow.

Изменение transform/opacity обычно не вызывает reflow (только композит). Поэтому их рекомендуют для анимаций.

4. Paint — создание команд рисования (display list)

После layout строится display list — последовательность команд «нарисовать прямоугольник, текст, тень и т.д.». Paint — это превращение узлов render tree в эти графические инструкции.

Paint может быть дорогим: сложное сочетание теней, закруглений, градиентов, SVG, текстов и т. п. Для каждого слоя создаётся набор операций, которые затем нужно растеризовать.
Chrome for Developers

5. Rasterization — растеризация (bitmap)

Raster (растрирование) — это превращение инструкций display list в пиксели (битмапы/тайлы). В современных движках этот этап часто выполняется отдельными raster threads, чтобы не блокировать главный поток (main thread). Растеризация может происходить по тайлам (tiles) для более эффективной переработки областей.
Chrome for Developers

6. Compositing — слои и GPU

Браузер разбивает страницу на слои (layers). Некоторые слои автоматически создаются движком (видео, canvas, позиционированные элементы, элементы с will-change, элементы с CSS transform/opacity и т.д.), некоторые можно подсказать руками.

После того как битмапы получены, композитор (compositor thread / GPU) собирает слои в финальный кадр, применяет трансформации, blending, clipping и отправляет кадр в окно/экран. Часто композит выполняется на GPU и очень быстрый по сравнению с reflow/paint. Но если у вас много слоёв или большие текстуры — будут накладные расходы (память, upload, bandwidth to GPU).
Chrome for Developers
+1

Потоки и процессы (на примере Chromium)

Main thread (render process main) — парсинг, выполнение JS, пересчёт стилей, layout, составление display lists (частично). Если JS долго выполняется — UI «замораживается».

Compositor thread / process (viz) — отвечает за составление и презентацию слоёв в GPU; часто отделён, чтобы сгладить анимации.

Raster threads — занимаются растеризацией тайлов в bitmap (off-main-thread raster).
(архитектура современных браузеров оптимизирована, чтобы делать как можно больше off-main-thread, но всё равно многие шаги инициируются с main thread).
Chrome for Developers
+1

Что вызывает reflow vs repaint vs composite — кратко

Reflow (layout): изменение геометрии — width, height, margin, padding, display, position, вставка/удаление узлов, изменение содержимого, чтение layout-параметров после записи (forced synchronous layout).
web.dev

Repaint (paint): визуальные изменения, не затрагивающие геометрию — color, background-color, box-shadow (иногда почто). Paint всё равно дороже, чем composite.
web.dev

Composite: изменения, которые можно применить уже к слоям — transform, opacity — обычно самые дешёвые при анимации, поскольку не требуют повторного layout/paint.
web.dev

Практические оптимизации (что делать, чтобы быстрее)

Анимации: анимируйте transform и opacity, используйте requestAnimationFrame. Это остаётся на уровне композита и не вызывает layout.
web.dev

Избегать layout-thrashing: не смешивайте чтение layout-значений (например element.offsetWidth, getComputedStyle) и записи в DOM в цикле — это вызывает принудительную синхронизацию. Группируйте чтения и записи отдельно.
web.dev

Заранее задавайте размеры картинок/вложений — чтобы избежать перестроек после загрузки.
MDN Web Docs

Promote to layer аккуратно: will-change: transform или translateZ(0) может помочь, но слишком много слоёв — память и upload-стоимость. Используйте экономно.
Chrome for Developers

CSS containment (contain) — ограничивает область воздействия изменений и даёт движку подсказки для локализации reflow/paint.
web.dev

Как профилировать (инструменты)

Chrome DevTools — Performance (record frame-by-frame), Rendering pane (Show paint rectangles, layer borders, FPS meter). Смотрите «Timeline» / «Recalculate style», «Layout», «Paint» задачи, чтобы понять узкие места.
Chrome for Developers
+1

Короткое резюме — порядок действий для одного кадра

(JS/CSS changes) → recalc style → layout (reflow) → paint (display list) → raster (bitmap) → composite (GPU) → present. Большинство оптимизаций сводятся к тому, чтобы уменьшить частоту и область reflow/paint, и по возможности оставить работу композитору/GPU.
