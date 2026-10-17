import { errorTranslations } from "./error-translations";
import { catalogTranslations } from "./catalog-translations";
import { policyTranslations } from "./policy-translations";

export type Language = "az" | "ru" | "en";
export type TranslationValues = Record<string, string | number>;
export const LANGUAGE_KEY = "dubai-electronics-language";
export const languages: {
  value: Language;
  code: string;
  name: string;
  shortName: string;
}[] = [
  {
    value: "az",
    code: "AZ",
    name: "Azərbaycan dili",
    shortName: "Azərbaycanca",
  },
  { value: "ru", code: "RU", name: "Русский", shortName: "Русский" },
  { value: "en", code: "EN", name: "English", shortName: "English" },
];
export function isLanguage(value: unknown): value is Language {
  return value === "az" || value === "ru" || value === "en";
}

// English source phrases are stable keys. Product identifiers and commercial data stay untouched.
export const translations: Record<string, readonly [string, string]> = {
  ...errorTranslations,
  ...policyTranslations,
  ...catalogTranslations,
  From: ["Başlayan qiymət:", "От"],
  result: ["nəticə", "результат"],
  results: ["nəticə", "результатов"],
  "iPhone 18 Pro in Burgundy": [
    "iPhone 18 Pro, bordo",
    "iPhone 18 Pro, бордовый",
  ],
  "MacBook Air in Sky Blue": [
    "MacBook Air, səma mavisi",
    "MacBook Air, небесно-голубой",
  ],
  "Website language": ["Saytın dili", "Язык сайта"],
  "Mobile navigation": ["Mobil naviqasiya", "Мобильная навигация"],
  "Main navigation": ["Əsas naviqasiya", "Основная навигация"],
  "Open menu": ["Menyunu aç", "Открыть меню"],
  "Close dialog": ["Bağla", "Закрыть"],
  "Shop by category": ["Kateqoriyalar", "Категории"],
  "Shop all": ["Bütün məhsullar", "Все товары"],
  "All devices": ["Bütün cihazlar", "Все устройства"],
  Smartphones: ["Smartfonlar", "Смартфоны"],
  Laptops: ["Noutbuklar", "Ноутбуки"],
  Audio: ["Audio", "Аудио"],
  Tablets: ["Planşetlər", "Планшеты"],
  Gaming: ["Oyun cihazları", "Игровые устройства"],
  "Hair care": ["Saç baxımı", "Уход за волосами"],
  Cameras: ["Kameralar", "Камеры"],
  Wearables: ["Ağıllı saatlar", "Умные часы"],
  "Home cinema": ["Ev kinoteatrı", "Домашний кинотеатр"],
  "The spotlight": ["Seçilənlər", "В центре внимания"],
  "Our story": ["Haqqımızda", "О нас"],
  "Dubai to Baku": ["Dubaydan Bakıya", "Из Дубая в Баку"],
  "Display currency": ["Valyuta", "Валюта"],
  "Azerbaijani manat": ["Azərbaycan manatı", "Азербайджанский манат"],
  "Indicative US dollar conversion": [
    "ABŞ dolları ilə təxmini qiymət",
    "Примерная цена в долларах США",
  ],
  "Indicative UAE dirham conversion": [
    "BƏƏ dirhəmi ilə təxmini qiymət",
    "Примерная цена в дирхамах ОАЭ",
  ],
  "Search products": ["Məhsul axtar", "Поиск товаров"],
  "Search the collection": ["Kolleksiyada axtar", "Поиск по коллекции"],
  "Your favourites": ["Sevimliləriniz", "Избранное"],
  "Here to help": ["Sizə kömək edək", "Мы рядом"],
  "Shipping & delivery": ["Çatdırılma", "Доставка"],
  "Get in touch": ["Bizimlə əlaqə", "Связаться с нами"],
  "From Dubai, delivered with care to Baku.": [
    "Dubaydan Bakıya, qayğı ilə.",
    "Из Дубая в Баку, с заботой.",
  ],
  "EXPLORE THE COLLECTION": ["KOLLEKSİYANI KƏŞF EDİN", "ОТКРОЙТЕ КОЛЛЕКЦИЮ"],
  "Skip to content": ["Məzmuna keç", "Перейти к содержимому"],
  "Dubai Electronics home": [
    "Dubai Electronics ana səhifə",
    "Главная Dubai Electronics",
  ],
  "From Dubai, with possibility. Delivered to Baku.": [
    "Yeni imkanlar Dubaydan Bakıya.",
    "Новые возможности из Дубая в Баку.",
  ],
  "Meet your new tech destination": [
    "Yeni texnologiya ünvanınız",
    "Ваш новый мир технологий",
  ],
  "GOOD TECH. NO BORDERS.": [
    "TEXNOLOGİYADA SƏRHƏD YOXDUR.",
    "ТЕХНОЛОГИИ БЕЗ ГРАНИЦ.",
  ],
  "Exceptional tech.": ["Mükəmməl texnologiya.", "Лучшие технологии."],
  "Closer than ever.": ["İndi daha yaxın.", "Теперь ещё ближе."],
  "The tech you love, thoughtfully selected in Dubai.": [
    "Sevdiyiniz texnologiyalar Dubayda diqqətlə seçilir.",
    "Любимые устройства, тщательно отобранные в Дубае.",
  ],
  "Delivered to your everyday in Baku.": [
    "Bakıda gündəlik həyatınıza çatdırılır.",
    "С доставкой в вашу жизнь в Баку.",
  ],
  "Find your next upgrade": [
    "Yeni cihazınızı tapın",
    "Найдите новое устройство",
  ],
  "How it gets to you": ["Sizə necə çatdırılır", "Как мы доставляем"],
  "Carefully selected. Connected to your world.": [
    "Diqqətlə seçilib. Həyatınıza uyğun.",
    "Тщательно отобрано. Для вашего мира.",
  ],
  "A little scroll. A lot to discover.": [
    "Kəşf etmək üçün aşağı sürüşdürün.",
    "Листайте и открывайте новое.",
  ],
  "THE IPHONE 18 COLLECTION": ["IPHONE 18 KOLLEKSİYASI", "КОЛЛЕКЦИЯ IPHONE 18"],
  "THE NEW COLLECTION": ["YENİ KOLLEKSİYA", "НОВАЯ КОЛЛЕКЦИЯ"],
  "closer.": ["yaxın.", "ближе."],
  "A fresh perspective.": ["Yeni baxış.", "Свежий взгляд."],
  "A familiar feeling.": ["Tanış hisslər.", "Знакомые ощущения."],
  "IN THE SPOTLIGHT": ["DİQQƏT MƏRKƏZİNDƏ", "В ЦЕНТРЕ ВНИМАНИЯ"],
  "Discover iPhone 18 Pro": [
    "iPhone 18 Pro ilə tanış olun",
    "Откройте iPhone 18 Pro",
  ],
  "THE UPGRADE EDIT": ["YENİLƏNMƏ VAXTIDIR", "ВРЕМЯ ОБНОВЛЕНИЙ"],
  "Your wish list. Upgraded.": [
    "İstəklərinizə bir addım yaxın.",
    "Желания становятся ближе.",
  ],
  "Save 30% on Samsung Ultras and MacBooks. Up to 50% on selected essentials.":
    [
      "Samsung Ultra və MacBook modellərinə 30%, seçilmiş məhsullara 50%-dək endirim.",
      "Скидка 30% на Samsung Ultra и MacBook. До 50% на избранные товары.",
    ],
  "Explore all offers": ["Bütün təkliflər", "Все предложения"],
  "Sale collection": ["Endirimli məhsullar", "Товары со скидкой"],
  "Big names.": ["Böyük brendlər.", "Знаменитые бренды."],
  "Better everyday.": ["Daha rahat həyat.", "Лучше каждый день."],
  "THE CURATED COLLECTION": [
    "SİZİN ÜÇÜN SEÇİLMİŞ KOLLEKSİYA",
    "ТЩАТЕЛЬНО ОТОБРАННАЯ КОЛЛЕКЦИЯ",
  ],
  "Good tech.": ["Yaxşı texnologiya.", "Отличные технологии."],
  "Great possibilities.": ["Böyük imkanlar.", "Большие возможности."],
  "View the essentials": ["Seçilmiş məhsullar", "Показать основное"],
  "Explore all products": ["Bütün məhsullara bax", "Посмотреть все товары"],
  "Product category": ["Məhsul kateqoriyası", "Категория товаров"],
  "Sort products": ["Məhsulları sırala", "Сортировка товаров"],
  Featured: ["Seçilənlər", "Рекомендуемые"],
  "Our curated selection": ["Diqqətlə seçdiyimiz məhsullar", "Наша подборка"],
  "Price: low to high": ["Qiymət: ucuzdan bahaya", "Цена: по возрастанию"],
  "Price: high to low": ["Qiymət: bahadan ucuza", "Цена: по убыванию"],
  "New arrivals": ["Yeni gələnlər", "Новинки"],
  "New arrival": ["Yeni", "Новинка"],
  "Biggest savings": ["Ən böyük endirim", "Самые выгодные"],
  "Clear search": ["Axtarışı təmizlə", "Очистить поиск"],
  "Results for “{query}”": [
    "“{query}” üçün nəticələr",
    "Результаты по запросу «{query}»",
  ],
  "Showing all offers · Show all products": [
    "Endirimli məhsullar · Bütün məhsulları göstər",
    "Все предложения · Показать все товары",
  ],
  "No matches just yet.": ["Nəticə tapılmadı.", "Пока ничего не найдено."],
  "Try another product or explore the full collection.": [
    "Başqa məhsul axtarın və ya bütün kolleksiyaya baxın.",
    "Попробуйте другой запрос или откройте всю коллекцию.",
  ],
  "Explore all devices": ["Bütün cihazlara bax", "Посмотреть все устройства"],
  "A little something for every part of your day.": [
    "Günün hər anı üçün bir yenilik.",
    "Что-то особенное для каждого момента дня.",
  ],
  "curated essentials": ["seçilmiş məhsul", "избранных товаров"],
  "BUILT FOR YOUR NEXT BIG IDEA.": [
    "BÖYÜK İDEYALARINIZ ÜÇÜN.",
    "ДЛЯ ВАШЕЙ СЛЕДУЮЩЕЙ БОЛЬШОЙ ИДЕИ.",
  ],
  "Room to imagine.": ["Xəyal üçün məkan.", "Простор для идей."],
  "Power to create.": ["Yaratmaq üçün güc.", "Мощь для творчества."],
  "Meet MacBook Air with M5. For ideas that deserve": [
    "M5 çipli MacBook Air ilə tanış olun.",
    "Знакомьтесь: MacBook Air с M5. Для идей, которым нужно",
  ],
  "a little more power, wherever your day takes you.": [
    "Harada olursunuzsa olun, ideyalarınıza daha çox güc verin.",
    "больше мощности, куда бы ни привёл вас день.",
  ],
  "Explore MacBook Air": ["MacBook Air-ə bax", "Откройте MacBook Air"],
  "Off every MacBook": [
    "Bütün MacBook-lara endirim",
    "Скидка на каждый MacBook",
  ],
  "MacBook Air M5 · Save 30%": [
    "MacBook Air M5 · 30% endirim",
    "MacBook Air M5 · Скидка 30%",
  ],
  "From {price}": ["{price}-dən başlayan", "От {price}"],
  "A SHORTER DISTANCE TO SOMETHING GREAT": [
    "YENİLİKLƏR İNDİ DAHA YAXIN",
    "ЛУЧШЕЕ СТАНОВИТСЯ БЛИЖЕ",
  ],
  "From the heart of Dubai.": ["Dubayın mərkəzindən.", "Из сердца Дубая."],
  "To your corner of Baku.": ["Bakıda sizin ünvanınıza.", "В ваш уголок Баку."],
  "We believe your next great device shouldn’t feel a world away. We bring thoughtfully selected electronics from Dubai to Baku, with a simple shopping experience from discovery to delivery.":
    [
      "İnanırıq ki, sevdiyiniz cihaz sizdən uzaqda olmamalıdır. Dubayda diqqətlə seçilmiş elektronikanı rahat alış-veriş və çatdırılma ilə Bakıya gətiririk.",
      "Мы верим, что любимое устройство должно быть рядом. Мы привозим тщательно отобранную электронику из Дубая в Баку, делая покупки простыми — от выбора до доставки.",
    ],
  "Get to know the journey": [
    "Çatdırılma ilə tanış olun",
    "Узнайте о доставке",
  ],
  Dubai: ["Dubay", "Дубай"],
  Baku: ["Bakı", "Баку"],
  "Where it starts": ["Yolun başlanğıcı", "Начало пути"],
  "Where it belongs": ["Sizin ünvanınız", "Место назначения"],
  "Thoughtfully sourced. Carefully packed.": [
    "Diqqətlə seçilir. Qayğı ilə qablaşdırılır.",
    "Тщательно отобрано. Бережно упаковано.",
  ],
  "Made to arrive in your everyday.": [
    "Gündəlik həyatınıza yenilik gətirir.",
    "Чтобы стать частью вашего дня.",
  ],
  "The Dubai Electronics experience": [
    "Dubai Electronics təcrübəsi",
    "Преимущества Dubai Electronics",
  ],
  "A considered collection": [
    "Diqqətlə seçilmiş kolleksiya",
    "Продуманная коллекция",
  ],
  "Great devices, chosen with": [
    "Mükəmməl cihazlar",
    "Отличные устройства, выбранные",
  ],
  "your everyday in mind.": [
    "gündəlik həyatınız üçün seçilir.",
    "для вашей повседневной жизни.",
  ],
  "Dubai to your doorstep": ["Dubaydan qapınıza", "Из Дубая к вашей двери"],
  "A direct journey from Dubai": ["Dubaydan birbaşa", "Прямой путь из Дубая"],
  "to Baku, Azerbaijan.": ["Bakıya, Azərbaycana.", "в Баку, Азербайджан."],
  "Peace of mind at checkout": [
    "Rahat və təhlükəsiz ödəniş",
    "Спокойствие при оплате",
  ],
  "Payment handled by a secure": [
    "Satış başlayanda ödənişlər",
    "После запуска оплату обработает",
  ],
  "provider when we launch.": [
    "təhlükəsiz provayderlə aparılacaq.",
    "защищённый платёжный сервис.",
  ],
  "A more personal experience": ["Sizə özəl yanaşma", "Индивидуальный подход"],
  "Questions before you order?": [
    "Sifarişdən əvvəl sualınız var?",
    "Есть вопросы перед заказом?",
  ],
  "Let’s help you find your fit.": [
    "Doğru seçimə kömək edək.",
    "Поможем сделать выбор.",
  ],
  "A LITTLE MORE IN THE KNOW": [
    "YENİLİKLƏRDƏN XƏBƏRDAR OLUN",
    "БУДЬТЕ В КУРСЕ",
  ],
  "Good things.": ["Yaxşı xəbərlər.", "Хорошие новости."],
  "In your inbox.": ["E-poçtunuzda.", "В вашей почте."],
  "New arrivals, fresh inspiration, and your next great upgrade.": [
    "Yeni məhsullar, maraqlı ideyalar və sərfəli təkliflər.",
    "Новинки, вдохновение и ваше следующее обновление.",
  ],
  "Your email address": ["E-poçt ünvanınız", "Ваш адрес электронной почты"],
  "Join the newsletter": ["Yeniliklərə abunə ol", "Подписаться на новости"],
  "By joining, you agree to our": [
    "Abunə olmaqla qəbul edirsiniz:",
    "Подписываясь, вы соглашаетесь с документом:",
  ],
  "Privacy Policy": ["Məxfilik siyasəti", "Политика конфиденциальности"],
  ". No spam. Just a little inspiration.": [
    ". Spam yoxdur, yalnız faydalı yeniliklər.",
    ". Без спама. Только полезные новости.",
  ],
  "Better tech. Closer than ever.": [
    "Daha yaxşı texnologiya. İndi daha yaxın.",
    "Лучшие технологии. Теперь ещё ближе.",
  ],
  "From Dubai to Baku, with possibility.": [
    "Yeni imkanlar Dubaydan Bakıya.",
    "Новые возможности из Дубая в Баку.",
  ],
  "DUBAI, UAE → BAKU, AZERBAIJAN": [
    "DUBAY, BƏƏ → BAKI, AZƏRBAYCAN",
    "ДУБАЙ, ОАЭ → БАКУ, АЗЕРБАЙДЖАН",
  ],
  "Find your upgrade": ["Yeni cihazınızı seçin", "Выберите новое устройство"],
  "Returns & warranty": ["Qaytarılma və zəmanət", "Возврат и гарантия"],
  "Frequently asked questions": ["Tez-tez verilən suallar", "Частые вопросы"],
  "Make room for": ["Həyatınıza yer verin:", "Откройте место для"],
  "something great.": ["yeni imkanlara.", "чего-то особенного."],
  "Explore the collection": ["Kolleksiyaya bax", "Открыть коллекцию"],
  Privacy: ["Məxfilik", "Конфиденциальность"],
  Terms: ["Şərtlər", "Условия"],
  "Designed for your everyday.": [
    "Gündəlik həyatınız üçün.",
    "Для вашей повседневной жизни.",
  ],
  "Preview collection · Product prices, stock, and delivery terms will be confirmed before launch.":
    [
      "Ön baxış kolleksiyası · Qiymətlər, stok və çatdırılma şərtləri satışdan əvvəl təsdiqlənəcək.",
      "Предварительная коллекция · Цены, наличие и условия доставки будут подтверждены перед запуском.",
    ],
  "Currency conversions are indicative; checkout is in AZN.": [
    "Valyuta çevirmələri təxminidir; ödəniş AZN ilə aparılır.",
    "Конвертация валют ориентировочная; оплата в AZN.",
  ],
  "View bag": ["Səbətə bax", "Открыть корзину"],
  "FIND YOUR NEXT UPGRADE": [
    "YENİ CİHAZINIZI TAPIN",
    "НАЙДИТЕ НОВОЕ УСТРОЙСТВО",
  ],
  "What are you looking for?": ["Nə axtarırsınız?", "Что вы ищете?"],
  "Try iPhone, MacBook, or headphones": [
    "iPhone, MacBook və ya qulaqlıq axtarın",
    "Попробуйте iPhone, MacBook или наушники",
  ],
  "See search results": ["Axtarış nəticələrinə bax", "Показать результаты"],
  "A few favourites to get you started": [
    "Sizin üçün seçdiklərimiz",
    "Несколько идей для начала",
  ],
  "{count} thoughtful finds": [
    "{count} seçilmiş məhsul",
    "Найдено товаров: {count}",
  ],
  "No matches. Try a different device or brand.": [
    "Nəticə yoxdur. Başqa cihaz və ya brend axtarın.",
    "Ничего не найдено. Попробуйте другое устройство или бренд.",
  ],
  "GREAT CHOICES START HERE": [
    "DOĞRU SEÇİM BURADAN BAŞLAYIR",
    "ОТЛИЧНЫЙ ВЫБОР НАЧИНАЕТСЯ ЗДЕСЬ",
  ],
  "Your shopping bag": ["Alış-veriş səbətiniz", "Ваша корзина"],
  Remove: ["Sil", "Удалить"],
  Subtotal: ["Ara cəm", "Подытог"],
  "Shipping is calculated at checkout. Payment is in AZN.": [
    "Çatdırılma sifariş zamanı hesablanır. Ödəniş AZN ilə aparılır.",
    "Доставка рассчитывается при оформлении. Оплата в AZN.",
  ],
  "Continue to checkout": ["Sifarişi rəsmiləşdir", "Оформить заказ"],
  "Keep exploring": ["Alış-verişə davam et", "Продолжить покупки"],
  "Your next upgrade is in good company.": [
    "Yeni cihazınız etibarlı əllərdədir.",
    "Ваше новое устройство в надёжных руках.",
  ],
  "A little room for possibility.": [
    "Yeni seçimlərə yer var.",
    "Место для новых возможностей.",
  ],
  "Your bag is empty. Find something you’ll love.": [
    "Səbətiniz boşdur. Bəyənəcəyiniz məhsulu tapın.",
    "Корзина пуста. Найдите то, что вам понравится.",
  ],
  "A LITTLE INSPIRATION FOR LATER": [
    "SONRA ÜÇÜN SAXLADIQLARINIZ",
    "НЕМНОГО ВДОХНОВЕНИЯ НА ПОТОМ",
  ],
  "Your saved favourites": ["Sevimli məhsullarınız", "Ваше избранное"],
  "Add to bag": ["Səbətə əlavə et", "В корзину"],
  "Keep the good things close.": [
    "Bəyəndiklərinizi yadda saxlayın.",
    "Сохраните то, что нравится.",
  ],
  "Tap the heart on a device to save it here.": [
    "Məhsulu burada saxlamaq üçün ürək işarəsinə toxunun.",
    "Нажмите на сердечко у товара, чтобы сохранить его здесь.",
  ],
  "Find a favourite": [
    "Sevimli məhsulunuzu tapın",
    "Найдите любимое устройство",
  ],
  "An everyday upgrade": ["Hər gün üçün yenilik", "Обновление на каждый день"],
  "Illustrative product preview": [
    "Məhsulun nümunəvi təsviri",
    "Иллюстрация товара",
  ],
  Storage: ["Yaddaş", "Память"],
  Configuration: ["Konfiqurasiya", "Конфигурация"],
  Unavailable: ["Stokda yoxdur", "Нет в наличии"],
  "Color:": ["Rəng:", "Цвет:"],
  "Illustrative preview.": ["Nümunəvi təsvir.", "Иллюстрация."],
  "Colors follow Apple’s official Pro lineup. Screen colors may vary from the physical finish.":
    [
      "Rənglər Apple-ın rəsmi Pro seriyasına uyğundur. Ekrandakı rəng faktiki məhsuldan fərqlənə bilər.",
      "Цвета соответствуют официальной линейке Apple Pro. Цвет на экране может отличаться от фактического.",
    ],
  "Included attachments and regional packaging may vary.": [
    "Daxil olan başlıqlar və regional qablaşdırma fərqlənə bilər.",
    "Комплект насадок и региональная упаковка могут отличаться.",
  ],
  "Add to your bag": ["Səbətinizə əlavə et", "Добавить в корзину"],
  "Saved to your favourites": [
    "Sevimlilərdə saxlanılıb",
    "Сохранено в избранном",
  ],
  "Save for a little later": ["Sonra üçün yadda saxla", "Сохранить на потом"],
  "From Dubai to Baku. Delivery details at checkout.": [
    "Dubaydan Bakıya. Çatdırılma məlumatları sifariş zamanı göstərilir.",
    "Из Дубая в Баку. Подробности доставки при оформлении.",
  ],
  "FROM DUBAI TO YOUR EVERYDAY": [
    "DUBAYDAN GÜNDƏLİK HƏYATINIZA",
    "ИЗ ДУБАЯ В ВАШУ ПОВСЕДНЕВНОСТЬ",
  ],
  "A simpler way to get there.": [
    "Daha rahat çatdırılma.",
    "Простой путь к вам.",
  ],
  "Your next upgrade starts in Dubai and arrives in Baku, Azerbaijan. Here’s how the journey works.":
    [
      "Yeni cihazınızın yolu Dubayda başlayır, Bakıda ünvanınızda tamamlanır. Proses belədir.",
      "Путь вашего нового устройства начинается в Дубае и заканчивается в Баку. Вот как это работает.",
    ],
  "Find your fit": ["Sizə uyğun cihazı seçin", "Найдите своё устройство"],
  "Explore the collection and choose the device that’s right for your day.": [
    "Kolleksiyaya baxın və gündəlik həyatınıza uyğun cihazı seçin.",
    "Откройте коллекцию и выберите устройство для вашего дня.",
  ],
  "A clear checkout": ["Aydın sifariş prosesi", "Прозрачное оформление"],
  "Enter your Baku delivery address. Review the final order and shipping price before paying.":
    [
      "Bakıdakı çatdırılma ünvanınızı daxil edin. Ödənişdən əvvəl sifarişi və çatdırılma haqqını yoxlayın.",
      "Укажите адрес доставки в Баку. Проверьте заказ и стоимость доставки перед оплатой.",
    ],
  "Once payment is confirmed, your product is prepared for shipment from Dubai to Baku.":
    [
      "Ödəniş təsdiqləndikdən sonra məhsulunuz Dubaydan Bakıya göndərilmək üçün hazırlanır.",
      "После подтверждения оплаты товар готовится к отправке из Дубая в Баку.",
    ],
  "Our delivery service is being prepared for launch. Final delivery times, customs terms, and shipping fees will be published before orders open.":
    [
      "Çatdırılma xidmətimiz satışa hazırlanır. Müddətlər, gömrük şərtləri və çatdırılma haqları sifarişlər açılmazdan əvvəl dərc olunacaq.",
      "Мы готовим службу доставки к запуску. Сроки, таможенные условия и стоимость доставки будут опубликованы до начала приёма заказов.",
    ],
  "A LITTLE HELP GOES A LONG WAY": [
    "SEÇİMİNİZDƏ YANINIZDAYIQ",
    "МЫ ПОМОЖЕМ С ВЫБОРОМ",
  ],
  "Let’s find your next upgrade.": [
    "Yeni cihazınızı birlikdə tapaq.",
    "Найдём ваше новое устройство.",
  ],
  "Where do you deliver?": ["Hara çatdırırsınız?", "Куда вы доставляете?"],
  "We are preparing delivery from Dubai to Baku, Azerbaijan. The final shipping options will be shown before payment when ordering opens.":
    [
      "Dubaydan Bakıya çatdırılmanı hazırlayırıq. Sifarişlər açıldıqda mövcud çatdırılma seçimləri ödənişdən əvvəl göstəriləcək.",
      "Мы готовим доставку из Дубая в Баку. После запуска окончательные варианты доставки будут показаны перед оплатой.",
    ],
  "Can I pay online?": ["Onlayn ödəniş edə bilərəm?", "Можно оплатить онлайн?"],
  "Online payments will be available when our payment provider is connected. You can explore the collection and save your favourites in the meantime.":
    [
      "Ödəniş provayderi qoşulduqda onlayn ödənişlər açılacaq. Hələlik kolleksiyaya baxıb sevimlilərinizi saxlaya bilərsiniz.",
      "Онлайн-оплата станет доступна после подключения платёжного сервиса. Пока можно изучать коллекцию и сохранять избранное.",
    ],
  "What about warranty and returns?": [
    "Zəmanət və qaytarılma necədir?",
    "Что с гарантией и возвратом?",
  ],
  "Warranty coverage depends on the device and its regional model. We will publish the final return and warranty terms before accepting orders.":
    [
      "Zəmanət cihazdan və regional modeldən asılıdır. Yekun qaytarılma və zəmanət şərtləri sifarişlər qəbul edilməzdən əvvəl dərc olunacaq.",
      "Гарантия зависит от устройства и региональной версии. Окончательные условия возврата и гарантии будут опубликованы до приёма заказов.",
    ],
  "Have something else in mind?": [
    "Başqa sualınız var?",
    "Есть другой вопрос?",
  ],
  "Your name": ["Adınız", "Ваше имя"],
  "Your full name": ["Ad və soyadınız", "Ваше полное имя"],
  "Email address": ["E-poçt ünvanı", "Электронная почта"],
  "Your message": ["Mesajınız", "Ваше сообщение"],
  "Tell us what you’re looking for…": [
    "Nə axtardığınızı bizə yazın…",
    "Расскажите, что вы ищете…",
  ],
  "Your message is stored for follow-up in line with our": [
    "Mesajınız cavablandırılmaq üçün saxlanılır:",
    "Сообщение сохраняется для ответа. Подробнее:",
  ],
  "Sending…": ["Göndərilir…", "Отправляем…"],
  "Send your message": ["Mesajı göndər", "Отправить сообщение"],
  "Please try again.": ["Yenidən cəhd edin.", "Попробуйте ещё раз."],
  "We couldn't save your email. Please try again.": [
    "E-poçt ünvanınız saxlanmadı. Yenidən cəhd edin.",
    "Не удалось сохранить адрес. Попробуйте ещё раз.",
  ],
  "We couldn't save your message. Please try again.": [
    "Mesajınız saxlanmadı. Yenidən cəhd edin.",
    "Не удалось сохранить сообщение. Попробуйте ещё раз.",
  ],
  "You're on the list. Thanks for joining us!": [
    "Abunəliyiniz qeydə alındı. Təşəkkür edirik!",
    "Вы в списке. Спасибо за подписку!",
  ],
  "Your message has been received. Thank you for getting in touch.": [
    "Mesajınız alındı. Bizimlə əlaqə saxladığınız üçün təşəkkür edirik.",
    "Сообщение получено. Спасибо за обращение.",
  ],
  "You can add up to {count} of this item.": [
    "Bu məhsuldan ən çox {count} ədəd əlavə edə bilərsiniz.",
    "Можно добавить не более {count} единиц этого товара.",
  ],
  "{product} added to your bag": [
    "{product} səbətinizə əlavə edildi",
    "{product} добавлен в корзину",
  ],
  "Wishlist, {count} {items}": [
    "Sevimlilər, {count} məhsul",
    "Избранное, товаров: {count}",
  ],
  "Shopping bag, {count} {items}": [
    "Səbət, {count} məhsul",
    "Корзина, товаров: {count}",
  ],
  item: ["məhsul", "товар"],
  items: ["məhsul", "товаров"],
  "{count} items": ["{count} məhsul", "Товаров: {count}"],
  "A closer look": ["Ətraflı bax", "Подробнее"],
  "{percent}% OFF": ["{percent}% ENDİRİM", "−{percent}%"],
  "{percent}% OFF · Save {price}": [
    "{percent}% endirim · {price} qənaət",
    "Скидка {percent}% · Экономия {price}",
  ],
  "Save {product} to wishlist": [
    "{product} sevimlilərə əlavə et",
    "Сохранить {product} в избранное",
  ],
  "Remove {product} from wishlist": [
    "{product} sevimlilərdən sil",
    "Удалить {product} из избранного",
  ],
  "View {product}": ["{product} ətraflı bax", "Подробнее о {product}"],
  "{product} in {color}": ["{product}, {color}", "{product}, {color}"],
  "{product} colors": ["{product} rəngləri", "Цвета {product}"],
  "Add {product} to bag": [
    "{product} səbətə əlavə et",
    "Добавить {product} в корзину",
  ],
  "Decrease {product} quantity": [
    "{product} sayını azalt",
    "Уменьшить количество {product}",
  ],
  "Increase {product} quantity": [
    "{product} sayını artır",
    "Увеличить количество {product}",
  ],
  "Remove {product} from bag": [
    "{product} səbətdən sil",
    "Удалить {product} из корзины",
  ],
  "Remove {product}": ["{product} sil", "Удалить {product}"],
  "Select {color}": ["{color} seç", "Выбрать {color}"],
  "Only {count} left in stock": [
    "stokda {count} ədəd qalıb",
    "Осталось на складе: {count}",
  ],
  "Photo unavailable": ["Şəkil mövcud deyil", "Фото недоступно"],
  "Photo unavailable: {product}": [
    "Şəkil mövcud deyil: {product}",
    "Фото недоступно: {product}",
  ],
  "this product": ["bu məhsul", "этот товар"],
  "For this finish": ["Bu rəng üçün", "Для этого цвета"],
  "Secure checkout": ["Təhlükəsiz sifariş", "Безопасное оформление"],
  "Back to shopping": ["Alış-verişə qayıt", "Вернуться к покупкам"],
  "THE GOOD PART IS NEXT": ["YENİ CİHAZINIZA BİR ADDIM", "ЛУЧШЕЕ ВПЕРЕДИ"],
  "A little closer to": ["Yeni cihazınıza", "Ещё ближе к"],
  "yours.": ["bir addım yaxın.", "вашему."],
  "Premium tech. A smooth journey from Dubai to your door.": [
    "Seçilmiş texnologiyalar. Dubaydan qapınıza rahat çatdırılma.",
    "Премиальные технологии. Простой путь из Дубая к вашей двери.",
  ],
  "Loading your bag…": ["Səbətiniz yüklənir…", "Загружаем корзину…"],
  "Your next upgrade is waiting.": [
    "Yeni cihazınız sizi gözləyir.",
    "Ваше новое устройство ждёт.",
  ],
  "Your bag is empty. Discover a little something you’ll love.": [
    "Səbətiniz boşdur. Bəyənəcəyiniz məhsulları kəşf edin.",
    "Корзина пуста. Найдите то, что вам понравится.",
  ],
  "Store preview.": [
    "Mağazanın ön baxışı.",
    "Предварительная версия магазина.",
  ],
  "Product prices, business details, and delivery and return policies are awaiting merchant confirmation. Online ordering is not available yet.":
    [
      "Qiymətlər, satıcı məlumatları, çatdırılma və qaytarılma qaydaları təsdiq gözləyir. Onlayn sifariş hələ açılmayıb.",
      "Цены, данные продавца и правила доставки и возврата ожидают подтверждения. Онлайн-заказы пока недоступны.",
    ],
  "Read our draft terms": [
    "İlkin şərtlərə bax",
    "Прочитать предварительные условия",
  ],
  "Your payment wasn’t completed. Your bag is saved, so you can continue whenever you’re ready.":
    [
      "Ödəniş tamamlanmadı. Səbətiniz saxlanılıb, hazır olduğunuzda davam edə bilərsiniz.",
      "Оплата не завершена. Корзина сохранена — продолжите, когда будете готовы.",
    ],
  "Your details": ["Məlumatlarınız", "Ваши данные"],
  "Where we can reach you about your order.": [
    "Sifarişlə bağlı sizinlə əlaqə saxlamaq üçün.",
    "Чтобы связаться с вами по поводу заказа.",
  ],
  "Full name": ["Ad və soyad", "Имя и фамилия"],
  "Your first and last name": ["Adınız və soyadınız", "Ваше имя и фамилия"],
  "Phone number": ["Telefon nömrəsi", "Номер телефона"],
  "Enter a valid phone number, including the country code.": [
    "Ölkə kodu ilə düzgün telefon nömrəsi daxil edin.",
    "Введите корректный номер с кодом страны.",
  ],
  "Delivery address": ["Çatdırılma ünvanı", "Адрес доставки"],
  "Street address": ["Küçə ünvanı", "Улица и дом"],
  "Street name and building number": [
    "Küçənin adı və binanın nömrəsi",
    "Название улицы и номер дома",
  ],
  "Apartment, floor, or delivery note": [
    "Mənzil, mərtəbə və ya qeyd",
    "Квартира, этаж или примечание",
  ],
  "(optional)": ["(istəyə bağlı)", "(необязательно)"],
  "Apartment, floor, or a helpful landmark": [
    "Mənzil, mərtəbə və ya yaxınlıqdakı məkan",
    "Квартира, этаж или ориентир",
  ],
  City: ["Şəhər", "Город"],
  "Postal code": ["Poçt indeksi", "Почтовый индекс"],
  "Enter four digits, optionally prefixed by AZ (for example, AZ1000).": [
    "Dörd rəqəm daxil edin, əvvəlində AZ ola bilər (məsələn, AZ1000).",
    "Введите четыре цифры, при желании с префиксом AZ (например, AZ1000).",
  ],
  Country: ["Ölkə", "Страна"],
  Azerbaijan: ["Azərbaycan", "Азербайджан"],
  "Dubai → Baku": ["Dubay → Bakı", "Дубай → Баку"],
  "Delivery time and any applicable customs charges must be confirmed before payment.":
    [
      "Çatdırılma müddəti və tətbiq olunan gömrük ödənişləri ödənişdən əvvəl təsdiqlənməlidir.",
      "Срок доставки и возможные таможенные сборы должны быть подтверждены перед оплатой.",
    ],
  Free: ["Pulsuz", "Бесплатно"],
  Payment: ["Ödəniş", "Оплата"],
  "A secure final step for your next upgrade.": [
    "Yeni cihazınız üçün son təhlükəsiz addım.",
    "Безопасный последний шаг к новому устройству.",
  ],
  "Checking payment availability": [
    "Ödəniş imkanı yoxlanılır",
    "Проверяем доступность оплаты",
  ],
  "Just a moment while we prepare your checkout.": [
    "Sifarişinizi hazırlayırıq, bir an gözləyin.",
    "Подождите, пока мы подготовим оформление.",
  ],
  "Pay securely online": [
    "Onlayn təhlükəsiz ödəyin",
    "Безопасная онлайн-оплата",
  ],
  "You’ll continue to a secure payment page. Your card details stay with our payment provider.":
    [
      "Təhlükəsiz ödəniş səhifəsinə keçəcəksiniz. Kart məlumatlarınız ödəniş provayderində qalır.",
      "Вы перейдёте на защищённую страницу оплаты. Данные карты остаются у платёжного провайдера.",
    ],
  "Online payments are coming soon": [
    "Onlayn ödənişlər tezliklə",
    "Онлайн-оплата скоро появится",
  ],
  "Our payment service is being prepared. Checkout will be available once it’s ready.":
    [
      "Ödəniş xidmətimiz hazırlanır. Hazır olduqda sifarişlər açılacaq.",
      "Мы готовим платёжный сервис. Оформление станет доступно после запуска.",
    ],
  "Coming soon": ["Tezliklə", "Скоро"],
  "Your bag": ["Səbətiniz", "Ваша корзина"],
  "Delivery to Baku": ["Bakıya çatdırılma", "Доставка в Баку"],
  Complimentary: ["Pulsuz", "Бесплатно"],
  Total: ["Yekun", "Итого"],
  "All prices in AZN": ["Bütün qiymətlər AZN ilə", "Все цены в AZN"],
  "Free delivery on orders of": [
    "Bu məbləğdən pulsuz çatdırılma:",
    "Бесплатная доставка при заказе от",
  ],
  "Preparing secure payment…": [
    "Təhlükəsiz ödəniş hazırlanır…",
    "Готовим безопасную оплату…",
  ],
  "Continue to payment": ["Ödənişə keç", "Перейти к оплате"],
  "Preparing checkout…": ["Sifariş hazırlanır…", "Готовим оформление…"],
  "Payments coming soon": [
    "Ödənişlər tezliklə açılacaq",
    "Оплата скоро появится",
  ],
  "By continuing, you agree to our": [
    "Davam etməklə qəbul edirsiniz:",
    "Продолжая, вы соглашаетесь с документами:",
  ],
  "Terms of Service": ["İstifadə şərtləri", "Условия обслуживания"],
  and: ["və", "и"],
  "Encrypted & secure checkout": [
    "Şifrələnmiş və təhlükəsiz sifariş",
    "Защищённое оформление с шифрованием",
  ],
  "A thoughtful journey, every step.": [
    "Hər addımda diqqət və qayğı.",
    "Забота на каждом этапе.",
  ],
  "Carefully sourced. Securely packed. Ready for you.": [
    "Diqqətlə seçilir. Təhlükəsiz qablaşdırılır. Sizin üçün hazırdır.",
    "Тщательно отобрано. Надёжно упаковано. Готово для вас.",
  ],
  "Carefully sourced electronics": [
    "Diqqətlə seçilmiş elektronika",
    "Тщательно отобранная электроника",
  ],
  "Prices in AZN": ["Qiymətlər AZN ilə", "Цены в AZN"],
  "Delivery & returns": ["Çatdırılma və qaytarılma", "Доставка и возврат"],
  "Your browser couldn’t save your bag. Enable browser storage before continuing.":
    [
      "Brauzer səbətinizi saxlaya bilmədi. Davam etmək üçün brauzer yaddaşını aktivləşdirin.",
      "Браузер не смог сохранить корзину. Разрешите хранение данных перед продолжением.",
    ],
  "Payment availability could not be checked.": [
    "Ödəniş imkanı yoxlanmadı.",
    "Не удалось проверить доступность оплаты.",
  ],
  "We couldn’t start checkout. Please try again.": [
    "Sifariş başlatmaq mümkün olmadı. Yenidən cəhd edin.",
    "Не удалось начать оформление. Попробуйте ещё раз.",
  ],
  "The payment link could not be verified. Please try again.": [
    "Ödəniş keçidi təsdiqlənmədi. Yenidən cəhd edin.",
    "Не удалось проверить ссылку оплаты. Попробуйте ещё раз.",
  ],
  "The payment session could not be verified. Please try again.": [
    "Ödəniş sessiyası təsdiqlənmədi. Yenidən cəhd edin.",
    "Не удалось проверить платёжную сессию. Попробуйте ещё раз.",
  ],
  "One moment": ["Bir an gözləyin", "Один момент"],
  "Payment confirmed": ["Ödəniş təsdiqləndi", "Оплата подтверждена"],
  "Payment processing": ["Ödəniş emal olunur", "Оплата обрабатывается"],
  "Checkout expired": ["Sifariş sessiyası bitib", "Сессия оформления истекла"],
  "Payment status": ["Ödəniş statusu", "Статус оплаты"],
  "A quick check.": ["Qısa yoxlama.", "Быстрая проверка."],
  "Then you’re all set.": ["Sonra hər şey hazırdır.", "И всё готово."],
  "Thank you.": ["Təşəkkür edirik.", "Спасибо."],
  "Payment received.": ["Ödəniş alındı.", "Оплата получена."],
  "A little patience.": ["Bir az səbir.", "Немного терпения."],
  "We’re checking your payment.": [
    "Ödənişinizi yoxlayırıq.",
    "Проверяем вашу оплату.",
  ],
  "Let’s check": ["Gəlin yoxlayaq:", "Проверим"],
  "your order.": ["sifarişiniz.", "ваш заказ."],
  "We’re securely verifying your payment with our payment provider.": [
    "Ödənişinizi provayderimiz vasitəsilə təhlükəsiz şəkildə yoxlayırıq.",
    "Мы безопасно проверяем вашу оплату у платёжного провайдера.",
  ],
  "Your payment has been verified. Thank you for choosing Dubai Electronics. Keep your payment confirmation for your records.":
    [
      "Ödənişiniz təsdiqləndi. Dubai Electronics-i seçdiyiniz üçün təşəkkür edirik. Ödəniş təsdiqini saxlayın.",
      "Оплата подтверждена. Спасибо, что выбрали Dubai Electronics. Сохраните подтверждение оплаты.",
    ],
  "Your payment hasn’t been confirmed yet. If you’ve completed payment, it may take a moment to appear. Check again before placing another order.":
    [
      "Ödəniş hələ təsdiqlənməyib. Ödəniş etmisinizsə, görünməsi bir az vaxt ala bilər. Yeni sifariş verməzdən əvvəl yenidən yoxlayın.",
      "Оплата пока не подтверждена. Если вы уже оплатили, обновление может занять немного времени. Проверьте ещё раз перед новым заказом.",
    ],
  "This checkout session has expired. Your bag is still saved. Return to checkout to start a new payment.":
    [
      "Bu sifariş sessiyasının müddəti bitib. Səbətiniz saxlanılıb. Yeni ödəniş üçün sifarişə qayıdın.",
      "Сессия оформления истекла. Корзина сохранена. Вернитесь к оформлению, чтобы начать новую оплату.",
    ],
  "Order reference": ["Sifariş nömrəsi", "Номер заказа"],
  "Check payment again": ["Ödənişi yenidən yoxla", "Проверить оплату ещё раз"],
  "Continue exploring": ["Alış-verişə davam et", "Продолжить покупки"],
  "Return to checkout": ["Sifarişə qayıt", "Вернуться к оформлению"],
  "Verified payment status": [
    "Təsdiqlənmiş ödəniş statusu",
    "Подтверждённый статус оплаты",
  ],
  "Secure payment lookup": [
    "Ödənişin təhlükəsiz yoxlanması",
    "Безопасная проверка оплаты",
  ],
  "From Dubai to Baku. A little closer to what you love.": [
    "Dubaydan Bakıya. Sevdiyiniz texnologiyaya bir addım yaxın.",
    "Из Дубая в Баку. Чуть ближе к тому, что вы любите.",
  ],
  "Open the order confirmation link from your checkout to see your payment status.":
    [
      "Ödəniş statusunu görmək üçün sifariş təsdiqi keçidini açın.",
      "Откройте ссылку подтверждения заказа, чтобы узнать статус оплаты.",
    ],
  "We couldn’t verify this payment.": [
    "Ödənişi təsdiqləmək mümkün olmadı.",
    "Не удалось проверить оплату.",
  ],
  "We couldn’t verify this payment. Please try again.": [
    "Ödənişi təsdiqləmək mümkün olmadı. Yenidən cəhd edin.",
    "Не удалось проверить оплату. Попробуйте ещё раз.",
  ],
  "A BRIEF PAUSE": ["QISA FASİLƏ", "КОРОТКАЯ ПАУЗА"],
  "A little moment.": ["Bir anlıq fasilə.", "Один момент."],
  "We’ll be right back.": ["Tezliklə qayıdacağıq.", "Мы скоро вернёмся."],
  "Something interrupted this page. Please try again to continue exploring.": [
    "Səhifədə xəta baş verdi. Davam etmək üçün yenidən cəhd edin.",
    "Что-то прервало загрузку страницы. Попробуйте ещё раз.",
  ],
  "Try again": ["Yenidən cəhd et", "Попробовать ещё раз"],
  "A SMALL DETOUR": ["KİÇİK BİR DÖNÜŞ", "НЕБОЛЬШОЙ ПОВОРОТ"],
  "Let’s get you": ["Sizi qaytaraq", "Вернём вас"],
  "back to possibility.": ["yeni imkanlara.", "к новым возможностям."],
  "We couldn’t find that page. Your next great upgrade is still waiting in the collection.":
    [
      "Səhifə tapılmadı. Yeni cihazınız kolleksiyada sizi gözləyir.",
      "Страница не найдена. Ваше новое устройство ждёт в коллекции.",
    ],
  "Back to the collection": ["Kolleksiyaya qayıt", "Вернуться к коллекции"],
  "Preparing your checkout…": [
    "Sifarişiniz hazırlanır…",
    "Готовим оформление…",
  ],
  "Checking your payment…": ["Ödənişiniz yoxlanılır…", "Проверяем оплату…"],
  Burgundy: ["Bordo", "Бордовый"],
  Silver: ["Gümüşü", "Серебристый"],
  "Cosmic Orange": ["Kosmik narıncı", "Космический оранжевый"],
  "Deep Blue": ["Tünd mavi", "Тёмно-синий"],
  "Sky Blue": ["Səma mavisi", "Небесно-голубой"],
  Midnight: ["Gecə yarısı", "Тёмная ночь"],
  Starlight: ["Ulduz işığı", "Сияющая звезда"],
  "Space Black": ["Kosmik qara", "Космический чёрный"],
  Black: ["Qara", "Чёрный"],
  White: ["Ağ", "Белый"],
  "Titanium Silverblue": ["Titan gümüşü-mavi", "Серебристо-голубой титан"],
  "Titanium Black": ["Titan qara", "Чёрный титан"],
  "Titanium Gray": ["Titan boz", "Серый титан"],
  "Titanium Whitesilver": ["Titan ağ-gümüşü", "Бело-серебристый титан"],
  "Titanium Jetblack": ["Titan tünd qara", "Глубокий чёрный титан"],
  "Titanium Jadegreen": ["Titan yaşıl", "Нефритовый титан"],
  "Titanium Pinkgold": ["Titan çəhrayı-qızılı", "Розово-золотой титан"],
  "Cobalt Violet": ["Kobalt bənövşəyi", "Кобальтово-фиолетовый"],
  Skyblue: ["Səma mavisi", "Небесно-голубой"],
  Pinkgold: ["Çəhrayı-qızılı", "Розовое золото"],
  "Silver Shadow": ["Gümüşü kölgə", "Серебристая тень"],
  "Vinca Blue / Topaz": ["Mavi / Topaz", "Синий / Топаз"],
  "Ceramic Pink / Rose Gold": [
    "Keramik çəhrayı / Çəhrayı qızılı",
    "Керамический розовый / Розовое золото",
  ],
  "Prussian Blue / Rich Copper": [
    "Prussiya mavisi / Mis",
    "Прусский синий / Медь",
  ],
  "Ceramic Patina / Topaz": [
    "Keramik patina / Topaz",
    "Керамическая патина / Топаз",
  ],
  Glacier: ["Buzlaq", "Ледниковый"],
  "Pink Gold": ["Çəhrayı qızılı", "Розовое золото"],
  "Space Gray": ["Kosmik boz", "Космический серый"],
  "Midnight Blue": ["Gecə mavisi", "Полуночный синий"],
  Lavender: ["Lavanda", "Лавандовый"],
  "Eclipse Gray": ["Tutqun boz", "Серый «Затмение»"],
  "Robot White": ["Robot ağ", "Белый робот"],
  "Memory & storage": [
    "Operativ və daxili yaddaş",
    "Оперативная и встроенная память",
  ],
  "Limited stock": ["Məhdud stok", "Осталось мало"],
  "Intelligent hair dryer": ["Ağıllı saçquruducu", "Умный фен"],
  "Wireless noise-cancelling headphones": [
    "Simsiz səsboğucu qulaqlıq",
    "Беспроводные наушники с шумоподавлением",
  ],
  "Wireless earbuds": ["Simsiz qulaqlıq", "Беспроводные наушники"],
  "USB-C case": ["USB-C qutu", "Футляр USB-C"],
  "Slim Disc edition": ["Slim diskli versiya", "Версия Slim с дисководом"],
  "45 MP full-frame mirrorless camera": [
    "45 MP tam kadr güzgüsüz kamera",
    "Беззеркальная полнокадровая камера 45 Мп",
  ],
  "Wireless noise-cancelling earbuds": [
    "Simsiz səsboğucu qulaqdaxili qulaqlıq",
    "Беспроводные внутриканальные наушники с шумоподавлением",
  ],
  "16-inch gaming laptop": [
    "16 düymlük oyun noutbuku",
    "Игровой ноутбук 16 дюймов",
  ],
  "Fitness & everyday activity": [
    "Fitnes və gündəlik fəaliyyət",
    "Фитнес и повседневная активность",
  ],
  "Portable smart projector": [
    "Portativ ağıllı proyektor",
    "Портативный умный проектор",
  ],
  "Wireless controller": ["Simsiz oyun pultu", "Беспроводной контроллер"],
  "13-inch": ["13 düym", "13 дюймов"],
  "Camera body; lens and accessories sold separately.": [
    "Kamera gövdəsi; obyektiv və aksesuarlar ayrıca satılır.",
    "Корпус камеры; объектив и аксессуары продаются отдельно.",
  ],
  "Exact processor, graphics and memory configuration to be confirmed.": [
    "Prosessor, qrafika və yaddaş konfiqurasiyası təsdiqlənməlidir.",
    "Точная конфигурация процессора, графики и памяти подлежит подтверждению.",
  ],
  "Regional model and included accessories to be confirmed.": [
    "Regional model və daxil olan aksesuarlar təsdiqlənməlidir.",
    "Региональная модель и комплект аксессуаров подлежат подтверждению.",
  ],
};

export function translate(
  source: string,
  language: Language,
  values?: TranslationValues,
): string {
  const translated =
    language === "en"
      ? source
      : translations[source]?.[language === "az" ? 0 : 1];
  // Variant descriptions combine commercial specifications and finish names with a middle dot.
  const text =
    translated ??
    (source.includes(" · ")
      ? source
          .split(" · ")
          .map((part) => translate(part, language))
          .join(" · ")
      : source);
  return values
    ? text.replace(/\{(\w+)\}/g, (placeholder, key: string) =>
        values[key] === undefined ? placeholder : String(values[key]),
      )
    : text;
}
