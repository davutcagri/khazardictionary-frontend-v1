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
                'forgotPassword': 'Forgot password?',
                'unauthorized': 'Please check your information and try again.',
                'authPageTitle1': 'What is',
                'authPageTitle2': 'Khazar Dictionary?',
                'authParagraph': 'Khazar Dictionary is a student forum where Khazar students can socialize, organize events, and find answers to their questions.',
                'username': 'Username',
                'displayName': 'Display Name',
                'khazarEmail': 'Email',
                'faculty': 'Faculty',
                'password': 'Password',
                'passwordRepeat': 'Repeat Password',
                'passwordMismatch': 'Passwords do not match',

                // Navigation
                'myProfile': 'My Profile',
                'logout': 'Log Out',
                'adminPanel': 'Admin Panel',

                // User Actions
                'users_list': 'Users',
                'editProfile': 'Edit Profile',
                'deleteProfile': 'Delete Profile',
                'save': 'Save',
                'cancel': 'Cancel',
                'changeDisplayName': 'Change Display Name',
                'changeImage': 'Change Profile Image',
                'deleteAccount': 'Delete Account',
                'deleteAccountParagraph': 'Are you sure you want to delete your account?',

                // Language
                'languages': 'Languages',
                'english': 'English',
                'azerbaijani': 'Azerbaijani',
                'russian': 'Russian',
                'turkish': 'Turkish',

                // Pagination
                'next': 'Next >',
                'previous': '< Previous',

                // Error Messages
                'loadFailure': 'Load failure',
                'userNotFound': 'User not found',
                'postNotFound': 'Post not found',

                // Posts
                'createPost': 'Create Post',
                'postTitle': 'Post Title',
                'postContent': 'Post Content',
                'share': 'Share',
                'noPost': 'No posts',
                'loadOldPosts': 'Load older posts',
                'loadNewPosts': 'Load new posts',
                'deletePost': 'Delete Post',
                'deletePostParagraph': 'Are you sure you want to delete this post?',
                'accept': 'Accept',
                'like': 'like',
                'comment': 'comment',
                'comments': 'Comments',
                'sumbit': 'Submit',
                'deleteComment': 'Delete Comment',
                'deleteCommentParagraph': 'Are you sure you want to delete this comment?',

                // Messaging
                'messages': 'Messages',

                // Settings
                'settings': 'Settings',

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
                'code': 'Code',
                'verificationCodeTitle': 'Verification Code',
                'verificationCodeLabel': 'Enter your verification code',
                'verificationCodeError': 'Invalid verification code',

                // Terms of Use
                'termsOfUseCheck1': 'I have read and accept the Terms of Use.',
                'termsOfUseCheck2': '(Terms of Use)'

            }
        },
        tr: {
            translations: {

            }
        },
        az: {
            translations: {

            }
        },
        ru: {
            translations: {

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