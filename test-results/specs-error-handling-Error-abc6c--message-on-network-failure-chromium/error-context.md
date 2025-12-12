# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - alert [ref=e3]
    - generic [ref=e4]:
      - heading "Welcome to Pokemon Collection App" [level=1] [ref=e5]
      - paragraph [ref=e6]: Nuxt 3 project successfully initialized!
      - generic [ref=e7]:
        - heading "Pokemon TCG API Test" [level=2] [ref=e8]
        - button "Loading..." [disabled] [ref=e9]
  - generic:
    - img
  - generic:
    - generic:
      - generic:
        - button "Go to parent" [disabled]
        - button "Open in editor"
        - button "Close"
  - generic [ref=e10]:
    - button "Toggle Nuxt DevTools" [ref=e11] [cursor=pointer]:
      - img [ref=e12]
    - generic "Page load time" [ref=e15]:
      - generic [ref=e16]: "22"
      - generic [ref=e17]: ms
    - button "Toggle Component Inspector" [ref=e19] [cursor=pointer]:
      - img [ref=e20]
```