angular.module('test.languages', ['l10n', 'l10n-tools']).config(['l10nProvider', function(l10n){
  l10n.add('uk-UA', {
    login: {
      auth: 'Будь ласка, авторизуйтесь у системі',
      log: 'Логін',
      pass: 'Пароль',
      'btn-login': 'Вхід',
      'btn-home': 'Головна',
      'btn-about': 'Про нас',
      'btn-contact': 'Контакти',
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

    }
  });
  l10n.add('ru-RU', {
    login: {
      auth: 'Пожалуйста, авторизируйтесь в системе',
      log: 'Логин',
      pass: 'Пароль',
      'btn-login': 'Войти',
      'btn-home': 'Главная',
      'btn-about': 'О нас',
      'btn-contact': 'Контакти',
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
    }
  });
  l10n.add('en-US', {
    login: {
      auth: 'Please sign in',
      log: 'Login',
      pass: 'Password',
      'btn-login': 'Sign in',
      'btn-about': 'About',
      'btn-contact': 'Contacts',
       sub1: 'Тest system',
      text1: 'This is a new testing ыныеуь that meets all the requirements of users.',
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
      
    }
  });
}]);