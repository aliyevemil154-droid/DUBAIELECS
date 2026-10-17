// API responses keep their existing contract; translate only their customer-facing text.
export const errorTranslations: Record<string, readonly [string, string]> = {
  "Please enter a valid email address.": [
    "Düzgün e-poçt ünvanı daxil edin.",
    "Введите корректный адрес электронной почты.",
  ],
  "Please enter your name.": ["Adınızı daxil edin.", "Введите ваше имя."],
  "Please enter a message between 10 and 2,000 characters.": [
    "10–2 000 simvoldan ibarət mesaj daxil edin.",
    "Введите сообщение длиной от 10 до 2 000 символов.",
  ],
  "Please send your request from our website.": [
    "Müraciətinizi saytımızdan göndərin.",
    "Отправьте запрос с нашего сайта.",
  ],
  "Please check your details and try again.": [
    "Məlumatlarınızı yoxlayıb yenidən cəhd edin.",
    "Проверьте данные и попробуйте ещё раз.",
  ],
  "Your request is too long.": [
    "Müraciətiniz çox uzundur.",
    "Запрос слишком длинный.",
  ],
  "We've received your messages. Please wait a few minutes before sending another.":
    [
      "Mesajlarınız alınıb. Yeni mesaj göndərmək üçün bir neçə dəqiqə gözləyin.",
      "Сообщения получены. Подождите несколько минут перед следующим обращением.",
    ],
  "We couldn't save your email. Please try again shortly.": [
    "E-poçt ünvanınızı saxlamaq mümkün olmadı. Bir az sonra yenidən cəhd edin.",
    "Не удалось сохранить адрес почты. Попробуйте немного позже.",
  ],
  "We couldn't save your message. Please try again shortly.": [
    "Mesajınızı saxlamaq mümkün olmadı. Bir az sonra yenidən cəhd edin.",
    "Не удалось сохранить сообщение. Попробуйте немного позже.",
  ],
  "Online payments are not available yet. Please try again later.": [
    "Onlayn ödənişlər hələ mövcud deyil. Daha sonra yenidən cəhd edin.",
    "Онлайн-оплата пока недоступна. Попробуйте позже.",
  ],
  "Please check your checkout details and try again.": [
    "Sifariş məlumatlarını yoxlayıb yenidən cəhd edin.",
    "Проверьте данные заказа и попробуйте ещё раз.",
  ],
  "Please add a product to your bag before checking out.": [
    "Sifarişdən əvvəl səbətə məhsul əlavə edin.",
    "Добавьте товар в корзину перед оформлением.",
  ],
  "One of your selected products is no longer available.": [
    "Seçdiyiniz məhsullardan biri artıq mövcud deyil.",
    "Один из выбранных товаров больше недоступен.",
  ],
  "Please review the quantities in your bag.": [
    "Səbətdəki məhsul saylarını yoxlayın.",
    "Проверьте количество товаров в корзине.",
  ],
  "Please enter a valid phone number.": [
    "Düzgün telefon nömrəsi daxil edin.",
    "Введите корректный номер телефона.",
  ],
  "Delivery is currently available to Baku, Azerbaijan.": [
    "Hazırda çatdırılma yalnız Bakıya mövcuddur.",
    "Сейчас доставка доступна только в Баку, Азербайджан.",
  ],
  "Please enter a valid Azerbaijan postal code.": [
    "Düzgün Azərbaycan poçt indeksi daxil edin.",
    "Введите корректный почтовый индекс Азербайджана.",
  ],
  "We couldn't find this payment.": [
    "Bu ödəniş tapılmadı.",
    "Этот платёж не найден.",
  ],
  "We couldn't find this payment. Please check the link.": [
    "Bu ödəniş tapılmadı. Keçidi yoxlayın.",
    "Платёж не найден. Проверьте ссылку.",
  ],
  "Please refresh checkout and try again.": [
    "Sifariş səhifəsini yeniləyib yenidən cəhd edin.",
    "Обновите оформление и попробуйте ещё раз.",
  ],
  "Please open checkout from our website.": [
    "Sifariş səhifəsini saytımızdan açın.",
    "Откройте оформление с нашего сайта.",
  ],
  "We couldn't start your payment. Please try again shortly.": [
    "Ödəniş başlatmaq mümkün olmadı. Bir az sonra yenidən cəhd edin.",
    "Не удалось начать оплату. Попробуйте немного позже.",
  ],
  "We couldn't verify your payment yet. Please try again shortly.": [
    "Ödənişinizi hələ təsdiqləmək mümkün olmadı. Bir az sonra yenidən cəhd edin.",
    "Пока не удалось проверить оплату. Попробуйте немного позже.",
  ],
  "The operation was aborted due to timeout": [
    "Gözləmə müddəti bitdi. Yenidən cəhd edin.",
    "Время ожидания истекло. Попробуйте ещё раз.",
  ],
  "Failed to fetch": [
    "Bağlantını yoxlayıb yenidən cəhd edin.",
    "Проверьте соединение и попробуйте ещё раз.",
  ],
};
