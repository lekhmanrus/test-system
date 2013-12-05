angular.module('test.languages', ['l10n', 'l10n-tools']).config(['l10nProvider', function(l10n){
  l10n.add('uk-UA', {
    person: {
      str: 'Тестовий рядок'
    }
  });
  l10n.add('ru-RU', {
    person: {
      str: 'Тестовая строка'
    }
  });
  l10n.add('en-US', {
    person: {
      str: 'Test string'
    }
  });
}]);