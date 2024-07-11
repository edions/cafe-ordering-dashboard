<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
</script>

<div class="flex h-screen items-center justify-center">
	<Card.Root class="min-w-[300px]">
		<CardHeader></CardHeader>
		<Card.Content class="center flex-col ">
			<h2 class="font-mono">{$page.status}: {$page.error?.message}</h2>
		</Card.Content>
		<Card.Footer class="w-full">
			<Button class="w-full" href="/">Return</Button>
		</Card.Footer>
	</Card.Root>
</div>
