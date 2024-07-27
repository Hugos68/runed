import type { SyncStorageAdapter } from "./StorageAdapter.js";
import { browser } from "$lib/internal/utils/browser.js";
import { useEventListener } from "$lib/utilities/useEventListener/useEventListener.svelte.js";

interface LocalStorageOptions<Value> {
	serialize?: (value: Value) => string;
	deserialize?: (value: string) => Value;
}

class LocalStorage<Value> implements SyncStorageAdapter<Value> {
	private options: LocalStorageOptions<Value>;

	private key: string;
	private value = $state() as Value;
	private serialize = $derived.by(() => this.options.serialize ?? JSON.stringify);
	private deserialize = $derived.by(() => this.options.deserialize ?? JSON.parse);

	constructor(key: string, options: LocalStorageOptions<Value> = {}) {
		this.key = key;
		this.options = options;

		if ($effect.tracking()) {
			useEventListener(window, "storage", (e) => {
				if (e.newValue) {
					this.set(this.deserialize(e.newValue));
				}
			});
		}
	}

	get() {
		return this.value;
	}

	set(value: Value) {
		if (browser) {
			localStorage.setItem(this.key, this.serialize(value));
		}
		this.value = value;
	}

	has() {
		if (!browser) {
			return false;
		}
		return localStorage.getItem(this.key) !== null;
	}

	remove() {
		if (!browser) {
			return false;
		}
		localStorage.removeItem(this.key);
		return true;
	}
}

export { LocalStorage };
