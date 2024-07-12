<script lang="ts">
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
</script>

<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:pt-6">
	<div class="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
		<div class="flex items-center gap-4">
			<Button variant="outline" size="icon" class="h-7 w-7">
				<ChevronLeft class="h-4 w-4" />
				<span class="sr-only">Back</span>
			</Button>
			<h1 class="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
				Pro Controller
			</h1>
			<Badge variant="outline" class="ml-auto sm:ml-0">In stock</Badge>
			<div class="hidden items-center gap-2 md:ml-auto md:flex">
				<a href="../products">
					<Button variant="outline" size="sm">Discard</Button>
				</a>
				<Button size="sm">Save Product</Button>
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
								<Input id="name" type="text" class="w-full" value="Gamer Gear Pro Controller" />
							</div>
							<div class="grid gap-3">
								<Label for="description">Description</Label>
								<Textarea
									id="description"
									value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
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
										<Input id="stock-1" type="number" value="100" />
									</div>
									<div class="grid gap-3">
										<Label for="price-1">Price</Label>
										<Input id="price-1" type="number" value="99.99" />
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
								<Select.Root>
									<Select.Trigger id="category" aria-label="Select category">
										<Select.Value placeholder="Select category" />
									</Select.Trigger>
									<Select.Content>
										<Select.Item value="clothing" label="Clothing">Clothing</Select.Item>
										<Select.Item value="electronics" label="Electronics">Electronics</Select.Item>
										<Select.Item value="accessories" label="Accessories">Accessories</Select.Item>
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
								<Select.Root>
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
