<a name="ApiClient"></a>
#class: ApiClient
**Members**

* [class: ApiClient](#ApiClient)
  * [new ApiClient(options)](#new_ApiClient)
  * [apiClient.url(endpoint)](#ApiClient#url)
  * [apiClient.request(method, endpoint)](#ApiClient#request)
  * [ApiClient.get|post|put|delete(endpoint, options, cb)](#ApiClient.get|post|put|delete)

<a name="new_ApiClient"></a>
##new ApiClient(options)
Constructs API client.

Usage:

```js
var Client = require('prostore.api-client');

var client = new Client({
  userId: '54b4c1d3bab9e22843c99ea4',
  url: 'https://example.store',
  privateToken: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
});
```

**Params**

- options `object` - options  
  - url `string` - store URL including schema  
  - userId `string` - ProStore user id (12-byte BSON ObjectId, hex-encoded)  
  - privateToken `string` - secret token for authentication
  (must be obtained via API login)  

<a name="ApiClient#url"></a>
##apiClient.url(endpoint)
Constructs endpoint URL.

**Params**

- endpoint `string` - API endpoint (e.g. `admin/products`)  

**Returns**: `string` - URL (e.g. `https://example.store/api/admin/products`)  
<a name="ApiClient#request"></a>
##apiClient.request(method, endpoint)
Returns new [request](https://github.com/request/request) object
with specified `method`, `endpoint` (converted to URL) and auth headers
as defaults.

You use it then to instantiate a request (see below).

Example file upload:

```js
var request = client.request('post', 'admin/storage/index.html')
var r = request({ json: false }, function(err, resp, body) {
  // handle server response as you see fit
});
var form = r.form();
form.append('file', fs.createReadStream('path/to/file'));
```

This is a low-level object, which is particularly useful for uploading files.
For simpler cases (e.g. sending-receiving JSON requests) use `get`, `post`,
`put` and `delete` methods.

**Params**

- method `string` - HTTP method  
- endpoint `string` - API endpoint  

**Returns**: `object` - request object  
<a name="ApiClient.get|post|put|delete"></a>
##ApiClient.get|post|put|delete(endpoint, options, cb)
Performs a request to specified API endpoint.

Usage:

```js
client.get('echo', function(err, data) { });

client.post('echo', {
  data: 'Hello!'
}, function(err, data) { });
```

**Params**

- endpoint `string` - API endpoint  
- options `object` - options for `request`  
- cb `function` - callback `function(err, data)`  

