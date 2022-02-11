## ⚡ Routes

| Status | Method | Endpoint | Description |
|-|-|-|-|
| ❌ | `GET` | `/` | Redirects to a pre-configured URL. |
| ✅ | `GET` | `/:code` | Performs a redirect if found or redirects to a 404 page. |
| ❌ | `GET` | `/api` | Responds with API version details. |
| ✅ | `POST` | `/api/auth/login` | Responds with a token. |
| ✅ | `DELETE` | `/api/auth/logout` | Blacklists the token to prevent usage. |
| ✅ | `GET` | `/api/codes` | List out all codes with pagination. |
| ✅ | `GET` | `/api/codes/:code` | Returns full API response on a code. |
| ✅ | `POST` | `/api/codes` | Create a new short code. |
| ✅ | `DELETE` | `/api/codes` | Delete a short code. |

## 💡 Route Schema
```js
{
    code: "abcd",  // identifier
    tags: ["official", "interval"], // to make it easy to search
    links: [
        {
            title: "Vasanth Developer", // (optional) shown on when multiple links exist
            icon: "https://vasanthdeveloper.com/favicon.ico",
            image: "https://vasanthdeveloper.com/favicon.ico",
            url: "https://vasanthdeveloper.com" // (required) link to which to redirect
        },
        {
            title: "Try Outs",
            icon: "https://try.vsnth.dev/favicon.ico",
            image: "https://try.vsnth.dev/favicon.ico",
            url: "https://try.vsnth.dev"
        }
    ]
}
```
