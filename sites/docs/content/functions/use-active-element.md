---
title: UseActiveElement
description: A function that returns the currently active element.
---

<script>
import { UseActiveElementDemo } from '$lib/components/demos';
</script>

## Demo

<UseActiveElementDemo />

## Usage

```svelte
<script lang="ts">
	import { useActiveElement } from "runed";

	const activeElement = useActiveElement();
</script>

<div class="rounded-md bg-card p-8">
	<p>
		Currently active element:
		<span class="font-bold">
			{activeElement.value !== null
				? activeElement.value.localName
				: "No active element found"}
		</span>
	</p>
</div>
```