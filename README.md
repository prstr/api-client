# ProStore API Client

## Usage

Obtain private token.

Instantiate a client:

```js
var Client = require('prostore.api-client');

var client = new Client({
  userId: '54b4c1d3bab9e22843c99ea4',
  url: 'https://example.store',
  privateToken: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
});
```

Perform API requests:

```js
client.get('echo', function(err, data) { });

client.post('echo', {
  data: 'Hello!'
}, function(err, data) { });
```

## Advanced usage
 
Example file upload:

```js
var request = client.request('post', 'admin/storage/index.html')
var r = request({ json: false }, function(err, resp, body) {
  // handle server response as you see fit
});
var form = r.form();
form.append('file', fs.createReadStream('path/to/file'));
```
