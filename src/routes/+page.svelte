<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/firebase';

	let authenticated = false;

	onMount(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				authenticated = true;
				goto('/dashboard');
			} else {
				authenticated = false;
				goto('/login');
			}
		});
	});
</script>
