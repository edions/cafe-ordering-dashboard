<script lang="ts">
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '$lib/firebase/firebase';
	import { goto } from '$app/navigation';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	let email = '';
	let password = '';
	let error = false;
	let authenticating = false;

	async function handelLogin() {
		if (authenticating) {
			return;
		}
		if (!email || !password) {
			error = true;
			return;
		}

		authenticating = true;
		try {
			await signInWithEmailAndPassword(auth, email, password);
			goto('/dashboard');
		} catch (err) {
			error = true;
			authenticating = false;
		}
	}
</script>

<div class="flex h-screen items-center justify-center">
	<Card.Root class="w-full max-w-sm">
		<form>
			<Card.Header>
				<Card.Title class="text-2xl">Login</Card.Title>
				{#if error}
					<Card.Description class="text-red-600">The information you have entered is not correct</Card.Description>
				{:else}
					<Card.Description>Enter your email below to login.</Card.Description>
				{/if}
			</Card.Header>
			<Card.Content class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input bind:value={email} type="email" placeholder="m@example.com" required />
				</div>
				<div class="grid gap-2">
					<Label for="password">Password</Label>
					<Input bind:value={password} type="password" placeholder="Password" required />
				</div>
			</Card.Content>
			<Card.Footer>
				<Button class="w-full" on:click={handelLogin} disabled={authenticating}>
					{#if authenticating}
					 Loading...
					{:else}
						Sign in
					{/if}
				</Button>
			</Card.Footer>
		</form>
	</Card.Root>
</div>
