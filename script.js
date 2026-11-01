// ==UserScript==
// @name         blohaj
// @namespace    blohaj
// @version      0.3.12
// @description  это кусок вайбкода, который я не редачил. Расширение дописывалось ночью на скорость. Надеюсь, обойдётся без багов.
// @match        https://gofrag.ru/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @connect      ws.audioscrobbler.com
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    const BRAND = 'blohaj';
    const BRAND_FULL = 'blohaj.pianino2.xyz';
    const VERSION = (typeof GM_info !== 'undefined' && GM_info.script && GM_info.script.version) || '0.3.12';

    const RU = {
        nav_home: 'Главная', nav_visuals: 'Визуалы', nav_gamepage: 'Стр. игры', nav_cat: 'Кот', nav_extras: 'Разное', nav_accounts: 'Аккаунты',
        g_main: 'Основное', g_misc: 'Дополнительно', home_links: 'Ссылки', home_build: 'Сборка',
        welcome: 'Привет,', tg: 'Telegram-канал', gh: 'Исходники на GitHub',
        winopts: 'Параметры окна', opacity: 'Прозрачность', nomove: 'Не двигать', sidebar_btn: 'Кнопка в боковом меню',
        watermark: 'Ватермарка', wm_enabled: 'Включена', wm_corner: 'Угол', corner_tl: 'Левый верх', corner_tr: 'Правый верх', corner_bl: 'Левый низ', corner_br: 'Правый низ',
        wm_user: 'Ник', wm_time: 'Дата и время', wm_fps: 'Счётчик FPS',
        key: 'Клавиша', press_any: 'Нажмите клавишу...',
        anim: 'Анимация', anim_none: 'Нет (мгновенно)', anim_fade: 'Затухание', anim_slideL: 'Выезд слева', anim_slideR: 'Выезд справа', anim_slideU: 'Выезд сверху', anim_slideD: 'Выезд снизу', anim_zoom: 'Зум', anim_zoomUp: 'Зум + подъём', anim_pop: 'Поп (пружинка)',
        duration: 'Длительность', preview: 'Превью',
        tint: 'Цвета (тинт)', tint_lab: 'Тинт', amount: 'Сила',
        bg: 'Фон', bg_url_ph: 'Ссылка на картинку', browse: 'Файл...', blur: 'Блюр', dim: 'Затемнение', clear: 'Убрать',
        font: 'Шрифт', family: 'Гарнитура', font_default: 'Сайт (Nunito)', font_system: 'Системный', font_serif: 'Serif (Georgia)',
        cursor: 'Смена курсора', cursor_mode: 'Режим', cursor_default: 'Обычный', cursor_dot: 'Точка', cursor_cross: 'Перекрестие', cursor_circle: 'Кружок', cursor_arrow: 'Стрелка', cursor_color: 'Цвет', cursor_smooth: 'Плавность', cursor_size: 'Размер', cursor_width: 'Толщина', cursor_alpha: 'Прозрачность', cursor_anim: 'Анимация',
        fov_enabled: 'Включён', fov_pan: 'Камера за курсором', fov_panam: 'Размах', fov_smooth: 'Сглаживание',
        crt: 'Ламповый телевизор', crt_flick: 'Мерцание', crt_str: 'Сила', mb: 'Motion Blur',
        reset_theme: 'Сбросить тему',
        random: 'Случайный градиент', reset_all: 'Сбросить всё',
        comments: 'Комментарии', show_loadall: 'Кнопка «Загрузить все»', enter_submit: 'Отправка по Enter',
        feeder: 'Кормление кота', autofeed: 'Автокорм при загрузке', feednow: 'Покормить',
        devourer: 'Кот-поглотитель',
        changer: 'Смена кота', breed: 'Порода', stage: 'Стадия', breed_auto: 'Авто (как на сайте)', stage_auto: 'Авто (текущая)', reset: 'Сброс',
        feeding: 'Кормлю...', fed_today: 'Сегодня уже кормлен', fed_limit: 'Уже кормлен / лимит',
        fed_ok: 'Покормлен! +{INCOME} рыб · баланс {BAL} · стрик {STREAK}', fed_new_stage: ' · новая стадия!',
        fed_dev: 'Покормлен! +{INCOME} рыб · баланс {BAL} · осталось сегодня {LEFT}',
        failed: 'Ошибка: ', unknown_err: 'неизвестная ошибка', csrf_err: 'CSRF-токен не найден',
        cat_fed: 'Кот покормлен: +{INCOME} рыб', cat_bal: 'Баланс: {BAL} · стрик: {STREAK}',
        dev_fed: 'Поглотитель покормлен: +{INCOME} рыб', dev_unlock: ' · награда открыта!', dev_bal: 'Баланс: {BAL} · осталось сегодня: {LEFT}',
        autofeed_fail: 'Автокорм не удался',
        lf_cap: 'Сейчас слушает', lf_on: 'Включено', lf_nick_ph: 'Ник на Last.fm', lf_now: 'Обновить сейчас', lf_checking: 'Проверяю...',
        lf_bio: 'Слушает сейчас: {TRACK}', lf_idle: 'Сейчас ничего не играет',
        lf_need_nick: 'Впиши ник Last.fm', lf_net: 'Last.fm недоступен', lf_nouser: 'Ник на Last.fm не найден',
        lf_nologin: 'Не залогинен на gofrag', lf_notoken: 'CSRF-токен не найден', lf_form: 'Форма визитки не найдена',
        lf_upd: 'Обновляю профиль...', lf_ok: 'Профиль обновлён', lf_same: 'Трек не изменился', lf_fail: 'Не удалось обновить профиль',
        lf_off: 'Возвращаю описание...', lf_back_ok: 'Описание возвращено', lf_fail_back: 'Не удалось вернуть описание',
        lf_back_sil: 'Музыка стихла — вернул описание как было', lf_back_stale: 'Трек не менялся 5 минут — вернул описание как было',
        confirm_reset: 'Сбросить все настройки скрипта?',
        load_all: 'Загрузить все комментарии', load_all_prog: 'Загрузка комментариев... ({N})', load_all_done: 'Все комментарии загружены',
        notifs: 'Уведомления о комментариях', nt_on: 'Включены', nt_int: 'Интервал проверки',
        nt_ph: 'Название игры...', nt_find: 'Найти', nt_now: 'Проверить сейчас', nt_searching: 'Ищу...',
        nt_nores: 'Ничего не найдено', nt_err: 'Поиск не удался', nt_tracked: 'Отслеживаемые игры',
        nt_empty: 'Пока ничего не отслеживается', nt_added: 'Добавлено в отслеживание', nt_dup: 'Уже отслеживается',
        nt_max: 'Лимит списка: {N} игр', nt_newc: 'Новые комментарии', nt_newc_line: '{TITLE}: +{N} (всего {TOTAL})', nt_count: '{N} комм.',
        accounts: 'Аккаунты', ac_list_cap: 'Сохранённые', ac_login_ph: 'Логин или email', ac_pass_ph: 'Пароль',
        ac_save: 'Сохранить', ac_empty: 'Пусто', ac_saved: 'Аккаунт сохранён', ac_dup: 'Такой логин уже есть',
        ac_need: 'Заполни логин и пароль', ac_max: 'Лимит: {N} аккаунтов', ac_removed: 'Аккаунт удалён',
        ac_switching: 'Вхожу...', ac_switch_ok: 'Вошёл', ac_switch_fail: 'Не удалось войти — проверь пароль', ac_notoken: 'CSRF-токен не найден',
        ac_goto: 'Сменить аккаунт'
    };
    function t(k) { return RU[k] || k; }
    function tf(k, vars) { let s = t(k); for (const v in vars) s = s.split('{' + v + '}').join(vars[v]); return s; }

    //кароч сюда добавляешь/сносишь посхалочных юзеров. Кто удалит нас двоих - гей😎😎😎😎
    const EGG_USERS = [
        { slug: 'pianino2', label: 'Фембойчик :3', nameMatch: 'pianino', bg: '#f472b6' }
    ];
    const EGG_SKIP = '#gf-menu, #gf-toasts, #gf-watermark, .gf-bw, .gfk-own';

    function eggify(el, user) {
        if (!el || el.dataset.gfEgg) return;
        el.dataset.gfEgg = '1';
        el.textContent = user.label;
        el.className = 'gfk-tbadge gf-egg-badge';
        el.style.setProperty('--egg-bg', user.bg);
        el.removeAttribute('title');
    }

    function eggUserForLink(link) {
        const href = (link.getAttribute('href') || '').toLowerCase();
        const txt = (link.textContent || '').trim().toLowerCase();
        for (const u of EGG_USERS) {
            if (href.indexOf('/cat/' + u.slug) !== -1 && txt.includes(u.nameMatch)) return u;
        }
        return null;
    }

    function applyEggBadges() {
        const path = location.pathname.toLowerCase();
        for (const u of EGG_USERS) {
            if (path.indexOf('/cat/' + u.slug) === 0) {
                eggify(document.querySelector('.gfk-top__badges .gfk-tbadge'), u);
                break;
            }
        }
        document.querySelectorAll('.gf-badge, .gfk-tbadge').forEach(b => {
            if (b.dataset.gfEgg || b.classList.contains('gf-egg-badge')) return;
            if (b.closest(EGG_SKIP)) return;
            const scope = b.parentElement;
            if (!scope) return;
            for (const link of scope.querySelectorAll('a[href*="/cat/"]')) {
                const u = eggUserForLink(link);
                if (u) { eggify(b, u); break; }
            }
        });
    }

    const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiPos = 0;
    let openMenuHook = null;

    // Пасхалка: Konami-код больше не рисует фейковую вкладку в сайдбаре — сразу кидает на гифку с помойки.
    const EGG_GIF = 'https://pomojka.blohaj.pianino2.xyz/blohaj.gif';
    function konamiEgg() {
        location.href = EGG_GIF;
    }

    function injectSidebarButton() {
        if (!settings.window.sidebarButton) return;
        const guild = document.querySelector('.gf-fc2__guild');
        if (!guild || guild.querySelector('.gf-sidebar-btn')) return;
        const a = document.createElement('a');
        a.className = 'gf-fc2__glink gf-sidebar-btn';
        a.href = '#';
        a.innerHTML = '<span class="gf-fc2__glink-label">' + BRAND_FULL + '</span>';
        a.addEventListener('click', e => {
            e.preventDefault();
            if (openMenuHook) openMenuHook();
        });
        guild.appendChild(a);
    }

    function removeSidebarButton() {
        document.querySelectorAll('.gf-sidebar-btn').forEach(b => b.remove());
    }

    function syncSidebarButton() {
        if (settings.window.sidebarButton) injectSidebarButton();
        else removeSidebarButton();
    }

    const DEFAULTS = {
        window: {
            opacity: 94, noMove: false, anim: 'zoom', animDuration: 180,
            hotkey: 'ShiftRight', sidebarButton: false,
            watermark: true, watermarkUser: true, watermarkTime: false, watermarkFps: false,
            watermarkCorner: 'tl'
        },
        gamepage: { commentsLoadAll: false, enterSubmit: false, notifs: { enabled: false, interval: 10, games: [] } },
        cat: { autoFeed: false, autoFeedDevourer: false, breed: 'auto', stage: 'auto' },
        lastfm: { enabled: false, nick: '', lastBio: '', mode: 'idle', origBio: null, lastTrack: '', stateSince: 0 },
        fov: { enabled: false, fov: 90, pan: false, panAmount: 60, smooth: 80 },
        crt: { enabled: false, flicker: true, strength: 65 },
        mb: { enabled: false },
        theme: {
            tintColor1: '#ff4d9d', tintColor2: '#a02a62', tintAmount: 0,
            bgImage: '', bgBlur: 0, bgDim: 40,
            font: { family: 'default' },
            cursor: { mode: 'default', color: '#ffffff', smooth: 60, size: 12, width: 2, alpha: 100, anim: true }
        }
    };

    function deepMerge(base, over) {
        const out = Object.assign({}, base);
        for (const k in over) {
            if (over[k] && typeof over[k] === 'object' && !Array.isArray(over[k]) && base[k]) out[k] = deepMerge(base[k], over[k]);
            else out[k] = over[k];
        }
        return out;
    }

    let settings = deepMerge(DEFAULTS, GM_getValue('gf_theme_v4', {}));
    function save() { GM_setValue('gf_theme_v4', settings); }

    // Motion Blur (Task 27): входная анимация каждого элемента сайта — слайд + блюр.
    // Стиль преппендится к head РАНЬШЕ стилей сайта: база (0,1,0) проигрывает каскадом их
    // animation-правила — uk-animation/kenburns/spinners живут своей жизнью. body исключён
    // (там FOV-transform), #gf-menu — целиком (ImGui-pose на корне, меню остаётся резвым),
    // дырки :not(.gf-pane)/:not(.listening) берегут родные анимации панелей и пульса,
    // тинт исключен (filter на mix-blend слое роняет blend). from-only + composition:add —
    // анимация добавляется к родным transform/filter и заканчивается ровно в родных
    // значениях; fill-mode нет — в простое цена нулевая.
    const MOTION_CSS = `
        .gf-motion * { animation: gf-mb-in .3s cubic-bezier(.22,.61,.36,1); animation-composition: add; }
        .gf-motion body, .gf-motion #gf-menu, .gf-motion #gf-menu *:not(.gf-pane):not(.listening), .gf-motion #gf-tint-layer { animation: none; }
        @keyframes gf-mb-in { from { transform: translate3d(-26px, 0, 0); filter: blur(2.5px); } }
    `;
    (function injectMotionCss() {
        const st = document.createElement('style');
        st.textContent = MOTION_CSS;
        if (document.head.insertBefore) document.head.insertBefore(st, document.head.firstChild);
        else document.head.appendChild(st);
    })();
    function applyMotion() {
        document.documentElement.classList.toggle('gf-motion', !!settings.mb.enabled);
    }
    applyMotion();

    function ensureStyleTag(id) {
        let tag = document.getElementById(id);
        if (!tag) { tag = document.createElement('style'); tag.id = id; document.head.appendChild(tag); }
        return tag;
    }

    let tintLayer = null;
    function ensureTintLayer() {
        if (tintLayer) return tintLayer;
        tintLayer = document.createElement('div'); tintLayer.id = 'gf-tint-layer';
        document.documentElement.appendChild(tintLayer); return tintLayer;
    }
    function applyTint() {
        const layer = ensureTintLayer(); const amt = settings.theme.tintAmount;
        if (amt <= 0) { layer.style.display = 'none'; return; }
        layer.style.display = 'block';
        layer.style.background = `linear-gradient(135deg, ${settings.theme.tintColor1}, ${settings.theme.tintColor2})`;
        layer.style.opacity = (amt / 100).toFixed(2);
    }

    let bgLayer = null, bgDimEl = null;
    function ensureBgLayer() {
        if (bgLayer) return bgLayer;
        bgLayer = document.createElement('div'); bgLayer.id = 'gf-bg-layer';
        bgDimEl = document.createElement('div'); bgDimEl.id = 'gf-bg-dim';
        bgLayer.appendChild(bgDimEl); document.documentElement.appendChild(bgLayer); return bgLayer;
    }

    function applyBg() {
        const hasImg = !!settings.theme.bgImage;
        const layer = ensureBgLayer();
        layer.style.display = hasImg ? 'block' : 'none';
        if (hasImg) {
            layer.style.backgroundImage = `url("${settings.theme.bgImage}")`;
            layer.style.filter = `blur(${settings.theme.bgBlur}px)`;
        }
        bgDimEl.style.background = `rgba(0,0,0,${settings.theme.bgDim / 100})`;

        document.querySelectorAll(
            'header, .tm-header, .tm-header-mobile, .uk-navbar-container, .uk-navbar, header .uk-container, ' +
            '.gf-precontent, .gf-precontent .uk-panel, .gfc-head, .gfc-body, .gfc-grid, ' +
            '.gf-fc2__qcell'
        ).forEach(el => {
            if (hasImg) {
                el.style.setProperty('background', 'transparent', 'important');
                el.style.setProperty('background-image', 'none', 'important');
            } else {
                el.style.removeProperty('background');
                el.style.removeProperty('background-image');
            }
        });

        const tag = ensureStyleTag('gf-bg-transparency');
        tag.textContent = hasImg ? `
            html, body, #tm-main, .tm-page,
            .uk-section-default, .uk-section-muted, #tm-bottom {
                background: transparent !important;
                background-color: transparent !important;
                background-image: none !important;
            }
            header, .tm-header, .tm-header-mobile,
            .tm-header .uk-navbar-container, .tm-header-mobile .uk-navbar-container,
            .tm-header .uk-navbar, .tm-header-mobile .uk-navbar,
            .tm-header .uk-container, .tm-header-mobile .uk-container {
                background: transparent !important;
                background-color: transparent !important;
                background-image: none !important;
            }
            header::before, header::after,
            .tm-header::before, .tm-header::after,
            .tm-header-mobile::before, .tm-header-mobile::after,
            header .uk-navbar-container::before, header .uk-navbar-container::after,
            header .uk-navbar::before, header .uk-navbar::after {
                display: none !important;
                background: transparent !important;
                background-image: none !important;
            }
            .gf-precontent, .gf-precontent .uk-panel, .gfc-head, .gfc-body, .gfc-grid {
                background: transparent !important;
                background-color: transparent !important;
                background-image: none !important;
            }
            .gf-precontent::before, .gf-precontent::after,
            .gfc-head::before, .gfc-head::after {
                display: none !important;
                background: transparent !important;
                background-image: none !important;
            }
            .gf-fc2__qcell {
                background: transparent !important;
                background-color: transparent !important;
                background-image: none !important;
            }
            .gf-fc2__qcell:hover { background: rgba(255,255,255,.07) !important; }
            #tm-main .uk-grid-stack .uk-panel,
            #tm-main .gf-fc2, #tm-main .gf-fc2__id,
            #tm-main .gf-fc2__guild, #tm-main .gf-fc2__guild-main,
            #tm-main .gf-fc2__guild-head, #tm-main .gf-fc2__rooms,
            #tm-main .gf-gmm, #tm-main .gf-gmm-head, #tm-main .gf-gmm-section {
                background: transparent !important;
                background-color: transparent !important;
                background-image: none !important;
            }
        ` : '';
    }

    const FONT_MAP = {
        default: null,
        system: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
        roboto: `'Roboto', sans-serif`,
        montserrat: `'Montserrat', sans-serif`,
        mono: `'JetBrains Mono', Consolas, monospace`,
        serif: `Georgia, 'Times New Roman', serif`,
        comic: `'Comic Neue', 'Comic Sans MS', cursive`
    };
    const GOOGLE_FONT_URL = { roboto: 'Roboto:wght@400;600;700', montserrat: 'Montserrat:wght@400;600;700', mono: 'JetBrains+Mono:wght@400;600', comic: 'Comic+Neue:wght@400;700' };
    const loadedFonts = new Set();
    function ensureGoogleFont(key) {
        if (!GOOGLE_FONT_URL[key] || loadedFonts.has(key)) return;
        const l = document.createElement('link'); l.rel = 'stylesheet';
        l.href = `https://fonts.googleapis.com/css2?family=${GOOGLE_FONT_URL[key]}&display=swap`;
        document.head.appendChild(l); loadedFonts.add(key);
    }
    function applyFont() {
        const tag = ensureStyleTag('gf-font-style');
        const key = settings.theme.font.family; const fam = FONT_MAP[key];
        if (key !== 'default') ensureGoogleFont(key);
        tag.textContent = fam ? `
            html, body, p, span, div, a, li, td, th, button, input, textarea, label,
            h1, h2, h3, h4, h5, h6, .uk-nav-default, .uk-navbar-nav > li > a, .gfk-top__name, .gfk-btn {
                font-family: ${fam} !important;
            }
            [class*="icon-"], [class^="icon-"], .uk-icon, [class*="uk-icon-"] { font-family: IcoMoon !important; }
        ` : '';
    }

    let curEl = null, curRaf = null;
    let curX = 0, curY = 0, targetX = 0, targetY = 0;
    const CURSOR_CUSTOM = ['dot', 'cross', 'circle', 'arrow'];
    let cursorLoopLast = 0;

    function cursorStyleTag() { return ensureStyleTag('gf-cursor-style'); }

    function buildCursorVisual(mode) {
        const c = settings.theme.cursor;
        const s = c.size;
        const w = c.width;
        const col = c.color;
        switch (mode) {
            case 'dot':
                return `<div style="position:absolute;left:50%;top:50%;width:${s}px;height:${s}px;margin:${-s / 2}px 0 0 ${-s / 2}px;border-radius:50%;background:${col};box-shadow:0 0 6px rgba(0,0,0,.55)"></div>`;
            case 'cross':
                return `<div style="position:absolute;left:50%;top:50%;width:${s * 2}px;height:${s * 2}px;margin:${-s}px 0 0 ${-s}px">
                    <div style="position:absolute;left:50%;top:0;bottom:0;width:${w}px;margin-left:${-w / 2}px;background:${col}"></div>
                    <div style="position:absolute;top:50%;left:0;right:0;height:${w}px;margin-top:${-w / 2}px;background:${col}"></div>
                </div>`;
            case 'circle':
                return `<div style="position:absolute;left:50%;top:50%;width:${s * 2.2}px;height:${s * 2.2}px;margin:${-s * 1.1}px 0 0 ${-s * 1.1}px;border-radius:50%;border:${w}px solid ${col};box-sizing:border-box"></div>
                    <div style="position:absolute;left:50%;top:50%;width:${w + 1}px;height:${w + 1}px;margin:${-(w + 1) / 2}px 0 0 ${-(w + 1) / 2}px;border-radius:50%;background:${col}"></div>`;
            case 'arrow':
                return `<div style="position:absolute;left:50%;top:50%;width:0;height:0;margin:-1px 0 0 -1px;border-top:${s * 1.2}px solid ${col};border-right:${s * 0.8}px solid transparent;transform:rotate(-8deg);filter:drop-shadow(0 0 3px rgba(0,0,0,.5))"></div>`;
        }
        return '';
    }

    function applyCursor() {
        const mode = settings.theme.cursor.mode;
        const style = cursorStyleTag();

        if (mode === 'default' || !CURSOR_CUSTOM.includes(mode)) {
            style.textContent = '';
            if (curEl) { curEl.remove(); curEl = null; }
            if (curRaf) { cancelAnimationFrame(curRaf); curRaf = null; }
            return;
        }

        style.textContent = `* { cursor: none !important; }`;

        if (!curEl) {
            curEl = document.createElement('div');
            curEl.id = 'gf-cursor';
            const inner = document.createElement('div');
            inner.id = 'gf-cursor-inner';
            curEl.appendChild(inner);
            document.documentElement.appendChild(curEl);
            curX = targetX; curY = targetY;
        }

        const inner = curEl.querySelector('#gf-cursor-inner');
        inner.innerHTML = buildCursorVisual(mode);
        curEl.style.opacity = String(settings.theme.cursor.alpha / 100);
        startCursorLoop();
    }

    function startCursorLoop() {
        if (curRaf) return;
        cursorLoopLast = performance.now();
        const step = (now) => {
            const smooth = settings.theme.cursor.smooth;
            let k;
            if (smooth <= 0) k = 1;
            else {
                const dt = Math.min(64, now - cursorLoopLast);
                cursorLoopLast = now;
                k = 1 - Math.pow(0.05, (dt / 16.66) / (smooth / 60));
                k = Math.min(1, Math.max(0.1, k));
            }
            curX += (targetX - curX) * k;
            curY += (targetY - curY) * k;
            if (Math.abs(targetX - curX) < 0.1) curX = targetX;
            if (Math.abs(targetY - curY) < 0.1) curY = targetY;
            curEl.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
            curRaf = requestAnimationFrame(step);
        };
        curRaf = requestAnimationFrame(step);
    }

    document.addEventListener('mousemove', e => {
        targetX = e.clientX; targetY = e.clientY;
    }, true);

    document.addEventListener('mousedown', () => {
        if (!curEl || !settings.theme.cursor.anim) return;
        const inner = curEl.querySelector('#gf-cursor-inner');
        if (!inner) return;
        inner.classList.remove('gf-pop');
        void inner.offsetWidth;
        inner.classList.add('gf-pop');
    }, true);

    let fovRaf = null, fovPanX = 0, fovPanY = 0, fovLast = 0;
    let fovTx = window.innerWidth / 2, fovTy = window.innerHeight / 2;
    function fovScale() { return Math.min(2.2, Math.max(0.4, 90 / Math.max(1, settings.fov.fov))); }
    function fovOrigin() {
        const h = document.body ? document.body.offsetHeight : 0;
        const cy = (window.scrollY || 0) + window.innerHeight / 2;
        return '50% ' + Math.max(0, Math.min(h, cy)) + 'px';
    }
    function fovFrame(now) {
        const f = settings.fov;
        if (!f.enabled || !f.pan) { fovRaf = null; return; }
        const dt = Math.min(64, now - fovLast);
        fovLast = now;
        let k;
        if (f.smooth <= 0) k = 1;
        else {
            k = 1 - Math.pow(0.05, (dt / 16.66) / (f.smooth / 60));
            k = Math.min(1, Math.max(0.1, k));
        }
        const nx = Math.max(-1, Math.min(1, (fovTx / Math.max(1, window.innerWidth) - 0.5) * 2));
        const ny = Math.max(-1, Math.min(1, (fovTy / Math.max(1, window.innerHeight) - 0.5) * 2));
        const txT = nx * f.panAmount, tyT = ny * f.panAmount;
        fovPanX += (txT - fovPanX) * k;
        fovPanY += (tyT - fovPanY) * k;
        if (Math.abs(txT - fovPanX) < 0.01) fovPanX = txT;
        if (Math.abs(tyT - fovPanY) < 0.01) fovPanY = tyT;
        document.body.style.transformOrigin = fovOrigin();
        document.body.style.transform = `perspective(1100px) translate(${fovPanX.toFixed(3)}px, ${fovPanY.toFixed(3)}px) scale(${fovScale()})`;
        fovRaf = requestAnimationFrame(fovFrame);
    }
    function applyFov() {
        const f = settings.fov;
        const de = document.documentElement, body = document.body;
        if (!f.enabled) {
            if (fovRaf) { cancelAnimationFrame(fovRaf); fovRaf = null; }
            fovPanX = 0; fovPanY = 0;
            body.style.transform = ''; body.style.transformOrigin = '';
            de.classList.remove('gf-fov-on', 'gf-fov-zoomin');
            return;
        }
        de.classList.add('gf-fov-on');
        de.classList.toggle('gf-fov-zoomin', fovScale() > 1.001);
        fovSweep();
        body.style.transformOrigin = fovOrigin();
        if (f.pan) {
            if (!fovRaf) { fovLast = performance.now(); fovRaf = requestAnimationFrame(fovFrame); }
        } else {
            if (fovRaf) { cancelAnimationFrame(fovRaf); fovRaf = null; }
            fovPanX = 0; fovPanY = 0;
            body.style.transform = `perspective(1100px) scale(${fovScale()})`;
        }
    }
    function fovSyncOrigin() {
        if (settings.fov.enabled && document.body) document.body.style.transformOrigin = fovOrigin();
    }
    document.addEventListener('mousemove', e => { fovTx = e.clientX; fovTy = e.clientY; }, true);
    window.addEventListener('scroll', fovSyncOrigin, { passive: true });
    window.addEventListener('resize', fovSyncOrigin, { passive: true });

    const FOV_FLOAT_SEL = '.uk-lightbox, .uk-modal, .uk-offcanvas, .uk-notification, .uk-tooltip';
    function fovFloatOut(n) {
        if (!n.matches || !n.matches(FOV_FLOAT_SEL)) return;
        const de = document.documentElement;
        if (n.parentElement && n.parentElement !== de) de.appendChild(n);
    }
    function fovSweep(root) {
        if (!settings.fov.enabled || !document.body) return;
        if (root === undefined) { document.body.querySelectorAll(FOV_FLOAT_SEL).forEach(fovFloatOut); return; }
        if (root.nodeType !== 1) return;
        fovFloatOut(root);
        if (root.querySelectorAll) root.querySelectorAll(FOV_FLOAT_SEL).forEach(fovFloatOut);
    }
    new MutationObserver(muts => {
        for (const m of muts) for (const n of m.addedNodes) fovSweep(n);
    }).observe(document.body, { childList: true, subtree: true });

    // Ламповый телевизор (CRT): слой-экран на documentElement, как тинт/меню — вне «мира» body.
    // Не вешает на body/html ни transform, ни filter — не создаёт containing-block,
    // лайтбокс/картинки ведут себя как без эффекта, FOV Changer крутит body, экран остаётся на месте.
    let crtLayer = null;
    function ensureCrtLayer() {
        if (crtLayer) return crtLayer;
        crtLayer = document.createElement('div'); crtLayer.id = 'gf-crt';
        document.documentElement.appendChild(crtLayer); return crtLayer;
    }
    function applyCrt() {
        const c = settings.crt, layer = ensureCrtLayer();
        layer.classList.toggle('gf-crt-on', !!c.enabled);
        layer.classList.toggle('gf-crt-flicker', !!c.enabled && !!c.flicker);
        layer.style.opacity = (Math.max(0, Math.min(100, c.strength)) / 100).toFixed(2);
    }

    function applyAll() { applyTint(); applyBg(); applyFont(); applyCursor(); applyMotion(); applyFov(); applyCrt(); }

    function findSubmitButton(scope) {
        if (!scope) return null;
        const sels = [
            'button.gfc-submit', 'button.gf-cm-submit', 'button[type="submit"]', 'input[type="submit"]',
            'button[class*="submit"]', 'a[class*="submit"]'
        ];
        for (const sel of sels) {
            const btn = scope.querySelector(sel);
            if (btn) return btn;
        }
        for (const b of scope.querySelectorAll('button')) {
            const txt = (b.textContent || '').trim().toLowerCase();
            if (txt === 'отправить' || txt === 'submit' || txt === 'send') return b;
        }
        return null;
    }

    function submitCommentField(el) {
        let scope = el.parentElement;
        for (let i = 0; i < 6 && scope; i++) {
            const btn = findSubmitButton(scope);
            if (btn) { btn.click(); return true; }
            if (scope.tagName && scope.tagName.toLowerCase() === 'form') break;
            scope = scope.parentElement;
        }
        const form = el.closest('form');
        if (form) {
            const btn = form.querySelector('button[type="submit"], input[type="submit"]');
            if (btn) { btn.click(); return true; }
            if (form.requestSubmit) { form.requestSubmit(); return true; }
        }
        return false;
    }

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' || e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return;
        if (!settings.gamepage.enterSubmit) return;
        const el = e.target;
        const tag = (el.tagName || '').toLowerCase();
        if (tag !== 'textarea' && tag !== 'input') return;
        if (el.isContentEditable) return;
        if (tag === 'textarea' && !(el.value || '').trim()) return;
        if (el.closest('#gf-menu')) return;
        if (el.closest('.gf-search')) return;
        if (submitCommentField(el)) e.preventDefault();
    }, true);

    const IM_IDENT = { o: 1, x: 0, y: 0, s: 1 };
    const ANIM_TYPES = {
        none: null,
        fade:   { pose: { o: 0, x: 0,   y: 0,   s: 1 } },
        slideL: { pose: { o: 0, x: -80, y: 0,   s: 1 } },
        slideR: { pose: { o: 0, x: 80,  y: 0,   s: 1 } },
        slideU: { pose: { o: 0, x: 0,   y: -80, s: 1 } },
        slideD: { pose: { o: 0, x: 0,   y: 80,  s: 1 } },
        zoom:   { pose: { o: 0, x: 0,   y: 0,   s: 0.82 } },
        zoomUp: { pose: { o: 0, x: 0,   y: 28,  s: 0.92 } },
        pop:    { pose: { o: 0, x: 0, y: 0, s: 0.55 }, hidePose: { o: 0, x: 0, y: 0, s: 0.7 }, back: true }
    };
    const easeOutCubic = tt => 1 - Math.pow(1 - tt, 3);
    const easeInCubic = tt => tt * tt * tt;
    const easeOutBack = tt => { const c = 1.70158; return 1 + (c + 1) * Math.pow(tt - 1, 3) + c * Math.pow(tt - 1, 2); };
    let stopMenuAnimHook = null;

    function keyDisplayName(code) {
        if (!code) return 'None';
        const map = {
            ShiftRight: 'RShift', ShiftLeft: 'LShift',
            ControlRight: 'RCtrl', ControlLeft: 'LCtrl',
            AltRight: 'RAlt', AltLeft: 'LAlt',
            MetaLeft: 'LWin', MetaRight: 'RWin',
            Space: 'Space', Enter: 'Enter', Tab: 'Tab', CapsLock: 'CapsLk', Backspace: 'Bksp',
            Backquote: '`', Minus: '-', Equal: '=',
            BracketLeft: '[', BracketRight: ']', Backslash: '\\',
            Semicolon: ';', Quote: "'", Comma: ',', Period: '.', Slash: '/',
            Insert: 'Insert', Delete: 'Delete', Home: 'Home', End: 'End',
            PageUp: 'PgUp', PageDown: 'PgDn',
            ArrowUp: 'Up', ArrowDown: 'Down', ArrowLeft: 'Left', ArrowRight: 'Right',
            NumpadAdd: 'Num +', NumpadSubtract: 'Num -', NumpadMultiply: 'Num *',
            NumpadDivide: 'Num /', NumpadEnter: 'Num Enter', NumpadDecimal: 'Num .'
        };
        if (map[code]) return map[code];
        if (code.startsWith('Key')) return code.slice(3);
        if (code.startsWith('Digit')) return code.slice(5);
        if (/^F\d{1,2}$/.test(code)) return code;
        if (code.startsWith('Numpad')) return 'Num ' + code.slice(6);
        return code;
    }

    function getCurrentUsername() {
        const el = document.querySelector('.gf-auth-username');
        if (el && el.textContent.trim()) return el.textContent.trim();
        try {
            const w = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
            if (w.gfsConfig && w.gfsConfig.profileSlug) return w.gfsConfig.profileSlug;
        } catch (e) {}
        return 'user';
    }

    function findHeaderAvatarUrl() {
        const slots = ['#gf-auth', '#gf-auth-mobile-slot'];
        for (const sel of slots) {
            const box = document.querySelector(sel);
            const img = box && box.querySelector('img[src*="gofrag_avatars"]');
            if (img && img.getAttribute('src')) return img.getAttribute('src');
        }
        const nameEl = document.querySelector('.gf-auth-username');
        if (!nameEl) return null;
        let box = nameEl.closest('#gf-auth') || nameEl.parentElement;
        for (let i = 0; box && i < 3; i++) {
            const im = box.querySelector('img');
            const src = im && im.getAttribute('src');
            if (src && !/logo\.png/i.test(src)) return src;
            box = box.parentElement;
        }
        return null;
    }

    function findOwnProfileSlug() {
        try {
            const w = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
            if (w.gfsConfig && w.gfsConfig.profileSlug) return w.gfsConfig.profileSlug;
        } catch (e) {}
        const uname = getCurrentUsername();
        if (!uname || uname === 'user') return null;
        const links = document.querySelectorAll('a[href*="/cat/"]');
        for (const a of links) {
            if ((a.textContent || '').trim() === uname) {
                const m = (a.getAttribute('href') || '').match(/\/cat\/([^\/?#]+)/);
                if (m) return decodeURIComponent(m[1]);
            }
        }
        if (/^[a-zA-Z0-9_-]+$/.test(uname)) return uname;
        return null;
    }

    function rememberAvatar(slug, src) {
        try { GM_setValue('gf_avatar_v1', { slug: slug, src: src, ts: Date.now() }); } catch (e) {}
    }

    function applySideAvatar() {
        const boxes = [document.getElementById('gf-side-ava'), document.getElementById('gf-home-ava')].filter(Boolean);
        if (!boxes.length) return;
        const uname = getCurrentUsername();
        const put = url => {
            if (!url) return;
            let abs;
            try { abs = new URL(url, location.origin).href; } catch (e) { return; }
            for (const ava of boxes) {
                const old = ava.querySelector('img');
                if (old) { old.src = abs; continue; }
                const img = document.createElement('img');
                img.className = 'gf-ava-img';
                img.alt = '';
                img.addEventListener('error', () => { img.remove(); ava.textContent = (uname[0] || '?').toUpperCase(); });
                ava.textContent = '';
                ava.appendChild(img);
                img.src = abs;
            }
        };
        const local = findHeaderAvatarUrl();
        if (local) { rememberAvatar(uname, local); put(local); return; }
        let cached = null;
        try { cached = GM_getValue('gf_avatar_v1', null); } catch (e) {}
        if (cached && cached.slug === uname && cached.src) { put(cached.src); return; }
        const slug = findOwnProfileSlug();
        if (!slug) return;
        fetch('/cat/' + encodeURIComponent(slug), { credentials: 'same-origin' }).then(r => {
            if (!r.ok) throw new Error('http ' + r.status);
            return r.text();
        }).then(html => {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const im = doc.getElementById('gf-avatar-img');
            const src = im && im.getAttribute('src');
            if (!src) return;
            rememberAvatar(uname, src);
            put(src);
        }).catch(() => {});
    }

    function getPanelPos(panel) {
        const x = parseFloat(panel.style.left), y = parseFloat(panel.style.top);
        return { x: isNaN(x) ? 60 : x, y: isNaN(y) ? 60 : y };
    }

    GM_addStyle(`
        #gf-menu, #gf-toasts, #gf-watermark { --red: #ff4d9d; --redh: #ff7ab8; }
        #gf-tint-layer { position: fixed; inset: 0; z-index: 2147483000; pointer-events: none; mix-blend-mode: color; display: none; }
        #gf-bg-layer { position: fixed; inset: -20px; z-index: -1; background-size: cover; background-position: center; transform: scale(1.06); display: none; }
        #gf-bg-dim { position: absolute; inset: -20px; }
        /* CRT: экран лампового ТВ — слой на documentElement (вне body): FOV-transform на body его не двигает,
           сам ни на body, ни на html никакого filter/transform не вешает — containing-block лайтбокса не ломается */
        #gf-crt {
            position: fixed; inset: 0; z-index: 2147483001; pointer-events: none; user-select: none;
            display: none;
            background:
                radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.42) 100%),
                repeating-linear-gradient(0deg, rgba(0,0,0,0.17) 0px, rgba(0,0,0,0.17) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 3px),
                linear-gradient(rgba(255,168,84,0.05), rgba(255,168,84,0.05));
            box-shadow: inset 0 0 140px rgba(0,0,0,0.5);
        }
        #gf-crt.gf-crt-on { display: block; }
        #gf-crt.gf-crt-flicker::before { content: ''; position: absolute; inset: 0; background: #000; animation: gf-crt-flick 3.7s steps(1) infinite; }
        #gf-crt::after {
            content: ''; position: absolute; inset: 0;
            background: linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.045) 50%, rgba(255,255,255,0));
            background-size: 100% 220px; background-repeat: no-repeat;
            animation: gf-crt-roll 8s linear infinite;
        }
        @keyframes gf-crt-flick { 0%, 100% { opacity: 0; } 46% { opacity: 0; } 47% { opacity: 0.09; } 48% { opacity: 0; } 81% { opacity: 0.05; } 82% { opacity: 0; } }
        @keyframes gf-crt-roll { from { background-position: 0 -220px; } to { background-position: 0 110vh; } }
        html.gf-fov-on { background: radial-gradient(120% 90% at 50% 35%, #0e0e13, #060609) !important; }
        html.gf-fov-on body { box-shadow: 0 30px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04) !important; will-change: transform; }
        html.gf-fov-zoomin { overflow-x: hidden !important; }
        #gf-cursor {
            position: fixed; left: 0; top: 0; z-index: 9999999999;
            pointer-events: none; width: 0; height: 0; will-change: transform;
        }
        #gf-cursor-inner { width: 0; height: 0; }
        #gf-cursor-inner.gf-pop { animation: gf-cursor-pop 160ms ease-out; }
        @keyframes gf-cursor-pop {
            0% { transform: scale(1); }
            35% { transform: scale(1.9); }
            65% { transform: scale(0.55); }
            100% { transform: scale(1); }
        }

        #gf-menu {
            --frame: #1d1d23; --frameh: #26262d; --framea: #2d2d35;
            --reda: #d6317c;
            --btn: rgba(255,77,157,0.20); --btnh: rgba(255,77,157,0.55);
            --text: #ece9ec; --dis: #84828c; --border: rgba(255,255,255,0.07);
            position: fixed; top: 60px; left: 60px;
            width: min(680px, 94vw); height: min(460px, 88vh);
            border-radius: 14px; overflow: hidden;
            background: rgba(13,13,16,var(--gf-op,0.97));
            border: 1px solid var(--border);
            box-shadow: 0 24px 70px rgba(0,0,0,0.75), 0 0 0 1px rgba(0,0,0,0.6), 0 0 44px rgba(255,77,157,0.10);
            color: var(--text); font-family: 'Segoe UI', Tahoma, sans-serif;
            font-size: 12.5px; line-height: 1.45; display: none; flex-direction: row;
            z-index: 2147483647; user-select: none;
        }
        #gf-menu.gf-visible { display: flex; }
        #gf-menu :is(input, textarea, select, button, a):focus,
        #gf-menu :is(input, textarea, select, button, a):focus-visible {
            outline: none !important; outline-color: transparent !important;
            box-shadow: none !important; border-color: transparent !important;
        }

        .gf-side {
            width: 172px; flex-shrink: 0; display: flex; flex-direction: column;
            padding: 14px 10px 10px; box-sizing: border-box;
            background: rgba(255,255,255,0.02); border-right: 1px solid var(--border);
        }
        .gf-side-logo { font-size: 17px; font-weight: 800; letter-spacing: .4px; color: var(--red); padding: 0 6px; margin: 1px 0 14px; text-shadow: 0 0 14px rgba(255,122,184,0.4); }
        .gf-side-logo span { color: var(--text); text-shadow: none; }
        .gf-nav { flex: 1; min-height: 0; overflow-y: auto; }
        .gf-nav-cap { font-size: 9.5px; text-transform: uppercase; letter-spacing: 1.2px; color: #5f5d66; padding: 10px 8px 4px; }
        .gf-nav-item { position: relative; display: flex; align-items: center; gap: 8px; height: 30px; padding: 0 9px; margin-bottom: 2px; border-radius: 8px; color: var(--dis); cursor: pointer; transition: background .15s, color .15s; }
        .gf-nav-item svg { width: 15px; height: 15px; flex-shrink: 0; }
        .gf-nav-item:hover { color: #d8d6dc; background: rgba(255,255,255,0.04); }
        .gf-nav-item.sel { color: #fff; background: rgba(255,77,157,0.12); }
        .gf-nav-item.sel svg { color: var(--red); filter: drop-shadow(0 0 5px rgba(255,122,184,0.6)); }
        .gf-nav-item::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 3px; height: 0; border-radius: 0 3px 3px 0; background: var(--red); box-shadow: 0 0 8px rgba(255,122,184,0.8); transition: height .18s ease; }
        .gf-nav-item.sel::before { height: 16px; }
        .gf-side-user { display: flex; align-items: center; gap: 8px; margin-top: 10px; padding: 7px 8px; border-radius: 10px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); }
        .gf-side-ava { width: 26px; height: 26px; flex-shrink: 0; border-radius: 50%; background: linear-gradient(135deg, var(--red), #a02a62); color: #fff; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .gf-ava-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .gf-side-uinfo { min-width: 0; }
        .gf-side-uname { font-size: 12px; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .gf-side-utag { font-size: 10px; color: var(--dis); }

        .gf-body { flex: 1; min-width: 0; display: flex; flex-direction: column; }
        #gf-topbar { display: flex; align-items: center; gap: 8px; height: 38px; padding: 0 10px 0 14px; box-sizing: border-box; flex-shrink: 0; cursor: move; border-bottom: 1px solid var(--border); }
        #gf-pane-title { flex: 1; font-size: 12px; font-weight: 600; color: #a7a5ad; letter-spacing: .3px; }

        #gf-content { flex: 1; min-width: 0; min-height: 0; overflow-y: auto; padding: 12px 14px; }
        .gf-pane { display: none; }
        .gf-pane.sel { display: block; animation: gf-pane-in .26s cubic-bezier(.2,.9,.25,1); }
        @keyframes gf-pane-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .gf-cols { columns: 2 240px; column-gap: 10px; }
        .gf-box { break-inside: avoid; background: rgba(255,255,255,0.025); border: 1px solid var(--border); border-radius: 10px; padding: 10px 12px 11px; margin-bottom: 10px; }
        .gf-box-title { font-size: 11px; font-weight: 600; color: #8b8992; margin-bottom: 9px; letter-spacing: .3px; }

        .gf-row { display: flex; flex-direction: column-reverse; align-items: stretch; gap: 4px; margin-bottom: 7px; }
        .gf-row.inline { flex-direction: row; align-items: center; gap: 6px; }
        .gf-lab { font-size: 11.5px; color: #a5a3ac; }
        .gf-sliderrow { margin-bottom: 9px; }
        .gf-slider-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
        .gf-slider-val { font-size: 11px; color: #a5a3ac; }
        .gf-slider-wrap { position: relative; height: 15px; flex: 1; min-width: 40px; background: var(--frame); border-radius: 8px; transition: background .15s; }
        .gf-slider-wrap:hover { background: var(--frameh); }
        #gf-menu .gf-slider-wrap input[type=range] { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; height: 100% !important; min-width: 0 !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; opacity: 0 !important; cursor: pointer; }
        .gf-slider-fill { position: absolute; left: 2px; top: 3px; bottom: 3px; width: 5.5px; max-width: calc(100% - 4px); border-radius: 5px; background: var(--red); opacity: .7; pointer-events: none; }
        .gf-slider-grab { position: absolute; top: 2px; bottom: 2px; width: 11px; border-radius: 6px; background: var(--redh); pointer-events: none; box-shadow: 0 1px 4px rgba(0,0,0,0.5); transition: background .15s, box-shadow .15s; }
        .gf-slider-wrap:hover .gf-slider-grab { box-shadow: 0 0 9px rgba(255,122,184,0.7); }
        .gf-slider-wrap:active .gf-slider-grab { background: #ffa3cf; }

        .gf-check { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; cursor: pointer; }
        #gf-menu .gf-check input { appearance: none !important; -webkit-appearance: none !important; width: 15px !important; height: 15px !important; min-width: 15px !important; max-width: 15px !important; min-height: 15px !important; max-height: 15px !important; margin: 0 !important; padding: 0 !important; background: var(--frame) !important; border: 1px solid rgba(255,255,255,0.12) !important; position: relative; cursor: pointer; flex-shrink: 0; box-sizing: border-box; border-radius: 4px !important; transition: background .15s, border-color .15s, box-shadow .15s; }
        #gf-menu .gf-check input:hover { background: var(--frameh) !important; }
        #gf-menu .gf-check input:checked { background: var(--red) !important; border-color: var(--red) !important; box-shadow: 0 0 8px rgba(255,77,157,0.45); }
        #gf-menu .gf-check input::after { content: ''; position: absolute; left: 4.5px; top: 2.04px; width: 4px; height: 7.5px; border: solid #fff; border-width: 0 1.8px 1.8px 0; transform: rotate(40deg) scale(0); transition: transform .16s cubic-bezier(.3,1.6,.5,1); }
        #gf-menu .gf-check input:checked::after { transform: rotate(40deg) scale(1); }

        .gf-btn { background: var(--btn); border: none; color: var(--text); font: inherit; font-size: 12px; padding: 6px 12px; border-radius: 8px; cursor: pointer; box-sizing: border-box; transition: background .15s, box-shadow .15s; }
        .gf-btn:hover { background: var(--btnh); color: #fff; box-shadow: 0 0 12px rgba(255,77,157,0.35); }
        .gf-btn:active { background: var(--redh); }
        #gf-menu .gf-btn.listening { background: var(--redh) !important; color: #fff !important; animation: gf-listen 1s ease-in-out infinite; }
        @keyframes gf-listen { 50% { box-shadow: 0 0 14px rgba(255,122,184,0.8); } }
        #gf-menu .gf-input, #gf-menu .gf-editor { background: var(--frame); border: 1px solid rgba(255,255,255,0.06); color: var(--text); font: inherit; font-size: 12px; padding: 6px 10px; border-radius: 8px; box-sizing: border-box; min-height: 0; min-width: 0; transition: background .15s, border-color .15s; }
        #gf-menu .gf-input:hover, #gf-menu .gf-editor:hover { background: var(--frameh); }
        #gf-menu .gf-input:focus, #gf-menu .gf-editor:focus { background: var(--framea) !important; border-color: rgba(255,77,157,0.4) !important; }
        #gf-menu input.gf-input { height: 30px; }
        .gf-editor { width: 100%; min-height: 110px; resize: none; font-family: Consolas, 'Courier New', monospace; font-size: 12px; line-height: 1.45; }
        .gf-swatches { display: flex; gap: 3px; flex: 0 0 auto; }
        .gf-swatch { position: relative; width: 19px; height: 19px; flex: 0 0 19px; box-sizing: border-box; overflow: hidden; border-radius: 8px; border: 1px solid rgba(0,0,0,0.6); background: var(--frame); cursor: pointer; transition: box-shadow .15s; }
        .gf-swatch:hover { box-shadow: 0 0 0 1px rgba(255,255,255,0.4); }
        #gf-menu .gf-swatch input[type=color] { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; height: 100% !important; min-width: 0 !important; min-height: 0 !important; max-width: none !important; max-height: none !important; margin: 0 !important; padding: 0 !important; border: none !important; opacity: 0 !important; cursor: pointer; }
        .gf-selectwrap { position: relative; flex: 1; min-width: 0; }
        #gf-menu .gf-select { appearance: none; -webkit-appearance: none; width: 100%; background: var(--frame); border: 1px solid rgba(255,255,255,0.06); color: var(--text); font: inherit; font-size: 12px; padding: 6px 24px 6px 10px; border-radius: 8px; cursor: pointer; box-sizing: border-box; transition: background .15s; }
        #gf-menu .gf-select option { background: #1d1d23; color: #ece9ec; }
        .gf-select:hover { background: var(--frameh); }
        .gf-selectwrap::after { content: ''; position: absolute; right: 7px; top: 50%; margin-top: -2px; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 5px solid var(--red); pointer-events: none; }

        #gf-menu ::-webkit-scrollbar { width: 8px; height: 8px; }
        #gf-menu ::-webkit-scrollbar-track { background: transparent; }
        #gf-menu ::-webkit-scrollbar-thumb { background: #2e2e35; border: 2px solid transparent; background-clip: content-box; border-radius: 8px; }
        #gf-menu ::-webkit-scrollbar-thumb:hover { background-color: var(--red); }
        #gf-menu ::-webkit-scrollbar-corner { background: transparent; }

        #gf-toasts { position: fixed; right: 16px; bottom: 16px; display: flex; flex-direction: column-reverse; gap: 8px; z-index: 2147483645; pointer-events: none; }
        .gf-toast { pointer-events: auto; width: 270px; background: rgba(10,10,11,0.95); border: 1px solid rgba(255,77,157,0.30); box-shadow: 0 8px 30px rgba(0,0,0,0.6), 0 0 20px rgba(255,77,157,0.12); color: #f3ecef; font-family: 'Segoe UI', Tahoma, sans-serif; font-size: 13px; line-height: 1.4; user-select: none; cursor: pointer; display: none; flex-direction: column; border-radius: 14px; overflow: hidden; }
        .gf-toast-title { background: rgba(255,77,157,0.22); padding: 4px 8px; font-size: 12px; color: #ffd9ea; display: flex; justify-content: space-between; align-items: center; }
        .gf-toast-x { color: rgba(236,236,236,0.6); padding: 0 3px; font-size: 11px; }
        .gf-toast-x:hover { color: #fff; }
        .gf-toast-body { padding: 8px 10px 9px; }
        .gf-toast-line2 { color: #8f8a8b; font-size: 12px; margin-top: 2px; }
        .gf-toast-bar { height: 4px; background: #261a20; border-radius: 3px; margin: 0 10px 9px; position: relative; }
        .gf-toast-bar-fill { position: absolute; left: 0; top: 0; bottom: 0; width: 100%; background: var(--red); border-radius: 3px; box-shadow: 0 0 8px rgba(255,122,184,0.7); }

        .gf-feed-status { color: #8f8a8b; font-size: 11.5px; line-height: 1.5; margin-top: 4px; word-break: break-word; }
        .gf-nt-res { margin-top: 6px; }
        .gf-nt-item { display: flex; align-items: center; gap: 8px; padding: 5px 7px; border-radius: 8px; cursor: pointer; }
        .gf-nt-item:hover { background: rgba(255,255,255,0.05); }
        .gf-nt-item + .gf-nt-item { margin-top: 3px; }
        .gf-nt-poster { width: 30px; height: 40px; border-radius: 5px; flex: none; background-color: var(--frame); background-size: cover; background-position: center; }
        .gf-nt-tit { flex: 1; min-width: 0; font-size: 12px; line-height: 1.25; overflow: hidden; }
        .gf-nt-tit > div { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .gf-nt-sub { color: #8f8a8b; font-size: 10.5px; margin-top: 2px; }
        .gf-nt-del, .gf-nt-act { background: none; border: none; color: #8f8a8b; font: inherit; font-size: 12px; cursor: pointer; padding: 3px 7px; border-radius: 6px; flex: none; }
        .gf-nt-del:hover, .gf-nt-act:hover { color: var(--red); background: rgba(255,77,157,0.12); }
        .gf-nt-act:disabled, .gf-nt-act.is-added { opacity: .55; cursor: default; background: none; color: var(--red); }
        .gf-nt-cap { color: #8f8a8b; font-size: 10.5px; text-transform: uppercase; letter-spacing: .6px; margin: 9px 0 3px; }
        .gf-nt-empty { color: #8f8a8b; font-size: 11.5px; padding: 2px 0; }
        #gf-menu .gf-nt-ava { width: 30px; height: 30px; border-radius: 50%; flex: none; background-color: var(--frame); background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; color: #ece9ec; font-size: 12px; font-weight: 700; overflow: hidden; }
        #gf-menu .gf-nt-item.is-sel { outline: 1px solid var(--red); background: rgba(255,77,157,0.08); }
        .gf-home-id { display: flex; align-items: center; gap: 10px; }
        .gf-home-ava { width: 44px; height: 44px; flex-shrink: 0; border-radius: 50%; background: linear-gradient(135deg, var(--red), #a02a62); color: #fff; font-size: 16px; font-weight: 700; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .gf-home-idtxt { min-width: 0; }
        .gf-home-hello { font-size: 16px; font-weight: 600; color: #f3ecef; margin: 0 0 5px; }
        .gf-home-hello b { color: var(--redh); text-shadow: 0 0 14px rgba(255,122,184,0.55); }
        .gf-home-ver { font-size: 11px; color: var(--dis); }
        .gf-home-btn { display: flex; align-items: center; gap: 8px; width: 100%; box-sizing: border-box; text-align: left; background: var(--btn); border: none; border-radius: 12px; color: var(--text); font: inherit; padding: 8px 14px; cursor: pointer; margin-bottom: 7px; text-decoration: none; transition: background .15s, padding-left .18s ease, box-shadow .15s; }
        .gf-home-btn:hover { background: var(--btnh); color: var(--text) !important; padding-left: 18px; box-shadow: 0 0 14px rgba(255,77,157,0.4); }
        .gf-home-btn:active { background: var(--redh); color: var(--text) !important; }
        .gf-home-btn .gf-home-arrow { margin-left: auto; color: rgba(236,236,236,0.55); }

        #gf-watermark {
            position: fixed; z-index: 2147483646;
            pointer-events: none; user-select: none;
            background: rgba(10,10,11,0.94); border: 1px solid rgba(255,77,157,0.35); border-radius: 12px;
            box-shadow: 0 0 14px rgba(255,77,157,0.18);
            color: #f3ecef; font-family: 'Segoe UI', Tahoma, sans-serif;
            font-size: 12px; line-height: 1; padding: 5px 9px; white-space: nowrap;
        }
        .gf-wm-brand { color: var(--red); font-weight: 700; letter-spacing: .5px; text-shadow: 0 0 10px rgba(255,122,184,0.45); }
        .gf-wm-suffix { color: #fff; font-weight: 700; letter-spacing: .5px; }
        .gf-load-more-wrap .gf-load-all { margin-left: 8px; opacity: .92; }
        .gf-egg-badge {
            display: inline-flex; align-items: center;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: .8px;
            text-transform: uppercase;
            padding: 3px 9px;
            border-radius: 4px;
            line-height: 1.7;
            color: #0b0d10 !important;
            background: var(--egg-bg, #f472b6) !important;
            white-space: nowrap; user-select: none;
        }
        .gf-sidebar-btn .gf-fc2__glink-label { color: var(--redh) !important; }
        .gf-sidebar-btn:hover .gf-fc2__glink-label { color: #ff9ccb !important; }

        @media (prefers-reduced-motion: reduce) {
            #gf-menu *, .gf-toast * { animation: none !important; transition: none !important; }
        }
    `);

    const NAV_ICONS = {
        home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.3V21h13V9.3"/></svg>',
        visuals: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 .2 18h1a2 2 0 0 0 1.3-3.5c-.9-.8-.3-2.3.9-2.3h2.1A3.5 3.5 0 0 0 21 11.7C21 6.9 17 3 12 3Z"/><circle cx="7.8" cy="11.8" r="1.1"/><circle cx="11.2" cy="7.6" r="1.1"/><circle cx="15.6" cy="8.8" r="1.1"/></svg>',
        game: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="8" width="19" height="9" rx="4.5"/><path d="M8 11v3M6.5 12.5h3"/><path d="M15.4 11.7h.01M17.8 13.6h.01"/></svg>',
        cat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="9.5" r="1.5"/><circle cx="12" cy="7.5" r="1.5"/><circle cx="16.5" cy="9.5" r="1.5"/><path d="M12 12c-2.7 0-4.8 2.1-4.8 4.2 0 1.4 1 2.4 2.4 2.4.9 0 1.5-.4 2.4-.4s1.5.4 2.4.4c1.4 0 2.4-1 2.4-2.4 0-2.1-2.1-4.2-4.8-4.2Z"/></svg>',
        extras: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4.5 13.6 9l4.6 1.6-4.6 1.6L12 16.8l-1.6-4.6L5.8 10.6 10.4 9 12 4.5Z"/><path d="M18.5 15.5l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9Z"/></svg>',
        accounts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2.8" y="5" width="18.4" height="14" rx="2.5"/><circle cx="8.6" cy="10.6" r="1.9"/><path d="M5.4 15.9c.6-1.5 1.8-2.3 3.2-2.3s2.6.8 3.2 2.3"/><path d="M14.6 9.8h4.4M14.6 13.2h3.2"/></svg>'
    };
    function box(title, body) { return `<div class="gf-box"><div class="gf-box-title">${title}</div>${body}</div>`; }
    function sliderRow(id, label, min, max, value, suffix) { return `<div class="gf-sliderrow"><div class="gf-slider-top"><span class="gf-lab">${label}</span><span class="gf-slider-val" id="${id}-lbl">${value}${suffix}</span></div><div class="gf-slider-wrap"><input type="range" id="${id}" min="${min}" max="${max}" value="${value}"><div class="gf-slider-fill" id="${id}-fill"></div><div class="gf-slider-grab" id="${id}-grab"></div></div></div>`; }
    function checkRow(id, label, checked) { return `<label class="gf-check"><input type="checkbox" id="${id}"${checked ? ' checked' : ''}><span>${label}</span></label>`; }

    function buildMenu() {
        const menu = document.createElement('div'); menu.id = 'gf-menu';
        menu.innerHTML = `
            <div class="gf-side">
                <div class="gf-side-logo">blo<span>haj</span></div>
                <div class="gf-nav">
                    <div class="gf-nav-cap">${t('g_main')}</div>
                    <div class="gf-nav-item sel" data-pane="home">${NAV_ICONS.home}<span>${t('nav_home')}</span></div>
                    <div class="gf-nav-item" data-pane="visuals">${NAV_ICONS.visuals}<span>${t('nav_visuals')}</span></div>
                    <div class="gf-nav-cap">${t('g_misc')}</div>
                    <div class="gf-nav-item" data-pane="gamepage">${NAV_ICONS.game}<span>${t('nav_gamepage')}</span></div>
                    <div class="gf-nav-item" data-pane="accounts">${NAV_ICONS.accounts}<span>${t('nav_accounts')}</span></div>
                    <div class="gf-nav-item" data-pane="cat">${NAV_ICONS.cat}<span>${t('nav_cat')}</span></div>
                    <div class="gf-nav-item" data-pane="extras">${NAV_ICONS.extras}<span>${t('nav_extras')}</span></div>
                </div>
                <div class="gf-side-user">
                    <div class="gf-side-ava" id="gf-side-ava">?</div>
                    <div class="gf-side-uinfo">
                        <div class="gf-side-uname" id="gf-side-uname">user</div>
                        <div class="gf-side-utag">blohaj v${VERSION}</div>
                    </div>
                </div>
            </div>
            <div class="gf-body">
            <div id="gf-topbar"><span id="gf-pane-title">${t('nav_home')}</span></div>
            <div id="gf-content">
                <div class="gf-pane sel" data-pane="home">
                    <div class="gf-cols">
                        ${box('blohaj', `<div class="gf-home-id"><div class="gf-home-ava" id="gf-home-ava">?</div><div class="gf-home-idtxt"><div class="gf-home-hello">${t('welcome')} <b>${getCurrentUsername()}</b></div><div class="gf-home-ver">${t('home_build')}: v${VERSION}</div></div></div>`)}
                        ${box(t('home_links'), `
                            <a class="gf-home-btn" href="https://t.me/gf_util" target="_blank" rel="noopener noreferrer">${t('tg')} <span class="gf-home-arrow">&#8599;</span></a>
                            <a class="gf-home-btn" href="https://github.com/pianino2/gf-util" target="_blank" rel="noopener noreferrer">${t('gh')} <span class="gf-home-arrow">&#8599;</span></a>
                        `)}
                    </div>
                </div>
                <div class="gf-pane" data-pane="visuals">
                    <div class="gf-cols">
                        ${box(t('winopts'), `${sliderRow('gf-op', t('opacity'), 40, 100, settings.window.opacity, '%')}${checkRow('gf-nomove', t('nomove'), settings.window.noMove)}${checkRow('gf-sidebar-toggle', t('sidebar_btn'), settings.window.sidebarButton)}<div class="gf-row"><button class="gf-btn" id="gf-hotkey-btn" style="flex:1">${keyDisplayName(settings.window.hotkey)}</button><span class="gf-lab">${t('key')}</span></div><div class="gf-row"><div class="gf-selectwrap"><select class="gf-select" id="gf-anim"><option value="none">${t('anim_none')}</option><option value="fade">${t('anim_fade')}</option><option value="slideL">${t('anim_slideL')}</option><option value="slideR">${t('anim_slideR')}</option><option value="slideU">${t('anim_slideU')}</option><option value="slideD">${t('anim_slideD')}</option><option value="zoom">${t('anim_zoom')}</option><option value="zoomUp">${t('anim_zoomUp')}</option><option value="pop">${t('anim_pop')}</option></select></div><span class="gf-lab">${t('anim')}</span></div>${sliderRow('gf-animdur', t('duration'), 60, 500, settings.window.animDuration, 'ms')}<div class="gf-row"><button class="gf-btn" id="gf-animpreview">${t('preview')}</button></div>`)}
                        ${box(t('watermark'), `
                            ${checkRow('gf-wm-on', t('wm_enabled'), settings.window.watermark)}
                            <div class="gf-row"><div class="gf-selectwrap"><select class="gf-select" id="gf-wm-corner">
                                <option value="tl">${t('corner_tl')}</option>
                                <option value="tr">${t('corner_tr')}</option>
                                <option value="bl">${t('corner_bl')}</option>
                                <option value="br">${t('corner_br')}</option>
                            </select></div><span class="gf-lab">${t('wm_corner')}</span></div>
                            ${checkRow('gf-wm-user', t('wm_user'), settings.window.watermarkUser)}
                            ${checkRow('gf-wm-time', t('wm_time'), settings.window.watermarkTime)}
                            ${checkRow('gf-wm-fps', t('wm_fps'), settings.window.watermarkFps)}
                        `)}
                        ${box(t('tint'), `<div class="gf-row"><div class="gf-swatches"><div class="gf-swatch" id="gf-sw1"><input type="color" id="gf-c1" value="${settings.theme.tintColor1}"></div><div class="gf-swatch" id="gf-sw2"><input type="color" id="gf-c2" value="${settings.theme.tintColor2}"></div></div><span class="gf-lab">${t('tint_lab')}</span></div>${sliderRow('gf-amt', t('amount'), 0, 100, settings.theme.tintAmount, '%')}<div class="gf-row"><button class="gf-btn" id="gf-random">${t('random')}</button></div>`)}
                        ${box(t('bg'), `<div class="gf-row"><input type="text" class="gf-input" id="gf-bgurl" placeholder="${t('bg_url_ph')}" value="${settings.theme.bgImage.startsWith('data:') ? '' : settings.theme.bgImage}"></div><div class="gf-row inline"><button class="gf-btn" id="gf-browse">${t('browse')}</button><button class="gf-btn" id="gf-bgclear">${t('clear')}</button><input type="file" id="gf-bgfile" accept="image/*" style="display:none"></div>${sliderRow('gf-blur', t('blur'), 0, 40, settings.theme.bgBlur, 'px')}${sliderRow('gf-dim', t('dim'), 0, 90, settings.theme.bgDim, '%')}`)}
                        ${box(t('font'), `<div class="gf-row"><div class="gf-selectwrap"><select class="gf-select" id="gf-font"><option value="default">${t('font_default')}</option><option value="system">${t('font_system')}</option><option value="roboto">Roboto</option><option value="montserrat">Montserrat</option><option value="mono">JetBrains Mono</option><option value="serif">${t('font_serif')}</option><option value="comic">Comic Neue</option></select></div><span class="gf-lab">${t('family')}</span></div>`)}
                        ${box(t('cursor'), `
                            <div class="gf-row"><div class="gf-selectwrap"><select class="gf-select" id="gf-curmode">
                                <option value="default">${t('cursor_default')}</option>
                                <option value="dot">${t('cursor_dot')}</option>
                                <option value="cross">${t('cursor_cross')}</option>
                                <option value="circle">${t('cursor_circle')}</option>
                                <option value="arrow">${t('cursor_arrow')}</option>
                            </select></div><span class="gf-lab">${t('cursor_mode')}</span></div>
                            <div class="gf-row"><div class="gf-swatches"><div class="gf-swatch" id="gf-swcur"><input type="color" id="gf-cursor-color" value="${settings.theme.cursor.color}"></div></div><span class="gf-lab">${t('cursor_color')}</span></div>
                            ${sliderRow('gf-cursor-smooth', t('cursor_smooth'), 0, 150, settings.theme.cursor.smooth, 'ms')}
                            ${sliderRow('gf-cursor-size', t('cursor_size'), 6, 24, settings.theme.cursor.size, 'px')}
                            ${sliderRow('gf-cursor-width', t('cursor_width'), 1, 6, settings.theme.cursor.width, 'px')}
                            ${sliderRow('gf-cursor-alpha', t('cursor_alpha'), 10, 100, settings.theme.cursor.alpha, '%')}
                            ${checkRow('gf-cursor-anim', t('cursor_anim'), settings.theme.cursor.anim)}
                        `)}
                        ${box('FOV Changer', `
                            ${checkRow('gf-fov-on', t('fov_enabled'), settings.fov.enabled)}
                            ${sliderRow('gf-fov-val', 'FOV', 70, 170, settings.fov.fov, '°')}
                            ${checkRow('gf-fov-pan', t('fov_pan'), settings.fov.pan)}
                            ${sliderRow('gf-fov-panam', t('fov_panam'), 10, 200, settings.fov.panAmount, 'px')}
                            ${sliderRow('gf-fov-smooth', t('fov_smooth'), 0, 250, settings.fov.smooth, 'ms')}
                        `)}
                        ${box(t('crt'), `
                            ${checkRow('gf-crt-on', t('fov_enabled'), settings.crt.enabled)}
                            ${checkRow('gf-crt-flick', t('crt_flick'), settings.crt.flicker)}
                            ${sliderRow('gf-crt-str', t('crt_str'), 10, 100, settings.crt.strength, '%')}
                        `)}
                        ${box(t('mb'), `${checkRow('gf-mb-on', t('fov_enabled'), settings.mb.enabled)}`)}
                        ${box(t('changer'), `
                            <div class="gf-row"><div class="gf-selectwrap"><select class="gf-select" id="gf-catbreed">
                                <option value="auto">${t('breed_auto')}</option>
                                <option value="classic">Classic</option>
                                <option value="ginger">Ginger</option>
                                <option value="siamese">Siamese</option>
                                <option value="mainecoon">Maine coon</option>
                                <option value="bengal">Bengal</option>
                                <option value="neva">Neva</option>
                                <option value="black">Black</option>
                            </select></div><span class="gf-lab">${t('breed')}</span></div>
                            <div class="gf-row"><div class="gf-selectwrap"><select class="gf-select" id="gf-catstage">
                                <option value="auto">${t('stage_auto')}</option>
                                <option value="0">1</option>
                                <option value="1">2</option>
                                <option value="2">3</option>
                                <option value="3">4</option>
                            </select></div><span class="gf-lab">${t('stage')}</span></div>
                            <div class="gf-row"><button class="gf-btn" id="gf-catreset">${t('reset')}</button></div>
                        `)}
                    </div>
                    <div class="gf-row"><button class="gf-btn" id="gf-reset-theme">${t('reset_theme')}</button></div>
                </div>
                <div class="gf-pane" data-pane="gamepage">
                    <div class="gf-cols">
                        ${box(t('comments'), `${checkRow('gf-gp-loadall', t('show_loadall'), settings.gamepage.commentsLoadAll)}${checkRow('gf-entersubmit', t('enter_submit'), settings.gamepage.enterSubmit)}`)}
                        ${box(t('notifs'), `
                            ${checkRow('gf-nt-on', t('nt_on'), settings.gamepage.notifs.enabled)}
                            ${sliderRow('gf-nt-int', t('nt_int'), 1, 60, settings.gamepage.notifs.interval, ' мин')}
                            <div class="gf-row inline"><input class="gf-input" id="gf-nt-q" style="flex:1;min-width:0" placeholder="${t('nt_ph')}" spellcheck="false"><button class="gf-btn" id="gf-nt-go">${t('nt_find')}</button></div>
                            <div class="gf-nt-res" id="gf-nt-res"></div>
                            <div class="gf-nt-cap">${t('nt_tracked')}</div>
                            <div class="gf-nt-list" id="gf-nt-list"></div>
                            <div class="gf-row" style="margin-top:8px"><button class="gf-btn" id="gf-nt-now">${t('nt_now')}</button></div>
                        `)}
                    </div>
                </div>
                <div class="gf-pane" data-pane="accounts">
                    <div class="gf-cols">
                        ${box(t('accounts'), `
                            <div class="gf-row inline"><input class="gf-input" id="gf-ac-login" style="flex:1;min-width:0" placeholder="${t('ac_login_ph')}" spellcheck="false" autocomplete="off"><input class="gf-input" id="gf-ac-pass" style="flex:1;min-width:0" type="password" placeholder="${t('ac_pass_ph')}" autocomplete="off"></div>
                            <div class="gf-row" style="margin-top:6px"><button class="gf-btn" id="gf-ac-save">${t('ac_save')}</button></div>
                            <div class="gf-nt-cap">${t('ac_list_cap')}</div>
                            <div class="gf-nt-list" id="gf-ac-list"></div>
                        `)}
                    </div>
                </div>
                <div class="gf-pane" data-pane="cat">
                    <div class="gf-cols">
                        ${box(t('feeder'), `${checkRow('gf-autofeed', t('autofeed'), settings.cat.autoFeed)}<div class="gf-row"><button class="gf-btn" id="gf-feednow">${t('feednow')}</button></div><div class="gf-feed-status" id="gf-feed-status"></div>`)}
                        ${box(t('devourer'), `${checkRow('gf-autofeed-dev', t('autofeed'), settings.cat.autoFeedDevourer)}<div class="gf-row"><button class="gf-btn" id="gf-feednow-dev">${t('feednow')}</button></div><div class="gf-feed-status" id="gf-feed-status-dev"></div>`)}
                    </div>
                </div>
                <div class="gf-pane" data-pane="extras">
                    <div class="gf-cols">
                        ${box(t('lf_cap'), `
                            ${checkRow('gf-lf-on', t('lf_on'), settings.lastfm.enabled)}
                            <div class="gf-row" style="margin-top:6px"><input class="gf-input" id="gf-lf-nick" style="width:100%" placeholder="${t('lf_nick_ph')}" spellcheck="false" autocomplete="off"></div>
                            <div class="gf-row" style="margin-top:6px"><button class="gf-btn" id="gf-lf-now">${t('lf_now')}</button></div>
                            <div class="gf-feed-status" id="gf-lf-status"></div>
                        `)}
                    </div>
                    <div class="gf-row"><button class="gf-btn" id="gf-reset-all">${t('reset_all')}</button></div>
                </div>
            </div>
            </div>`;
        document.documentElement.appendChild(menu); return menu;
    }

    function ensureToastRoot() {
        let wrap = document.getElementById('gf-toasts');
        if (!wrap) { wrap = document.createElement('div'); wrap.id = 'gf-toasts'; document.documentElement.appendChild(wrap); }
        return wrap;
    }

    function showToast({ title = BRAND, line1 = '', line2 = '', life = 4200, onClick = null } = {}) {
        const wrap = ensureToastRoot();
        const el = document.createElement('div');
        el.className = 'gf-toast';
        el.innerHTML = `
            <div class="gf-toast-title"><span>${title}</span><span class="gf-toast-x">&#10005;</span></div>
            <div class="gf-toast-body">
                <div>${line1}</div>
                ${line2 ? `<div class="gf-toast-line2">${line2}</div>` : ''}
            </div>
            <div class="gf-toast-bar"><div class="gf-toast-bar-fill"></div></div>`;
        wrap.appendChild(el);

        const IN_DUR = 180, OUT_DUR = 220, SLIDE = 60;
        const fill = el.querySelector('.gf-toast-bar-fill');
        const t0 = performance.now();
        let raf = null, done = false, poseO = 0, poseX = SLIDE;

        function render() { el.style.opacity = String(poseO); el.style.transform = `translateX(${poseX}px)`; }
        function close() {
            if (done) return; done = true;
            if (raf) cancelAnimationFrame(raf);
            const s = performance.now(), o0 = poseO, x0 = poseX;
            const stepOut = (now) => {
                const k = Math.min(1, (now - s) / OUT_DUR);
                const e = k * k;
                poseO = o0 * (1 - e); poseX = x0 + SLIDE * e;
                render();
                if (k < 1) requestAnimationFrame(stepOut); else el.remove();
            };
            requestAnimationFrame(stepOut);
        }
        el.addEventListener('click', () => { if (onClick) onClick(); close(); });
        el.style.display = 'flex';
        const step = (now) => {
            if (done) return;
            const dt = now - t0;
            if (dt <= IN_DUR) {
                const e = 1 - Math.pow(1 - dt / IN_DUR, 3);
                poseO = e; poseX = SLIDE * (1 - e);
            } else {
                poseO = 1; poseX = 0;
                fill.style.width = (Math.max(0, 1 - (dt - IN_DUR) / (life - IN_DUR)) * 100).toFixed(2) + '%';
            }
            render();
            if (dt >= life) { close(); return; }
            raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
    }

    const WM_WORD = 'blohaj';
    const WM_SUFFIX = '.pianino2.xyz';
    const WM_SYMBOLS = '!@#$%^&*()_+№;%:?*()';
    const WM_STEP = 160, WM_RUNS = 5, WM_PAUSE = 1800;
    const WM_RUN = WM_STEP * WM_WORD.length * WM_RUNS;
    const WM_TOTAL = WM_RUN + WM_PAUSE;

    let wmEl = null, wmRestEl = null, wmBrandEl = null, wmLetters = [];
    let wmTimer = null, wmFpsRaf = null, wmAnimRaf = null, wmAnimStart = 0, wmLastKey = '';
    let wmFrames = 0, wmLast = performance.now(), wmFps = 0;

    function wmFpsLoop(now) {
        wmFrames++;
        if (now - wmLast >= 1000) {
            const v = Math.round(wmFrames * 1000 / (now - wmLast));
            wmFrames = 0; wmLast = now;
            if (v !== wmFps) { wmFps = v; wmBuild(); }
        }
        wmFpsRaf = requestAnimationFrame(wmFpsLoop);
    }

    function wmApplyCorner() {
        if (!wmEl) return;
        const c = settings.window.watermarkCorner || 'tl';
        const offs = '10px';
        wmEl.style.top = 'auto'; wmEl.style.bottom = 'auto';
        wmEl.style.left = 'auto'; wmEl.style.right = 'auto';
        if (c === 'tl') { wmEl.style.top = offs; wmEl.style.left = offs; }
        else if (c === 'tr') { wmEl.style.top = offs; wmEl.style.right = offs; }
        else if (c === 'bl') { wmEl.style.bottom = offs; wmEl.style.left = offs; }
        else { wmEl.style.bottom = offs; wmEl.style.right = offs; }
    }

    function wmRestText() {
        const parts = [];
        if (settings.window.watermarkUser) parts.push(getCurrentUsername());
        if (settings.window.watermarkTime) {
            const d = new Date();
            const p = n => String(n).padStart(2, '0');
            parts.push(`${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`);
        }
        if (settings.window.watermarkFps) parts.push(wmFps + ' fps');
        return parts.length ? ' | ' + parts.join(' | ') : '';
    }

    function wmBuild() {
        if (wmRestEl) wmRestEl.textContent = wmRestText();
    }

    function wmLettersReset() {
        WM_WORD.split('').forEach((ch, i) => {
            const s = wmLetters[i];
            if (s.textContent !== ch) s.textContent = ch;
        });
    }

    function wmAnimFrame(now) {
        if (!wmEl) { wmAnimRaf = null; return; }
        const el = (now - wmAnimStart) % WM_TOTAL;
        if (el < WM_RUN) {
            const k = Math.floor(el / WM_STEP);
            if (wmLastKey !== 's' + k) {
                wmLastKey = 's' + k;
                const pos = k % WM_WORD.length;
                WM_WORD.split('').forEach((ch, i) => {
                    wmLetters[i].textContent = i === pos ? WM_SYMBOLS[Math.floor(Math.random() * WM_SYMBOLS.length)] : ch;
                });
            }
        } else if (wmLastKey !== 'p') {
            wmLastKey = 'p';
            wmLettersReset();
        }
        wmAnimRaf = requestAnimationFrame(wmAnimFrame);
    }

    function wmStartAnim() {
        if (wmAnimRaf || !wmLetters.length) return;
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        wmAnimStart = performance.now();
        wmLastKey = '';
        wmAnimRaf = requestAnimationFrame(wmAnimFrame);
    }

    function wmStopAnim() {
        if (wmAnimRaf) { cancelAnimationFrame(wmAnimRaf); wmAnimRaf = null; }
    }

    function syncWatermark() {
        const on = settings.window.watermark;
        if (!on) {
            if (wmEl) {
                wmStopAnim();
                if (wmTimer) { clearInterval(wmTimer); wmTimer = null; }
                if (wmFpsRaf) { cancelAnimationFrame(wmFpsRaf); wmFpsRaf = null; }
                wmEl.remove();
                wmEl = null; wmRestEl = null; wmBrandEl = null; wmLetters = [];
            }
            return;
        }
        if (!wmEl) {
            wmEl = document.createElement('div');
            wmEl.id = 'gf-watermark';
            wmBrandEl = document.createElement('span');
            wmBrandEl.className = 'gf-wm-brand';
            wmLetters = WM_WORD.split('').map(ch => {
                const s = document.createElement('span');
                s.className = 'gf-wm-ch';
                s.textContent = ch;
                wmBrandEl.appendChild(s);
                return s;
            });
            const wmSuffixEl = document.createElement('span');
            wmSuffixEl.className = 'gf-wm-suffix';
            wmSuffixEl.textContent = WM_SUFFIX;
            wmRestEl = document.createElement('span');
            wmRestEl.className = 'gf-wm-rest';
            wmEl.appendChild(wmBrandEl);
            wmEl.appendChild(wmSuffixEl);
            wmEl.appendChild(wmRestEl);
            document.documentElement.appendChild(wmEl);
            wmStartAnim();
        }
        wmApplyCorner();
        if (!wmTimer) wmTimer = setInterval(wmBuild, 1000);
        if (settings.window.watermarkFps && !wmFpsRaf) { wmFrames = 0; wmLast = performance.now(); wmFpsRaf = requestAnimationFrame(wmFpsLoop); }
        if (!settings.window.watermarkFps && wmFpsRaf) { cancelAnimationFrame(wmFpsRaf); wmFpsRaf = null; }
        wmBuild();
    }

    function getCsrfToken() {
        try {
            const w = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
            if (w.gfsConfig && w.gfsConfig.csrf) return w.gfsConfig.csrf;
            if (w.GofragFish && w.GofragFish.token) return w.GofragFish.token;
        } catch (e) {}
        for (const i of document.querySelectorAll('input[type="hidden"][value="1"]')) {
            if (/^[a-f0-9]{32}$/.test(i.name || '')) return i.name;
        }
        return null;
    }

    async function postFeed(task) {
        const token = getCsrfToken();
        if (!token) return { ok: false, msg: t('csrf_err') };
        const fd = new FormData();
        fd.append(token, '1');
        try {
            const r = await fetch(`/index.php?option=com_gofrag_community&task=${task}&format=json`, {
                method: 'POST', body: fd, credentials: 'same-origin',
                headers: { 'X-Requested-With': 'XMLHttpRequest' }
            });
            const j = await r.json();
            return { ok: !!j.success, data: j };
        } catch (e) {
            return { ok: false, msg: String(e) };
        }
    }

    function isQuietFail(res) {
        if (res.ok) return false;
        const msg = String((res.data && (res.data.message || res.data.error)) || res.msg || '').toLowerCase();
        return msg.includes('уже') || msg.includes('already') ||
               msg.includes('сегодня') || msg.includes('today') ||
               msg.includes('лимит') || msg.includes('limit');
    }

    function feedFailText(res) {
        const d = res.data || {};
        return t('failed') + (d.message || d.error || res.msg || t('unknown_err'));
    }

    function feedResultText(res) {
        if (res.ok) {
            const d = res.data;
            const income = d.income != null ? d.income : '?';
            const bal = d.new_balance != null ? d.new_balance : '?';
            const streak = d.streak != null ? d.streak : '?';
            return tf('fed_ok', { INCOME: income, BAL: bal, STREAK: streak }) + (d.stage_changed ? t('fed_new_stage') : '');
        }
        if (isQuietFail(res)) return t('fed_today');
        return feedFailText(res);
    }

    function devourerResultText(res) {
        if (res.ok) {
            const d = res.data;
            const income = d.reward_amount != null ? d.reward_amount : (d.income != null ? d.income : '?');
            return tf('fed_dev', { INCOME: income, BAL: d.balance != null ? d.balance : '?', LEFT: d.today_left != null ? d.today_left : '?' });
        }
        if (isQuietFail(res)) return t('fed_limit');
        return feedFailText(res);
    }

    const CAT_BREEDS = {
        classic:  n => `/images/cat/cat_stage${n}.webp`,
        ginger:   n => `/images/cat/breeds/ginger/stage${n}.webp`,
        siamese:  n => `/images/cat/breeds/siamese/stage${n}.webp`,
        mainecoon: n => `/images/cat/breeds/mainecoon/stage${n}.webp`,
        bengal:   n => `/images/cat/breeds/bengal/stage${n}.webp`,
        neva:     n => `/images/cat/breeds/neva/stage${n}.webp`,
        black:    n => `/images/cat/breeds/black/stage${n}.webp`
    };
    let catSkinObserver = null;

    function applyCatSkin() {
        const img = document.getElementById('gf-tama-img');
        if (!img) return;
        if (!img.dataset.gfOrigSrc) img.dataset.gfOrigSrc = img.getAttribute('src') || '';
        const orig = img.dataset.gfOrigSrc;

        let origBreed = 'classic', origStage = null;
        let m = orig.match(/\/breeds\/([a-z]+)\/stage(\d)\.webp/i);
        if (m) { origBreed = m[1].toLowerCase(); origStage = +m[2]; }
        else {
            m = orig.match(/cat_stage(\d)\.webp/i);
            if (m) origStage = +m[1];
        }
        if (origStage == null) {
            const tama = document.getElementById('gf-tama');
            if (tama) origStage = parseInt(tama.dataset.stage || '0', 10) || 0;
        }

        const breed = settings.cat.breed !== 'auto' ? settings.cat.breed : origBreed;
        let stage = origStage != null ? origStage : 0;
        if (settings.cat.stage !== 'auto') stage = parseInt(settings.cat.stage, 10) || 0;

        let url;
        if (settings.cat.breed === 'auto' && settings.cat.stage === 'auto') {
            url = orig;
        } else {
            url = (CAT_BREEDS[breed] || CAT_BREEDS.classic)(stage);
        }
        if (img.getAttribute('src') !== url) img.setAttribute('src', url);

        if (!catSkinObserver && img.isConnected) {
            catSkinObserver = new MutationObserver(() => applyCatSkin());
            catSkinObserver.observe(img, { attributes: true, attributeFilter: ['src'] });
        }
    }

    const gfSleep = ms => new Promise(r => setTimeout(r, ms));

    function gfWaitFor(cond, timeout) {
        return new Promise(resolve => {
            const t0 = performance.now();
            (function poll() {
                if (cond()) { resolve(true); return; }
                if (performance.now() - t0 >= timeout) { resolve(false); return; }
                setTimeout(poll, 200);
            })();
        });
    }

    function gfSiteLoadMoreBtn() {
        return document.querySelector('.gf-load-more:not(.gf-load-all)');
    }

    function injectLoadAllBtn() {
        if (!settings.gamepage.commentsLoadAll) return;
        const wrap = document.querySelector('.gf-load-more-wrap');
        if (!wrap || wrap.querySelector('.gf-load-all')) return;
        const site = gfSiteLoadMoreBtn();
        if (!site) return;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'gf-load-more gf-load-all';
        btn.textContent = t('load_all');
        btn.addEventListener('click', () => runLoadAllComments(btn));
        wrap.appendChild(btn);
    }

    function removeLoadAllBtn() {
        document.querySelectorAll('.gf-load-all').forEach(b => b.remove());
    }

    let loadAllObserver = null;

    async function runLoadAllComments(btn) {
        if (btn.dataset.running === '1') return;
        btn.dataset.running = '1';
        const MAX_PAGES = 500;
        let clicked = 0;
        while (clicked < MAX_PAGES) {
            const site = gfSiteLoadMoreBtn();
            if (!site || site.offsetParent === null) break;
            const before = site.getAttribute('data-page');
            site.click();
            clicked++;
            btn.textContent = tf('load_all_prog', { N: clicked });
            const progressed = await gfWaitFor(() => {
                const s2 = gfSiteLoadMoreBtn();
                return !s2 || s2.getAttribute('data-page') !== before;
            }, 15000);
            if (!progressed) break;
            await gfSleep(150);
        }
        btn.textContent = t('load_all_done');
        btn.disabled = true;
        delete btn.dataset.running;
        setTimeout(() => { if (btn.isConnected) btn.remove(); }, 2500);
    }

    function initLoadAllComments() {
        if (settings.gamepage.commentsLoadAll) injectLoadAllBtn();
        else removeLoadAllBtn();
        if (!loadAllObserver) {
            loadAllObserver = new MutationObserver(() => {
                injectLoadAllBtn();
                applyEggBadges();
                injectSidebarButton();
            });
            loadAllObserver.observe(document.body, { childList: true, subtree: true });
        }
    }

    const NT_MAX = 12;
    let ntTimer = null, ntBusy = false, ntHits = [];
    function ntEsc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

    async function ntFetchTotal(g) {
        try {
            const r = await fetch('/' + encodeURIComponent(g.cat) + '/' + encodeURIComponent(g.alias), { credentials: 'same-origin' });
            if (!r.ok) return null;
            const m = /totalComments:\s*(\d+)/.exec(await r.text());
            return m ? +m[1] : null;
        } catch (e) { return null; }
    }

    async function ntSearch(q) {
        const r = await fetch('/api/search?q=' + encodeURIComponent(q) + '&limit=4', { credentials: 'same-origin' });
        if (!r.ok) throw new Error(String(r.status));
        const j = await r.json();
        return (j.hits || []).filter(h => h && h.alias && h.cat_alias);
    }

    function ntRenderPoster(p) { return '<div class="gf-nt-poster" style="background-image:url(\'' + ntEsc(p || '') + '\')"></div>'; }

    function ntRenderTracked() {
        const el = document.getElementById('gf-nt-list');
        if (!el) return;
        const games = settings.gamepage.notifs.games;
        if (!games.length) { el.innerHTML = '<div class="gf-nt-empty">' + t('nt_empty') + '</div>'; return; }
        el.innerHTML = games.map((g, i) => `
            <div class="gf-nt-item" data-gi="${i}" data-href="/${ntEsc(g.cat)}/${ntEsc(g.alias)}">
                ${ntRenderPoster(g.poster)}
                <div class="gf-nt-tit"><div>${ntEsc(g.title)}</div><div class="gf-nt-sub">/${ntEsc(g.cat)}/${ntEsc(g.alias)}${g.count != null ? ' · ' + tf('nt_count', { N: g.count }) : ''}</div></div>
                <button class="gf-nt-del" data-del="${i}">&#10005;</button>
            </div>`).join('');
    }

    function ntRenderResults() {
        const el = document.getElementById('gf-nt-res');
        if (!el) return;
        if (!ntHits.length) { el.innerHTML = '<div class="gf-nt-empty">' + t('nt_nores') + '</div>'; return; }
        const games = settings.gamepage.notifs.games;
        el.innerHTML = ntHits.map((h, i) => {
            const added = games.some(g => g.id === h.id);
            return `
            <div class="gf-nt-item" data-hi="${i}">
                ${ntRenderPoster(h.poster)}
                <div class="gf-nt-tit"><div>${ntEsc(h.title)}</div><div class="gf-nt-sub">/${ntEsc(h.cat_alias)}${h.rating_text ? ' · ' + ntEsc(h.rating_text) : ''}</div></div>
                <button class="gf-nt-act${added ? ' is-added' : ''}">${added ? '&#10003;' : '&#43;'}</button>
            </div>`;
        }).join('');
    }

    async function ntAdd(hit) {
        const games = settings.gamepage.notifs.games;
        if (!hit || !hit.alias || !hit.cat_alias || games.some(g => g.id === hit.id)) { showToast({ title: t('notifs'), line1: t('nt_dup'), life: 2600 }); return; }
        if (games.length >= NT_MAX) { showToast({ title: t('notifs'), line1: tf('nt_max', { N: NT_MAX }), life: 3200 }); return; }
        const g = { id: hit.id, alias: hit.alias, cat: hit.cat_alias, title: hit.title, poster: hit.poster || '', count: null };
        games.push(g);
        save(); ntRenderTracked(); ntRenderResults();
        const c = await ntFetchTotal(g);
        if (c != null) { g.count = c; save(); ntRenderTracked(); }
        showToast({ title: t('notifs'), line1: t('nt_added'), line2: ntEsc(g.title), life: 3200 });
    }

    async function ntTick(manual) {
        const n = settings.gamepage.notifs;
        if (!n.enabled || ntBusy) return;
        const games = n.games;
        if (!games.length) return;
        if (!manual) {
            let last = 0;
            try { last = +GM_getValue('gf_nt_ts', 0) || 0; } catch (e) {}
            if (Date.now() - last < Math.max(1, n.interval) * 45000) return;
        }
        ntBusy = true;
        try {
            for (const g of games) {
                const c = await ntFetchTotal(g);
                if (c == null) continue;
                if (g.count != null && c > g.count) {
                    showToast({
                        title: t('nt_newc'),
                        line1: tf('nt_newc_line', { TITLE: ntEsc(g.title), N: c - g.count, TOTAL: c }),
                        life: 6500,
                        onClick: () => { try { window.open('/' + g.cat + '/' + g.alias, '_blank'); } catch (e) {} }
                    });
                }
                g.count = c;
            }
            save();
            try { GM_setValue('gf_nt_ts', Date.now()); } catch (e) {}
        } finally { ntBusy = false; }
    }

    function ntRunSearch() {
        const inp = document.getElementById('gf-nt-q');
        const q = ((inp && inp.value) || '').trim();
        if (!q) return;
        const btn = document.getElementById('gf-nt-go');
        if (btn) { btn.disabled = true; btn.textContent = t('nt_searching'); }
        ntSearch(q).then(hits => { ntHits = hits; ntRenderResults(); })
            .catch(() => { ntHits = []; const res = document.getElementById('gf-nt-res'); if (res) res.innerHTML = '<div class="gf-nt-empty">' + t('nt_err') + '</div>'; })
            .then(() => { if (btn) { btn.disabled = false; btn.textContent = t('nt_find'); } });
    }

    function ntListClick(e) {
        const tgt = e.target;
        const row = tgt.closest ? tgt.closest('.gf-nt-item') : null;
        if (!row) return;
        if (row.hasAttribute('data-hi')) return ntAdd(ntHits[+row.getAttribute('data-hi')]);
        const del = tgt.closest ? tgt.closest('.gf-nt-del') : null;
        if (del && del.hasAttribute('data-del')) {
            settings.gamepage.notifs.games.splice(+del.getAttribute('data-del'), 1);
            save(); ntRenderTracked(); ntRenderResults();
            return;
        }
        const href = row.getAttribute('data-href');
        if (href) window.open(href, '_blank');
    }

    // ===== Аккаунт-менеджер (Аккаунты) =====
    // Только свои аккаунты, регистрация вручную. Пароли — в отдельном GM-ключе, не в теме.
    const AC_MAX = 10;
    const AC_KEY = 'gf_accounts_v1';
    let acItems = null;
    function acLoad() {
        if (acItems) return acItems;
        try { acItems = JSON.parse(GM_getValue(AC_KEY, '[]')) || []; } catch (e) { acItems = []; }
        if (!Array.isArray(acItems)) acItems = [];
        acItems = acItems.filter(a => a && a.id && a.login).slice(0, AC_MAX).map(a => {
            const o = { id: String(a.id), login: String(a.login), pass: String(a.pass == null ? '' : a.pass) };
            if (a.avaTs) { o.ava = String(a.ava || ''); o.avaTs = +a.avaTs || 0; }
            return o;
        });
        return acItems;
    }
    function acSaveItems() { try { GM_setValue(AC_KEY, JSON.stringify(acItems || [])); } catch (e) {} }
    function acId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
    function acList() { return acLoad().map(a => Object.assign({}, a)); }
    function acAdd(login, pass) {
        login = String(login || '').trim().slice(0, 64);
        pass = String(pass == null ? '' : pass).slice(0, 128);
        if (!login || !pass) { showToast({ title: t('accounts'), line1: t('ac_need'), life: 2600 }); return false; }
        const items = acLoad();
        if (items.some(a => a.login.toLowerCase() === login.toLowerCase())) { showToast({ title: t('accounts'), line1: t('ac_dup'), life: 2600 }); return false; }
        if (items.length >= AC_MAX) { showToast({ title: t('accounts'), line1: tf('ac_max', { N: AC_MAX }), life: 3200 }); return false; }
        items.push({ id: acId(), login, pass });
        acSaveItems(); acRenderList();
        showToast({ title: t('accounts'), line1: t('ac_saved'), line2: ntEsc(login), life: 2600 });
        return true;
    }
    function acRemove(id) {
        const items = acLoad();
        const i = items.findIndex(a => a.id === id);
        if (i < 0) return false;
        items.splice(i, 1);
        acSaveItems(); acRenderList();
        return true;
    }
    const AC_AVA_OK = 7 * 86400000, AC_AVA_MISS = 86400000;
    const acAvaBusy = new Set();
    async function acFetchAva(login) {
        const q = String(login || '').trim();
        if (!q || q.indexOf('@') >= 0) return null;
        try {
            const r = await fetch('/index.php?option=com_gofrag_community&task=api.searchUsers&format=json&q=' + encodeURIComponent(q), { credentials: 'same-origin' });
            if (!r.ok) return null;
            const j = await r.json();
            const arr = (j && j.data) || [];
            const hit = arr.find(u => u && String(u.slug || '').toLowerCase() === q.toLowerCase());
            const url = hit && hit.avatar_url ? String(hit.avatar_url).trim().replace(/['"()<>\s\\]/g, '') : '';
            return url || null;
        } catch (e) { return null; }
    }
    function acEnsureAvas() {
        const now = Date.now();
        acLoad().forEach(a => {
            if (a.ava !== undefined && now - (a.avaTs || 0) < (a.ava ? AC_AVA_OK : AC_AVA_MISS)) return;
            if (acAvaBusy.has(a.login)) return;
            acAvaBusy.add(a.login);
            Promise.resolve(acFetchAva(a.login)).then(url => {
                const cur = acLoad().find(x => x.id === a.id);
                if (cur) { cur.ava = url || ''; cur.avaTs = Date.now(); acSaveItems(); }
                acRenderList();
            }).catch(() => {}).then(() => { acAvaBusy.delete(a.login); });
        });
    }
    function acRenderList() {
        const el = document.getElementById('gf-ac-list');
        if (!el) return;
        const rows = acList();
        if (!rows.length) { el.innerHTML = '<div class="gf-nt-empty">' + t('ac_empty') + '</div>'; return; }
        acEnsureAvas();
        el.innerHTML = rows.map(a => {
            const ava = a.ava ? ' style="background-image:url(\'' + ntEsc(a.ava) + '\')"' : '';
            return `
            <div class="gf-nt-item" data-ac="${ntEsc(a.id)}" title="${t('ac_goto')}">
                <div class="gf-nt-ava"${ava}>${a.ava ? '' : ntEsc((a.login[0] || '?').toUpperCase())}</div>
                <div class="gf-nt-tit"><div>${ntEsc(a.login)}</div></div>
                <button class="gf-nt-del" data-acdel="${ntEsc(a.id)}">&#10005;</button>
            </div>`;
        }).join('');
    }
    async function acSwitch(id) {
        const acc = acLoad().find(a => a.id === id);
        if (!acc) return;
        const token = getCsrfToken();
        if (!token) { showToast({ title: t('accounts'), line1: t('ac_notoken'), life: 3000 }); return; }
        let ret = '';
        try { ret = btoa(location.origin + '/'); } catch (e) { ret = ''; }
        if (!ret) { try { ret = btoa('https://gofrag.ru/'); } catch (e2) { ret = ''; } }
        showToast({ title: t('accounts'), line1: t('ac_switching'), line2: ntEsc(acc.login), life: 3000 });
        try {
            const body = new URLSearchParams({ username: acc.login, password: acc.pass, return: ret, remember: 'yes' });
            body.append(token, '1');
            const r = await fetch('/index.php?option=com_users&Itemid=101&lang=ru&task=user.login', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, body: body.toString() });
            if (!r.ok) throw new Error(String(r.status));
            const chk = await fetch(location.href, { credentials: 'same-origin' });
            const txt = await chk.text();
            const ok = /isLoggedIn"?\s*:\s*true/.test(txt) || (!/isLoggedIn"?\s*:\s*false/.test(txt) && !/gf-email-login-form|task=user\.login/.test(txt));
            if (!ok) { showToast({ title: t('accounts'), line1: t('ac_switch_fail'), life: 3400 }); return; }
            showToast({ title: t('accounts'), line1: t('ac_switch_ok'), line2: ntEsc(acc.login), life: 2600 });
            setTimeout(() => { try { location.reload(); } catch (e) {} }, 700);
        } catch (e) {
            showToast({ title: t('accounts'), line1: t('ac_switch_fail'), life: 3400 });
        }
    }
    function acListClick(e) {
        const tgt = e.target;
        const del = tgt.closest ? tgt.closest('[data-acdel]') : null;
        if (del) {
            if (acRemove(del.getAttribute('data-acdel'))) showToast({ title: t('accounts'), line1: t('ac_removed'), life: 2200 });
            return;
        }
        const row = tgt.closest ? tgt.closest('[data-ac]') : null;
        if (row) { acSwitch(row.getAttribute('data-ac')); return; }
    }

    // ===== Last.fm «Сейчас слушает» (bio профиля) =====
    function lfStatusEl() { return document.getElementById('gf-lf-status'); }
    function lfStatus(txt) { const el = lfStatusEl(); if (el) el.textContent = txt || ''; }
    // Публичный демо-ключ из официальной документации API last.fm — в панели не вводится.
    // API — единственный надёжный источник now-playing: HTML-страница last.fm бейдж
    // «Now playing» анонимным запросам не отдаёт, скрейп был ненадёжен (v0.3.1/0.3.2).
    const LF_API_KEY = 'b25b959554ed76058ac220b7b2e0a026';
    function lfApiGet(nick) {
        return new Promise((resolve, reject) => {
            const g = (typeof GM_xmlhttpRequest !== 'undefined') ? GM_xmlhttpRequest : (typeof GM !== 'undefined' && GM.xmlHttpRequest);
            if (!g) { reject(new Error('no-gm-xhr')); return; }
            const url = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&format=json&limit=1'
                + '&api_key=' + LF_API_KEY + '&user=' + encodeURIComponent(nick);
            g({
                method: 'GET', url, timeout: 20000,
                onload: r => {
                    if (r.status < 200 || r.status >= 400) { reject(new Error('net')); return; }
                    let j = null;
                    try { j = JSON.parse(r.responseText); } catch (e) {}
                    if (!j) { reject(new Error('net')); return; }
                    // 6 — «пользователь не существует», остальное (ключ/сеть/лимит) — net
                    if (j.error) { reject(new Error(String(j.error) === '6' ? 'parse' : 'net')); return; }
                    resolve(j);
                },
                onerror: () => reject(new Error('net')),
                ontimeout: () => reject(new Error('timeout'))
            });
        });
    }
    // Gotcha API: при одном скробле track отдаётся ОБЪЕКТОМ, при нескольких — массивом.
    // Играющий трек помечен @attr.nowplaying="true".
    function lfParseApi(j) {
        const box = j && j.recenttracks;
        let tr = box ? box.track : null;
        if (Array.isArray(tr)) tr = tr[0] || null;
        if (!tr || !tr.name) return { now: false, name: '', artist: '' };
        const a = tr['@attr'];
        const artist = tr.artist ? (typeof tr.artist === 'string' ? tr.artist : (tr.artist['#text'] || tr.artist.name || '')) : '';
        return { now: !!(a && (a.nowplaying === 'true' || a.nowplaying === true)), name: String(tr.name || ''), artist };
    }
    // Разделитель — обычный дефис (юзер попросил не использовать длинное тире в bio).
    function lfFormat(info) { return info.artist ? info.artist + ' - ' + info.name : info.name; }
    async function lfGetNow() {
        const nick = (settings.lastfm.nick || '').trim();
        const info = lfParseApi(await lfApiGet(nick));
        return { now: info.now, text: info.name ? lfFormat(info) : '' };
    }
    async function lfFetchCard() {
        const own = document.querySelector('#gf-auth a[href^="/cat/"]');
        const slug = own ? (own.getAttribute('href') || '').replace(/^\/cat\//, '').replace(/\/+$/, '') : '';
        if (!slug) throw new Error('nologin');
        const r0 = await fetch('/cat/' + slug, { credentials: 'same-origin' });
        const html = await r0.text();
        const tok = (html.match(/GFK_TOKEN\s*=\s*["']([0-9a-f]{32})["']/) || html.match(/name="([0-9a-f]{32})"\s+value="1"/) || [])[1];
        if (!tok) throw new Error('token');
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const bioEl = doc.getElementById('gf-cf-bio');
        const tagsBox = doc.getElementById('gf-cf-tags');
        if (!bioEl || !tagsBox) throw new Error('form');
        const val = id => { const el = doc.getElementById(id); return el ? (el.value || '') : ''; };
        const tags = [];
        doc.querySelectorAll('.gfp-cf__tag--on').forEach(el => { const id = el.getAttribute('data-id'); if (id) tags.push(id); });
        return { tok, bio: bioEl.value || '', tg: val('gf-cf-tg'), vk: val('gf-cf-vk'), discord: val('gf-cf-discord'), steam: val('gf-cf-steam'), tags };
    }
    async function lfSetBio(bio) {
        const card = await lfFetchCard();
        const fd = new FormData();
        fd.append(card.tok, '1');
        fd.append('bio', String(bio || '').slice(0, 400));
        fd.append('social_telegram', card.tg);
        fd.append('social_vk', card.vk);
        fd.append('social_discord', card.discord);
        fd.append('social_steam', card.steam);
        card.tags.forEach(tg => fd.append('tag_ids[]', tg));
        const r = await fetch('/index.php?option=com_gofrag_community&task=api.saveCard&format=json', { method: 'POST', credentials: 'same-origin', body: fd });
        const j = await r.json().catch(() => null);
        if (!j || !j.ok) throw new Error('save');
        return card.bio;
    }
    const LF_REVERT_MS = 5 * 60 * 1000;
    async function lfApply(manual, bioText, okLabel, trackText, isRevert) {
        if (manual) lfStatus(t('lf_upd'));
        try {
            const prev = await lfSetBio(bioText);
            const s = settings.lastfm;
            if (isRevert) { s.mode = 'idle'; s.lastBio = ''; }
            else { if (s.mode !== 'track') s.origBio = prev; s.mode = 'track'; s.lastBio = bioText; }
            save();
            lfStatus(okLabel);
            if (manual) showToast({ title: t('lf_cap'), line1: okLabel, line2: trackText || '', life: 2600 });
        } catch (e) {
            const m = String(e && e.message);
            const msg = m === 'nologin' ? t('lf_nologin') : (m === 'token' ? t('lf_notoken') : (m === 'form' ? t('lf_form') : t('lf_fail')));
            lfStatus(msg);
            if (manual) showToast({ title: t('lf_cap'), line1: msg, life: 3000 });
        }
    }
    async function lfTick(manual) {
        if (!manual && !settings.lastfm.enabled) return;
        const gen = lfGen; // фичу выключили во время тика — тик не должен перезаписать откат bio
        const nick = (settings.lastfm.nick || '').trim();
        if (!nick) { if (manual) lfStatus(t('lf_need_nick')); return; }
        if (manual) lfStatus(t('lf_checking'));
        let res;
        try { res = await lfGetNow(); }
        catch (e) {
            lfStatus(String(e && e.message) === 'parse' ? t('lf_nouser') : t('lf_net'));
            return;
        }
        const s = settings.lastfm;
        const now = Date.now();
        if (res.now && res.text) {
            const fresh = res.text !== s.lastTrack;
            if (fresh) { s.lastTrack = res.text; s.stateSince = now; save(); }
            const target = tf('lf_bio', { TRACK: res.text });
            if (s.mode === 'track' && !fresh && now - (s.stateSince || now) >= LF_REVERT_MS) {
                if (gen !== lfGen) return;
                await lfApply(manual, s.origBio != null ? s.origBio : '', t('lf_back_stale'), res.text, true);
                return;
            }
            if (s.mode === 'track' && !fresh && target === s.lastBio) {
                if (manual) lfStatus(t('lf_same')); else lfStatus(res.text);
                return;
            }
            if (s.mode === 'idle' && !fresh) { lfStatus(res.text); return; }
            if (gen !== lfGen) return;
            await lfApply(manual, target, t('lf_ok') + ' · ' + res.text, res.text, false);
            return;
        }
        if (s.lastTrack) { s.lastTrack = ''; s.stateSince = now; save(); }
        if (s.mode === 'track') { if (gen !== lfGen) return; await lfApply(manual, s.origBio != null ? s.origBio : '', t('lf_back_sil'), '', true); return; }
        lfStatus(t('lf_idle') + (res.text ? ' · ' + res.text : ''));
    }
    // Выключение фичи: если в bio сейчас наш трек — вернуть описание как было.
    let lfGen = 0; // растёт при каждом выключении: тики, застрявшие в сети, не перезаписывают откат
    async function lfOffRevert() {
        const s = settings.lastfm;
        if (s.mode !== 'track') { lfStatus(''); return; }
        lfStatus(t('lf_off'));
        try {
            await lfSetBio(s.origBio != null ? s.origBio : '');
            s.mode = 'idle'; s.lastBio = ''; s.lastTrack = ''; s.stateSince = 0;
            save();
            lfStatus(t('lf_back_ok'));
        } catch (e) {
            const m = String(e && e.message);
            lfStatus(m === 'nologin' ? t('lf_nologin') : (m === 'token' ? t('lf_notoken') : (m === 'form' ? t('lf_form') : t('lf_fail_back'))));
        }
    }
    let lfTimer = null;
    function lfRearm() {
        if (lfTimer) { clearInterval(lfTimer); lfTimer = null; }
        if (!settings.lastfm.enabled) return;
        lfTimer = setInterval(() => lfTick(false), 60000);
        setTimeout(() => lfTick(false), 15000);
    }

    function applyNotifs() {
        if (ntTimer) { clearInterval(ntTimer); ntTimer = null; }
        if (!settings.gamepage.notifs.enabled) return;
        ntTimer = setInterval(() => ntTick(false), Math.max(1, settings.gamepage.notifs.interval) * 60000);
        setTimeout(() => ntTick(false), 8000);
    }

    try {
        const gw = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
        gw.blohajNotifs = {
            check: () => ntTick(true),
            find: q => ntSearch(q),
            add: h => ntAdd(h),
            runSearch: () => ntRunSearch(),
            rowClick: e => ntListClick(e),
            games: () => settings.gamepage.notifs.games.map(g => Object.assign({}, g))
        };
    } catch (e) {}

    try {
        const gw = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
        gw.blohajAccounts = {
            list: () => acList(),
            add: (l, p) => acAdd(l, p),
            remove: id => acRemove(id),
            go: id => acSwitch(id),
            rowClick: e => acListClick(e),
            reload: () => { acItems = null; }
        };
    } catch (e) {}

    try {
        const gw = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
        gw.blohajLastFM = {
            tick: manual => lfTick(manual === undefined ? true : !!manual),
            off: () => lfOffRevert(),
            now: () => lfGetNow(),
            parse: j => { try { return lfParseApi(typeof j === 'string' ? JSON.parse(j) : j); } catch (e) { return { now: false, name: '', artist: '' }; } },
            rearm: () => lfRearm(),
            status: txt => lfStatus(txt)
        };
    } catch (e) {}

    function initMenu() {
        const menu = buildMenu();
        const qs = s => menu.querySelector(s);
        const qsa = s => menu.querySelectorAll(s);
        menu.style.setProperty('--gf-op', settings.window.opacity / 100);
        applyAll();
        applyCatSkin();
        syncWatermark();
        initLoadAllComments();
        applyNotifs();
        lfRearm();
        applyEggBadges();
        syncSidebarButton();

        function clampToViewport() {
            const w = menu.offsetWidth, h = menu.offsetHeight;
            if (!w || !h) return;
            const pos = getPanelPos(menu);
            menu.style.left = Math.max(0, Math.min(pos.x, window.innerWidth - w)) + 'px';
            menu.style.top = Math.max(0, Math.min(pos.y, window.innerHeight - h)) + 'px';
        }
        window.addEventListener('resize', clampToViewport);

        const sideUname = getCurrentUsername();
        qs('#gf-side-uname').textContent = sideUname;
        qs('#gf-side-ava').textContent = (sideUname[0] || '?').toUpperCase();
        const homeAva = document.getElementById('gf-home-ava');
        if (homeAva) homeAva.textContent = (sideUname[0] || '?').toUpperCase();
        applySideAvatar();

        let menuOpen = false, animRAF = null, curPose = { ...IM_IDENT };
        function setPose(p) {
            curPose = p;
            let tr = '';
            if (p.x || p.y) tr += `translate(${p.x}px, ${p.y}px) `;
            if (p.s !== 1) tr += `scale(${p.s})`;
            menu.style.transform = tr.trim();
            menu.style.opacity = String(Math.max(0, Math.min(1, p.o)));
        }
        function stopMenuAnim() {
            if (animRAF) { cancelAnimationFrame(animRAF); animRAF = null; }
            curPose = { ...IM_IDENT };
            menu.style.transform = ''; menu.style.opacity = ''; menu.style.pointerEvents = '';
        }
        function cancelMenuAnim() {
            if (animRAF) { cancelAnimationFrame(animRAF); animRAF = null; }
        }
        function playAnim(from, to, dur, ease, onDone) {
            const t0 = performance.now();
            const step = (now) => {
                const k = dur <= 0 ? 1 : Math.min(1, (now - t0) / dur);
                const e = ease(k);
                setPose({ o: from.o + (to.o - from.o) * e, x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e, s: from.s + (to.s - from.s) * e });
                if (k < 1) animRAF = requestAnimationFrame(step);
                else { animRAF = null; onDone(); }
            };
            animRAF = requestAnimationFrame(step);
        }
        function showMenu() {
            menuOpen = true; cancelMenuAnim();
            menu.classList.add('gf-visible'); clampToViewport();
            menu.style.pointerEvents = '';
            const cfg = ANIM_TYPES[settings.window.anim];
            if (!cfg) { stopMenuAnim(); return; }
            const dur = settings.window.animDuration, ease = cfg.back ? easeOutBack : easeOutCubic;
            const mid = curPose.o < 1 || curPose.x !== 0 || curPose.y !== 0 || curPose.s !== 1;
            if (mid) playAnim(curPose, IM_IDENT, dur, ease, stopMenuAnim);
            else { setPose(cfg.pose); playAnim(cfg.pose, IM_IDENT, dur, ease, stopMenuAnim); }
        }
        function hideMenu() {
            menuOpen = false; cancelMenuAnim();
            const cfg = ANIM_TYPES[settings.window.anim];
            if (!cfg) { menu.classList.remove('gf-visible'); stopMenuAnim(); return; }
            menu.style.pointerEvents = 'none';
            playAnim(curPose, cfg.hidePose || cfg.pose, settings.window.animDuration, easeInCubic, () => { menu.classList.remove('gf-visible'); stopMenuAnim(); });
        }
        function toggleMenu() { menuOpen ? hideMenu() : showMenu(); }
        stopMenuAnimHook = stopMenuAnim;
        openMenuHook = showMenu;

        const TEXT_INPUTS = ['text', 'password', 'search', 'url', 'email', 'number', 'tel'];
        const hkBtn = qs('#gf-hotkey-btn'); let listening = false;
        function updateHotkeyUI() { hkBtn.textContent = listening ? t('press_any') : keyDisplayName(settings.window.hotkey); }
        function setListening(on) { if (listening === on) return; listening = on; hkBtn.classList.toggle('listening', on); updateHotkeyUI(); }
        hkBtn.addEventListener('click', () => setListening(!listening));
        hkBtn.addEventListener('blur', () => { if (listening) setListening(false); });
        document.addEventListener('keydown', (e) => {
            if (listening) {
                e.preventDefault(); e.stopPropagation();
                if (e.code !== 'Escape') { settings.window.hotkey = e.code; save(); }
                setListening(false);
                return;
            }
            const tgt = e.target, tag = (tgt.tagName || '').toLowerCase();
            const inField = tag === 'input' || tag === 'textarea' || tag === 'select' || tgt.isContentEditable;
            if (!inField && !e.repeat) {
                if (e.code === KONAMI[konamiPos]) {
                    konamiPos++;
                    if (konamiPos >= KONAMI.length) { konamiPos = 0; konamiEgg(); }
                } else {
                    konamiPos = (e.code === KONAMI[0]) ? 1 : 0;
                }
            }
            if (e.code !== settings.window.hotkey || e.repeat) return;
            if (tag === 'textarea' || tgt.isContentEditable) return;
            if (tag === 'input' && TEXT_INPUTS.includes((tgt.type || 'text').toLowerCase())) return;
            e.preventDefault(); toggleMenu();
        }, true);
        updateHotkeyUI();

        function selectPane(name) {
            qsa('.gf-nav-item').forEach(n => n.classList.toggle('sel', n.dataset.pane === name));
            qsa('.gf-pane').forEach(p => p.classList.toggle('sel', p.dataset.pane === name));
            const item = qs('.gf-nav-item[data-pane="' + name + '"] span');
            qs('#gf-pane-title').textContent = item ? item.textContent : name;
            qs('#gf-content').scrollTop = 0;
        }
        qsa('.gf-nav-item').forEach(n => n.addEventListener('click', () => selectPane(n.dataset.pane)));

        function wireSlider(id, onChange, fmt) {
            const input = qs('#' + id), fill = qs('#' + id + '-fill'), grab = qs('#' + id + '-grab'), lbl = qs('#' + id + '-lbl');
            function sync() {
                const min = +input.min, max = +input.max, v = +input.value;
                const p = (v - min) / (max - min);
                grab.style.left = `calc(2px + (100% - 15px) * ${p})`;
                fill.style.width = `calc(5.5px + (100% - 15px) * ${p})`;
                lbl.textContent = fmt(v);
            }
            input.addEventListener('input', () => { sync(); onChange(+input.value); });
            sync();
        }

        wireSlider('gf-op', v => { settings.window.opacity = v; menu.style.setProperty('--gf-op', v / 100); save(); }, v => v + '%');
        qs('#gf-nomove').addEventListener('change', e => { settings.window.noMove = e.target.checked; save(); });
        qs('#gf-sidebar-toggle').addEventListener('change', e => {
            settings.window.sidebarButton = e.target.checked; save(); syncSidebarButton();
        });

        [['gf-wm-on', 'watermark'], ['gf-wm-user', 'watermarkUser'], ['gf-wm-time', 'watermarkTime'], ['gf-wm-fps', 'watermarkFps']].forEach(([id, key]) => {
            qs('#' + id).addEventListener('change', e => { settings.window[key] = e.target.checked; save(); syncWatermark(); });
        });
        const wmCornerSel = qs('#gf-wm-corner'); wmCornerSel.value = settings.window.watermarkCorner;
        wmCornerSel.addEventListener('change', () => { settings.window.watermarkCorner = wmCornerSel.value; save(); wmApplyCorner(); });

        const animSel = qs('#gf-anim'); animSel.value = settings.window.anim;
        animSel.addEventListener('change', () => { settings.window.anim = animSel.value; save(); showMenu(); });
        wireSlider('gf-animdur', v => { settings.window.animDuration = v; save(); }, v => v + 'ms');
        qs('#gf-animpreview').addEventListener('click', () => showMenu());

        const c1 = qs('#gf-c1'), c2 = qs('#gf-c2'), sw1 = qs('#gf-sw1'), sw2 = qs('#gf-sw2');
        function syncSwatches() { sw1.style.background = c1.value; sw2.style.background = c2.value; }
        c1.addEventListener('input', () => { settings.theme.tintColor1 = c1.value; syncSwatches(); applyTint(); save(); });
        c2.addEventListener('input', () => { settings.theme.tintColor2 = c2.value; syncSwatches(); applyTint(); save(); });
        wireSlider('gf-amt', v => { settings.theme.tintAmount = v; applyTint(); save(); }, v => v + '%');
        syncSwatches();

        const bgurl = qs('#gf-bgurl');
        bgurl.addEventListener('change', () => { settings.theme.bgImage = bgurl.value.trim(); applyBg(); save(); });
        qs('#gf-browse').addEventListener('click', () => qs('#gf-bgfile').click());
        qs('#gf-bgfile').addEventListener('change', (e) => {
            const file = e.target.files[0]; if (!file) return;
            const reader = new FileReader();
            reader.onload = () => { settings.theme.bgImage = reader.result; bgurl.value = ''; applyBg(); save(); };
            reader.readAsDataURL(file);
        });
        qs('#gf-bgclear').addEventListener('click', () => { settings.theme.bgImage = ''; bgurl.value = ''; applyBg(); save(); });
        wireSlider('gf-blur', v => { settings.theme.bgBlur = v; applyBg(); save(); }, v => v + 'px');
        wireSlider('gf-dim', v => { settings.theme.bgDim = v; applyBg(); save(); }, v => v + '%');
        const fontSel = qs('#gf-font'); fontSel.value = settings.theme.font.family;
        fontSel.addEventListener('change', () => { settings.theme.font.family = fontSel.value; applyFont(); save(); });

        const curModeSel = qs('#gf-curmode'); curModeSel.value = settings.theme.cursor.mode;
        curModeSel.addEventListener('change', () => { settings.theme.cursor.mode = curModeSel.value; save(); applyCursor(); });
        const curColorInput = qs('#gf-cursor-color'), swCur = qs('#gf-swcur');
        swCur.style.background = curColorInput.value;
        curColorInput.addEventListener('input', () => { settings.theme.cursor.color = curColorInput.value; swCur.style.background = curColorInput.value; applyCursor(); save(); });
        wireSlider('gf-cursor-smooth', v => { settings.theme.cursor.smooth = v; save(); }, v => v + 'ms');
        wireSlider('gf-cursor-size', v => { settings.theme.cursor.size = v; applyCursor(); save(); }, v => v + 'px');
        wireSlider('gf-cursor-width', v => { settings.theme.cursor.width = v; applyCursor(); save(); }, v => v + 'px');
        wireSlider('gf-cursor-alpha', v => { settings.theme.cursor.alpha = v; applyCursor(); save(); }, v => v + '%');
        qs('#gf-cursor-anim').addEventListener('change', e => { settings.theme.cursor.anim = e.target.checked; save(); });

        qs('#gf-fov-on').addEventListener('change', e => { settings.fov.enabled = e.target.checked; save(); applyFov(); });
        wireSlider('gf-fov-val', v => { settings.fov.fov = v; applyFov(); save(); }, v => v + '°');
        qs('#gf-fov-pan').addEventListener('change', e => { settings.fov.pan = e.target.checked; save(); applyFov(); });
        wireSlider('gf-fov-panam', v => { settings.fov.panAmount = v; save(); }, v => v + 'px');
        wireSlider('gf-fov-smooth', v => { settings.fov.smooth = v; save(); }, v => v + 'ms');
        qs('#gf-crt-on').addEventListener('change', e => { settings.crt.enabled = e.target.checked; save(); applyCrt(); });
        qs('#gf-mb-on').addEventListener('change', e => { settings.mb.enabled = e.target.checked; save(); applyMotion(); });
        qs('#gf-crt-flick').addEventListener('change', e => { settings.crt.flicker = e.target.checked; save(); applyCrt(); });
        wireSlider('gf-crt-str', v => { settings.crt.strength = v; save(); applyCrt(); }, v => v + '%');

        qs('#gf-reset-theme').addEventListener('click', () => {
            settings.theme = JSON.parse(JSON.stringify(DEFAULTS.theme));
            save(); location.reload();
        });

        qs('#gf-gp-loadall').addEventListener('change', e => {
            settings.gamepage.commentsLoadAll = e.target.checked;
            save();
            if (settings.gamepage.commentsLoadAll) injectLoadAllBtn();
            else removeLoadAllBtn();
        });
        qs('#gf-entersubmit').addEventListener('change', e => {
            settings.gamepage.enterSubmit = e.target.checked; save();
        });

        qs('#gf-nt-on').addEventListener('change', e => { settings.gamepage.notifs.enabled = e.target.checked; save(); applyNotifs(); });
        wireSlider('gf-nt-int', v => { settings.gamepage.notifs.interval = v; save(); applyNotifs(); }, v => v + ' мин');
        qs('#gf-nt-go').addEventListener('click', ntRunSearch);
        qs('#gf-nt-q').addEventListener('keydown', e => { if (e.key === 'Enter') ntRunSearch(); });
        qs('#gf-nt-now').addEventListener('click', () => {
            const b = qs('#gf-nt-now');
            b.disabled = true; b.textContent = t('nt_searching');
            Promise.resolve(ntTick(true)).then(() => { b.disabled = false; b.textContent = t('nt_now'); });
        });
        qs('#gf-nt-res').addEventListener('click', ntListClick);
        qs('#gf-nt-list').addEventListener('click', ntListClick);
        ntRenderTracked();

        const acClr = () => { ['#gf-ac-login', '#gf-ac-pass'].forEach(s => { const i = qs(s); if (i) i.value = ''; }); };
        qs('#gf-ac-save').addEventListener('click', () => {
            const lg = qs('#gf-ac-login'), pw = qs('#gf-ac-pass');
            if (acAdd(lg ? lg.value : '', pw ? pw.value : '')) acClr();
        });
        ['#gf-ac-login', '#gf-ac-pass'].forEach(s => qs(s).addEventListener('keydown', e => { if (e.key === 'Enter') qs('#gf-ac-save').click(); }));
        qs('#gf-ac-list').addEventListener('click', acListClick);
        acRenderList();

        function wireFeeder(o) {
            const setStatus = txt => { qs('#' + o.statusId).textContent = txt; };
            qs('#' + o.autoId).addEventListener('change', e => { settings.cat[o.autoKey] = e.target.checked; save(); });
            qs('#' + o.btnId).addEventListener('click', () => {
                setStatus(t('feeding'));
                postFeed(o.task).then(res => setStatus(o.resultText(res)));
            });
            if (!settings.cat[o.autoKey]) return;
            setTimeout(() => {
                postFeed(o.task).then(res => {
                    if (res.ok) {
                        showToast(o.toast(res));
                        setStatus(o.resultText(res));
                    } else if (!isQuietFail(res) && res.msg !== t('csrf_err')) {
                        showToast({ title: o.title, line1: t('autofeed_fail'), line2: (res.data && (res.data.message || res.data.error)) || res.msg || '', life: 3200 });
                        setStatus(o.resultText(res));
                    }
                });
            }, o.delay);
        }

        wireFeeder({
            autoId: 'gf-autofeed', autoKey: 'autoFeed', btnId: 'gf-feednow', statusId: 'gf-feed-status',
            task: 'api.feedMyCat', delay: 800, title: t('feeder'), resultText: feedResultText,
            toast: res => {
                const d = res.data;
                return {
                    title: t('feeder'),
                    line1: tf('cat_fed', { INCOME: d.income != null ? d.income : '?' }),
                    line2: tf('cat_bal', { BAL: d.new_balance != null ? d.new_balance : '?', STREAK: d.streak != null ? d.streak : '?' }) + (d.stage_changed ? t('fed_new_stage') : '')
                };
            }
        });
        wireFeeder({
            autoId: 'gf-autofeed-dev', autoKey: 'autoFeedDevourer', btnId: 'gf-feednow-dev', statusId: 'gf-feed-status-dev',
            task: 'api.feedCat', delay: 1000, title: t('devourer'), resultText: devourerResultText,
            toast: res => {
                const d = res.data;
                return {
                    title: t('devourer'),
                    line1: tf('dev_fed', { INCOME: d.reward_amount != null ? d.reward_amount : '?' }) + (d.reward_unlocked ? t('dev_unlock') : ''),
                    line2: tf('dev_bal', { BAL: d.balance != null ? d.balance : '?', LEFT: d.today_left != null ? d.today_left : '?' })
                };
            }
        });

        const breedSel = qs('#gf-catbreed'), stageSel = qs('#gf-catstage');
        breedSel.value = settings.cat.breed;
        stageSel.value = settings.cat.stage;
        breedSel.addEventListener('change', () => { settings.cat.breed = breedSel.value; save(); applyCatSkin(); });
        stageSel.addEventListener('change', () => { settings.cat.stage = stageSel.value; save(); applyCatSkin(); });
        qs('#gf-catreset').addEventListener('click', () => {
            settings.cat.breed = 'auto'; settings.cat.stage = 'auto'; save();
            breedSel.value = 'auto'; stageSel.value = 'auto';
            applyCatSkin();
        });

        qs('#gf-random').addEventListener('click', () => {
            const rnd = () => '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
            settings.theme.tintColor1 = rnd(); settings.theme.tintColor2 = rnd();
            if (settings.theme.tintAmount === 0) settings.theme.tintAmount = 45;
            c1.value = settings.theme.tintColor1; c2.value = settings.theme.tintColor2; syncSwatches();
            const amt = qs('#gf-amt'); amt.value = settings.theme.tintAmount; amt.dispatchEvent(new Event('input'));
            applyTint(); save();
        });
        const lfNick = qs('#gf-lf-nick');
        lfNick.value = settings.lastfm.nick;
        lfNick.addEventListener('change', e => { settings.lastfm.nick = e.target.value.trim(); save(); });
        qs('#gf-lf-on').addEventListener('change', e => {
            settings.lastfm.enabled = e.target.checked;
            save();
            lfRearm();
            if (!e.target.checked) { lfGen++; lfOffRevert(); } // выключили — вернуть описание на место
        });
        qs('#gf-lf-now').addEventListener('click', () => {
            const b = qs('#gf-lf-now');
            b.disabled = true; b.textContent = t('lf_checking');
            Promise.resolve(lfTick(true)).then(() => { b.disabled = false; b.textContent = t('lf_now'); });
        });
        qs('#gf-reset-all').addEventListener('click', () => {
            if (!confirm(t('confirm_reset'))) return;
            settings = JSON.parse(JSON.stringify(DEFAULTS));
            save(); location.reload();
        });

        makeDraggable(menu, qs('#gf-topbar'));
    }

    const GF_INTERACTIVE = 'button, input, select, textarea, label, a, .gf-tab, .gf-tree-head, .gf-swatch, .gf-slider-wrap';

    function makeDraggable(panel, handle) {
        let dragging = false, offX = 0, offY = 0;
        function start(e) {
            if (stopMenuAnimHook) stopMenuAnimHook();
            dragging = true;
            const rect = panel.getBoundingClientRect();
            offX = e.clientX - rect.left; offY = e.clientY - rect.top;
            e.preventDefault();
        }
        handle.addEventListener('mousedown', (e) => {
            if (e.button !== 0 || settings.window.noMove) return;
            if (e.target.closest(GF_INTERACTIVE)) return;
            start(e);
        });
        panel.addEventListener('mousedown', (e) => {
            if (e.button !== 0 || settings.window.noMove) return;
            if (handle.contains(e.target)) return;
            if (e.target.closest(GF_INTERACTIVE)) return;
            if (e.target.id === 'gf-content') {
                const r = e.target.getBoundingClientRect();
                if (e.clientX > r.right - 14 || e.clientY > r.bottom - 14) return;
            }
            start(e);
        });
        document.addEventListener('mousemove', (e) => {
            if (!dragging) return;
            const w = panel.offsetWidth, h = panel.offsetHeight;
            panel.style.left = Math.max(0, Math.min(e.clientX - offX, window.innerWidth - w)) + 'px';
            panel.style.top = Math.max(0, Math.min(e.clientY - offY, window.innerHeight - h)) + 'px';
        });
        document.addEventListener('mouseup', () => { dragging = false; });
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') setTimeout(initMenu, 50);
    else window.addEventListener('load', () => setTimeout(initMenu, 50));
    try { ensureToastRoot(); } catch (e) {}
})();
