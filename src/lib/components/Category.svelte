<script lang="ts">
	import { Search, Ellipsis } from '$lib/icons';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { db } from '$lib/firebase/firebase';
	import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	let categoryList: any[] = [];
	let categoryId = '';
	let categoryName = '';
	let open = false;

	onMount(async () => {
		getCategory();
	});

	const getCategory = async () => {
		const ref = collection(db, 'category');
		const snapshot = await getDocs(ref);
		categoryList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	};

	const addCategory = async () => {
		const ref = collection(db, 'category');
		await addDoc(ref, {
			categoryName
		});
		getCategory();
		categoryName = '';
		open = false;
	};

	const editCategory = async (id: any, cat: any) => {
		open = true;
		categoryId = id;
		categoryName = cat;
	};

	const delCategory = async (id: any) => {
		const ref = doc(db, 'category', id);
		await deleteDoc(ref);
		getCategory();
	};

	const openAddCat = () => {
		categoryName = '';
		open = true;
	};
</script>

<Dialog.Root bind:open>
	<!-- <Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Edit Profile</Dialog.Trigger> -->
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>New category</Dialog.Title>
			<Dialog.Description>
				Make changes to category here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-1 items-center gap-2">
				<Label for="name">Category Name</Label>
				<Input bind:value={categoryId} class="hidden" />
				<Input bind:value={categoryName} class="col-span-3" />
			</div>
		</div>
		<Dialog.Footer>
			<Button on:click={addCategory}>Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<Card.Root>
	<Card.Header class="flex flex-row items-center">
		<div class="relative basis-6/12">
			<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
			<Input
				type="search"
				placeholder="Search category..."
				class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-3/4"
			/>
		</div>
		<Button on:click={openAddCat} size="sm" class="ml-auto gap-1">
			<CirclePlus class="h-3.5 w-3.5" />
			<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Add category </span>
		</Button>
	</Card.Header>
	<Card.Content class="max-h-[60vh] overflow-y-auto">
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Category</Table.Head>
					<Table.Head class="text-right">Actions</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each categoryList as cat}
					<Table.Row>
						<Table.Cell>
							<div class="font-medium">{cat.categoryName}</div>
						</Table.Cell>
						<Table.Cell class="text-right">
							<DropdownMenu.Root>
								<DropdownMenu.Trigger asChild let:builder>
									<Button aria-haspopup="true" size="icon" variant="ghost" builders={[builder]}>
										<Ellipsis class="h-4 w-4" />
										<span class="sr-only">Toggle menu</span>
									</Button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end">
									<DropdownMenu.Label>Actions</DropdownMenu.Label>
									<DropdownMenu.Item on:click={() => editCategory(cat.id, cat.categoryName)}
										>Edit</DropdownMenu.Item
									>
									<DropdownMenu.Item on:click={() => delCategory(cat.id)}>Delete</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>
