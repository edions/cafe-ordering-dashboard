<script lang="ts">
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { collection, getDocs, addDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let catList:any[] = []

	let productName = '';
	let productDescription = '';
	let stock = 0;
	let price = 0;
	let category:any = '';
	let status:any = '';

	let saving = false;

	let selected = { value: "", label: "" };

	onMount(async () => {
		getCategory();
	});

	const addProduct = async () => {
		saving = true;
		const ref = collection(db, 'product2');
		await addDoc(ref, {
			productName,
			productDescription,
			stock,
			price,
			category,
			status
		});
		goto('/products');
	};

	const getCategory = async () => {
		const ref = collection(db, 'category');
		const snapshot = await getDocs(ref);
		catList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	};
	
</script>

<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:pt-6 max-h-[90vh] overflow-y-auto">
	<div class="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
		<div class="flex items-center gap-4">
			<!-- <Button variant="outline" size="icon" class="h-7 w-7">
				<ChevronLeft class="h-4 w-4" />
				<span class="sr-only">Back</span>
			</Button>
			<h1 class="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
				Pro Controller
			</h1> -->
			<Badge variant="outline" class="ml-auto sm:ml-0">In stock</Badge>
			<div class="hidden items-center gap-2 md:ml-auto md:flex">
				<a href="../products">
					<Button variant="outline" size="sm">Discard</Button>
				</a>
				<Button size="sm" on:click={addProduct} disabled={saving}>
					{#if saving}
					Saving
					{:else}
					Save Product
					{/if}
				</Button>
			</div>
		</div>
		<div class="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
			<div class="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
				<Card.Root
					data-x-chunk-name="dashboard-07-chunk-0"
					data-x-chunk-description="A card with a form to edit the product details"
				>
					<Card.Header>
						<Card.Title>Product Details</Card.Title>
					</Card.Header>
					<Card.Content>
						<div class="grid gap-6">
							<div class="grid gap-3">
								<Label for="name">Name</Label>
								<Input bind:value={productName} id="name" type="text" class="w-full" />
							</div>
							<div class="grid gap-3">
								<Label for="description">Description</Label>
								<Textarea
									bind:value={productDescription}
									id="description"
									class="min-h-32"
								/>
							</div>
						</div>
					</Card.Content>
				</Card.Root>
				<div class="grid gap-4 sm:grid-cols-2">
					<div class="grid gap-2">
						<Card.Root
							data-x-chunk-name="dashboard-07-chunk-1"
							data-x-chunk-description="A card with a form to edit the product stock and variants"
						>
							<Card.Header>
								<Card.Title>Stock</Card.Title>
							</Card.Header>
							<Card.Content>
								<div class="grid gap-6 sm:grid-cols-2">
									<div class="grid gap-3">
										<Label for="stock-1">Stock</Label>
										<Input bind:value={stock} id="stock-1" type="number" />
									</div>
									<div class="grid gap-3">
										<Label for="price-1">Price</Label>
										<Input bind:value={price} id="price-1" type="number" />
									</div>
								</div>
							</Card.Content>
						</Card.Root>
					</div>
					<div class="grid gap-2">
						<Card.Root
							data-x-chunk-name="dashboard-07-chunk-2"
							data-x-chunk-description="A card with a form to edit the product category and subcategory"
						>
							<Card.Header>
								<Card.Title>Product Category</Card.Title>
							</Card.Header>
							<Card.Content>
								<Label for="category">Category</Label>
								<Select.Root
									onSelectedChange={(v) => {
										v && (category = v.value);
									}}
								>
									<Select.Trigger id="category" aria-label="Select category">
										<Select.Value placeholder="Select category" />
									</Select.Trigger>
									<Select.Content>
										{#each catList as cat}
											<Select.Item value={cat.categoryName} label={cat.categoryName}>
												{cat.categoryName}</Select.Item>
										{/each}
									</Select.Content>
								</Select.Root>
							</Card.Content>
						</Card.Root>
					</div>
				</div>
			</div>
			<div class="grid auto-rows-max items-start gap-4 lg:gap-8">
				<Card.Root
					data-x-chunk-name="dashboard-07-chunk-3"
					data-x-chunk-description="A card with a form to edit the product status"
				>
					<Card.Header>
						<Card.Title>Product Status</Card.Title>
					</Card.Header>
					<Card.Content>
						<div class="grid gap-6">
							<div class="grid gap-3">
								<Label for="status">Status</Label>
								<Select.Root
									bind:selected
									onSelectedChange={(v) => {
										v && (status = v.value);
									}}
								>
									<Select.Trigger id="status" aria-label="Select status">
										<Select.Value placeholder="Select status" />
									</Select.Trigger>
									<Select.Content>
										<Select.Item value="draft" label="Draft">Draft</Select.Item>
										<Select.Item value="published" label="Active">Active</Select.Item>
										<Select.Item value="archived" label="Archived">Archived</Select.Item>
									</Select.Content>
								</Select.Root>
							</div>
						</div>
					</Card.Content>
				</Card.Root>
				<Card.Root
					class="overflow-hidden"
					data-x-chunk-name="dashboard-07-chunk-4"
					data-x-chunk-description="A card with a form to upload product images"
				>
					<Card.Header>
						<Card.Title>Product Images</Card.Title>
					</Card.Header>
					<Card.Content>
						<div class="grid gap-2">
							<img
								alt="Product"
								class="aspect-square w-full rounded-md bg-black object-cover"
								height="300"
								src="/images/placeholder.svg"
								width="300"
							/>
						</div>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
		<div class="flex items-center justify-center gap-2 md:hidden">
			<a href="../products">
				<Button variant="outline" size="sm">Discard</Button>
			</a>
			<Button size="sm">Save Product</Button>
		</div>
	</div>
</main>
