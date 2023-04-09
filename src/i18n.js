import i18next from "i18next";
import { initReactI18next } from 'react-i18next'
import { register } from 'timeago.js';

const localStorageLanguageValue = localStorage.getItem('language');
let language = 'en';

if (localStorageLanguageValue) {
    language = localStorageLanguageValue;
}

i18next.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                // Authentication
                'signUp': 'Sign Up',
                'login': 'Log In',
                'dontHaveAccount': "Don't have an account?",
                'haveAnAccount': 'Already have an account?',
                'myProfile': 'My Profile',
                'passwordMismatch': 'Passwords do not match',
                'authPageTitle1': 'What is',
                'authPageTitle2': 'Khazar Dictionary?',
                'authParagraph': "Khazar Dictionary is a student forum where Khazar students can socialize, organize events, and find answers to their questions.",

                // Authentication Form
                'username': 'Username',
                'displayName': 'Display Name',
                'khazarEmail': 'Email',
                'faculty': 'Faculty',
                'password': 'Password',
                'passwordRepeat': 'Repeat Password',
                'unauthorized': 'Please check your information and try again.',
                'languages': 'Languages',
                'english': 'English',
                'azerbaijani': 'Azerbaijani',
                'russian': 'Russian',
                'turkish': 'Turkish',
                'logout': 'Log Out',

                // Navigation
                'users_list': 'Users',
                'next': 'Next >',
                'previous': '< Previous',
                'loadFailure': 'Load failure',
                'userNotFound': 'User not found',

                // Profile
                'editProfile': 'Edit Profile',
                'deleteProfile': 'Delete Profile',
                'save': 'Save',
                'cancel': 'Cancel',
                'back': 'Back',
                'changeDisplayName': 'Change Display Name',

                // Post
                'createPost': 'Create Post',
                'postTitle': 'Post Title',
                'postContent': 'Post Content',
                'share': 'Share',
                'noPost': 'No posts',
                'loadOldPosts': 'Load older posts',
                'loadNewPosts': 'Load new posts',
                'modalDeletePostTitle': 'Delete Post',
                'modalDeletePostParagraph': 'Are you sure you want to delete this post?',
                'modalDeletePostAcceptButton': 'Accept',
                'like': 'like',
                'comment': 'comment',
                'comments': 'Comments',
                'sumbit': 'Share',
                'modalDeleteCommentParagraph': 'Are you sure you want to delete this comment?',

                // Account deletion
                'modalDeleteAccountParagraph': 'Are you sure you want to delete your account?',

                // Events
                'time': 'Time',
                'settings': 'Settings',
                'createEvent': 'Create Event',
                'eventName': 'Event Name',
                'eventDate': 'Event Date',
                'eventContent': 'Event Content',
                'selectParticipantsLimit': 'Select Participants Limit',
                'noLimit': 'No limit',

                // Categories
                'categories': 'Categories',
                'category': 'Category',
                'allPosts': 'All Posts',
                'questions': 'Questions',
                'schoolClubs': 'School Clubs',
                'dormitories': 'Dormitories',
                'houseMate': 'House Mate',
                'lostItems': 'Lost Items',
                'others': 'Others',
                'studentStore': 'Student Store',

                // Verification
                'verificationCodeTitle': 'Verification Code',
                'verificationCodeLabel': 'Enter your verification code',
                'verificationCodeError': 'Invalid verification code',

                // Errors
                'unkownFileType': 'Unknown file type',
                'categoryError': 'Category cannot be defined'
            }
        },
        tr: {
            translations: {
                // Authentication
                'signUp': 'Kaydol',
                'login': 'Giriş Yap',
                'dontHaveAccount': "Hesabınız yok mu?",
                'haveAnAccount': 'Zaten bir hesabınız var mı?',
                'myProfile': 'Profilim',
                'passwordMismatch': 'Şifreler eşleşmiyor',
                'authPageTitle1': 'Khazar Sözlük',
                'authPageTitle2': 'Nedir?',
                'authParagraph': "Khazar Sözlük, Khazar öğrencilerinin sosyalleşebileceği, etkinlikler düzenleyebileceği ve sorularına cevap bulabileceği bir öğrenci forumudur.",

                // Authentication Form
                'username': 'Kullanıcı Adı',
                'displayName': 'Görünen Ad',
                'khazarEmail': 'E-posta',
                'faculty': 'Fakülte',
                'password': 'Şifre',
                'passwordRepeat': 'Şifreyi Tekrarla',
                'unauthorized': 'Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.',
                'languages': 'Diller',
                'english': 'İngilizce',
                'azerbaijani': 'Azerbaycanca',
                'russian': 'Rusça',
                'turkish': 'Türkçe',
                'logout': 'Çıkış Yap',

                // Navigation
                'users_list': 'Kullanıcılar',
                'next': 'Sonraki >',
                'previous': '< Önceki',
                'loadFailure': 'Yükleme hatası',
                'userNotFound': 'Kullanıcı bulunamadı',

                // Profile
                'editProfile': 'Profili Düzenle',
                'deleteProfile': 'Profili Sil',
                'save': 'Kaydet',
                'cancel': 'İptal',
                'back': 'Geri',
                'changeDisplayName': 'Görünen Adı Değiştir',

                // Post
                'createPost': 'Gönderi Oluştur',
                'postTitle': 'Gönderi Başlığı',
                'postContent': 'Gönderi İçeriği',
                'share': 'Paylaş',
                'noPost': 'Gönderi yok',
                'loadOldPosts': 'Eski gönderileri yükle',
                'loadNewPosts': 'Yeni gönderileri yükle',
                'modalDeletePostTitle': 'Gönderiyi Sil',
                'modalDeletePostParagraph': 'Bu gönderiyi silmek istediğinizden emin misiniz?',
                'modalDeletePostAcceptButton': 'Kabul',
                'like': 'beğenme',
                'comment': 'yorum',
                'comments': 'Yorumlar',
                'sumbit': 'Paylaş',
                'modalDeleteCommentParagraph': 'Bu yorumu silmek istediğinizden emin misiniz?',

                // Account deletion
                'modalDeleteAccountParagraph': 'Hesabınızı silmek istediğinizden emin misiniz?',

                // Events
                'time': 'Zaman',
                'settings': 'Ayarlar',
                'createEvent': 'Etkinlik Oluştur',
                'eventName': 'Etkinlik Adı',
                'eventDate': 'Etkinlik Tarihi',
                'eventContent': 'Etkinlik İçeriği',
                'selectParticipantsLimit': 'Katılımcı Sınırı Seçin',
                'noLimit': 'Sınır yok',

                // Categories
                'categories': 'Kategoriler',
                'category': 'Kategori',
                'allPosts': 'Tüm Gönderiler',
                'questions': 'Sorular',
                'schoolClubs': 'Okul Kulüpleri',
                'dormitories': 'Yurtlar',
                'houseMate': 'Ev Arkadaşı',
                'lostItems': 'Kayıp Eşyalar',
                'others': 'Diğerleri',
                'studentStore': 'Öğrenci Mağazası',

                // Verification
                'verificationCodeTitle': 'Doğrulama Kodu',
                'verificationCodeLabel': 'Doğrulama kodunuzu girin',
                'verificationCodeError': 'Geçersiz doğrulama kodu',

                // Errors
                'unkownFileType': 'Bilinmeyen dosya türü',
                'categoryError': 'Kategori tanımlanamıyor'
            }
        },
        az: {
            translations: {
                // Authentication
                'signUp': 'Qeydiyyatdan keç',
                'login': 'Daxil ol',
                'dontHaveAccount': "Hesabın yoxdur?",
                'haveAnAccount': 'Hesabın var?',
                'myProfile': 'Mənim profilim',
                'passwordMismatch': 'Parollar eyni deyil',
                'authPageTitle1': 'Bu nədir',
                'authPageTitle2': 'Khazar Dictionary?',
                'authParagraph': "Khazar Dictionary, Khazar tələbələrinin sosiallaşa, təşkilatlarını təşkil edə və suallarına cavab tapa biləcəkləri bir tələbə forumudur.",

                // Authentication Form
                'username': 'İstifadəçi adı',
                'displayName': 'Görünən ad',
                'khazarEmail': 'E-poçt',
                'faculty': 'Fakültə',
                'password': 'Parol',
                'passwordRepeat': 'Parolu təkrarla',
                'unauthorized': 'Məlumatlarınızı yoxlayın və yenidən cəhd edin.',
                'languages': 'Dillər',
                'english': 'İngilis dili',
                'azerbaijani': 'Azərbaycan dili',
                'russian': 'Rus dili',
                'turkish': 'Türk dili',
                'logout': 'Çıxış',

                // Navigation
                'users_list': 'İstifadəçilər',
                'next': 'Növbəti >',
                'previous': '< Əvvəlki',
                'loadFailure': 'Yükləmə səhvi',
                'userNotFound': 'İstifadəçi tapılmadı',

                // Profile
                'editProfile': 'Profil düzəliş et',
                'deleteProfile': 'Profili sil',
                'save': 'Saxla',
                'cancel': 'Ləğv et',
                'back': 'Geri',
                'changeDisplayName': 'Görünən adı dəyişdir',

                // Post
                'createPost': 'Məqalə Yarat',
                'postTitle': 'Məqalə Başlığı',
                'postContent': 'Məqalə Məzmunu',
                'share': 'Paylaş',
                'noPost': 'Hər hansı bir göndəri yoxdur',
                'loadOldPosts': 'Köhnə göndəri yüklə',
                'loadNewPosts': 'Yeni göndəri yüklə',
                'modalDeletePostTitle': 'Göndəri sil',
                'modalDeletePostParagraph': 'Bu göndəri silmək istədiyinizdən əminsiniz?',
                'modalDeletePostAcceptButton': 'Təsdiq et',
                'like': 'bəyənmə',
                'comment': 'şərh',
                'comments': 'Şərhlər',
                'sumbit': 'Paylaş',
                'modalDeleteCommentParagraph': 'Bu şərhi silmək istədiyinizdən əminsiniz?',

                // Account deletion
                'modalDeleteAccountParagraph': 'Hesabınızı silmək istədiyinizdən əminsiniz?',

                // Events
                'time': 'Vaxt',
                'settings': 'Parametrlər',
                'createEvent': 'Tədbir yarat',
                'eventName': 'Tədbir adı',
                'eventDate': 'Tədbir tarixi',
                'eventContent': 'Tədbir məzmunu',
                'selectParticipantsLimit': 'İştirakçı sayı məhdudiyyəti seçin',
                'noLimit': 'Məhdudiyyət yoxdur',

                // Categories
                'categories': 'Kateqoriyalar',
                'category': 'Kateqoriya',
                'allPosts': 'Bütün göndərilər',
                'questions': 'Suallar',
                'schoolClubs': 'Məktəb Klubları',
                'dormitories': 'Yataqxanalar',
                'houseMate': 'Otaq Yoldaşı',
                'lostItems': 'İtalı eşyalar',
                'others': 'Digərləri',
                'studentStore': 'Tələbə Mağazası',

                // Verification
                'verificationCodeTitle': 'Təsdiq kodu',
                'verificationCodeLabel': 'Təsdiq kodunu daxil edin',
                'verificationCodeError': 'Yanlış təsdiq kodu',

                // Errors
                'unkownFileType': 'Bilinməyən fayl növü',
                'categoryError': 'Kateqoriya müəyyən edilə bilmir'
            }
        },
        ru: {
            translations: {
                // Authentication
                'signUp': 'Зарегистрироваться',
                'login': 'Войти',
                'dontHaveAccount': "Нет учетной записи?",
                'haveAnAccount': 'Есть учетная запись?',
                'myProfile': 'Мой профиль',
                'passwordMismatch': 'Пароли не совпадают',
                'authPageTitle1': 'Что такое',
                'authPageTitle2': 'Khazar Sözlük?',
                'authParagraph': "Khazar Sözlük - это форум для студентов Хазар, где они могут общаться, организовывать мероприятия и находить ответы на свои вопросы.",

                // Authentication Form
                'username': 'Имя пользователя',
                'displayName': 'Отображаемое имя',
                'khazarEmail': 'Электронная почта',
                'faculty': 'Факультет',
                'password': 'Пароль',
                'passwordRepeat': 'Повторите пароль',
                'unauthorized': 'Пожалуйста, проверьте свои данные и повторите попытку.',
                'languages': 'Языки',
                'english': 'Английский',
                'azerbaijani': 'Азербайджанский',
                'russian': 'Русский',
                'turkish': 'Турецкий',
                'logout': 'Выйти',

                // Navigation
                'users_list': 'Пользователи',
                'next': 'Следующий >',
                'previous': '< Предыдущий',
                'loadFailure': 'Ошибка загрузки',
                'userNotFound': 'Пользователь не найден',

                // Profile
                'editProfile': 'Редактировать профиль',
                'deleteProfile': 'Удалить профиль',
                'save': 'Сохранить',
                'cancel': 'Отмена',
                'back': 'Назад',
                'changeDisplayName': 'Изменить отображаемое имя',

                // Post
                'createPost': 'Создать пост',
                'postTitle': 'Заголовок поста',
                'postContent': 'Содержание поста',
                'share': 'Поделиться',
                'noPost': 'Нет поста',
                'loadOldPosts': 'Загрузить старые посты',
                'loadNewPosts': 'Загрузить новые посты',
                'modalDeletePostTitle': 'Удалить пост',
                'modalDeletePostParagraph': 'Вы уверены, что хотите удалить этот пост?',
                'modalDeletePostAcceptButton': 'Подтвердить',
                'like': 'лайков',
                'comment': 'комментариев',
                'comments': 'Комментарии',
                'sumbit': 'Делиться',
                'modalDeleteCommentParagraph': 'Вы уверенны, что хотите удалить этот комментарий?',

                // Account deletion
                'modalDeleteAccountParagraph': 'Вы уверены, что хотите удалить свою учетную запись?',

                // Events
                'time': 'Время',
                'settings': 'Настройки',
                'createEvent': 'Создать событие',
                'eventName': 'Название события',
                'eventDate': 'Дата события',
                'eventContent': 'Содержание события',
                'selectParticipantsLimit': 'Выберите ограничение участников',
                'noLimit': 'Без ограничений',

                // Categories
                'categories': 'Категории',
                'category': 'Категория',
                'allPosts': 'Все посты',
                'questions': 'Вопросы',
                'schoolClubs': 'Школьные клубы',
                'dormitories': 'Общежития',
                'houseMate': 'Сосед по комнате',
                'lostItems': 'Потерянные предметы',
                'others': 'Другие',
                'studentStore': 'Магазин для студентов',

                // Verification
                'verificationCodeTitle': 'Код подтверждения',
                'verificationCodeLabel': 'Введите код подтверждения',
                'verificationCodeError': 'Неверный код подтверждения',

                // Errors
                'unkownFileType': 'Неизвестный тип файла',
                'categoryError': 'Категория не может быть определена'
            }
        },
    },
    fallbackLng: language,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeperator: false,
    interpolation: {
        escapeValue: false,
        formatSeperator: ','
    },
    react: {
        wait: true
    }
});

const timeagoTR = (number, index) => {
    return [
        ['az önce', 'şimdi'],
        ['%s saniye önce', '%s saniye içinde'],
        ['1 dakika önce', '1 dakika içinde'],
        ['%s dakika önce', '%s dakika içinde'],
        ['1 saat önce', '1 saat içinde'],
        ['%s saat önce', '%s saat içinde'],
        ['1 gün önce', '1 gün içinde'],
        ['%s gün önce', '%s gün içinde'],
        ['1 hafta önce', '1 hafta içinde'],
        ['%s hafta önce', '%s hafta içinde'],
        ['1 ay önce', '1 ay içinde'],
        ['%s ay önce', '%s ay içinde'],
        ['1 yıl önce', '1 yıl içinde'],
        ['%s yıl önce', '%s yıl içinde'],
    ][index];
}

const timeagoAZ = (number, index) => {
    return [
        ['indi', 'indi'],
        ['%s saniyə əvvəl', '%s saniyə sonra'],
        ['1 dəqiqə əvvəl', '1 dəqiqə sonra'],
        ['%s dəqiqə əvvəl', '%s dəqiqə sonra'],
        ['1 saat əvvəl', '1 saat sonra'],
        ['%s saat əvvəl', '%s saat sonra'],
        ['1 gün əvvəl', '1 gün sonra'],
        ['%s gün əvvəl', '%s gün sonra'],
        ['1 həftə əvvəl', '1 həftə sonra'],
        ['%s həftə əvvəl', '%s həftə sonra'],
        ['1 ay əvvəl', '1 ay sonra'],
        ['%s ay əvvəl', '%s ay sonra'],
        ['1 il əvvəl', '1 il sonra'],
        ['%s il əvvəl', '%s il sonra'],
    ][index];
}

const timeagoRU = (number, index) => {
    return [
        ['только что', 'сейчас'],
        ['%s секунд назад', 'через %s секунд'],
        ['минуту назад', 'через минуту'],
        ['%s минут назад', 'через %s минут'],
        ['час назад', 'через час'],
        ['%s часов назад', 'через %s часов'],
        ['день назад', 'через день'],
        ['%s дней назад', 'через %s дней'],
        ['неделю назад', 'через неделю'],
        ['%s недель назад', 'через %s недель'],
        ['месяц назад', 'через месяц'],
        ['%s месяцев назад', 'через %s месяцев'],
        ['год назад', 'через год'],
        ['%s лет назад', 'через %s лет'],
    ][index];
}



register('tr', timeagoTR);
register('az', timeagoAZ);
register('ru', timeagoRU);

export default i18next;