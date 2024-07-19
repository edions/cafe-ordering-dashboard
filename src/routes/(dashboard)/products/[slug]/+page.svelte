<script lang="ts">
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { collection, getDocs, } from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { ImageUp } from '$lib/icons';

	
	export let data: PageData;

	let slug = $page.params.slug;
	let savingInProgress = false;

	let status = { value: data.status, label: data.status };
	let category = { value: data.category, label: data.category };
	let image = data.image;

	let catList: any[] = [];

	onMount(async () => {
		getCategory();
	});

	const getCategory = async () => {
		const ref = collection(db, 'category');
		const snapshot = await getDocs(ref);
		catList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	};

	const onImageUpload = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
			image  = URL.createObjectURL(file);
		}
	};
</script>

<main
	class="grid max-h-[90vh] flex-1 items-start gap-4 overflow-y-auto p-4 sm:px-6 sm:py-0 md:gap-8 lg:pt-6"
>
	<div class="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
		<form method="POST" enctype="multipart/form-data" use:enhance={() => {
			savingInProgress = true;
		}}>
			<div class="flex items-center gap-4 pb-5">
				<!-- <Button variant="outline" size="icon" class="h-7 w-7">
					<ChevronLeft class="h-4 w-4" />
					<span class="sr-only">Back</span>
				</Button> -->
				{#if slug !== 'add'}
					<h1 class="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">{data.productName}</h1>
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
										value={data.productName}
										name="productName"
										type="text"
										class="w-full"
										disabled={savingInProgress}
									/>
								</div>
								<div class="grid gap-3">
									<Label>Description</Label>
									<Textarea
										value={data.productDescription}
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
												value={data.stock}
												name="stock"
												type="number"
												disabled={savingInProgress} />
										</div>
										<div class="grid gap-3">
											<Label>Price</Label>
											<Input
												value={data.price}
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
										>
										<Select.Trigger>
											<Select.Value placeholder="Select status" />
										</Select.Trigger>
										<Select.Content>
											<Select.Item value="Draft" label="Draft">Draft</Select.Item>
											<Select.Item value="Published" label="Active">Active</Select.Item>
											<Select.Item value="Archived" label="Archived">Archived</Select.Item>
										</Select.Content>
										<Select.Input name="status"/>
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
								<Input
									on:change={onImageUpload}
									name="imageUrl"
									type="file"
									accept="image/*"
									id="select-image"
									class="hidden"
									disabled={savingInProgress}
								/>
								{#if image}
									<label for="select-image">
										<img
											alt="Product"
											class="aspect-square w-full rounded-md object-cover"
											height="300"
											src={image}
											width="300"
										/>
									</label>
								{:else}
									<label for="select-image" class="flex flex-col items-center justify-center w-60 h-[244px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
										<div class="flex flex-col items-center justify-center pt-5 pb-5">
											<ImageUp  class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
											<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
												<span class="font-semibold">Click to upload</span>
											</p>
											<p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
										</div>
									</label>
								{/if}
							</div>
						</Card.Content>
					</Card.Root>
				</div>
			</div>
			<div class="flex items-center justify-center gap-2 md:hidden">
				<a href="/products">
					<Button variant="outline" size="sm" disabled={savingInProgress}>Discard</Button>
				</a>
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
