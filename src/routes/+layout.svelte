<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<main class="flex h-screen max-h-screen max-w-screen items-center justify-center">
	<div
		class="bg-muted/20 m-4 flex w-full flex-col items-center justify-center rounded-[20px]"
		style="height: calc(100vh - 32px); overflow-y: auto;"
	>
		{@render children()}
	</div>
</main>
