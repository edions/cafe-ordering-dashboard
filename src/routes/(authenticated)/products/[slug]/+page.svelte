<script lang="ts">
	import Image from 'lucide-svelte/icons/image';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import {
		collection,
		doc,
		getDocs,
		addDoc,
		updateDoc,
		serverTimestamp,
		getDoc
	} from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getFile, uploadFile } from '$lib/firebase/storage';
	import { error } from '@sveltejs/kit';

	let catList: any[] = [];

	let productName: string;
	let productDescription: string;
	let stock: number = 0;
	let price: number = 0;
	let category: any;
	let status: any;

	let saving = false;

	//file upload
	let selectedImg: File;

	let imgInput: any;
	let image: any;
	let showImage = false;

	let slug = $page.params.slug;

	onMount(async () => {
		if (slug !== 'add') {
			getCurProduct();
			getCategory();
		} else {
			getCategory();
		}
	});

	const saveProduct = async () => {
		if (slug !== 'add') {
			editProduct();
		} else {
			addProduct();
		}
	};

	const addProduct = async () => {
		saving = true;

		const folder = 'products/';
		const imagePath = await uploadFile(selectedImg, folder);
		const imageUrl = await getFile(imagePath);

		const ref = collection(db, 'product2');
		await addDoc(ref, {
			productName,
			productDescription,
			stock,
			price,
			category,
			status,
			imageUrl,
			createdAt: serverTimestamp()
		});
		goto('/products');
	};

	const editProduct = async () => {
		saving = true;
		const ref = doc(db, 'product2', slug);
		await updateDoc(ref, {
			productName,
			productDescription,
			stock,
			price,
			category: category.value,
			status: status.value
		});
		goto('/products');
	};

	const getCurProduct = async () => {
		showImage = true;
		const ref = doc(db, 'product2', slug);
		const snapshot = await getDoc(ref);

		if (snapshot.exists()) {
			productName = snapshot.get('productName');
			productDescription = snapshot.get('productDescription');
			stock = snapshot.get('stock');
			price = snapshot.get('price');
			image = snapshot.get('imageUrl');
			category = { value: snapshot.get('category'), label: snapshot.get('category') };
			status = { value: snapshot.get('status'), label: snapshot.get('status') };
		} else {
			error(404, 'Product not found!');
		}
	};

	const getCategory = async () => {
		const ref = collection(db, 'category');
		const snapshot = await getDocs(ref);
		catList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	};

	const onImageUpload = () => {
		selectedImg = imgInput.files[0];

		if (selectedImg) {
			showImage = true;

			const reader = new FileReader();
			reader.onload = () => {
				image = reader.result as string;
			};
			reader.readAsDataURL(selectedImg);

			return;
		}
		showImage = false;
	};
</script>

<main
	class="grid max-h-[90vh] flex-1 items-start gap-4 overflow-y-auto p-4 sm:px-6 sm:py-0 md:gap-8 lg:pt-6"
>
	<div class="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
		<div class="flex items-center gap-4">
			<!-- <Button variant="outline" size="icon" class="h-7 w-7">
				<ChevronLeft class="h-4 w-4" />
				<span class="sr-only">Back</span>
			</Button> -->
			{#if slug !== 'add'}
				<h1
					class="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
					{productName}
				</h1>
				<Badge variant="outline" class="ml-auto sm:ml-0">In stock</Badge>
			{/if}
			<div class="hidden items-center gap-2 md:ml-auto md:flex">
				<Button variant="outline" size="sm" on:click={() => goto('/products')}>Discard</Button>
				<Button size="sm" on:click={saveProduct} disabled={saving}>
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
								<Textarea bind:value={productDescription} id="description" class="min-h-32" />
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
									selected={category}
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
												{cat.categoryName}</Select.Item
											>
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
									selected={status}
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
						<div class="grid justify-center gap-2">
							{#if showImage}
								<img
									alt="Product"
									class="aspect-square w-full rounded-md object-cover"
									height="300"
									src={image}
									width="300"
								/>
							{:else}
								<input
									bind:this={imgInput}
									on:change={onImageUpload}
									id="image-up"
									type="file"
									class="hidden"
								/>
								<label for="image-up" class="cursor-pointer">
									<Image class="aspect-square h-24 w-24 w-full rounded-md object-cover" />
								</label>
							{/if}
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
