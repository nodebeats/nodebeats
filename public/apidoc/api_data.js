define({ "api": [
  {
    "type": "patch",
    "url": "/api/access/:apiAccessId",
    "title": "Deletes existing API Route Access Information",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "deleteApiAccessInfo",
    "group": "API_Access_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "apiAccessId",
            "description": "<p>Object ID of the API Access Route data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"apiAccessId\": \"57f33e6fb01d0b1b04a2e0ed\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Deletes existing API Route access information from the system.</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\ncurl \\\n-v \\\n-X PATCH  \\\nhttp://localhost:3000/api/access/57f33e6fb01d0b1b04a2e0ed \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTU2NTg3OCwiZXhwIjoxNDc1NjUyMjc4LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.D5FJ7i6ycZBhYc-kHni6WnjCOGCEZBMsZu9yeCajO_bhVzH-muqUvZ6K5072vwO7LoKB0eTKa1friGngrpRJ9w\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Route api for api access management deleted successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Route api for api access management deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/apiaccess.management.route.js",
    "groupTitle": "API_Access_Management"
  },
  {
    "type": "get",
    "url": "/api/access/",
    "title": "Get API Route Access Management list",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getAllApiAccess",
    "group": "API_Access_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>whether to get data with active bit true or false, if true, then returns data list with active bit set to true only</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "apiroute",
            "description": "<p>Filter the list of API access routes  and display only those matching specified api route</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"active\": true\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n  \"apiroute\": \"/api/roles\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the API Route Access Management list, if exists, else return empty array</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\ncurl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/access\" \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTY0NjA0NiwiZXhwIjoxNDc1NzMyNDQ2LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.y0U0FeQJRlXIRX0iTUZSa1WrqLfIAqsun25pfF0rtio82o5engk17snLBkRzcah187sGPcmWfZcDSLL_Uu0V8w\"",
        "type": "curl"
      },
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/access\" \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTY0NjA0NiwiZXhwIjoxNDc1NzMyNDQ2LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.y0U0FeQJRlXIRX0iTUZSa1WrqLfIAqsun25pfF0rtio82o5engk17snLBkRzcah187sGPcmWfZcDSLL_Uu0V8w\" \\\n--data-urlencode \"active=true\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of API Route access data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roleName",
            "description": "<p>title of the role entered by the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "routeApi",
            "description": "<p>API route access url.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>active bit status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n       {\n           \"_id\": \"57f33e6fb01d0b1b04a2e0ed\",\n           \"roleName\": \"writer,admin\",\n           \"routeApi\": \"/api/cloudinary\",\n           \"active\": true\n       }\n   ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Route api not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Route api not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/apiaccess.management.route.js",
    "groupTitle": "API_Access_Management"
  },
  {
    "type": "get",
    "url": "/api/access/:apiAccessId",
    "title": "Get API Route Access Management information object by ID",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getApiAccessById",
    "group": "API_Access_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "apiAccessId",
            "description": "<p>Object ID of the API Access Route data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"apiAccessId\": \"57f33e6fb01d0b1b04a2e0ed\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the API Route Access Management information object by ID, if exists, else return empty object</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\ncurl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/access/57f33e6fb01d0b1b04a2e0ed\" \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTY0NjA0NiwiZXhwIjoxNDc1NzMyNDQ2LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.y0U0FeQJRlXIRX0iTUZSa1WrqLfIAqsun25pfF0rtio82o5engk17snLBkRzcah187sGPcmWfZcDSLL_Uu0V8w\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of API Route access data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roleName",
            "description": "<p>title of the role entered by the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "routeApi",
            "description": "<p>API route access url.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>active bit status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n           \"_id\": \"57f33e6fb01d0b1b04a2e0ed\",\n           \"roleName\": \"writer,admin\",\n           \"routeApi\": \"/api/cloudinary\",\n           \"active\": true\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Route api not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Route api not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/apiaccess.management.route.js",
    "groupTitle": "API_Access_Management"
  },
  {
    "type": "post",
    "url": "/api/access/",
    "title": "Post API Route Access Information",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postApiAccessInfo",
    "group": "API_Access_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "roleName",
            "description": "<p>Mandatory title of the role.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "routeApi",
            "description": "<p>Mandatory Api Route URL.</p>"
          }
        ]
      }
    },
    "description": "<p>saves API Route access information to the database so that users with specified roles only can access the API route.</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\ncurl \\\n-v \\\n-X POST  \\\nhttp://localhost:3000/api/access/ \\\n-H 'Content-Type: application/json' \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTU2NTg3OCwiZXhwIjoxNDc1NjUyMjc4LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.D5FJ7i6ycZBhYc-kHni6WnjCOGCEZBMsZu9yeCajO_bhVzH-muqUvZ6K5072vwO7LoKB0eTKa1friGngrpRJ9w\" \\\n-d '{\"roleName\": \"agent\", \"routeApi\": \"/api/teammember\",  \"active\": true}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Route api for api access management saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Route api for api access management saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Validation errors due to not entering values for roleName and routeApi</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Route api with same api route already exists</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\":[\n                 {\n                      \"param\": \"routeApi\",\n                      \"msg\": \"Route api is required\"\n                  },\n                  {\n                      \"param\": \"roleName\",\n                      \"msg\": \"Role is required\"\n                  }\n            ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"Route api with same api route already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/apiaccess.management.route.js",
    "groupTitle": "API_Access_Management"
  },
  {
    "type": "put",
    "url": "/api/access/:apiAccessId",
    "title": "Updates existing API Route Access Information",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateApiAccessInfo",
    "group": "API_Access_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "apiAccessId",
            "description": "<p>Object ID of the API Access Route data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"apiAccessId\": \"57f33e6fb01d0b1b04a2e0ed\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates existing API Route access information to the database so that users with specified roles only can access the API route.</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\ncurl \\\n-v \\\n-X PUT  \\\nhttp://localhost:3000/api/access/57f33e6fb01d0b1b04a2e0ed \\\n-H 'Content-Type: application/json' \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTU2NTg3OCwiZXhwIjoxNDc1NjUyMjc4LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.D5FJ7i6ycZBhYc-kHni6WnjCOGCEZBMsZu9yeCajO_bhVzH-muqUvZ6K5072vwO7LoKB0eTKa1friGngrpRJ9w\" \\\n-d '{\"roleName\": \"agent,accountant\", \"routeApi\": \"/api/testimonial33\",  \"active\": true}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Route api for api access management updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Route api for api access management updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Validation errors due to not entering values for roleName and routeApi</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Route api with same api route already exists</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\":[\n                 {\n                      \"param\": \"routeApi\",\n                      \"msg\": \"Route api is required\"\n                  },\n                  {\n                      \"param\": \"roleName\",\n                      \"msg\": \"Role is required\"\n                  }\n            ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"Route api with same api route already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/apiaccess.management.route.js",
    "groupTitle": "API_Access_Management"
  },
  {
    "type": "delete",
    "url": "/api/authtoken/",
    "title": "Deletes all existing authorization token data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "deleteAllAuthorizationToken",
    "group": "Authorization_Token_Management",
    "description": "<p>Deletes all existing authorization token data</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\n curl \\\n-v \\\n-X DELETE  \\\n\"http://localhost:3000/api/authtoken/\" \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3Njk0NjIxNywiZXhwIjoxNDc3MDMyNjE3LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.sV68ixmYS_u5Rcti0ahOj9UKThatqDgw9BTA-75BUTnpUTZa5DjVvOhv0UwjXSYCDqfo7VMT2bwNg52M2aXJZg\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>All authorization tokens deleted successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"All authorization tokens deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/authorization.token.management.route.js",
    "groupTitle": "Authorization_Token_Management"
  },
  {
    "type": "delete",
    "url": "/api/authtoken/:authorizationTokenId",
    "title": "Deletes existing authorization token data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "deleteAuthorizationToken",
    "group": "Authorization_Token_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authorizationTokenId",
            "description": "<p>object id of the authorization token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"authorizationTokenId\": \"58085e79a3e13932aa2b7bc2\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Deletes existing authorization token data</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n- X DELETE  \\\n\"http://localhost:3000/api/authtoken/58085e79a3e13932aa2b7bc2\" \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3Njk0MzQ4MSwiZXhwIjoxNDc3MDI5ODgxLCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.nrc0dvEIr8TklRdqw9JL2pIMEAQ166z8Y4-vVZzDLdnGh3gr_lQy4C-4XOkNbtoX8qC4cP0ycH7GNigu0hrPQw\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Authorization token deleted successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Authorization token deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/authorization.token.management.route.js",
    "groupTitle": "Authorization_Token_Management"
  },
  {
    "type": "get",
    "url": "/api/authtoken/",
    "title": "Get authorization token list",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getAllAuthorizationTokens",
    "group": "Authorization_Token_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>object id of the user to filter authorization tokens so that tokens associated with only that user will be listed</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"userId\": \"58085e79a3e13932aa2b7bc2\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the authorization token list, if exists, else return empty array</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\ncurl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/authtoken\" \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTY0NjA0NiwiZXhwIjoxNDc1NzMyNDQ2LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.y0U0FeQJRlXIRX0iTUZSa1WrqLfIAqsun25pfF0rtio82o5engk17snLBkRzcah187sGPcmWfZcDSLL_Uu0V8w\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of authorization token data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>object id of the associated user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ipAddress",
            "description": "<p>IP address of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "browser",
            "description": "<p>browser from which request is made.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userAgent",
            "description": "<p>userAgent of the user's browser.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "authorizationToken",
            "description": "<p>authorization token.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "addedOn",
            "description": "<p>date of the record creation.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "expiresOn",
            "description": "<p>expiry date of the authorization token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n   {\n       \"_id\": \"58085e79a3e13932aa2b7bc2\",\n       \"userId\": \"57d1755efe6feb6e34a85cda\",\n       \"ipAddress\": \"192.168.10.6\",\n       \"browser\": \"Chrome\",\n       \"userAgent\": \"Chrome 47.0.2526 / Linux 0.0.0\",\n       \"authorizationToken\": \"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3Njk0MzQ4MSwiZXhwIjoxNDc3MDI5ODgxLCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.nrc0dvEIr8TklRdqw9JL2pIMEAQ166z8Y4-vVZzDLdnGh3gr_lQy4C-4XOkNbtoX8qC4cP0ycH7GNigu0hrPQw\",\n       \"addedOn\": \"2016-10-20T06:04:41.907Z\",\n       \"expiresOn\": \"2016-10-21T06:04:41.898Z\"\n   }\n   ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Authorization token not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Authorization token not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/authorization.token.management.route.js",
    "groupTitle": "Authorization_Token_Management"
  },
  {
    "type": "get",
    "url": "/api/authtoken/:authorizationTokenId",
    "title": "Get authorization token information object",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getAuthorizationTokenInfoById",
    "group": "Authorization_Token_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authorizationTokenId",
            "description": "<p>object id of the authorization token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"authorizationTokenId\": \"58085e79a3e13932aa2b7bc2\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the authorization token information object , if exists, else return not found message</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\ncurl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/authtoken/58085e79a3e13932aa2b7bc2\" \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTY0NjA0NiwiZXhwIjoxNDc1NzMyNDQ2LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.y0U0FeQJRlXIRX0iTUZSa1WrqLfIAqsun25pfF0rtio82o5engk17snLBkRzcah187sGPcmWfZcDSLL_Uu0V8w\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of authorization token data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>object id of the associated user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ipAddress",
            "description": "<p>IP address of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "browser",
            "description": "<p>browser from which request is made.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userAgent",
            "description": "<p>userAgent of the user's browser.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "authorizationToken",
            "description": "<p>authorization token.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "addedOn",
            "description": "<p>date of the record creation.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "expiresOn",
            "description": "<p>expiry date of the authorization token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n   {\n       \"_id\": \"58085e79a3e13932aa2b7bc2\",\n       \"userId\": \"57d1755efe6feb6e34a85cda\",\n       \"ipAddress\": \"192.168.10.6\",\n       \"browser\": \"Chrome\",\n       \"userAgent\": \"Chrome 47.0.2526 / Linux 0.0.0\",\n       \"authorizationToken\": \"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3Njk0MzQ4MSwiZXhwIjoxNDc3MDI5ODgxLCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.nrc0dvEIr8TklRdqw9JL2pIMEAQ166z8Y4-vVZzDLdnGh3gr_lQy4C-4XOkNbtoX8qC4cP0ycH7GNigu0hrPQw\",\n       \"addedOn\": \"2016-10-20T06:04:41.907Z\",\n       \"expiresOn\": \"2016-10-21T06:04:41.898Z\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Authorization token not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Authorization token not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/authorization.token.management.route.js",
    "groupTitle": "Authorization_Token_Management"
  },
  {
    "type": "patch",
    "url": "/api/blog/:blogId",
    "title": "Deletes existing Blog article data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "deleteBlog",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "blogId",
            "description": "<p>object id of the blog article data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"blogId\": \"578f5379ed3f76f0340c4959\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Deletes existing blog article data from the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PATCH  \\\nhttp://localhost:3000/api/blog/578f5379ed3f76f0340c4959 \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTAxMDIzMiwiZXhwIjoxNDY5MDMwMjMyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.TgLoUDq3nO5PHILZC0viEcsbaVzQkz9aVpYEcL8wqZW11FDcr65_ISzTEYLAW5B3y5uK6gZXo7vaPF_FZz4NEg\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog deleted successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Blog deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/blog.route.js",
    "groupTitle": "Blog"
  },
  {
    "type": "patch",
    "url": "/api/blogdocument/:blogId/:documentId",
    "title": "Deletes existing blog document information object",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "deleteBlogDocumentInfo",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "blogId",
            "description": "<p>object id of the blog article data</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "documentId",
            "description": "<p>object id of the blog document file data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"blogId\": \"578f46c4774c15521907c399\",\n  \"documentId\": \"578fbe3c29d4b80333a535df\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Deletes existing blog document information of the particular blog article data</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PATCH  \\\nhttp://localhost:3000/api/blogdocument/578f46c4774c15521907c399/578fbe3c29d4b80333a535df \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTAzNzc5MSwiZXhwIjoxNDY5MDU3NzkxLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.Q7LMaqZ4eBA0-v2RsMjMCgF6mwJ-fhkZiEZrlDTs0TQT0ymK2vs9PH2UvYRMPPP-HOVJhoekJpix1ZTEslJuiQ\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog document deleted successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Blog document deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/blog.route.js",
    "groupTitle": "Blog"
  },
  {
    "type": "get",
    "url": "/api/blogcategory/",
    "title": "Get Blog category list",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getAllBlogCategories",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "perpage",
            "description": "<p>Number of data to return on each request</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": "<p>Current page number of pagination system.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "categoryname",
            "description": "<p>name of blog category to filter blog categories</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>whether to get data with active bit true or false, if true, then returns data list with active bit set to true only</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"perpage\": 10,\n  \"page\": 1,\n  \"categoryname\": \"technology\"\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n  \"active\": true,\n  \"categoryname\": \"technology\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the blog category list, if exists, else return empty array</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/blogcategory\" \\\n--data-urlencode \"perpage=10\" \\\n--data-urlencode \"page=1\"",
        "type": "curl"
      },
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/blogcategory\" \\\n--data-urlencode \"active=true\" \\\n--data-urlencode \"categoryname=technology\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dataList",
            "description": "<p>list of blog categories</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList._id",
            "description": "<p>object id of blog category data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.categoryName",
            "description": "<p>name of the category of blog.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.categoryDescription",
            "description": "<p>brief description about blog category.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.urlSlogCategory",
            "description": "<p>clean URL of blog category.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.addedOn",
            "description": "<p>date on which category is added.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "dataList.active",
            "description": "<p>active bit status.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "totalItems",
            "description": "<p>total no of blog categories in the related collection in database.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "currentPage",
            "description": "<p>current page number of client pagination system.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"dataList\": [\n          {\n              \"_id\": \"578f2ca535102e0c5d5c3ce2\",\n              \"categoryDescription\": \"contains food related blog articles\",\n              \"urlSlogCategory\": \"food\",\n              \"categoryName\": \"Food\",\n              \"addedOn\": \"2016-07-20T07:47:49.232Z\",\n              \"active\": false\n          }\n      ],\n      \"totalItems\": 1,\n      \"currentPage\": 1\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Category not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Category not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/blog.route.js",
    "groupTitle": "Blog"
  },
  {
    "type": "get",
    "url": "/api/blogtag/",
    "title": "Get Blog related tag data list",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getAllBlogTags",
    "group": "Blog",
    "description": "<p>Retrieves the blog tag list, if exists, else return empty array</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/blogtag\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of blog tag data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag",
            "description": "<p>tag related to the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "urlSlogTag",
            "description": "<p>clean URL of the tag .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "postCount",
            "description": "<p>no of blog posts related to the tag.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n       {\n           \"_id\": \"578f46038c6c44511904cef0\",\n           \"tag\": \"javascript\",\n           \"urlSlogTag\": \"javascript\",\n           \"postCount\": 2\n       },\n       {\n           \"_id\": \"578f46038c6c44511904cef1\",\n           \"tag\": \"tdd\",\n           \"urlSlogTag\": \"tdd\",\n           \"postCount\": 2\n       },\n       {\n           \"_id\": \"578f46038c6c44511904cef2\",\n           \"tag\": \"node.js\",\n           \"urlSlogTag\": \"node-js\",\n           \"postCount\": 2\n       }\n  ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog Tag not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Blog Tag not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/blog.route.js",
    "groupTitle": "Blog"
  },
  {
    "type": "get",
    "url": "/api/blog/",
    "title": "Get blog article list",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getAllBlogs",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "perpage",
            "description": "<p>Number of data to return on each request</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": "<p>Current page number of pagination system.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>whether to get data with active bit true or false, if true, then returns data list with active bit set to true only</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "blogtitle",
            "description": "<p>to filter blog list using blog title as filter param</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "categoryid",
            "description": "<p>to filter blog list according to news category</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tagid",
            "description": "<p>object id of the tag related to the blog article</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"perpage\": 10,\n  \"page\": 1\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n  \"perpage\": 10,\n  \"page\": 1,\n  \"categoryid\": \"578f2c9535102e0c5d5c3ce1\"\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n  \"active\": true,\n  \"blogtitle\": \"Testing Express APIs with Supertest\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the blog list, if exists, else return empty array</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/blog\" \\\n--data-urlencode \"perpage=10\" \\\n--data-urlencode \"page=1\"",
        "type": "curl"
      },
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/blog\" \\\n--data-urlencode \"perpage=10\" \\\n--data-urlencode \"page=1\" \\\n--data-urlencode \"categoryid=578f2c9535102e0c5d5c3ce1\"",
        "type": "curl"
      },
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/blog\" \\\n--data-urlencode \"active=true\" \\\n--data-urlencode \"blogtitle=Testing Express APIs with Supertest\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dataList",
            "description": "<p>list of blog articles</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList._id",
            "description": "<p>object id of blog article data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.blogTitle",
            "description": "<p>title of the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.urlSlog",
            "description": "<p>clean URL of the blog article title.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.categoryId",
            "description": "<p>object id of the related blog category.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.blogSummary",
            "description": "<p>brief description about the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.blogDescription",
            "description": "<p>blog article in detailed description.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.author",
            "description": "<p>author of the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "dataList.addedOn",
            "description": "<p>system date of blog article addition.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.bannerImage",
            "description": "<p>name of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.bannerImageTitle",
            "description": "<p>title description of blog article image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.bannerImageAltText",
            "description": "<p>alternative text for blog article image .</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "dataList.articleViews",
            "description": "<p>no of times blog article is viewed.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "dataList.active",
            "description": "<p>active bit status.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dataList.relatedFiles",
            "description": "<p>list of documents related to the blog.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "dataList.allowComment",
            "description": "<p>whether to allow the comments in this blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.status",
            "description": "<p>whether the blog article is still relevant or outdated.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "dataList.seoEntry",
            "description": "<p>object containing blog article seo meta tags.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.seoEntry.metaKeyword",
            "description": "<p>meta keyword for the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.seoEntry.titleTag",
            "description": "<p>meta title tag for the blog article .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.seoEntry.metaDescription",
            "description": "<p>meta description of the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.seoEntry.metaAuthor",
            "description": "<p>meta author of the blog artcle .</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "dataList.seoEntry.valueChanged",
            "description": "<p>whether the meta tags are updated or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dataList.tags",
            "description": "<p>tags related to the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.tags.tag",
            "description": "<p>tag related to the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.tags.urlSlogTag",
            "description": "<p>clean URL of the tag .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.tags.postCount",
            "description": "<p>no of blog posts related to the tag.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "totalItems",
            "description": "<p>total no of blog articles in the related collection in database.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "currentPage",
            "description": "<p>current page number of client pagination system.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"dataList\": [\n          {\n              \"_id\": \"578f46c4774c15521907c399\",\n              \"author\": \"codementor.io\",\n              \"bannerImageAltText\": \"very good article\",\n              \"bannerImageTitle\": \"very good tutorial codementor\",\n              \"bannerImage\": \"blog-1469007556727.webp\",\n              \"seoEntry\": {\n                  \"metaAuthor\": \"codementor.io\",\n                  \"metaDescription\": \"Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs,\",\n                  \"titleTag\": \"Testing Express APIs with Supertest\",\n                  \"metaKeyword\": \"tdd,node.js\",\n                  \"valueChanged\": false\n              },\n              \"blogDescription\": \"<p>Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs, and I just wanted to show-off how fun and simple it can be. Hope you enjoy this as much as I enjoyed writing it!</p>\",\n              \"blogSummary\": \"Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs, and I just wanted to show-off how fun and simple it can be. Hope you enjoy this as much as I enjoyed writing it!\",\n              \"categoryId\": \"578f2c9535102e0c5d5c3ce1\",\n              \"relatedFiles\": [],\n              \"urlSlog\": \"testing-express-apis-with-supertest\",\n              \"blogTitle\": \"Testing Express APIs with Supertest\",\n              \"addedOn\": \"2016-07-20T09:39:16.797Z\",\n              \"articleViews\": 0,\n              \"allowComment\": false,\n              \"active\": false,\n              \"status\": \"active\",\n              \"tags\": [\n                  {\n                      \"tag\": \"tdd\",\n                      \"urlSlogTag\": \"tdd\",\n                      \"postCount\": 2\n                  },\n                  {\n                      \"tag\": \"node.js\",\n                      \"urlSlogTag\": \"node-js\",\n                      \"postCount\": 2\n                  }\n              ]\n          }\n      ],\n      \"totalItems\": 1,\n      \"currentPage\": 1\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog article not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Blog article not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/blog.route.js",
    "groupTitle": "Blog"
  },
  {
    "type": "get",
    "url": "/api/blogdocument/:blogId",
    "title": "Get document file informations of the particular blog article",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getAllRelatedBlogDocuments",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "blogId",
            "description": "<p>object id of the blog article data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"blogId\": \"578f46c4774c15521907c399\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves all the related blog document file information belonging to the particular blog article</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/blogdocument/578f46c4774c15521907c399\"",
        "type": "curl"
      },
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/blogdocument/578f46c4774c15521907c399\" \\\n--data-urlencode \"active=true\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of blog document data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "documentName",
            "description": "<p>name of the document file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "documentTitle",
            "description": "<p>title of the document file .</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>no active bit status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n   {\n       \"documentTitle\": \"mongo security pdf  very good ebook haha\",\n       \"documentName\": \"blog-1469061436173.pdf\",\n       \"_id\": \"578fbe3c29d4b80333a535df\",\n       \"active\": true\n   },\n   {\n       \"documentTitle\": \"node.js tech article pdf document\",\n       \"documentName\": \"blog-1469037398996.pdf\",\n       \"_id\": \"578fbb57b35eab042d933394\",\n       \"active\": true\n   }\n   ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog document not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Blog document not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/blog.route.js",
    "groupTitle": "Blog"
  },
  {
    "type": "get",
    "url": "/api/blogseo/:metaTagId",
    "title": "Get SEO meta tags for blog article.",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getBlogAssociatedSeoMetaTag",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "metaTagId",
            "description": "<p>object id of the blog SEO meta tag data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"metaTagId\": \"578f46c4774c15521907c398\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the SEO meta tag information of a blog article to boost search engine optimization</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/blogseo/578f46c4774c15521907c398\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of blog seo meta tag information data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "metaKeyword",
            "description": "<p>meta keyword for the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "titleTag",
            "description": "<p>meta title tag for the blog article .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "metaDescription",
            "description": "<p>meta description of the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "metaAuthor",
            "description": "<p>meta author of the blog article .</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "valueChanged",
            "description": "<p>whether the meta tags are updated or not.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"_id\": \"578f46c4774c15521907c398\",\n      \"metaAuthor\": \"codementor.io\",\n      \"metaDescription\": \"Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs,\",\n      \"titleTag\": \"Testing Express APIs with Supertest\",\n      \"metaKeyword\": \"tdd,node.js,javascript,mocha,sinon\",\n      \"valueChanged\": false\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog SEO Meta Tag not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Blog SEO Meta Tag not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/blog.route.js",
    "groupTitle": "Blog"
  },
  {
    "type": "get",
    "url": "/api/filter/blogcategory/:blogCategory",
    "title": "Get blog article list by category name",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getBlogByCategory",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "perpage",
            "description": "<p>Number of data to return on each request</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": "<p>Current page number of pagination system.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "blogCategory",
            "description": "<p>to filter blog article list using blog category name as filter param</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"perpage\": 10,\n  \"page\": 1,\n  \"blogCategory\": \"technology\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the blog list related to the category name, if exists, else return empty array</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/filter/blogcategory/technology\" \\\n--data-urlencode \"perpage=10\" \\\n--data-urlencode \"page=1\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dataList",
            "description": "<p>list of blog articles</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList._id",
            "description": "<p>object id of blog article data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.blogTitle",
            "description": "<p>title of the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.urlSlog",
            "description": "<p>clean URL of the blog article title.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.categoryId",
            "description": "<p>object id of the related blog category.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dataList.relatedFiles",
            "description": "<p>list of documents related to the blog.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.blogSummary",
            "description": "<p>brief description about the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.blogDescription",
            "description": "<p>blog article in detailed description.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.author",
            "description": "<p>author of the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "dataList.addedOn",
            "description": "<p>system date of blog article addition.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.bannerImage",
            "description": "<p>name of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.bannerImageTitle",
            "description": "<p>title description of blog article image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.bannerImageAltText",
            "description": "<p>alternative text for blog article image .</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "dataList.articleViews",
            "description": "<p>no of times blog article is viewed.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "dataList.active",
            "description": "<p>active bit status.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "dataList.allowComment",
            "description": "<p>whether to allow the comments in this blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.status",
            "description": "<p>whether the blog article is still relevant or outdated.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "dataList.seoEntry",
            "description": "<p>object containing blog article seo meta tags.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.seoEntry.metaKeyword",
            "description": "<p>meta keyword for the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.seoEntry.titleTag",
            "description": "<p>meta title tag for the blog article .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.seoEntry.metaDescription",
            "description": "<p>meta description of the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.seoEntry.metaAuthor",
            "description": "<p>meta author of the blog artcle .</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "dataList.seoEntry.valueChanged",
            "description": "<p>whether the meta tags are updated or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dataList.tags",
            "description": "<p>tags related to the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.tags.tag",
            "description": "<p>tag related to the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.tags.urlSlogTag",
            "description": "<p>clean URL of the tag .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.tags.postCount",
            "description": "<p>no of blog posts related to the tag.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "totalItems",
            "description": "<p>total no of blog articles in the related collection in database.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "currentPage",
            "description": "<p>current page number of client pagination system.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"dataList\": [\n          {\n              \"_id\": \"578f46c4774c15521907c399\",\n              \"author\": \"codementor.io\",\n              \"bannerImageAltText\": \"very good article\",\n              \"bannerImageTitle\": \"very good tutorial codementor\",\n              \"bannerImage\": \"blog-1469007556727.webp\",\n              \"seoEntry\": {\n                  \"metaAuthor\": \"codementor.io\",\n                  \"metaDescription\": \"Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs,\",\n                  \"titleTag\": \"Testing Express APIs with Supertest\",\n                  \"metaKeyword\": \"tdd,node.js\",\n                  \"valueChanged\": false\n              },\n              \"blogDescription\": \"<p>Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs, and I just wanted to show-off how fun and simple it can be. Hope you enjoy this as much as I enjoyed writing it!</p>\",\n              \"blogSummary\": \"Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs, and I just wanted to show-off how fun and simple it can be. Hope you enjoy this as much as I enjoyed writing it!\",\n              \"categoryId\": \"578f2c9535102e0c5d5c3ce1\",\n              \"relatedFiles\": [],\n              \"urlSlog\": \"testing-express-apis-with-supertest\",\n              \"blogTitle\": \"Testing Express APIs with Supertest\",\n              \"addedOn\": \"2016-07-20T09:39:16.797Z\",\n              \"articleViews\": 0,\n              \"allowComment\": false,\n              \"active\": false,\n              \"status\": \"active\",\n              \"tags\": [\n                  {\n                      \"tag\": \"tdd\",\n                      \"urlSlogTag\": \"tdd\",\n                      \"postCount\": 2\n                  },\n                  {\n                      \"tag\": \"node.js\",\n                      \"urlSlogTag\": \"node-js\",\n                      \"postCount\": 2\n                  }\n              ]\n          }\n      ],\n      \"totalItems\": 1,\n      \"currentPage\": 1\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog article not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Blog article not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/blog.route.js",
    "groupTitle": "Blog"
  },
  {
    "type": "get",
    "url": "/api/blog/:blogId",
    "title": "Get blog article information object by ID",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getBlogByID",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "blogId",
            "description": "<p>object id of the blog article data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"blogId\": \"578f46c4774c15521907c399\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the blog article object information by Id, if exists, else return empty object</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/blog/578f46c4774c15521907c399\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of blog article data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "blogTitle",
            "description": "<p>title of the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "urlSlog",
            "description": "<p>clean URL of the blog article title.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>object id of the related blog category.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "blogSummary",
            "description": "<p>brief description about the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "blogDescription",
            "description": "<p>blog article in detailed description.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>author of the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "addedOn",
            "description": "<p>system date of blog article addition.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bannerImage",
            "description": "<p>name of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bannerImageTitle",
            "description": "<p>title description of blog article image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bannerImageAltText",
            "description": "<p>alternative text for blog article image .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties",
            "description": "<p>meta-data info of image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imageExtension",
            "description": "<p>extension of image file .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imagePath",
            "description": "<p>path of image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "articleViews",
            "description": "<p>no of times blog article is viewed.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>active bit status     *</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "relatedFiles",
            "description": "<p>list of documents related to the blog.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "allowComment",
            "description": "<p>whether to allow the comments in this blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>whether the blog article is still relevant or outdated.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "seoEntry",
            "description": "<p>object containing blog article seo meta tags.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "seoEntry.metaKeyword",
            "description": "<p>meta keyword for the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "seoEntry.titleTag",
            "description": "<p>meta title tag for the blog article .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "seoEntry.metaDescription",
            "description": "<p>meta description of the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "seoEntry.metaAuthor",
            "description": "<p>meta author of the blog artcle .</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "seoEntry.valueChanged",
            "description": "<p>whether the meta tags are updated or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "tags",
            "description": "<p>tags related to the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tags.tag",
            "description": "<p>tag related to the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tags.urlSlogTag",
            "description": "<p>clean URL of the tag .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tags.postCount",
            "description": "<p>no of blog posts related to the tag.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"_id\": \"578f46c4774c15521907c399\",\n      \"author\": \"codementor.io\",\n      \"bannerImageAltText\": \"very good article\",\n      \"bannerImageTitle\": \"very good tutorial codementor\",\n      \"bannerImage\": \"blog-1469007556727.webp\",\n      \"seoEntry\": {\n          \"metaAuthor\": \"codementor.io\",\n          \"metaDescription\": \"Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs,\",\n          \"titleTag\": \"Testing Express APIs with Supertest\",\n          \"metaKeyword\": \"tdd,node.js,javascript,mocha,sinon\",\n          \"valueChanged\": false\n      },\n      \"blogDescription\": \"<p>Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs, and I just wanted to show-off how fun and simple it can be. Hope you enjoy this as much as I enjoyed writing it!</p>\",\n      \"blogSummary\": \"Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs, and I just wanted to show-off how fun and simple it can be. Hope you enjoy this as much as I enjoyed writing it!\",\n      \"categoryId\": \"578f2c9535102e0c5d5c3ce1\",\n      \"urlSlog\": \"testing-express-apis-with-supertest\",\n      \"blogTitle\": \"Testing Express APIs with Supertest\",\n      \"addedOn\": \"2016-07-20T09:39:16.797Z\",\n      \"relatedFiles\": [],\n      \"articleViews\": 0,\n      \"allowComment\": false,\n      \"active\": false,\n      \"status\": \"active\",\n      \"imageProperties\": {\n          \"imageExtension\": \"jpg\",\n          \"imagePath\": \"public/uploads/images/blogs/blog-1469007556727.jpg\"\n      },\n      \"tags\": [\n          {\n              \"tag\": \"tdd\",\n              \"urlSlogTag\": \"tdd\",\n              \"postCount\": 2\n          },\n          {\n              \"tag\": \"node.js\",\n              \"urlSlogTag\": \"node-js\",\n              \"postCount\": 2\n          }\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog article not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Blog article not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/blog.route.js",
    "groupTitle": "Blog"
  },
  {
    "type": "get",
    "url": "/api/filter/blogtag/:blogTag",
    "title": "Get blog article list by tag name",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getBlogByTag",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "perpage",
            "description": "<p>Number of data to return on each request</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": "<p>Current page number of pagination system.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "blogTag",
            "description": "<p>to filter blog article list using blog tag name as filter param</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"perpage\": 10,\n  \"page\": 1,\n  \"blogTag\": \"mocha\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the blog list related to tag name, if exists, else return empty array</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/filter/blogtag/mocha\" \\\n--data-urlencode \"perpage=10\" \\\n--data-urlencode \"page=1\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dataList",
            "description": "<p>list of blog articles</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList._id",
            "description": "<p>object id of blog article data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.blogTitle",
            "description": "<p>title of the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.urlSlog",
            "description": "<p>clean URL of the blog article title.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.categoryId",
            "description": "<p>object id of the related blog category.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dataList.relatedFiles",
            "description": "<p>list of documents related to the blog.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.blogSummary",
            "description": "<p>brief description about the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.blogDescription",
            "description": "<p>blog article in detailed description.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.author",
            "description": "<p>author of the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "dataList.addedOn",
            "description": "<p>system date of blog article addition.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.bannerImage",
            "description": "<p>name of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.bannerImageTitle",
            "description": "<p>title description of blog article image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.bannerImageAltText",
            "description": "<p>alternative text for blog article image .</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "dataList.articleViews",
            "description": "<p>no of times blog article is viewed.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "dataList.active",
            "description": "<p>active bit status.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "dataList.allowComment",
            "description": "<p>whether to allow the comments in this blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.status",
            "description": "<p>whether the blog article is still relevant or outdated.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "dataList.seoEntry",
            "description": "<p>object containing blog article seo meta tags.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.seoEntry.metaKeyword",
            "description": "<p>meta keyword for the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.seoEntry.titleTag",
            "description": "<p>meta title tag for the blog article .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.seoEntry.metaDescription",
            "description": "<p>meta description of the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.seoEntry.metaAuthor",
            "description": "<p>meta author of the blog artcle .</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "dataList.seoEntry.valueChanged",
            "description": "<p>whether the meta tags are updated or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dataList.tags",
            "description": "<p>tags related to the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.tags.tag",
            "description": "<p>tag related to the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.tags.urlSlogTag",
            "description": "<p>clean URL of the tag .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.tags.postCount",
            "description": "<p>no of blog posts related to the tag.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "totalItems",
            "description": "<p>total no of blog articles in the related collection in database.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "currentPage",
            "description": "<p>current page number of client pagination system.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"dataList\": [\n          {\n              \"_id\": \"578f46c4774c15521907c399\",\n              \"author\": \"codementor.io\",\n              \"bannerImageAltText\": \"very good article\",\n              \"bannerImageTitle\": \"very good tutorial codementor\",\n              \"bannerImage\": \"blog-1469007556727.webp\",\n              \"seoEntry\": {\n                  \"metaAuthor\": \"codementor.io\",\n                  \"metaDescription\": \"Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs,\",\n                  \"titleTag\": \"Testing Express APIs with Supertest\",\n                  \"metaKeyword\": \"tdd,node.js\",\n                  \"valueChanged\": false\n              },\n              \"blogDescription\": \"<p>Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs, and I just wanted to show-off how fun and simple it can be. Hope you enjoy this as much as I enjoyed writing it!</p>\",\n              \"blogSummary\": \"Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs, and I just wanted to show-off how fun and simple it can be. Hope you enjoy this as much as I enjoyed writing it!\",\n              \"categoryId\": \"578f2c9535102e0c5d5c3ce1\",\n              \"relatedFiles\": [],\n              \"urlSlog\": \"testing-express-apis-with-supertest\",\n              \"blogTitle\": \"Testing Express APIs with Supertest\",\n              \"addedOn\": \"2016-07-20T09:39:16.797Z\",\n              \"articleViews\": 0,\n              \"allowComment\": false,\n              \"active\": false,\n              \"status\": \"active\",\n              \"tags\": [\n                  {\n                      \"tag\": \"tdd\",\n                      \"urlSlogTag\": \"tdd\",\n                      \"postCount\": 2\n                  },\n                  {\n                      \"tag\": \"node.js\",\n                      \"urlSlogTag\": \"node-js\",\n                      \"postCount\": 2\n                  }\n              ]\n          }\n      ],\n      \"totalItems\": 1,\n      \"currentPage\": 1\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog article not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Blog article not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/blog.route.js",
    "groupTitle": "Blog"
  },
  {
    "type": "get",
    "url": "/api/blogcategory/:categoryId",
    "title": "Get Blog category object by ID",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getBlogCategoryByID",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>object id of the blog category data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"categoryId\": \"578f2c9535102e0c5d5c3ce1\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the blog category object by Id, if exists, else return empty object</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/blogcategory/578f2c9535102e0c5d5c3ce1\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of blog category data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "categoryName",
            "description": "<p>name of the category of blog.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "categoryDescription",
            "description": "<p>brief description about blog category.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "urlSlogCategory",
            "description": "<p>clean URL of blog category.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addedOn",
            "description": "<p>date on which category is added.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>active bit status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"_id\": \"578f2c9535102e0c5d5c3ce1\",\n      \"categoryDescription\": \"contains technology related blog articles\",\n      \"urlSlogCategory\": \"technology\",\n      \"categoryName\": \"technology\",\n      \"addedOn\": \"2016-07-20T07:47:33.132Z\",\n      \"active\": true\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Category not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Category not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/blog.route.js",
    "groupTitle": "Blog"
  },
  {
    "type": "get",
    "url": "/api/blogdetail/:year/:month/:day/:titleSlog",
    "title": "Get blog detailed information  by title slog or clean url",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getBlogDetailByUrlSlog",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "year",
            "description": "<p>year on which blog was added</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "month",
            "description": "<p>month on which blog was added</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "day",
            "description": "<p>day on which blog was added</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "titleSlog",
            "description": "<p>clean url of the blog title</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"year\": \"2016\",\n  \"month\": \"07\",\n  \"day\": \"20\",\n  \"titleSlog\": \"testing-express-apis-with-supertest\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the blog  detailed information object using clean url, if exists, else return empty object</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/blogdetail/2016/07/20/testing-express-apis-with-supertest\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>object containing detailed information about blog article except related documents</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>object id of blog article data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.blogTitle",
            "description": "<p>title of the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.urlSlog",
            "description": "<p>clean URL of the blog article title.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.categoryId",
            "description": "<p>object id of the related blog category.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data.relatedFiles",
            "description": "<p>list of documents related to the blog.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.blogSummary",
            "description": "<p>brief description about the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.blogDescription",
            "description": "<p>blog article in detailed description.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.author",
            "description": "<p>author of the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.addedOn",
            "description": "<p>system date of blog article addition.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.bannerImage",
            "description": "<p>name of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.bannerImageTitle",
            "description": "<p>title description of blog article image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.bannerImageAltText",
            "description": "<p>alternative text for blog article image .</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "data.articleViews",
            "description": "<p>no of times blog article is viewed.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.active",
            "description": "<p>active bit status.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.allowComment",
            "description": "<p>whether to allow the comments in this blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.status",
            "description": "<p>whether the blog article is still relevant or outdated.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.seoEntry",
            "description": "<p>object containing blog article seo meta tags.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.seoEntry.metaKeyword",
            "description": "<p>meta keyword for the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.seoEntry.titleTag",
            "description": "<p>meta title tag for the blog article .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.seoEntry.metaDescription",
            "description": "<p>meta description of the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.seoEntry.metaAuthor",
            "description": "<p>meta author of the blog artcle .</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.seoEntry.valueChanged",
            "description": "<p>whether the meta tags are updated or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data.tags",
            "description": "<p>tags related to the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.tags.tag",
            "description": "<p>tag related to the blog article.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.tags.urlSlogTag",
            "description": "<p>clean URL of the tag .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.tags.postCount",
            "description": "<p>no of blog posts related to the tag.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "doclist",
            "description": "<p>list of related documents</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "doclist._id",
            "description": "<p>object id of blog document data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "doclist.documentName",
            "description": "<p>name of the document file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "doclist.documentTitle",
            "description": "<p>title of the document file .</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "doclist.active",
            "description": "<p>no active bit status of blog document.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"data\": {\n          \"_id\": \"578f46c4774c15521907c399\",\n          \"author\": \"codementor.io\",\n          \"bannerImageAltText\": \"very good article\",\n          \"bannerImageTitle\": \"very good tutorial codementor\",\n          \"bannerImage\": \"blog-1469007556727.webp\",\n          \"seoEntry\": {\n              \"_id\": \"578f46c4774c15521907c398\",\n              \"metaAuthor\": \"www.codementor.io\",\n              \"metaKeyword\": \"tdd,node.js,javascript,mocha,sinon,codementor\",\n              \"titleTag\": \"Testing Express APIs with Supertest to do integration testing\",\n              \"metaDescription\": \"Hello, I am Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I ve been having lots of fun testing my Express APIs, haha updated the content finally\",\n              \"valueChanged\": true\n          },\n          \"blogDescription\": \"<p>Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs, and I just wanted to show-off how fun and simple it can be. Hope you enjoy this as much as I enjoyed writing it!</p>\",\n          \"blogSummary\": \"Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs, and I just wanted to show-off how fun and simple it can be. Hope you enjoy this as much as I enjoyed writing it!\",\n          \"categoryId\": \"578f2c9535102e0c5d5c3ce1\",\n          \"relatedFiles\": [],\n          \"urlSlog\": \"testing-express-apis-with-supertest\",\n          \"blogTitle\": \"Testing Express APIs with Supertest\",\n          \"addedOn\": \"2016-07-20T09:39:16.797Z\",\n          \"articleViews\": 0,\n          \"allowComment\": false,\n          \"active\": true,\n          \"status\": \"active\",\n          \"tags\": [\n              {\n                  \"_id\": \"578f46038c6c44511904cef1\",\n                  \"tag\": \"tdd\",\n                  \"urlSlogTag\": \"tdd\",\n                  \"postCount\": 2\n              }\n          ]\n      },\n      \"doclist\": [\n          {\n              \"documentTitle\": \"mongo security pdf  very good ebook\",\n              \"documentName\": \"blog-1469061530821.pdf\",\n              \"_id\": \"578fbb2bb35eab042d933393\",\n              \"active\": true\n          }\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog article not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Blog article not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/blog.route.js",
    "groupTitle": "Blog"
  },
  {
    "type": "get",
    "url": "/api/blogdocument/:blogId/:documentId",
    "title": "Get document file information object by ID",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getBlogDocumentInfoByBlogID",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "blogId",
            "description": "<p>object id of the blog article data</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "documentId",
            "description": "<p>object id of the blog document file data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"blogId\": \"578f46c4774c15521907c399\",\n  \"documentId\": \"578fbe3c29d4b80333a535df\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the document file information object of a particular document file using document id as filter param</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/blogdocument/578f46c4774c15521907c399/578fbe3c29d4b80333a535df\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of blog document data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "documentName",
            "description": "<p>name of the document file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "documentTitle",
            "description": "<p>title of the document file .</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>no active bit status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "docProperties",
            "description": "<p>meta-data info of document file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "docProperties.documentMimeType",
            "description": "<p>mime-type of document file .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "docProperties.docPath",
            "description": "<p>path of document file.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"documentTitle\": \"mongo security pdf\",\n      \"documentName\": \"blog-1469038140358.pdf\",\n      \"_id\": \"578fbe3c29d4b80333a535df\",\n      \"active\": true,\n      \"docProperties\": {\n          \"documentMimeType\": \"application/octet-stream\",\n          \"docPath\": \"public/uploads/documents/blogs/blog-1469038140358.pdf\"\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog document not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Blog document not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/blog.route.js",
    "groupTitle": "Blog"
  },
  {
    "type": "patch",
    "url": "/api/blogcategory/:categoryId",
    "title": "Deletes existing Blog category data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "patchBlogCategory",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>object id of the blog category data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"categoryId\": \"578f32bca4d436d76bc751cf\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Deletes existing blog category information from the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PATCH  \\\nhttp://localhost:3000/api/blogcategory/578f32bca4d436d76bc751cf \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTAwMDE4NCwiZXhwIjoxNDY5MDIwMTg0LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.Npy3LZnsOqOqH7RBfl3oYAdVOYdlU3_6i8izGo7xkHzI610NjnCaljiMxb7s71RJsRoqVqNqB-gai8vzWlofrQ\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog category deleted successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Blog category deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/blog.route.js",
    "groupTitle": "Blog"
  },
  {
    "type": "post",
    "url": "/api/blog/",
    "title": "Post Blog article data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postBlogArticle",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "blogTitle",
            "description": "<p>Mandatory  title of the blog article.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "blogDescription",
            "description": "<p>Mandatory   blog article in detailed description.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Mandatory  author of the blog article</p>"
          }
        ]
      }
    },
    "description": "<p>Post blog article data to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X POST  \\\nhttp://localhost:3000/api/blog/ \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTAxMDIzMiwiZXhwIjoxNDY5MDMwMjMyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.TgLoUDq3nO5PHILZC0viEcsbaVzQkz9aVpYEcL8wqZW11FDcr65_ISzTEYLAW5B3y5uK6gZXo7vaPF_FZz4NEg\" \\\n-F imageName=@public/images/404_banner.png  \\\n-F \"data={\\\"blogTitle\\\": \\\"Unit test your Nodejs RESTful API using mocha\\\",\\\"blogDescription\\\": \\\"Its always a good idea to have some quick and simple automated tests in place for your REST api so that you know that you didnt break anything that already worked when you add more functionality.  tests is not that hard in The Only Real Dev Language. You just gotta know the right libraries to use and how they work together.\\\",\\\"blogSummary\\\": \\\"Its always a good idea to have some quick and  tests in place for your REST api so that you know that you didnt break that already worked when you add more .\\\",\\\"tags\\\": \\\"javascript,node.js,mocha,sinon\\\",\\\"status\\\": \\\"active\\\",\\\"author\\\": \\\"tutorialhorizon.com\\\",\\\"active\\\": \\\"true\\\",\\\"categoryId\\\": \\\"578f32bca4d436d76bc751cf\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog article saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Blog article saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>validation errors due to not entering values for blog title, description, and article author</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog with same title already exists</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\":[\n                 {\"param\":\"blogTitle\",\"msg\":\"Title for blog article is required\"},\n                 {\"param\":\"blogDescription\",\"msg\":\"Blog description is required\"},\n                 {\"param\":\"author\",\"msg\":\"Blog author is required\"}\n            ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"Blog with same title already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/blog.route.js",
    "groupTitle": "Blog"
  },
  {
    "type": "post",
    "url": "/api/blogcategory/",
    "title": "Post Blog category data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postBlogCategory",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "categoryName",
            "description": "<p>name of the category of blog.</p>"
          }
        ]
      }
    },
    "description": "<p>saves the blog category information to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X POST  \\\nhttp://localhost:3000/api/blogcategory/ \\\n-H 'Content-Type: application/json' \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTAwMDE4NCwiZXhwIjoxNDY5MDIwMTg0LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.Npy3LZnsOqOqH7RBfl3oYAdVOYdlU3_6i8izGo7xkHzI610NjnCaljiMxb7s71RJsRoqVqNqB-gai8vzWlofrQ\" \\\n-d '{\"categoryName\": \"Sports\", \"categoryDescription\": \"Contains sports related blog articles\",\"active\": true}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog Category saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Blog Category saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog category is required</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog category with same name already exists</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": \"Blog category is required\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"Blog category with same name already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/blog.route.js",
    "groupTitle": "Blog"
  },
  {
    "type": "post",
    "url": "/api/blogdocument/:blogId",
    "title": "Saves related blog documents to the particular blog article data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postBlogRelatedDocument",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "blogId",
            "description": "<p>object id of the blog article data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"blogId\": \"578f46c4774c15521907c399\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Saves related blog documents to the blog article data as subdocuments in  the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X POST  \\\nhttp://localhost:3000/api/blogdocument/578f46c4774c15521907c399 \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTAzNzc5MSwiZXhwIjoxNDY5MDU3NzkxLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.Q7LMaqZ4eBA0-v2RsMjMCgF6mwJ-fhkZiEZrlDTs0TQT0ymK2vs9PH2UvYRMPPP-HOVJhoekJpix1ZTEslJuiQ\" \\\n-F documentName=@public/uploads/documents/blogs/blog-1469037398996.pdf  \\\n-F \"data={\\\"documentTitle\\\": \\\"mongo security pdf\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog document saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Blog document saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Please upload document file</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\":\"Please upload document file\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\":\"Document title is required\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/blog.route.js",
    "groupTitle": "Blog"
  },
  {
    "type": "put",
    "url": "/api/blog/:blogId",
    "title": "Updates existing Blog article data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateBlog",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "blogId",
            "description": "<p>object id of the blog article data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"blogId\": \"578f5379ed3f76f0340c4959\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates existing blog article data to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PUT  \\\nhttp://localhost:3000/api/blog/578f5379ed3f76f0340c4959 \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTAxMDIzMiwiZXhwIjoxNDY5MDMwMjMyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.TgLoUDq3nO5PHILZC0viEcsbaVzQkz9aVpYEcL8wqZW11FDcr65_ISzTEYLAW5B3y5uK6gZXo7vaPF_FZz4NEg\" \\\n-F imageName=@public/images/404_banner.png  \\\n-F \"data={\\\"blogTitle\\\": \\\"Unit test your Nodejs RESTful API using mocha-node.js\\\",\\\"blogDescription\\\": \\\"Its always a good idea to have some quick and simple automated tests in place for your REST api so that you know that you didnt break anything that already worked when you add more .  tests is not that hard in The Only Real Dev Language. You just gotta know the right libraries to use and how they work together.\\\",\\\"blogSummary\\\": \\\"Its always a good idea to have some quick and  tests in place for your REST api so that you know that you didnt break that already worked when you add more .\\\",\\\"tags\\\": \\\"javascript,node.js\\\",\\\"status\\\": \\\"active\\\",\\\"author\\\": \\\"www.tutorialhorizon.com\\\",\\\"active\\\": \\\"true\\\",\\\"categoryId\\\": \\\"578f32bca4d436d76bc751cf\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Blog updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>validation errors due to not entering values for blog title, description, and article author</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog with same title already exists</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\":[\n                 {\"param\":\"blogTitle\",\"msg\":\"Title for blog article is required\"},\n                 {\"param\":\"blogDescription\",\"msg\":\"Blog description is required\"},\n                 {\"param\":\"author\",\"msg\":\"Blog author is required\"}\n            ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"Blog with same title already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/blog.route.js",
    "groupTitle": "Blog"
  },
  {
    "type": "put",
    "url": "/api/blogcategory/:categoryId",
    "title": "Updates existing Blog category data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateBlogCategory",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>object id of the blog category data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"categoryId\": \"578f32bca4d436d76bc751cf\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates existing blog category information to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PUT  \\\nhttp://localhost:3000/api/blogcategory/578f32bca4d436d76bc751cf \\\n-H 'Content-Type: application/json' \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTAwMDE4NCwiZXhwIjoxNDY5MDIwMTg0LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.Npy3LZnsOqOqH7RBfl3oYAdVOYdlU3_6i8izGo7xkHzI610NjnCaljiMxb7s71RJsRoqVqNqB-gai8vzWlofrQ\" \\\n-d '{\"categoryName\": \"Sports Articles\", \"categoryDescription\": \"Contains sports related blog articles and tips\",\"active\": true}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog category updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Blog category updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog category is required</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog category with same name already exists</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": \"Blog category is required\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"Blog category with same name already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/blog.route.js",
    "groupTitle": "Blog"
  },
  {
    "type": "put",
    "url": "/api/blogdocument/:blogId/:documentId",
    "title": "Updates existing blog document information object",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateBlogDocumentInfo",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "blogId",
            "description": "<p>object id of the blog article data</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "documentId",
            "description": "<p>object id of the blog document file data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"blogId\": \"578f46c4774c15521907c399\",\n  \"documentId\": \"578fbe3c29d4b80333a535df\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates existing blog document information of the particular blog article data</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PUT  \\\nhttp://localhost:3000/api/blogdocument/578f46c4774c15521907c399/578fbe3c29d4b80333a535df \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTAzNzc5MSwiZXhwIjoxNDY5MDU3NzkxLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.Q7LMaqZ4eBA0-v2RsMjMCgF6mwJ-fhkZiEZrlDTs0TQT0ymK2vs9PH2UvYRMPPP-HOVJhoekJpix1ZTEslJuiQ\" \\\n-F documentName=@public/uploads/documents/blogs/blog-1469037398996.pdf  \\\n-F \"data={\\\"documentTitle\\\": \\\"mongo security pdf very good ebook\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog document updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Blog document updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Please upload document file</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\":\"Please upload document file\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\":\"Document title is required\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/blog.route.js",
    "groupTitle": "Blog"
  },
  {
    "type": "put",
    "url": "/api/blogseo/:metaTagId",
    "title": "Updates the existing blog article SEO meta information",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateBlogSeoMetaTag",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "metaTagId",
            "description": "<p>object id of the blog SEO meta tag data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"metaTagId\": \"578f46c4774c15521907c398\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates the existing blog article SEO meta tags information to boost search engine optimization</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PUT  \\\nhttp://localhost:3000/api/blogseo/578f46c4774c15521907c398 \\\n-H 'Content-Type: application/json' \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTA4MDUzNSwiZXhwIjoxNDY5MTAwNTM1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.Kp1MQx3iwdZLvGG8hzcGOReKG3B9FBkIbjrF9OVNq5eYmAeRebUxH436ReznfiPNnAsNAE8qQ2U5ksQSDTWRrg\" \\\n-d '{\"metaAuthor\": \"www.codementor.io\",\"titleTag\": \"Testing Express APIs with Supertest to do integration testing\",\"metaKeyword\": \"tdd,node.js,javascript,mocha,sinon,codementor\", \"metaDescription\": \"Hello, I am Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I ve been having lots of fun testing my Express APIs, haha updated the content finally\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Blog SEO meta tag updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Blog SEO meta tag updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/blog.route.js",
    "groupTitle": "Blog"
  },
  {
    "type": "get",
    "url": "/api/cloudinary/",
    "title": "Get Cloudinary Configuration Info",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getCloudinarySetting",
    "group": "CloudinarySetting",
    "description": "<p>Retrieves the cloudinary setting Information Object if exists, else return empty object</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/api/cloudinary",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of the cloudinary image service provider configuration data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cloudinaryCloudName",
            "description": "<p>Cloudinary unique cloud name of the cloudinary image service provider.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cloudinaryApiKey",
            "description": "<p>Cloudinary api key of the cloudinary image service provider.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cloudinaryApiSecret",
            "description": "<p>Cloudinary api secret of the cloudinary image service provider.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"_id\": \"572851f93bb09ae711af45b8\",\n    \"cloudinaryCloudName\": \"nodebeats\",\n    \"cloudinaryApiKey\": \"3659\",\n    \"cloudinaryApiSecret\": \"25369\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Cloudinary setting not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Cloudinary Setting not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/cloudinary.setting.route.js",
    "groupTitle": "CloudinarySetting"
  },
  {
    "type": "get",
    "url": "/api/cloudinary/:cloudinarySettingId",
    "title": "Get Cloudinary Configuration Info By Id",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getCloudinarySettingByID",
    "group": "CloudinarySetting",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cloudinarySettingId",
            "description": "<p>object id of the cloudinary object data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"cloudinarySettingId\": \"57889ae9585d9632523f1234\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the cloudinary setting object by querying against id</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/api/cloudinary/572851f93bb09ae711af45b8",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Cloudinary setting object id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cloudinaryCloudName",
            "description": "<p>Cloudinary unique cloud name of the cloudinary image service provider.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cloudinaryApiKey",
            "description": "<p>Cloudinary api key of the cloudinary image service provider.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cloudinaryApiSecret",
            "description": "<p>Cloudinary api secret of the cloudinary image service provider.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"_id\": \"572851f93bb09ae711af45b8\",\n    \"cloudinaryCloudName\": \"nodebeats\",\n    \"cloudinaryApiKey\": \"3659\",\n    \"cloudinaryApiSecret\": \"25369\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Cloudinary setting not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Cloudinary Setting not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/cloudinary.setting.route.js",
    "groupTitle": "CloudinarySetting"
  },
  {
    "type": "post",
    "url": "/api/cloudinary/",
    "title": "Post Cloudinary Configuration Info",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postCloudinarySetting",
    "group": "CloudinarySetting",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cloudinaryCloudName",
            "description": "<p>Mandatory Cloudinary unique cloud name of the cloudinary image service provider.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cloudinaryApiKey",
            "description": "<p>Mandatory Cloudinary api key of the cloudinary image service provider.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cloudinaryApiSecret",
            "description": "<p>Mandatory Cloudinary api secret of the cloudinary image service provider.</p>"
          }
        ]
      }
    },
    "description": "<p>saves cloudinary setting information to the database so that we can upload images to the cloudinary server</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-v \\\n-X POST \\\nhttp://localhost:3000/api/cloudinary \\\n-H 'Content-Type: application/json' \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODMxNjg4MiwiZXhwIjoxNDY4MzM2ODgyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.agd70Nk8y4bcORqzQP4eTSZW_3lN9TpC9zIpKM5j98RkNqS43qVPRQyN3DfRS6CKblHyvYASisvQGpCvJSyfgw' \\\n-d '{\"cloudinaryCloudName\":\"davidwalsh\",\"cloudinaryApiKey\":\"something\",\"cloudinaryApiSecret\":\"hello\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Cloudinary setting saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Cloudinary setting saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Cloudinary setting configuration already exists, only can update existing data. new inserts is not allowed</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>Cloudinary setting post method throws validation error if either of cloudinaryCloudName, cloudinaryApiKey and cloudinaryApiSecret is not provided</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"You can only update cloudinary setting\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"[{\"param\":\"cloudinaryApiSecret\",\"msg\":\"Cloudinary api secret is required\"}]\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/cloudinary.setting.route.js",
    "groupTitle": "CloudinarySetting"
  },
  {
    "type": "put",
    "url": "/api/cloudinary/:cloudinarySettingId",
    "title": "Update Cloudinary Configuration Info",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateCloudinarySetting",
    "group": "CloudinarySetting",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cloudinarySettingId",
            "description": "<p>object id of the cloudinary object data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"cloudinarySettingId\": \"57889ae9585d9632523f1234\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>updates existing cloudinary setting information to the database by providing id</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-v \\\n-X PUT \\\nhttp://localhost:3000/api/cloudinary/57858fa52c24a6b90e40d6b1 \\\n-H 'Content-Type: application/json' \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODMxNjg4MiwiZXhwIjoxNDY4MzM2ODgyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.agd70Nk8y4bcORqzQP4eTSZW_3lN9TpC9zIpKM5j98RkNqS43qVPRQyN3DfRS6CKblHyvYASisvQGpCvJSyfgw' \\\n-d '{\"cloudinaryCloudName\":\"davidwalsh\",\"cloudinaryApiKey\":\"something\",\"cloudinaryApiSecret\":\"hello\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Cloudinary setting updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Cloudinary setting updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>Cloudinary setting put method throws validation error if either of cloudinaryCloudName, cloudinaryApiKey and cloudinaryApiSecret is not provided</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"[{\"param\":\"cloudinaryApiSecret\",\"msg\":\"Cloudinary api secret is required\"}]\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/cloudinary.setting.route.js",
    "groupTitle": "CloudinarySetting"
  },
  {
    "type": "get",
    "url": "/api/commentsetting/",
    "title": "Get comment setting information object",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getCommentSetting",
    "group": "CommentSetting",
    "description": "<p>Retrieves the comment setting Information Object, if exists, else return empty object</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/commentsetting\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of the comment setting data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "disqusUsername",
            "description": "<p>username registered disqus commenting system.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "disqusURL",
            "description": "<p>url associated with the disqus account.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "disqusApiKey",
            "description": "<p>api key provided by disqus system to do various administrative tasks on disqus system.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"_id\": \"5790a9adcd8a624a755441a1\",\n      \"disqusApiKey\": \"1225649LOIkdie1569URYRI\",\n      \"disqusURL\": \"shrawan.com\",\n      \"disqusUsername\": \"shrawan\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Comment setting not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"comment setting not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/comment.setting.route.js",
    "groupTitle": "CommentSetting"
  },
  {
    "type": "get",
    "url": "/api/commentsetting/:commentSettingId",
    "title": "Get comment setting information object by Id",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getCommentSettingByID",
    "group": "CommentSetting",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "commentSettingId",
            "description": "<p>object id of the comment setting data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"commentSettingId\": \"5790a9adcd8a624a755441a1\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the comment setting Information Object by Id, if exists, else return empty object</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": " {\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/commentsetting/5790a9adcd8a624a755441a1\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of the comment setting data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "disqusUsername",
            "description": "<p>username registered disqus commenting system.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "disqusURL",
            "description": "<p>url associated with the disqus account.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "disqusApiKey",
            "description": "<p>api key provided by disqus system to do various administrative tasks on disqus system.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"_id\": \"5790a9adcd8a624a755441a1\",\n      \"disqusApiKey\": \"1225649LOIkdie1569URYRI\",\n      \"disqusURL\": \"shrawan.com\",\n      \"disqusUsername\": \"shrawan\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>comment setting not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"comment setting not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/comment.setting.route.js",
    "groupTitle": "CommentSetting"
  },
  {
    "type": "post",
    "url": "/api/commentsetting/",
    "title": "Post comment setting Information",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postCommentSetting",
    "group": "CommentSetting",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "disqusURL",
            "description": "<p>Mandatory  URL associated with the disqus account.</p>"
          }
        ]
      }
    },
    "description": "<p>saves comment setting information to the database so that we can use disqus comment system in our website</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-v \\\n-X POST \\\nhttp://localhost:3000/api/commentsetting/ \\\n-H 'Content-Type: application/json' \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTA5ODI4MiwiZXhwIjoxNDY5MTE4MjgyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wMoAkOzuqlE90acOSV6NLhyPRJHAii40iNCzSUx_33Sj7Nc5SfEjEDYI-qeuIkB_W22b_NhAN9yR0eGLM2oZLg' \\\n-d '{\"disqusUsername\":\"shrawan\",\"disqusURL\":\"shrawan.com\",\"disqusApiKey\":\"1225649LOIkdie1569URYRI\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Comment setting saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Comment setting saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>comment setting already exists. You can only update the data once data is inserted. New data inserts is not allowed</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Url associated with the disqus account is required.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"comment setting already exists. You can only update the data once data is inserted.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\":\"Disqus URL is required\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/comment.setting.route.js",
    "groupTitle": "CommentSetting"
  },
  {
    "type": "put",
    "url": "/api/commentsetting/:commentSettingId",
    "title": "Updates existing comment setting Information object",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateCommentSetting",
    "group": "CommentSetting",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "commentSettingId",
            "description": "<p>object id of the comment setting data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"commentSettingId\": \"5790a9adcd8a624a755441a1\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates existing comment setting information to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-v \\\n-X PUT \\\nhttp://localhost:3000/api/commentsetting/5790a9adcd8a624a755441a1 \\\n-H 'Content-Type: application/json' \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTA5ODI4MiwiZXhwIjoxNDY5MTE4MjgyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wMoAkOzuqlE90acOSV6NLhyPRJHAii40iNCzSUx_33Sj7Nc5SfEjEDYI-qeuIkB_W22b_NhAN9yR0eGLM2oZLg' \\\n-d '{\"disqusUsername\":\"shrawan-lakhe\",\"disqusURL\":\"shrawan.com.np\",\"disqusApiKey\":\"EEEEE1225649LOIkdie1569URYRI\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>comment setting updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"comment setting updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Url associated with the disqus account is required.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\":\"Disqus URL is required\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/comment.setting.route.js",
    "groupTitle": "CommentSetting"
  },
  {
    "type": "get",
    "url": "/api/confirm/user/:userConfirmationToken",
    "title": "Confirm user registration by clicking the registration link",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "confirmUserRegistration",
    "group": "Confirmuserregistration",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userConfirmationToken",
            "description": "<p>hashed confirmation token sent to the email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"userConfirmationToken\": \"c69dfe42cb583cfdea47663d6c45bc1110a5\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Redirect the user to login route</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 302 Page Redirection\n    Redirects the user to the login route",
          "type": "json"
        }
      ]
    },
    "description": "<p>Confirm the user registration by clicking on the registration link on the email sent to the user</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/confirm/user/c69dfe42cb583cfdea47663d6c45bc1110a5\"",
        "type": "curl"
      }
    ],
    "error": {
      "fields": {
        "Expired": [
          {
            "group": "Expired",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Redirect the user to token-expired route</p>"
          }
        ],
        "AlreadyConfirmed": [
          {
            "group": "AlreadyConfirmed",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Redirect the user to login route</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Redirect the user to page not found route</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 302 Page Redirection\n    Redirects the user to the token-expired route",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 302 Page Redirection\n    Redirects the user to the login route",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 302 Page Redirection\n   Redirects the user to Page Not Found route",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/user.confirmation.route.js",
    "groupTitle": "Confirmuserregistration"
  },
  {
    "type": "get",
    "url": "/api/contact/info/:contactId",
    "title": "Get contact object Information by id",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getContactInfoByID",
    "group": "Contacts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contactId",
            "description": "<p>object id of contact data (as querystring values)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"contactId\": \"578a55e60fe506eb169d74c1\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the contact object information by id  if exists, else return not found message</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-i http://localhost:3000/api/contact/info/578a55e60fe506eb169d74c1/ \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODY4MzQ1MywiZXhwIjoxNDY4NzAzNDUzLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.g7U5Rt-PPiukk3lJnhFM72ER_Peamk2oDMxGY3KWm1tCemJJt-x4CiDkCSkwMAuoRT2KVDNw7BYwY5zva7IPSw\" \\",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of the client contact data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<p>fullname of client.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email id of client.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contactNumber",
            "description": "<p>contact number of client.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "organizationName",
            "description": "<p>organization name that client works on.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message content from client.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addedOn",
            "description": "<p>Date of contact info registration process.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "informationSource",
            "description": "<p>source from which people came to know about organization.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"_id\": \"578a55e60fe506eb169d74c1\",\n      \"message\": \"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\",\n      \"organizationName\": \"BitsBeat\",\n      \"contactNumber\": \"977-9818278372\",\n      \"email\": \"shrawanlakhe@hotmail.com\",\n      \"fullName\": \"Shrawan Lakhe\",\n      \"addedOn\": \"2016-07-16T15:42:30.804Z\",\n      \"informationSource\": \"none\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Contact not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Contact not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/contact.route.js",
    "groupTitle": "Contacts"
  },
  {
    "type": "get",
    "url": "/api/contact/info/",
    "title": "Get contact list Information",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getContactList",
    "group": "Contacts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "perpage",
            "description": "<p>Number of data to return on each request (as querystring values)</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": "<p>Current page number of pagination system. (as querystring values)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<p>name of client(as querystring values)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"perpage\": 10,\n  \"page\": 1\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n  \"fullName\": \"Shrawan Lakhe\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the contact list  if exists, else return empty array</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/contact/info\" \\\n--data-urlencode \"perpage=10\" \\\n--data-urlencode \"page=1\" \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODczOTk2MywiZXhwIjoxNDY4NzU5OTYzLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.DOvJ_SUERBGG0z1x_5x4STQRU3KX4XBK1EF81BawyTlmWXlz5ZI55dCTWB5yHbL_1mXtvmYTAhHroXnHIBCxWA\"",
        "type": "curl"
      },
      {
        "title": "Example usage:",
        "content": "curl \\\n -G \\\n-v \\\n\"http://localhost:3000/api/contact/info\" \\\n--data-urlencode \"fullName=Shrawan Lakhe\" \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODczOTk2MywiZXhwIjoxNDY4NzU5OTYzLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.DOvJ_SUERBGG0z1x_5x4STQRU3KX4XBK1EF81BawyTlmWXlz5ZI55dCTWB5yHbL_1mXtvmYTAhHroXnHIBCxWA\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList",
            "description": "<p>list of contacts information of various clients</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList._id",
            "description": "<p>object id of the client contact data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.fullName",
            "description": "<p>fullname of client.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.email",
            "description": "<p>email id of client.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.contactNumber",
            "description": "<p>contact number of client.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.organizationName",
            "description": "<p>organization name that client works on.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.message",
            "description": "<p>message content from client.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.addedOn",
            "description": "<p>Date of contact info registration process.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.informationSource",
            "description": "<p>source from which people came to know about organization.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "totalItems",
            "description": "<p>total no of items that the Contact collection currently has.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "currentPage",
            "description": "<p>current page number of the pagination system.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"dataList\": [\n          {\n              \"_id\": \"578a55e60fe506eb169d74c1\",\n              \"message\": \"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\",\n              \"organizationName\": \"BitsBeat\",\n              \"contactNumber\": \"977-9818278372\",\n              \"email\": \"shrawanlakhe@hotmail.com\",\n              \"fullName\": \"Shrawan Lakhe\",\n             \"addedOn\": \"2016-07-16T15:42:30.804Z\",\n              \"informationSource\": \"none\"\n          }\n     ],\n      \"totalItems\": 1,\n      \"currentPage\": 1\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Contact not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Contact not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/contact.route.js",
    "groupTitle": "Contacts"
  },
  {
    "type": "patch",
    "url": "/api/contact/info/:contactId",
    "title": "deletes contact data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "patchContactInfo",
    "group": "Contacts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contactId",
            "description": "<p>object id of contact data (as querystring values)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"contactId\": \"578a55e60fe506eb169d74c1\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>deletes client information from the collection</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PATCH \\\nhttp://localhost:3000/api/contact/info/578a60f19dcbc1be2a085612 \\\n-H 'Content-Type: application/json' \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODY4NzAxMywiZXhwIjoxNDY4NzA3MDEzLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.bGhsp30IRh5C7_YjUuGoODnNBBXDzQUHVqjXEQ3X45KkbDoYlknr_xFvetiJmOzmRmI4VtZvIn1ugeP2VxZ4Wg'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Contact deleted successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Contact deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/contact.route.js",
    "groupTitle": "Contacts"
  },
  {
    "type": "post",
    "url": "/api/contact/info/",
    "title": "Post contact data",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "postContactInfo",
    "group": "Contacts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<p>Mandatory  fullname of client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Mandatory  email id of client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mandatory  message content from client.</p>"
          }
        ]
      }
    },
    "description": "<p>saves interested client information along with the message</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X POST \\\nhttp://localhost:3000/api/contact/info/ \\\n-H 'Content-Type: application/json' \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODMxNjg4MiwiZXhwIjoxNDY4MzM2ODgyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.agd70Nk8y4bcORqzQP4eTSZW_3lN9TpC9zIpKM5j98RkNqS43qVPRQyN3DfRS6CKblHyvYASisvQGpCvJSyfgw' \\\n-d '{\"fullName\":\"Shrawan Lakhe\",\"email\":\"shrawanlakhey@gmail.com\",\"contactNumber\":\"98152655999888\",\"organizationName\":\"BitsBeat\",\"informationSource\":\"none\",\"message\":\"hello hi \"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Contact registered successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Contact registered successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>Validation Error due to either invalid data entry or not entering value for required fields</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": [{\"param\":\"fullName\",\"msg\":\"Full name is required\",\"value\":\"\"},\n  {\"param\":\"email\",\"msg\":\"Invalid email ID\",\"value\":\"shrawanlakhe\"}]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/contact.route.js",
    "groupTitle": "Contacts"
  },
  {
    "type": "get",
    "url": "/api/emailservice/",
    "title": "Get Email Service Setting Configuration Info",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getMailServiceConfig",
    "group": "EmailServiceSetting",
    "description": "<p>Retrieves the Email Service setting Information Object if exists, else return empty object</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/api/emailservice",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of the email service configuration data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "serviceProviderType",
            "description": "<p>Type of Email service Providers.  Email Service Providers can be any one of -  'mailgun', 'postmark', 'mandrill', 'sendgrid', 'amazon' or 'normal' email sending mechanism using google smtp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "host",
            "description": "<p>hostname or IP address to connect to (defaults to 'localhost'). for [normal smtp]</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "port",
            "description": "<p>port to connect to (defaults to 25 or 465). for [normal smtp]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "authUserName",
            "description": "<p>authentication username, mainly google email address for google smtp. for [normal smtp]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "authPassword",
            "description": "<p>password for the gmail account or user. for [normal smtp]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "api_Key",
            "description": "<p>secret unique key to access the email service provider api. needed for [mandrill, mailgun, Amazon, sendGrid, postmark]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "api_Secret",
            "description": "<p>secret unique key to access the email service provider api.needed for [Amaazon;]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "api_User",
            "description": "<p>username of the user registered in  the email service provider user database.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "domain",
            "description": "<p>domain name of the email service provider. [mailgun]</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "addedOn",
            "description": "<p>date at which email service configuration is saved.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rateLimit",
            "description": "<p>limits the message count to be sent in a second (defaults to false)   -    available only if pool is set to true. needed for [Amazon ses]</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "pool",
            "description": "<p>if set to true uses pooled connections (defaults to false), otherwise creates a new connection for every e-mail.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "secure",
            "description": "<p>if true the connection will only use TLS. If false (the default), TLS may still be upgraded to if available via the STARTTLS command. for [normal smtp]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n  {\n    \"_id\": \"57357eb98b22c55e361176a2\",\n    \"serviceProviderType\": \"mailgun\",\n    \"host\": \"smtp.gmail.com\",\n    \"port\": 8000,\n   \"authUserName\": \"shrawanlakhey@gmail.com\",\n    \"authPassword\": \"lakdehe@123\",\n    \"api_Key\": \"key-dfsew\",\n    \"api_Secret\": \"api-fdsfsd\",\n    \"api_User\": \"shrawan\",\n    \"domain\": \"sandbox73ad601fcdd74461b1c46820a59b2374.mailgun.org\",\n    \"addedOn\": \"2016-05-13T07:14:01.496Z\",\n    \"rateLimit\": 300,\n    \"pool\": false,\n    \"secure\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Email service configuration not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Email service configuration not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/email.service.configure.route.js",
    "groupTitle": "EmailServiceSetting"
  },
  {
    "type": "get",
    "url": "/api/emailservice/:mailServiceConfigId",
    "title": "Get Email Service Setting Configuration Info by id",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getMailServiceConfigByID",
    "group": "EmailServiceSetting",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mailServiceConfigId",
            "description": "<p>object id of the email service data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"mailServiceConfigId\": \"57889ae9585d9632523f1234\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the Email Service setting Information Object by id if exists, else return empty object</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/api/emailservice/57357eb98b22c55e361176a2 \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODMxNjg4MiwiZXhwIjoxNDY4MzM2ODgyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.agd70Nk8y4bcORqzQP4eTSZW_3lN9TpC9zIpKM5j98RkNqS43qVPRQyN3DfRS6CKblHyvYASisvQGpCvJSyfgw'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of the email service configuration data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "serviceProviderType",
            "description": "<p>Type of Email service Providers.  Email Service Providers can be any one of -  'mailgun', 'postmark', 'mandrill', 'sendgrid', 'amazon' or 'normal' email sending mechanism using google smtp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "host",
            "description": "<p>hostname or IP address to connect to (defaults to 'localhost'). for [normal smtp]</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "port",
            "description": "<p>port to connect to (defaults to 25 or 465). for [normal smtp]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "authUserName",
            "description": "<p>authentication username, mainly google email address for google smtp. for [normal smtp]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "authPassword",
            "description": "<p>password for the gmail account or user. for [normal smtp]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "api_Key",
            "description": "<p>secret unique key to access the email service provider api. needed for [mandrill, mailgun, Amazon, sendGrid, postmark]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "api_Secret",
            "description": "<p>secret unique key to access the email service provider api.needed for [Amaazon;]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "api_User",
            "description": "<p>username of the user registered in  the email service provider user database.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "domain",
            "description": "<p>domain name of the email service provider. [mailgun]</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "addedOn",
            "description": "<p>date at which email service configuration is saved.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rateLimit",
            "description": "<p>limits the message count to be sent in a second (defaults to false)   -    available only if pool is set to true. needed for [Amazon ses]</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "pool",
            "description": "<p>if set to true uses pooled connections (defaults to false), otherwise creates a new connection for every e-mail.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "secure",
            "description": "<p>if true the connection will only use TLS. If false (the default), TLS may still be upgraded to if available via the STARTTLS command. for [normal smtp]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n  {\n    \"_id\": \"57357eb98b22c55e361176a2\",\n    \"serviceProviderType\": \"mailgun\",\n    \"host\": \"smtp.gmail.com\",\n    \"port\": 8000,\n   \"authUserName\": \"shrawanlakhey@gmail.com\",\n    \"authPassword\": \"lakdehe@123\",\n    \"api_Key\": \"key-dfsew\",\n    \"api_Secret\": \"api-fdsfsd\",\n    \"api_User\": \"shrawan\",\n    \"domain\": \"sandbox73ad601fcdd74461b1c46820a59b2374.mailgun.org\",\n    \"addedOn\": \"2016-05-13T07:14:01.496Z\",\n    \"rateLimit\": 300,\n    \"pool\": false,\n    \"secure\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Email service configuration not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Email service configuration not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/email.service.configure.route.js",
    "groupTitle": "EmailServiceSetting"
  },
  {
    "type": "post",
    "url": "/api/emailservice/",
    "title": "Post Email Service Configuration Info",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postMailServiceConfig",
    "group": "EmailServiceSetting",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Mandatory",
            "description": "<p>serviceProviderType Type of Email service Providers.  Email Service Providers can be any one of -  'mailgun', 'postmark', 'mandrill', 'sendgrid', 'amazon' or 'normal' email sending mechanism using google smtp</p>"
          }
        ]
      }
    },
    "description": "<p>saves email service configuration setting information to the database so that we can send email to our users</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\ncurl \\\n-v \\\n-X POST \\\nhttp://localhost:3000/api/emailservice \\\n-H 'Content-Type: application/json' \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODUzMzgzMiwiZXhwIjoxNDY4NTUzODMyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.bmHC9pUtN1aOZUOc62nNfywggLBUfpLhs0CyMuunhEpVJq4WLYZ7fcr2Ap8xn0WYL_yODPPuSYGIFZ8uk4nilA' \\\n-d '{\"serviceProviderType\":\"mailgun\",\"domain\":\"www.mailgun.com\",\"api_Key\":\"helloapikey123456\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Email service configuration saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Email service configuration saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Email Service setting configuration already exists, only can update existing data. new inserts is not allowed</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>Email service configuration setting post method throws error if serviceProviderType, is not provided or invalid data entry for host, port authUserName, domain and rateLimit</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"You can only update email service configuration setting\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"[{\"param\":\"serviceProviderType\",\"msg\":\"Email service provider is required\",\"value\":\"\"},{\"param\":\"domain\",\"msg\":\"Invalid domain\",\"value\":\"www.\"}]\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/email.service.configure.route.js",
    "groupTitle": "EmailServiceSetting"
  },
  {
    "type": "put",
    "url": "/api/emailservice/:mailServiceConfigId",
    "title": "Updates Email Service Configuration Info",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateMailService",
    "group": "EmailServiceSetting",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mailServiceConfigId",
            "description": "<p>object id of the email service data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"mailServiceConfigId\": \"57889ae9585d9632523f1234\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates existing email service configuration setting information to the database so that we can send email to our users</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\ncurl \\\n-v \\\n-X PUT \\\nhttp://localhost:3000/api/emailservice/5788105fd519f49e17f0579f \\\n-H 'Content-Type: application/json' \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODUzMzgzMiwiZXhwIjoxNDY4NTUzODMyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.bmHC9pUtN1aOZUOc62nNfywggLBUfpLhs0CyMuunhEpVJq4WLYZ7fcr2Ap8xn0WYL_yODPPuSYGIFZ8uk4nilA' \\\n-d '{\"serviceProviderType\":\"postmark\",\"domain\":\"www.mailgun.com\",\"api_Key\":\"helloapikey123456\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Email service configuration updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Email service configuration updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>Email service configuration setting put method throws error if serviceProviderType, is not provided or invalid data entry for host, port authUserName, domain and rateLimit</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"[{\"param\":\"serviceProviderType\",\"msg\":\"Email service provider is required\",\"value\":\"\"},{\"param\":\"domain\",\"msg\":\"Invalid domain\",\"value\":\"www.\"}]\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/email.service.configure.route.js",
    "groupTitle": "EmailServiceSetting"
  },
  {
    "type": "get",
    "url": "/api/emailtemplate/:templateId",
    "title": "Get Email template object by providing id",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getEmailTemplateDataByID",
    "group": "EmailTemplate",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "templateId",
            "description": "<p>object id of the email template data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"templateId\": \"57889ae9585d9632523f1234\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the email template object by id if exists, else return empty object</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/api/emailtemplate/577e875a609df04d3a72cace",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id for email template object.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "emailFrom",
            "description": "<p>Email account of the sender</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "emailSubject",
            "description": "<p>Subject of email.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "templateBody",
            "description": "<p>Email template content.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "templateName",
            "description": "<p>name of the template so that we can check for duplicacy.  This needs to be unique</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "addedOn",
            "description": "<p>entry date of data entry.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>email template is active or not</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "attachmentAvailabilityStatus",
            "description": "<p>status of the attachment for this current template  while sending email.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"_id\": \"577e875a609df04d3a72cace\",\n          \"templateBody\": \"<div class=\\\"container\\\"><h2>Email to confirm change of your account password.</h2><p>This email is sent to you to confirm your password change action.If you did not request for password change,please ignore this email.</p><br /><p>Please click below link to confirm your password change action:</p><br /><br /><p>{{ passwordChange.message }}</p></div>\",\n         \"emailFrom\": \"shrawanlakhey@gmail.com\",\n          \"emailSubject\": \"Email to Verify password Change action\",\n          \"templateName\": \"user-password-change-confirmation\",\n          \"addedOn\": \"2016-07-07T16:46:18.152Z\",\n          \"active\": true,\n          \"attachmentAvailabilityStatus\": true\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Email template not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Email template not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/email.template.route.js",
    "groupTitle": "EmailTemplate"
  },
  {
    "type": "get",
    "url": "/api/emailtemplate/",
    "title": "Get Email template list",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getEmailTemplates",
    "group": "EmailTemplate",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "perpage",
            "description": "<p>no of items to show per page (as querystring values)</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": "<p>current page of the pagination system (as querystring values)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"perpage\": 10,\n  \"page\": 2\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the email template list if exists, else return empty list</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/emailtemplate\" \\\n--data-urlencode \"perpage=10\" \\\n--data-urlencode \"page=1\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dataList",
            "description": "<p>list of email templates returned .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList._id",
            "description": "<p>object id for email template object.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.emailFrom",
            "description": "<p>Email account of the sender</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.emailSubject",
            "description": "<p>Subject of email.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.templateBody",
            "description": "<p>Email template content.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.templateName",
            "description": "<p>name of the template so that we can check for duplicacy.  This needs to be unique</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "dataList.addedOn",
            "description": "<p>entry date of data entry.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "dataList.active",
            "description": "<p>email template is active or not</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "dataList.attachmentAvailabilityStatus",
            "description": "<p>status of the attachment for this current template  while sending email.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "totalItems",
            "description": "<p>total no of email templates returned.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "currentPage",
            "description": "<p>current page of pagination.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n  {\n    \"dataList\": [\n        {\n            \"_id\": \"577e875a609df04d3a72cace\",\n            \"templateBody\": \"<div class=\\\"container\\\"><h2>Email to confirm change of your account password.</h2><p>This email is sent to you to confirm your password change action.If you did not request for password change,please ignore this email.</p><br /><p>Please click below link to confirm your password change action:</p><br /><br /><p>{{ passwordChange.message }}</p></div>\",\n           \"emailFrom\": \"shrawanlakhey@gmail.com\",\n            \"emailSubject\": \"Email to Verify password Change action\",\n            \"templateName\": \"user-password-change-confirmation\",\n            \"addedOn\": \"2016-07-07T16:46:18.152Z\",\n            \"active\": true,\n            \"attachmentAvailabilityStatus\": true\n        }\n    ],\n    \"totalItems\": 1,\n    \"currentPage\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Email template not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Email template not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/email.template.route.js",
    "groupTitle": "EmailTemplate"
  },
  {
    "type": "patch",
    "url": "/api/emailtemplate/:templateId",
    "title": "Deletes existing Email Template data.",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "patchEmailTemplateData",
    "group": "EmailTemplate",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "templateId",
            "description": "<p>object id of the email template data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"templateId\": \"57889ae9585d9632523f1234\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Deletes existing email template data</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-v \\\n-X PATCH \\\nhttp://localhost:3000/api/emailtemplate/578889f04a576949341aa6f9 \\\n-H 'Content-Type: application/json' \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODU2NTkyNywiZXhwIjoxNDY4NTg1OTI3LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.stPsYMnC4x_wwEHKZYcoz0TkSTiu2lgry9H7Icv2EJp769YADZbxmxnFKC4LAcuBLTHs052__A-6Q5OUbO-bUA'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Email template deleted successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Email template deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/email.template.route.js",
    "groupTitle": "EmailTemplate"
  },
  {
    "type": "post",
    "url": "/api/emailtemplate/",
    "title": "Post Email Template information.",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postEmailTemplate",
    "group": "EmailTemplate",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "templateName",
            "description": "<p>Mandatory name of the template so that we can check for duplicacy.  This needs to be unique</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "emailSubject",
            "description": "<p>Mandatory Subject of email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "emailFrom",
            "description": "<p>Mandatory Email account of the sender</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "templateBody",
            "description": "<p>Mandatory Email template content.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Email template saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Email template saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "description": "<p>saves email template to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-v \\\n-X POST \\\nhttp://localhost:3000/api/emailtemplate \\\n-H 'Content-Type: application/json' \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODU2NTkyNywiZXhwIjoxNDY4NTg1OTI3LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.stPsYMnC4x_wwEHKZYcoz0TkSTiu2lgry9H7Icv2EJp769YADZbxmxnFKC4LAcuBLTHs052__A-6Q5OUbO-bUA' \\\n-d '{\"templateName\":\"user-registration-confirmation-4-ok\",\"emailSubject\":\"User Registration Confirmation Email to Confirm Users\",\"emailFrom\":\"shrawanlakhey@gmail.com\",\"templateBody\":\"hello user\"}'",
        "type": "curl"
      }
    ],
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Email template saved with templateName matching  previously saved data's templateName throws this error</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>Email Template post method throws error if either of templateName, emailSubject, emailFrom and templateBody is not provided or emailFrom is invalid data or email</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"Email template with same title already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"[{\"param\":\"templateName\",\"msg\":\"Email template title is required\",\"value\":\"\"},{\"param\":\"emailSubject\",\"msg\":\"Subject of email is required\",\"value\":\"\"}]\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/email.template.route.js",
    "groupTitle": "EmailTemplate"
  },
  {
    "type": "put",
    "url": "/api/emailtemplate/:templateId",
    "title": "Update existing Email Template information.",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateEmailTemplateData",
    "group": "EmailTemplate",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "templateId",
            "description": "<p>object id of the email template data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"templateId\": \"57889ae9585d9632523f1234\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>updates existing email template information to replace old data with new data</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-v \\\n-X PUT \\\nhttp://localhost:3000/api/emailtemplate/578889f04a576949341aa6f9 \\\n-H 'Content-Type: application/json' \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODU2NTkyNywiZXhwIjoxNDY4NTg1OTI3LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.stPsYMnC4x_wwEHKZYcoz0TkSTiu2lgry9H7Icv2EJp769YADZbxmxnFKC4LAcuBLTHs052__A-6Q5OUbO-bUA' \\\n-d '{\"templateName\":\"user-registration-confirmation-4-ok-2\",\"emailSubject\":\"User Registration Confirmation Email to Confirm Users\",\"emailFrom\":\"shrawanlakhey@gmail.com\",\"templateBody\":\"hello user\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Email template updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Email template updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Email template saved with already existing previously saved data's templateName throws this error</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>Email Template put method throws error if either of templateName, emailSubject, emailFrom and templateBody is not provided or emailFrom is invalid data or email</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"Email template with same title already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"[{\"param\":\"templateName\",\"msg\":\"Email template title is required\",\"value\":\"\"},{\"param\":\"emailSubject\",\"msg\":\"Subject of email is required\",\"value\":\"\"}]\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/email.template.route.js",
    "groupTitle": "EmailTemplate"
  },
  {
    "type": "put",
    "url": "/api/error/:errorLogId",
    "title": "Deletes the error log data by Id",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "deleteErrorLog",
    "group": "ErrorLog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "errorLogId",
            "description": "<p>object id of the error log data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"errorLogId\": \"579712af491a529b5f7d30de\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Deletes existing error log data by object Id</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-v \\\n-X PUT \\\nhttp://localhost:3000/api/error/579712af491a529b5f7d30de \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJ0ZXN0bm9kZWNtc0BnbWFpbC5jb20iLCJlbWFpbCI6InRlc3Rub2RlY21zQGdtYWlsLmNvbSIsInVzZXJSb2xlIjoiYWRtaW4iLCJhZGRlZE9uIjoiMjAxNi0wNy0yNFQxNDoyMjoxNy45MTNaIiwidHdvRmFjdG9yQXV0aEVuYWJsZWQiOmZhbHNlfSwiY2xhaW1zIjp7InN1YmplY3QiOiI1Nzk0Y2YxOTk4MDFmMzFjMGRkYmY5MDciLCJpc3N1ZXIiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJwZXJtaXNzaW9ucyI6WyJzYXZlIiwidXBkYXRlIiwicmVhZCIsImRlbGV0ZSJdfSwiaWF0IjoxNDY5NTE4Nzg3LCJleHAiOjE0Njk2MDUxODcsImlzcyI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyJ9.18Pr3N71Ard5MB_0qK4e1RpyA36LOz2Y64RC9i1T7rQLUqULZbEpwKIQ9qrNX8hY1n5FvVzAnhL2g5AeAr_dtA'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error Log deleted successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Error Log deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied or failed</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/error.log.route.js",
    "groupTitle": "ErrorLog"
  },
  {
    "type": "put",
    "url": "/api/errordeleteall/",
    "title": "Deletes all the existing error logs from the collection",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "deleteErrorLog",
    "group": "ErrorLog",
    "description": "<p>Deletes all the existing error logs from the collection</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-v \\\n-X PUT \\\nhttp://localhost:3000/api/errordeleteall \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJ0ZXN0bm9kZWNtc0BnbWFpbC5jb20iLCJlbWFpbCI6InRlc3Rub2RlY21zQGdtYWlsLmNvbSIsInVzZXJSb2xlIjoiYWRtaW4iLCJhZGRlZE9uIjoiMjAxNi0wNy0yNFQxNDoyMjoxNy45MTNaIiwidHdvRmFjdG9yQXV0aEVuYWJsZWQiOmZhbHNlfSwiY2xhaW1zIjp7InN1YmplY3QiOiI1Nzk0Y2YxOTk4MDFmMzFjMGRkYmY5MDciLCJpc3N1ZXIiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJwZXJtaXNzaW9ucyI6WyJzYXZlIiwidXBkYXRlIiwicmVhZCIsImRlbGV0ZSJdfSwiaWF0IjoxNDY5NTE4Nzg3LCJleHAiOjE0Njk2MDUxODcsImlzcyI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyJ9.18Pr3N71Ard5MB_0qK4e1RpyA36LOz2Y64RC9i1T7rQLUqULZbEpwKIQ9qrNX8hY1n5FvVzAnhL2g5AeAr_dtA'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error Log deleted successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Error Log deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied or token was not verified</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/error.log.route.js",
    "groupTitle": "ErrorLog"
  },
  {
    "type": "get",
    "url": "/api/error/",
    "title": "Get error logs list",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getErrorLogs",
    "group": "ErrorLog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "perpage",
            "description": "<p>no of items to show per page (as querystring values)</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": "<p>current page of the pagination system (as querystring values)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "startdate",
            "description": "<p>initial date of the search query (from)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "enddate",
            "description": "<p>final date of the search query (upto)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"perpage\": 10,\n  \"page\": 1\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n  \"perpage\": 10,\n  \"page\": 1,\n  \"startdate\": \"2016-07-25\",\n  \"enddate\": \"2016-07-27\"\n\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the error logs list if exists, else return empty list</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/error\" \\\n--data-urlencode \"perpage=10\" \\\n--data-urlencode \"page=1\" \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJ0ZXN0bm9kZWNtc0BnbWFpbC5jb20iLCJlbWFpbCI6InRlc3Rub2RlY21zQGdtYWlsLmNvbSIsInVzZXJSb2xlIjoiYWRtaW4iLCJhZGRlZE9uIjoiMjAxNi0wNy0yNFQxNDoyMjoxNy45MTNaIiwidHdvRmFjdG9yQXV0aEVuYWJsZWQiOmZhbHNlfSwiY2xhaW1zIjp7InN1YmplY3QiOiI1Nzk0Y2YxOTk4MDFmMzFjMGRkYmY5MDciLCJpc3N1ZXIiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJwZXJtaXNzaW9ucyI6WyJzYXZlIiwidXBkYXRlIiwicmVhZCIsImRlbGV0ZSJdfSwiaWF0IjoxNDY5NTIwNTkxLCJleHAiOjE0Njk2MDY5OTEsImlzcyI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyJ9.JaWwuX9n0jFYefBpXYF76qw365lMpEw7uYPsPBi53egGxVlA9vF7sbnpIm-TwBiFGolYdeHwPQqzzX_gIw8vVQ'",
        "type": "curl"
      },
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/error\" \\\n--data-urlencode \"perpage=10\" \\\n--data-urlencode \"page=1\" \\\n--data-urlencode \"startdate=2016-07-26\" \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJ0ZXN0bm9kZWNtc0BnbWFpbC5jb20iLCJlbWFpbCI6InRlc3Rub2RlY21zQGdtYWlsLmNvbSIsInVzZXJSb2xlIjoiYWRtaW4iLCJhZGRlZE9uIjoiMjAxNi0wNy0yNFQxNDoyMjoxNy45MTNaIiwidHdvRmFjdG9yQXV0aEVuYWJsZWQiOmZhbHNlfSwiY2xhaW1zIjp7InN1YmplY3QiOiI1Nzk0Y2YxOTk4MDFmMzFjMGRkYmY5MDciLCJpc3N1ZXIiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJwZXJtaXNzaW9ucyI6WyJzYXZlIiwidXBkYXRlIiwicmVhZCIsImRlbGV0ZSJdfSwiaWF0IjoxNDY5NTIwNTkxLCJleHAiOjE0Njk2MDY5OTEsImlzcyI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyJ9.JaWwuX9n0jFYefBpXYF76qw365lMpEw7uYPsPBi53egGxVlA9vF7sbnpIm-TwBiFGolYdeHwPQqzzX_gIw8vVQ'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dataList",
            "description": "<p>list of error logs returned .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList._id",
            "description": "<p>object id for error logs data object.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.errorType",
            "description": "<p>type of error or exception</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.errorStack",
            "description": "<p>detailed description or brief summary or title of error</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.errorMessage",
            "description": "<p>detailed description of error</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "dataList.addedOn",
            "description": "<p>date on which error is logged.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "dataList.errorNotified",
            "description": "<p>status of the notfication of the error logs to the development team</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "totalItems",
            "description": "<p>total no of error logs returned.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "currentPage",
            "description": "<p>current page of pagination.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"dataList\": [\n          {\n              \"_id\": \"57971aa84eb28c06732485e6\",\n              \"errorType\": \"Error\",\n              \"errorStack\": \"Error: getaddrinfo ENOTFOUND accounts.google.com accounts.google.com:443\\n    at errnoException (dns.js:26:10)\\n    at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:77:26)\",\n              \"errorMessage\": \"getaddrinfo ENOTFOUND accounts.google.com accounts.google.com:443\",\n              \"addedOn\": \"2016-07-26T08:09:12.204Z\",\n              \"errorNotified\": false\n          }\n      ],\n      \"totalItems\": 1,\n      \"currentPage\": 1\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied or failed</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Errors logs not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Errors not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/error.log.route.js",
    "groupTitle": "ErrorLog"
  },
  {
    "type": "put",
    "url": "/api/log/notify/error/",
    "title": "Notify the software development team of the error logs",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "sendNotificationEmailToSolveErrors",
    "group": "ErrorLog",
    "description": "<p>Notify the software development team of the error logs generated so that they can analyzed the error logs and fix those potential bugs in future releases</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\ncurl \\\n-v \\\n-X PUT \\\nhttp://localhost:3000/api/log/notify/error/ \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJ0ZXN0bm9kZWNtc0BnbWFpbC5jb20iLCJlbWFpbCI6InRlc3Rub2RlY21zQGdtYWlsLmNvbSIsInVzZXJSb2xlIjoiYWRtaW4iLCJhZGRlZE9uIjoiMjAxNi0wNy0yNFQxNDoyMjoxNy45MTNaIiwidHdvRmFjdG9yQXV0aEVuYWJsZWQiOmZhbHNlfSwiY2xhaW1zIjp7InN1YmplY3QiOiI1Nzk0Y2YxOTk4MDFmMzFjMGRkYmY5MDciLCJpc3N1ZXIiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJwZXJtaXNzaW9ucyI6WyJzYXZlIiwidXBkYXRlIiwicmVhZCIsImRlbGV0ZSJdfSwiaWF0IjoxNDY5NTE4Nzg3LCJleHAiOjE0Njk2MDUxODcsImlzcyI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyJ9.18Pr3N71Ard5MB_0qK4e1RpyA36LOz2Y64RC9i1T7rQLUqULZbEpwKIQ9qrNX8hY1n5FvVzAnhL2g5AeAr_dtA'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Email containing error logs sent successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Email containing error logs sent successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied or token was not verified</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>All the error logs are already reported.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"All the error logs are already reported.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/error.log.route.js",
    "groupTitle": "ErrorLog"
  },
  {
    "type": "get",
    "url": "/api/event/info/",
    "title": "Get events list",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getAllEvents",
    "group": "EventManager",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>whether to get data with active bit true or false, if true, then returns data list with active bit set to true only</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "perpage",
            "description": "<p>Number of data to return on each request</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": "<p>Current page number of pagination system.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "eventTitle",
            "description": "<p>to filter events list using event title as filter param</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"perpage\": 10,\n  \"page\": 1\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n  \"active\": true,\n  \"eventTitle\": \"search event list by this title\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the events list if exists, else return empty array</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/event/info\" \\\n--data-urlencode \"perpage=10\" \\\n--data-urlencode \"page=1\"",
        "type": "curl"
      },
      {
        "title": "Example usage:",
        "content": "\ncurl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/event/info\" \\\n--data-urlencode \"active=true\" \\\n--data-urlencode \"eventTitle=Blood Donation Program\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dataList",
            "description": "<p>list of events</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList._id",
            "description": "<p>object id of event data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.imageName",
            "description": "<p>name of the image file uploaded.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.venueAddress",
            "description": "<p>address of  event venue.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.venue",
            "description": "<p>place where event will be hosted.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.eventDescription",
            "description": "<p>detail about event.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.urlSlog",
            "description": "<p>clearn url for event title.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.eventTitle",
            "description": "<p>title for event.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "dataList.active",
            "description": "<p>active bit status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.endDate",
            "description": "<p>date and time of event ending.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.startDate",
            "description": "<p>date and time of event starting.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "totalItems",
            "description": "<p>total no of events in the event collection in database.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "currentPage",
            "description": "<p>current page number of client pagination system.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"dataList\": [\n          {\n              \"_id\": \"5789bebf57633dcd16a2aea4\",\n              \"imageName\": \"event-1468645054960.webp\",\n              \"venueAddress\": \"Kathmandu, Nepal\",\n              \"venue\": \"Red Cross Building\",\n              \"eventDescription\": \"Please donate blood and help the blood donation program in any way you can\",\n              \"urlSlog\": \"blood-donation-program\",\n              \"eventTitle\": \"Blood Donation Program\",\n              \"active\": true,\n             \"endDate\": \"2016-07-17T05:14:00.000Z\",\n              \"startDate\": \"2016-07-16T08:11:00.000Z\"\n          }\n      ],\n      \"totalItems\": 1,\n      \"currentPage\": 1\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Event not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Event not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/event.management.route.js",
    "groupTitle": "EventManager"
  },
  {
    "type": "get",
    "url": "/api/event/info/:eventId",
    "title": "Get event by Id",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getEventByID",
    "group": "EventManager",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "eventId",
            "description": "<p>object id for event data as filter param</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"eventId\": \"5789bebf57633dcd16a2aea4\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the events info by using event id to filter data if exists, else return empty object</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/api/event/info/5789bebf57633dcd16a2aea4",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of event data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageName",
            "description": "<p>name of the image file uploaded.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "venueAddress",
            "description": "<p>address of  event venue.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "venue",
            "description": "<p>place where event will be hosted.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "eventDescription",
            "description": "<p>detail about event.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "urlSlog",
            "description": "<p>clearn url for event title.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "eventTitle",
            "description": "<p>title for event.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>active bit status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>date and time of event ending.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>date and time of event starting.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "imageProperties",
            "description": "<p>meta data of image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imageExtension",
            "description": "<p>extension image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imagePath",
            "description": "<p>location path of image file.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"_id\": \"5789bebf57633dcd16a2aea4\",\n      \"imageName\": \"event-1468645054960.webp\",\n      \"venueAddress\": \"Kathmandu, Nepal\",\n      \"venue\": \"Red Cross Building\",\n      \"eventDescription\": \"Please donate blood and help the blood donation program in any way you can\",\n      \"urlSlog\": \"blood-donation-program\",\n      \"eventTitle\": \"Blood Donation Program\",\n      \"active\": true,\n      \"imageProperties\": {\n          \"imageExtension\": \"jpg\",\n          \"imagePath\": \"public/uploads/images/events/event-1468645054960.jpg\"\n      },\n      \"endDate\": \"2016-07-17T05:14:00.000Z\",\n      \"startDate\": \"2016-07-16T08:11:00.000Z\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Event not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Event not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/event.management.route.js",
    "groupTitle": "EventManager"
  },
  {
    "type": "patch",
    "url": "/api/event/info/:eventId",
    "title": "delete existing event data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "patchEvent",
    "group": "EventManager",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "eventId",
            "description": "<p>object id for event data as filter param</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"eventId\": \"5789bebf57633dcd16a2aea4\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>deletes existing event information from the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PATCH  \\\nhttp://localhost:3000/api/event/info/5789c96dae6875bb2d080eb4 \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODY0NzI1NSwiZXhwIjoxNDY4NjY3MjU1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.ijpe38jarVwV3de5_JV4FL51U9RbIWvVzIblV0V7ybw4-zepuUwM5BN3CVOwGb3MQIPxbasa5nWTmIiiZ5nu2A\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Event deleted successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Event deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/event.management.route.js",
    "groupTitle": "EventManager"
  },
  {
    "type": "post",
    "url": "/api/event/info/",
    "title": "Post  event data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postEvent",
    "group": "EventManager",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "venueAddress",
            "description": "<p>address of  event venue.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "venue",
            "description": "<p>place where event will be hosted.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "eventDescription",
            "description": "<p>detail about event.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "eventTitle",
            "description": "<p>title for event.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>date and time of event starting.</p>"
          }
        ]
      }
    },
    "description": "<p>saves event information to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X POST  \\\nhttp://localhost:3000/api/event/info/ \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODY0NzI1NSwiZXhwIjoxNDY4NjY3MjU1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.ijpe38jarVwV3de5_JV4FL51U9RbIWvVzIblV0V7ybw4-zepuUwM5BN3CVOwGb3MQIPxbasa5nWTmIiiZ5nu2A\" \\\n-F imageName=@public/images/404_banner.png  \\\n-F \"data={\\\"eventTitle\\\": \\\"Blood Donation Program for blood bank\\\",\\\"eventDescription\\\": \\\"Please donate blood and help the blood donation program in any way you can\\\",\\\"venue\\\": \\\"Red Cross Building\\\",\\\"venueAddress\\\": \\\"Kathmandu, Nepal\\\",\\\"startDate\\\": \\\"2016-09-21\\\",\\\"endDate\\\": \\\"2016-09-23\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Event saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Event saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Event with same title already exists</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>Validation Error due to either invalid data entry or not entering value for required fields</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"Event with same title already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": [{\"param\":\"eventTitle\",\"msg\":\"Event title is required\",\"value\":\"\"},\n             {\"param\":\"venue\",\"msg\":\"Venue of event is required\",\"value\":\"\"},\n             {\"param\":\"venueAddress\",\"msg\":\"Address for venue is required\",\"value\":\"\"},\n             {\"param\":\"startDate\",\"msg\":\"Invalid date\",\"value\":\"2016-02-15dsds\"}]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/event.management.route.js",
    "groupTitle": "EventManager"
  },
  {
    "type": "put",
    "url": "/api/event/info/:eventId",
    "title": "updates existing event data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateEvent",
    "group": "EventManager",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "eventId",
            "description": "<p>object id for event data as filter param</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"eventId\": \"5789bebf57633dcd16a2aea4\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>updates event information to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PUT  \\\nhttp://localhost:3000/api/event/info/5789c96dae6875bb2d080eb4 \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODY0NzI1NSwiZXhwIjoxNDY4NjY3MjU1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.ijpe38jarVwV3de5_JV4FL51U9RbIWvVzIblV0V7ybw4-zepuUwM5BN3CVOwGb3MQIPxbasa5nWTmIiiZ5nu2A\" \\\n-F imageName=@public/images/404_banner.png  \\\n-F \"data={\\\"eventTitle\\\": \\\"Blood Donation Program for blood bank\\\",\\\"eventDescription\\\": \\\"Please donate blood and help the blood donation program in any way you can to make in success\\\",\\\"venue\\\": \\\"Red Cross Building\\\",\\\"venueAddress\\\": \\\"Kathmandu, Nepal\\\",\\\"startDate\\\": \\\"2016-09-21\\\",\\\"endDate\\\": \\\"2016-09-23\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Event updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Event updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Event with same title already exists</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>Validation Error due to either invalid data entry or not entering value for required fields</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"Event with same title already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": [{\"param\":\"eventTitle\",\"msg\":\"Event title is required\",\"value\":\"\"},\n             {\"param\":\"venue\",\"msg\":\"Venue of event is required\",\"value\":\"\"},\n             {\"param\":\"venueAddress\",\"msg\":\"Address for venue is required\",\"value\":\"\"},\n             {\"param\":\"startDate\",\"msg\":\"Invalid date\",\"value\":\"2016-02-15dsds\"}]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/event.management.route.js",
    "groupTitle": "EventManager"
  },
  {
    "type": "get",
    "url": "/api/gallery/album/:albumId",
    "title": "Get gallery album info by Id",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getAlbumInfoByID",
    "group": "GalleryAlbum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "albumId",
            "description": "<p>object id of the gallery album to filter album by Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"albumId\": \"571e9f5c97a20bd01267237c\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the gallery album information object by Id if exists, else return empty object</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-i \\\n\"http://localhost:3000/api/gallery/album/571e9f5c97a20bd01267237c\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of gallery album data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "albumName",
            "description": "<p>name of the album.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "albumDescription",
            "description": "<p>brief description about the album.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addedOn",
            "description": "<p>Date of album creation.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>active bit status of the gallery album.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n       \"_id\": \"571e9f5c97a20bd01267237c\",\n       \"albumName\": \"Super Images Beautiful\",\n       \"albumDescription\": \"what kind of footwear is Katy wearing on the opening of the video? on 3 toes fits in\",\n       \"addedOn\": \"2016-04-25T22:51:08.719Z\",\n       \"active\": true\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Album not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Album not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/image.gallery.route.js",
    "groupTitle": "GalleryAlbum"
  },
  {
    "type": "get",
    "url": "/api/gallery/album/",
    "title": "Get gallery album  list",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getAllGalleryAlbums",
    "group": "GalleryAlbum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>whether to get data with active bit true or false, if true, then returns data list with active bit set to true only</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "perpage",
            "description": "<p>Number of data to return on each request</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": "<p>Current page number of pagination system.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "albumname",
            "description": "<p>name of the album to filter album list as filter param</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"perpage\": 10,\n  \"page\": 1\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n  \"active\": true,\n  \"albumname\": \"Picnic Memoirs\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the gallery album list if exists, else return empty array</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/gallery/album/\" \\\n--data-urlencode \"perpage=10\" \\\n--data-urlencode \"page=1\"",
        "type": "curl"
      },
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/gallery/album/\" \\\n--data-urlencode \"active=true\" \\\n--data-urlencode \"albumname=Picnic Memoirs\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dataList",
            "description": "<p>list of gallery albums</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList._id",
            "description": "<p>object id of gallery album data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.albumName",
            "description": "<p>name of the album.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.albumDescription",
            "description": "<p>brief description about the album.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.addedOn",
            "description": "<p>Date of album creation.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "dataList.active",
            "description": "<p>active bit status of the gallery album.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "totalItems",
            "description": "<p>total no of gallery albums in the related collection in database.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "currentPage",
            "description": "<p>current page number of client pagination system.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"dataList\": [\n          {\n              \"_id\": \"571e9f5c97a20bd01267237c\",\n              \"albumName\": \"Super Images Beautiful\",\n              \"albumDescription\": \"what kind of footwear is Katy wearing on the opening of the video? on 3 toes fits in\",\n              \"addedOn\": \"2016-04-25T22:51:08.719Z\",\n              \"active\": true\n          }\n      ],\n      \"totalItems\": 1,\n      \"currentPage\": 1\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Album not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Album not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/image.gallery.route.js",
    "groupTitle": "GalleryAlbum"
  },
  {
    "type": "get",
    "url": "/api/gallery/albumimage/:albumId",
    "title": "Get gallery images by Album Id",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getAllGalleryImagesByAlbumID",
    "group": "GalleryAlbum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>whether to get data with active bit true or false, if true, then returns data list with active bit set to true only</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "perpage",
            "description": "<p>Number of data to return on each request</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": "<p>Current page number of pagination system.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "albumId",
            "description": "<p>object id of the gallery album</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"perpage\": 10,\n  \"page\": 1,\n  \"albumId\": \"571e9f5c97a20bd01267237c\"\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n  \"perpage\": 10,\n  \"page\": 1,\n  \"active\": true,\n  \"albumId\": \"571e9f5c97a20bd01267237c\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the gallery images list by Album Id  if exists, else return empty array</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/gallery/albumimage/571e9f5c97a20bd01267237c\" \\\n--data-urlencode \"perpage=10\" \\\n--data-urlencode \"page=1\"",
        "type": "curl"
      },
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/gallery/albumimage/571e9f5c97a20bd01267237c\" \\\n--data-urlencode \"perpage=10\" \\\n--data-urlencode \"page=1\" \\\n--data-urlencode \"active=true\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dataList",
            "description": "<p>list of gallery images of an album</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList._id",
            "description": "<p>object id of gallery image of an album.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.imageName",
            "description": "<p>name of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.imageTitle",
            "description": "<p>title description of image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.imageAltText",
            "description": "<p>alternative text of an image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.imageDescription",
            "description": "<p>brief description of an image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.addedOn",
            "description": "<p>Date of image file addition.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.coverImage",
            "description": "<p>whether the image is cover image of the album.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "dataList.active",
            "description": "<p>active bit status of the gallery image of an album.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties",
            "description": "<p>meta-data of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imageExtension",
            "description": "<p>extension of image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imagePath",
            "description": "<p>path of image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "totalItems",
            "description": "<p>total no of gallery images in an album.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "currentPage",
            "description": "<p>current page number of client pagination system.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"dataList\": [\n          {\n              \"imageName\": \"\",\n              \"imageTitle\": \"Army Personnels in desperate effort to save trapped citizens under the fallen buildings\",\n              \"imageAltText\": \"very very sad to see people suffer in agony\",\n              \"imageDescription\": \"The army personnel is working day and night to save the citizens that are trapped under buildings\",\n              \"_id\": \"571ea010b878294a14b87a61\",\n              \"addedOn\": \"2016-04-25T22:54:08.690Z\",\n              \"active\": true,\n              \"imageProperties\": {\n                  \"imageExtension\": \"jpg\",\n                  \"imagePath\": \"public/uploads/images/testimonial/testimonial-1468734449811.jpg\"\n             },\n              \"coverImage\": false\n          }\n      ],\n      \"totalItems\": 1,\n      \"currentPage\": 1\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Gallery image not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Gallery image not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/image.gallery.route.js",
    "groupTitle": "GalleryAlbum"
  },
  {
    "type": "get",
    "url": "/api/gallery/albumimage/:albumId/:imageId",
    "title": "Get gallery image information object of an  Album by image Id",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getGalleryImageInfoByImageID",
    "group": "GalleryAlbum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "albumId",
            "description": "<p>object id of the gallery album</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imageId",
            "description": "<p>object id of the gallery image of an album</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"albumId\": \"571e9f5c97a20bd01267237c\",\n  \"imageId\": \"571ea010b878294a14b87a61\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the gallery image information object of an album by image id if exists, else return empty object</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/gallery/albumimage/571e9f5c97a20bd01267237c/571ea010b878294a14b87a61\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of gallery image of an album.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageName",
            "description": "<p>name of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageTitle",
            "description": "<p>title description of image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageAltText",
            "description": "<p>alternative text of an image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageDescription",
            "description": "<p>brief description of an image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addedOn",
            "description": "<p>Date of image file addition.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "coverImage",
            "description": "<p>whether the image is cover image of the album.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>active bit status of the gallery image of an album.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties",
            "description": "<p>meta-data of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imageExtension",
            "description": "<p>extension of image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imagePath",
            "description": "<p>path of image file.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"imageName\": \"toyota-prius-electric\",\n      \"imageTitle\": \"Toyota launching the most environment friendly car ever in the history\",\n      \"imageAltText\": \"a truly remarkable feat\",\n      \"imageDescription\": \"Toyota is the global leader in car industry and with it's latest innovation in electric car, it will be even stronger in the car market\",\n      \"_id\": \"571e9ffe8f0c2f4f14a6a453\",\n      \"addedOn\": \"2016-04-25T22:53:50.608Z\",\n      \"active\": false,\n     \"imageProperties\": {\n          \"imageExtension\": \"jpg\",\n          \"imagePath\": \"public/uploads/images/testimonial/testimonial-1468734449811.jpg\"\n     },\n      \"coverImage\": true\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Gallery image not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Gallery image not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/image.gallery.route.js",
    "groupTitle": "GalleryAlbum"
  },
  {
    "type": "patch",
    "url": "/api/gallery/album/:albumId",
    "title": "Deletes existing gallery album data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "patchGalleryAlbum",
    "group": "GalleryAlbum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "albumId",
            "description": "<p>object id of the gallery album to filter album by Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"albumId\": \"578c20848e45f8962790a2e4\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Deletes existing gallery album information from the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PATCH  \\\nhttp://localhost:3000/api/gallery/album/578c20848e45f8962790a2e4 \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODgwMDcxMiwiZXhwIjoxNDY4ODIwNzEyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.3Nk-DHIX2rZdu6IIkJ72QxHnR6ISr468jHkvA_nsrQlTgtL6eMhYlOfIF8Nq6EF8VEROhMZ8xSSf_GJeqar9mA\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Album deleted successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Album deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/image.gallery.route.js",
    "groupTitle": "GalleryAlbum"
  },
  {
    "type": "post",
    "url": "/api/gallery/album/",
    "title": "Post gallery album data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postAlbumInfo",
    "group": "GalleryAlbum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Mandatory",
            "description": "<p>albumName  name of the album.</p>"
          }
        ]
      }
    },
    "description": "<p>saves gallery album information to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X POST  \\\nhttp://localhost:3000/api/gallery/album/ \\\n-H \"Content-Type: application/json\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODgwMDcxMiwiZXhwIjoxNDY4ODIwNzEyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.3Nk-DHIX2rZdu6IIkJ72QxHnR6ISr468jHkvA_nsrQlTgtL6eMhYlOfIF8Nq6EF8VEROhMZ8xSSf_GJeqar9mA\" \\\n-d '{\"albumName\":\"Picnic Memoirs\",\"albumDescription\":\"beautiful memories\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Album saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Album saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Gallery album with same title already exists.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Validation Error due to  not entering value for required field i.e. albumName</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"Image gallery album with same title already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": \"Album title is required\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/image.gallery.route.js",
    "groupTitle": "GalleryAlbum"
  },
  {
    "type": "post",
    "url": "/api/gallery/albumimage/:albumId",
    "title": "Post gallery image of an album data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postGalleryImageInfo",
    "group": "GalleryAlbum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imageName",
            "description": "<p>Mandatory  name of the image file.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "albumId",
            "description": "<p>object id of the gallery album</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"albumId\": \"571e9f5c97a20bd01267237c\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>saves gallery image information of an album to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X POST  \\\nhttp://localhost:3000/api/gallery/albumimage/571e9f5c97a20bd01267237c \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODgyMzg5MSwiZXhwIjoxNDY4ODQzODkxLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.gHeAUVtCSSgWlXS9HP47V-AYtbUAEv34iLccO8PZdIdA3n_LSv0wcjWuWc7BueQr2ab3LrHP738Yda_P-JcsQA\" \\\n-F imageName=@public/images/404_banner.png  \\\n-F \"data={\\\"imageTitle\\\": \\\"woow beautiful image\\\",\\\"imageAltText\\\": \\\"beautiful image beyond explanation\\\",\\\"active\\\": \\\"true\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Gallery image saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Gallery image saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Validation Error due to  not uploading image file</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": \"Please upload image\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/image.gallery.route.js",
    "groupTitle": "GalleryAlbum"
  },
  {
    "type": "delete",
    "url": "/api/gallery/albumimage/:albumId/:imageId",
    "title": "Deletes gallery image of an album data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "removeImage",
    "group": "GalleryAlbum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "albumId",
            "description": "<p>object id of the gallery album</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imageId",
            "description": "<p>object id of the gallery image of an album</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"albumId\": \"571e9f5c97a20bd01267237c\",\n  \"imageId\": \"571ea010b878294a14b87a61\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Deletes gallery image  of an album to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X DELETE  \\\nhttp://localhost:3000/api/gallery/albumimage/571e9f5c97a20bd01267237c/571e9ffe8f0c2f4f14a6a453 \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODgyMzg5MSwiZXhwIjoxNDY4ODQzODkxLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.gHeAUVtCSSgWlXS9HP47V-AYtbUAEv34iLccO8PZdIdA3n_LSv0wcjWuWc7BueQr2ab3LrHP738Yda_P-JcsQA\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Gallery Image deleted successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Gallery Image deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Cover Image cannot be deleted</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Cover Image cannot be deleted\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/image.gallery.route.js",
    "groupTitle": "GalleryAlbum"
  },
  {
    "type": "put",
    "url": "/api/gallery/album/:albumId",
    "title": "Updates existing gallery album data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateAlbumInfo",
    "group": "GalleryAlbum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "albumId",
            "description": "<p>object id of the gallery album to filter album by Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"albumId\": \"578c20848e45f8962790a2e4\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates existing gallery album information to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PUT  \\\nhttp://localhost:3000/api/gallery/album/578c20848e45f8962790a2e4 \\\n-H \"Content-Type: application/json\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODgwMDcxMiwiZXhwIjoxNDY4ODIwNzEyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.3Nk-DHIX2rZdu6IIkJ72QxHnR6ISr468jHkvA_nsrQlTgtL6eMhYlOfIF8Nq6EF8VEROhMZ8xSSf_GJeqar9mA\" \\\n-d '{\"albumName\":\"Picnic Memoirs 2016\",\"albumDescription\":\"beautiful memories in Nepal\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Album updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Album updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Gallery album with same title already exists.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Validation Error due to  not entering value for required field i.e. albumName</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"Image gallery album with same title already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": \"Album title is required\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/image.gallery.route.js",
    "groupTitle": "GalleryAlbum"
  },
  {
    "type": "patch",
    "url": "/api/gallery/albumimage/:albumId/:imageId",
    "title": "Updates cover image of an album data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateCoverImage",
    "group": "GalleryAlbum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "albumId",
            "description": "<p>object id of the gallery album</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imageId",
            "description": "<p>object id of the gallery image of an album</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"albumId\": \"571e9f5c97a20bd01267237c\",\n  \"imageId\": \"571ea010b878294a14b87a61\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates cover image of an album to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PATCH  \\\nhttp://localhost:3000/api/gallery/albumimage/571e9f5c97a20bd01267237c/571e9ffe8f0c2f4f14a6a453 \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODgyMzg5MSwiZXhwIjoxNDY4ODQzODkxLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.gHeAUVtCSSgWlXS9HP47V-AYtbUAEv34iLccO8PZdIdA3n_LSv0wcjWuWc7BueQr2ab3LrHP738Yda_P-JcsQA\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Cover image updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Cover image updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/image.gallery.route.js",
    "groupTitle": "GalleryAlbum"
  },
  {
    "type": "put",
    "url": "/api/gallery/albumimage/:albumId/:imageId",
    "title": "Updates existing gallery image of an album data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateGalleryImageInfo",
    "group": "GalleryAlbum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "albumId",
            "description": "<p>object id of the gallery album</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imageId",
            "description": "<p>object id of the gallery image of an album</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"albumId\": \"571e9f5c97a20bd01267237c\",\n  \"imageId\": \"571ea010b878294a14b87a61\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates existing gallery image information of an album to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PUT  \\\nhttp://localhost:3000/api/gallery/albumimage/571e9f5c97a20bd01267237c/578c7a11b8855f0436a2aff0 \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODgyMzg5MSwiZXhwIjoxNDY4ODQzODkxLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.gHeAUVtCSSgWlXS9HP47V-AYtbUAEv34iLccO8PZdIdA3n_LSv0wcjWuWc7BueQr2ab3LrHP738Yda_P-JcsQA\" \\\n-F imageName=@public/images/404_banner.png  \\\n-F \"data={\\\"imageTitle\\\": \\\"woow beautiful image yahoo\\\",\\\"imageAltText\\\": \\\"beautiful image beyond explanation in Nepal\\\",\\\"active\\\": \\\"true\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Gallery Image updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Gallery Image updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Validation Error due to  not uploading image file</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": \"Please upload image\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/image.gallery.route.js",
    "groupTitle": "GalleryAlbum"
  },
  {
    "type": "get",
    "url": "/api/analytics/",
    "title": "Get Google analytics configuration Info",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getGoogleAnalyticsConfig",
    "group": "GoogleAnalytics",
    "description": "<p>Retrieves google analytics configuration setting Information if exists, else return empty object so that we can use this information to show our website analytics in our dashboard</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/api/analytics",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of the google analytics config data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "analyticsViewID",
            "description": "<p>Google Analytics view id that is provided by google when signup with google analytics is successfull</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "serviceAccountKeyFileName",
            "description": "<p>name of the file that contains the key configuration setting options which we can also get from google analytics dashboard</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trackingId",
            "description": "<p>Tracking ID that we will use to gather analytics data</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pollingInterval",
            "description": "<p>number value that we will use to poll the google analytics api to show real time analytics data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "docProperties.docPath",
            "description": "<p>path of the document file that we have uploaded to the system</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  \"_id\": \"578481514086485d1bfd44a5\",\n  \"analyticsViewID\": \"112272040\",\n  \"serviceAccountKeyFileName\": \"googleanalytics-jsonconfig-1468301648992.json\",\n  \"trackingId\": \"UA-81675690-1\",\n  \"pollingInterval\": 59997,\n  \"docProperties\": {\n      \"docPath\": \"configs/googleanalytics-jsonconfig-1468301648992.json\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Google analytics configuration setting not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Google analytics configuration not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/google.analytics.route.js",
    "groupTitle": "GoogleAnalytics"
  },
  {
    "type": "get",
    "url": "/api/analytics/:googleAnalyticsConfigId",
    "title": "Get Google analytics configuration Info by Id",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getGoogleAnalyticsConfigByID",
    "group": "GoogleAnalytics",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "googleAnalyticsConfigId",
            "description": "<p>object id of the google analytics data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"googleAnalyticsConfigId\": \"57889ae9585d9632523f1234\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves google analytics configuration setting object using googleAnalyticsConfigId as id value if exists, else return empty object</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/api/analytics/5785e775800f297645eeabe7",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of the google analytics config data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "analyticsViewID",
            "description": "<p>Google Analytics view id that is provided by google when signup with google analytics is successfull</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "serviceAccountKeyFileName",
            "description": "<p>name of the file that contains the key configuration setting options which we can also get from google analytics dashboard</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trackingId",
            "description": "<p>Tracking ID that we will use to gather analytics data</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pollingInterval",
            "description": "<p>number value that we will use to poll the google analytics api to show real time analytics data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "docProperties.docPath",
            "description": "<p>path of the document file that we have uploaded to the system</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  \"_id\": \"578481514086485d1bfd44a5\",\n  \"analyticsViewID\": \"112272040\",\n  \"serviceAccountKeyFileName\": \"googleanalytics-jsonconfig-1468301648992.json\",\n  \"trackingId\": \"UA-81675690-1\",\n  \"pollingInterval\": 59997,\n  \"docProperties\": {\n      \"docPath\": \"configs/googleanalytics-jsonconfig-1468301648992.json\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>GoogleAnalytics setting not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Google analytics configuration not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/google.analytics.route.js",
    "groupTitle": "GoogleAnalytics"
  },
  {
    "type": "post",
    "url": "/api/analytics/",
    "title": "Post Google analytics configuration Info",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postGoogleAnalyticsConfig",
    "group": "GoogleAnalytics",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "serviceAccountKeyFileName",
            "description": "<p>Mandatory name of the file that contains the key configuration setting options which we can also get from google analytics dashboard</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "analyticsViewID",
            "description": "<p>Mandatory Google Analytics view id that is provided by google when signup with google analytics is successfull</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "trackingId",
            "description": "<p>Mandatory Tracking ID that we will use to gather analytics data</p>"
          }
        ]
      }
    },
    "description": "<p>saves google analytics information to the database along with upload of service configuration json file</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-v \\\n-X POST  \\\nhttp://localhost:3000/api/analytics/ \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODQ5NDE5MSwiZXhwIjoxNDY4NTE0MTkxLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.51wyhhN2KuppBirmszoyGf8G7d70l49DA_O1qamcwoqTLkKelioH8rVokjDznUqK7xrhhJLXcWZXAkuHL0wcKQ\" \\\n-F documentName=@securityconfigs/bitsbeat-902f2983ff85.json  \\\n-F \"data={\\\"trackingId\\\": \\\"UA-81675690-1\\\",\\\"analyticsViewID\\\": \\\"22365698\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Google analytics configuration object saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Google analytics saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Google Analytics setting configuration already exists, only can update existing data. new inserts is not allowed</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>if google analytics service configuration json file is not uploaded, then the api throws upload warning message</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"You can only update google analytics configuration\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Please upload google analytics config json file\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"[{\"param\":\"trackingId\",\"msg\":\"Google analytics tracking ID is required\"}]\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/google.analytics.route.js",
    "groupTitle": "GoogleAnalytics"
  },
  {
    "type": "put",
    "url": "/api/analytics/:googleAnalyticsConfigId",
    "title": "Updates Google analytics configuration Info",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateGoogleAnalyticsConfig",
    "group": "GoogleAnalytics",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "googleAnalyticsConfigId",
            "description": "<p>object id of the google analytics data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"googleAnalyticsConfigId\": \"57889ae9585d9632523f1234\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>updates existing google analytics information to the database along with upload of service configuration json file</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-v \\\n-X PUT  \\\nhttp://localhost:3000/api/analytics/578771ad155fb8ff03556def \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODQ5NDE5MSwiZXhwIjoxNDY4NTE0MTkxLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.51wyhhN2KuppBirmszoyGf8G7d70l49DA_O1qamcwoqTLkKelioH8rVokjDznUqK7xrhhJLXcWZXAkuHL0wcKQ\" \\\n-F documentName=@securityconfigs/bitsbeat-902f2983ff85.json  \\\n-F \"data={\\\"trackingId\\\": \\\"UA-81675690-1\\\",\\\"analyticsViewID\\\": \\\"22365698\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Google analytics updated successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Google analytics updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>if google analytics service configuration json file is not uploaded, then the api throws upload warning message</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Please upload google analytics config json file\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"[{\"param\":\"trackingId\",\"msg\":\"Google analytics tracking ID is required\"}]\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/google.analytics.route.js",
    "groupTitle": "GoogleAnalytics"
  },
  {
    "type": "get",
    "url": "/api/maps/",
    "title": "Get Google Maps Config Info",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getGoogleMapsConfig",
    "group": "GoogleMaps",
    "description": "<p>Retrieves the google maps configuration setting Information Object if exists, else return empty object</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/api/maps",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of the google maps configuration data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "placeName",
            "description": "<p>name of the place to show in embed map.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mapType",
            "description": "<p>type of map to be shown(Options : 'SATELLITE','ROADMAP','HYBRID','TERRAIN').</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "markerTitle",
            "description": "<p>title to be shown in the located map position.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "addedOn",
            "description": "<p>date of data entry.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "showMarker",
            "description": "<p>to allow marker in the map.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "zoom",
            "description": "<p>Level of zoom feature in map.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "scrollWheel",
            "description": "<p>To allow scrolling in the google maps.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "latitude",
            "description": "<p>latitude position of area.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "longitude",
            "description": "<p>longitude position of area.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"_id\": \"570b5e599657cb91395a3427\",\n\"placeName\": \"Thaiba,Lalitpur,Nepal\",\n  \"mapType\": \"SATELLITE\",\n  \"markerTitle\": \"Thaiba-Ajestapur\",\n  \"addedOn\": \"2016-04-11T08:20:41.049Z\",\n  \"showMarker\": true,\n  \"zoom\": 18,\n  \"scrollWheel\": false,\n  \"latitude\": 27.623249,\n  \"longitude\": 85.344865\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Google maps configuration not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Google maps configuration not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/google.maps.route.js",
    "groupTitle": "GoogleMaps"
  },
  {
    "type": "get",
    "url": "/api/maps/:googleMapsConfigId",
    "title": "Get Google Maps Config Info By Id",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getGoogleMapsConfigByID",
    "group": "GoogleMaps",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "googleMapsConfigId",
            "description": "<p>object id of the google maps data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"googleMapsConfigId\": \"57889ae9585d9632523f1234\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the google maps configuration setting Information Object by using id if exists, else return empty object</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/api/maps/570b5e599657cb91395a3427",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of the google maps configuration data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "placeName",
            "description": "<p>name of the place to show in embed map.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mapType",
            "description": "<p>type of map to be shown(Options : 'SATELLITE','ROADMAP','HYBRID','TERRAIN').</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "markerTitle",
            "description": "<p>title to be shown in the located map position.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "googleMapsApiKey",
            "description": "<p>api key for google maps api service.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "addedOn",
            "description": "<p>date of data entry.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "showMarker",
            "description": "<p>to allow marker in the map.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "zoom",
            "description": "<p>Level of zoom feature in map.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "scrollWheel",
            "description": "<p>To allow scrolling in the google maps.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "latitude",
            "description": "<p>latitude position of area.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "longitude",
            "description": "<p>longitude position of area.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"_id\": \"570b5e599657cb91395a3427\",\n\"placeName\": \"Thaiba,Lalitpur,Nepal\",\n  \"mapType\": \"SATELLITE\",\n  \"markerTitle\": \"Thaiba-Ajestapur\",\n  \"googleMapsApiKey\": \"AIzaSyAzO__WJXnRDR8rglhUQoErr672phnTaYo\",\n  \"addedOn\": \"2016-04-11T08:20:41.049Z\",\n  \"showMarker\": true,\n  \"zoom\": 18,\n  \"scrollWheel\": false,\n  \"latitude\": 27.623249,\n  \"longitude\": 85.344865\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Google maps configuration not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Google maps configuration not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/google.maps.route.js",
    "groupTitle": "GoogleMaps"
  },
  {
    "type": "post",
    "url": "/api/maps/",
    "title": "Post Google Maps Configuration Info",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postGoogleMapsConfig",
    "group": "GoogleMaps",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "placeName",
            "description": "<p>Mandatory name of the place to show in embed map.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mapType",
            "description": "<p>Mandatory type of map to be shown(Options : 'SATELLITE','ROADMAP','HYBRID','TERRAIN').</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "markerTitle",
            "description": "<p>Mandatory title to be shown in the located map position.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "zoom",
            "description": "<p>Level of  Mandatory zoom feature in map.</p>"
          },
          {
            "group": "Parameter",
            "type": "Decimal",
            "optional": false,
            "field": "latitude",
            "description": "<p>Mandatory latitude position of area.</p>"
          },
          {
            "group": "Parameter",
            "type": "Decimal",
            "optional": false,
            "field": "longitude",
            "description": "<p>Mandatory  longitude position of area.</p>"
          }
        ]
      }
    },
    "description": "<p>saves google maps configuration setting information to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-v \\\n-X POST \\\nhttp://localhost:3000/api/maps \\\n-H 'Content-Type: application/json' \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODQ4MDY1MywiZXhwIjoxNDY4NTAwNjUzLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.vKBqGdyXAHZ4eot90t7dGJ-u-iuCcNCSh-KMmRgzg9zzPFjD5MrW2MgEoJcxfTbVXz4W6pxA5Qtz1YDZPn_5mA' \\\n-d '{\"placeName\": \"Thaiba,Lalitpur,Nepal\", \"longitude\": \"85.344865\",\"latitude\": \"27.622249\", \"scrollWheel\": \"false\", \"zoom\": \"8\", \"mapType\":\"SATELLITE\", \"showMarker\": \"true\", \"markerTitle\": \"Thaiba-Ajestapur\", \"googleMapsApiKey\": \"AIzaSyAzO__WJXnRDR8rglhUQoErr672phnTaYo\",\"addedBy\": \"Shrawan\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Google maps configuration saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Google maps configuration saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Google maps setting configuration already exists, only can update existing data. new inserts is not allowed</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>Google maps setting post method throws validation error if either of placeName, longitude, latitude,zoom, mapType, markerTitle and invalid data in mapType, longitude, latitude and zoom  is not provided</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"You can only update google maps configuration setting\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"[{\"param\":\"zoom\",\"msg\":\"Zoom for map is required\",\"value\":\"\"}]\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/google.maps.route.js",
    "groupTitle": "GoogleMaps"
  },
  {
    "type": "put",
    "url": "/api/maps/:googleMapsConfigId",
    "title": "Updates Google Maps Configuration Info",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateGoogleMapsConfig",
    "group": "GoogleMaps",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "googleMapsConfigId",
            "description": "<p>object id of the google maps data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"googleMapsConfigId\": \"57889ae9585d9632523f1234\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>updates google maps configuration setting information to the database using id as querying parameter</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-v \\\n-X PUT \\\nhttp://localhost:3000/api/maps/57873d542d20191c3c934c29 \\\n-H 'Content-Type: application/json' \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODQ4MDY1MywiZXhwIjoxNDY4NTAwNjUzLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.vKBqGdyXAHZ4eot90t7dGJ-u-iuCcNCSh-KMmRgzg9zzPFjD5MrW2MgEoJcxfTbVXz4W6pxA5Qtz1YDZPn_5mA' \\\n-d '{\"placeName\": \"Thaiba,Lalitpur,Nepal\", \"longitude\": \"85.344865\",\"latitude\": \"27.622249\", \"scrollWheel\": \"false\", \"zoom\": \"8\", \"mapType\":\"SATELLITE\", \"showMarker\": \"true\", \"markerTitle\": \"Thaiba-Ajestapur\", \"googleMapsApiKey\": \"AIzaSyAzO__WJXnRDR8rglhUQoErr672phnTaYo\", \"addedBy\": \"Shrawan\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Google maps configuration updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Google maps configuration updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Google maps setting configuration already exists, only can update existing data. new inserts is not allowed</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>Google maps setting put method throws error if either of placeName, longitude, latitude,zoom, mapType, markerTitle and invalid data in mapType, longitude, latitude and zoom  is not provided</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"You can only update google maps configuration setting\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"[{\"param\":\"zoom\",\"msg\":\"Zoom for map is required\",\"value\":\"\"}]\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/google.maps.route.js",
    "groupTitle": "GoogleMaps"
  },
  {
    "type": "delete",
    "url": "/api/texteditor/file/",
    "title": "Deletes html content image file",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "deleteFile",
    "group": "HtmlModuleContent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>path of the image file.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"path\": \"/home/lakhe/Music/BitsBeat Projects/Final Projects/nodeframework/public/uploads/images/htmluploads/htmlupload-1472725544059.png\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Deletes html content image file from the cloudinary server as well as local server</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\ncurl \\\n-G \\\n-v \\\n-X DELETE \\\n\"http://localhost:3000/api/texteditor/file\" \\\n--data-urlencode \"path=/home/lakhe/Music/BitsBeat Projects/Final Projects/nodeframework/public/uploads/images/htmluploads/htmlupload-1472725544059.jpg\" \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3YjUwOTE0Y2VhZTA2Nzc0OTkzNGQzNiIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxsb0BiaXRzYmVhdC5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDgtMThUMDE6MDI6MTIuMjM3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdiNTA5MTRjZWFlMDY3NzQ5OTM0ZDM2IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3Mjc5NTg4NiwiZXhwIjoxNDcyODgyMjg2LCJpc3MiOiI1N2I1MDkxNGNlYWUwNjc3NDk5MzRkMzYifQ.6QAWr6zFlaeInEAyFZs3k-GNbs7ybL2zZACRRaK-NAGzYW5c9UKTxI0fXyhQO2qJXdPfR9uHK77Ac1uFiNZhyg\"",
        "type": "curl"
      }
    ],
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/text.editor.file.route.js",
    "groupTitle": "HtmlModuleContent"
  },
  {
    "type": "get",
    "url": "/api/texteditor/file/",
    "title": "Get Html Module Content image list.",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getAllFiles",
    "group": "HtmlModuleContent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "module",
            "description": "<p>name of the module from which image is uploaded</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"module\": \"html\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the html content image list if exists, else return empty array</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/api/texteditor/file \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3YjUwOTE0Y2VhZTA2Nzc0OTkzNGQzNiIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxsb0BiaXRzYmVhdC5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDgtMThUMDE6MDI6MTIuMjM3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdiNTA5MTRjZWFlMDY3NzQ5OTM0ZDM2IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3Mjc5NTg4NiwiZXhwIjoxNDcyODgyMjg2LCJpc3MiOiI1N2I1MDkxNGNlYWUwNjc3NDk5MzRkMzYifQ.6QAWr6zFlaeInEAyFZs3k-GNbs7ybL2zZACRRaK-NAGzYW5c9UKTxI0fXyhQO2qJXdPfR9uHK77Ac1uFiNZhyg\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of the html content image file data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addedBy",
            "description": "<p>admin user's username which add the html content image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "h",
            "description": "<p>height of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "w",
            "description": "<p>width of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "s",
            "description": "<p>size of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "p",
            "description": "<p>path of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "localPath",
            "description": "<p>local path of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "module",
            "description": "<p>module name from which html content image is added.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "__v",
            "description": "<p>version mongodb.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "addedOn",
            "description": "<p>date of html content image addition.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "t",
            "description": "<p>timestamp of html content image file.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n  [\n     {\n         \"_id\": \"57c8011b6f1cfc9511055893\",\n         \"addedBy\": \"superadmin\",\n         \"h\": 350,\n         \"w\": 800,\n         \"s\": 233381,\n         \"p\": \"http://res.cloudinary.com/nodebeats/image/upload/htmlupload-1472725275569.jpg\",\n         \"localPath\": \"/home/lakhe/Music/BitsBeat Projects/Final Projects/nodeframework/public/uploads/images/htmluploads/htmlupload-1472725275569.jpg\",\n         \"module\": \"html\",\n         \"__v\": 0,\n         \"addedOn\": \"2016-09-01T10:21:15.610Z\",\n         \"t\": \"2016-09-01T10:21:15.610Z\"\n     }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied or failed</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>File not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"File not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/text.editor.file.route.js",
    "groupTitle": "HtmlModuleContent"
  },
  {
    "type": "get",
    "url": "/api/htmlcontent/",
    "title": "Get Html Module Content list",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getAllHtmlModuleContents",
    "group": "HtmlModuleContent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "perpage",
            "description": "<p>Number of data to return on each request</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": "<p>Current page number of pagination system.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>whether to get data with active bit true or false, if true, then returns data list with active bit set to true only</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "htmlContentTitle",
            "description": "<p>title of the html content</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"perpage\": 10,\n  \"page\": 1\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n  \"active\": true,\n  \"htmlContentTitle\": \"Welcome speech\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the html content list if exists, else return empty array</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/api/htmlcontent",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dataList",
            "description": "<p>list of html contents</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList._id",
            "description": "<p>object id of html content data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.htmlContentTitle",
            "description": "<p>title of html content module.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.htmlModuleContent",
            "description": "<p>html content in detail.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "dataList.active",
            "description": "<p>active status of the html content data.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "totalItems",
            "description": "<p>total no of html contents in the related collection in database.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "currentPage",
            "description": "<p>current page number of client pagination system.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"dataList\": [\n          {\n              \"_id\": \"57c7fe7fbdea5da10b70ec4c\",\n              \"htmlModuleContent\": \"<p>hello brother</p>\\n<p>how are you? Hope everything is fine</p>\",\n              \"htmlContentTitle\": \"myself\",\n              \"active\": true\n          }\n      ],\n      \"totalItems\": 1,\n      \"currentPage\": 1\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Html content not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Html content not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/html.module.route.js",
    "groupTitle": "HtmlModuleContent"
  },
  {
    "type": "get",
    "url": "/api/htmlcontent/:htmlContentId",
    "title": "Get Html Module Content data object by Id",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getHtmlContentByID",
    "group": "HtmlModuleContent",
    "description": "<p>Retrieves the html content data object by Id if exists, else return html content not found message</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/api/htmlcontent/57c7fe7fbdea5da10b70ec4c",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of html content data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "htmlContentTitle",
            "description": "<p>title of html content module.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "htmlModuleContent",
            "description": "<p>html content in detail.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>active status of the html content data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"_id\": \"57c7fe7fbdea5da10b70ec4c\",\n      \"htmlModuleContent\": \"<p>hello brother</p>\\n<p>how are you? Hope everything is fine</p>\",\n      \"htmlContentTitle\": \"myself\",\n      \"active\": true\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Html content not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Html content not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/html.module.route.js",
    "groupTitle": "HtmlModuleContent"
  },
  {
    "type": "PATCH",
    "url": "/api/htmlcontent/:htmlContentId",
    "title": "Deletes existing  html content data from the database",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "patchHtmlContent",
    "group": "HtmlModuleContent",
    "description": "<p>Deletes existing html content data by Id from the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PATCH \\\nhttp://localhost:3000/api/htmlcontent/57c7fe7fbdea5da10b70ec4c \\\n-H 'Content-Type: application/json' \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3YjUwOTE0Y2VhZTA2Nzc0OTkzNGQzNiIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxsb0BiaXRzYmVhdC5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDgtMThUMDE6MDI6MTIuMjM3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdiNTA5MTRjZWFlMDY3NzQ5OTM0ZDM2IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3Mjc5NTg4NiwiZXhwIjoxNDcyODgyMjg2LCJpc3MiOiI1N2I1MDkxNGNlYWUwNjc3NDk5MzRkMzYifQ.6QAWr6zFlaeInEAyFZs3k-GNbs7ybL2zZACRRaK-NAGzYW5c9UKTxI0fXyhQO2qJXdPfR9uHK77Ac1uFiNZhyg'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Html content deleted successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Html content deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/html.module.route.js",
    "groupTitle": "HtmlModuleContent"
  },
  {
    "type": "post",
    "url": "/api/htmlcontent/",
    "title": "Saves html content data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postHtmlContent",
    "group": "HtmlModuleContent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "htmlContentTitle",
            "description": "<p>Mandatory title of html content module.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "htmlModuleContent",
            "description": "<p>Mandatory html content in detail.</p>"
          }
        ]
      }
    },
    "description": "<p>Saves html content data in the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X POST \\\nhttp://localhost:3000/api/htmlcontent \\\n-H 'Content-Type: application/json' \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3YjUwOTE0Y2VhZTA2Nzc0OTkzNGQzNiIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxsb0BiaXRzYmVhdC5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDgtMThUMDE6MDI6MTIuMjM3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdiNTA5MTRjZWFlMDY3NzQ5OTM0ZDM2IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3Mjc5NTg4NiwiZXhwIjoxNDcyODgyMjg2LCJpc3MiOiI1N2I1MDkxNGNlYWUwNjc3NDk5MzRkMzYifQ.6QAWr6zFlaeInEAyFZs3k-GNbs7ybL2zZACRRaK-NAGzYW5c9UKTxI0fXyhQO2qJXdPfR9uHK77Ac1uFiNZhyg' \\\n-d '{\"htmlContentTitle\": \"this is the html content title\", \"htmlModuleContent\": \"this is the html content in detail\",\"active\": \"true\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Html content saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Html content saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>validation errors due to not entering values for html content title and html content description</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Html content with same title already exists</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "  HTTP/1.1 400 Bad Request\n\n  {\n    \"message\": [\n        {\n            \"param\": \"htmlContentTitle\",\n            \"msg\": \"Title for html content is required\"\n        },\n        {\n            \"param\": \"htmlModuleContent\",\n            \"msg\": \"Html Content is required\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"Html content with same title already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/html.module.route.js",
    "groupTitle": "HtmlModuleContent"
  },
  {
    "type": "post",
    "url": "/api/texteditor/file/",
    "title": "Saves html content image file to database",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "saveFile",
    "group": "HtmlModuleContent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "module",
            "description": "<p>Mandatory name of the module from which html content image is uploaded.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "localPath",
            "description": "<p>Mandatory local path of the image file.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "p",
            "description": "<p>Mandatory  cloudinary path of the image file.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "s",
            "description": "<p>Mandatory  size of the image file.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "w",
            "description": "<p>Mandatory  width of the image file.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "h",
            "description": "<p>Mandatory  height of the image file.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addedBy",
            "description": "<p>Mandatory   admin's username who added the image file.</p>"
          }
        ]
      }
    },
    "description": "<p>Saves html content image file to the database.</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\ncurl \\\n-v \\\n-X POST  \\\nhttp://localhost:3000/api/texteditor/file/ \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3YjUwOTE0Y2VhZTA2Nzc0OTkzNGQzNiIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxsb0BiaXRzYmVhdC5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDgtMThUMDE6MDI6MTIuMjM3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdiNTA5MTRjZWFlMDY3NzQ5OTM0ZDM2IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3Mjc5NTg4NiwiZXhwIjoxNDcyODgyMjg2LCJpc3MiOiI1N2I1MDkxNGNlYWUwNjc3NDk5MzRkMzYifQ.6QAWr6zFlaeInEAyFZs3k-GNbs7ybL2zZACRRaK-NAGzYW5c9UKTxI0fXyhQO2qJXdPfR9uHK77Ac1uFiNZhyg\" \\\n-F image=@public/images/404_banner.png  \\\n-F \"data={\\\"module\\\": \\\"html\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>File Uploaded.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"File Uploaded\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/text.editor.file.route.js",
    "groupTitle": "HtmlModuleContent"
  },
  {
    "type": "put",
    "url": "/api/htmlcontent/:htmlContentId",
    "title": "Updates existing  html content data by Id",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateHtmlContent",
    "group": "HtmlModuleContent",
    "description": "<p>Updates existing html content data by Id</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PUT \\\nhttp://localhost:3000/api/htmlcontent/57c7fe7fbdea5da10b70ec4c \\\n-H 'Content-Type: application/json' \\\n-H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3YjUwOTE0Y2VhZTA2Nzc0OTkzNGQzNiIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxsb0BiaXRzYmVhdC5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDgtMThUMDE6MDI6MTIuMjM3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdiNTA5MTRjZWFlMDY3NzQ5OTM0ZDM2IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3Mjc5NTg4NiwiZXhwIjoxNDcyODgyMjg2LCJpc3MiOiI1N2I1MDkxNGNlYWUwNjc3NDk5MzRkMzYifQ.6QAWr6zFlaeInEAyFZs3k-GNbs7ybL2zZACRRaK-NAGzYW5c9UKTxI0fXyhQO2qJXdPfR9uHK77Ac1uFiNZhyg' \\\n-d '{\"htmlContentTitle\": \"this is the html content title GOT IT?\", \"htmlModuleContent\": \"YEAH I GOT this is the html content in detail\",\"active\": \"true\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Html content updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Html content updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>validation errors due to not entering values for html content title and html content description</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Html content with same title already exists</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "  HTTP/1.1 400 Bad Request\n\n  {\n    \"message\": [\n        {\n            \"param\": \"htmlContentTitle\",\n            \"msg\": \"Title for html content is required\"\n        },\n        {\n            \"param\": \"htmlModuleContent\",\n            \"msg\": \"Html Content is required\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"Html content with same title already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/html.module.route.js",
    "groupTitle": "HtmlModuleContent"
  },
  {
    "type": "get",
    "url": "/api/imageslider/",
    "title": "Get slider image list",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getAllSliderImages",
    "group": "ImageSlider",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>whether to get data with active bit true or false, if true, then returns data list with active bit set to true only (as querystring values)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"active\": true\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the slider images list if exists, else return empty array</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/api/imageslider",
        "type": "curl"
      },
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/api/imageslider?active=true",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of the slider image data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageSecondaryContent",
            "description": "<p>secondary content description of slider image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imagePrimaryContent",
            "description": "<p>primary content description of slider image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageAltText",
            "description": "<p>alternative text for image .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageTitle",
            "description": "<p>title for image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageName",
            "description": "<p>name of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>active bit status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n   {\n       \"_id\": \"57889ae9585d9632523f1234\",\n       \"imageSecondaryContent\": \"undefined\",\n       \"imagePrimaryContent\": \"undefined\",\n       \"imageAltText\": \"alt text\",\n       \"imageTitle\": \"Searching earthquake victims\",\n       \"imageName\": \"imageslider-1468570345135.webp\",\n       \"active\": true\n   }\n  ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Slider image not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Slider image not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/image.slider.route.js",
    "groupTitle": "ImageSlider"
  },
  {
    "type": "get",
    "url": "/api/imageslider/:imageSliderId",
    "title": "Get slider image object by param id",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getSliderImageByID",
    "group": "ImageSlider",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imageSliderId",
            "description": "<p>object id of the image slider data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"imageSliderId\": \"57889ae9585d9632523f1234\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the slider images object by using param id  if exists, else return not found message</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/api/imageslider/57889ae9585d9632523f1234",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of the slider image data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageSecondaryContent",
            "description": "<p>secondary content description of slider image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imagePrimaryContent",
            "description": "<p>primary content description of slider image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageAltText",
            "description": "<p>alternative text for image .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageTitle",
            "description": "<p>title for image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageName",
            "description": "<p>name of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imageExtension",
            "description": "<p>extension of image file</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imagePath",
            "description": "<p>upload path of image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>active bit status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n        \"_id\": \"57889ae9585d9632523f1234\",\n        \"imageSecondaryContent\": \"undefined\",\n        \"imagePrimaryContent\": \"undefined\",\n        \"imageAltText\": \"alt text\",\n        \"imageTitle\": \"Searching earthquake victims\",\n        \"imageName\": \"imageslider-1468570345135.webp\",\n        \"active\": true,\n        \"imageProperties\": {\n               \"imageExtension\": \"jpg\",\n               \"imagePath\": \"public/uploads/images/sliderimages/imageslider-1468570345135.jpg\"\n           }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Slider image not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Slider image not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/image.slider.route.js",
    "groupTitle": "ImageSlider"
  },
  {
    "type": "patch",
    "url": "/api/imageslider/:imageSliderId",
    "title": "deletes existing slider image record",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "patchSliderImage",
    "group": "ImageSlider",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imageSliderId",
            "description": "<p>object id of the image slider data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"imageSliderId\": \"57889ae9585d9632523f1234\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>deletes existing image slider object from the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-v \\\n-X PATCH  \\\nhttp://localhost:3000/api/imageslider/5788b58daebc4f5f6ed419a5 \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODU3Njk2NSwiZXhwIjoxNDY4NTk2OTY1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.bnWXFZrzcqJFwy9f9LBxuALzlEc-dfcjoGCUDaDu1YT2SL-ZhkToDwEHLZ7Wwo04A60JGtoliDBN7NZcvClEnw\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Slider Image deleted successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Slider Image deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/image.slider.route.js",
    "groupTitle": "ImageSlider"
  },
  {
    "type": "post",
    "url": "/api/imageslider/",
    "title": "Post slider image data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postSliderImage",
    "group": "ImageSlider",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Mandatory",
            "description": "<p>imageName  name of the image file.</p>"
          }
        ]
      }
    },
    "description": "<p>saves image slider object to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-v \\\n-X POST  \\\nhttp://localhost:3000/api/imageslider \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODU3Njk2NSwiZXhwIjoxNDY4NTk2OTY1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.bnWXFZrzcqJFwy9f9LBxuALzlEc-dfcjoGCUDaDu1YT2SL-ZhkToDwEHLZ7Wwo04A60JGtoliDBN7NZcvClEnw\" \\\n-F imageName=@public/images/404_banner.png  \\\n-F \"data={\\\"imageAltText\\\": \\\"this is 404 banner image\\\",\\\"imageTitle\\\": \\\"404 error\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Slider Image saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Slider Image saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>please upload image file</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\"message\":\"Please upload image\"}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/image.slider.route.js",
    "groupTitle": "ImageSlider"
  },
  {
    "type": "put",
    "url": "/api/imageslider/:imageSliderId",
    "title": "Updates existing slider image data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateSliderImage",
    "group": "ImageSlider",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imageSliderId",
            "description": "<p>object id of the image slider data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"imageSliderId\": \"57889ae9585d9632523f1234\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>updates existing image slider object to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-v \\\n-X PUT  \\\nhttp://localhost:3000/api/imageslider/5788b58daebc4f5f6ed419a5 \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODU3Njk2NSwiZXhwIjoxNDY4NTk2OTY1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.bnWXFZrzcqJFwy9f9LBxuALzlEc-dfcjoGCUDaDu1YT2SL-ZhkToDwEHLZ7Wwo04A60JGtoliDBN7NZcvClEnw\" \\\n-F imageName=@public/images/404_banner.png  \\\n-F \"data={\\\"imageAltText\\\": \\\"this is 404 banner image haha\\\",\\\"imageTitle\\\": \\\"404 error\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Slider Image updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Slider Image updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>please upload image file</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\"message\":\"Please upload image\"}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/image.slider.route.js",
    "groupTitle": "ImageSlider"
  },
  {
    "type": "post",
    "url": "/api/login",
    "title": "Verify the user credentials i.e. username and password",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "passport_authenticate__local_login__",
    "group": "Login",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Mandatory username of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Mandatory  password of the user</p>"
          }
        ]
      }
    },
    "description": "<p>Verify the user credentials i.e combination of username and password and then redirects the user to either the dashboard page or two-factor authentication page</p>",
    "version": "0.0.1",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>whether the login attempt is successfull or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>jwt token for token based authentication .</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "userInfo",
            "description": "<p>object containing user information.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo._id",
            "description": "<p>object id of user data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.email",
            "description": "<p>email address of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.username",
            "description": "<p>username used when registering in the system, by default, same as email address.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "userInfo.active",
            "description": "<p>active bit status of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.userRole",
            "description": "<p>role of the user in the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.twoFactorAuthEnabled",
            "description": "<p>multi-factor or two factor authentication is enabled in the system or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.addedOn",
            "description": "<p>date of user registered in the system .</p>"
          }
        ],
        "MultiFactorAuth": [
          {
            "group": "MultiFactorAuth",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>whether the login attempt is successfull or not.</p>"
          },
          {
            "group": "MultiFactorAuth",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>object id of user data.</p>"
          },
          {
            "group": "MultiFactorAuth",
            "type": "String",
            "optional": false,
            "field": "twoFactorAuthEnabled",
            "description": "<p>multi-factor or two factor authentication is enabled in the system or not.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"success\": true,\n      \"token\": \"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJ0ZXN0bm9kZWNtc0BnbWFpbC5jb20iLCJlbWFpbCI6InRlc3Rub2RlY21zQGdtYWlsLmNvbSIsInVzZXJSb2xlIjoiYWRtaW4iLCJhZGRlZE9uIjoiMjAxNi0wNy0yNFQxNDoyMjoxNy45MTNaIiwidHdvRmFjdG9yQXV0aEVuYWJsZWQiOmZhbHNlfSwiY2xhaW1zIjp7InN1YmplY3QiOiI1Nzk0Y2YxOTk4MDFmMzFjMGRkYmY5MDciLCJpc3N1ZXIiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJwZXJtaXNzaW9ucyI6WyJzYXZlIiwidXBkYXRlIiwicmVhZCIsImRlbGV0ZSJdfSwiaWF0IjoxNDY5NTA5NzA4LCJleHAiOjE0Njk1OTYxMDgsImlzcyI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyJ9.HZ_JE88RaymS1jiAWleRlmd5hKR5XeLdh-Jvwx725RtN15wxlcnOmxRsmjxYQsZTGxo8qY2yqa2zr7rn7acpYw\",\n      \"userInfo\": {\n          \"_id\": \"5794cf199801f31c0ddbf907\",\n          \"active\": true,\n          \"username\": \"testnodecms@gmail.com\",\n          \"email\": \"testnodecms@gmail.com\",\n          \"userRole\": \"admin\",\n          \"addedOn\": \"2016-07-24T14:22:17.913Z\",\n          \"twoFactorAuthEnabled\": false\n      }\n  }",
          "type": "json"
        },
        {
          "title": "(MultiFactorAuth) Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\n{\n      \"twoFactorAuthEnabled\": true,\n      \"success\": true,\n      \"userId\": \"5794cf199801f31c0ddbf907\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "ForbiddenError": [
          {
            "group": "ForbiddenError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>parallel login attempt detected and respond the user with forbidden access message stating another login attempt in progress</p>"
          },
          {
            "group": "ForbiddenError",
            "type": "String",
            "optional": false,
            "field": "User",
            "description": "<p>account is blocked due to maximum times of repeated login attempts. User will be able to login only if he/she is not blocked. To unblock, click the unblock confirmation link sent to the email</p>"
          }
        ],
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Wrong combination of username and password</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Http status code for Unauthorized action</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>whether the login attempt is successfull or not</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n   \"message\": \"Authentication already in progress\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n   \"message\": \"Your ip address has been blocked due to repeated entry of invalid login credentials\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n      \"success\": false,\n      \"status\": \"401\",\n      \"message\": \"Invalid credentials\"\n  }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n      \"success\": false,\n      \"status\": \"401\",\n      \"message\": \"User account not confirmed. Please check your email and click on the link sent to you in the confirmation email to verify your account.\"\n  }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n      \"success\": false,\n      \"status\": \"403\",\n      \"message\": \"You are currently blocked. Please check email forwarded to your email and click the link.\"\n  }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n      \"success\": false,\n      \"status\": \"401\",\n      \"message\": \"Your ip address has been blocked due to repeated entry of invalid login credentials\"\n  }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/login.route.js",
    "groupTitle": "Login"
  },
  {
    "type": "post",
    "url": "/api/two-factor-auth-validate/:userId",
    "title": "Verify the token inputted by the user and if successfull, redirects the user to the dashboard page",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "validateTOTPToken",
    "group": "Login",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>object id of the user registered in the system</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "totpToken",
            "description": "<p>Mandatory time-based one time password.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"userId\": \"577f5c1b5869902d67eb22a8\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Verify the time based one time password  token inputted by the user and  if successfull, redirects the user to the dashboard page</p>",
    "version": "0.0.1",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>whether the login attempt is successfull or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>jwt token for token based authentication .</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "userInfo",
            "description": "<p>object containing user information.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo._id",
            "description": "<p>object id of user data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.email",
            "description": "<p>email address of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.username",
            "description": "<p>username used when registering in the system, by default, same as email address.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "userInfo.active",
            "description": "<p>active bit status of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.userRole",
            "description": "<p>role of the user in the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.twoFactorAuthEnabled",
            "description": "<p>multi-factor or two factor authentication is enabled in the system or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.addedOn",
            "description": "<p>date of user registered in the system .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"success\": true,\n      \"token\": \"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjp0cnVlLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWN0aXZlIjp0cnVlfSwiY2xhaW1zIjp7InN1YmplY3QiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgiLCJpc3N1ZXIiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJwZXJtaXNzaW9ucyI6WyJzYXZlIiwidXBkYXRlIiwicmVhZCIsImRlbGV0ZSJdfSwiaWF0IjoxNDY5NTAwMDkwLCJleHAiOjE0Njk1ODY0OTAsImlzcyI6IjU3N2Y1YzFiNTg2OTkwMmQ2N2ViMjJhOCJ9.wy9YaVm9Sca9Z3NZEqzsa29za3FnRDjCxwFZ5lRMprC1LnWqvXMk7iI0E0d4hJ8J_0vApee_cdzK-JsJxtZMVA\",\n      \"userInfo\": {\n              \"_id\": \"577f5c1b5869902d67eb22a8\",\n              \"active\": true,\n              \"username\": \"superadmin\",\n              \"email\": \"hello@bitsbeat.com\",\n              \"userRole\": \"admin\",\n              \"addedOn\": \"2016-07-08T07:54:03.766Z\",\n              \"twoFactorAuthEnabled\": true\n          }\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>time based one time password is not verified</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"TOTP Token not verified\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/login.route.js",
    "groupTitle": "Login"
  },
  {
    "type": "put",
    "url": "/api/totp-disable/:userId",
    "title": "Disable two factor or multi-factor authentication",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "disableTwoFactorAuthentication",
    "group": "Multi_Factor_Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>object id of the user registered in the system</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"userId\": \"5791fc7cf7b57f69796ef444\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Disable two factor or multi-factor authentication</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PUT  \\\nhttp://localhost:3000/api/totp-disable/5791fc7cf7b57f69796ef444 \\\n-H 'Content-Type: application/json' \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTI1ODQ0OCwiZXhwIjoxNDY5MzQ0ODQ4LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.Qml7o6QzR-UknIY69WaSJYmCQidMFLwAh4ToIo15qZteGfAu5UPXvMRX_2sx7g2BiZ0Thefw83RtAjq5sswNtw\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Two factor authentication disabled for the account successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Two factor authentication disabled for the account successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/two.factor.authentication.route.js",
    "groupTitle": "Multi_Factor_Authentication"
  },
  {
    "type": "get",
    "url": "/api/totp-setup",
    "title": "Set up two factor or multi-factor authentication for user",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getTOTPSecret",
    "group": "Multi_Factor_Authentication",
    "description": "<p>Set up two factor or multi-factor authentication for user to generate QR code which then can be scanned with any authenticator app like google authenticator. Basically set up Time based One-time Password authentication mechanism</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-v \\\n-X GET  \\\nhttp://localhost:3000/api/totp-setup  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTI1ODQ0OCwiZXhwIjoxNDY5MzQ0ODQ4LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.Qml7o6QzR-UknIY69WaSJYmCQidMFLwAh4ToIo15qZteGfAu5UPXvMRX_2sx7g2BiZ0Thefw83RtAjq5sswNtw\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "qrcode",
            "description": "<p>object containing QR code information data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "qrcode.size",
            "description": "<p>size of one module in pixels. Default 5 for png and undefined for svg..</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "qrcode.path",
            "description": "<p>data for qr code which forms the QR image.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"qrcode\": {\n          \"size\": 47,\n          \"path\": \"M1 1h7v7h-7zM9 1h4v3h-2v-1h1v-1h-3zM14 1h4v1h-2v2h2v1h-1v1h-1v-1h-3v-1h2v-1h-1zM19 1h1v1h1v-1h4v1h-1v3h2v4h1v1h-2v1h-2v-1h-1v1h1v1h-2v-2h-2v1h-1v-2h2v-1h1v-1h-1v1h-1v-2h-1v-1h2v1h1v-2h1v1h1v-2h-2v1h-1v-1h-2v-1h1zM27 1h1v2h-1v2h-1v-2h-1v-1h2zM31 1h3v2h1v1h-2v-1h-1v-1h-1zM37 1h1v1h-1zM39 1h7v7h-7zM2 2v5h5v-5zM29 2h1v1h-1zM36 2h1v2h1v2h-3v-1h1zM40 2v5h5v-5zM3 3h3v3h-3zM31 3h1v3h-5v-1h2v-1h1v1h1zM41 3h3v3h-3zM9 4h1v2h1v1h-1v1h1v-1h1v3h1v1h-1v1h-1v1h-1v-2h1v-1h-4v-1h2zM33 5h1v1h1v1h-1v1h-1v-1h-1v-1h1zM12 6h2v2h-1v-1h-1zM15 6h1v2h1v-1h1v2h-1v3h-1v-3h-1zM22 6v3h3v-3zM23 7h1v1h-1zM27 7h1v1h-1zM29 7h1v1h-1zM31 7h1v1h-1zM35 7h1v1h-1zM37 7h1v1h-1zM28 8h1v2h3v1h-1v1h-2v3h-1v2h1v1h-1v1h-1v-1h-1v1h-1v-2h-1v1h-2v-1h1v-1h-1v-1h-1v-2h1v1h1v1h1v1h2v1h1v-3h1v-2h-1v-2h1zM30 8h1v1h-1zM32 8h1v1h-1zM1 9h1v1h-1zM5 9h1v1h1v1h1v1h-2v-1h-1zM14 9h1v3h-1zM33 9h3v1h-3zM37 9h6v1h1v1h-2v-1h-1v1h-1v1h1v-1h1v1h1v3h1v-1h2v1h-1v1h1v3h-1v1h-2v-1h1v-1h-1v1h-1v1h-1v-1h-2v-1h3v-1h2v-1h-3v-1h1v-2h-1v1h-1v2h-1v2h-1v-2h-1v1h-1v-3h2v1h1v-3h-2v-1h-1v-1h1zM45 9h1v1h-1zM38 10v1h1v-1zM1 11h1v1h-1zM3 11h1v2h-2v-1h1zM19 11h1v1h-1zM32 11h3v1h-1v1h1v4h-1v1h1v1h2v-1h1v1h1v2h1v-1h1v1h1v1h1v-1h1v1h1v1h-2v1h-1v1h1v1h2v2h-1v-1h-1v3h1v2h-2v1h-2v1h1v3h1v2h1v1h-1v2h-1v1h-1v1h-1v1h1v-1h1v2h-5v-1h-1v-1h2v1h1v-2h-2v-2h-1v-2h2v-2h1v-1h-4v2h1v1h-1v1h-1v-2h-1v-1h-1v-1h-1v-1h-1v-1h3v1h2v-1h1v1h1v-1h3v-2h2v-1h1v-1h-1v1h-2v1h-1v-2h1v-1h-1v1h-1v-1h-2v2h-1v-1h-1v-2h3v-1h1v1h3v-2h-2v1h-1v-1h-2v1h-2v1h-1v-1h-2v-1h3v-1h3v-1h1v-2h-1v-2h-1v1h-1v-2h-1v1h-1v2h1v1h-1v2h-2v-1h1v-2h-1v-1h1v-1h-2v-2h1v-1h1v1h2v-1h-2v-1h-1v1h-1v-2h1v-1h2v2h2v-2h-1v-2h-1zM44 11h1v1h1v1h-2zM12 12h2v2h1v2h-2v-1h-1v-1h1v-1h-1zM15 12h1v1h-1zM18 12h1v1h1v1h-2zM20 12h1v1h-1zM23 12h1v1h-1zM35 12h2v1h-2zM1 13h1v1h2v3h-1v1h1v-1h5v1h1v1h1v-1h1v-1h2v2h1v-1h1v-2h1v-2h1v3h2v-1h-1v-1h2v3h1v2h-2v-1h-1v-1h-2v1h-1v1h-1v1h-1v-1h-1v-1h-1v1h1v2h-1v-1h-1v1h1v1h1v1h-1v1h-1v-2h-1v2h1v2h-1v-1h-3v1h1v1h-2v2h-1v1h1v7h-2v-1h-2v-1h3v-1h-2v-1h1v-1h-3v-2h1v-1h1v1h1v-2h-2v1h-1v-3h1v1h3v-1h1v-1h-1v1h-2v-1h1v-1h-1v-1h2v-1h-2v-1h-1v-1h2v1h1v-1h1v-1h1v1h1v-1h1v-1h-1v-1h-2v1h-1v1h-1v-1h-2v-1h-1zM4 13h1v1h-1zM6 13h3v1h-3zM11 13h1v1h-1zM26 13h1v1h-1zM9 14h1v1h1v1h1v1h-1v1h-1v-2h-4v-1h3zM25 14h1v1h-1zM2 15v1h1v-1zM7 19h1v1h-1zM1 20h1v1h-1zM17 20h1v1h-1zM19 20h1v2h1v-1h2v-1h1v1h3v1h1v-2h1v3h-1v1h-1v1h-1v1h-1v1h1v1h-1v1h-2v-1h1v-2h-4v1h-1v-2h2v-1h-1v-1h-2v-2h1zM33 21h1v1h-1zM45 21h1v1h-1zM1 22h1v1h-1zM6 22v3h3v-3zM16 22h1v2h-1zM22 22v3h3v-3zM34 22h1v1h1v1h-2zM38 22v3h3v-3zM2 23h1v1h-1zM7 23h1v1h-1zM23 23h1v1h-1zM29 23h1v1h-1zM39 23h1v1h-1zM18 24h1v1h-1zM44 24h2v1h-2zM1 25h2v1h-2zM12 25h2v1h-2zM17 25h1v2h1v1h1v1h-3v-1h-1v1h1v2h-1v1h-1v1h1v1h-1v1h-1v-1h-2v-2h1v1h1v-1h-1v-1h1v-3h1v-1h1v-1h1zM27 25h2v1h-1v2h-1zM14 26h1v1h-1zM41 26v2h1v-2zM9 27h1v3h-3v-1h1v-1h1zM12 27h1v2h-1zM22 27h1v1h-1zM29 27h1v1h-1zM26 28h1v1h-1zM30 28h2v2h1v1h1v1h2v2h-1v-1h-1v1h-1v-1h-1v-1h-1v-1h-1v1h1v1h-2v1h-1v1h-1v-3h-4v-1h-1v-1h3v-1h1v2h1v-2h2v1h1zM45 28h1v1h-1zM11 29h1v1h1v1h-1v1h-1zM21 29h1v1h-1zM44 29h1v1h-1zM19 30h1v1h-1zM7 31h1v1h-1zM18 31h1v1h-1zM9 32h1v2h-3v-1h2zM20 32h1v3h-2v-2h1zM37 32h1v1h-1zM45 32h1v1h-1zM17 33h1v1h-1zM22 33h1v1h-1zM42 33h3v1h-3zM1 34h1v1h-1zM10 34h2v1h-2zM25 34h1v2h-1zM45 34h1v1h-1zM7 35h1v1h-1zM9 35h1v1h-1zM12 35h2v1h4v1h-1v1h1v-1h2v-1h1v1h3v-1h1v1h1v6h1v-2h2v3h-2v1h2v1h-4v-3h-1v-1h-1v2h1v1h-1v1h-2v-2h1v-1h-1v1h-1v1h-1v-3h1v-1h-3v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1zM18 35h1v1h-1zM22 35h2v1h-2zM28 35h1v3h1v-1h1v1h1v2h-1v-1h-1v1h-3v-3h-1v-1h2zM39 35v1h1v-1zM42 35h3v1h1v2h-1v2h-1v-1h-1v-2h1v-1h-2zM10 36h2v1h1v1h-1v1h-1v1h1v1h1v-2h1v1h1v2h3v2h-2v-1h-2v-1h-1v2h-1v-2h-1v-1h-1v-1h-1v-2h2v-1h-1zM1 37h1v1h-1zM7 37h2v1h-2zM35 37h1v1h-1zM19 38v1h-1v1h3v-2zM22 38v3h3v-3zM38 38v3h3v-3zM1 39h7v7h-7zM23 39h1v1h-1zM39 39h1v1h-1zM2 40v5h5v-5zM32 40h1v1h-1zM3 41h3v3h-3zM9 41h1v1h-1zM31 41h1v1h1v-1h1v1h1v2h-1v2h-2v-1h1v-2h-2v3h-1v-4h1zM10 42h1v1h-1zM43 42h1v1h-1zM41 43h2v1h-2zM44 43h1v1h-1zM14 44h2v1h-1v1h-3v-1h2zM9 45h2v1h-2zM16 45h2v1h-2zM45 45h1v1h-1z\"\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>TOTP token not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"TOTP token not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/two.factor.authentication.route.js",
    "groupTitle": "Multi_Factor_Authentication"
  },
  {
    "type": "post",
    "url": "/api/totp-verify/:userId",
    "title": "Verify the token inputted by the user and if successfull, enable two-factor authentication",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "verifyTOTPSecret",
    "group": "Multi_Factor_Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>object id of the user registered in the system</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "totpToken",
            "description": "<p>Mandatory time-based one time password.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"userId\": \"5791fc7cf7b57f69796ef444\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Verify the token inputted by the user and  if successfull, enable two-factor authentication</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Two factor authentication for user verified successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Two factor authentication for user verified successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"TOTP Token not verified\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/two.factor.authentication.route.js",
    "groupTitle": "Multi_Factor_Authentication"
  },
  {
    "type": "get",
    "url": "/api/news/",
    "title": "Get news list",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getAllNews",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "perpage",
            "description": "<p>Number of data to return on each request</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": "<p>Current page number of pagination system.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>whether to get data with active bit true or false, if true, then returns data list with active bit set to true only</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newsTitle",
            "description": "<p>to filter news list using news title as filter param</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "categoryid",
            "description": "<p>to filter news list according to news category</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"perpage\": 10,\n  \"page\": 1\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n  \"perpage\": 10,\n  \"page\": 1,\n  \"categoryid\": \"578dd25436e469c351f17cd6\"\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n  \"active\": true,\n  \"newstitle\": \"this is news title\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the news list, if exists, else return empty array</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/news\" \\\n--data-urlencode \"perpage=10\" \\\n--data-urlencode \"page=1\"",
        "type": "curl"
      },
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/news\" \\\n--data-urlencode \"perpage=10\" \\\n--data-urlencode \"page=1\" \\\n--data-urlencode \"categoryid=578dd25436e469c351f17cd6\"",
        "type": "curl"
      },
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/news\" \\\n--data-urlencode \"active=true\" \\\n--data-urlencode \"newstitle=Manchester derby more than Mourinho vs Guardiola - Robben\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dataList",
            "description": "<p>list of news</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList._id",
            "description": "<p>object id of news data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.newsTitle",
            "description": "<p>title of the news.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.urlSlog",
            "description": "<p>clean URL of the news title.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.categoryID",
            "description": "<p>object id of the related news category.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.newsSummary",
            "description": "<p>brief description about the news.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.newsDescription",
            "description": "<p>news in detailed description.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.newsAuthor",
            "description": "<p>author of the news.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.newsDate",
            "description": "<p>date of news reported.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.addedOn",
            "description": "<p>system date of news addition.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.image",
            "description": "<p>image list of the news containing cover image only.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.image.imageName",
            "description": "<p>name of the image file ie name of cover image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.image.imageTitle",
            "description": "<p>title description of news image .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.image.imageAltText",
            "description": "<p>alternative text for news image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.image.active",
            "description": "<p>whether image is active or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.image.coverImage",
            "description": "<p>whether image is cover image or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.pageViews",
            "description": "<p>no of times news is viewed.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "dataList.active",
            "description": "<p>active bit status.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "totalItems",
            "description": "<p>total no of news in the related collection in database.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "currentPage",
            "description": "<p>current page number of client pagination system.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"dataList\": [\n          {\n              \"_id\": \"578dd7a1772dc45d60c4f8f0\",\n              \"newsAuthor\": \"Goal.com\",\n              \"newsDescription\": \"<p>The Bayern Munich and Netherlands winger has played under both managers, but has refused to reveal which one he preferred working with</p>\",\n              \"newsSummary\": \"The Bayern Munich and Netherlands winger has played under both managers, but has refused to reveal which one he preferred working with\",\n              \"categoryID\": \"578dd26236e469c351f17cd7\",\n              \"urlSlog\": \"manchester-derby-more-than-mourinho-vs-guardiola-robben\",\n              \"newsTitle\": \"Manchester derby more than Mourinho vs Guardiola - Robben\",\n               \"addedOn\": \"2016-07-19T07:34:23.050Z\",\n              \"active\": true,\n              \"pageViews\": 0,\n              \"image\": [\n                  {\n                      \"_id\": \"578dd7a1772dc45d60c4f8ef\",\n                      \"imageName\": \"news-1468913569542.webp\",\n                      \"active\": true,\n                      \"coverImage\": true\n                  }\n              ],\n              \"newsDate\": \"2016-07-18T18:15:00.000Z\"\n          }\n      ],\n      \"totalItems\": 1,\n      \"currentPage\": 1\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>News not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"News not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/news.route.js",
    "groupTitle": "News"
  },
  {
    "type": "get",
    "url": "/api/newscategory/",
    "title": "Get News category list",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getAllNewsCategory",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>whether to get data with active bit true or false, if true, then returns data list with active bit set to true only</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"active\": true\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the news category list, if exists, else return empty array</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/newscategory\"",
        "type": "curl"
      },
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/newscategory\" \\\n--data-urlencode \"active=true\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of news category data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "categoryName",
            "description": "<p>name of the category of news.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "categoryDescription",
            "description": "<p>brief description about news category.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "urlSlogCategory",
            "description": "<p>clean URL of news category.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>active bit status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n       {\n           \"_id\": \"578dd25436e469c351f17cd6\",\n           \"urlSlogCategory\": \"politics\",\n           \"categoryDescription\": \"Contains political news\",\n           \"categoryName\": \"Politics\",\n           \"active\": true\n       }\n   ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>News category not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"News category not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/news.route.js",
    "groupTitle": "News"
  },
  {
    "type": "get",
    "url": "/api/newsimage/:newsId",
    "title": "Get image list for the particular news data",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getAllNewsImagesByNewsID",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newsId",
            "description": "<p>object id of the news data</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>whether to get data i.e news image list with active bit true or false, if true, then returns data list with active bit set to true only</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"newsId\": \"578dd7a1772dc45d60c4f8f0\"\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n  \"newsId\": \"578dd7a1772dc45d60c4f8f0\",\n  \"active\": true\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the related image list of the particular news, if exists, else return empty array</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/newsimage/578dd7a1772dc45d60c4f8f0\"",
        "type": "curl"
      },
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/newsimage/578dd7a1772dc45d60c4f8f0\" \\\n--data-urlencode \"active=true\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "image",
            "description": "<p>list of images related to the particular news.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image._id",
            "description": "<p>object id of news image data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image.imageName",
            "description": "<p>name of the image file .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image.imageTitle",
            "description": "<p>title description of news image .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image.imageAltText",
            "description": "<p>alternative text for news image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image.active",
            "description": "<p>whether image is active or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image.coverImage",
            "description": "<p>whether image is cover image or not.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"image\": [\n          {\n              \"_id\": \"578dd7a1772dc45d60c4f8ef\",\n              \"imageName\": \"news-1468913569542.webp\",\n              \"imageAltText\": \"Pogba football player\",\n              \"imageTitle\": \"transfer gossip of pogba to Man utd\",\n              \"active\": true,\n              \"coverImage\": true\n          }\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>News image not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"News image not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/news.route.js",
    "groupTitle": "News"
  },
  {
    "type": "get",
    "url": "/api/news/:newsId",
    "title": "Get news object by Id",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getNewsByID",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newsId",
            "description": "<p>object id of the news data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"newsId\": \"578dd7a1772dc45d60c4f8f0\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the news object by Id, if exists, else return empty object</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/news/578dd7a1772dc45d60c4f8f0\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of news data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "newsTitle",
            "description": "<p>title of the news.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "urlSlog",
            "description": "<p>clean URL of the news title.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "categoryID",
            "description": "<p>object id of the related news category.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "newsSummary",
            "description": "<p>brief description about the news.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "newsDescription",
            "description": "<p>news in detailed description.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "newsAuthor",
            "description": "<p>author of the news.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "newsDate",
            "description": "<p>date of news reported.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addedOn",
            "description": "<p>system date of news addition.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>image list of the news containing cover image only.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image.imageName",
            "description": "<p>name of the image file ie name of cover image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image.imageTitle",
            "description": "<p>title description of news image .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image.imageAltText",
            "description": "<p>alternative text for news image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image.active",
            "description": "<p>whether image is active or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image.coverImage",
            "description": "<p>whether image is cover image or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image.imageProperties",
            "description": "<p>meta-data info of image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image.imageProperties.imageExtension",
            "description": "<p>extension of image file .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image.imageProperties.imagePath",
            "description": "<p>path of image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pageViews",
            "description": "<p>no of times news is viewed.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>active bit status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"_id\": \"578dd7a1772dc45d60c4f8f0\",\n      \"newsAuthor\": \"Goal.com\",\n      \"newsDescription\": \"<p>The Bayern Munich and Netherlands winger has played under both managers, but has refused to reveal which one he preferred working with</p>\",\n      \"newsSummary\": \"The Bayern Munich and Netherlands winger has played under both managers, but has refused to reveal which one he preferred working with\",\n      \"categoryID\": \"578dd26236e469c351f17cd7\",\n      \"urlSlog\": \"manchester-derby-more-than-mourinho-vs-guardiola-robben\",\n      \"newsTitle\": \"Manchester derby more than Mourinho vs Guardiola - Robben\",\n      \"addedOn\": \"2016-07-19T07:34:23.050Z\",\n      \"active\": true,\n      \"pageViews\": 0,\n      \"image\": [\n          {\n              \"_id\": \"578dd7a1772dc45d60c4f8ef\",\n              \"imageName\": \"news-1468913569542.webp\",\n              \"imageProperties\": {\n                  \"imageExtension\": \"jpg\",\n                  \"imagePath\": \"public/uploads/images/news/news-1468913569542.jpg\"\n              },\n              \"active\": true,\n              \"coverImage\": true\n          }\n      ],\n      \"newsDate\": \"2016-07-18T18:15:00.000Z\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>News not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"News not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/news.route.js",
    "groupTitle": "News"
  },
  {
    "type": "get",
    "url": "/api/newscategory/:newsCategoryId",
    "title": "Get News category information by Id",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getNewsCategoryInfoByID",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newsCategoryId",
            "description": "<p>object id of the news category data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"newsCategoryId\": \"578dd25436e469c351f17cd6\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the news category object by Id, if exists, else return empty object</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/newscategory/578dd25436e469c351f17cd6\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of news category data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "categoryName",
            "description": "<p>name of the category of news.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "categoryDescription",
            "description": "<p>brief description about news category.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "urlSlogCategory",
            "description": "<p>clean URL of news category.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>active bit status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"_id\": \"578dd25436e469c351f17cd6\",\n      \"urlSlogCategory\": \"politics\",\n      \"categoryDescription\": \"Contains political news\",\n      \"categoryName\": \"Politics\",\n      \"active\": true\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>News category not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"News category not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/news.route.js",
    "groupTitle": "News"
  },
  {
    "type": "get",
    "url": "/api/newsdetail/:year/:month/:day/:titleSlog",
    "title": "Get news detail by title slog or clean url",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getNewsDetailByTitleSlog",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "year",
            "description": "<p>year on which news was reported</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "month",
            "description": "<p>month on which news was reported</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "day",
            "description": "<p>day on which news was reported</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "titleSlog",
            "description": "<p>clean url of the news title</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"year\": \"2016\",\n  \"month\": \"09\",\n  \"day\": \"21\",\n  \"titleSlog\": \"manchester-derby-more-than-mourinho-vs-guardiola-robben\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the news detailed object using clean url, if exists, else return empty object</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/newsdetail/2016/07/19/manchester-derby-more-than-mourinho-vs-guardiola-robben\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of news data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "newsTitle",
            "description": "<p>title of the news.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "urlSlog",
            "description": "<p>clean URL of the news title.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "categoryID",
            "description": "<p>object id of the related news category.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "newsSummary",
            "description": "<p>brief description about the news.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "newsDescription",
            "description": "<p>news in detailed description.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "newsAuthor",
            "description": "<p>author of the news.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addedOn",
            "description": "<p>system date of news addition.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "newsDate",
            "description": "<p>date of news reported.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "image",
            "description": "<p>list of images related to the news.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image._id",
            "description": "<p>object id of news image data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image.imageName",
            "description": "<p>name of the image file .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image.imageTitle",
            "description": "<p>title description of news image .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image.imageAltText",
            "description": "<p>alternative text for news image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image.active",
            "description": "<p>whether image is active or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image.coverImage",
            "description": "<p>whether image is cover image or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pageViews",
            "description": "<p>no of times news is viewed.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>active bit status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"_id\": \"578dd7a1772dc45d60c4f8f0\",\n      \"newsAuthor\": \"Goal.com\",\n      \"newsDescription\": \"<p>The Bayern Munich and Netherlands winger has played under both managers, but has refused to reveal which one he preferred working with</p>\",\n      \"newsSummary\": \"The Bayern Munich and Netherlands winger has played under both managers, but has refused to reveal which one he preferred working with\",\n      \"categoryID\": \"578dd26236e469c351f17cd7\",\n      \"urlSlog\": \"manchester-derby-more-than-mourinho-vs-guardiola-robben\",\n      \"newsTitle\": \"Manchester derby more than Mourinho vs Guardiola - Robben\",\n      \"addedOn\": \"2016-07-19T07:34:23.050Z\",\n      \"active\": true,\n      \"pageViews\": 0,\n      \"image\": [\n          {\n              \"_id\": \"578dd7a1772dc45d60c4f8ef\",\n              \"imageName\": \"news-1468913569542.webp\",\n              \"imageAltText\": \"Pogba football player\",\n              \"imageTitle\": \"transfer gossip of pogba to Man utd\",\n              \"active\": true,\n              \"coverImage\": true\n          },\n          {\n              \"_id\": \"578ddffb4b3606d175b2cea2\",\n              \"imageAltText\": \"Searching earthquake victims in Nepal\",\n              \"imageTitle\": \"Searching earthquake victims\",\n              \"imageName\": \"news-1468915707928.webp\",\n              \"active\": true,\n              \"coverImage\": false\n          }\n      ],\n      \"newsDate\": \"2016-07-18T18:15:00.000Z\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>News not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"News not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/news.route.js",
    "groupTitle": "News"
  },
  {
    "type": "get",
    "url": "/api/newsimage/:newsId/:imageId",
    "title": "Get image object of the particular news.",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getNewsImageInfoByImageID",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newsId",
            "description": "<p>object id of the news data</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imageId",
            "description": "<p>object id of the news image data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"newsId\": \"578dd7a1772dc45d60c4f8f0\",\n  \"imageId\": \"578dd7a1772dc45d60c4f8ef\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the image object of the particular news, if exists, else return empty object</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/newsimage/578dd7a1772dc45d60c4f8f0/578dd7a1772dc45d60c4f8ef\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of news image data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageName",
            "description": "<p>name of the image file .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageTitle",
            "description": "<p>title description of news image .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageAltText",
            "description": "<p>alternative text for news image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "active",
            "description": "<p>whether image is active or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "coverImage",
            "description": "<p>whether image is cover image or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties",
            "description": "<p>meta-data info of image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imageExtension",
            "description": "<p>extension of image file .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imagePath",
            "description": "<p>path of image file.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n  {\n    \"_id\": \"578dd7a1772dc45d60c4f8ef\",\n    \"imageName\": \"news-1468913569542.webp\",\n    \"imageAltText\": \"Pogba football player\",\n    \"imageTitle\": \"transfer gossip of pogba to Man utd\",\n    \"active\": true,\n    \"imageProperties\": {\n        \"imageExtension\": \"jpg\",\n        \"imagePath\": \"public/uploads/images/news/news-1468913569542.jpg\"\n    },\n    \"coverImage\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>News image not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"News image not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/news.route.js",
    "groupTitle": "News"
  },
  {
    "type": "patch",
    "url": "/api/news/:newsId",
    "title": "Deletes existing News data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "patchNews",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newsId",
            "description": "<p>object id of the news data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"newsId\": \"578dd7a1772dc45d60c4f8f0\"\n  }",
          "type": "json"
        }
      ]
    },
    "description": "<p>Deletes existing news information from the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PATCH  \\\nhttp://localhost:3000/api/news/578dfaeae392bd75218e743a \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODkyMTU1MiwiZXhwIjoxNDY4OTQxNTUyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wyt4E06UCFRkBpKD7ThHcWODCxGfO0j3Zv0k-cRTh0nYTHsKjVS4WgpefcLy-o_67aeSh42-wEqq0tBvxk603A\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>News deleted successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"News deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/news.route.js",
    "groupTitle": "News"
  },
  {
    "type": "patch",
    "url": "/api/newscategory/:newsCategoryId",
    "title": "Deletes existing News category data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "patchNewsCategory",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newsCategoryId",
            "description": "<p>object id of the news category data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"newsCategoryId\": \"578df84e02c537521c1a725f\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Deletes existing news category information from the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PATCH  \\\nhttp://localhost:3000/api/newscategory/578df84e02c537521c1a725f \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODkyMTU1MiwiZXhwIjoxNDY4OTQxNTUyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wyt4E06UCFRkBpKD7ThHcWODCxGfO0j3Zv0k-cRTh0nYTHsKjVS4WgpefcLy-o_67aeSh42-wEqq0tBvxk603A\" \\",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>News category deleted successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"News category deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/news.route.js",
    "groupTitle": "News"
  },
  {
    "type": "post",
    "url": "/api/news/",
    "title": "Post News data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postNews",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newsTitle",
            "description": "<p>Mandatory title of the news.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "categoryID",
            "description": "<p>Mandatory object id of the related news category.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newsDescription",
            "description": "<p>Mandatory news in detailed description.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newsDate",
            "description": "<p>Mandatory date of news reported.</p>"
          }
        ]
      }
    },
    "description": "<p>saves news information to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X POST  \\\nhttp://localhost:3000/api/news/ \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODkyMTU1MiwiZXhwIjoxNDY4OTQxNTUyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wyt4E06UCFRkBpKD7ThHcWODCxGfO0j3Zv0k-cRTh0nYTHsKjVS4WgpefcLy-o_67aeSh42-wEqq0tBvxk603A\" \\\n-F imageName=@public/images/404_banner.png  \\\n-F \"data={\\\"newsTitle\\\": \\\"news title\\\",\\\"newsDescription\\\": \\\"news detail\\\",\\\"newsAuthor\\\": \\\"lakhe\\\",\\\"newsDate\\\": \\\"2016-02-12\\\",\\\"categoryID\\\": \\\"578dd25436e469c351f17cd6\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>News saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"News saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>validation errors due to not entering values for news title, news description, categoryID, news date and invalid news date</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>News with same title already exists</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\":[\n                 {\"param\":\"newsTitle\",\"msg\":\"News title is required\",\"value\":\"\"},\n                 {\"param\":\"categoryID\",\"msg\":\"Category of news is required\"},\n                 {\"param\":\"newsDescription\",\"msg\":\"News description is required\",\"value\":\"\"}\n            ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"News with same title already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/news.route.js",
    "groupTitle": "News"
  },
  {
    "type": "post",
    "url": "/api/newscategory/",
    "title": "Post News category data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postNewsCategory",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "categoryName",
            "description": "<p>Mandatory name of the category of news.</p>"
          }
        ]
      }
    },
    "description": "<p>saves news category information to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X POST  \\\nhttp://localhost:3000/api/newscategory/ \\\n-H 'Content-Type: application/json' \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODkyMTU1MiwiZXhwIjoxNDY4OTQxNTUyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wyt4E06UCFRkBpKD7ThHcWODCxGfO0j3Zv0k-cRTh0nYTHsKjVS4WgpefcLy-o_67aeSh42-wEqq0tBvxk603A\" \\\n-d '{\"categoryName\": \"Sports\", \"categoryDescription\": \"Contains sports related news\",\"active\": true}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>News category saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"News category saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>category name is required</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>News category with same name already exists</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": \"Category title is required\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"Category with same title already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/news.route.js",
    "groupTitle": "News"
  },
  {
    "type": "post",
    "url": "/api/newsimage/:newsId",
    "title": "Post News image data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postNewsImageInfo",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newsId",
            "description": "<p>object id of the news data</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imageName",
            "description": "<p>Mandatory name of the image file .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"newsId\": \"578dd7a1772dc45d60c4f8f0\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>saves news image information to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X POST  \\\nhttp://localhost:3000/api/newsimage/578dfaeae392bd75218e743a \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODkyMTU1MiwiZXhwIjoxNDY4OTQxNTUyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wyt4E06UCFRkBpKD7ThHcWODCxGfO0j3Zv0k-cRTh0nYTHsKjVS4WgpefcLy-o_67aeSh42-wEqq0tBvxk603A\" \\\n-F imageName=@public/images/404_banner.png  \\\n-F \"data={\\\"imageTitle\\\": \\\"beautiful image\\\",\\\"imageAltText\\\": \\\"indeed very beautiful image\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>News image saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"News image saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>please upload image</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": \"Please upload news\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/news.route.js",
    "groupTitle": "News"
  },
  {
    "type": "delete",
    "url": "/api/newsimage/:newsId/:imageId",
    "title": "Deletes news image data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "removeNewsImage",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newsId",
            "description": "<p>object id of the news data</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imageId",
            "description": "<p>object id of the news image data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"newsId\": \"578dd7ff772dc45d60c4f8f2\",\n  \"imageId\": \"578dd7ff772dc45d60c4f8f1\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Deletes news image information from the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X DELETE  \\\nhttp://localhost:3000/api/newsimage/578dd7ff772dc45d60c4f8f2/578e0996a35b7b093d238e46 \\\n-H 'Content-Type: application/json' \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODkyMTU1MiwiZXhwIjoxNDY4OTQxNTUyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wyt4E06UCFRkBpKD7ThHcWODCxGfO0j3Zv0k-cRTh0nYTHsKjVS4WgpefcLy-o_67aeSh42-wEqq0tBvxk603A\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>News image deleted successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"News image deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Cover image cannot be deleted</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\":\"Cover image cannot be deleted\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/news.route.js",
    "groupTitle": "News"
  },
  {
    "type": "patch",
    "url": "/api/newsimage/:newsId/:imageId",
    "title": "Updates news cover image",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateCoverImage",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newsId",
            "description": "<p>object id of the news data</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imageId",
            "description": "<p>object id of the news image data that is currently a cover image</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of the news image data that is to be set as a cover image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"newsId\": \"578dd7ff772dc45d60c4f8f2\",\n  \"imageId\": \"578dd7ff772dc45d60c4f8f1\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates news cover image information to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PATCH  \\\nhttp://localhost:3000/api/newsimage/578dd7ff772dc45d60c4f8f2/578dd7ff772dc45d60c4f8f1 \\\n-H 'Content-Type: application/json' \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODkyMTU1MiwiZXhwIjoxNDY4OTQxNTUyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wyt4E06UCFRkBpKD7ThHcWODCxGfO0j3Zv0k-cRTh0nYTHsKjVS4WgpefcLy-o_67aeSh42-wEqq0tBvxk603A\" \\\n-d '{\"_id\": \"578e0996a35b7b093d238e46\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>News Cover image updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Cover image updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/news.route.js",
    "groupTitle": "News"
  },
  {
    "type": "put",
    "url": "/api/news/:newsId",
    "title": "Updates existing News data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateNews",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newsId",
            "description": "<p>object id of the news data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"newsId\": \"578dd7a1772dc45d60c4f8f0\"\n  }",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates existing news information to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PUT  \\\nhttp://localhost:3000/api/news/578dfaeae392bd75218e743a \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODkyMTU1MiwiZXhwIjoxNDY4OTQxNTUyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wyt4E06UCFRkBpKD7ThHcWODCxGfO0j3Zv0k-cRTh0nYTHsKjVS4WgpefcLy-o_67aeSh42-wEqq0tBvxk603A\" \\\n-F imageName=@public/images/404_banner.png  \\\n-F \"data={\\\"newsTitle\\\": \\\"news title hello\\\",\\\"newsDescription\\\": \\\"news detail\\\",\\\"newsAuthor\\\": \\\"lakhe\\\",\\\"newsDate\\\": \\\"2016-02-12\\\",\\\"categoryID\\\": \\\"578dd25436e469c351f17cd6\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>News updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"News updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>validation errors due to not entering values for news title, news description, categoryID, news date and invalid news date</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>News with same title already exists</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\":[\n                 {\"param\":\"newsTitle\",\"msg\":\"News title is required\",\"value\":\"\"},\n                 {\"param\":\"categoryID\",\"msg\":\"Category of news is required\"},\n                 {\"param\":\"newsDescription\",\"msg\":\"News description is required\",\"value\":\"\"}\n            ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"News with same title already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/news.route.js",
    "groupTitle": "News"
  },
  {
    "type": "put",
    "url": "/api/newscategory/:newsCategoryId",
    "title": "Updates existing News category data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateNewsCategory",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newsCategoryId",
            "description": "<p>object id of the news category data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"newsCategoryId\": \"578df84e02c537521c1a725f\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates existing news category information to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PUT  \\\nhttp://localhost:3000/api/newscategory/578df84e02c537521c1a725f \\\n-H 'Content-Type: application/json' \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODkyMTU1MiwiZXhwIjoxNDY4OTQxNTUyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wyt4E06UCFRkBpKD7ThHcWODCxGfO0j3Zv0k-cRTh0nYTHsKjVS4WgpefcLy-o_67aeSh42-wEqq0tBvxk603A\" \\\n-d '{\"categoryName\": \"Sports\", \"categoryDescription\": \"Contains sports related news and gossips\",\"active\": true}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>News category updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"News category updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>category name is required</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>News category with same name already exists</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": \"Category title is required\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"Category with same title already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/news.route.js",
    "groupTitle": "News"
  },
  {
    "type": "put",
    "url": "/api/newsimage/:newsId/:imageId",
    "title": "Updates existing News image data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateNewsImageInfo",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newsId",
            "description": "<p>object id of the news data</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imageId",
            "description": "<p>object id of the news image data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"newsId\": \"578dd7ff772dc45d60c4f8f2\",\n  \"imageId\": \"578dd7ff772dc45d60c4f8f1\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates existing news image information to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PUT  \\\nhttp://localhost:3000/api/newsimage/578dd7ff772dc45d60c4f8f2/578dd7ff772dc45d60c4f8f1 \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODkyMTU1MiwiZXhwIjoxNDY4OTQxNTUyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wyt4E06UCFRkBpKD7ThHcWODCxGfO0j3Zv0k-cRTh0nYTHsKjVS4WgpefcLy-o_67aeSh42-wEqq0tBvxk603A\" \\\n-F imageName=@public/images/404_banner.png  \\\n-F \"data={\\\"imageTitle\\\": \\\"beautiful image haha very very attractive\\\",\\\"imageAltText\\\": \\\"indeed very beautiful image\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>News image updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"News image updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>please upload image</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": \"Please upload news\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/news.route.js",
    "groupTitle": "News"
  },
  {
    "type": "get",
    "url": "/api/organization/info/",
    "title": "Get Organization Information",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getOrganizationInfo",
    "group": "OrganizationInfo",
    "description": "<p>Retrieves the organization information if exists, else return empty object</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/api/organization/info",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of the organization info data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "orgName",
            "description": "<p>name of the organization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>name of the country organization currently resides.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "region",
            "description": "<p>name of the region.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>name of the state.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>name of the city.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addressLine",
            "description": "<p>address of the organization.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "streetAddress",
            "description": "<p>street address of the organization.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "zipAddress",
            "description": "<p>zip address.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "postalCode",
            "description": "<p>postal code.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "organizationEmail",
            "description": "<p>official email of the organization.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Phone Number of an organization.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobile Number of the contact person of the organization.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "faxNumber",
            "description": "<p>Fax-Number of an organization.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "facebookURL",
            "description": "<p>Facebook account url of the organization.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "twitterURL",
            "description": "<p>Twitter account url of the organization.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "googlePlusURL",
            "description": "<p>Google-Plus account url of the organization.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "linkedInURL",
            "description": "<p>LinkedIn account url of the organization.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "slogan",
            "description": "<p>Slogan of the company.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "logoImageName",
            "description": "<p>Image name of the logo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties",
            "description": "<p>Metadata information of logo image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imageExtension",
            "description": "<p>Metadata information of logo image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imagePath",
            "description": "<p>path of logo image file.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"_id\": \"57076e54c795d673583483e9\",\n\"orgName\":\"Nodebeats\",\n\"country\": \"United States of America\",\n\"region\": \"Central Region\",\n\"state\": \"Pradesh Number 2\",\n\"city\": \"Lalitpur\",\n\"addressLine\": \"Thaiba -11\",\n\"streetAddress\": \"Godawari Street\",\n\"zipAddress\": \"00977\",\n\"postalCode\": \"44700\",\n\"organizationEmail\": \"bitsbeat@gmail.com\",\n\"phoneNumber\": \"977-01-5560147\",\n\"mobileNumber\": \"977-9818278372\",\n\"faxNumber\": \"977-01-4523659\",\n\"facebookURL\": \"https://facebook.com\",\n\"twitterURL\": \"https://twitter.com\",\n\"googlePlusURL\": \"https://googleplus.com\",\n\"linkedInURL\": \"https://linkedin.com\",\n\"slogan\": \"Slogan haha\",\n\"logoImageName\": \"image_1.jpg\",\n\"imageProperties\": {\n  \"imageExtension\": \"jpg\"\n  \"imagePath\": \"/path/image_1.jpg\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Organization information not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Organization information not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/organization.info.route.js",
    "groupTitle": "OrganizationInfo"
  },
  {
    "type": "get",
    "url": "/api/organization/info/:organizationInfoId",
    "title": "Get Organization Info by Id",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getOrganizationInfoByID",
    "group": "OrganizationInfo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "organizationInfoId",
            "description": "<p>object id of the organization info data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"organizationInfoId\": \"57889ae9585d9632523f1234\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the organization information querying by id if exists, else return empty object</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/api/organization/info/57076e54c795d673583483e9",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of the organization info data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "orgName",
            "description": "<p>name of the organization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>name of the country organization currently resides.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "region",
            "description": "<p>name of the region.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>name of the state.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>name of the city.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addressLine",
            "description": "<p>address of the organization.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "streetAddress",
            "description": "<p>street address of the organization.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "zipAddress",
            "description": "<p>zip address.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "postalCode",
            "description": "<p>postal code.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "organizationEmail",
            "description": "<p>official email of the organization.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Phone Number of an organization.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobile Number of the contact person of the organization.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "faxNumber",
            "description": "<p>Fax-Number of an organization.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "facebookURL",
            "description": "<p>Facebook account url of the organization.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "twitterURL",
            "description": "<p>Twitter account url of the organization.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "googlePlusURL",
            "description": "<p>Google-Plus account url of the organization.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "linkedInURL",
            "description": "<p>LinkedIn account url of the organization.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "slogan",
            "description": "<p>Slogan of the company.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "logoImageName",
            "description": "<p>Image name of the logo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties",
            "description": "<p>Metadata information of logo image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imageExtension",
            "description": "<p>Metadata information of logo image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imagePath",
            "description": "<p>path of logo image file.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"_id\": \"57076e54c795d673583483e9\",\n\"orgName\":\"Nodebeats\",\n\"country\": \"United States of America\",\n\"region\": \"Central Region\",\n\"state\": \"Pradesh Number 2\",\n\"city\": \"Lalitpur\",\n\"addressLine\": \"Thaiba -11\",\n\"streetAddress\": \"Godawari Street\",\n\"zipAddress\": \"00977\",\n\"postalCode\": \"44700\",\n\"organizationEmail\": \"bitsbeat@gmail.com\",\n\"phoneNumber\": \"977-01-5560147\",\n\"mobileNumber\": \"977-9818278372\",\n\"faxNumber\": \"977-01-4523659\",\n\"facebookURL\": \"https://facebook.com\",\n\"twitterURL\": \"https://twitter.com\",\n\"googlePlusURL\": \"https://googleplus.com\",\n\"linkedInURL\": \"https://linkedin.com\",\n\"slogan\": \"Slogan haha\",\n\"logoImageName\": \"image_1.jpg\",\n\"imageProperties\": {\n  \"imageExtension\": \"jpg\"\n  \"imagePath\": \"/path/image_1.jpg\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Organization information not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Organization information not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/organization.info.route.js",
    "groupTitle": "OrganizationInfo"
  },
  {
    "type": "post",
    "url": "/api/organization/info/",
    "title": "Post organization Info",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postOrganizationInfo",
    "group": "OrganizationInfo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "orgName",
            "description": "<p>Mandatory name of the organization</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>Mandatory name of the country organization currently resides.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>Mandatory name of the city.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "streetAddress",
            "description": "<p>Mandatory street address of the organization.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "organizationEmail",
            "description": "<p>Mandatory  official email of the organization.</p>"
          }
        ]
      }
    },
    "description": "<p>saves organization information to the database along with uploading of logo image of the organization</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-v \\\n-X POST  \\\nhttp://localhost:3000/api/organization/info/ \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODQ5MDM0NywiZXhwIjoxNDY4NTEwMzQ3LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.mPvyA2KmBHHm2BHCITXq_B9HKu-01YseiKOSII43MxM8RHOiOllxvqZZT-1BENIKUfT_Ia481tnSZE_6ooCZpQ\" \\\n-F imageName=@public/images/404_banner.png  \\\n-F \"data={\\\"orgName\\\": \\\"Nodebeats\\\",\\\"country\\\": \\\"United States of America\\\",\\\"region\\\": \\\"Central Region\\\",\\\"state\\\": \\\"Pradesh Number 2\\\",\\\"city\\\": \\\"Lalitpur\\\",\\\"addressLine\\\":\\\"Thaiba-11\\\",\\\"streetAddress\\\": \\\"Godawari Street\\\",\\\"zipAddress\\\": \\\"00977\\\",\\\"postalCode\\\": \\\"44700\\\",\\\"organizationEmail\\\":\\\"bitsbeat@gmail.com\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Organization information saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Organization information saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Organization Information already exists, only can update existing data. new inserts is not allowed</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "Array",
            "optional": false,
            "field": "message",
            "description": "<p>Organization Info post method throws error if either of organization name, country, city, streetAddress and organizationEmail is not provided or invalid data entry of organizationEmail, facebookURL, twitterURL, googlePlusURL, linkedInURL</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"You can only update organization information\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"[{\"param\":\"orgName\",\"msg\":\"Organization Name is required\",\"value\":\"\"},{\"param\":\"city\",\"msg\":\"City is required\",\"value\":\"\"},{\"param\":\"streetAddress\",\"msg\":\"Street address is required\",\"value\":\"\"},{\"param\":\"organizationEmail\",\"msg\":\"Email is required\",\"value\":\"\"},{\"param\":\"organizationEmail\",\"msg\":\"Invalid Email\",\"value\":\"\"}]\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/organization.info.route.js",
    "groupTitle": "OrganizationInfo"
  },
  {
    "type": "put",
    "url": "/api/organization/info/:organizationInfoId",
    "title": "Update organization Info",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateOrganizationInfo",
    "group": "OrganizationInfo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "organizationInfoId",
            "description": "<p>object id of the organization info data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"organizationInfoId\": \"57889ae9585d9632523f1234\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>update organization information to the database along with upload of logo image of the organization</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-v \\\n-X PUT  \\\nhttp://localhost:3000/api/organization/info/578765a28d968678730b8b64 \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODQ5MDM0NywiZXhwIjoxNDY4NTEwMzQ3LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.mPvyA2KmBHHm2BHCITXq_B9HKu-01YseiKOSII43MxM8RHOiOllxvqZZT-1BENIKUfT_Ia481tnSZE_6ooCZpQ\" \\\n-F imageName=@public/images/404_banner.png  \\\n-F \"data={\\\"orgName\\\": \\\"Nodebeats\\\",\\\"country\\\": \\\"United States of America\\\",\\\"region\\\": \\\"Central Region\\\",\\\"state\\\": \\\"Pradesh Number 2\\\",\\\"city\\\": \\\"Lalitpur\\\",\\\"addressLine\\\":\\\"Thaiba-11\\\",\\\"streetAddress\\\": \\\"Godawari Street\\\",\\\"zipAddress\\\": \\\"00977\\\",\\\"postalCode\\\": \\\"44700\\\",\\\"organizationEmail\\\":\\\"bitsbeat@gmail.com\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Organization information updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Organization information updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "Array",
            "optional": false,
            "field": "message",
            "description": "<p>Organization Info put method throws error if either of organization name, country, city, streetAddress and organizationEmail is not provided or invalid data entry of organizationEmail, facebookURL, twitterURL, googlePlusURL, linkedInURL</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"[{\"param\":\"orgName\",\"msg\":\"Organization Name is required\",\"value\":\"\"},{\"param\":\"city\",\"msg\":\"City is required\",\"value\":\"\"},{\"param\":\"streetAddress\",\"msg\":\"Street address is required\",\"value\":\"\"},{\"param\":\"organizationEmail\",\"msg\":\"Email is required\",\"value\":\"\"},{\"param\":\"organizationEmail\",\"msg\":\"Invalid Email\",\"value\":\"\"}]\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/organization.info.route.js",
    "groupTitle": "OrganizationInfo"
  },
  {
    "type": "get",
    "url": "/api/password-change/confirm/:passwordChangeToken",
    "title": "Verify the password change action  by clicking on the link url sent to the email",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "confirmPasswordChangeAction",
    "group": "PasswordChangeVerify",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "passwordChangeToken",
            "description": "<p>hashed verification token sent to the email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"passwordChangeToken\": \"c69dfe42cb583cfdea47663d6c45bc1110a5\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Redirect the user to password change route</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 302 Page Redirection\n    Redirects the user to the password change route",
          "type": "json"
        }
      ]
    },
    "description": "<p>Confirm the Password change verification action by clicking on the link url sent to the email</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/password-change/confirm/c69dfe42cb583cfdea47663d6c45bc1110a5\"",
        "type": "curl"
      }
    ],
    "error": {
      "fields": {
        "Expired": [
          {
            "group": "Expired",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Redirect the user to token-expired route</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Redirect the user to page not found route</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 302 Page Redirection\n    Redirects the user to the token-expired route",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 302 Page Redirection\n   Redirects the user to Page Not Found route",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/password.change.verify.route.js",
    "groupTitle": "PasswordChangeVerify"
  },
  {
    "type": "patch",
    "url": "/api/roles/:roleId",
    "title": "Deletes existing User Role Information object",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "deleteRoleInfo",
    "group": "Role_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "roleId",
            "description": "<p>Object ID of the user role object information</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"roleId\": \"57f365b9ef6b0749194f8101\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Deletes existing user role information from the database.</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\ncurl \\\n-v \\\n-X PATCH  \\\nhttp://localhost:3000/api/roles/57f365b9ef6b0749194f8101 \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTU2NTg3OCwiZXhwIjoxNDc1NjUyMjc4LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.D5FJ7i6ycZBhYc-kHni6WnjCOGCEZBMsZu9yeCajO_bhVzH-muqUvZ6K5072vwO7LoKB0eTKa1friGngrpRJ9w\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User Role deleted successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"User Role deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotAllowed": [
          {
            "group": "NotAllowed",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Admin role cannot be deleted.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 405 Not Allowed\n{\n  \"message\": \"Admin role cannot be deleted\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/role.management.route.js",
    "groupTitle": "Role_Management"
  },
  {
    "type": "get",
    "url": "/api/roles/",
    "title": "Get User Role list",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getAllRoles",
    "group": "Role_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>whether to get data with active bit true or false, if true, then returns data list with active bit set to true only</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rolename",
            "description": "<p>Filter the list of roles and display only those matching specified role</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"active\": true\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n  \"rolename\": \"admin\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the User Role list for role based authorization, if exists, else return empty array</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\ncurl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/roles\" \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTU2NTg3OCwiZXhwIjoxNDc1NjUyMjc4LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.D5FJ7i6ycZBhYc-kHni6WnjCOGCEZBMsZu9yeCajO_bhVzH-muqUvZ6K5072vwO7LoKB0eTKa1friGngrpRJ9w\"",
        "type": "curl"
      },
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/roles\" \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTU2NTg3OCwiZXhwIjoxNDc1NjUyMjc4LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.D5FJ7i6ycZBhYc-kHni6WnjCOGCEZBMsZu9yeCajO_bhVzH-muqUvZ6K5072vwO7LoKB0eTKa1friGngrpRJ9w\" \\\n--data-urlencode \"active=true\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of User role data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roleName",
            "description": "<p>title of the role entered by the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>active bit status.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "read",
            "description": "<p>read access granted to the role.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "write",
            "description": "<p>write access granted to the role in combination with either create or change action enables either insert or update features respectively.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "create",
            "description": "<p>User having both create and write access  granted to the role can insert new document.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "change",
            "description": "<p>User having both change and write access  granted to the role can update existing document.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "delete",
            "description": "<p>delete access granted to the role, deletes data permanently .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n       {\n              \"_id\": \"57f347c55dd74725fd59cce1\",\n              \"roleName\": \"reader\",\n              \"active\": true,\n              \"change\": false,\n              \"delete\": false,\n              \"create\": false,\n              \"write\": false,\n              \"read\": true\n          }\n   ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User Role not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"User Role not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/role.management.route.js",
    "groupTitle": "Role_Management"
  },
  {
    "type": "get",
    "url": "/api/roles/:roleId",
    "title": "Get User Role information object by ID",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getRoleById",
    "group": "Role_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "roleId",
            "description": "<p>Object ID of the user role object information</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"roleId\": \"57f347c55dd74725fd59cce1\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the User Role information object, if exists, else return empty object</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\ncurl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/roles/57f347c55dd74725fd59cce1\" \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTU2NTg3OCwiZXhwIjoxNDc1NjUyMjc4LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.D5FJ7i6ycZBhYc-kHni6WnjCOGCEZBMsZu9yeCajO_bhVzH-muqUvZ6K5072vwO7LoKB0eTKa1friGngrpRJ9w\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of User role data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roleName",
            "description": "<p>title of the role entered by the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>active bit status.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "read",
            "description": "<p>read access granted to the role.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "write",
            "description": "<p>write access granted to the role in combination with either create or change action enables either insert or update features respectively.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "create",
            "description": "<p>User having both create and write access  granted to the role can insert new document.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "change",
            "description": "<p>User having both change and write access  granted to the role can update existing document.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "delete",
            "description": "<p>delete access granted to the role, deletes data permanently .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"_id\": \"57f347c55dd74725fd59cce1\",\n      \"roleName\": \"reader\",\n      \"active\": true,\n      \"change\": false,\n      \"delete\": false,\n      \"create\": false,\n      \"write\": false,\n      \"read\": true\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User Role not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"User Role not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/role.management.route.js",
    "groupTitle": "Role_Management"
  },
  {
    "type": "post",
    "url": "/api/roles/",
    "title": "Post User Role Information",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postRoleInfo",
    "group": "Role_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "roleName",
            "description": "<p>Mandatory title of the role.</p>"
          }
        ]
      }
    },
    "description": "<p>saves user role information to the database with permitted actions.</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\ncurl \\\n-v \\\n-X POST  \\\nhttp://localhost:3000/api/roles/ \\\n-H 'Content-Type: application/json' \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTU2NTg3OCwiZXhwIjoxNDc1NjUyMjc4LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.D5FJ7i6ycZBhYc-kHni6WnjCOGCEZBMsZu9yeCajO_bhVzH-muqUvZ6K5072vwO7LoKB0eTKa1friGngrpRJ9w\" \\\n-d '{\"roleName\": \"agent\", \"active\": true,  \"change\": false, \"delete\":false, \"create\":true, \"write\":true, \"read\":true}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User Role saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"User Role saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Please enter Role Name</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User Role with same name already exists</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": \"Please enter Role Name\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"User Role with same name already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/role.management.route.js",
    "groupTitle": "Role_Management"
  },
  {
    "type": "put",
    "url": "/api/roles/:roleId",
    "title": "Updates existing User Role Information object",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateRoleInfo",
    "group": "Role_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "roleId",
            "description": "<p>Object ID of the user role object information</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"roleId\": \"57f365b9ef6b0749194f8101\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates existing user role information to the database with permitted actions.</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\ncurl \\\n-v \\\n-X PUT  \\\nhttp://localhost:3000/api/roles/57f365b9ef6b0749194f8101 \\\n-H 'Content-Type: application/json' \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTU2NTg3OCwiZXhwIjoxNDc1NjUyMjc4LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.D5FJ7i6ycZBhYc-kHni6WnjCOGCEZBMsZu9yeCajO_bhVzH-muqUvZ6K5072vwO7LoKB0eTKa1friGngrpRJ9w\" \\\n-d '{\"roleName\": \"agent2\", \"active\": true,  \"change\": false, \"delete\":false, \"create\":true, \"write\":true, \"read\":true}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User Role updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"User Role updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Please enter Role Name</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User Role with same name already exists</p>"
          }
        ],
        "NotAllowed": [
          {
            "group": "NotAllowed",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Admin role cannot be edited.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": \"Please enter Role Name\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"User Role with same name already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 405 Not Allowed\n{\n  \"message\": \"Admin role cannot be edited\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/role.management.route.js",
    "groupTitle": "Role_Management"
  },
  {
    "type": "get",
    "url": "/api/team/:teamMemberId",
    "title": "Get team member data by Id",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getTeamMemberInfoByID",
    "group": "TeamManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamMemberId",
            "description": "<p>object id of the team-member data object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"teamMemberId\": \"578b54e0ebe03c31438ba406\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the team member data object by Id if exists, else return empty object</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-i \\\n\"http://localhost:3000/api/team/578b54e0ebe03c31438ba406\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of team member data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "teamMemberName",
            "description": "<p>name of the person or team-member.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email address of the person/team-member.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>contact number of the team-member.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "facebookURL",
            "description": "<p>facebook url of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "twitterURL",
            "description": "<p>twitter url of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "googlePlusURL",
            "description": "<p>google plus url of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "linkedInURL",
            "description": "<p>linked in url of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>address where team-member lives.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "designation",
            "description": "<p>Designation of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>brief description about team-member.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hierarchyOrder",
            "description": "<p>position in the heirarchical office system.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageName",
            "description": "<p>name of the image file.     *</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties",
            "description": "<p>meta-data of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imageExtension",
            "description": "<p>extension of image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imagePath",
            "description": "<p>path of image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>active bit status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"_id\": \"578b54e0ebe03c31438ba406\",\n      \"imageName\": \"\",\n      \"hierarchyOrder\": 1,\n      \"description\": \"A tech enthusiast\",\n      \"designation\": \"CTO\",\n      \"address\": \"\",\n      \"linkedInURL\": \"\",\n      \"googlePlusURL\": \"\",\n      \"twitterURL\": \"https://www.twitter.com/shrawanlakhe\",\n      \"facebookURL\": \"https://www.facebook.com/shrawanlakhe\",\n      \"phoneNumber\": \"977-9818278372\",\n      \"email\": \"shrawanlakhe@hotmail.com\",\n      \"teamMemberName\": \"Shrawan Lakhe\",\n      \"active\": true,\n      \"imageProperties\": {\n          \"imageExtension\": \"jpg\",\n          \"imagePath\": \"public/images/teammember/teammember-123.jpg\"\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Team member not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Team member not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/team.management.route.js",
    "groupTitle": "TeamManagement"
  },
  {
    "type": "get",
    "url": "/api/team/",
    "title": "Get team members list",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getTeamMembers",
    "group": "TeamManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>whether to get data with active bit true or false, if true, then returns data list with active bit set to true only</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "perpage",
            "description": "<p>Number of data to return on each request</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": "<p>Current page number of pagination system.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamMemberName",
            "description": "<p>to filter team member list using person name as filter param</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"perpage\": 10,\n  \"page\": 1\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n  \"active\": true,\n  \"teamMemberName\": \"shrawan\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the team members list if exists, else return empty array</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/team\" \\\n--data-urlencode \"perpage=10\" \\\n--data-urlencode \"page=1\"",
        "type": "curl"
      },
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/team\" \\\n--data-urlencode \"active=true\" \\\n--data-urlencode \"teamMemberName=shrawan lakhe\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dataList",
            "description": "<p>list of team members</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList._id",
            "description": "<p>object id of team member data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.teamMemberName",
            "description": "<p>name of the person or team-member.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.email",
            "description": "<p>email address of the person/team-member.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.phoneNumber",
            "description": "<p>contact number of the team-member.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.facebookURL",
            "description": "<p>facebook url of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.twitterURL",
            "description": "<p>twitter url of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.googlePlusURL",
            "description": "<p>google plus url of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.linkedInURL",
            "description": "<p>linked in url of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.address",
            "description": "<p>address where team-member lives.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.designation",
            "description": "<p>Designation of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.description",
            "description": "<p>brief description about team-member.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.hierarchyOrder",
            "description": "<p>position in the heirarchical office system.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.imageName",
            "description": "<p>name of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "dataList.active",
            "description": "<p>active bit status.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "totalItems",
            "description": "<p>total no of team-members in the related collection in database.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "currentPage",
            "description": "<p>current page number of client pagination system.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"dataList\": [\n          {\n              \"_id\": \"578b54e0ebe03c31438ba406\",\n              \"imageName\": \"\",\n              \"hierarchyOrder\": 1,\n              \"description\": \"A tech enthusiast\",\n              \"designation\": \"CTO\",\n              \"address\": \"\",\n              \"linkedInURL\": \"\",\n              \"googlePlusURL\": \"\",\n              \"twitterURL\": \"https://www.twitter.com/shrawanlakhe\",\n              \"facebookURL\": \"https://www.facebook.com/shrawanlakhe\",\n              \"phoneNumber\": \"977-9818278372\",\n              \"email\": \"shrawanlakhe@hotmail.com\",\n              \"teamMemberName\": \"Shrawan Lakhe\",\n              \"active\": true\n          }\n      ],\n     \"totalItems\": 1,\n      \"currentPage\": 1\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Team member not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Team member not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/team.management.route.js",
    "groupTitle": "TeamManagement"
  },
  {
    "type": "patch",
    "url": "/api/team/:teamMemberId",
    "title": "Deletes existing Team member data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "patchTeamMemberInfo",
    "group": "TeamManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamMemberId",
            "description": "<p>object id of the team-member data object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"teamMemberId\": \"578b54e0ebe03c31438ba406\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Deletes existing team-member data from the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PATCH  \\\nhttp://localhost:3000/api/team/578b5b7e785bfedf52463159 \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODc1MDUzNSwiZXhwIjoxNDY4NzcwNTM1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.8Vk3G4mc3J7JRD4upc5r54mG0dKGpRwTuSN5mIPF3tIx7NJwixaXwuFLxxkfeiI33huDb7W2NET494Eddd3FgQ\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Team member deleted successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Team member deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/team.management.route.js",
    "groupTitle": "TeamManagement"
  },
  {
    "type": "post",
    "url": "/api/team/",
    "title": "Post Team member data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postTeamMemberInfo",
    "group": "TeamManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamMemberName",
            "description": "<p>Mandatory name of the person or team-member.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Mandatory email address of the person/team-member.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "designation",
            "description": "<p>Mandatory Designation of the person.</p>"
          }
        ]
      }
    },
    "description": "<p>saves team-member information to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X POST  \\\nhttp://localhost:3000/api/team/ \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODc1MDUzNSwiZXhwIjoxNDY4NzcwNTM1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.8Vk3G4mc3J7JRD4upc5r54mG0dKGpRwTuSN5mIPF3tIx7NJwixaXwuFLxxkfeiI33huDb7W2NET494Eddd3FgQ\" \\\n-F imageName=@public/images/404_banner.png  \\\n-F \"data={\\\"teamMemberName\\\": \\\"Shrawan Lakhe\\\",\\\"email\\\": \\\"shrawanlakhey@gmail.com\\\",\\\"phoneNumber\\\": \\\"977-999999999\\\",\\\"designation\\\": \\\"Developer\\\",\\\"description\\\": \\\"detailed description\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Team member saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Team member saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Team member's email address matching  previously saved data's email id throws this error i.e.duplicate email address</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>Validation Error due to either invalid data entry or not entering value for required fields</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"Team member with same email already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": [{\"param\":\"teamMemberName\",\"msg\":\"Team member name is required\",\"value\":\"\"},\n  {\"param\":\"email\",\"msg\":\"Invalid Email\",\"value\":\"shrawanlakhe\"},\n  {\"param\":\"designation\",\"msg\":\"Designation of team member is required\",\"value\":\"\"}]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/team.management.route.js",
    "groupTitle": "TeamManagement"
  },
  {
    "type": "patch",
    "url": "/api/member/hierarchy/:sortId/:hierarchyValue",
    "title": "Updates the hierarchy order of the team-member",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateTeamMemberHierarchy",
    "group": "TeamManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortId",
            "description": "<p>object id of the team-member whose hierarchy is to be updated</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "hierarchyValue",
            "description": "<p>hierarchy order of the team-member whose hierarchy is to be updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"sortId\": \"578b5b7e785bfedf52463159\",\n  \"hierarchyValue\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates the hierarchy order of the existing team-member data to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PATCH  \\\nhttp://localhost:3000/api/member/hierarchy/578b5b7e785bfedf52463159/1 \\\n-H 'Content-Type: application/json' \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODc1MDUzNSwiZXhwIjoxNDY4NzcwNTM1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.8Vk3G4mc3J7JRD4upc5r54mG0dKGpRwTuSN5mIPF3tIx7NJwixaXwuFLxxkfeiI33huDb7W2NET494Eddd3FgQ\" \\\n-d '{\"sort\":\"down\"}'",
        "type": "curl"
      },
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PATCH  \\\nhttp://localhost:3000/api/member/hierarchy/578b5b7e785bfedf52463159/2 \\\n-H 'Content-Type: application/json' \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODc1MDUzNSwiZXhwIjoxNDY4NzcwNTM1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.8Vk3G4mc3J7JRD4upc5r54mG0dKGpRwTuSN5mIPF3tIx7NJwixaXwuFLxxkfeiI33huDb7W2NET494Eddd3FgQ\" \\\n-d '{\"sort\":\"up\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Hierarhchy order sorted successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Hierarhchy order sorted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Team member not found if the the hierarchy order of the top most team-member is attempted to sorted further up or the hierarchy of the bottom most team-member is attempted to sorted further down</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Team member not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/team.management.route.js",
    "groupTitle": "TeamManagement"
  },
  {
    "type": "put",
    "url": "/api/team/:teamMemberId",
    "title": "Updates existing Team member data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateTeamMemberInfo",
    "group": "TeamManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamMemberId",
            "description": "<p>object id of the team-member data object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"teamMemberId\": \"578b54e0ebe03c31438ba406\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates existing team-member information to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PUT  \\\nhttp://localhost:3000/api/team/578b5b7e785bfedf52463159 \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODc1MDUzNSwiZXhwIjoxNDY4NzcwNTM1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.8Vk3G4mc3J7JRD4upc5r54mG0dKGpRwTuSN5mIPF3tIx7NJwixaXwuFLxxkfeiI33huDb7W2NET494Eddd3FgQ\" \\\n-F imageName=@public/images/404_banner.png  \\\n-F \"data={\\\"teamMemberName\\\": \\\"Shrawan Lakhe Thaiba\\\",\\\"email\\\": \\\"shrawanlakhey@gmail.com\\\",\\\"phoneNumber\\\": \\\"977-999999999\\\",\\\"designation\\\": \\\"Developer\\\",\\\"description\\\": \\\"detailed description\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Team member updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Team member updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Team member's email address matching  previously saved data's email id throws this error i.e.duplicate email address</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>Validation Error due to either invalid data entry or not entering value for required fields</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"Team member with same email already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": [{\"param\":\"teamMemberName\",\"msg\":\"Team member name is required\",\"value\":\"\"},\n  {\"param\":\"email\",\"msg\":\"Invalid Email\",\"value\":\"shrawanlakhe\"},\n  {\"param\":\"designation\",\"msg\":\"Designation of team member is required\",\"value\":\"\"}]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/team.management.route.js",
    "groupTitle": "TeamManagement"
  },
  {
    "type": "get",
    "url": "/api/testimonial/",
    "title": "Get testimonial list",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getAllTestimonials",
    "group": "Testimonial",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>whether to get data with active bit true or false, if true, then returns data list with active bit set to true only</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "perpage",
            "description": "<p>Number of data to return on each request</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": "<p>Current page number of pagination system.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "personName",
            "description": "<p>to filter testimonial list using person name as filter param</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"perpage\": 10,\n  \"page\": 1\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n  \"active\": true,\n  \"personName\": \"shrawan\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the testimonial list if exists, else return empty array</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/testimonial\" \\\n--data-urlencode \"perpage=10\" \\\n--data-urlencode \"page=1\"",
        "type": "curl"
      },
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/testimonial\" \\\n--data-urlencode \"active=true\" \\\n--data-urlencode \"personName=shrawan lakhe\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dataList",
            "description": "<p>list of testimonials</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList._id",
            "description": "<p>object id of testimonial data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.personName",
            "description": "<p>name of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.testimonialContent",
            "description": "<p>testimonial content.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.organization",
            "description": "<p>name of the organization where the testifier works.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.designation",
            "description": "<p>Designation of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.email",
            "description": "<p>email address of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.facebookURL",
            "description": "<p>facebook url of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.twitterURL",
            "description": "<p>twitter url of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.gPlusURL",
            "description": "<p>google plus url of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.linkedInURL",
            "description": "<p>linked in url of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.imageName",
            "description": "<p>name of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.imageProperties",
            "description": "<p>meta-data of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.imageProperties.imageExtension",
            "description": "<p>extension of image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.imageProperties.imagePath",
            "description": "<p>path of image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "dataList.active",
            "description": "<p>active bit status.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "totalItems",
            "description": "<p>total no of events in the event collection in database.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "currentPage",
            "description": "<p>current page number of client pagination system.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"dataList\": [\n          {\n              \"_id\": \"578b1bf1b825c2ef2eb730a8\",\n              \"imageName\": \"testimonial-1468734449811.webp\",\n              \"facebookURL\": \"https://facebook.com\",\n              \"email\": \"shrawanlakhey@gmail.com\",\n              \"designation\": \"CTO\",\n              \"organization\": \"BitsBeat IT Solution\",\n              \"testimonialContent\": \"Set the version of an documentation block. Version can also be used in @apiDefine.\\nBlocks with same group and name, but different versions can be compared in the generated output, so you or a frontend developer can retrace what changes in the API since the last version.\",\n              \"personName\": \"Shrawan Lakhe\",\n              \"active\": true,\n              \"imageProperties\": {\n                  \"imageExtension\": \"jpg\",\n                  \"imagePath\": \"public/uploads/images/testimonial/testimonial-1468734449811.jpg\"\n              }\n          }\n      ],\n      \"totalItems\": 1,\n      \"currentPage\": 1\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Testimonial not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Testimonial not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/testimonial.route.js",
    "groupTitle": "Testimonial"
  },
  {
    "type": "get",
    "url": "/api/testimonial/:testimonialId",
    "title": "Get testimonial data by id",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "getTestimonialByID",
    "group": "Testimonial",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "testimonialId",
            "description": "<p>object id of the testimonial data object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"testimonialId\": \"578b1bf1b825c2ef2eb730a8\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the testimonial data object by id if exists, else return empty object</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-i \\\nhttp://localhost:3000/api/testimonial/578b1bf1b825c2ef2eb730a8",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of testimonial data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "personName",
            "description": "<p>name of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "testimonialContent",
            "description": "<p>testimonial content.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "organization",
            "description": "<p>name of the organization where the testifier works.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "designation",
            "description": "<p>Designation of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email address of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "facebookURL",
            "description": "<p>facebook url of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "twitterURL",
            "description": "<p>twitter url of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gPlusURL",
            "description": "<p>google plus url of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "linkedInURL",
            "description": "<p>linked in url of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageName",
            "description": "<p>name of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties",
            "description": "<p>meta-data of the image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imageExtension",
            "description": "<p>extension of image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imagePath",
            "description": "<p>path of image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>active bit status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n  {\n    \"_id\": \"578b1bf1b825c2ef2eb730a8\",\n    \"imageName\": \"testimonial-1468734449811.webp\",\n    \"facebookURL\": \"https://facebook.com\",\n   \"email\": \"shrawanlakhey@gmail.com\",\n    \"designation\": \"CTO\",\n    \"organization\": \"BitsBeat IT Solution\",\n    \"testimonialContent\": \"Set the version of an documentation block. Version can also be used in @apiDefine.\\nBlocks with same group and name, but different versions can be compared in the generated output, so you or a frontend developer can retrace what changes in the API since the last version.\",\n    \"personName\": \"Shrawan Lakhe\",\n    \"active\": true,\n    \"imageProperties\": {\n        \"imageExtension\": \"jpg\",\n        \"imagePath\": \"public/uploads/images/testimonial/testimonial-1468734449811.jpg\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Testimonial not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Testimonial not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/testimonial.route.js",
    "groupTitle": "Testimonial"
  },
  {
    "type": "patch",
    "url": "/api/testimonial/:testimonialId",
    "title": "Deletes existing  testimonial data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "patchTestimonial",
    "group": "Testimonial",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "testimonialId",
            "description": "<p>object id of the testimonial data object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"testimonialId\": \"578b1bf1b825c2ef2eb730a8\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Deletes existing testimonial information from the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PATCH  \\\nhttp://localhost:3000/api/testimonial/578b1bf1b825c2ef2eb730a8 \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODczNDA0OCwiZXhwIjoxNDY4NzU0MDQ4LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.VtceFVvCYx3W1Xty3EkDwXo07aiC_agJxfb7ao4dcatG5ozMH5Sr_1_2xK5vePKIWg_W2LJSMxWF8O7ZC0XYkA\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Testimonial deleted successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Testimonial deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/testimonial.route.js",
    "groupTitle": "Testimonial"
  },
  {
    "type": "post",
    "url": "/api/testimonial/",
    "title": "Post testimonial data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "postTestimonial",
    "group": "Testimonial",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "personName",
            "description": "<p>Mandatory  name of the person.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "testimonialContent",
            "description": "<p>Mandatory  testimonial content.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "organization",
            "description": "<p>Mandatory name of the organization where the testifier works.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Testimonial saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Testimonial saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "description": "<p>saves testimonial information to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X POST  \\\nhttp://localhost:3000/api/testimonial/ \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODczNDA0OCwiZXhwIjoxNDY4NzU0MDQ4LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.VtceFVvCYx3W1Xty3EkDwXo07aiC_agJxfb7ao4dcatG5ozMH5Sr_1_2xK5vePKIWg_W2LJSMxWF8O7ZC0XYkA\" \\\n-F imageName=@public/images/404_banner.png  \\\n-F \"data={\\\"personName\\\": \\\"Shrawan Lakhe\\\",\\\"testimonialContent\\\": \\\"Please donate blood and help the blood donation program in any way you can\\\",\\\"organization\\\": \\\"Red Cross Building\\\",\\\"designation\\\": \\\"Developer\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>Validation Error due to either invalid data entry or not entering value for required fields</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": [{\"param\":\"personName\",\"msg\":\"Person name is required\",\"value\":\"\"},\n  {\"param\":\"testimonialContent\",\"msg\":\"Content for testimonial is required\",\"value\":\"\"},\n  {\"param\":\"organization\",\"msg\":\"Organization name is required\"},\n  {\"param\":\"email\",\"msg\":\"Invalid Email\",\"value\":\"fdsafdsa\"}]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/testimonial.route.js",
    "groupTitle": "Testimonial"
  },
  {
    "type": "put",
    "url": "/api/testimonial/:testimonialId",
    "title": "Updates existing  testimonial data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateTestimonial",
    "group": "Testimonial",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "testimonialId",
            "description": "<p>object id of the testimonial data object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"testimonialId\": \"578b1bf1b825c2ef2eb730a8\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>updates existing testimonial information to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PUT  \\\nhttp://localhost:3000/api/testimonial/578b1bf1b825c2ef2eb730a8 \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODczNDA0OCwiZXhwIjoxNDY4NzU0MDQ4LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.VtceFVvCYx3W1Xty3EkDwXo07aiC_agJxfb7ao4dcatG5ozMH5Sr_1_2xK5vePKIWg_W2LJSMxWF8O7ZC0XYkA\" \\\n-F imageName=@public/images/404_banner.png  \\\n-F \"data={\\\"personName\\\": \\\"Shrawan Lakhe nepal\\\",\\\"testimonialContent\\\": \\\"Please donate blood and help the blood donation program in any way you can\\\",\\\"organization\\\": \\\"Red Cross Building\\\",\\\"designation\\\": \\\"Developer\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Testimonial updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Testimonial updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>Validation Error due to either invalid data entry or not entering value for required fields</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": [{\"param\":\"personName\",\"msg\":\"Person name is required\",\"value\":\"\"},\n  {\"param\":\"testimonialContent\",\"msg\":\"Content for testimonial is required\",\"value\":\"\"},\n  {\"param\":\"organization\",\"msg\":\"Organization name is required\"},\n  {\"param\":\"email\",\"msg\":\"Invalid Email\",\"value\":\"fdsafdsa\"}]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/testimonial.route.js",
    "groupTitle": "Testimonial"
  },
  {
    "type": "get",
    "url": "/api/unblock/user/:userUnBlockToken",
    "title": "Unblock the blocked user by clicking the unblock link",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "unBlockUser",
    "group": "UserUnblock",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userUnBlockToken",
            "description": "<p>hashed unblock token sent to the email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"userUnBlockToken\": \"c69dfe42cb583cfdea47663d6c45bc1110a5\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Redirect the user to login route</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 302 Page Redirection\n    Redirects the user to the login route",
          "type": "json"
        }
      ]
    },
    "description": "<p>Unblock the blocked user by clicking on the link of the email content</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/unblock/user/c69dfe42cb583cfdea47663d6c45bc1110a5\"",
        "type": "curl"
      }
    ],
    "error": {
      "fields": {
        "Expired": [
          {
            "group": "Expired",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Redirect the user to token-expired route</p>"
          }
        ],
        "AlreadyUnblocked": [
          {
            "group": "AlreadyUnblocked",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Redirect the user to login route</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Redirect the user to page not found route</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 302 Page Redirection\n    Redirects the user to the token-expired route",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 302 Page Redirection\n    Redirects the user to the login route",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 302 Page Redirection\n   Redirects the user to Page Not Found route",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/user.unblock.route.js",
    "groupTitle": "UserUnblock"
  },
  {
    "type": "get",
    "url": "/api/user/:userId",
    "title": "Get user  information object by user ID",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getUserByID",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>object id of the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"userId\": \"57833052319c2cae0defc7b5\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the user object by ID, if exists, else return empty object</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/user/57833052319c2cae0defc7b5\" \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTE4MzQ0MCwiZXhwIjoxNDY5MjAzNDQwLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.KSp3_S2LEhixyzTnNJE9AtD5u7-8ljImr-Np0kzxkoNWWjqB66a_T67NTCTMoMZys7PIYPFNBR9VwLOhkrX7BQ\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>object id of user data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>first name of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "middleName",
            "description": "<p>middle name of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>last name of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email address of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username used when registering in the system, by default, same as email address.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>phone number of the  user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobile number of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "securityQuestion",
            "description": "<p>question selected by the user as a backup or extra security mechanism.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>active bit status of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userRole",
            "description": "<p>role of the user in the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageName",
            "description": "<p>name of the image file of the user avatar.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "twoFactorAuthEnabled",
            "description": "<p>multi-factor or two factor authentication is enabled in the system or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addedOn",
            "description": "<p>date of user registered in the system .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "blocked",
            "description": "<p>user blocked or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userConfirmed",
            "description": "<p>user registration confirmed or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties",
            "description": "<p>meta-data info of image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imageExtension",
            "description": "<p>extension of image file .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageProperties.imagePath",
            "description": "<p>path of image file.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"_id\": \"57833052319c2cae0defc7b5\",\n      \"imageName\": \"user-1468215378497.webp\",\n      \"securityQuestion\": \"Favourite Movie?\",\n      \"mobileNumber\": \"9818278372\",\n      \"phoneNumber\": \"01-5560147\",\n      \"username\": \"shrawanlakhey@gmail.com\",\n      \"email\": \"shrawanlakhey@gmail.com\",\n      \"lastName\": \"Lakhe\",\n      \"firstName\": \"Shrawan\",\n      \"userConfirmed\": true,\n      \"imageProperties\": {\n          \"imagePath\": \"public/uploads/images/users/user-1468215378497.jpg\",\n          \"imageExtension\": \"jpg\"\n      },\n      \"blocked\": false,\n      \"addedOn\": \"2016-07-11T05:36:18.906Z\",\n      \"twoFactorAuthEnabled\": true,\n      \"userRole\": \"admin\",\n      \"active\": true\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"User not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/user.route.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/user/",
    "title": "Get user list",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getUsers",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "perpage",
            "description": "<p>Number of data to return on each request</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": "<p>Current page number of pagination system.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username of the user registered in the system</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"perpage\": 10,\n  \"page\": 1\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n  \"perpage\": 10,\n  \"page\": 1,\n  \"username\": \"shrawanlakhey@gmail.com\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Retrieves the user list, if exists, else return empty array</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/user/\" \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTE4MzQ0MCwiZXhwIjoxNDY5MjAzNDQwLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.KSp3_S2LEhixyzTnNJE9AtD5u7-8ljImr-Np0kzxkoNWWjqB66a_T67NTCTMoMZys7PIYPFNBR9VwLOhkrX7BQ\" \\\n--data-urlencode \"perpage=10\" \\\n--data-urlencode \"page=1\"",
        "type": "curl"
      },
      {
        "title": "Example usage:",
        "content": "curl \\\n-G \\\n-v \\\n\"http://localhost:3000/api/user/\" \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTE4MzQ0MCwiZXhwIjoxNDY5MjAzNDQwLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.KSp3_S2LEhixyzTnNJE9AtD5u7-8ljImr-Np0kzxkoNWWjqB66a_T67NTCTMoMZys7PIYPFNBR9VwLOhkrX7BQ\" \\\n--data-urlencode \"perpage=10\" \\\n--data-urlencode \"page=1\" \\\n--data-urlencode \"username=shrawanlakhey@gmail.com\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dataList",
            "description": "<p>list of users in the system</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList._id",
            "description": "<p>object id of user data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.firstName",
            "description": "<p>first name of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.middleName",
            "description": "<p>middle name of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.lastName",
            "description": "<p>last name of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.email",
            "description": "<p>email address of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.username",
            "description": "<p>username used when registering in the system, by default, same as email address.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.phoneNumber",
            "description": "<p>phone number of the  user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.mobileNumber",
            "description": "<p>mobile number of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.securityQuestion",
            "description": "<p>question selected by the user as a backup or extra security mechanism.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "dataList.active",
            "description": "<p>active bit status of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.userRole",
            "description": "<p>role of the user in the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.imageName",
            "description": "<p>name of the image file of the user avatar.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.twoFactorAuthEnabled",
            "description": "<p>multi-factor or two factor authentication is enabled in the system or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.addedOn",
            "description": "<p>date of user registered in the system .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.blocked",
            "description": "<p>user blocked or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.userConfirmed",
            "description": "<p>user registration confirmed or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.imageProperties",
            "description": "<p>meta-data info of image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.imageProperties.imageExtension",
            "description": "<p>extension of image file .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataList.imageProperties.imagePath",
            "description": "<p>path of image file.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "totalItems",
            "description": "<p>total no of users in the related collection in database.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "currentPage",
            "description": "<p>current page number of client pagination system.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"dataList\": [\n          {\n              \"_id\": \"57833052319c2cae0defc7b5\",\n              \"imageName\": \"user-1468215378497.webp\",\n               \"securityQuestion\": \"Favourite Movie?\",\n              \"mobileNumber\": \"9818278372\",\n              \"phoneNumber\": \"01-5560147\",\n              \"username\": \"shrawanlakhey@gmail.com\",\n              \"email\": \"shrawanlakhey@gmail.com\",\n              \"lastName\": \"Lakhe\",\n              \"firstName\": \"Shrawan\",\n              \"userConfirmed\": true,\n              \"imageProperties\": {\n                  \"imagePath\": \"public/uploads/images/users/user-1468215378497.jpg\",\n                  \"imageExtension\": \"jpg\"\n              },\n              \"blocked\": false,\n              \"addedOn\": \"2016-07-11T05:36:18.906Z\",\n              \"twoFactorAuthEnabled\": true,\n              \"userRole\": \"admin\",\n              \"active\": true\n          },\n          {\n              \"_id\": \"577f5c1b5869902d67eb22a8\",\n              \"mobileNumber\": \"\",\n              \"phoneNumber\": \"\",\n              \"username\": \"superadmin\",\n              \"email\": \"hello@bitsbeat.com\",\n              \"lastName\": \"superadmin\",\n              \"middleName\": \"\",\n              \"firstName\": \"superadmin\",\n              \"userConfirmed\": true,\n              \"blocked\": false,\n              \"addedOn\": \"2016-07-08T07:54:03.766Z\",\n              \"twoFactorAuthEnabled\": false,\n              \"userRole\": \"admin\",\n              \"active\": true\n          }\n      ],\n      \"totalItems\": 2,\n      \"currentPage\": 1\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "NotFound": [
          {
            "group": "NotFound",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User not found</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"User not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/user.route.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/api/change-password/confirm/:accessToken",
    "title": "Updates  user's password information to the  database",
    "permission": [
      {
        "name": "public"
      }
    ],
    "name": "implementForgotPasswordAction",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>Password verify access token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"accessToken\": \"57833052319c2cae0defc7b5\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates user's password information data to the database</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\n\ncurl \\\n-v \\\n-X PATCH  \\\nhttp://localhost:3000/api/change-password/confirm/5791fc7cf7b57f69796ef444 \\\n-H 'Content-Type: application/json' \\\n-d '{\"password\":\"nodecms@123\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Password changed successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Password changed successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>password must not be same as username of the user</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": \"Password must not contain the username\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": \"Password is very weak. Please try the combination of lowercase alphabets, uppercase alphabets, numbers, symbols and a minimum of 8 characters long password\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/user.route.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/api/user/:userId",
    "title": "Deletes existing user information  data from the database",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "patchUserInformation",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>object id of the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"userId\": \"57833052319c2cae0defc7b5\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Deletes existing user information data from the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PATCH  \\\nhttp://localhost:3000/api/user/5791fc7cf7b57f69796ef444 \\\n-H 'Content-Type: application/json' \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTE4MzQ0MCwiZXhwIjoxNDY5MjAzNDQwLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.KSp3_S2LEhixyzTnNJE9AtD5u7-8ljImr-Np0kzxkoNWWjqB66a_T67NTCTMoMZys7PIYPFNBR9VwLOhkrX7BQ\" \\\n-d '{\"deleted\":\"true\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User deleted successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"User deleted successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "MethodNotAllowed": [
          {
            "group": "MethodNotAllowed",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>superadmin cannot be deleted</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 405 Method Not Allowed\n{\n   \"message\": \"superadmin cannot be deleted\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/user.route.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/api/user/:userId",
    "title": "Updates  user's security answer information to the  database",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "patchUserInformation",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>object id of the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"userId\": \"57833052319c2cae0defc7b5\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates user's security answer information data to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\n\ncurl \\\n-v \\\n-X PATCH  \\\nhttp://localhost:3000/api/user/5791fc7cf7b57f69796ef444 \\\n-H 'Content-Type: application/json' \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTE4MzQ0MCwiZXhwIjoxNDY5MjAzNDQwLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.KSp3_S2LEhixyzTnNJE9AtD5u7-8ljImr-Np0kzxkoNWWjqB66a_T67NTCTMoMZys7PIYPFNBR9VwLOhkrX7BQ\" \\\n-d '{\"securityQuestion\":\"favorite movie\",\"securityAnswer\":\"Harry Potter\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Security answer changed successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Security answer changed successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/user.route.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/api/user/:userId",
    "title": "Updates  user's password information to the  database",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "patchUserInformation",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>object id of the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"userId\": \"57833052319c2cae0defc7b5\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates user's password information data to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\n\ncurl \\\n-v \\\n-X PATCH  \\\nhttp://localhost:3000/api/user/5791fc7cf7b57f69796ef444 \\\n-H 'Content-Type: application/json' \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTE4MzQ0MCwiZXhwIjoxNDY5MjAzNDQwLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.KSp3_S2LEhixyzTnNJE9AtD5u7-8ljImr-Np0kzxkoNWWjqB66a_T67NTCTMoMZys7PIYPFNBR9VwLOhkrX7BQ\" \\\n-d '{\"password\":\"nodecms@123\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Password changed successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Password changed successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>password must not be same as username of the user</p>"
          }
        ],
        "Forbidden": [
          {
            "group": "Forbidden",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not allowed to change the password of superadmin user</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": \"Password must not contain the username\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": \"Password is very weak. Please try the combination of lowercase alphabets, uppercase alphabets, numbers, symbols and a minimum of 8 characters long password\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n\n{\n  \"message\": \"You are not allowed to change the password of superadmin user\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/user.route.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/",
    "title": "Post user information data",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "saveUsers",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>Mandatory  first name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Mandatory    last name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Mandatory   email address of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "securityQuestion",
            "description": "<p>Mandatory   question selected by the user as a backup or extra security mechanism.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "securityAnswer",
            "description": "<p>Mandatory    security answer.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userRole",
            "description": "<p>Mandatory   role of the user in the system.</p>"
          }
        ]
      }
    },
    "description": "<p>saves user information to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X POST  \\\nhttp://localhost:3000/api/user/ \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTE4MzQ0MCwiZXhwIjoxNDY5MjAzNDQwLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.KSp3_S2LEhixyzTnNJE9AtD5u7-8ljImr-Np0kzxkoNWWjqB66a_T67NTCTMoMZys7PIYPFNBR9VwLOhkrX7BQ\" \\\n-F avatar=@public/images/404_banner.png  \\\n-F \"data={\\\"firstName\\\": \\\"tom\\\",\\\"lastName\\\": \\\"cruise\\\",\\\"email\\\": \\\"testnodecms@gmail.com\\\",\\\"password\\\": \\\"testnodecms@123\\\",\\\"phoneNumber\\\": \\\"55232659858\\\",\\\"securityQuestion\\\": \\\"favourite cartoon series?\\\",\\\"securityAnswer\\\": \\\"transformers series\\\",\\\"userRole\\\": \\\"admin\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User saved successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"User saved successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>validation errors due to not entering values for  mandatory fields first name, last name, email address, user role, password, security question and answer to that question</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User with same username already exists</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\":[\n                 {\"param\":\"securityQuestion\",\"msg\":\"Security question is required\"},\n                 {\"param\":\"securityAnswer\",\"msg\":\"Security answer is required\"},\n                 {\"param\":\"firstName\",\"msg\":\"First name is required\"},\n                 {\"param\":\"lastName\",\"msg\":\"Last name is required\"},\n                 {\"param\":\"email\",\"msg\":\"Email is required\"},\n                 {\"param\":\"userRole\",\"msg\":\"User role is required\"},\n                 {\"param\":\"password\",\"msg\":\"Password is required\",\"value\":\"\"}\n            ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"User with same username already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": \"Password must not contain the username\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\": \"Password is very weak. Please try the combination of lowercase alphabets, uppercase alphabets, numbers, symbols and a minimum of 8 characters long password\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/user.route.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/api/user/:userId",
    "title": "Updates existing user information  data to the database",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "updateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>object id of the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"userId\": \"57833052319c2cae0defc7b5\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Update existing user information data object to the database</p>",
    "version": "0.0.1",
    "header": {
      "fields": {
        "AuthorizationHeader": [
          {
            "group": "AuthorizationHeader",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>x-access-token value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"x-access-token\": \"yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X PUT  \\\nhttp://localhost:3000/api/user/5791fc7cf7b57f69796ef444 \\\n-H \"Content-Type: multipart/form-data\"  \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTE4MzQ0MCwiZXhwIjoxNDY5MjAzNDQwLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.KSp3_S2LEhixyzTnNJE9AtD5u7-8ljImr-Np0kzxkoNWWjqB66a_T67NTCTMoMZys7PIYPFNBR9VwLOhkrX7BQ\" \\\n-F avatar=@public/images/404_banner.png  \\\n-F \"data={\\\"firstName\\\": \\\"david\\\",\\\"lastName\\\": \\\"beckham\\\",\\\"email\\\": \\\"testnodecms@gmail.com\\\",\\\"phoneNumber\\\": \\\"556000023\\\",\\\"mobileNumber\\\": \\\"977-9999999999\\\",\\\"userRole\\\": \\\"admin\\\"};type=application/json\"",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User updated successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"User updated successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>authentication token was not supplied</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "isToken",
            "description": "<p>to check if token is supplied or not , if token is supplied , returns true else returns false</p>"
          },
          {
            "group": "UnAuthorizedError",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true if jwt token verifies</p>"
          }
        ],
        "UnAuthorizedError_1": [
          {
            "group": "UnAuthorizedError_1",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to access this api route.</p>"
          }
        ],
        "UnAuthorizedError_2": [
          {
            "group": "UnAuthorizedError_2",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You are not authorized to perform this action.</p>"
          }
        ],
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>validation errors due to not entering values for  mandatory fields first name, last name, email address, user role</p>"
          }
        ],
        "AlreadyExists": [
          {
            "group": "AlreadyExists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User with same username already exists</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"isToken\": true,\n   \"success\": false,\n   \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to access this api route.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are not authorized to perform this action\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\":[\n                 {\"param\":\"firstName\",\"msg\":\"First name is required\"},\n                 {\"param\":\"lastName\",\"msg\":\"Last name is required\"},\n                 {\"param\":\"email\",\"msg\":\"Email is required\"},\n                 {\"param\":\"userRole\",\"msg\":\"User role is required\"}\n            ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"User with same username already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/user.route.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/change-password/verify/",
    "title": "Post data to the server to check for password change authorization",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "verifyPasswordChangeRequest",
    "group": "User",
    "description": "<p>Post the combination of email, security question and security answer to check for password change authorization, if combination is correct, then user is allowed to change the password,else not authorized to change pasword</p>",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\ncurl \\\n-v \\\n-X POST  \\\nhttp://localhost:3000/api/change-password/verify/ \\\n-H 'Content-Type: application/json' \\\n-H \"x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTE5MzE0MiwiZXhwIjoxNDY5MjEzMTQyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.oxQ3PAr2FVGUNiVXpRGK0cpKjfDe6b2K1Dkl_cOE6W4Mtk6HRrI0bNyzkkuwp7DWhWAwgJWRTVR4irw2AkjjmQ\" \\\n-d '{\"email\":\"testnodecms@gmail.com\",\"securityQuestion\":\"favorite movie\",\"securityAnswer\":\"Harry Potter\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>A password change confirmation email has been sent to your email.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"An email has been sent to your email address that contains the link to change your password.Please check your email\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "BadRequest": [
          {
            "group": "BadRequest",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>validation errors due to not entering values for  mandatory fields email address, security question and answer to that question</p>"
          }
        ],
        "UnAuthorizedError": [
          {
            "group": "UnAuthorizedError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User account is blocked</p>"
          }
        ],
        "InternalServerError": [
          {
            "group": "InternalServerError",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n\n{\n  \"message\":[\n                 {\"param\":\"email\",\"msg\":\"Email is required\"},\n                 {\"param\":\"securityQuestion\",\"msg\":\"Security question is required\"},\n                 {\"param\":\"securityAnswer\",\"msg\":\"Security answer is required\"}\n            ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"You are currently blocked. Please check email forwarded to your email and click the link.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"message\": \"User account not confirmed. Please check your email and click on the link sent to you in the confirmation email to verify your account.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n\n{\n  \"message\": \"You are not authorized to change the password. Please enter the correct combination of data to be able to change the password\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/routes/user.route.js",
    "groupTitle": "User"
  }
] });
