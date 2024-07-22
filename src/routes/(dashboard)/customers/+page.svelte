<script lang="ts">
	import File from 'lucide-svelte/icons/file';
	import ListFilter from 'lucide-svelte/icons/list-filter';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import Search from 'lucide-svelte/icons/search';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase';
	import { onMount } from 'svelte';

	let orderList: any[] = [];

	const getOrders = async () => {
		const ref = collection(db, 'orders');
		const snapshot = await getDocs(ref);
		orderList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	};

	const updateOrderStatus = async (orderId: string, newStatus: string) => {
		const orderRef = doc(db, 'orders', orderId);
		await updateDoc(orderRef, { status: newStatus });
		const updatedOrderList = orderList.map((order) => 
		order.id === orderId ? { ...order, status: newStatus } : order
		);
		orderList = updatedOrderList;
  };

	onMount(async () => {
		getOrders();
	});

</script>

<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:p-6">
	<Tabs.Root value="all">
		<div class="flex items-center">
			<Tabs.List>
				<Tabs.Trigger value="all">All</Tabs.Trigger>
				<Tabs.Trigger value="active">Active</Tabs.Trigger>
				<Tabs.Trigger value="draft">Draft</Tabs.Trigger>
				<Tabs.Trigger value="archived" class="hidden sm:flex">Archived</Tabs.Trigger>
			</Tabs.List>
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
						<DropdownMenu.CheckboxItem checked>Active</DropdownMenu.CheckboxItem>
						<DropdownMenu.CheckboxItem>Draft</DropdownMenu.CheckboxItem>
						<DropdownMenu.CheckboxItem>Archived</DropdownMenu.CheckboxItem>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>
		<Tabs.Content value="all">
			<Card.Root>
				<Card.Header>
					<div class="flex items-center">
						<Card.Title>Products</Card.Title>
						<div class="ml-auto flex items-center gap-2">
							<form>
								<div class="relative">
									<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input
										type="search"
										placeholder="Search products..."
										class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-3/4"
									/>
								</div>
							</form>
						</div>
					</div>
                    <Card.Description>
                        Manage your products and view their sales performance.
                    </Card.Description>
				</Card.Header>
				<Card.Content>
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head class="hidden md:table-cell">Transaction ID</Table.Head>
								<Table.Head>Customer</Table.Head>
								<Table.Head>Status</Table.Head>
								<Table.Head class="hidden md:table-cell">Total Price</Table.Head>
								<Table.Head class="hidden md:table-cell">Items</Table.Head>
								<Table.Head class="hidden md:table-cell">Order at</Table.Head>
								<Table.Head>
									<span class="sr-only">Actions</span>
								</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each orderList as orders}
							<Table.Row>
								<Table.Cell class="hidden sm:table-cell">{orders.id}</Table.Cell>
								<Table.Cell class="font-small">{orders.customer}</Table.Cell>
								<Table.Cell>
									<DropdownMenu.Root>
										<DropdownMenu.Trigger asChild let:builder>
										  <Button aria-haspopup="true" size="sm" variant="outline" builders={[builder]}>
											{orders.status}
										  </Button>
										</DropdownMenu.Trigger>
										<DropdownMenu.Content align="end">
										  <DropdownMenu.Label>Change Status</DropdownMenu.Label>
										  <DropdownMenu.Separator />
										  <DropdownMenu.Item>
											<button on:click={() => updateOrderStatus(orders.id, 'Shipped')}>Shipped</button>
										</DropdownMenu.Item>
										  <DropdownMenu.Item>
											<button on:click={() => updateOrderStatus(orders.id, 'Processing')}>Processing</button>
										  </DropdownMenu.Item>
										  <DropdownMenu.Item>
											<button on:click={() => updateOrderStatus(orders.id, 'Delivered')}>Delivered</button>
										  </DropdownMenu.Item>
										  <DropdownMenu.Item>
											<button on:click={() => updateOrderStatus(orders.id, 'Cancelled')}>Cancelled</button>
										  </DropdownMenu.Item>
										</DropdownMenu.Content>
									</DropdownMenu.Root>
								</Table.Cell>
								<Table.Cell class="hidden md:table-cell">${orders.total}</Table.Cell>
								<Table.Cell class="hidden md:table-cell">{orders.items}</Table.Cell>
								<Table.Cell class="hidden md:table-cell">{orders.transactionTimestamp?.toDate()?.toDateString()}</Table.Cell>
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
											<DropdownMenu.Item>Edit</DropdownMenu.Item>
											<DropdownMenu.Item>Delete</DropdownMenu.Item>
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
		</Tabs.Content>
	</Tabs.Root>
</main>
