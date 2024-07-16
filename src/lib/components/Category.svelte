<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { db } from '$lib/firebase';
	import { addDoc, collection, getDocs } from 'firebase/firestore';
	import { onMount } from 'svelte';

    let categoryList: any[] = [];
    let categoryName = '';
    let open = false;

    onMount(async () => {
        getCategory();
    })

    const getCategory = async () => {
        const ref = collection(db, 'category');
        const snapshot = await getDocs(ref);
        categoryList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    const addCategory = async () => {
        const col = collection(db, 'category');
        await addDoc(col, {
            categoryName
        });
        getCategory();
        categoryName = '';
        open = false;
    }
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Edit Profile</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit profile</Dialog.Title>
			<Dialog.Description>
				Make changes to your profile here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Category Name</Label>
				<Input bind:value={categoryName} class="col-span-3" />
			</div>
		</div>
		<Dialog.Footer>
			<Button on:click={addCategory}>Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

{#each categoryList as cat}
    <li>{cat.categoryName}</li>
{/each}
