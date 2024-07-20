<script>
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.css';
</script>

<div class="h-screen w-screen overflow-hidden flex flex-col">
	<Toaster />
	<slot />
</div>
