import type { AsyncStorageAdapter, SyncStorageAdapter } from "./storage-adapters/StorageAdapter.js";

class Persisted<
	Value,
	Adapter extends
		| SyncStorageAdapter<Value>
		| AsyncStorageAdapter<Value> = SyncStorageAdapter<Value>,
> {
	private adapter: Adapter;

	constructor(adapter: Adapter) {
		this.adapter = adapter;
	}

	get current() {
		// @ts-expect-error - The getter does and should not match the setter
		return this.adapter.get();
	}

	set current(value: Value) {
		this.adapter.set(value);
	}
}

export { Persisted };
