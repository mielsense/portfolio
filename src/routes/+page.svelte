<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let animationSpeed = 400;
	const frames = [
		`
              |\\      *,,,---,,*
        ZZZzz /,\`.-'\`'    -.  ;-;;,_
             |,4-  ) )-,_. ,\\ (  \`'-'
            '---''(\\/--'  \`-'\\_)
     `,
		`
        ZZZ   |\\      *,,,---,,*
           zz /,\`.-'\`'    -.  ;-;;,_
             |,4-  ) )-,_. ,\\ (  \`'-'
            '---''(\\/--'  \`-'\\_)
     `,
		`
           Z  |\\      *,,,---,,*
        ZZZ   /,\`.-'\`'    -.  ;-;;,_
             |,4-  ) )-,_. ,\\ (  \`'-'
            '---''(\\/--'  \`-'\\_)
     `,
		`
              |\\      *,,,---,,*
        ZZZZZ /,\`.-'\`'    -.  ;-;;,_
             |,4-  ) )-,_. ,\\ (  \`'-'
            '---''(\\/--'  \`-'\\_)
     `,
		`
          ZZZ |\\      *,,,---,,*
            Z /,\`.-'\`'    -.  ;-;;,_
             |,4-  ) )-,_. ,\\ (  \`'-'
            '---''(\\/--'  \`-'\\_)
     `
	];

	let currentFrameIndex = $state(0);
	let animationInterval: number;

	function nextFrame() {
		currentFrameIndex = (currentFrameIndex + 1) % frames.length;
	}

	let { data }: { data: PageData } = $props();

	// Get the current frame reactively using $derived
	const currentFrame = $derived(frames[currentFrameIndex]);

	// Helper function to get the best available cover art
	function getCoverArt(track: any): string {
		if (!track?.image || !Array.isArray(track.image)) {
			return '/favicon.png';
		}

		// Try to get extralarge, then large, then medium, then small
		const sizes = ['extralarge', 'large', 'medium', 'small'];
		for (const size of sizes) {
			const image = track.image.find((img: any) => img.size === size);
			if (image && image['#text'] && image['#text'].trim() !== '') {
				return image['#text'];
			}
		}

		return '/favicon.png';
	}

	onMount(() => {
		animationInterval = setInterval(nextFrame, animationSpeed);

		// Refetch data every 30 seconds
		const dataRefreshInterval = setInterval(() => {
			invalidateAll();
		}, 30000); // 30 seconds

		return () => {
			clearInterval(animationInterval);
			clearInterval(dataRefreshInterval);
		};
	});
</script>

<div class="relative flex h-[100dvh] flex-col overflow-hidden p-2 sm:p-4">
	<!-- Social Navigation - Desktop -->
	<div class="fixed top-1/2 right-6 z-10 hidden -translate-y-1/2 transform flex-col gap-2 lg:flex">
		<a
			href="https://github.com/mielsense"
			target="_blank"
			rel="noopener noreferrer"
			class="group flex h-10 w-10 items-center justify-center rounded-lg bg-lime-200 transition-transform hover:scale-105"
		>
			<img src="/logos/github.svg" alt="GitHub" class="h-5 w-5" />
		</a>
		<a
			href="mailto:mielsense@proton.me"
			aria-label="Email"
			class="group flex h-10 w-10 items-center justify-center rounded-lg bg-lime-200 transition-transform hover:scale-105"
		>
			<svg class="h-5 w-5 fill-black" viewBox="0 0 24 24">
				<path
					d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
				/>
			</svg>
		</a>
	</div>

	<!-- Social Navigation - Mobile -->
	<div class="fixed bottom-6 left-1/2 z-10 flex -translate-x-1/2 transform gap-2 lg:hidden">
		<a
			href="https://github.com/mielsense"
			target="_blank"
			rel="noopener noreferrer"
			class="group flex h-10 w-10 items-center justify-center rounded-lg bg-lime-200 transition-transform hover:scale-105"
		>
			<img src="/logos/github.svg" alt="GitHub" class="h-5 w-5" />
		</a>
		<a
			href="mailto:mielsense@proton.me"
			aria-label="Email"
			class="group flex h-10 w-10 items-center justify-center rounded-lg bg-lime-200 transition-transform hover:scale-105"
		>
			<svg class="h-5 w-5 fill-black" viewBox="0 0 24 24">
				<path
					d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
				/>
			</svg>
		</a>
	</div>

	<!-- Main Content -->
	<div class="flex flex-1 flex-col items-center justify-center gap-6 sm:gap-8">
		<!-- Profile Section -->
		<div class="flex flex-shrink-0 flex-col items-center gap-4 sm:flex-row sm:gap-6">
			<img
				src="/profile.png"
				alt="Profile"
				class="h-32 w-32 rounded-2xl object-cover transition-transform hover:scale-105 sm:h-40 sm:w-40"
			/>
			<div class="flex flex-col text-center sm:text-left">
				<h1 class="text-4xl font-bold text-lime-200 sm:text-6xl">miel</h1>
				<p class="text-forground/60 text-lg sm:text-2xl">software developer</p>
			</div>
		</div>

		<!-- Currently Playing Section -->
		<div class="mt-[20%] w-full max-w-2xl flex-shrink-0 space-y-2 px-2 sm:scale-85 sm:px-0 md:mt-0">
			{#if data.track}
				<div class="text-forground/60">
					<p class="text-sm">currently playing:</p>
				</div>
				<div
					class="bg-background/50 border-background flex w-full items-center gap-3 rounded-lg border px-3 py-3 sm:gap-6 sm:px-6"
				>
					<img
						src={getCoverArt(data.track)}
						alt="Album cover"
						class="h-10 w-10 flex-shrink-0 rounded object-cover sm:h-12 sm:w-12"
						onerror={(e) => {
							const target = e.currentTarget as HTMLImageElement;
							target.src = '/favicon.png';
						}}
					/>
					<div class="flex min-w-0 flex-1 flex-col justify-center">
						<p class="text-primary truncate text-base font-semibold sm:text-lg">
							{data.track.name || 'Unknown Track'}
						</p>
						<div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
							<p class="text-forground/80 truncate text-xs sm:text-sm">
								{data.track.artist?.['#text'] || 'Unknown Artist'}
							</p>
							{#if data.track.album?.['#text']}
								<span class="text-forground/40 hidden sm:inline">•</span>
								<p class="text-forground/60 truncate text-xs sm:text-sm">
									{data.track.album['#text']}
								</p>
							{/if}
						</div>
					</div>
					<div class="flex flex-shrink-0 items-center gap-2">
						<div class="h-2 w-2 animate-pulse rounded-full bg-red-400"></div>
						<span class="hidden text-xs text-red-400 sm:inline">now playing</span>
					</div>
				</div>
			{:else}
				<div class="text-forground/60 text-center">
					<p class="text-sm">no music currently playing</p>
				</div>
			{/if}
		</div>
	</div>

	<!-- Cat Animation - Desktop only -->
	<div class="absolute bottom-4 left-1/2 block hidden -translate-x-1/2 lg:block">
		<div class="flex flex-col items-center">
			<pre class="-translate-x-[12%] scale-90 text-center text-lime-200">{currentFrame}</pre>
			<span class="text-center text-sm text-lime-200"
				>local time - {new Date().toLocaleTimeString('en-EN', {
					hour: 'numeric',
					minute: 'numeric',
					timeZone: 'Asia/Seoul'
				})}</span
			>
		</div>
	</div>
</div>
