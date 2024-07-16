<script lang="ts">
	import Ellipsis from 'lucide-svelte/icons/ellipsis';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import ListFilter from 'lucide-svelte/icons/list-filter';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import Search from 'lucide-svelte/icons/search';
	import { Input } from '$lib/components/ui/input/index.js';
</script>

<Card.Root>
	<Card.Header>
		<!-- <Card.Title>Products</Card.Title>
        <Card.Description>
            Manage your products and view their sales performance.
        </Card.Description> -->
		<div class="flex items-center">
			<div class="relative">
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
						<DropdownMenu.CheckboxItem checked>Active</DropdownMenu.CheckboxItem>
						<DropdownMenu.CheckboxItem>Draft</DropdownMenu.CheckboxItem>
						<DropdownMenu.CheckboxItem>Archived</DropdownMenu.CheckboxItem>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
				<!-- <Button size="sm" variant="outline" class="h-8 gap-1">
                <File class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Export </span>
            </Button> -->
				<a href="products/add">
					<Button size="sm" class="h-8 gap-1">
						<CirclePlus class="h-3.5 w-3.5" />
						<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Add Product </span>
					</Button>
				</a>
			</div>
		</div>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="hidden w-[100px] sm:table-cell">
						<span class="sr-only">Image</span>
					</Table.Head>
					<Table.Head>Name</Table.Head>
					<Table.Head>Status</Table.Head>
					<Table.Head class="hidden md:table-cell">Price</Table.Head>
					<Table.Head class="hidden md:table-cell">Total Sales</Table.Head>
					<Table.Head class="hidden md:table-cell">Created at</Table.Head>
					<Table.Head>
						<span class="sr-only">Actions</span>
					</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell class="hidden sm:table-cell">
						<img
							alt="Product example"
							class="aspect-square rounded-md object-cover"
							height="64"
							src="/images/placeholder.svg"
							width="64"
						/>
					</Table.Cell>
					<Table.Cell class="font-medium">Laser Lemonade Machine</Table.Cell>
					<Table.Cell>
						<Badge variant="outline">Draft</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">$499.99</Table.Cell>
					<Table.Cell class="hidden md:table-cell">25</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-07-12 10:42 AM</Table.Cell>
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
				<Table.Row>
					<Table.Cell class="hidden sm:table-cell">
						<img
							alt="Product"
							class="aspect-square rounded-md object-cover"
							height="64"
							src="/images/placeholder.svg"
							width="64"
						/>
					</Table.Cell>
					<Table.Cell class="font-medium">Hypernova Headphones</Table.Cell>
					<Table.Cell>
						<Badge variant="outline">Active</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">$129.99</Table.Cell>
					<Table.Cell class="hidden md:table-cell">100</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-10-18 03:21 PM</Table.Cell>
					<Table.Cell>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button builders={[builder]} aria-haspopup="true" size="icon" variant="ghost">
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
				<Table.Row>
					<Table.Cell class="hidden sm:table-cell">
						<img
							alt="Product"
							class="aspect-square rounded-md object-cover"
							height="64"
							src="/images/placeholder.svg"
							width="64"
						/>
					</Table.Cell>
					<Table.Cell class="font-medium">AeroGlow Desk Lamp</Table.Cell>
					<Table.Cell>
						<Badge variant="outline">Active</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">$39.99</Table.Cell>
					<Table.Cell class="hidden md:table-cell">50</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-11-29 08:15 AM</Table.Cell>
					<Table.Cell>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button builders={[builder]} aria-haspopup="true" size="icon" variant="ghost">
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
				<Table.Row>
					<Table.Cell class="hidden sm:table-cell">
						<img
							alt="Product"
							class="aspect-square rounded-md object-cover"
							height="64"
							src="/images/placeholder.svg"
							width="64"
						/>
					</Table.Cell>
					<Table.Cell class="font-medium">TechTonic Energy Drink</Table.Cell>
					<Table.Cell>
						<Badge variant="secondary">Draft</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">$2.99</Table.Cell>
					<Table.Cell class="hidden md:table-cell">0</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-12-25 11:59 PM</Table.Cell>
					<Table.Cell>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button builders={[builder]} aria-haspopup="true" size="icon" variant="ghost">
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
				<Table.Row>
					<Table.Cell class="hidden sm:table-cell">
						<img
							alt="Product"
							class="aspect-square rounded-md object-cover"
							height="64"
							src="/images/placeholder.svg"
							width="64"
						/>
					</Table.Cell>
					<Table.Cell class="font-medium">Gamer Gear Pro Controller</Table.Cell>
					<Table.Cell>
						<Badge variant="outline">Active</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">$59.99</Table.Cell>
					<Table.Cell class="hidden md:table-cell">75</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2024-01-01 12:00 AM</Table.Cell>
					<Table.Cell>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button builders={[builder]} aria-haspopup="true" size="icon" variant="ghost">
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
				<Table.Row>
					<Table.Cell class="hidden sm:table-cell">
						<img
							alt="Product"
							class="aspect-square rounded-md object-cover"
							height="64"
							src="/images/placeholder.svg"
							width="64"
						/>
					</Table.Cell>
					<Table.Cell class="font-medium">Luminous VR Headset</Table.Cell>
					<Table.Cell>
						<Badge variant="outline">Active</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">$199.99</Table.Cell>
					<Table.Cell class="hidden md:table-cell">30</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2024-02-14 02:14 PM</Table.Cell>
					<Table.Cell>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button builders={[builder]} aria-haspopup="true" size="icon" variant="ghost">
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
			</Table.Body>
		</Table.Root>
	</Card.Content>
	<Card.Footer>
		<div class="text-xs text-muted-foreground">
			Showing <strong>1-10</strong> of <strong>32</strong> products
		</div>
	</Card.Footer>
</Card.Root>
