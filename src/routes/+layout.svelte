<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>miel - {new Date().getFullYear()}</title>
</svelte:head>

<main
	class="relative flex h-screen max-h-screen max-w-screen items-center justify-center overflow-hidden"
>
	<!-- Background Image -->
	<div
		class="absolute inset-0 bg-cover bg-center bg-no-repeat"
		style="background-image: url('/profile.png');"
	></div>

	<!-- Overlay for better contrast -->
	<div class="bg-background/20 absolute inset-0"></div>

	<!-- Content Container -->
	<div
		class="bg-background/95 relative z-10 m-2 flex w-full flex-col items-center justify-center rounded-[20px]"
		style="height: calc(100vh - 16px); overflow-y: auto;"
	>
		{@render children()}
	</div>
</main>
