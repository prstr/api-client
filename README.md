# API Client

Библиотека для взаимодействия с API системы [ПроСтор](http://prostore.business/). 

## Использование

1.  Получите приватный токен пользователя (см. [ProStore CLI](https://github.com/prstr/cli#login))

2.  Создайте клиент:

    ```js
    var Client = require('prostore.api-client');
    
    var client = new Client({
      userId: '54b4c1d3bab9e22843c99ea4',
      url: 'https://example.store',
      privateToken: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    });
    ```

3. Выполняйте запросы с помощью методов `get`, `post`, `put` или `delete`:

    ```js
    client.get('echo', function(err, data) { });
    
    client.post('echo', {
      data: 'Hello!'
    }, function(err, data) { });
    ```

См. исходные коды для получения более подробной информации.
