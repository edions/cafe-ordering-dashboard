<script lang="ts">
	import Image from 'lucide-svelte/icons/image';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
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
		getDoc
	} from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { error } from '@sveltejs/kit';
	import { enhance } from '$app/forms';



	let catList: any[] = [];

	let productName: string = '';
	let productDescription: string = '';
	let stock: number = 0;
	let price: number = 0;
	let category: any;
	let status: any;

	let savingInProgress = false;

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
		<form method="POST" enctype="multipart/form-data" use:enhance={() => {
			savingInProgress = true;
		}}>
			<div class="flex items-center gap-4">
				<!-- <Button variant="outline" size="icon" class="h-7 w-7">
					<ChevronLeft class="h-4 w-4" />
					<span class="sr-only">Back</span>
				</Button> -->
				{#if slug !== 'add'}
					<h1 class="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">{productName}</h1>
					<!-- <Badge variant="outline" class="ml-auto sm:ml-0">{status.value}</Badge> -->
				{/if}
				<div class="hidden items-center gap-2 md:ml-auto md:flex">
					<a href="/products">
						<Button variant="outline" size="sm" disabled={savingInProgress}>Discard</Button>
					</a>
					<Button size="sm" type="submit">
						{#if savingInProgress}
							<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
							Please wait
						{:else}
							Save Product
						{/if}
					</Button>
				</div>
			</div>
			<div class="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
				<div class="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
					<Card.Root>
						<Card.Header>
							<Card.Title>Product Details</Card.Title>
						</Card.Header>
						<Card.Content>
							<div class="grid gap-6">
								<div class="grid gap-3">
									<Label>Name</Label>
									<Input
										bind:value={productName}
										name="productName"
										type="text"
										class="w-full"
										disabled={savingInProgress}
									/>
								</div>
								<div class="grid gap-3">
									<Label>Description</Label>
									<Textarea
										bind:value={productDescription}
										name="productDescription"
										class="min-h-32"
										disabled={savingInProgress}
									/>
								</div>
							</div>
						</Card.Content>
					</Card.Root>
					<div class="grid gap-4 sm:grid-cols-2">
						<div class="grid gap-2">
							<Card.Root>
								<Card.Header>
									<Card.Title>Stock</Card.Title>
								</Card.Header>
								<Card.Content>
									<div class="grid gap-6 sm:grid-cols-2">
										<div class="grid gap-3">
											<Label>Stock</Label>
											<Input
												bind:value={stock}
												name="stock"
												type="number"
												disabled={savingInProgress} />
										</div>
										<div class="grid gap-3">
											<Label>Price</Label>
											<Input
												bind:value={price}
												name="price"
												type="number"
												disabled={savingInProgress} />
										</div>
									</div>
								</Card.Content>
							</Card.Root>
						</div>
						<div class="grid gap-2">
							<Card.Root>
								<Card.Header>
									<Card.Title>Product Category</Card.Title>
								</Card.Header>
								<Card.Content>
									<Label>Category</Label>
									<Select.Root
										disabled={savingInProgress}
										selected={category}
										onSelectedChange={(v) => {
											v && (category = v.value);
										}}
									>
										<Select.Trigger>
											<Select.Value placeholder="Select category" />
										</Select.Trigger>
										<Select.Content>
											{#each catList as cat}
												<Select.Item value={cat.categoryName} label={cat.categoryName}>
													{cat.categoryName}</Select.Item
												>
											{/each}
										</Select.Content>
										<Select.Input name="category" />
									</Select.Root>
								</Card.Content>
							</Card.Root>
						</div>
					</div>
				</div>
				<div class="grid auto-rows-max items-start gap-4 lg:gap-8">
					<Card.Root>
						<Card.Header>
							<Card.Title>Product Status</Card.Title>
						</Card.Header>
						<Card.Content>
							<div class="grid gap-6">
								<div class="grid gap-3">
									<Label for="status">Status</Label>
									<Select.Root
										disabled={savingInProgress}
										selected={status}
										onSelectedChange={(v) => {
											v && (status = v.value);
										}}
									>
										<Select.Trigger>
											<Select.Value placeholder="Select status" />
										</Select.Trigger>
										<Select.Content>
											<Select.Item value="draft" label="Draft">Draft</Select.Item>
											<Select.Item value="published" label="Active">Active</Select.Item>
											<Select.Item value="archived" label="Archived">Archived</Select.Item>
										</Select.Content>
										<Select.Input name="status" />
									</Select.Root>
								</div>
							</div>
						</Card.Content>
					</Card.Root>
					<Card.Root class="overflow-hidden">
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
								<!-- bind:this={imgInput} -->
									<input
										
										on:change={onImageUpload}
										name="imageUrl"
										type="file"
									/>
									<label for="image-up" class="cursor-pointer">
										<Image class="aspect-square h-24 w-24 rounded-md object-cover" />
									</label>
								{/if}
							</div>
						</Card.Content>
					</Card.Root>
				</div>
			</div>
			<div class="flex items-center justify-center gap-2 md:hidden">
				<Button variant="outline" size="sm" on:click={() => goto('/products')} disabled={savingInProgress}
					>Discard</Button
				>
				<Button size="sm" disabled={savingInProgress}>
					{#if savingInProgress}
						<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
						Please wait
					{:else}
						Save Product
					{/if}
				</Button>
			</div>
		</form>
	</div>
</main>
