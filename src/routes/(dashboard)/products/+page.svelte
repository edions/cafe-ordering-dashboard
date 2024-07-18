<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import Product from '$lib/components/Product.svelte';
	import Category from '$lib/components/Category.svelte';
</script>

<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:p-6">
	<Tabs.Root value="product">
		<div class="flex items-center">
			<div>
				<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Products</h3>
				<p class="text-muted-foreground text-sm py-2">
					Manage your products and category.
				</p>
			</div>
			<div class="ml-auto flex items-center gap-2">
				<Tabs.List>
					<Tabs.Trigger value="product">Product</Tabs.Trigger>
					<Tabs.Trigger value="category">Category</Tabs.Trigger>
					<!-- <Tabs.Trigger value="draft">Draft</Tabs.Trigger>
					<Tabs.Trigger value="archived" class="hidden sm:flex">Archived</Tabs.Trigger> -->
				</Tabs.List>
			</div>
		</div>
		<Tabs.Content value="product">
			<Product />
		</Tabs.Content>
		<Tabs.Content value="category">
			<Category />
		</Tabs.Content>
	</Tabs.Root>
</main>
