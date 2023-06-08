```mermaid
sequenceDiagram
    participant browser
    participant server


    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: The request tells the server that the data is JSON

    activate server
    server-->>browser: The browser renders the note
    deactivate server
```

