<script lang="ts">
	import { useActiveElement } from "runed";

	const activeElement = useActiveElement();
</script>

<div class="rounded-md bg-card p-8">
	<p>
		Currently active element:
		<span class="font-bold">
			{activeElement.value?.localName ?? "No active element found"}
		</span>
	</p>
</div>
