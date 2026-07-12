# Usage & API

It is a standard custom element, so it works with no wrapper in plain HTML, React, Vue, Svelte and Astro.

## Plain HTML

```html
<script src="json-formatter.js"></script>
<json-formatter></json-formatter>
```

## React

```jsx
import "@sgbp/json-formatter";
export default function Page() { return <json-formatter />; }
```

## Vue

```vue
<script setup>
import "@sgbp/json-formatter";
</script>

<template>
  <json-formatter />
</template>
```

---

Prefer to just use it without installing anything? The
[live JSON Formatter & Validator](https://sgbp.tech/tools/json-formatter) is hosted and ready to go.
