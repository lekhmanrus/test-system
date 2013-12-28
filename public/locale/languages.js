angular.module('test.languages', ['l10n', 'l10n-tools']).config(['l10nProvider', function(l10n){
  l10n.add('uk-UA', {
    main: {
      'btn-home': 'Головна',
      'btn-about': 'Про нас',
      'btn-contact': 'Контакти',
      ua: 'Українська',
      ru: 'Російська',
      us: 'Англійська',
      signout: 'Вихід',
      test: 'Тести',
      'btn-about-text': 'DHARMA - команда професійних програмістів, що займаються розробкою програмних продуктів для багатьох сфер діяльності. Серед них продукти різної складності: від невеликих прикладних програм до складних програмних комплексів і клієнт-серверних додатків. За допомогою наших знань, ми хочемо зробити Ваше життя комфортнішим, а бізнес - прибутковішим. Довірте нам рішення своїх IT-задач, і ми розробимо програму Вашого майбутнього!'
    },
    login: {
      auth: 'Будь ласка, авторизуйтесь у системі',
      signin: 'Логін',
      pass: 'Пароль',
      register: 'Реєстрація',
      'btn-login': 'Вхід',
      sub1: 'Тest system',
      text1: 'Це нова система тестування знань яка відповідає усім вимогам користувачів.',
      sub2: 'Надійність',
      text2: 'Тепер ви дійсно можете не хвилюватися за свої дані, адже застосунок має велику степінь надійності та відмовостійкості.',
      sub3: 'Безпечність',
      text3: 'Програмний продукт повністю захищений від випадкового або навмисного втручання в роботу системи або спроб руйнування її компонентів.',
      sub4: 'Кросплатформенність',
      text4: 'Даний програмний продукт є кросплатформенним, що дозволяє використовувати його на ПК з різними ОС, а також на мобільних пристроях.',
      sub5: 'Швидкодія',
      text5: 'Програмний продукт не потребує для своєї роботи великої кількості апаратних ресурсів, що дозволяє використовувати його навіть на застарілому обладнанні.',
      sub6: 'Ліцензоване ПЗ',
      text6: 'Користувач отримує програмне забезпечення разом із ліцензією, яка надає йому право використовувати програмний продукт за умови виконання положень ліцензування.'
    },
    registration:  {
      signin: 'Логін',
      pass: 'Пароль',
      'pass-confirm': 'Підтвердження',
      name: 'І’мя',
      surname: 'Прізвище',
      patronymic: 'По батькові',
      'e-mail': 'E-mail',
      'signin-help': 'І’мя користувача повинно містити не менш ніж 6 символів',
      'pass-help': 'Пароль повинен містити не менш ніж 6 символів',
      'pass-confirm-help': 'Введіть пароль ще раз',
      'name-help': 'І’мя',
      'surname-help': 'Прізвище',
      'patronymic-help': 'По батькові',
      'e-mail-help': 'E-mail адреса',
      register: 'Зареєструватись'
    },
    about:  {
      'header-big': 'Про',
      'header-small': 'нас',
      info: ''
    }
  });
  l10n.add('ru-RU', {
    main: {
      'btn-home': 'Главная',
      'btn-about': 'О нас',
      'btn-contact': 'Контакты',
      ua: 'Украинский',
      ru: 'Русский',
      us: 'Английский',
      signout: 'Выход',
      test: 'Тесты',
      'btn-about-text': 'DHARMA - команда профессиональных программистов, занимающихся разработкой программных продуктов для многих сфер деятельности. Среди них продукты различной сложности: от небольших прикладных программ до сложных программных комплексов и клиент-серверных приложений. С помощью наших знаний, мы хотим сделать Вашу жизнь комфортнее, а бизнес – прибыльнее. Доверьте нам решение своих IT-задач, и мы разработаем программу Вашего будущего!'
    },
    login: {
      auth: 'Пожалуйста, авторизируйтесь в системе',
      signin: 'Логин',
      pass: 'Пароль',
      register: 'Регистрация',
      'btn-login': 'Войти',
      sub1: 'Тest system',
      text1: 'Это новая система тестирования знаний которая отвечает всем требованиям пользователей.',
      sub2: 'Надежность',
      text2: 'Теперь вы действительно можете не волноваться за свои данные, ведь приложение имеет большую степень надежности и отказоустойчивости.',
      sub3: 'Безопасность',
      text3: 'Программный продукт полностью защищен от случайного или преднамеренного вмешательства в работу системы или попыток разрушения ее компонентов.',
      sub4: 'Кросcплатформенность',
      text4: 'Данный программный продукт является кроссплатформенным, что позволяет использовать его на ПК с различными ОС, а также на мобильных устройствах.',
      sub5: 'Быстродействие',
      text5: 'Программный продукт не требует для своей работы большого количества аппаратных ресурсов, что позволяет использовать его даже на устаревшем оборудовании.',
      sub6: 'Лицензионное ПО',
      text6: 'Пользователь получает программное обеспечение вместе с лицензией, которая дает ему право использовать программный продукт при условии выполнения положений лицензирования.'
    },
    registration:  {
      signin: 'Логин',
      pass: 'Пароль',
      'pass-confirm': 'Подтверждение',
      name: 'Имя',
      surname: 'Фамилия',
      patronymic: 'Отчество',
      'e-mail': 'E-mail',
      'signin-help': 'Имя пользователя должно содержать не меньше 6 символов',
      'pass-help': 'Пароль должен содержать не менее 6 символов',
      'pass-confirm-help': 'Введите пароль еще раз',
      'name-help': 'Имя',
      'surname-help': 'Фамилия',
      'patronymic-help': 'Отчество',
      'e-mail-help': 'E-mail адресс',
      register: 'Зарегистрироваться'
    },
    about:  {
      'header-big': 'О',
      'header-small': 'нас',
      info: ''
    }
  });
  l10n.add('en-US', {
    main: {
      'btn-home': 'Home',
      'btn-about': 'About',
      'btn-contact': 'Contacts',
      ua: 'Ukrainian',
      ru: 'Russian',
      us: 'English',
      signout: 'Logout',
      test: 'Test',
      'btn-about-text': 'DHARMA - a team of professional programmers developing software for many spheres of activity. Among them are products of varying complexity, from small applications to complex software systems and client-server applications. With our knowledge, we want to make your life more comfortable, and business - profitable. Entrust us with their IT-tasks, and we will develop a program for your future!'
    },
    login: {
      auth: 'Please sign in',
      signin: 'Login',
      pass: 'Password',
      register: 'Registration',
      'btn-login': 'Sign in',
      sub1: 'Тest system',
      text1: 'This is a new testing that meets all the requirements of users.',
      sub2: 'Reliability',
      text2: 'Now you really can not worry about your data, because the application has a high degree of reliability and fault tolerance.',
      sub3: 'Security',
      text3: 'The software is fully protected from accidental or deliberate interference with the operation of the system or its components attempt to destruction.',
      sub4: 'Cross-platform',
      text4: 'This software is cross-platform, it can be used on PCs with different operating systems, as well as on mobile devices.',
      sub5: 'Performance',
      text5: 'The software does not need to have been running a lot of hardware resources, it can be used even on older hardware.',
      sub6: 'License software',
      text6: 'The user receives the software with a license that allows him to use the software subject to the provisions of the license.'
    },
    registration:  {
      signin: 'Login',
      pass: 'Password',
      'pass-confirm': 'Confirm password',
      name: 'Name',
      surname: 'Surname',
      patronymic: 'Patronymic',
      'e-mail': 'E-mail',
      'signin-help': 'Username must be 6 or more characters',
      'pass-help': 'Password must be 6 or more characters',
      'pass-confirm-help': 'Retype password',
      'name-help': 'First name',
      'surname-help': 'Second name',
      'patronymic-help': 'Patronymic',
      'e-mail-help': 'E-mail address',
      register: 'Register'
    },
    about:  {
      'header-big': 'About',
      'header-small': 'us',
      info: ''
    }
  });
}]);