<script lang="ts">
	import { Search, Ellipsis, ListFilter, CirclePlus, Trash2, Pencil } from '$lib/icons';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { db } from '$lib/firebase/firebase';
	import { deleteDoc, doc } from 'firebase/firestore';
	import { invalidate } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	export let data: any;

	const delProduct = async (id: string) => {
		try {
			const ref = doc(db, 'product2', id);
			await deleteDoc(ref);
			toast.success("Successfully deleted product");
			invalidate('products:now');
		} catch {
			toast.error("Failed to delete product. Please try again.");
		}
	};
</script>

<Card.Root class="flex max-h-[75vh] flex-col">
	<Card.Header>
		<div class="flex items-center">
			<div class="relative basis-6/12">
				<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					type="search"
					placeholder="Search products..."
					class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-3/4"
				/>
			</div>
			<div class="ml-auto flex items-center gap-2">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button builders={[builder]} variant="outline" size="sm" class="h-8 gap-1">
							<ListFilter class="h-3.5 w-3.5" />
							<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Filter </span>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Label>Filter by</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<a href="?filter=published">
							<DropdownMenu.CheckboxItem checked>Active</DropdownMenu.CheckboxItem>
						</a>
						<DropdownMenu.CheckboxItem>Draft</DropdownMenu.CheckboxItem>
						<DropdownMenu.CheckboxItem>Archived</DropdownMenu.CheckboxItem>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
				<a href="products/add">
					<Button size="sm" class="h-8 gap-1">
						<CirclePlus class="h-3.5 w-3.5" />
						<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Add Product </span>
					</Button>
				</a>
			</div>
		</div>
	</Card.Header>
	<Card.Content class="flex-1 overflow-y-auto">
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="hidden w-[100px] sm:table-cell">
						<span class="sr-only">Image</span>
					</Table.Head>
					<Table.Head>Name</Table.Head>
					<Table.Head>Status</Table.Head>
					<Table.Head>Stock</Table.Head>
					<Table.Head class="hidden md:table-cell">Price</Table.Head>
					<Table.Head class="hidden md:table-cell">Category</Table.Head>
					<Table.Head class="hidden md:table-cell">Created at</Table.Head>
					<Table.Head>
						<span class="sr-only">Actions</span>
					</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.productList as prod}
					<Table.Row>
						<Table.Cell class="hidden sm:table-cell">
							<img
								alt="Product example"
								class="aspect-square rounded-md object-cover"
								height="64"
								src={prod.imageUrl}
								width="64"
							/>
						</Table.Cell>
						<Table.Cell class="font-medium">{prod.productName}</Table.Cell>
						<Table.Cell>
							<Badge variant="outline">{prod.status}</Badge>
						</Table.Cell>
						<Table.Cell class="font-medium">{prod.stock}</Table.Cell>
						<Table.Cell class="hidden md:table-cell">${prod.price}</Table.Cell>
						<Table.Cell class="hidden md:table-cell">{prod.category}</Table.Cell>
						<Table.Cell class="hidden md:table-cell"
							>{prod.createdAt?.toDate()?.toDateString()}</Table.Cell
						>
						<Table.Cell>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger asChild let:builder>
									<Button aria-haspopup="true" size="icon" variant="ghost" builders={[builder]}>
										<Ellipsis class="h-4 w-4" />
										<span class="sr-only">Toggle menu</span>
									</Button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end">
									<DropdownMenu.Label>Actions</DropdownMenu.Label>
									<a href={`products/${prod.id}`}>
										<DropdownMenu.Item>
											<Pencil class="h-4 w-4 pr-1" />
											Edit
										</DropdownMenu.Item>
									</a>
									<DropdownMenu.Item on:click={() => delProduct(prod.id)}>
										<Trash2 class="h-4 w-4 pr-1" />
										Delete
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
	<Card.Footer>
		<div class="text-xs text-muted-foreground">
			Showing <strong>1-10</strong> of <strong>32</strong> products
		</div>
	</Card.Footer>
</Card.Root>
