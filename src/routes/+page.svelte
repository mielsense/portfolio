<script lang="ts">
	import { onMount } from 'svelte';

	let animationSpeed = 400;

	const frames = [
		`
              |\\      *,,,---,,*
        ZZZzz /,\`.-'\`'    -.  ;-;;,_
             |,4-  ) )-,_. ,\\ (  \`'-'
            '---''(\\/--'  \`-'\\_)  miel
     `,
		`
        ZZZ   |\\      *,,,---,,*
           zz /,\`.-'\`'    -.  ;-;;,_
             |,4-  ) )-,_. ,\\ (  \`'-'
            '---''(\\/--'  \`-'\\_)  miel
     `,
		`
           Z  |\\      *,,,---,,*
        ZZZ   /,\`.-'\`'    -.  ;-;;,_
             |,4-  ) )-,_. ,\\ (  \`'-'
            '---''(\\/--'  \`-'\\_)  miel
     `,
		`
              |\\      *,,,---,,*
        ZZZZZ /,\`.-'\`'    -.  ;-;;,_
             |,4-  ) )-,_. ,\\ (  \`'-'
            '---''(\\/--'  \`-'\\_)  miel
     `,
		`
          ZZZ |\\      *,,,---,,*
            Z /,\`.-'\`'    -.  ;-;;,_
             |,4-  ) )-,_. ,\\ (  \`'-'
            '---''(\\/--'  \`-'\\_)  miel
     `
	];

	let currentFrameIndex = 0;
	let currentFrame = frames[currentFrameIndex];
	let animationInterval: number;

	function nextFrame() {
		currentFrameIndex = (currentFrameIndex + 1) % frames.length;
		currentFrame = frames[currentFrameIndex];
	}

	onMount(() => {
		animationInterval = setInterval(nextFrame, animationSpeed);

		return () => {
			clearInterval(animationInterval);
		};
	});
</script>

<pre class="-translate-x-[12%] text-red-200">{currentFrame}</pre>
