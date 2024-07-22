<script lang="ts">
	import { page } from "$app/stores";

	import CircleUser from 'lucide-svelte/icons/circle-user';
	import Package from 'lucide-svelte/icons/package';
	import Home from 'lucide-svelte/icons/house';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import Menu from 'lucide-svelte/icons/menu';
	import Package2 from 'lucide-svelte/icons/package-2';
	import Users from 'lucide-svelte/icons/users';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	
	import { signOut } from "firebase/auth";
	import { auth } from "$lib/firebase/firebase";
	import { goto } from "$app/navigation";

	const menuItems = {
		dashboard: "/",
		products: "/products",
		orders: "/orders",
		customers: "/customers"
	};

	async function logout() {
		await signOut(auth)
		goto("login");
	}
</script>

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
	<div class="hidden border-r bg-muted/40 md:block">
		<div class="flex h-full max-h-screen flex-col gap-2">
			<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<a href={menuItems.dashboard} class="flex items-center gap-2 font-semibold">
					<Package2 class="h-6 w-6" />
					<span class="">Cafe</span>
				</a>
			</div>
			<div class="flex-1">
				<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
					<a
						href={menuItems.dashboard}
						class={`
							${$page.url.pathname === menuItems.dashboard ? 'text-primary bg-muted' : ''}
							flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
						>
						<Home class="h-6 w-6" />
						Dashboard
						</a>
                    <a
						href={menuItems.products}
						class={`
							${$page.route.id?.includes(menuItems.products) ? 'text-primary bg-muted' : ''}
							flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
					>
						<Package class="h-6 w-6" />
						Products
					</a>
					<a
						href={menuItems.orders}
						class={`
							${$page.route.id?.includes(menuItems.orders) ? 'text-primary bg-muted' : ''}
							flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
					>
						<ShoppingCart class="h-6 w-6" />
						Orders
						<Badge class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
							6
						</Badge>
					</a>
					<a
						href={menuItems.customers}
						class={`
							${$page.route.id?.includes(menuItems.customers) ? 'text-primary bg-muted' : ''}
							flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
					>
						<Users class="h-6 w-6" />
						Customers
					</a>
				</nav>
			</div>
		</div>
	</div>
	<!-- <div class="flex flex-col"> -->
     <div>
		<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
			<Sheet.Root>
				<Sheet.Trigger asChild let:builder>
					<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
						<Menu class="h-5 w-5" />
						<span class="sr-only">Toggle navigation menu</span>
					</Button>
				</Sheet.Trigger>
				<Sheet.Content side="left" class="flex flex-col">
					<nav class="grid gap-2 text-lg font-medium">
						<a href={menuItems.dashboard} class="flex items-center gap-2 text-lg font-semibold">
							<Package2 class="h-6 w-6" />
							<span class="sr-only">Cafe</span>
						</a>
						<a
							href={menuItems.dashboard}
							class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<Home class="h-5 w-5" />
							Dashboard
						</a>
						<a
							href={menuItems.orders}
							class="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
						>
							<ShoppingCart class="h-5 w-5" />
							Orders
							<Badge class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
								6
							</Badge>
						</a>
						<a
							href={menuItems.products}
							class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<Package class="h-5 w-5" />
							Products
						</a>
						<a
							href={menuItems.customers}
							class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<Users class="h-5 w-5" />
							Customers
						</a>
					</nav>
				</Sheet.Content>
			</Sheet.Root>
			<div class="w-full flex-1">
				<!-- <form>
					<div class="relative">
						<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search products..."
							class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
						/>
					</div>
				</form> -->
			</div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button builders={[builder]} variant="secondary" size="icon" class="rounded-full">
						<CircleUser class="h-5 w-5" />
						<span class="sr-only">Toggle user menu</span>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Label>My Account</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Settings</DropdownMenu.Item>
					<!-- <DropdownMenu.Item>Support</DropdownMenu.Item> -->
					<!-- <DropdownMenu.Separator /> -->
					<DropdownMenu.Item on:click={logout}>Logout</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</header>
        <slot/>
	</div>
</div>
